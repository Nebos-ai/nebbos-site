import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";
import { PRODUCTS, TIERS, type Product } from "@/content/products";
import { PRODUCT_DETAILS } from "@/content/product-detail";

/**
 * MarketingProductDetail · sections/MarketingProductDetail.tsx · v1 · 2026-09-18
 *
 * Shared marketing-register template for the four product-slug pages
 * (/products/platform · /app · /mcp · /cradle). Consumes the product
 * record from PRODUCTS and the structured detail from PRODUCT_DETAILS,
 * both keyed by ProductKey.
 *
 * Sections:
 *   1. Hero — colored mark + eyebrow + name + deck + CTAs
 *   2. Highlights — 5-row scannable specs
 *   3. Deep-dive — 4-5 cards with heading + body
 *   4. Built for — 3-row audience/scope table
 *   5. Values — 3 closing narrative cards
 *   6. Tier composition — the same 3 L1/L2/L3 cards
 *   7. Other products — cross-nav row to the other 3 products
 *   8. Closing CTA
 */

const PRODUCT_CLASS: Record<Product["key"], string> = {
  platform: "mkt-product--platform mkt-productrow--platform",
  app: "mkt-product--app mkt-productrow--app",
  mcp: "mkt-product--mcp mkt-productrow--mcp",
  usb: "mkt-product--cradle mkt-productrow--cradle",
};

function shortName(product: Product): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

export function MarketingProductDetail({ product }: { product: Product }) {
  const detail = PRODUCT_DETAILS[product.key];
  const others = PRODUCTS.filter((p) => p.key !== product.key);
  const name = shortName(product);

  return (
    <>
      {/* 1. HERO */}
      <section
        className={`mkt mkt-section mkt-hero ${PRODUCT_CLASS[product.key]}`}
        aria-labelledby={`prod-${product.key}-h`}
      >
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <span className="mkt-productrow__mark" aria-hidden style={{ marginBottom: 24 }}>
              <NebbosMark size={44} />
            </span>
            <p className="mkt-eyebrow">{product.eyebrow} · Chapter {detail.chapter}</p>
            <h1 id={`prod-${product.key}-h`} className="mkt-display">
              {name}
            </h1>
            <p className="mkt-deck">{detail.heroDeck}</p>
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
        </div>
      </section>

      {/* 2. HIGHLIGHTS */}
      <section className="mkt mkt-section" aria-labelledby={`hl-${product.key}-h`}>
        <div className="mkt-section__inner">
          <header className="mkt-numbers__head">
            <p className="mkt-eyebrow">At a glance</p>
            <h2 id={`hl-${product.key}-h`} className="mkt-h2">
              The specs.
            </h2>
          </header>
          <div className="mkt-detail__highlights">
            {detail.highlights.map((h) => (
              <div key={h.label} className="mkt-highlight">
                <p className="mkt-highlight__label">{h.label}</p>
                <p className="mkt-highlight__value">{h.value}</p>
                <p className="mkt-highlight__note">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEEP-DIVE */}
      <section className="mkt mkt-section" aria-labelledby={`deep-${product.key}-h`}>
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">Under the hood</p>
            <h2 id={`deep-${product.key}-h`} className="mkt-h2">
              {detail.deepTitle}
            </h2>
          </header>
          <div className="mkt-deep__grid">
            {detail.deep.map((item) => (
              <article key={item.heading} className="mkt-deep__item">
                <h3 className="mkt-deep__heading">{item.heading}</h3>
                <p className="mkt-deep__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUILT FOR */}
      <section className="mkt mkt-section" aria-labelledby={`bf-${product.key}-h`}>
        <div className="mkt-section__inner">
          <header className="mkt-numbers__head">
            <p className="mkt-eyebrow">Built for</p>
            <h2 id={`bf-${product.key}-h`} className="mkt-h2">
              Who runs on {name}.
            </h2>
          </header>
          <div className="mkt-builtfor">
            {detail.builtFor.map((row) => (
              <div key={row.audience} className="mkt-builtfor__item">
                <p className="mkt-builtfor__audience">{row.audience}</p>
                <p className="mkt-builtfor__scope">{row.scope}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VALUES */}
      <section className="mkt mkt-section" aria-labelledby={`val-${product.key}-h`}>
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The bet</p>
            <h2 id={`val-${product.key}-h`} className="mkt-h2">
              Why {name} is shaped this way.
            </h2>
          </header>
          <div className="mkt-values__grid">
            {detail.valueCards.map((v) => (
              <article key={v.factor} className="mkt-value">
                <p className="mkt-value__factor">{v.factor}</p>
                <h3 className="mkt-value__headline">{v.headline}</h3>
                <p className="mkt-value__body">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TIER COMPOSITION */}
      <section className="mkt mkt-section" aria-labelledby={`tier-${product.key}-h`}>
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">Three tiers</p>
            <h2 id={`tier-${product.key}-h`} className="mkt-h2">
              {name}, at L1, L2, and L3.
            </h2>
            <p className="mkt-deck">
              Every product ships in three tiers. Each tier adds a stricter
              factor to the ceremony. Contact sales for pricing.
            </p>
          </header>
          <div className="mkt-productrow__tiers">
            {TIERS.map((tier) => (
              <div key={tier.key} className={`mkt-tier ${PRODUCT_CLASS[product.key]}`}>
                <p className="mkt-tier__key">{tier.key}</p>
                <p className="mkt-tier__label">{name} · {tier.key}</p>
                <p className="mkt-tier__scope">{tier.scope}</p>
                <Link href="/contact" className="mkt-cta mkt-cta--ghost" style={{ justifySelf: "start", marginTop: 8 }}>
                  Contact sales
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OTHER PRODUCTS */}
      <section className="mkt mkt-section" aria-labelledby={`others-${product.key}-h`}>
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">Also in the portfolio</p>
            <h2 id={`others-${product.key}-h`} className="mkt-h2">
              The other three products.
            </h2>
          </header>
          <div className="mkt-products__grid">
            {others.map((p) => (
              <Link key={p.key} href={`/products/${p.slug}`} className={`mkt-product ${PRODUCT_CLASS[p.key].split(" ")[0]}`}>
                <span className="mkt-product__mark" aria-hidden>
                  <NebbosMark size={32} />
                </span>
                <div className="mkt-product__body">
                  <p className="mkt-product__eyebrow">{p.eyebrow}</p>
                  <h3 className="mkt-product__name">{shortName(p)}</h3>
                  <p className="mkt-product__tagline">{p.tagline}</p>
                </div>
                <span className="mkt-product__link">
                  Open
                  <span className="mkt-product__link-arrow" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLOSING CTA */}
      <section className="mkt mkt-section mkt-closing" aria-labelledby={`close-${product.key}-h`}>
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">Book a briefing</p>
          <h2 id={`close-${product.key}-h`} className="mkt-display">
            See {name} on your hardest department.
          </h2>
          <p className="mkt-deck">
            Thirty minutes. We map one department. We name the Pearls that
            would live inside it. You see {name} running.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/demo" className="mkt-cta mkt-cta--primary">
              Book a demo
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href="/products" className="mkt-cta mkt-cta--ghost">
              Back to the four products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
