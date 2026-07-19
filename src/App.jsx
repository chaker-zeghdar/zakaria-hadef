import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Statement from "./components/Statement.jsx";
import Work from "./components/Work.jsx";
import Services from "./components/Services.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { CosmicParallaxBg } from "./components/ui/parallax-cosmic-background.jsx";

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CosmicParallaxBg />
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
