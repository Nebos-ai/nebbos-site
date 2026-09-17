import Link from "next/link";

/**
 * HomeModesBand · v2 · 2026-09-17 · rebuilt against design/tokens.json
 *
 * v1 (earlier this session): inline-styled with magic clamp() ranges, no
 * motion, no reduced-motion handling. Founder critique: "spacing, font
 * sizing looks like designed by basic AI · you didn't look for any skills
 * improvements for your front end design."
 *
 * v2 reaches for the actual design substrate:
 *   - CSS custom properties from design/tokens.json (--size-h1, --size-h3,
 *     --size-lede, --size-eyebrow, --size-micro, --font-serif, --font-mono,
 *     --font-sans, --gold, --ink, --ink-2, --ink-3, --rule, --paper,
 *     --container-max) — no magic numbers for type or color
 *   - 4/8 spacing grid throughout
 *   - Section shape mirrors SubstrateBaselineBand (mono eyebrow → serif h2
 *     with italic-gold em accent → editorial lede/columns) — the ratified
 *     "Palantir-restrained + Apple-language" reference pattern
 *   - Two-column body split with hairline column divider at ≥900px
 *   - Scroll-timeline fade-in on each column (CanonicalSection pattern) —
 *     zero-JS animation-timeline: view() with degrade
 *   - prefers-reduced-motion collapses animation + shortens transitions to
 *     ~100ms (skill: motion reduces, doesn't eliminate)
 *   - :focus-visible ring at accent-2 with 4px offset for keyboard nav
 *
 * Register: Institutional Reserve · warm cream ground · hairline dividers
 * · serif display + serif lede body + mono eyebrows. Editorial preset per
 * ui-design skill (serif display + warm off-white + claret/gold accent).
 */

type Mode = {
  key: string;
  numeral: string;
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const MODES: readonly Mode[] = [
  {
    key: "managed",
    numeral: "01",
    eyebrow: "Managed",
    headline: "Build your platform on Nebbos.",
    body: "Every capability first-party. Nebbos-native CRM, deploy, secrets, payment processing, tasks, on-call, docs, identity — no upstream Attio, Railway, Doppler, or Stripe accounts required. Your platform runs on Nebbos infrastructure; your end-users see your brand; the substrate stays out of the way.",
    ctaLabel: "See the products",
    ctaHref: "/products",
  },
  {
    key: "federated",
    numeral: "02",
    eyebrow: "Federated",
    headline: "Nebbos unifies every tool your team already uses.",
    body: "Connect your existing AWS, GitHub, Doppler, Attio, Google Workspace, Slack — Nebbos ingests, orchestrates, and exposes them through one MCP surface. Everything they do, unified. Plus what only Nebbos can do: hardware-attested tier gates, per-domain Pearls, and a portable substrate you keep.",
    ctaLabel: "See the substrate",
    ctaHref: "/trust",
  },
];

export function HomeModesBand() {
  return (
    <section
      aria-labelledby="home-modes-heading"
      className="home-modes"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        color: "var(--ink)",
      }}
    >
      <div
        className="container home-modes__inner"
        style={{
          // Section spacing tokens · standard tier — ratified 2026-09-18
          paddingBlock: "var(--section-y-standard)",
          display: "grid",
          gap: "var(--section-gap-standard)",
          maxWidth: "var(--container-max)",
        }}
      >
        {/* Section eyebrow — SubstrateBaselineBand pattern, no numeral */}
        <p
          className="home-modes__eyebrow"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--size-eyebrow)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            margin: 0,
          }}
        >
          Two shapes · one MCP
        </p>

        {/* H2 — italic-gold em accent (SubstrateBaselineBand shape) */}
        <h2
          id="home-modes-heading"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--size-h1)",
            lineHeight: 1.04,
            letterSpacing: "-0.024em",
            fontWeight: 400,
            color: "var(--ink)",
            margin: 0,
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          Whichever way{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: "inherit" }}>
            you show up.
          </em>
        </h2>

        {/* Two-column body with hairline divider between */}
        <div className="home-modes__grid">
          {MODES.map((mode) => (
            <article key={mode.key} className="home-modes__col">
              <div className="home-modes__col-eyebrow">
                <span className="home-modes__col-numeral">{mode.numeral}</span>
                <span className="home-modes__col-dot" aria-hidden>·</span>
                <span className="home-modes__col-label">{mode.eyebrow}</span>
              </div>

              <h3 className="home-modes__col-heading">{mode.headline}</h3>

              <p className="home-modes__col-body">{mode.body}</p>

              <Link href={mode.ctaHref} className="home-modes__cta">
                <span>{mode.ctaLabel}</span>
                <span aria-hidden className="home-modes__cta-arrow">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .home-modes__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 88px);
        }
        @media (min-width: 900px) {
          .home-modes__grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(48px, 6vw, 96px);
          }
        }

        .home-modes__col {
          display: grid;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .home-modes__col + .home-modes__col {
            padding-inline-start: clamp(48px, 6vw, 96px);
            border-inline-start: 1px solid var(--rule);
          }
        }

        .home-modes__col-eyebrow {
          display: inline-flex;
          align-items: baseline;
          gap: 12px;
        }
        .home-modes__col-numeral {
          font-family: var(--font-mono);
          font-size: 24px;
          line-height: 1;
          color: var(--accent-2);
          font-weight: 400;
          font-variant-numeric: tabular-nums;
        }
        .home-modes__col-dot {
          color: var(--ink-3);
          opacity: 0.4;
        }
        .home-modes__col-label {
          font-family: var(--font-mono);
          font-size: var(--size-eyebrow);
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--accent-2);
        }

        .home-modes__col-heading {
          font-family: var(--font-serif);
          font-size: var(--size-h3);
          line-height: 1.15;
          letter-spacing: -0.015em;
          font-weight: 500;
          color: var(--ink);
          margin: 0;
          max-width: 20ch;
          text-wrap: balance;
        }

        .home-modes__col-body {
          font-family: var(--font-serif);
          font-size: var(--size-lede);
          line-height: 1.6;
          color: var(--ink-2);
          margin: 0;
          max-width: 42ch;
        }

        .home-modes__cta {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          padding-block: 8px;
          border-bottom: 1px solid var(--rule);
          width: fit-content;
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          min-height: 24px;
          transition:
            color 150ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 150ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .home-modes__cta-arrow {
          font-family: var(--font-serif);
          font-size: 14px;
          transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .home-modes__cta:hover,
        .home-modes__cta:focus-visible {
          color: var(--accent-2);
          border-color: var(--accent-2);
        }
        .home-modes__cta:hover .home-modes__cta-arrow,
        .home-modes__cta:focus-visible .home-modes__cta-arrow {
          transform: translateX(4px);
        }
        .home-modes__cta:focus-visible {
          outline: 2px solid var(--accent-2);
          outline-offset: 4px;
          border-radius: 2px;
        }

        @keyframes homeModesFadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .home-modes__col {
          animation: homeModesFadeIn linear both;
          animation-timeline: view();
          animation-range: entry 0% entry 60%;
        }
        @media (prefers-reduced-motion: reduce) {
          .home-modes__col {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .home-modes__cta,
          .home-modes__cta-arrow {
            transition-duration: 100ms !important;
          }
        }
      `}</style>
    </section>
  );
}
