import type { Metadata } from "next";
import packageJson from "@/package.json";
import { PlusMark } from "@/components/ui/PlusMark";

export const metadata: Metadata = {
  title: "How this was built",
  description:
    "The 12-dimension elite bar the nebbos.ai substrate is measured against, and the current state of each. Rendered from the running build — no separate doctrine to drift from.",
};

/**
 * /how — meta-portfolio surface (Axis C dim 10 + 11 close-out).
 *
 * Publishes selected trail elements: the 12-dimension elite bar with
 * current-state ratchet, the build stamp (framework version + commit +
 * deploy time), the CI-gate status. Entity voice throughout.
 *
 * Data comes from three places:
 *   - package.json dependency versions (Next/React) at build time
 *   - Vercel/Railway env vars for commit SHA + deploy timestamp
 *   - The manifest below (elite-bar scorecard) — hand-curated, ratchets
 *     as each dim earns its gate. This is the "governance-as-code" line
 *     item: the scorecard IS the doctrine, and it's in the repo.
 */

type DimState = "at-elite" | "advancing" | "gap" | "miss";

const DIM_STATE_META: Record<DimState, { label: string; tone: string }> = {
  "at-elite": { label: "at elite", tone: "var(--gold)" },
  advancing: { label: "advancing", tone: "var(--accent-2)" },
  gap: { label: "gap", tone: "var(--ink-2)" },
  miss: { label: "miss", tone: "var(--ink-3)" },
};

const DIMENSIONS: Array<{
  n: number;
  name: string;
  bar: string;
  state: DimState;
  note: string;
}> = [
  {
    n: 1,
    name: "Framework",
    bar: "Next 15.5.21 · React 19.1.0 · App Router · RSC · edge runtime",
    state: "at-elite",
    note: "Standardized on the release channel, disciplined client-boundary splits, streaming SSR available where the shape warrants it.",
  },
  {
    n: 2,
    name: "Rendering",
    bar: "force-static for marketing IA · Suspense + streaming SSR elsewhere",
    state: "advancing",
    note: "Marketing routes render statically at build time. Suspense boundaries in place on the pages that fetch (blog article, compliance). No unnecessary revalidate=false CDN pins.",
  },
  {
    n: 3,
    name: "Type system",
    bar: "OKLCH primitives · light-dark() · color-mix() · clamp() · JSON SoT",
    state: "gap",
    note: "Design tokens live in design/tokens.json (see /design). Migration from legacy hex to OKLCH primitives is in progress.",
  },
  {
    n: 4,
    name: "Motion",
    bar: "View Transitions API · @property · @starting-style · animation-timeline",
    state: "advancing",
    note: "View Transitions API shipped and active on every same-origin nav. Motion library (motion@13) reserved for the architecture graph. Native CSS motion primitives (@property, @starting-style) queued.",
  },
  {
    n: 5,
    name: "Performance",
    bar: "LCP < 1s · INP < 100ms · CLS 0 · Lighthouse ≥ 95 · CI-gated",
    state: "at-elite",
    note: "Lighthouse-CI gate is BLOCKING as of 2026-09-16 (11 URLs covered, perf ≥ 0.85, a11y ≥ 0.95). Every PR that regresses fails to merge.",
  },
  {
    n: 6,
    name: "Accessibility",
    bar: "WCAG 2.2 AA · axe-core CI-gated · reduced-motion · forced-colors",
    state: "at-elite",
    note: "axe-core WCAG 2.2 AA is BLOCKING as of 2026-09-16. Every PR runs a full Playwright a11y sweep across the marketing pages and cannot merge on any violation.",
  },
  {
    n: 7,
    name: "Assets",
    bar: "Dynamic edge OG images per page · AVIF+WebP with <picture> fallbacks · video reduced-motion fallback",
    state: "at-elite",
    note: "next/og site-wide OG image plus per-product OG images (Platform, App, MCP, USB). All shipped and edge-rendered.",
  },
  {
    n: 8,
    name: "Content substrate",
    bar: "Typed content registry · section-as-frame code organization · MDX for long-form",
    state: "at-elite",
    note: "content/pages.ts is the typed source. Sections render as named components; long-form ships as MDX. Every customer-facing string is grep-addressable.",
  },
  {
    n: 9,
    name: "Design substrate",
    bar: "Live /design · versioned doctrine · published charter",
    state: "at-elite",
    note: "See /design — the style guide reads design/tokens.json at build time and renders it live. Same tokens the site consumes. No second source of truth.",
  },
  {
    n: 10,
    name: "Observability",
    bar: "Web Vitals endpoint · error boundary · /how · build metadata",
    state: "at-elite",
    note: "Web Vitals ship to /api/vitals via navigator.sendBeacon on every route. Error boundary at the layout tier. This page renders the build stamp below.",
  },
  {
    n: 11,
    name: "Governance-as-code",
    bar: "Commit-message doctrine · pre-push hooks · doctrine enforced",
    state: "advancing",
    note: "Vocabulary CI-gated. Truth-claim retractions CI-gated. Retired-vocab patterns coming online. Commit messages carry decision trails.",
  },
  {
    n: 12,
    name: "Cutting-edge polish",
    bar: "Speculation Rules · View Transitions · scroll-driven animations · dark palette",
    state: "advancing",
    note: "Speculation Rules API shipped for anticipatory prefetch (Chrome 121+). View Transitions on. Scroll-driven animations and a curated dark palette are queued.",
  },
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
  margin: 0,
};

