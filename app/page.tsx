import { ProductTile } from "@/components/sections/ProductTile";

/**
 * PAGE · / (Home) · v6 · 2026-09-16 · Apple-style product-catalog register
 *
 * Founder direction 2026-09-16: "https://www.apple.com this is a product
 * site what we have is not". Home rebuilt to match apple.com's home-page
 * shape: stack of product tiles, each carrying a full-bleed product image
 * + product name (big sans) + one-line tagline + two CTAs (Learn more +
 * Get in touch). Zero editorial paragraphs. Zero chapter numerals. Zero
 * italic-gold accents in H2s. The composition is the product line.
 *
 * Retired from home composition (files kept on disk per governance-
 * additive-only doctrine — no longer imported here):
 *   - HomeHero            (manifesto + editorial deck)
 *   - InProductionBand    (long-form editorial spread)
 *   - SubstrateBaselineBand
 *   - BuiltWithNebbosBand
 *   - NebbosInventoryBand
 *   - HomeBands           (5-band accordion)
 *   - HomeStory           (3-scene 15-layer story arc)
 *   - HomeCTA             (closing full-bleed CTA)
 *
 * Any of those still work as reusable components (their files stay); the
 * home page just no longer composes them. Editorial pattern lives on
 * /about, /how, /design where it fits the meta-content shape.
 *
 * Register amendment: Institutional Reserve (editorial cream + hairlines +
 * long prose) → PRODUCT CATALOG (image-dominant, minimal copy, tile grid,
 * dual-CTA per product). Amends `nebbos-design-charter` for the site
 * chrome. Story-moment cinematic-still bar (Hand-of-God visual bar) is
 * preserved and MORE prominent under the new register.
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
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Nebbos
      </h1>
      {PRODUCTS.map((p, i) => (
        <ProductTile
          key={p.key}
          eyebrow={p.eyebrow}
          headline={p.headline}
          imageFamily={p.imageFamily}
          learnHref={p.learnHref}
          buyHref="/contact"
          priority={i === 0}
        />
      ))}
    </>
  );
}
