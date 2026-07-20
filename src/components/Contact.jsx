// Brand glyphs as inline SVG (lucide-react dropped brand logos). Each fills
// with currentColor so it inherits the button's text color.
const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    {children}
  </svg>
);
const InstagramIcon = () => (
  <Svg>
    <path d="M12 2c2.7 0 3 0 4.1.1 1 .1 1.7.2 2.3.5.6.2 1.1.5 1.6 1s.8 1 1 1.6c.3.6.4 1.3.5 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 1-.2 1.7-.5 2.3-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.6.3-1.3.4-2.3.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1-.1-1.7-.2-2.3-.5-.6-.2-1.1-.5-1.6-1s-.8-1-1-1.6c-.3-.6-.4-1.3-.5-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c.1-1 .2-1.7.5-2.3.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.6-.3 1.3-.4 2.3-.5C8.6 2 8.9 2 12 2zm0 1.8c-2.7 0-3 0-4 .1-.8 0-1.2.2-1.5.3-.4.1-.7.3-.9.6-.3.2-.5.5-.6.9-.1.3-.3.7-.3 1.5-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .8.2 1.2.3 1.5.1.4.3.7.6.9.2.3.5.5.9.6.3.1.7.3 1.5.3 1 .1 1.3.1 4 .1s3 0 4-.1c.8 0 1.2-.2 1.5-.3.4-.1.7-.3.9-.6.3-.2.5-.5.6-.9.1-.3.3-.7.3-1.5.1-1 .1-1.3.1-4s0-3-.1-4c0-.8-.2-1.2-.3-1.5a2.5 2.5 0 0 0-.6-.9 2.5 2.5 0 0 0-.9-.6c-.3-.1-.7-.3-1.5-.3-1-.1-1.3-.1-4-.1zm0 3.1a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.3-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
  </Svg>
);
const LinkedInIcon = () => (
  <Svg>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04s-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.53C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.74V1.73C24 .77 23.2 0 22.22 0z" />
  </Svg>
);
const WhatsAppIcon = () => (
  <Svg>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12 22a10 10 0 0 1-5.1-1.4L3 22l1.4-3.9A10 10 0 1 1 12 22zm0-18a8 8 0 0 0-6.8 12.2l.2.3-.8 2.3 2.4-.8.3.2A8 8 0 1 0 12 4z" />
  </Svg>
);
const BehanceIcon = () => (
  <Svg>
    <path d="M8.2 8.6c.5 0 1 0 1.4.1.4.1.8.2 1 .4.3.2.5.5.7.8.1.3.2.7.2 1.2 0 .5-.1.9-.4 1.3-.2.3-.6.6-1 .8.6.2 1.1.5 1.4 1 .3.4.4 1 .4 1.6 0 .5-.1 1-.3 1.3-.2.4-.5.7-.8.9-.4.2-.8.4-1.2.5-.5.1-.9.2-1.4.2H2V8.6h6.2zM4.8 12.4h2.7c.4 0 .8-.1 1-.3.3-.2.4-.5.4-.9 0-.2 0-.4-.1-.6l-.4-.3c-.1-.1-.3-.1-.5-.2h-3.1v2.3zm0 4.1h3c.2 0 .4 0 .6-.1.2 0 .3-.1.5-.2.1-.1.2-.2.3-.4.1-.2.1-.4.1-.6 0-.5-.1-.8-.4-1-.3-.2-.7-.3-1.1-.3H4.8v2.6zM16.9 16.6c.4.3.9.5 1.6.5.5 0 .9-.1 1.3-.4.3-.2.5-.5.6-.7h2c-.3 1-.8 1.7-1.5 2.1-.6.4-1.5.7-2.4.7-.6 0-1.2-.1-1.7-.3a3.7 3.7 0 0 1-2.1-2.2c-.2-.5-.3-1.1-.3-1.7 0-.6.1-1.1.3-1.7.2-.5.5-1 .8-1.3.4-.4.8-.7 1.3-.9.5-.2 1.1-.3 1.7-.3.7 0 1.3.1 1.8.4.5.3.9.6 1.3 1.1.3.4.6 1 .7 1.5.2.6.2 1.2.2 1.8h-5.9c0 .7.2 1.3.6 1.6zM19.4 12.3c-.3-.3-.7-.4-1.3-.4-.4 0-.7.1-.9.2-.3.1-.5.3-.6.5-.1.2-.2.4-.3.6 0 .2-.1.3-.1.5h3.6c-.1-.6-.3-1-.6-1.3zM15.1 9.2h4.5v1.1h-4.5V9.2z" />
  </Svg>
);
const YouTubeIcon = () => (
  <Svg>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </Svg>
);

// Set a real profile URL to activate a link; "#" leaves it as an
// inactive placeholder (won't hijack scroll until a URL is added).
// `brand` is the app's signature color, used on the icon and hover.
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/a_sq_z/", icon: InstagramIcon, brand: "#E4405F" },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon, brand: "#0A66C2" },
  { label: "WhatsApp", href: "#", icon: WhatsAppIcon, brand: "#25D366" },
  { label: "Behance", href: "#", icon: BehanceIcon, brand: "#1769FF" },
  { label: "YouTube", href: "#", icon: YouTubeIcon, brand: "#FF0000" },
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
          {socials.map((s) => {
            const active = s.href && s.href !== "#";
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={active ? s.href : undefined}
                target={active ? "_blank" : undefined}
                rel={active ? "noopener noreferrer" : undefined}
                aria-disabled={active ? undefined : "true"}
                className={`social-link${active ? "" : " disabled"}`}
                style={{ "--brand": s.brand }}
              >
                <Icon />
                {s.label}
              </a>
            );
          })}
        </div>
      </div>
      <style>{`
        .contact {
          padding-bottom: 48px;
        }
        .contact-inner {
          position: relative;
          text-align: center;
          background: radial-gradient(
              circle at 50% 0%,
              rgba(139, 123, 255, 0.12),
              transparent 60%
            ),
            rgba(20, 17, 40, 0.5);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-lg);
          padding: 64px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 24px 60px rgba(0, 0, 0, 0.4);
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
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          border: 1px solid var(--card-border);
          color: var(--text-dim);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, background 0.2s,
            box-shadow 0.2s;
        }
        .social-link svg {
          color: var(--brand);
          transition: color 0.2s;
        }
        .social-link:hover svg {
          color: #fff;
        }
        .social-link:hover {
          color: #fff;
          background: var(--brand);
          border-color: var(--brand);
          box-shadow: 0 0 20px color-mix(in srgb, var(--brand) 45%, transparent);
        }
        .social-link:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
        }
        .social-link.disabled {
          cursor: default;
          opacity: 0.55;
        }
        .social-link.disabled:hover {
          color: var(--text-dim);
          background: transparent;
          border-color: var(--card-border);
          box-shadow: none;
        }
      `}</style>
    </section>
  );
}
