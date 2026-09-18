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
            {/* Three department Pearls, live-status feel. Visitor reads
                shape, not the sausage — a screenshot-shaped visual that
                signals "your team's departments, running." */}
            <div className="mkt-mock">
              <div className="mkt-mock__chrome">
                <span className="mkt-mock__dot" />
                <span className="mkt-mock__dot" />
                <span className="mkt-mock__dot" />
              </div>
              <div className="mkt-mock__filter">
                <span className="mkt-mock__filter-dot" aria-hidden />
                Live · Monday 08:12
              </div>
              <div className="mkt-mock__body">
                <div className="mkt-mock__panel">
                  <span className="mkt-mock__badge">Finance</span>
                  <span className="mkt-mock__status">Closed</span>
                  <div className="mkt-mock__meta">
                    <span>Sep</span>
                    <span className="mkt-mock__meta-pill">Auto</span>
                  </div>
                  <div className="mkt-mock__chart" aria-hidden>
                    <span className="mkt-mock__bar" style={{ height: "40%", animationDelay: "0ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "55%", animationDelay: "40ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "70%", animationDelay: "80ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "60%", animationDelay: "120ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "85%", animationDelay: "160ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "100%", animationDelay: "200ms" }} />
                  </div>
                </div>
                <div className="mkt-mock__panel mkt-mock__panel--accent">
                  <span className="mkt-mock__badge">Ops</span>
                  <span className="mkt-mock__status">2 waiting</span>
                  <div className="mkt-mock__meta">
                    <span>Approve</span>
                    <span className="mkt-mock__meta-pill">You</span>
                  </div>
                  <div className="mkt-mock__chart" aria-hidden>
                    <span className="mkt-mock__bar" style={{ height: "50%", animationDelay: "0ms" }} />
                    <span className="mkt-mock__bar mkt-mock__bar--accent" style={{ height: "90%", animationDelay: "60ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "45%", animationDelay: "120ms" }} />
                    <span className="mkt-mock__bar mkt-mock__bar--accent" style={{ height: "78%", animationDelay: "180ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "55%", animationDelay: "240ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "62%", animationDelay: "300ms" }} />
                  </div>
                </div>
                <div className="mkt-mock__panel">
                  <span className="mkt-mock__badge">Care</span>
                  <span className="mkt-mock__status">Quiet</span>
                  <div className="mkt-mock__meta">
                    <span>0 open</span>
                    <span className="mkt-mock__meta-pill">Auto</span>
                  </div>
                  <div className="mkt-mock__chart" aria-hidden>
                    <span className="mkt-mock__bar" style={{ height: "30%", animationDelay: "0ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "35%", animationDelay: "50ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "22%", animationDelay: "100ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "40%", animationDelay: "150ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "28%", animationDelay: "200ms" }} />
                    <span className="mkt-mock__bar" style={{ height: "36%", animationDelay: "250ms" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
