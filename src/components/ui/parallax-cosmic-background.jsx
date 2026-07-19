import React, { useEffect, useState } from "react";

/**
 * A cosmic parallax background with three drifting star layers and a
 * glowing planet horizon, tinted with the site's theme variables.
 *
 * Props:
 * - head:      optional main heading (large, centered). Omit for background-only mode.
 * - text:      optional comma-separated subtitle parts (animated in sequence).
 * - loop:      whether text animations loop (default true).
 * - className: extra classes on the container.
 */
const CosmicParallaxBg = ({ head, text, loop = true, className = "" }) => {
  const [smallStars, setSmallStars] = useState("");
  const [mediumStars, setMediumStars] = useState("");
  const [bigStars, setBigStars] = useState("");

  const textParts = text ? text.split(",").map((part) => part.trim()) : [];

  // Stars are spread over a 2000px-tall band (the animStar loop distance);
  // x extends to 2560px so ultrawide screens stay covered.
  const generateStarBoxShadow = (count) => {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2560);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(", ");
  };

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));

    document.documentElement.style.setProperty(
      "--animation-iteration",
      loop ? "infinite" : "1"
    );
  }, [loop]);

  return (
    <div
      className={`cosmic-parallax-container ${className}`}
      aria-hidden={head ? undefined : true}
    >
      {/* Star layers (small = fastest, large = slowest drift) */}
      <div id="stars" className="cosmic-stars" style={{ boxShadow: smallStars }} />
      <div
        id="stars2"
        className="cosmic-stars-medium"
        style={{ boxShadow: mediumStars }}
      />
      <div
        id="stars3"
        className="cosmic-stars-large"
        style={{ boxShadow: bigStars }}
      />

      {/* Horizon glow and planet edge */}
      <div id="horizon">
        <div className="glow" />
      </div>
      <div id="earth" />

      {head && <div id="title">{head.toUpperCase()}</div>}
      {textParts.length > 0 && (
        <div id="subtitle">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className={`subtitle-part-${index + 1}`}>
                {part.toUpperCase()}
              </span>
              {index < textParts.length - 1 && " "}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export { CosmicParallaxBg };
