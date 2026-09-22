import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { SplitWords } from "@/components/patterns/SplitWords";

/**
 * MarketingHero · v2 · 2026-09-18 · outcome-first rewrite
 *
 * Founder-directed (verbatim): "why is this on the home page in this
 * form why is this important to someone looking for a sovereign ai
 * brain do you go to the restaurant and say what's in the sausage or
 * do you eat it if it looks good taste good."
 *
 * AND: "the best marketing sites use human psychology... most people
 * want to be told and show it's good for them they don't really ever
 * understand what it is."
 *
 * v1 hero: infrastructure framing ("Infrastructure for AI operators.")
 *          + sausage deck (tool-calls, FIPS 140-3 Cradle, hash-chain).
 * v2 hero: outcome framing (sovereign brain for your operation) +
 *          department-scoped concrete gains you feel in the week.
 *
 * The right side of the hero still shows a stylized product hint, but
 * with department-level chrome (Finance / Ops / Care) instead of
 * substrate-plumbing chrome (Signals / Approval 04 / Attestation 14 062).
 */

export function MarketingHero() {
  return (
    <section className="mkt mkt-section mkt-hero" aria-labelledby="mkt-hero-h">
      <div className="mkt-section__inner">
        <div className="mkt-hero__grid">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Nebbos</p>
            <h1 id="mkt-hero-h" className="mkt-display">
              <SplitWords>{BRAND.taglineShort}</SplitWords>
            </h1>
            <p className="mkt-deck">{BRAND.homeDeck}</p>
            <div className="mkt-hero__ctas">
              <Link href="/demo" className="mkt-cta mkt-cta--primary">
                Book a demo
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="/solutions" className="mkt-cta mkt-cta--ghost">
                See the Pearls
              </Link>
            </div>
          </div>

          <div className="mkt-hero__visual" aria-hidden>
            {/* TEST 2026-09-22 · placeholder IT/code still, swapped in to
                evaluate a literal-image hero against the CSS department
                mock. The mock version is preserved in git history on
                MarketingHero v2 — revert this block to restore it. */}
            <Image
              src="/hero-code-test.svg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
