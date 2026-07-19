import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  GraduationCap,
  LayoutGrid,
  Megaphone,
  MessageSquareText,
  Plus,
} from "lucide-react";

/**
 * Videos are grouped by style — to add a video, append
 * { id, title, youtubeId } to the matching style's `videos` array
 * (youtubeId: null renders a "coming soon" slot).
 */
const workStyles = [
  {
    id: "talking-head",
    label: "Talking Head",
    icon: MessageSquareText,
    blurb: "Interview-style cuts that keep the speaker sharp and the message tight.",
    videos: [
      { id: 1, title: "Digex Agency - Magna", youtubeId: "Is4D_5i8l3E" },
      {
        id: 7,
        title: "Magna Travel - Video 01",
        youtubeId: "Xx3JEkNUAqk",
      },
      { id: 5, title: "Project 5", youtubeId: null },
    ],
  },
  {
    id: "brand-promo",
    label: "Brand Promos",
    icon: Megaphone,
    blurb: "Agency and product promos with confident branding and clean pacing.",
    videos: [
      {
        id: 2,
        title: "Magna Travel - Video 01",
        youtubeId: "Xx3JEkNUAqk",
      },
      {
        id: 4,
        title: "CirrusSign Academy",
        youtubeId: "WtVxTUzMQvQ",
      },
      { id: 6, title: "Project 6", youtubeId: null },
    ],
  },
  {
    id: "social-ads",
    label: "Social Ads",
    icon: Flame,
    blurb: "Scroll-stopping shorts built to hook in the first three seconds.",
    videos: [
      {
        id: 3,
        title: "Digex Agency - Show You",
        youtubeId: "f6vNFFeHKck",
      },
      {
        id: 8,
        title: "Magna Travel - Video 01",
        youtubeId: "Xx3JEkNUAqk",
      },
      { id: 10, title: "Project 10", youtubeId: null },
    ],
  },
  {
    id: "explainers",
    label: "Explainers",
    icon: GraduationCap,
    blurb: "Design and marketing lessons, edited so the idea lands fast.",
    videos: [
      {
        id: 9,
        title: "Magna Travel - Video 01",
        youtubeId: "Xx3JEkNUAqk",
      },
    ],
  },
];

// "All" aggregates every video (tagged with its own style); real style
// tabs follow. Each video carries a `tag` for its card label so the
// mixed "All" view still shows the correct style per card.
const workTabs = [
  {
    id: "all",
    label: "All",
    icon: LayoutGrid,
    blurb: "Every cut in one place — across all styles.",
    videos: workStyles.flatMap((s) =>
      s.videos.map((v) => ({ ...v, tag: s.label }))
    ),
  },
  ...workStyles.map((s) => ({
    ...s,
    videos: s.videos.map((v) => ({ ...v, tag: s.label })),
  })),
];

