import Link from "next/link";

/**
 * HomeModesBand · v1 · 2026-09-17
 *
 * Two-mode positioning band — Managed vs Federated — landed side-by-side
 * as the visual "TWO shapes, one MCP" argument. Institutional Reserve
 * register (cream paper, hairline divider, editorial typography) rather
 * than the cinematic scene register used by HomeHero / HomeStory / HomeCTA,
 * so the page reads as scene → text-band → scene → text-band rhythm.
 *
 * Substrate:
 *   docs/marketing/homepage-first-time-visitor-strategy-2026-09-17.md §11
 *   ~/.claude/state/nebbos-inbox/connected-tools-capability-audit-2026-09-17.md
 *     § "Two client modes (this is the corrected framing…)"
 *
 * Layout:
 *   Desktop: two equal columns · hairline column divider · mono eyebrow +
 *     serif h2 + sans body + hairline underline link.
 *   Mobile: stacked · single-column · no divider.
 */

const MODES = [
  {
    key: "managed",
    eyebrow: "Building fresh?",
    headline: "Build your platform on Nebbos.",
    body:
      "Every capability first-party. Nebbos-native CRM, deploy, secrets, payment processing, tasks, on-call, docs, identity — no upstream Attio, Railway, Doppler, or Stripe accounts required. Your platform runs on Nebbos infrastructure; your end-users see your brand; the substrate stays out of the way.",
    ctaLabel: "See the four products →",
    ctaHref: "/products",
  },
  {
    key: "federated",
    eyebrow: "Already have a stack?",
    headline: "Nebbos unifies every tool your team already uses.",
    body:
      "Connect your existing AWS, GitHub, Doppler, Attio, Google Workspace, Slack — Nebbos ingests, orchestrates, and exposes all of them through one MCP surface. Everything they do, unified. Plus what only Nebbos can do: hardware-attested tier gates, per-domain Pearls, and a portable substrate you keep.",
    ctaLabel: "See the substrate →",
    ctaHref: "/trust",
  },
] as const;

export function HomeModesBand() {
  return (
    <section
      aria-labelledby="home-modes-heading"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="container"
        style={{
          paddingBlock: "clamp(64px, 10vh, 128px)",
          display: "grid",
          gap: "clamp(32px, 5vw, 56px)",
        }}
      >
        <div style={{ display: "grid", gap: "clamp(12px, 1.5vw, 20px)" }}>
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
            Two shapes · one MCP
          </p>
          <h2
            id="home-modes-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: 0,
              maxWidth: "22ch",
              textWrap: "balance",
            }}
          >
            Whichever way you show up.
          </h2>
        </div>

        <div className="home-modes__grid">
          {MODES.map((m, i) => (
            <div
              key={m.key}
              className="home-modes__col"
              style={{
                display: "grid",
                gap: 20,
                paddingLeft: 24,
                borderLeft: "2px solid var(--gold)",
                ...(i === 1
                  ? { }
                  : { }),
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  margin: 0,
                }}
              >
                {m.eyebrow}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(24px, 2.8vw, 34px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                  fontWeight: 500,
                  color: "var(--ink)",
                  margin: 0,
                  maxWidth: "18ch",
                  textWrap: "balance",
                }}
              >
                {m.headline}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.3vw, 17px)",
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  margin: 0,
                  maxWidth: "44ch",
                }}
              >
                {m.body}
              </p>
              <Link
                href={m.ctaHref}
                className="home-modes__cta"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "none",
                  paddingBlock: 8,
                  borderBottom: "1px solid var(--rule)",
                  width: "fit-content",
                  transition:
                    "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
                }}
              >
                {m.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .home-modes__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 4vw, 56px);
        }
        @media (min-width: 720px) {
          .home-modes__grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(40px, 5vw, 80px);
          }
        }
        .home-modes__cta:hover {
          color: var(--gold) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}
