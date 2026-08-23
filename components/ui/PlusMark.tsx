import type { CSSProperties } from "react";

/**
 * PlusMark — Wave 2C · moncalisse signature-mark density amendment.
 *
 * Elevates the orange plus from a decorative CSS pseudo-element (positioned
 * off-container-left) to a proper composable brand glyph. Use anywhere a
 * signature accent is warranted: section numerals, dividers, bullets,
 * eyebrow prefixes, CTA anchors.
 *
 * Size tokens: xs=12 · sm=16 · md=24 · lg=48 · xl=96 (px).
 * Renders as an inline SVG that inherits currentColor so the accent hue
 * follows text color when set, or falls back to Nebbos orange (--accent-2).
 */
type PlusMarkSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<PlusMarkSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 48,
  xl: 96,
};

type PlusMarkProps = {
  size?: PlusMarkSize;
  /** Optional override for the accent color; defaults to Nebbos orange. */
  color?: string;
  /** Stroke thickness in px at the rendered size. Defaults scale with size. */
  weight?: number;
  className?: string;
  style?: CSSProperties;
  /** For screen readers when the glyph carries meaning (default: decorative). */
  ariaLabel?: string;
};

const DEFAULT_WEIGHT: Record<PlusMarkSize, number> = {
  xs: 1,
  sm: 1.25,
  md: 1.5,
  lg: 2.5,
  xl: 4,
};

export function PlusMark({
  size = "md",
  color = "var(--accent-2)",
  weight,
  className,
  style,
  ariaLabel,
}: PlusMarkProps) {
  const px = SIZE_PX[size];
  const w = weight ?? DEFAULT_WEIGHT[size];
  const half = px / 2;
  const decorative = !ariaLabel;

  return (
    <svg
      className={className}
      style={{ display: "inline-block", flex: "none", ...style }}
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={ariaLabel}
    >
      <rect x={0} y={half - w / 2} width={px} height={w} fill={color} />
      <rect x={half - w / 2} y={0} width={w} height={px} fill={color} />
    </svg>
  );
}
