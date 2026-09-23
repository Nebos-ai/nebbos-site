import type { Metadata } from "next";
import packageJson from "@/package.json";
import { PageHero } from "@/components/marketing/PageHero";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Eyebrow, Section, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { HudCorners, IndexMark } from "@/components/marketing/IndexMark";

export const metadata: Metadata = {
  title: "How this was built",
  description:
    "The twelve-dimension bar the nebbos.ai substrate is measured against, and the current state of each. Rendered from the running build.",
};

/**
 * /how · v4 · 2026-09-23 · Tailwind + Motion redesign (visual only):
 * scorecard as state-badged cards, build stamp as mono stat tiles.
 *
 * v3 · 2026-09-18 · mkt-native rebuild:
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

const STATE_STYLE: Record<DimState, string> = {
  "at-elite": "bg-emerald-400/10 text-emerald-300 ring-emerald-400/25",
  advancing: "bg-accent/10 text-accent ring-accent/30",
  gap: "bg-app/10 text-[#ffb27a] ring-app/30",
  miss: "bg-cradle/10 text-[#f08a95] ring-cradle/30",
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

  const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");
  const stamp: Array<[string, string]> = [
    ["Next", `v${nextVersion}`],
    ["React", `v${reactVersion}`],
    ["Commit", commitShort],
    ["Rendered", buildTime],
  ];

  return (
    <>
      <PageHero
        id="how-h"
        eyebrow="How this was built"
        title="The bar we hold, and the state."
        deck={
          <>
            Twelve dimensions of what a 2026 front-end substrate looks
            like at elite. Every score below is what the running site
            is measured against &mdash; not what it aspires to. Anything
            marked <em>at elite</em> has a CI gate or a shipped surface
            behind it.
          </>
        }
        ctas={
          <p className="m-0 rounded-pill bg-white/[0.03] px-4 py-2.5 font-code text-[11px] uppercase tracking-[0.14em] text-ink-2 ring-1 ring-rule ring-inset">
            {counts["at-elite"]} at elite · {counts.advancing} advancing · {counts.gap} gap · {counts.miss} miss
          </p>
        }
      />

      <Section labelledBy="how-scorecard">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>The scorecard</Eyebrow>
          <h2 id="how-scorecard" className={h2}>
            <RevealWords>Twelve dimensions. One running site.</RevealWords>
          </h2>
        </Reveal>
        <Stagger as="ol" className="m-0 mt-14 grid list-none gap-4 p-0 md:grid-cols-2 lg:gap-5" step={0.05}>
          {DIMENSIONS.map((d) => (
            <StaggerItem
              key={d.n}
              as="li"
              className="spotlight group relative flex flex-col gap-3 overflow-hidden rounded-[1.4rem] bg-ground-2 p-6 ring-1 ring-rule ring-inset md:p-7"
            >
              <span aria-hidden className="grid-dots pointer-events-none absolute inset-0 opacity-50" />
              <HudCorners />
              <IndexMark index={d.n - 1} total={DIMENSIONS.length} />
              <div className="relative mt-3 font-display text-xl font-medium tracking-tight text-ink">{d.name}</div>
              <p className="relative m-0 font-code text-[12.5px] leading-relaxed tracking-[0.02em] text-ink-3">{d.bar}</p>
              <p className="relative m-0 text-[15px] leading-relaxed text-ink-2">{d.note}</p>
              <p
                className={cn(
                  "relative m-0 mt-auto self-start rounded-pill px-3 py-1 font-code text-[10.5px] font-medium uppercase tracking-[0.14em] ring-1 ring-inset",
                  STATE_STYLE[d.state],
                )}
              >
                {STATE_LABEL[d.state]}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section labelledBy="how-stamp">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Build stamp</Eyebrow>
          <h2 id="how-stamp" className={h2}>
            <RevealWords>Rendered by the same commit you are reading.</RevealWords>
          </h2>
        </Reveal>
        <Reveal className="mt-14">
          <dl className="m-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {stamp.map(([label, value]) => (
              <div
                key={label}
                className="bezel-core flex min-h-[140px] flex-col justify-between gap-6 p-6 ring-1 ring-rule ring-inset"
              >
                <dt className="font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{label}</dt>
                <dd className="m-0 font-code text-2xl font-medium tabular-nums text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <ClosingCta
        id="how-close"
        eyebrow="The site is the artefact"
        title="Every surface here holds the bar above."
        deck={
          <>
            The gates are the doctrine. The doctrine is the site. When a
            score improves, that row moves and this page ratchets.
          </>
        }
        primary={{ href: "/products", label: "See the products" }}
        secondary={{ href: "/demo", label: "Book a demo" }}
      />
    </>
  );
}
