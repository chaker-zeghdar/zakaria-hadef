import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link } from "lucide-react";

/**
 * Interactive orbital display: items orbit a glowing core; clicking a node
 * stops the rotation, centers it on top, and expands a detail card.
 *
 * timelineData items: { id, title, date, content, category, icon (lucide
 * component), relatedIds, energy (0-100) }
 */
export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [radius, setRadius] = useState(200);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = {};
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const item = timelineData.find((i) => i.id === id);
        const newPulseEffect = {};
        (item ? item.relatedIds : []).forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!autoRotate || reduced) return;

    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate]);

  useEffect(() => {
    const update = () => {
      const w = containerRef.current ? containerRef.current.offsetWidth : 800;
      setRadius(Math.max(120, Math.min(200, w / 2 - 70)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const current = timelineData.find((item) => item.id === activeNodeId);
    return current ? current.relatedIds.includes(itemId) : false;
  };

  return (
    <div
      className="orbital-container"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="orbital-plane" ref={orbitRef}>
        <div className="orbital-core">
          <div className="orbital-core-ring orbital-core-ring-1"></div>
          <div className="orbital-core-ring orbital-core-ring-2"></div>
          <div className="orbital-core-dot"></div>
        </div>

        <div
          className="orbital-ring"
          style={{ width: radius * 2, height: radius * 2 }}
        ></div>

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;
          const glowSize = item.energy * 0.5 + 44;

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="orbital-node"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleItem(item.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={!!isExpanded}
              aria-label={`${item.title} — show details`}
            >
              <div
                className={`orbital-node-glow${isPulsing ? " pulsing" : ""}`}
                style={{
                  width: glowSize,
                  height: glowSize,
                  left: -(glowSize - 44) / 2,
                  top: -(glowSize - 44) / 2,
                }}
              ></div>

              <div
                className={`orbital-node-circle${
                  isExpanded ? " expanded" : isRelated ? " related" : ""
                }`}
              >
                <Icon size={18} />
              </div>

              <div
                className={`orbital-node-title${isExpanded ? " expanded" : ""}`}
              >
                {item.title}
              </div>

              {isExpanded && (
                <div className="orbital-card" onClick={(e) => e.stopPropagation()}>
                  <div className="orbital-card-connector"></div>
                  <div className="orbital-card-head">
                    <span className="orbital-badge">{item.category}</span>
                    <span className="orbital-card-num">{item.date}</span>
                  </div>
                  <h3 className="orbital-card-title">{item.title}</h3>
                  <p className="orbital-card-text">{item.content}</p>

                  {item.relatedIds.length > 0 && (
                    <div className="orbital-card-divider">
                      <div className="orbital-related-head">
                        <Link size={10} />
                        <span>Pairs with</span>
                      </div>
                      <div className="orbital-related-list">
                        {item.relatedIds.map((relatedId) => {
                          const relatedItem = timelineData.find(
                            (i) => i.id === relatedId
                          );
                          return (
                            <button
                              key={relatedId}
                              type="button"
                              className="orbital-related-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem ? relatedItem.title : ""}
                              <ArrowRight size={10} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
