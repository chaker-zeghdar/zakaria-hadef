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
        />
      </div>
      <style>{`
        .hero {
          padding-top: 48px;
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
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-lg);
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
