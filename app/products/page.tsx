import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, TIERS, type Product } from "@/content/products";

/**
 * PAGE · /products · v2 · 2026-09-18 · marketing-register rebuild
 *
 * Migrated from the v3 substrate primitives (PageHero paper /
 * PageSection / Eyebrow / Button) to the dark Linear-tier marketing
 * register (components/patterns/marketing-register.css). Every string
 * kept verbatim; only the register + shape changed.
 *
 * Shape:
 *   1. Hero  — dark; eyebrow · display · deck · CTAs
 *   2. Tiers — 3-tier composition explainer
 *   3. Rows  — one per product: colored mark + name + description on
 *              left; 3 tier cards on right
 *   4. CTA   — closing "Book a briefing" bookend
 */

export const metadata: Metadata = {
  title: "Products · Four lines. Twelve SKUs.",
  description:
    "The Nebbos platform, the app, the MCP, and the Cradle. Four products, three tiers each — twelve SKUs total. Every operator picks along (product, tier).",
};

const PRODUCT_CLASS: Record<Product["key"], string> = {
  platform: "mkt-productrow--platform",
  app: "mkt-productrow--app",
  mcp: "mkt-productrow--mcp",
  usb: "mkt-productrow--cradle",
};

function shortName(product: Product): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <section className="mkt mkt-section mkt-hero" aria-labelledby="products-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Products</p>
            <h1 id="products-h" className="mkt-display">
              Four products. Twelve SKUs.
            </h1>
            <p className="mkt-deck">
              The platform runs the Pearls. The app runs local. The MCP
              carries the tools. The Cradle carries the credentials. Three
              tiers per product. Twelve SKUs. Enterprise only.
            </p>
            <div className="mkt-hero__ctas">
              <Link href="/demo" className="mkt-cta mkt-cta--primary">
                Book a demo
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="#matrix" className="mkt-cta mkt-cta--ghost">
                See the matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TIER COMPOSITION */}
      <section className="mkt mkt-section" aria-labelledby="tiers-h">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">Tier composition</p>
            <h2 id="tiers-h" className="mkt-h2">
              Three tiers. Each strictly composes the one below.
            </h2>
            <p className="mkt-deck">
              L1 adds device biometric. L2 adds the Cradle in the port.
              L3 adds an enclave-signed approval token. Higher tiers never
              relax lower-tier factors.
            </p>
          </header>
          <div className="mkt-productrow__tiers">
            {TIERS.map((tier) => (
              <div key={tier.key} className="mkt-tier">
                <p className="mkt-tier__key">{tier.key}</p>
                <p className="mkt-tier__label">{tier.label.split(" · ").slice(1).join(" · ") || tier.key}</p>
                <p className="mkt-tier__scope">{tier.factors}</p>
                <p className="mkt-tier__scope" style={{ opacity: 0.72 }}>{tier.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT MATRIX */}
      <section className="mkt mkt-section" aria-labelledby="matrix">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The matrix</p>
            <h2 id="matrix" className="mkt-h2">
              Pick along (product, tier).
            </h2>
            <p className="mkt-deck">
              Every SKU carries a product color and a tier finish. A
              Cradle-L2 device ships in the Cradle color body with the
              L2 accent. No published pricing. Contact sales.
            </p>
          </header>

          {PRODUCTS.map((product) => (
            <article
              key={product.key}
              className={`mkt-productrow ${PRODUCT_CLASS[product.key]}`}
              aria-labelledby={`prod-${product.key}-h`}
            >
              <div className="mkt-productrow__ident">
                <span className="mkt-productrow__mark" aria-hidden />
                <p className="mkt-eyebrow">{product.eyebrow}</p>
                <h3 id={`prod-${product.key}-h`} className="mkt-productrow__name">
                  {shortName(product)}
                </h3>
                <p className="mkt-productrow__desc">{product.description}</p>
                <Link href={`/products/${product.slug}`} className="mkt-cta mkt-cta--ghost" style={{ justifySelf: "start" }}>
                  Open {shortName(product)}
                  <span className="mkt-cta__arrow" aria-hidden>→</span>
                </Link>
              </div>

              <div className="mkt-productrow__tiers">
                {TIERS.map((tier) => (
                  <div key={`${product.key}-${tier.key}`} className="mkt-tier">
                    <p className="mkt-tier__key">{tier.key}</p>
                    <p className="mkt-tier__label">
                      {shortName(product)} · {tier.key}
                    </p>
                    <p className="mkt-tier__scope">{tier.scope}</p>
                    <Link href="/contact" className="mkt-cta mkt-cta--ghost" style={{ justifySelf: "start", marginTop: 8 }}>
                      Contact sales
                    </Link>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mkt mkt-section mkt-closing" aria-labelledby="products-close">
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">Book a briefing</p>
          <h2 id="products-close" className="mkt-display">
            One SKU. One department. One shift.
          </h2>
          <p className="mkt-deck">
            Name the department you would put a Pearl on first. We map it
            to a SKU and a tier. You watch one shift run on the Cradle.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/demo" className="mkt-cta mkt-cta--primary">
              Book a demo
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href="/contact" className="mkt-cta mkt-cta--ghost">
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
