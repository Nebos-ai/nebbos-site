import type { CSSProperties, ReactNode } from "react";

/**
 * <PageSection> · Design substrate v3 · primitive
 *
 * The ONE section wrapper on nebbos.ai. Every body block on every
 * route composes this instead of writing a bespoke <section>.
 *
 * Handles: vertical rhythm, container width, ground color, top/bottom
 * rules. Zero inline padding, zero inline `paddingBlock: clamp(...)`
 * literals in downstream code — all consumed via .page-section token
 * classes.
 *
 * Variants:
 *   ground="paper"    · default site ground (--color-paper)
 *   ground="paper2"   · elevated surface (--color-paper-2, Apple off-white)
 *   ground="ink"      · dark section for reversed contrast
 *
 * Modifiers:
 *   ruled     · top hairline (below preceding section)
 *   compact   · reduced vertical padding (default is `--section-y`,
 *               compact is half)
 *   contained · wraps children in .container (default) — set false
 *               for children that need to bleed edge-to-edge
 *
 * Usage:
 *   <PageSection>
 *     <Eyebrow>01 · Products</Eyebrow>
 *     <h2>The four Nebbos products.</h2>
 *   </PageSection>
 *
 *   <PageSection ground="paper2" ruled>
 *     ...
 *   </PageSection>
 */

export type PageSectionGround = "paper" | "paper2" | "ink";

export type PageSectionProps = {
  children: ReactNode;
  ground?: PageSectionGround;
  /** Top hairline rule (used to separate this section from the preceding one). */
  ruled?: boolean;
  /** Reduce vertical padding to half the default `--section-y`. */
  compact?: boolean;
  /** Wrap children in `.container` (default true). Set false for edge-to-edge children. */
  contained?: boolean;
  /** ARIA labelledby target if the section carries a heading with id. */
  ariaLabelledby?: string;
  /** Semantic id — added to the outer <section>. */
  id?: string;
  /** Layout-only escape hatch. Never for typography, color, spacing. */
  className?: string;
  /** Layout-only escape hatch. Never for typography, color, spacing. */
  style?: CSSProperties;
};

export function PageSection({
  children,
  ground = "paper",
  ruled = false,
  compact = false,
  contained = true,
  ariaLabelledby,
  id,
  className,
  style,
}: PageSectionProps) {
  const classes = [
    "page-section",
    `page-section--${ground}`,
    ruled && "page-section--ruled",
    compact && "page-section--compact",
    className,
  ].filter(Boolean).join(" ");

  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={classes} style={style}>
      {contained ? <div className="container">{children}</div> : children}
    </section>
  );
}
