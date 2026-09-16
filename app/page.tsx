import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";

/**
 * PAGE · / (Home) · v7 · 2026-09-16 · consumes design substrate v3 primitives
 *
 * Every visual value flows from `@layer tokens` via className on the
 * primitives. Zero inline `style={{fontFamily/fontSize/padding/gap: ...}}`
 * in this file. Zero hardcoded `clamp()`. Zero `<Link style={{}}>`.
 *
 * Composition: stack of 4 <PageHero surface="scene" align="center"> tiles,
 * one per Nebbos product line. Each with 2 <Button> CTAs (ghost / onDark).
 * Retires the ProductTile bespoke component; PageHero now carries the
 * entire tile shape from the primitive library.
 *
 * See docs/design/README.md for the substrate spec.
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
      {/* Screen-reader-only H1 — one per document, matches apple.com pattern. */}
      <h1 className="visually-hidden">Nebbos</h1>
      {PRODUCTS.map((p, i) => (
        <PageHero
          key={p.key}
          eyebrow={p.eyebrow}
          headline={p.headline}
          headingLevel="h2"
          imageFamily={p.imageFamily}
          surface="scene"
          align="center"
          priority={i === 0}
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