export default function Work() {
  const [activeId, setActiveId] = useState(workTabs[0].id);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [tabsCanPrev, setTabsCanPrev] = useState(false);
  const [tabsCanNext, setTabsCanNext] = useState(false);
  const scrollerRef = useRef(null);
  const tabsRef = useRef(null);
  const rafRef = useRef(0);
  const tabsRafRef = useRef(0);
  const reduced = useReducedMotion();

  const active = workTabs.find((s) => s.id === activeId);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const updateTabArrows = () => {
    const el = tabsRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    setTabsCanPrev(overflow > 4 && el.scrollLeft > 4);
    setTabsCanNext(overflow > 4 && el.scrollLeft < overflow - 4);
  };

  // Coverflow: scale/dim each card by its distance from the strip center.
  const applyScales = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    el.querySelectorAll(".work-card").forEach((card) => {
      const inner = card.querySelector(".work-card-inner");
      if (!inner) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const t = Math.min(Math.abs(center - cardCenter) / (card.offsetWidth * 1.15), 1);
      const scale = 1.07 - t * 0.17;
      inner.style.transform = `scale(${scale})`;
      inner.style.opacity = String(1 - t * 0.35);
    });
  };

  // Scroll so the style's middle card sits center-stage. The exiting
  // popLayout track is position:absolute — target the in-flow one.
  const centerOnMiddle = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const tracks = [...el.querySelectorAll(".work-track")];
    const track =
      tracks.find((tr) => getComputedStyle(tr).position !== "absolute") ||
      tracks[0];
    if (!track) return;
    const cards = track.querySelectorAll(".work-card");
    if (!cards.length) return;
    const mid = cards[Math.floor((cards.length - 1) / 2)];
    el.scrollLeft = mid.offsetLeft + mid.offsetWidth / 2 - el.clientWidth / 2;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateArrows();
        applyScales();
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const settle = () => {
      centerOnMiddle();
      applyScales();
      updateArrows();
    };
    const t1 = setTimeout(settle, 80);
    const t2 = setTimeout(() => {
      applyScales();
      updateArrows();
    }, 550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeId]);

  // Track tab-strip scroll position so the swipe hints know their direction.
  useEffect(() => {
    const strip = tabsRef.current;
    if (!strip) return;
    const onScroll = () => {
      cancelAnimationFrame(tabsRafRef.current);
      tabsRafRef.current = requestAnimationFrame(updateTabArrows);
    };
    strip.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateTabArrows();
    return () => {
      cancelAnimationFrame(tabsRafRef.current);
      strip.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Keep the active tab centered when the tab strip overflows (mobile).
  useEffect(() => {
    const strip = tabsRef.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) {
      updateTabArrows();
      return;
    }
    const tab = strip.querySelector(".work-tab.active");
    if (!tab) return;
    strip.scrollTo({
      left: tab.offsetLeft + tab.offsetWidth / 2 - strip.clientWidth / 2,
      behavior: reduced ? "auto" : "smooth",
    });
    const t = setTimeout(updateTabArrows, 400);
    return () => clearTimeout(t);
  }, [activeId, reduced]);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector(".work-card");
    const step = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollTabs = (dir) => {
    const el = tabsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  const onTabsKeyDown = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const idx = workTabs.findIndex((s) => s.id === activeId);
    const next =
      e.key === "ArrowRight"
        ? (idx + 1) % workTabs.length
        : (idx - 1 + workTabs.length) % workTabs.length;
    setActiveId(workTabs[next].id);
  };

  const trackVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.07 } },
    exit: { transition: { staggerChildren: reduced ? 0 : 0.03 } },
  };

  const cardVariants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 56 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: reduced
      ? { opacity: 0, transition: { duration: 0.15 } }
      : { opacity: 0, x: -40, transition: { duration: 0.22, ease: "easeIn" } },
  };

  return (
    <section id="work" className="work">
      <div className="container">
        <h2 className="section-title reveal">
          Selected <span className="gradient-text">work</span>
        </h2>

        <div
          className="work-controls reveal"
          style={{ "--reveal-delay": "0.1s" }}
        >
          <div
            className="work-tabs"
            role="tablist"
            aria-label="Work styles"
            ref={tabsRef}
            onKeyDown={onTabsKeyDown}
          >
            {workTabs.map((s) => {
              const Icon = s.icon;
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`work-tab${isActive ? " active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{s.label}</span>
                  <span className="work-tab-count">{s.videos.length}</span>
                  {isActive && (
                    <motion.span
                      layoutId="workLamp"
                      className="work-lamp"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <span className="work-lamp-bar" />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile-only swipe affordances for the tab strip (tap to scroll) */}
          <button
            type="button"
            className={`work-tab-hint left${tabsCanPrev ? " show" : ""}`}
            onClick={() => scrollTabs(-1)}
            tabIndex={-1}
            aria-label="Scroll styles left"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            className={`work-tab-hint right${tabsCanNext ? " show" : ""}`}
            onClick={() => scrollTabs(1)}
            tabIndex={-1}
            aria-label="Scroll styles right"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="work-blurb-slot reveal" style={{ "--reveal-delay": "0.15s" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activeId}
              className="work-blurb"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {active.blurb}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="work-strip reveal" style={{ "--reveal-delay": "0.2s" }}>
          <button
            type="button"
            className="work-arrow work-arrow-prev"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous videos"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="work-arrow work-arrow-next"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next videos"
          >
            <ChevronRight size={18} />
          </button>

          {/* Mobile-only swipe affordances (arrows are hidden below 720px) */}
          <button
            type="button"
            className={`work-swipe-hint left${canPrev ? " show" : ""}`}
            onClick={() => scrollByCard(-1)}
            tabIndex={-1}
            aria-label="Previous video"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className={`work-swipe-hint right${canNext ? " show" : ""}`}
            onClick={() => scrollByCard(1)}
            tabIndex={-1}
            aria-label="Next video"
          >
            <ChevronRight size={16} />
          </button>

          <div className="work-scroller" ref={scrollerRef}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeId}
                className="work-track"
                variants={trackVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {active.videos.map((v) => (
                  <motion.div
                    key={v.id}
                    className="work-card"
                    variants={cardVariants}
                  >
                    <div className="work-card-inner">
                      {v.youtubeId ? (
                        <div className="work-thumb">
                          <iframe
                            className="work-iframe"
                            src={`https://www.youtube.com/embed/${v.youtubeId}`}
                            title={v.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="work-thumb empty">
                          <span className="work-plus" aria-hidden="true">
                            <Plus size={20} />
                          </span>
                          <span className="work-empty-title">Your next video</span>
                          <span className="work-empty-sub">
                            Reserved for a new {v.tag.toLowerCase()} cut
                          </span>
                        </div>
                      )}
                      <div className="work-meta">
                        <span className="work-card-title">
                          {v.youtubeId ? v.title : "Coming soon"}
                        </span>
                        <span className="work-card-tag">{v.tag}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <style>{`
        .work-controls {
          position: relative;
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }
        /* Tab-strip swipe hints — mirror the video pills, mobile-only */
        .work-tab-hint {
          display: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 6;
          width: 26px;
          height: 26px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(20, 17, 40, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 123, 255, 0.4);
          color: var(--accent);
          opacity: 0;
          transition: opacity 0.25s ease-out;
          pointer-events: none;
          cursor: pointer;
          padding: 0;
          font: inherit;
        }
        .work-tab-hint.show {
          opacity: 1;
          pointer-events: auto;
        }
        .work-tab-hint.show:hover,
        .work-tab-hint.show:active {
          background: rgba(139, 123, 255, 0.25);
          animation-play-state: paused;
        }
        .work-tab-hint.left {
          left: 26px;
          animation: swipeNudgeLeft 1.8s ease-in-out infinite;
        }
        .work-tab-hint.right {
          right: 26px;
          animation: swipeNudgeRight 1.8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .work-tab-hint.left,
          .work-tab-hint.right {
            animation: none;
          }
        }
        /* Swipe-hint pills — only surfaced on mobile (see media query) */
        .work-swipe-hint {
          display: none;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 6;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(20, 17, 40, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 123, 255, 0.4);
          color: var(--accent);
          opacity: 0;
          transition: opacity 0.25s ease-out;
          pointer-events: none;
          cursor: pointer;
          padding: 0;
          font: inherit;
        }
        .work-swipe-hint.show {
          opacity: 1;
          pointer-events: auto;
        }
        .work-swipe-hint.show:hover,
        .work-swipe-hint.show:active {
          background: rgba(139, 123, 255, 0.25);
          animation-play-state: paused;
        }
        .work-swipe-hint.left {
          left: 6px;
          animation: swipeNudgeLeft 1.8s ease-in-out infinite;
        }
        .work-swipe-hint.right {
          right: 6px;
          animation: swipeNudgeRight 1.8s ease-in-out infinite;
        }
        @keyframes swipeNudgeLeft {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-4px); }
        }
        @keyframes swipeNudgeRight {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-swipe-hint.left,
          .work-swipe-hint.right {
            animation: none;
          }
        }
        .work-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4px;
          padding: 6px;
          background: rgba(20, 17, 40, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-full);
        }
        .work-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-dim);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }
        .work-tab:hover,
        .work-tab.active {
          color: var(--accent);
        }
        .work-tab:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .work-tab-count {
          font-size: 11px;
          line-height: 1;
          padding: 4px 8px;
          border-radius: var(--radius-full);
          background: rgba(139, 123, 255, 0.12);
          border: 1px solid rgba(139, 123, 255, 0.25);
          color: var(--accent);
        }
        .work-lamp {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-full);
          background: rgba(139, 123, 255, 0.08);
          z-index: -1;
        }
        .work-lamp-bar {
          position: absolute;
          top: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 4px;
          border-radius: 0 0 999px 999px;
          background: var(--accent);
          box-shadow: 0 0 14px 3px rgba(139, 123, 255, 0.45);
        }
        .work-blurb-slot {
          min-height: 24px;
          margin-top: 14px;
          text-align: center;
        }
        .work-blurb {
          font-size: 14px;
          color: var(--text-dim);
          margin: 0;
        }
        .work-strip {
          position: relative;
          margin-top: 12px;
        }
        .work-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(20, 17, 40, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--card-border);
          color: var(--text);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .work-arrow-prev {
          left: -6px;
        }
        .work-arrow-next {
          right: -6px;
        }
        .work-arrow:hover:not(:disabled) {
          color: var(--accent);
          border-color: rgba(139, 123, 255, 0.5);
          box-shadow: 0 0 16px rgba(139, 123, 255, 0.2);
        }
        .work-arrow:disabled {
          opacity: 0.3;
          cursor: default;
        }
        .work-arrow:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .work-scroller {
          position: relative;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 28px 0 30px;
          mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 24px,
            #000 calc(100% - 24px),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0,
            #000 24px,
            #000 calc(100% - 24px),
            transparent 100%
          );
        }
        .work-scroller::-webkit-scrollbar {
          display: none;
        }
        .work-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding-inline: calc(50% - 150px);
        }
        .work-card {
          flex: 0 0 auto;
          width: 300px;
          scroll-snap-align: center;
        }
        .work-card-inner {
          will-change: transform;
        }
        .work-thumb {
          aspect-ratio: 9 / 16;
          border-radius: var(--radius-md);
          overflow: hidden;
          position: relative;
          border: 1px solid var(--card-border);
          background: rgba(255, 255, 255, 0.03);
          transition: transform 0.25s ease-out, box-shadow 0.25s ease-out,
            border-color 0.25s ease-out;
        }
        .work-card:hover .work-thumb {
          transform: translateY(-4px);
          border-color: rgba(139, 123, 255, 0.45);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4),
            0 0 24px rgba(139, 123, 255, 0.15);
        }
        .work-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .work-thumb.empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-style: dashed;
          border-color: rgba(139, 123, 255, 0.35);
          background: rgba(139, 123, 255, 0.04);
          text-align: center;
          padding: 20px;
        }
        .work-plus {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(139, 123, 255, 0.12);
          border: 1px solid rgba(139, 123, 255, 0.35);
          color: var(--accent);
        }
        .work-empty-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }
        .work-empty-sub {
          font-size: 12px;
          color: var(--text-dim);
          max-width: 180px;
          line-height: 1.5;
        }
        .work-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
        }
        .work-card-title {
          font-size: 14px;
          font-weight: 600;
        }
        .work-card-tag {
          font-size: 11px;
          color: var(--accent);
          background: rgba(139, 123, 255, 0.1);
          border: 1px solid rgba(139, 123, 255, 0.25);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }
        @media (max-width: 720px) {
          .work-arrow {
            display: none;
          }
          .work-track {
            padding-inline: calc(50% - min(36vw, 150px));
          }
          .work-card {
            width: min(72vw, 300px);
          }
          .work-controls {
            /* Let the strip run edge to edge so tabs can scroll fully. */
            margin-inline: -24px;
          }
          .work-tabs {
            flex-wrap: nowrap;
            justify-content: flex-start;
            max-width: 100%;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            border-radius: 0;
            border-left: 0;
            border-right: 0;
            padding-inline: 24px;
            scroll-padding-inline: 24px;
            /* Fade the edges so partially-hidden tabs read as "more this way" */
            mask-image: linear-gradient(
              90deg,
              transparent 0,
              #000 28px,
              #000 calc(100% - 28px),
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              90deg,
              transparent 0,
              #000 28px,
              #000 calc(100% - 28px),
              transparent 100%
            );
          }
          .work-tabs::-webkit-scrollbar {
            display: none;
          }
          .work-tab {
            flex: 0 0 auto;
          }
          /* Show the swipe-hint pills where the desktop arrows are hidden */
          .work-swipe-hint {
            display: flex;
          }
          .work-tab-hint {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
}
