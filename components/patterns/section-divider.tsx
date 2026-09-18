/**
 * SectionDivider · patterns/section-divider.tsx · v1 · 2026-09-18
 *
 * Load-bearing per docs/design/section-composition.md.
 *
 * Every ~third boundary between sections on a page carries a visible
 * `marker`: chapter numeral + orange plus-marker + short editorial strap.
 * The other boundaries stay `hairline` (subtle). This gives the eye a
 * rhythm to attach to without over-cluttering.
 *
 * Founder-directed 2026-09-18: "each section design wise works with the
 * sections above and below." Boundaries are the composition seam — visible
 * markers say the composition is intentional; invisible seams say the
 * sections just landed adjacent by accident.
 *
 * SectionDivider is a client-agnostic primitive. Every page composes it
 * between sections at authoring time; the page-level file remains the
 * source of truth for the composition sequence.
 *
 * Usage:
 *   <HomeHero />
 *   <SectionDivider chapter="II" strap="Where it starts today" />
 *   <InProductionBand />
 *   <SectionDivider variant="hairline" />
 *   <HomeModesBand />
 *   <SectionDivider chapter="III" strap="The complete substrate" tone="anchor" />
 *   <CapabilityBentoGrid />
 *
 * `variant` defaults to "marker" (chapter + plus + strap). "hairline"
 * renders only a hairline rule with generous vertical breathing — used
 * between marker boundaries to hold rhythm without shouting.
 *
 * `tone="anchor"` styles the marker in cream over a dark thin band —
 * signalling the section below is a register-break (ink ground).
 * Neutral tone (default) uses paper-2 ground with orange plus + ink numeral.
 */

type Variant = "marker" | "hairline";
type Tone = "neutral" | "anchor";

export interface SectionDividerProps {
  variant?: Variant;
  chapter?: string;
  strap?: string;
  tone?: Tone;
}

export function SectionDivider({
  variant = "marker",
  chapter,
  strap,
  tone = "neutral",
}: SectionDividerProps) {
  if (variant === "hairline") {
    return <div className="section-divider section-divider--hairline" aria-hidden />;
  }

  return (
    <div
      className={`section-divider section-divider--marker section-divider--tone-${tone}`}
      aria-hidden
    >
      <div className="container section-divider__inner">
        <span className="section-divider__plus" aria-hidden>
          +
        </span>
        {chapter ? <span className="section-divider__chapter">{chapter}</span> : null}
        {strap ? <span className="section-divider__strap">{strap}</span> : null}
      </div>
    </div>
  );
}
