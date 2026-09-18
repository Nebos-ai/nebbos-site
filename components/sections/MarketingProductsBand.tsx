import Link from "next/link";
import { PRODUCTS, type Product } from "@/content/products";

/**
 * MarketingProductsBand · sections/MarketingProductsBand.tsx · v1 · 2026-09-18
 *
 * The four-product overview on the dark marketing register. Replaces the
 * v3 corporate HomeBands accordion (SceneStill imagery + Roman numerals +
 * italic serif) with 4 Linear-tier product cards on dark ground, each
 * colored per --mkt-product-* token defined in marketing-register.css.
 *
 * Card shape: colored circle mark (flower-of-life anchor point) → eyebrow +
 * shortName → tagline → colored link. Grid: 1-col → 2-col at 720 → 4-col
 * at 1120. Static (no client JS) — the accordion interactivity is retired
 * for this register.
 *
 * Product-color mapping (internal key → CSS class):
 *   platform → --mkt-product-platform (indigo)
 *   app      → --mkt-product-app (orange)
 *   mcp      → --mkt-product-mcp (violet)
 *   usb      → --mkt-product-cradle (crimson) — internal key is "usb" for
 *              SKU stability; customer-facing name is "Cradle"
 */

const PRODUCT_CLASS: Record<Product["key"], string> = {
  platform: "mkt-product--platform",
  app: "mkt-product--app",
  mcp: "mkt-product--mcp",
  usb: "mkt-product--cradle",
};

function shortName(product: Product): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

export function MarketingProductsBand() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-products-h">
      <div className="mkt-section__inner">
        <header className="mkt-products__head">
          <p className="mkt-eyebrow">Products</p>
          <h2 id="mkt-products-h" className="mkt-h2">
            Four products. One substrate.
          </h2>
          <p className="mkt-deck">
            The platform, the app, the MCP, and the Cradle. Every one carries
            hardware-attested identity; every one composes with the others.
          </p>
        </header>

        <div className="mkt-products__grid">
          {PRODUCTS.map((product) => (
            <Link
              key={product.key}
              href={`/products/${product.slug}`}
              className={`mkt-product ${PRODUCT_CLASS[product.key]}`}
            >
              <span className="mkt-product__mark" aria-hidden />
              <div className="mkt-product__body">
                <p className="mkt-product__eyebrow">{product.eyebrow}</p>
                <h3 className="mkt-product__name">{shortName(product)}</h3>
                <p className="mkt-product__tagline">{product.tagline}</p>
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
  );
}
