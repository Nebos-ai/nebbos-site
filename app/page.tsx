import { PageHero } from "@/components/primitives/PageHero";
import { Button } from "@/components/primitives/Button";

/**
 * PAGE · / (Home) · v9 · 2026-09-17 · Nebbos wordmark spray hero
 *
 * Hero: interactive canvas 2D physics playground where a spray-can dispenses
 * strands over the Nebbos wordmark. The strands collide with the wordmark
 * silhouette (rendered as an SVG collision map behind the canvas) and fall,
 * pile, and settle around it. Interactive on desktop + touch; auto-demo on
 * page load so the wordmark is discoverable within the first two seconds.
 *
 * Served as a static HTML file under public/hero/nebbos-hero.html (own
 * document context) and embedded via iframe. Middleware exempts /hero/ so
 * the demo's inline `<script>` blocks and its jsDelivr importmap load
 * without CSP conflict.
 *
 * Below the hero: the four Nebbos product tiles (Platform / App / MCP /
 * USB) as scene-grounded PageHero primitives.
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
      <h1 className="visually-hidden">Nebbos</h1>
      <section className="home-hero-wordmark" aria-label="Nebbos wordmark, interactive hero">
        <iframe
          src="/hero/nebbos-hero.html"
          title="Nebbos wordmark — interactive"
          className="home-hero-wordmark__frame"
          loading="eager"
          scrolling="no"
        />
      </section>
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
