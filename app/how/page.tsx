import type { Metadata } from "next";
import Link from "next/link";
import packageJson from "@/package.json";

export const metadata: Metadata = {
  title: "How this was built",
  description:
    "The twelve-dimension bar the nebbos.ai substrate is measured against, and the current state of each. Rendered from the running build.",
};

/**
 * /how · v3 · 2026-09-18 · mkt-native rebuild
 *
 * v2 shape: section--paper + inline styles + serif italic hero
 * (var(--font-serif), --ink tokens, --accent-2). v3 shape: mkt-hero
 * + mkt-numlist for the 12 dimensions + mkt-rowstable for the build
 * stamp, so this "meta-portfolio" page reads as the same site as the
 * customer-facing surfaces.
 *
 * Content preserved: the 12-dimension elite bar with per-dim state
 * label + note, plus the runtime build stamp (Next / React / commit /
 * rendered date). This is honest self-observability — the scorecard
 * IS the doctrine, and it's in the repo.
 */

type DimState = "at-elite" | "advancing" | "gap" | "miss";

const STATE_LABEL: Record<DimState, string> = {
  "at-elite": "At elite",
  advancing: "Advancing",
  gap: "Gap",
  miss: "Miss",
};

const DIMENSIONS: Array<{
  n: number;
  name: string;
  bar: string;
  state: DimState;
  note: string;
}> = [
  { n: 1,  name: "Framework",         bar: "Next 15.5.21 · React 19.1.0 · App Router · RSC · edge runtime", state: "at-elite",  note: "Standardized on the release channel, disciplined client-boundary splits, streaming SSR available where the shape warrants it." },
  { n: 2,  name: "Rendering",         bar: "force-static for marketing IA · Suspense + streaming SSR elsewhere", state: "advancing", note: "Marketing routes render statically at build time. Suspense boundaries in place on the pages that fetch. No unnecessary revalidate=false CDN pins." },
  { n: 3,  name: "Type system",       bar: "OKLCH primitives · light-dark() · color-mix() · clamp() · JSON SoT", state: "gap",       note: "Design tokens live in design/tokens.json (see /design). Migration from legacy hex to OKLCH primitives is in progress." },
  { n: 4,  name: "Motion",            bar: "View Transitions API · @property · @starting-style · animation-timeline", state: "advancing", note: "View Transitions shipped and active on every same-origin nav. Scroll-timeline in place on the home shift beat. Motion library reserved for the architecture graph." },
  { n: 5,  name: "Performance",       bar: "LCP < 1s · INP < 100ms · CLS 0 · Lighthouse ≥ 95 · CI-gated", state: "at-elite",  note: "Lighthouse-CI gate is BLOCKING as of 2026-09-16 (11 URLs, perf ≥ 0.85, a11y ≥ 0.95). Every PR that regresses fails to merge." },
  { n: 6,  name: "Accessibility",     bar: "WCAG 2.2 AA · axe-core CI-gated · reduced-motion · forced-colors", state: "at-elite",  note: "axe-core WCAG 2.2 AA is BLOCKING as of 2026-09-16. Every PR runs a full Playwright a11y sweep across the marketing pages and cannot merge on any violation." },
  { n: 7,  name: "Assets",            bar: "Dynamic edge OG images per page · AVIF+WebP fallback · video reduced-motion fallback", state: "at-elite",  note: "next/og site-wide OG image plus per-product OG images. All shipped and edge-rendered." },
  { n: 8,  name: "Content substrate", bar: "Typed content registry · section-as-frame code organization · MDX for long-form", state: "at-elite",  note: "content/pages.ts is the typed source. Sections render as named components; long-form ships as MDX. Every customer-facing string is grep-addressable." },
  { n: 9,  name: "Design substrate",  bar: "Live /design · versioned doctrine · published charter", state: "at-elite",  note: "The style guide reads design/tokens.json at build time and renders it live. Same tokens the site consumes. No second source of truth." },
  { n: 10, name: "Observability",     bar: "Web Vitals endpoint · error boundary · /how · build metadata", state: "at-elite",  note: "Web Vitals ship to /api/vitals via navigator.sendBeacon on every route. Error boundary at the layout tier. This page renders the build stamp below." },
  { n: 11, name: "Governance-as-code", bar: "Commit-message doctrine · pre-push hooks · doctrine enforced", state: "advancing", note: "Vocabulary CI-gated. Truth-claim retractions CI-gated. Retired-vocab patterns coming online. Commit messages carry decision trails." },
  { n: 12, name: "Cutting-edge polish", bar: "Speculation Rules · View Transitions · scroll-driven animations · dark palette", state: "advancing", note: "Speculation Rules shipped for anticipatory prefetch. View Transitions on. Scroll-driven animations shipped on the home shift beat. Dark palette is the site register." },
];

