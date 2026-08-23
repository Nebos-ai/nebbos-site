import Image from "next/image";

/**
 * CanonicalSection · v1 · 2026-08-23
 *
 * Founder direction: "we need to add images and animation to these pages ·
 * its still very flat design · all these pages should use the same template."
 *
 * Every content section on layer pages / satellite pages / solutions verticals
 * renders via this component. Two-column split: image on one side + copy on
 * the other, alternating by section. CSS scroll-timeline animation fades
 * each section in as it enters the viewport (zero JS runtime, degrades
 * gracefully on browsers without support).
 *
 * Usage:
 *   <CanonicalSection
 *     numeral="03"
 *     label="Who"
 *     title="Who uses this layer"
 *     body="Every Pearl running inside your tenant..."
 *     items={["...", "..."]}
 *     family="band-boundary"
 *     familyVariant={1}
 *     imageSide="left"
 *     background="paper" | "paper-2"
 *   />
 */

type Props = {
  numeral: string;
  label: string;
  title?: string;
  body?: string;
  items?: string[];
  family?: string;
  familyVariant?: 1 | 2;
  imageSide?: "left" | "right";
  background?: "paper" | "paper-2";
};

export function CanonicalSection({
  numeral,
  label,
  title,
  body,
  items,
  family = "band-intelligence",
  familyVariant = 1,
  imageSide = "left",
  background = "paper",
}: Props) {
  return (
    <section
      className="canonical-section"
      style={{
        background: background === "paper-2" ? "var(--paper-2)" : "var(--paper)",
        paddingBlock: "clamp(64px, 10vh, 128px)",
        borderBottom: "1px solid var(--rule)",
        overflow: "hidden",
      }}
    >
      <div
        className="container-wide"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "clamp(32px, 6vw, 96px)",
          alignItems: "center",
        }}
      >
        {/* Media block */}
        <div
          style={{
            order: imageSide === "right" ? 2 : 1,
            position: "relative",
            aspectRatio: "4 / 5",
            overflow: "hidden",
            background: "var(--paper-2)",
          }}
          className="canon-media"
        >
          <Image
            src={`/vision-board/family-${family}-v${familyVariant}.png`}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Copy block */}
        <div
          style={{
            order: imageSide === "right" ? 1 : 2,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "clamp(0px, 2vw, 24px) 0",
          }}
          className="canon-copy"
        >
          {/* Numeral + label eyebrow */}
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "baseline", gap: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 42,
                lineHeight: 1,
                color: "var(--gold)",
                fontWeight: 400,
                letterSpacing: 0,
              }}
            >
              {numeral}
            </span>
            <span style={{ opacity: 0.6, color: "var(--ink-3)" }}>·</span>
            <span style={{ color: "var(--gold)", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase" }}>
              {label}
            </span>
          </div>

          {title && (
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.6vw, 48px)",
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: "var(--ink)",
                margin: "8px 0 0 0",
                maxWidth: "24ch",
                textWrap: "balance",
              }}
            >
              {title}
            </h2>
          )}

          {body && (
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(17px, 1.5vw, 21px)",
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
                maxWidth: "48ch",
              }}
            >
              {body}
            </p>
          )}

          {items && items.length > 0 && (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", marginTop: 8 }}>
              {items.map((item, i) => (
                <li
                  key={item}
                  style={{
                    borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                    borderBottom: "1px solid var(--rule)",
                    paddingBlock: 16,
                    display: "grid",
                    gridTemplateColumns: "40px minmax(0, 1fr)",
                    gap: 16,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      color: "var(--gold)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.5, color: "var(--ink)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* CSS scroll-triggered fade-in · no JS, uses modern animation-timeline */}
      <style>{`
        @keyframes canonFadeIn {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .canonical-section .canon-media,
        .canonical-section .canon-copy {
          animation: canonFadeIn linear both;
          animation-timeline: view();
          animation-range: entry 0% entry 60%;
        }
        @media (prefers-reduced-motion: reduce) {
          .canonical-section .canon-media,
          .canonical-section .canon-copy {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
        @media (max-width: 900px) {
          .canonical-section > .container-wide {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .canonical-section .canon-media,
          .canonical-section .canon-copy {
            order: unset !important;
          }
          .canonical-section .canon-media {
            aspect-ratio: 16 / 10 !important;
          }
        }
      `}</style>
    </section>
  );
}
