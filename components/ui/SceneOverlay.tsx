/**
 * SceneOverlay · v2 primitive · editorial treatment for full-bleed scene images.
 *
 * Founder directive (2026-08-23): "we need to think overlays and effects to
 * the images · we need to again remember we are going with a lifestyle feel ·
 * the exclusivity feeling."
 *
 * The register is Kinfolk / Aesop / Loro Piana / Rolex — quiet luxury.
 * Applied as three stacked passes over any full-bleed scene:
 *
 *   1. Fine film grain (SVG feTurbulence, ~3% opacity, mix-blend-mode: overlay)
 *      — imperceptible tactile warmth
 *   2. Subtle vignette (radial-gradient, darker at corners, transparent center)
 *      — draws eye to center, editorial finishing
 *   3. Optional scrim — "even" (soft warm wash across the whole frame),
 *      "bottom" (gentle bottom-only for text legibility),
 *      "left" (side gradient for hero-style text overlay), or "none"
 *
 * Every full-bleed scene section on the site composes:
 *   <SceneStill scene fullBleed />
 *   <SceneOverlay scrim="bottom" />
 *   <text content ...>
 *
 * All passes are absolutely positioned inside the parent (must be
 * `position: relative`). pointer-events: none so clicks pass through to
 * any interactive children.
 */

type ScrimShape = "none" | "even" | "bottom" | "left" | "right";

type Props = {
  scrim?: ScrimShape;
  grainOpacity?: number;
  vignetteStrength?: number;
};

export function SceneOverlay({
  scrim = "bottom",
  grainOpacity = 0.06,
  vignetteStrength = 0.35,
}: Props) {
  return (
    <>
      {/* Layer 1: fine film grain (SVG feTurbulence) */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: grainOpacity,
        }}
      >
        <filter id="scene-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0 0.8  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#scene-grain)" />
      </svg>

      {/* Layer 2: subtle vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 90% 90% at center, transparent 40%, rgba(20, 18, 15, ${vignetteStrength}) 100%)`,
        }}
      />

      {/* Layer 3: scrim (per shape) */}
      {scrim !== "none" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: scrimBackground(scrim),
          }}
        />
      )}
    </>
  );
}

function scrimBackground(shape: ScrimShape): string {
  switch (shape) {
    case "even":
      return "linear-gradient(180deg, rgba(20,18,15,0.14) 0%, rgba(20,18,15,0.14) 100%)";
    case "bottom":
      return "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(20,18,15,0.20) 75%, rgba(20,18,15,0.48) 100%)";
    case "left":
      return "linear-gradient(90deg, rgba(20,18,15,0.52) 0%, rgba(20,18,15,0.28) 42%, rgba(20,18,15,0.04) 78%, transparent 100%)";
    case "right":
      return "linear-gradient(270deg, rgba(20,18,15,0.52) 0%, rgba(20,18,15,0.28) 42%, rgba(20,18,15,0.04) 78%, transparent 100%)";
    default:
      return "transparent";
  }
}

/**
 * SceneMetadataPlate — the small serif+mono metadata badge that sits in
 * a corner of a full-bleed scene. Roman-numeral chapter + strap + hairline
 * gold rule. The exclusivity flourish.
 */
type PlateProps = {
  chapter: string;         // "I" | "II" | "III" | "IV" | "V"
  label: string;           // e.g. "Where it starts"
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

export function SceneMetadataPlate({ chapter, label, position = "top-right" }: PlateProps) {
  const posStyles: React.CSSProperties = (() => {
    switch (position) {
      case "top-left":     return { top: "clamp(24px, 5vh, 56px)", left: "clamp(24px, 4vw, 48px)" };
      case "bottom-right": return { bottom: "clamp(24px, 5vh, 56px)", right: "clamp(24px, 4vw, 48px)" };
      case "bottom-left":  return { bottom: "clamp(24px, 5vh, 56px)", left: "clamp(24px, 4vw, 48px)" };
      case "top-right":
      default:             return { top: "clamp(24px, 5vh, 56px)", right: "clamp(24px, 4vw, 48px)" };
    }
  })();

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: position.endsWith("right") ? "flex-end" : "flex-start",
        color: "rgba(244, 241, 234, 0.9)",
        ...posStyles,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.65)",
        }}
      >
        Chapter
      </span>
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: "rgba(244, 241, 234, 0.95)",
          textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
        }}
      >
        {chapter}
      </span>
      <span
        aria-hidden
        style={{
          display: "block",
          width: 40,
          height: 1,
          background: "var(--accent-2)",
          marginBlock: 6,
          alignSelf: position.endsWith("right") ? "flex-end" : "flex-start",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.82)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
