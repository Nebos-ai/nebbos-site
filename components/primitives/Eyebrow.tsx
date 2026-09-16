import type { CSSProperties, ReactNode } from "react";

/**
 * <Eyebrow> · Design substrate v3 · primitive
 *
 * The mono-uppercase small-caps label that sits above a headline
 * (or above a section-block eyebrow group). One of the site's three
 * type registers (mono / sans / prose); the eyebrow is the mono one.
 *
 * Consumes only tokens (via .eyebrow class in @layer primitives).
 * Zero inline `style={{fontFamily/fontSize/letterSpacing}}` — the
 * class carries the whole visual contract.
 *
 * Variants:
 *   tone="default" · muted ink-3
 *   tone="accent"  · accent (Nebbos orange) — reserved for section
 *                   openers where extra visual weight is wanted
 *   tone="onDark"  · paper foreground for use over full-bleed scenes
 *
 * Usage:
 *   <Eyebrow>Nebbos Platform</Eyebrow>
 *   <Eyebrow tone="accent">In production</Eyebrow>
 *   <Eyebrow tone="onDark">01 · Where it starts</Eyebrow>
 */

export type EyebrowTone = "default" | "accent" | "onDark";

export type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  /** Rare escape hatch — pass className for layout-only concerns (grid area, margin). Never for typography. */
  className?: string;
  /** Rare escape hatch — pass style for layout-only concerns. NEVER for typography, color, spacing. */
  style?: CSSProperties;
  id?: string;
};

export function Eyebrow({ children, tone = "default", className, style, id }: EyebrowProps) {
  const classes = ["eyebrow", `eyebrow--${tone}`, className].filter(Boolean).join(" ");
  return (
    <p className={classes} style={style} id={id}>
      {children}
    </p>
  );
}
