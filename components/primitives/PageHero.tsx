import type { ReactNode } from "react";
import { SceneStill } from "@/components/ui/SceneStill";

/**
 * <PageHero> · Design substrate v3 · primitive
 *
 * The ONE hero shape on nebbos.ai. Every top-of-page hero composes
 * this instead of writing a bespoke full-bleed <section> with inline
 * padding + scrim + copy-overlay.
 *
 * Layout (Apple product-hero pattern, curl-verified 2026-09-16):
 *   [full-bleed image · scrim optional]
 *   [chapter plate top-right · optional]
 *   [container-centered stack: eyebrow + headline + deck + CTAs]
 *
 * Variants:
 *   surface="scene"  · full-bleed image ground · light text on scrim (DEFAULT)
 *   surface="paper"  · paper ground · dark text (no image)
 *
 * Alignment:
 *   align="center"   · centered stack (Apple pattern, DEFAULT)
 *   align="start"    · left-aligned (editorial-anchor register)
 *
 * All type sizes flow from --fs-* tokens. All spacing from --space-*.
 * Consumers pass content (eyebrow / headline / deck / cta) but never
 * override the type scale, spacing, or ground color.
 *
 * Usage:
 *   <PageHero
 *     eyebrow="Nebbos Platform"
 *     headline={<>Operations, <em>at institutional scale.</em></>}
 *     deck="Runs your Pearls. Multi-Shell by default."
 *     imageFamily="concept-operator-onboarding"
 *     ctas={
 *       <>
 *         <Button href="/contact">Contact sales</Button>
 *         <Button variant="ghost" href="/demo">Book a demo</Button>
 *       </>
 *     }
 *   />
 */

export type PageHeroSurface = "scene" | "paper";
export type PageHeroAlign = "center" | "start";
export type PageHeroHeadingLevel = "h1" | "h2" | "h3";

export type PageHeroProps = {
  /** Small mono uppercase label above the headline. */
  eyebrow?: ReactNode;
  /**
   * The primary hero utterance. Rendered inside the heading element
   * selected by `headingLevel` (default `h1`). A page composing MULTIPLE
   * PageHeros (product-catalog stack on home) MUST render only ONE h1
   * (typically hidden `.sr-only`) and pass `headingLevel="h2"` on every
   * PageHero to keep the document outline valid.
   */
  headline: ReactNode;
  /** Semantic heading level for the headline. Default `h1`. */
  headingLevel?: PageHeroHeadingLevel;
  /** Optional deck below the headline. */
  deck?: ReactNode;
  /** Full-bleed image family key (from content/stills.ts). Required when surface="scene". */
  imageFamily?: string;
  imageFamilyVariant?: 1 | 2;
  /** Section chapter number rendered top-right as a metadata plate. */
  chapter?: string;
  chapterLabel?: string;
  /** Two CTA slots — expects `<Button>` components. */
  ctas?: ReactNode;
  surface?: PageHeroSurface;
  align?: PageHeroAlign;
  /** LCP priority — set true on the FIRST hero of the FIRST route only. */
  priority?: boolean;
  /** ARIA labelledby target — set if the heading needs a matching id. */
  ariaLabelledby?: string;
};

export function PageHero({
  eyebrow,
  headline,
  headingLevel = "h1",
  deck,
  imageFamily,
  imageFamilyVariant = 1,
  chapter,
  chapterLabel,
  ctas,
  surface = "scene",
  align = "center",
  priority = false,
  ariaLabelledby,
}: PageHeroProps) {
  const isScene = surface === "scene";
  const classes = [
    "page-hero",
    `page-hero--${surface}`,
    `page-hero--${align}`,
  ].join(" ");

  const Heading = headingLevel;

  return (
    <section className={classes} aria-labelledby={ariaLabelledby}>
      {isScene && imageFamily && (
        <SceneStill
          family={imageFamily}
          familyVariant={imageFamilyVariant}
          shape="fullBleed"
          priority={priority}
        />
      )}
      {isScene && <div aria-hidden className="page-hero__scrim" />}
      {chapter && chapterLabel && (
        <div className="page-hero__chapter" aria-hidden>
          <span className="page-hero__chapter-numeral">{chapter}</span>
          <span className="page-hero__chapter-label">{chapterLabel}</span>
        </div>
      )}
      <div className="container page-hero__inner">
        <div className="page-hero__frame">
          {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
          <Heading className="page-hero__headline">{headline}</Heading>
          {deck && <p className="page-hero__deck">{deck}</p>}
          {ctas && <div className="page-hero__ctas">{ctas}</div>}
        </div>
      </div>
    </section>
  );
}
