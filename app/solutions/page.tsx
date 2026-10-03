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
  title: "Solutions · A working brain for every department",
  description:
    "Eight Pearls — three functions, five industries — plus one training substrate. Each Pearl is a working brain shaped by the pressure of its domain. Pick the one closest to yours.",
};

const VERTICALS = [
  { slug: "operations",          eyebrow: "Function",  name: "Nebbos Operations",         tagline: "Stays up when the shift can't. Names the fire before it starts." },
  { slug: "finance",             eyebrow: "Function",  name: "Nebbos Finance",            tagline: "Closes on the day you said. Finds the variance before the board asks." },
  { slug: "people",              eyebrow: "Function",  name: "Nebbos People",             tagline: "Reads why people leave two weeks before they say it. Onboards every hire the way your best one was." },
  { slug: "k12",                 eyebrow: "Industry",  name: "Nebbos Education",          tagline: "Runs the district behind the district. Every classroom accounted for by 8:15." },
  { slug: "healthcare",          eyebrow: "Industry",  name: "Nebbos Care",               tagline: "Coordinates the care your chart already ordered. Compliance that doesn't cost a nurse a shift." },
  { slug: "financial-services",  eyebrow: "Industry",  name: "Nebbos FS",                 tagline: "Reads the desk. Names the risk. Signs the audit." },
  { slug: "manufacturing",       eyebrow: "Industry",  name: "Nebbos Manufacturing",      tagline: "Catches the defect before the line stops. Tracks every part from PO to pallet." },
  { slug: "public-sector",       eyebrow: "Industry",  name: "Nebbos Civic",              tagline: "Every case timestamped and answerable. Case management a resident could audit." },
  { slug: "model-training",      eyebrow: "Substrate", name: "Nebbos Training Substrate", tagline: "Every yes and no becomes a preference pair. Six months in, the Pearl talks like your best operator." },
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
        title="Every department gets its own working brain."
        deck={
          <>
            A Pearl is the intelligence your ops team never had — it
            watches every handoff, remembers every decision, and shows
            up before the fire does. Eight of them, each pre-shaped for
            a domain, plus a training substrate underneath. Pick the
            one closest to yours.
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
            Function Pearls (Operations, Finance, People) come with the
            domain-general intelligence — they slot into any industry.
            Industry Pearls (Education, Care, FS, Manufacturing, Civic)
            arrive pre-shaped by the domain — the vocabulary, the
            regulations, the muscle memory. The Training Substrate is
            what makes them yours — every decision your team makes,
            encoded as a preference pair, until the Pearl talks like
            your best operator.
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
