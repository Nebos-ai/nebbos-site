import Link from "next/link";
import { SplitWords } from "@/components/patterns/SplitWords";

/**
 * MarketingCTA · sections/MarketingCTA.tsx · v1 · 2026-09-18
 *
 * The closing CTA on the dark marketing register. Replaces HomeCTA
 * (photo-anchored SceneStill with Cradle imagery + serif "Put a Pearl
 * on your hardest domain" headline) with a Linear-tier centered close.
 *
 * Direct ask, two paths. Book a demo is the primary; See the products
 * is the second-read for those not yet ready to talk.
 */

export function MarketingCTA() {
  return (
    <section className="mkt mkt-section mkt-closing" aria-labelledby="mkt-close-h">
      <div className="mkt-closing__inner">
        <p className="mkt-eyebrow">See it on your operation</p>
        <h2 id="mkt-close-h" className="mkt-display">
          <SplitWords>Put a Pearl on your hardest department.</SplitWords>
        </h2>
        <p className="mkt-deck">
          Thirty minutes. Pick one department. We map it, name the Pearl,
          and show you the first Monday it would run.
        </p>
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
    </section>
  );
}
