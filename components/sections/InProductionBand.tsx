import Link from "next/link";

/**
 * InProductionBand · v1 · 2026-09-12
 *
 * Truthful social-proof band that lands right after the hero on the home
 * page. No fake customer logos, no fake exec quotes, no fabricated
 * numbers — just the specific in-production claim the founder confirmed
 * 2026-09-12: Nebbos is deployed today inside school districts across
 * multiple U.S. states.
 *
 * Placement rationale: matches runlayer.com's social-proof-adjacent-to-
 * hero pattern (their hero has a logo strip immediately below). Nebbos
 * doesn't have logos to strip — so this band substitutes typography-
 * forward trust framing for logo-forward trust framing.
 *
 * Once the first district signs off on public naming, extend this band
 * to feature a named district card. Until then, the general claim
 * stands on its own with a link to /customers for the shape-of-the-work
 * detail.
 */

export function InProductionBand() {
  return (
    <section
      aria-labelledby="in-production-heading"
      style={{
        background: "var(--paper)",
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
          In production
        </p>

        <h2
          id="in-production-heading"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 4.4vw, 56px)",
            lineHeight: 1.04,
            letterSpacing: "-0.022em",
            fontWeight: 400,
            color: "var(--ink)",
            margin: 0,
            maxWidth: "26ch",
            textWrap: "balance",
          }}
        >
          Running in school districts across multiple U.S. states.
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
          Nebbos deploys behind the systems each district already runs
          &mdash; SIS, HR, substitute management, state reporting, parent
          comms. Every consequential action passes through
          named-superintendent approval; every action lands as an
          append-only audit-event. Case studies as each district signs off
          publicly.
        </p>

        <Link
          href="/customers"
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
            transition: "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
          }}
          className="in-production-band__link"
        >
          See the shape of the work <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
        </Link>
      </div>

      <style>{`
        .in-production-band__link:hover {
          color: var(--gold) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}
