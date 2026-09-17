import type { Metadata } from "next";
import { PRODUCTS, TIERS } from "@/content/products";
import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import "./products.css";

/**
 * PAGE · /products · four-product × three-tier customer taxonomy
 *
 * Substrate v3 · migrated 2026-09-16 from inline-Tailwind to primitives.
 * Every font-size / spacing / color flows through `@layer tokens` via the
 * PageHero / PageSection / Eyebrow / Button primitives — zero inline
 * `text-5xl md:text-7xl`, zero hand-clamped padding, zero `font-mono
 * text-[10px] tracking-[0.14em]` sprinkled inline.
 *
 * Doctrine cross-refs:
 *   - reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14
 *   - feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14
 *   - feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13
 *   - feedback_nebbos_no_published_pricing_palantir_model  (no dollar figures)
 */

export const metadata: Metadata = {
  title: "Products · Four lines. Twelve SKUs.",
  description:
    "The Nebbos platform, the app, the MCP, and the USB. Four products, three tiers each — twelve SKUs total. Every operator picks along (product, tier).",
};

/**
 * Inline flower mark — placeholder until @nebbos/brand v2.1.0 ships the
 * four-color variant pack. Component boundary preserved so the swap is a
 * single import change when the package lands.
 */
function FlowerMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" className="products__flower" aria-hidden="true">
      <g fill="none" stroke={`var(${color}, var(--color-gold))`} strokeWidth="1.4">
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
    <>
      <PageHero
        surface="paper"
        align="start"
        eyebrow="Products"
        headline="The platform, the app, the MCP, and the USB."
        deck={
          <>
            Nebbos.ai runs your Pearls, your fleet, and your governance under
            one platform. It ships with the tools its MCP exposes, and with
            the security of a hardware-attested USB. Four products, three
            tiers each. Twelve SKUs. Every operator picks along{" "}
            <em>(product, tier)</em>.
          </>
        }
      />

      <PageSection ruled compact>
        <Eyebrow>Tier composition</Eyebrow>
        <h2 className="products__section-heading">
          Three tiers. Factors compose top-down.
        </h2>
        <div className="products__tier-grid">
          {TIERS.map((tier) => (
            <div key={tier.key} className="products__tier-cell">
              <Eyebrow tone="accent">{tier.label}</Eyebrow>
              <p className="products__tier-factors">{tier.factors}</p>
              <p className="products__tier-scope">{tier.scope}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection aria-labelledby="product-matrix">
        <Eyebrow>The matrix</Eyebrow>
        <h2 id="product-matrix" className="products__section-heading">
          Four products. Twelve SKUs.
        </h2>
        <p className="products__matrix-lede">
          Each product renders in a distinct flower-of-life color. Each
          physical Nebbos USB ships in the product&rsquo;s color body with a
          tier-level accent, so a customer holding an &ldquo;MCP-L2&rdquo;
          device sees the MCP color body with the L2 tier finish.
        </p>

        <div className="products__matrix">
          {PRODUCTS.map((product) => (
            <article key={product.key} className="products__row">
              <header className="products__row-header">
                <FlowerMark color={product.colorVar} />
                <div>
                  <Eyebrow>{product.eyebrow}</Eyebrow>
                  <h3 className="products__product-name">{product.name}</h3>
                  <p className="products__product-desc">{product.description}</p>
                </div>
              </header>

              <div className="products__sku-grid">
                {TIERS.map((tier) => (
                  <div key={`${product.key}-${tier.key}`} className="products__sku">
                    <Eyebrow tone="accent">{tier.label}</Eyebrow>
                    <p className="products__sku-name">
                      {product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "")}
                      {" · "}
                      {tier.key}
                    </p>
                    <p className="products__sku-scope">{tier.scope}</p>
                    <Button variant="ghost" tone="onPaper" href="/contact">
                      Contact sales
                    </Button>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="products__color-note">
          <strong>A note on colors.</strong> The four-color flower-of-life
          variant pack lands in <code>@nebbos/brand@2.1.0</code>. Until then
          this page renders every product mark in Nebbos gold; the swap is a
          single set of tokens.
        </p>
      </PageSection>
    </>
  );
}
