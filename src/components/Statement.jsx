import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { TextReveal } from "./ui/text-reveal.jsx";
import { OrbitingCircles } from "./ui/orbiting-circles.jsx";

const paragraph = "Turning raw footage into stories people remember";

const tools = [
  { label: "Pr", name: "Premiere Pro", bg: "#00005B", fg: "#9999FF" },
  { label: "Ae", name: "After Effects", bg: "#00005B", fg: "#9999FF" },
  { label: "Ps", name: "Photoshop", bg: "#001E36", fg: "#31A8FF" },
  { label: "Lr", name: "Lightroom", bg: "#001E36", fg: "#31A8FF" },
];

function ToolTile({ label, name, bg, fg }) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" role="img" aria-label={name}>
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="11"
        fill={bg}
        stroke={fg}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontSize="19"
        fontWeight="700"
        fill={fg}
        fontFamily="'Inter', -apple-system, 'Segoe UI', sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  return (
    <section id="statement" className="statement" ref={ref}>
      <div className="container statement-grid">
        <div
          className="orbit-stage reveal"
          role="group"
          aria-label="Edits with Premiere Pro, After Effects, Photoshop, and Lightroom"
        >
          <div className="orbit-scale">
            <span className="orbit-title" aria-hidden="true">
              Edits with
            </span>

            {/* Inner Circles */}
            <OrbitingCircles size={38} radius={80} duration={20} delay={20}>
              <ToolTile {...tools[0]} />
            </OrbitingCircles>
            <OrbitingCircles size={38} radius={80} duration={20} delay={10}>
              <ToolTile {...tools[1]} />
            </OrbitingCircles>

            {/* Outer Circles (reverse) */}
            <OrbitingCircles size={60} radius={190} duration={20} reverse>
              <ToolTile {...tools[2]} />
            </OrbitingCircles>
            <OrbitingCircles size={60} radius={190} duration={20} delay={20} reverse>
              <ToolTile {...tools[3]} />
            </OrbitingCircles>
          </div>
        </div>

        <div className="statement-copy">
          {reducedMotion ? (
            <p className="statement-text">{paragraph}</p>
          ) : (
            <TextReveal
              as="p"
              className="statement-text"
              per="word"
              preset="fade-in-blur"
              speedReveal={1.2}
              trigger={inView}
            >
              {paragraph}
            </TextReveal>
          )}
        </div>
      </div>
      <style>{`
        .statement {
          padding: 24px 0;
        }
        .statement-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        .orbit-stage {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .orbit-scale {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orbit-title {
          pointer-events: none;
          white-space: pre-wrap;
          text-align: center;
          font-size: clamp(44px, 5vw, 68px);
          font-weight: 600;
          line-height: 1;
          background: linear-gradient(to bottom, #ffffff, #000000);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .statement-copy {
          min-height: 180px;
          display: flex;
          align-items: center;
        }
        .statement-text {
          font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.3;
          text-align: left;
          color: var(--text);
          margin: 0;
        }
        @media (max-width: 860px) {
          .statement-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .orbit-stage {
            height: 360px;
            max-width: 100%;
          }
          .orbit-scale {
            transform: scale(0.68);
          }
          .statement-copy {
            min-height: 140px;
            justify-content: center;
          }
          .statement-text {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
