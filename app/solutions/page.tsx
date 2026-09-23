import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { PearlMosaic } from "@/components/marketing/PearlMosaic";
import { PearlCard } from "@/components/marketing/PearlCard";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Eyebrow, GhostCta, PrimaryCta, Section, deck, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { balancedSpans } from "@/lib/balance";

/**
 * PAGE · /solutions · v2 · 2026-09-18 · marketing-register rebuild
 *
 * 2026-09-23 redesign (visual only, copy frozen): shared PageHero +
 * PearlMosaic, the nine verticals as tinted PearlCards in a 3 × 3 grid
 * (the substrate card carries a grid field), shared ClosingCta.
 *
 * Migrates from PAGES.solutions (single-hero stub with "Vertical cards
 * rendered inline" comment) to a native dark-register directory: 9
 * industry verticals as a card grid. Each card carries eyebrow + Pearl
 * name + tagline + "Open" link, colored per row for scanability.
 *
 * The 9 vertical detail pages (/solutions/operations, /finance, ...)
 * still route via [...slug] and inherit the .mkt-mode wrapper for
 * color-only migration; per-vertical native rebuilds are Wave 3.
 */

export const metadata: Metadata = {
  title: "Solutions · A Pearl for every domain",
  description:
    "Nine industry Pearls. Nebbos Operations, Finance, People, Education, Care, FS, Manufacturing, Civic, Training Substrate. Pick the domain closest to yours.",
};

const VERTICALS = [
  { slug: "operations",          eyebrow: "Function",  name: "Nebbos Operations",         tagline: "Handoffs, coverage, incident triage." },
  { slug: "finance",             eyebrow: "Function",  name: "Nebbos Finance",            tagline: "Close, forecast, variance." },
  { slug: "people",              eyebrow: "Function",  name: "Nebbos People",             tagline: "Hiring, onboarding, retention." },
  { slug: "k12",                 eyebrow: "Industry",  name: "Nebbos Education",          tagline: "The Pearl for district operations." },
  { slug: "healthcare",          eyebrow: "Industry",  name: "Nebbos Care",               tagline: "Care coordination, compliance." },
  { slug: "financial-services",  eyebrow: "Industry",  name: "Nebbos FS",                 tagline: "Trading ops, risk, audit." },
  { slug: "manufacturing",       eyebrow: "Industry",  name: "Nebbos Manufacturing",      tagline: "Production, quality, supply." },
  { slug: "public-sector",       eyebrow: "Industry",  name: "Nebbos Civic",              tagline: "Case management, accountability." },
  { slug: "model-training",      eyebrow: "Substrate", name: "Nebbos Training Substrate", tagline: "Your operation is the training data." },
];

// Row-balanced: 3 × 3 on desktop, 2-2-2-2 + a full-width substrate card on tablet.
const SPANS = balancedSpans(VERTICALS.length, { lg: 3, sm: 2 });

const TINTS = ["var(--color-platform)", "var(--color-app)", "var(--color-mcp)", "var(--color-cradle)"];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        id="solutions-h"
        eyebrow="Solutions"
        title="A Pearl for every domain."
        deck={
          <>
            Every industry has departments that would run better with a
            brain. Nebbos ships eight Pearls tuned to those departments,
            plus a training substrate that turns your operation into
            your own preference data. Pick the one closest to yours.
          </>
        }
        ctas={
          <>
            <PrimaryCta href="/demo">Book a demo</PrimaryCta>
            <GhostCta href="#verticals">See the catalog</GhostCta>
          </>
        }
        visual={<PearlMosaic />}
      />

      {/* VERTICALS DIRECTORY · 3 functions, 5 industries, 1 substrate = 3 × 3 */}
      <Section labelledBy="verticals">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Eight Pearls + one substrate</Eyebrow>
          <h2 id="verticals" className={cn(headline, "scroll-mt-32 text-[clamp(2.25rem,4.8vw,4rem)]")}>
            <RevealWords>Three functions. Five industries. One training substrate.</RevealWords>
          </h2>
          <p className={deck}>
            Function Pearls (Operations, Finance, People) work across every
            industry. Industry Pearls (Education, Care, FS, Manufacturing,
            Civic) come pre-tuned to that vertical&rsquo;s ops shape.
            Underneath them, the Training Substrate captures every
            decision your team makes as a preference pair.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-12 gap-4 lg:gap-5" step={0.06}>
          {VERTICALS.map((v, i) => (
            <StaggerItem key={v.slug} className={SPANS[i]}>
              <PearlCard
                href={`/solutions/${v.slug}`}
                tint={TINTS[i % 4]!}
                eyebrow={v.eyebrow}
                name={v.name.replace("Nebbos ", "")}
                tagline={v.tagline}
                featured={v.eyebrow === "Substrate"}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <ClosingCta
        id="solutions-close"
        eyebrow="Which one first?"
        title="Name the department. We map the Pearl."
        deck={
          <>
            Thirty minutes. Bring one department. We show you which Pearl
            fits, which signals it reads, and what its first shift looks like.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: "/contact", label: "Contact sales" }}
      />
    </>
  );
}
