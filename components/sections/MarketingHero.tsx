import Link from "next/link";
import { BRAND } from "@/content/brand";

/**
 * MarketingHero · sections/MarketingHero.tsx · v1 · 2026-09-18
 *
 * The nebbos.ai product-marketing hero. Text-left / visual-right split
 * on the dark marketing register (per components/patterns/marketing-
 * register.css). Distinct from the corporate-parent
 * hero-fullbleed-scene shape.
 *
 * Founder-directed 2026-09-18: nebbos.ai needs its own product-marketing
 * aesthetic, distinct from nebbostechnologies.com's corporate register.
 * Reference stack: figma.com (light playful) + linear.app (dark precise);
 * Nebbos leans Linear-tier given Cradle hardware + institutional buyer.
 *
 * Visual is a stylized product mock — three-panel dashboard hint with
 * accent orange highlights. Placeholder pending real Cradle photograph
 * OR platform UI capture (founder-directed asset sourcing).
 *
 * Copy sourced from content/brand.ts so hero + meta stay in sync.
 */

export function MarketingHero() {
  return (
    <section className="mkt mkt-section mkt-hero" aria-labelledby="mkt-hero-h">
      <div className="mkt-section__inner">
        <div className="mkt-hero__grid">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Nebbos · Product</p>
            <h1 id="mkt-hero-h" className="mkt-display">
              {BRAND.taglineShort}
            </h1>
            <p className="mkt-deck">{BRAND.homeDeck}</p>
            <div className="mkt-hero__ctas">
              <Link href="/demo" className="mkt-cta mkt-cta--primary">
                Book a demo
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="/products" className="mkt-cta mkt-cta--ghost">
                See the products
              </Link>
            </div>
          </div>

          <div className="mkt-hero__visual" aria-hidden>
            {/* Placeholder stylized product mock — dashboard hint.
                To be replaced with the Cradle device photograph or a
                Platform UI capture once assets exist. */}
            <div className="mkt-mock">
              <div className="mkt-mock__chrome">
                <span className="mkt-mock__dot" />
                <span className="mkt-mock__dot" />
                <span className="mkt-mock__dot" />
              </div>
              <div className="mkt-mock__body">
                <div className="mkt-mock__panel">
                  <span className="mkt-mock__badge">Signals</span>
                  <span className="mkt-mock__line mkt-mock__line--strong mkt-mock__line--80" />
                  <span className="mkt-mock__line mkt-mock__line--60" />
                  <span className="mkt-mock__line mkt-mock__line--40" />
                  <span className="mkt-mock__line mkt-mock__line--60" />
                  <span className="mkt-mock__line mkt-mock__line--80" />
                  <span className="mkt-mock__line mkt-mock__line--40" />
                </div>
                <div className="mkt-mock__panel mkt-mock__panel--accent">
                  <span className="mkt-mock__badge">Approval &middot; 04</span>
                  <span className="mkt-mock__number">2 of 3</span>
                  <span className="mkt-mock__line mkt-mock__line--strong mkt-mock__line--80" />
                  <span className="mkt-mock__line mkt-mock__line--60" />
                  <span className="mkt-mock__line mkt-mock__line--accent mkt-mock__line--80" />
                  <span className="mkt-mock__line mkt-mock__line--40" />
                </div>
                <div className="mkt-mock__panel">
                  <span className="mkt-mock__badge">Attestation</span>
                  <span className="mkt-mock__number">14 062</span>
                  <span className="mkt-mock__line mkt-mock__line--strong mkt-mock__line--60" />
                  <span className="mkt-mock__line mkt-mock__line--80" />
                  <span className="mkt-mock__line mkt-mock__line--40" />
                  <span className="mkt-mock__line mkt-mock__line--60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
