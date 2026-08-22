import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type FeatureRowProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  evidence?: ReactNode;
  reverse?: boolean;
  id?: string;
};

/**
 * Two-column section: text on one side, optional evidence panel on the other.
 * Editorial spacing, hairline top border, orange plus-marker device attached
 * to the text column top-left.
 *
 * Delta brief pattern — one clean title, one paragraph, one supporting piece.
 * No chip-cluster summaries. No dense bullet lists.
 */
export function FeatureRow({
  eyebrow,
  title,
  body,
  evidence,
  reverse = false,
  id,
}: FeatureRowProps) {
  const hasEvidence = Boolean(evidence);
  return (
    <section
      id={id}
      style={{
        padding: "72px 0",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: hasEvidence ? "minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr)",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div
            className="plus-marker"
            style={{
              order: reverse && hasEvidence ? 2 : 1,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
                maxWidth: "22ch",
                textWrap: "balance",
                fontOpticalSizing: "auto",
              }}
            >
              {title}
            </h2>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: "48ch",
              }}
            >
              {body}
            </div>
          </div>
          {hasEvidence ? <div style={{ order: reverse ? 1 : 2 }}>{evidence}</div> : null}
        </div>
      </div>
    </section>
  );
}
