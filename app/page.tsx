import { HeroFlowerSplit } from "@/components/primitives/HeroFlowerSplit";
import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";

/**
 * PAGE · / (Home) · v8 · 2026-09-17 · flower-split hero + 4 product tiles
 *
 * Hero: interactive 19-ring flower-of-life mark that opens unified and
 * fans out to 19 clickable rings, each surfacing a Nebbos-lens blurb on
 * click. Founder-directed 2026-09-17 — every ring is one aspect of a
 * company (Security, Compliance, Memory, Workflow, ...), business-lens
 * importance-ranked so the buyer's eye tracks priority as the reveal
 * animation plays. See content/hero-flower-terms.ts for the 19 terms +
 * blurbs; components/primitives/HeroFlowerSplit.tsx for the substrate.
 *
 * Below the hero: the four Nebbos product tiles (Platform / App / MCP /
 * USB) as scene-grounded PageHero primitives — retained from v7.
 */

const PRODUCTS = [
  {
    key: "platform" as const,
    eyebrow: "Nebbos Platform",
    headline: "Operations at institutional scale.",
    imageFamily: "concept-operator-onboarding",
    learnHref: "/products/platform",
  },
  {
    key: "app" as const,
    eyebrow: "Nebbos App",
    headline: "Local. Native. Yours.",
    imageFamily: "concept-memory",
    learnHref: "/products/app",
  },
  {
    key: "mcp" as const,
    eyebrow: "Nebbos MCP",
    headline: "The tool substrate. Attested.",
    imageFamily: "concept-pearl",
    learnHref: "/products/mcp",
  },
  {
    key: "usb" as const,
    eyebrow: "Nebbos USB",
    headline: "Peace of mind you can hold.",
    imageFamily: "concept-audit-attestation",
    learnHref: "/products/usb",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroFlowerSplit />
      {PRODUCTS.map((p) => (
        <PageHero
          key={p.key}
          eyebrow={p.eyebrow}
          headline={p.headline}
          headingLevel="h2"
          imageFamily={p.imageFamily}
          surface="scene"
          align="center"
          ctas={
            <>
              <Button variant="ghost" tone="onDark" href={p.learnHref}>Learn more</Button>
              <Button variant="ghost" tone="onDark" href="/contact">Get in touch</Button>
            </>
          }
        />
      ))}
    </>
  );
}
