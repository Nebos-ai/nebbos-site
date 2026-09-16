type PlusMarkSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<PlusMarkSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 48,
  xl: 96,
};

/**
 * PlusMark — the Nebbos signature-device plus glyph, standalone form.
 *
 * Standalone counterpart to the `.plus-marker` CSS class (which decorates
 * a section wrapper via ::before/::after). Use <PlusMark> when the mark
 * needs to sit inline with content — a numbered eyebrow, a section header,
 * a decorative separator — where a pseudo-element on the wrapper won't
 * reach the right position.
 *
 * Size variants match design/tokens.json signature-devices.plus-marker:
 * xs=12 / sm=16 / md=24 / lg=48 / xl=96. All sizes maintain the 19:1.5
 * arm-length-to-thickness ratio from the delta-brief specimen.
 *
 * Uses two absolutely-positioned bars inside a relative-positioned span
 * rather than an SVG so the color inherits from `currentColor` overrides
 * naturally and the mark takes zero layout height when set inline via
 * `display: inline-block; vertical-align: middle`.
 */
export function PlusMark({
  size = "md",
  color,
  ariaLabel,
}: {
  size?: PlusMarkSize;
  color?: string;
  ariaLabel?: string;
}) {
  const px = SIZES[size];
  const thickness = Math.max(1, Math.round((px / 19) * 1.5));
  const bg = color ?? "var(--accent-2)";
  return (
    <span
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={{
        position: "relative",
        display: "inline-block",
        width: px,
        height: px,
        verticalAlign: "middle",
        flex: `0 0 ${px}px`,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: (px - thickness) / 2,
          left: 0,
          width: px,
          height: thickness,
          background: bg,
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: (px - thickness) / 2,
          width: thickness,
          height: px,
          background: bg,
        }}
      />
    </span>
  );
}
