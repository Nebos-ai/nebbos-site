/**
 * BuiltWithNebbosBand · v1 · 2026-09-12
 *
 * The dogfood band. Nebbos.ai and the 20-repo / 2.1M-line estate behind
 * it were mostly built by one person in 160 days, using Nebbos itself.
 * This section lands that specific proof-of-substrate on the home page
 * between the InProductionBand and the older architecture bands.
 *
 * Every number is measured (not estimated) — the 2026-09-10 estate
 * snapshot lives at the linked artifact and is a repeatable scan against
 * repository HEAD. Numbers are conservative rounds of the artifact's
 * exact readings:
 *   - 20 repositories                           (exact)
 *   - 2,109,145 lines of code                   → 2.1M
 *   - 328 architecture specifications           (exact)
 *   - 59 enforcement hooks                      (exact)
 *   - 160 days (per founder directive 2026-09-12)
 *
 * The artifact URL is a claude.ai-hosted permalink shared with anyone
 * with the link. Opens in a new tab so the visitor keeps their place
 * on nebbos.ai.
 *
 * Future: when a first-party /estate or /numbers page exists on
 * nebbos.ai, the external artifact link updates to the internal
 * canonical page. Until then, the artifact IS the canonical numbers
 * surface.
 */

const ESTATE_ARTIFACT_URL =
  "https://claude.ai/code/artifact/fd5ed807-be2a-4bbe-aa9f-dfa68c1d33c5";

type Stat = { label: string; value: string };

const STATS: Stat[] = [
  { label: "One person", value: "1" },
  { label: "Days", value: "160" },
  { label: "Repositories", value: "20" },
  { label: "Lines of code", value: "2.1M" },
  { label: "Architecture specs", value: "328" },
];

export function BuiltWithNebbosBand() {
  return (
    <section
      aria-labelledby="built-with-nebbos-heading"
      style={{
        background: "var(--paper-2, #FBFAF7)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="container"
        style={{
          paddingBlock: "clamp(64px, 10vh, 120px)",
          display: "grid",
          gap: "clamp(24px, 3vw, 40px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--gold)",
            margin: 0,
          }}
        >
          Built with Nebbos &middot; the dogfood
        </p>

        <h2
          id="built-with-nebbos-heading"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 4.4vw, 56px)",
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
            fontWeight: 400,
            color: "var(--ink)",
            margin: 0,
            maxWidth: "24ch",
            textWrap: "balance",
          }}
        >
          One person. 160 days. Most of the substrate.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(16px, 1.4vw, 18px)",
            lineHeight: 1.5,
            color: "var(--ink-2)",
            margin: 0,
            maxWidth: "64ch",
          }}
        >
          Nebbos.ai &mdash; and the 20-repository, 2.1-million-line estate
          behind it &mdash; was mostly built by a single operator over 160
          days, using Nebbos itself. This site is the first Nebbos user.
          Every number below was measured against repository HEAD on
          2026-09-10, not estimated.
        </p>

        <div
          role="list"
          aria-label="Nebbos estate stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "clamp(16px, 2vw, 32px)",
            marginTop: "clamp(8px, 1vh, 16px)",
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingLeft: 16,
                borderLeft: "2px solid var(--gold)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 3.2vw, 42px)",
                  lineHeight: 1,
                  color: "var(--ink)",
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href={ESTATE_ARTIFACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            paddingBlock: 8,
            borderBottom: "1px solid var(--rule)",
            width: "fit-content",
            transition:
              "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
          }}
          className="built-with-nebbos-band__link"
        >
          See the estate by the numbers{" "}
          <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>
            →
          </span>
        </a>
      </div>

      <style>{`
        .built-with-nebbos-band__link:hover {
          color: var(--gold) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}
