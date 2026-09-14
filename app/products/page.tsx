import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, TIERS } from "@/content/products";

/**
 * PAGE · /products · the four-product × three-tier customer taxonomy
 *
 * Founder-directed 2026-09-14. Nebbos.ai frames as the platform + tools +
 * MCP + USB security per feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14;
 * this page is where a customer sees the twelve SKUs and picks along
 * (product, tier). Sibling page to /product (singular) — /product carries
 * the 15-layer architecture treatise, /products carries the taxonomy.
 *
 * Register: paper ground, editorial hairlines, no cards or shadows —
 * matches the Institutional Reserve doctrine that governs nebbos.ai chrome.
 * Flower-of-life mark rendered inline (SVG); color via
 * --product-color-{platform,app,mcp,usb} CSS custom properties, currently
 * resolving to --gold (founder to ratify four hex codes; @nebbos/brand
 * v2.1.0 ships them).
 *
 * No published pricing per feedback_nebbos_no_published_pricing_palantir_model;
 * every cell renders "Contact sales" as the CTA.
 */

export const metadata: Metadata = {
  title: "Products · Four lines. Twelve SKUs.",
  description:
    "The Nebbos platform, the app, the MCP, and the USB. Four products, three tiers each — twelve SKUs total. Every operator picks along (product, tier).",
};

function FlowerMark({ color, className = "" }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={`w-8 h-8 ${className}`.trim()}
      aria-hidden="true"
    >
      <g fill="none" stroke={`var(${color}, var(--gold))`} strokeWidth="1.4">
        <circle cx="20" cy="20" r="7" />
        <circle cx="20" cy="13" r="7" />
        <circle cx="26" cy="16.5" r="7" />
        <circle cx="26" cy="23.5" r="7" />
        <circle cx="20" cy="27" r="7" />
        <circle cx="14" cy="23.5" r="7" />
        <circle cx="14" cy="16.5" r="7" />
      </g>
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="container-narrow py-32 md:py-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
          Products
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-ink leading-[1.05] text-balance">
          The platform, the app, the MCP, and the USB.
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed">
          Nebbos.ai runs your Pearls, your fleet, and your governance under
          one platform. It ships with the tools its MCP exposes, and with
          the security of a hardware-attested USB. Four products, three
          tiers each. Twelve SKUs. Every operator picks along{" "}
          <em className="font-serif italic text-ink">(product, tier)</em>.
        </p>
      </section>

      <section
        aria-labelledby="tier-composition"
        className="border-t border-b border-rule"
      >
        <div className="container-narrow py-16 md:py-20 space-y-8">
          <div className="space-y-3 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              Tier composition
            </p>
            <h2
              id="tier-composition"
              className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink"
            >
              Three tiers. Factors compose top-down.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.key} className="border-t border-rule pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                  {tier.label}
                </p>
                <p className="mt-3 text-sm text-ink leading-relaxed">
                  {tier.factors}
                </p>
                <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                  {tier.scope}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Product matrix">
        <div className="container-narrow py-20 md:py-28 space-y-10">
          <div className="space-y-3 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
              The matrix
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
              Four products. Twelve SKUs.
            </h2>
            <p className="text-base text-ink-2 leading-relaxed pt-2">
              Each product renders in a distinct flower-of-life color. Each
              physical Nebbos USB ships in the product&rsquo;s color body
              with a tier-level accent, so a customer holding an
              &ldquo;MCP-L2&rdquo; device sees the MCP color body with the
              L2 tier finish.
            </p>
          </div>

          <div className="space-y-12">
            {PRODUCTS.map((product) => (
              <article
                key={product.key}
                className="border-t border-rule pt-8"
              >
                <div className="flex items-start gap-5">
                  <FlowerMark color={product.colorVar} className="flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                      {product.eyebrow}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-ink">
                      {product.name}
                    </h3>
                    <p className="text-base text-ink-2 leading-relaxed max-w-2xl pt-1">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                  {TIERS.map((tier) => (
                    <div
                      key={`${product.key}-${tier.key}`}
                      className="border-t border-rule-2 pt-4"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                        {tier.label}
                      </p>
                      <p className="mt-3 text-sm text-ink leading-relaxed">
                        {product.name.replace("Nebbos.ai platform", "Platform").replace("Nebbos ", "")}{" "}
                        · {tier.key}
                      </p>
                      <p className="mt-2 text-sm text-ink-2 leading-relaxed">
                        {tier.scope}
                      </p>
                      <p className="mt-4">
                        <Link
                          href="/contact"
                          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-gold transition-colors underline underline-offset-4 decoration-rule hover:decoration-gold"
                        >
                          Contact sales &rarr;
                        </Link>
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="pt-8 text-sm text-ink-3 leading-relaxed max-w-3xl">
            <strong className="text-ink-2">A note on colors.</strong> The
            four-color flower-of-life variant pack lands in{" "}
            <code className="font-mono text-[13px] text-ink-2">
              @nebbos/brand@2.1.0
            </code>
            . Until then this page renders every product mark in Nebbos
            gold; the swap is a single set of tokens.
          </p>
        </div>
      </section>
    </main>
  );
}
