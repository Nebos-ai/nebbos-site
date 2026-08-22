import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type FeatureRowProps = {
  /** Micro-label above the row title. */
  eyebrow?: ReactNode;
  /** Row title. Kept short — Apple pairs one crisp title with one paragraph. */
  title: ReactNode;
  /** Body copy. Kept to ~2-3 short sentences. Longer prose → use `<Prose>`. */
  body: ReactNode;
  /** Optional evidence / visual / mini-table slot to the right. */
  evidence?: ReactNode;
  /**
   * Reverse the row (media left, text right). Alternate rows on stacked
   * sections for visual rhythm.
   */
  reverse?: boolean;
  /** Anchor id — enables in-page navigation. */
  id?: string;
};

/**
 * The "text left, evidence right" pattern the home + platform + governance
 * pages hand-rolled 6+ times each. Now one primitive. Palantir uses this
 * cadence for every product-feature section: one clean title, one paragraph,
 * one piece of supporting evidence — no chip-cluster summary, no bullet-list.
 *
 * When `evidence` is omitted the row is a single-column text block with
 * a max-width — still useful for a section-header + intro paragraph.
 */
export function FeatureRow({ eyebrow, title, body, evidence, reverse = false, id }: FeatureRowProps) {
  const hasEvidence = Boolean(evidence);
  return (
    <section id={id} style={{ padding: "56px 0", borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <div
          className="feature-row"
          style={{
            display: "grid",
            gridTemplateColumns: hasEvidence ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr)",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div style={{ order: reverse && hasEvidence ? 2 : 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {eyebrow ? <Eyebrow tone="faint">{eyebrow}</Eyebrow> : null}
            <h2
              style={{
                fontFamily: "var(--font-dm-sans), var(--font-sans)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.018em",
                fontWeight: 500,
                color: "var(--paper)",
                margin: 0,
                maxWidth: "22ch",
                textWrap: "balance",
              }}
            >
              {title}
            </h2>
            <div
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--mist)",
                maxWidth: "48ch",
              }}
            >
              {body}
            </div>
          </div>
          {hasEvidence ? (
            <div style={{ order: reverse ? 1 : 2 }}>{evidence}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