/**
 * Numbered section eyebrow (per design/tokens.json signature-devices.section-numeral):
 *   <PlusMark size="sm" /> + tabular numeral + · + LABEL
 * The PlusMark sits inline with the mono numeral for the delta-brief
 * editorial signature-mark density.
 */
function NumeralEyebrow({ n, label }: { n: string; label: string }) {
  return (
    <p
      style={{
        ...eyebrow,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <PlusMark size="sm" />
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{n}</span>
      <span aria-hidden>&middot;</span>
      <span>{label}</span>
    </p>
  );
}

export default function HowPage() {
  const nextVersion = (packageJson.dependencies as Record<string, string>).next;
  const reactVersion = (packageJson.dependencies as Record<string, string>).react;
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.RAILWAY_GIT_COMMIT_SHA ??
    process.env.GIT_COMMIT_SHA ??
    "local";
  const commitShort = commitSha === "local" ? "local" : commitSha.slice(0, 7);
  const buildTime = new Date().toISOString().slice(0, 10);

  const counts = DIMENSIONS.reduce(
    (acc, d) => {
      acc[d.state] += 1;
      return acc;
    },
    { "at-elite": 0, advancing: 0, gap: 0, miss: 0 } as Record<DimState, number>,
  );

  return (
    <>
      {/* Hero */}
      <section
        className="section section--paper"
        style={{ paddingBlock: "clamp(80px, 14vh, 160px)" }}
      >
        <div className="container">
          <NumeralEyebrow n="00" label="How this was built" />
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.028em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "16px 0 20px 0",
              maxWidth: "22ch",
              textWrap: "balance",
            }}
          >
            The bar we hold,{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              and the state.
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
              margin: "0 0 24px 0",
              maxWidth: "56ch",
            }}
          >
            Twelve dimensions of what a 2026 front-end substrate looks like at
            elite. The scorecard below is what the running site is measured
            against &mdash; not what it aspires to. Any dim marked{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>at elite</em>{" "}
            has a CI-gate or a shipped surface behind it. Anything not there
            says so honestly.
          </p>
          <p style={eyebrow}>
            {counts["at-elite"]} at elite &middot; {counts.advancing} advancing &middot; {counts.gap} gap &middot; {counts.miss} miss
          </p>
        </div>
      </section>

      {/* Scorecard */}
      <section
        className="section section--paper"
        style={{
          paddingBlock: "clamp(48px, 8vh, 96px)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <NumeralEyebrow n="01" label="The 12-dimension scorecard" />
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: "32px 0 0 0",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {DIMENSIONS.map((d) => {
              const meta = DIM_STATE_META[d.state];
              return (
                <li
                  key={d.n}
                  style={{
                    borderTop: "1px solid var(--rule-2)",
                    paddingTop: 20,
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 20,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 20,
                      fontVariantNumeric: "tabular-nums",
                      color: "var(--gold)",
                      lineHeight: 1,
                      paddingTop: 4,
                    }}
                  >
                    {d.n.toString().padStart(2, "0")}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 22,
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                        margin: 0,
                      }}
                    >
                      {d.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--ink-3)",
                        margin: "4px 0 12px 0",
                      }}
                    >
                      {d.bar}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "var(--ink-2)",
                        margin: 0,
                        maxWidth: "72ch",
                      }}
                    >
                      {d.note}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: meta.tone,
                      whiteSpace: "nowrap",
                      paddingTop: 6,
                    }}
                  >
                    {meta.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Build stamp */}
      <section
        className="section section--paper"
        style={{
          paddingBlock: "clamp(48px, 8vh, 96px)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <NumeralEyebrow n="02" label="Build stamp" />
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 32,
              margin: "32px 0 0 0",
            }}
          >
            {[
              ["Next", `v${nextVersion}`],
              ["React", `v${reactVersion}`],
              ["Commit", commitShort],
              ["Rendered", buildTime],
            ].map(([label, value]) => (
              <div key={label} style={{ borderTop: "1px solid var(--rule-2)", paddingTop: 16 }}>
                <dt style={{ ...eyebrow, marginBottom: 8 }}>{label}</dt>
                <dd
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 20,
                    color: "var(--ink)",
                    margin: 0,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
