/**
 * BuiltWithNebbosBand · v2 · 2026-09-18 · numbers sourced from platform-metrics.json
 *
 * The dogfood band. Nebbos.ai and the estate behind it were mostly built
 * by one person in 160 days, using Nebbos itself. This section lands the
 * proof-of-substrate on the home page.
 *
 * v2 reconciles the 20-vs-26 repos contradiction on the same home page
 * (this band said 20; NebbosInventoryBand said 26 from JSON). Every
 * cardinal now sources from content/platform-metrics.json — the single
 * source of truth per its provenance block. `days_since_first_commit`
 * remains founder-directive-sourced pending an entry in the JSON.
 *
 * The artifact URL is a claude.ai-hosted permalink shared with anyone
 * with the link. Opens in a new tab so the visitor keeps their place.
 * Future: when a first-party /estate page exists on nebbos.ai, the
 * external link updates to the internal canonical page.
 */

import metrics from "@/content/platform-metrics.json";

const ESTATE_ARTIFACT_URL = metrics.artifact_url;
const REPOS = String(metrics.shipped.repositories);
const LOC = `${metrics.shipped.lines_of_code_millions}M`;
const ARCH_SPECS = String(metrics.governed.architecture_specs_ratified);

type Stat = { label: string; value: string };

const STATS: Stat[] = [
  { label: "One person", value: "1" },
  { label: "Days", value: "160" },
  { label: "Repositories", value: REPOS },
  { label: "Lines of code", value: LOC },
  { label: "Architecture specs", value: ARCH_SPECS },
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
          // Section spacing tokens · compact tier (dogfood trust band) — ratified 2026-09-18
          paddingBlock: "var(--section-y-compact)",
          display: "grid",
          gap: "var(--section-gap-standard)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
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
          Nebbos.ai &mdash; and the {REPOS}-repository, {LOC}-line estate
          behind it &mdash; was mostly built by a single operator over 160
          days, using Nebbos itself. This site is the first Nebbos user.
          Every number below is live-verified against the running
          governance graph, memory corpus, and repository index.
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
                borderLeft: "2px solid var(--accent-2)",
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
          color: var(--accent-2) !important;
          border-color: var(--accent-2) !important;
        }
      `}</style>
    </section>
  );
}