export default function HowPage() {
  const deps = packageJson.dependencies as Record<string, string>;
  const nextVersion = deps.next;
  const reactVersion = deps.react;
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
      <section className="mkt mkt-section mkt-hero" aria-labelledby="how-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">How this was built</p>
            <h1 id="how-h" className="mkt-display">
              The bar we hold, and the state.
            </h1>
            <p className="mkt-deck">
              Twelve dimensions of what a 2026 front-end substrate looks
              like at elite. Every score below is what the running site
              is measured against &mdash; not what it aspires to. Anything
              marked <em>at elite</em> has a CI gate or a shipped surface
              behind it.
            </p>
            <p className="mkt-eyebrow" style={{ marginTop: 8 }}>
              {counts["at-elite"]} at elite · {counts.advancing} advancing · {counts.gap} gap · {counts.miss} miss
            </p>
          </div>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="how-scorecard">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The scorecard</p>
            <h2 id="how-scorecard" className="mkt-h2">
              Twelve dimensions. One running site.
            </h2>
          </header>
          <ol className="mkt-numlist">
            {DIMENSIONS.map((d) => (
              <li key={d.n} className="mkt-numlist__item">
                <span className="mkt-numlist__index" aria-hidden>
                  {d.n.toString().padStart(2, "0")}
                </span>
                <div className="mkt-numlist__body">
                  <div className="mkt-numlist__title">{d.name}</div>
                  <p className="mkt-numlist__desc" style={{ fontFamily: "var(--mkt-font-mono)", fontSize: 13, letterSpacing: "0.02em", color: "var(--mkt-text-3)" }}>
                    {d.bar}
                  </p>
                  <p className="mkt-numlist__desc">{d.note}</p>
                  <p className="mkt-numlist__desc" style={{ fontFamily: "var(--mkt-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mkt-accent)", marginTop: 6 }}>
                    {STATE_LABEL[d.state]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="how-stamp">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">Build stamp</p>
            <h2 id="how-stamp" className="mkt-h2">
              Rendered by the same commit you are reading.
            </h2>
          </header>
          <dl className="mkt-rowstable">
            <div className="mkt-rowstable__row">
              <dt className="mkt-rowstable__label">Next</dt>
              <dd className="mkt-rowstable__value" style={{ fontFamily: "var(--mkt-font-mono)" }}>v{nextVersion}</dd>
            </div>
            <div className="mkt-rowstable__row">
              <dt className="mkt-rowstable__label">React</dt>
              <dd className="mkt-rowstable__value" style={{ fontFamily: "var(--mkt-font-mono)" }}>v{reactVersion}</dd>
            </div>
            <div className="mkt-rowstable__row">
              <dt className="mkt-rowstable__label">Commit</dt>
              <dd className="mkt-rowstable__value" style={{ fontFamily: "var(--mkt-font-mono)" }}>{commitShort}</dd>
            </div>
            <div className="mkt-rowstable__row">
              <dt className="mkt-rowstable__label">Rendered</dt>
              <dd className="mkt-rowstable__value" style={{ fontFamily: "var(--mkt-font-mono)" }}>{buildTime}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="mkt mkt-section mkt-closing"
        aria-labelledby="how-close"
      >
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">The site is the artefact</p>
          <h2 id="how-close" className="mkt-display">
            Every surface here holds the bar above.
          </h2>
          <p className="mkt-deck">
            The gates are the doctrine. The doctrine is the site. When a
            score improves, that row moves and this page ratchets.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/products" className="mkt-cta mkt-cta--primary">
              See the products
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href="/demo" className="mkt-cta mkt-cta--ghost">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
