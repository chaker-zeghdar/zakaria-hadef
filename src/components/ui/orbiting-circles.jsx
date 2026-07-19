/**
 * A child element that orbits the center of its nearest positioned ancestor.
 *
 * Props:
 * - size:     diameter of the orbiting item in px (default 40)
 * - radius:   orbit radius in px (default 50)
 * - duration: seconds for one full revolution (default 20)
 * - delay:    seconds of phase offset along the orbit (default 10)
 * - reverse:  orbit counter-clockwise
 * - path:     draw the faint circular track (default true)
 */
export function OrbitingCircles({
  className = "",
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  size = 40,
}) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="orbit-path"
          aria-hidden="true"
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        </svg>
      )}

      <div
        style={{
          "--duration": duration,
          "--radius": radius,
          "--delay": -delay,
          width: size,
          height: size,
        }}
        className={`orbiting-circle${reverse ? " reverse" : ""} ${className}`}
      >
        {children}
      </div>
    </>
  );
}

export default OrbitingCircles;
