import { ArrowRight } from "lucide-react";
import { TextMorph } from "./ui/text-morph.jsx";

export default function Hero() {
  return (
    <section id="about" className="hero">
      <div className="container hero-grid">
        <div>
          <span className="tag reveal">Video editing &amp; photography</span>
          <h1
            className="hero-title reveal"
            style={{ "--reveal-delay": "0.1s" }}
          >
            ZAKARIA ABD ELDJALIL HADEF
          </h1>
          <p
            className="hero-role reveal"
            style={{ "--reveal-delay": "0.2s" }}
            aria-label="I'm a Video Editor & Photographer"
          >
            <span className="hero-role-prefix">I&apos;m a</span>
            <TextMorph
              words={["Video Editor", "Photographer"]}
              interval={2600}
              charClassName="morph-char"
            />
          </p>
          <p className="hero-copy reveal" style={{ "--reveal-delay": "0.3s" }}>
            I craft strong visual narratives through editing, color, motion,
            and photography — focused on clean rhythm, emotional pacing, and
            high-end finishing.
          </p>
          <a
            className="hero-cta reveal"
            style={{ "--reveal-delay": "0.4s" }}
            href="#work"
          >
            View my work
            <ArrowRight size={18} className="hero-cta-arrow" aria-hidden="true" />
          </a>
        </div>
        <div
          className="hero-art reveal"
          style={{ "--reveal-delay": "0.25s" }}
          aria-hidden="true"
        >
                      <img
              src="/images/zaki.png"
              alt="Hero art"
              className="hero-art-image"
            />
          <span className="vf-corner vf-tl" />
          <span className="vf-corner vf-tr" />
          <span className="vf-corner vf-bl" />
          <span className="vf-corner vf-br" />
          <span className="vf-cross" />
          <span className="vf-rec">
            <span className="vf-rec-dot" />
          </span>
          <span className="vf-tc">00:00:24:18</span>
          <span className="vf-label">A-CAM · 4K</span>
        </div>
      </div>
      <style>{`
        .hero {
          padding-top: 80px;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }
        .tag {
          display: inline-block;
          font-size: 13px;
          color: var(--text-dim);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-full);
          padding: 6px 14px;
          margin-bottom: 24px;
        }
        .hero-title {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -0.01em;
          margin-bottom: 12px;
        }
        .hero-role {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          font-size: clamp(24px, 3.2vw, 30px);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text);
          margin-bottom: 20px;
          min-height: 1.25em;
        }
        .morph-char {
          color: var(--accent);
        }
        .hero-copy {
          font-size: 18px;
          max-width: 500px;
          margin-bottom: 32px;
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          background: rgba(20, 17, 40, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(139, 123, 255, 0.45);
          color: var(--accent);
          font-size: 15px;
          font-weight: 600;
          box-shadow: 0 0 18px rgba(139, 123, 255, 0.12);
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out,
            background 0.2s ease-out;
        }
        .hero-cta:hover {
          transform: translateY(-2px);
          background: rgba(139, 123, 255, 0.12);
          box-shadow: 0 0 28px rgba(139, 123, 255, 0.28);
        }
        .hero-cta:active {
          transform: translateY(0) scale(0.98);
        }
        .hero-cta:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .hero-cta-arrow {
          transition: transform 0.2s ease-out;
        }
        .hero-cta:hover .hero-cta-arrow {
          transform: translateX(3px);
        }
        .hero-art {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: radial-gradient(
              circle at 30% 18%,
              rgba(139, 123, 255, 0.16),
              transparent 55%
            ),
            rgba(20, 17, 40, 0.5);
          border: 1px solid var(--card-border);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 20px 50px rgba(0, 0, 0, 0.35);
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
        }
        .hero-art-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transform: scale(1.03);
        }

        .vf-corner {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          z-index: 1;
        }
        .vf-tl {
          top: 16px;
          left: 16px;
          border-right: 0;
          border-bottom: 0;
        }
        .vf-tr {
          top: 16px;
          right: 16px;
          border-left: 0;
          border-bottom: 0;
        }
        .vf-bl {
          bottom: 16px;
          left: 16px;
          border-right: 0;
          border-top: 0;
        }
        .vf-br {
          bottom: 16px;
          right: 16px;
          border-left: 0;
          border-top: 0;
        }
        .vf-cross {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 18px;
          height: 18px;
          transform: translate(-50%, -50%);
          opacity: 0.45;
        }
        .vf-cross::before,
        .vf-cross::after {
          content: "";
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
        }
        .vf-cross::before {
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
        }
        .vf-cross::after {
          top: 50%;
          left: 0;
          height: 1px;
          width: 100%;
        }
        .vf-rec {
          position: absolute;
          top: 20px;
          right: 52px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.8);
          z-index: 2;
        }
        .vf-rec-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ff4d5e;
          box-shadow: 0 0 8px rgba(255, 77, 94, 0.7);
          animation: recBlink 1.6s steps(1) infinite;
        }
        .vf-tc {
          position: absolute;
          bottom: 22px;
          left: 52px;
          font-size: 12px;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.55);
        }
        .vf-label {
          position: absolute;
          top: 21px;
          left: 52px;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 255, 0.45);
        }
        @keyframes recBlink {
          0%,
          60% {
            opacity: 1;
          }
          61%,
          100% {
            opacity: 0.15;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vf-rec-dot {
            animation: none;
          }
        }
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
