import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, Link } from "lucide-react";

// Degrees per second — matches the original 0.3deg per 50ms tick.
const SPIN_SPEED = 6;
// How long the click-to-centre swing takes.
const CENTER_MS = 700;

/**
 * Interactive orbital display: items orbit a glowing core; clicking a node
 * stops the rotation, centers it on top, and expands a detail card.
 *
 * timelineData items: { id, title, date, content, category, icon (lucide
 * component), relatedIds, energy (0-100) }
 */
export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [radius, setRadius] = useState(200);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  // The orbit is animated by writing transforms straight to the DOM on each
  // frame. Driving it through React state instead meant a full re-render of
  // every node 20x a second, which is what made phones stutter.
  const angleRef = useRef(0);
  const radiusRef = useRef(200);
  const expandedIdRef = useRef(null);
  const autoRotateRef = useRef(true);
  const reducedRef = useRef(false);
  const visibleRef = useRef(true);
  const tweenRef = useRef(null);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  radiusRef.current = radius;
  autoRotateRef.current = autoRotate;
  expandedIdRef.current = activeNodeId;

  const positionNodes = () => {
    const total = timelineData.length;
    const r = radiusRef.current;
    const base = angleRef.current;
    timelineData.forEach((item, index) => {
      const el = nodeRefs.current[item.id];
      if (!el) return;
      const rad = (((index / total) * 360 + base) % 360) * (Math.PI / 180);
      const expanded = expandedIdRef.current === item.id;
      el.style.transform = `translate3d(${r * Math.cos(rad)}px, ${
        r * Math.sin(rad)
      }px, 0)`;
      el.style.zIndex = expanded
        ? "200"
        : String(Math.round(100 + 50 * Math.cos(rad)));
      el.style.opacity = expanded
        ? "1"
        : String(
            Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)))
          );
    });
  };

  const shouldSpin = () =>
    autoRotateRef.current && !reducedRef.current && visibleRef.current;

  const startLoop = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 100);
      last = now;
      const tween = tweenRef.current;
      if (tween) {
        const t = Math.min((now - tween.start) / CENTER_MS, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        angleRef.current = tween.from + (tween.to - tween.from) * eased;
        if (t >= 1) tweenRef.current = null;
      } else if (shouldSpin()) {
        angleRef.current = (angleRef.current + (dt * SPIN_SPEED) / 1000) % 360;
      }
      positionNodes();
      if (tweenRef.current || shouldSpin()) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        runningRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

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
    const from = angleRef.current;
    // Swing the short way round rather than unwinding a full turn.
    let delta = ((270 - targetAngle - from) % 360 + 540) % 360 - 180;
    tweenRef.current = { from, to: from + delta, start: performance.now() };
    startLoop();
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

  // Keep the DOM in sync after any React re-render (expand, resize, …).
  useLayoutEffect(() => {
    positionNodes();
  });

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Don't burn frames spinning an orbit that's scrolled off screen.
    const el = containerRef.current;
    let observer;
    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) startLoop();
        },
        { threshold: 0 }
      );
      observer.observe(el);
    }

    startLoop();
    return () => {
      cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      if (observer) observer.disconnect();
    };
  }, []);

  // Resume spinning when a card is closed.
  useEffect(() => {
    if (autoRotate) startLoop();
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

        {timelineData.map((item) => {
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
