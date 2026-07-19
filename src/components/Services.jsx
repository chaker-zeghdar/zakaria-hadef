import { Camera, Clapperboard, Palette, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "./ui/radial-orbital-timeline.jsx";

const services = [
  {
    id: 1,
    title: "Video Editing",
    date: "01",
    category: "Core service",
    icon: Clapperboard,
    relatedIds: [2, 3],
    energy: 95,
    content:
      "Narrative cuts, social edits, and campaign storytelling in Premiere Pro — clean rhythm, emotional pacing, and edits that hold attention to the last frame.",
  },
  {
    id: 2,
    title: "Color & Finishing",
    date: "02",
    category: "Post-production",
    icon: Palette,
    relatedIds: [1, 4],
    energy: 90,
    content:
      "Cinematic color balancing, look design, and final polish in Lightroom and Premiere — a high-end finish that makes every project feel intentional.",
  },
  {
    id: 3,
    title: "Motion Graphics",
    date: "03",
    category: "After Effects",
    icon: Sparkles,
    relatedIds: [1],
    energy: 85,
    content:
      "Elegant typography, logo animation, and visual rhythm built in After Effects — motion that keeps stories moving without stealing the show.",
  },
  {
    id: 4,
    title: "Photography",
    date: "04",
    category: "Capture",
    icon: Camera,
    relatedIds: [2],
    energy: 88,
    content:
      "Portraits and visual direction with strong composition — shot, edited, and graded to match your brand's look from frame one.",
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title reveal">Services</h2>
        <p
          className="section-sub services-sub reveal"
          style={{ "--reveal-delay": "0.1s" }}
        >
          Tap a node to explore each service
        </p>
        <div className="reveal" style={{ "--reveal-delay": "0.15s" }}>
          <RadialOrbitalTimeline timelineData={services} />
        </div>
      </div>
    </section>
  );
}
