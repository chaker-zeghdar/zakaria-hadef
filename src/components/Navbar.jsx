import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { User, Briefcase, Sparkles, Mail } from "lucide-react";

const links = [
  { label: "About", href: "#about", icon: User },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "Services", href: "#services", icon: Sparkles },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(links[0].label);

  // Highlight the tab whose section is currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const match = links.find((l) => l.href === `#${visible.target.id}`);
          if (match) setActiveTab(match.label);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar-wrap">
      <nav className="navbar reveal" aria-label="Primary">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeTab === link.label;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveTab(link.label)}
              className={`navbar-item${isActive ? " active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="navbar-item-label">{link.label}</span>
              <span className="navbar-item-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.span
                  layoutId="tubelight"
                  className="navbar-lamp"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span className="navbar-lamp-bar">
                    <span className="navbar-lamp-glow navbar-lamp-glow-1" />
                    <span className="navbar-lamp-glow navbar-lamp-glow-2" />
                    <span className="navbar-lamp-glow navbar-lamp-glow-3" />
                  </span>
                </motion.span>
              )}
            </a>
          );
        })}
      </nav>
      <style>{`
        .navbar-wrap {
          position: sticky;
          top: 20px;
          z-index: 50;
          display: flex;
          justify-content: center;
          padding: 0 16px;
        }
        .navbar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(20, 17, 40, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-full);
          padding: 6px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .navbar-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          color: var(--text-dim);
          transition: color 0.2s;
        }
        .navbar-item:hover {
          color: var(--accent);
        }
        .navbar-item.active {
          color: var(--accent);
        }
        .navbar-item-icon {
          display: none;
          align-items: center;
          justify-content: center;
        }
        .navbar-lamp {
          position: absolute;
          inset: 0;
          width: 100%;
          border-radius: var(--radius-full);
          background: rgba(139, 123, 255, 0.08);
          z-index: -1;
        }
        .navbar-lamp-bar {
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 4px;
          border-radius: 0 0 999px 999px;
          background: var(--accent);
        }
        .navbar-lamp-glow {
          position: absolute;
          border-radius: 999px;
          background: rgba(139, 123, 255, 0.35);
        }
        .navbar-lamp-glow-1 {
          width: 48px;
          height: 24px;
          filter: blur(12px);
          top: -8px;
          left: -8px;
        }
        .navbar-lamp-glow-2 {
          width: 32px;
          height: 24px;
          filter: blur(12px);
          top: -4px;
        }
        .navbar-lamp-glow-3 {
          width: 16px;
          height: 16px;
          filter: blur(6px);
          top: 0;
          left: 8px;
        }
        @media (max-width: 620px) {
          .navbar-item {
            padding: 12px 16px;
          }
          .navbar-item-label {
            display: none;
          }
          .navbar-item-icon {
            display: inline-flex;
          }
        }
      `}</style>
    </header>
  );
}
