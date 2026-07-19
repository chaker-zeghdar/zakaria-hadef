const socials = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact-inner reveal">
        <h2 className="section-title">
          Let&apos;s work <span className="gradient-text">together</span>
        </h2>
        <a className="email-pill" href="mailto:zhadef15@gmail.com">
          ✉ zhadef15@gmail.com
        </a>
        <p className="phone">+213 549 66 66 16</p>
        <div className="social-row">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="social-link">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .contact {
          padding-bottom: 48px;
        }
        .contact-inner {
          text-align: center;
          background: var(--bg-soft);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-lg);
          padding: 64px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .email-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(20, 17, 40, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(139, 123, 255, 0.45);
          color: var(--text);
          font-weight: 600;
          font-size: 14px;
          padding: 12px 24px;
          border-radius: var(--radius-full);
          box-shadow: 0 0 18px rgba(139, 123, 255, 0.12);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .email-pill:hover {
          background: rgba(139, 123, 255, 0.12);
          box-shadow: 0 0 28px rgba(139, 123, 255, 0.28);
        }
        .phone {
          color: var(--text-dim);
          font-size: 14px;
        }
        .social-row {
          display: flex;
          gap: 12px;
        }
        .social-link {
          font-size: 13px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--card-border);
          color: var(--text-dim);
        }
        .social-link:hover {
          color: var(--text);
        }
      `}</style>
    </section>
  );
}
