import type { Metadata } from "next";
import Link from "next/link";
import { SplitWords } from "@/components/patterns/SplitWords";
import { CONTACT } from "@/content/contact";

/**
 * PAGE · /pricing · v1 · 2026-09-18 · marketing-register native
 *
 * Founder-directed 2026-09-18 (verbatim): "there shoudl be enterprise
 * level and that level shoudl be contact us."
 *
 * Doctrine reconciliation: the 2026-08-23 pricing editorial discipline
 * memory said "keep pricing info clean and minimal, do not over-explain"
 * and defaulted to no-published-pricing / Palantir-model. The founder
 * confirmed 2026-09-18 that the Enterprise tier stays contact-us. This
 * page implements exactly that: one Enterprise tier card, no dollar
 * figure, contact-sales CTA. When lower tiers (App L1 self-serve /
 * Platform L1 self-serve) get their price ratified, they land as
 * additional cards in the .mkt-pricing__grid without touching this
 * scaffolding.
 *
 * NOT ON THIS PAGE (per pricing editorial discipline):
 *   - Product-app names (LMS · Presentify · full-badge)
 *   - 4-tier ARPU breakdown, overage math, cost-follow clause
 *   - Per-tier user-count math
 *   - Any dollar figure until a lower tier is ratified
 */

export const metadata: Metadata = {
  title: "Pricing · Enterprise. Contact us.",
  description:
    "Nebbos ships to institutional buyers on enterprise terms. Contract, deployment, and pricing set on a call — not on a checkout page.",
};

const ENTERPRISE_INCLUDES = [
  "The four products — Platform, App, MCP, Cradle",
  "Three tiers per product — L1, L2, L3",
  "FIPS 140-3 Level 3 Cradle hardware, shipped",
  "Deployment: Managed, Federated, or Air-gapped",
  "Named human approval on every consequential action",
  "Hash-chained audit trail, portable at contract end",
  "Software license, support terms, hardware warranty",
  "Onboarding with a Nebbos operator, not a form-and-forget",
];

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="mkt mkt-section mkt-hero" aria-labelledby="pricing-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Pricing</p>
            <h1 id="pricing-h" className="mkt-display">
              <SplitWords>Enterprise. On a call.</SplitWords>
            </h1>
            <p className="mkt-deck">
              Nebbos ships to institutional buyers. Every engagement runs
              through a contract, a deployment plan, and a security
              review. The price fits the scope — not a checkout page.
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
        </div>
      </section>

      {/* TIER CARD */}
      <section className="mkt mkt-section" aria-labelledby="tier-h">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The tier</p>
            <h2 id="tier-h" className="mkt-h2">
              <SplitWords>One tier. Enterprise.</SplitWords>
            </h2>
            <p className="mkt-deck">
              Every scope — pilot, one department, one district, one
              agency — sits under the same enterprise contract. The
              engagement shape varies; the terms don&rsquo;t.
            </p>
          </header>

          <div className="mkt-pricing__grid">
            <article className="mkt-price mkt-price--featured" aria-labelledby="enterprise-name">
              <p className="mkt-price__tier">Enterprise</p>
              <h3 id="enterprise-name" className="mkt-price__name">
                Everything Nebbos ships.
              </h3>
              <p className="mkt-price__value">Contact us.</p>
              <p className="mkt-price__deck">
                Scope, deployment, and pricing set on a call with the
                team. Typical time from first call to signed pilot: two
                to four weeks.
              </p>
              <ul className="mkt-price__list">
                {ENTERPRISE_INCLUDES.map((item) => (
                  <li key={item} className="mkt-price__list-item">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mkt-cta mkt-cta--primary mkt-price__cta">
                Contact sales
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <p style={{ fontFamily: "var(--mkt-font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--mkt-text-4)", margin: 0 }}>
                Enterprise inbox · {CONTACT.enterprise}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* WHY ENTERPRISE ONLY — quiet justification, one section */}
      <section className="mkt mkt-section" aria-labelledby="why-h">
        <div className="mkt-section__inner">
          <header className="mkt-flow__head">
            <p className="mkt-eyebrow">Why enterprise-only</p>
            <h2 id="why-h" className="mkt-h2">
              Nebbos ships hardware. Runs on your infrastructure.
            </h2>
            <p className="mkt-deck">
              A Cradle is a physical device that ships to your desk. The
              MCP and your Pearl memory live on that device — Nebbos
              never accesses your data. Deployment is on your infra,
              federated, or air-gapped. None of that fits a self-serve
              checkout. Every Nebbos customer signs a contract, receives
              shipped hardware, and onboards with a Nebbos operator.
            </p>
          </header>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="mkt mkt-section mkt-closing" aria-labelledby="close-h">
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">Start the conversation</p>
          <h2 id="close-h" className="mkt-display">
            <SplitWords>Bring one department. We map the pilot.</SplitWords>
          </h2>
          <p className="mkt-deck">
            Thirty minutes on a call. Pick one department. We map the
            scope, name the Pearl, and quote the pilot in that call.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/demo" className="mkt-cta mkt-cta--primary">
              Book a demo
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href={`mailto:${CONTACT.enterprise}`} className="mkt-cta mkt-cta--ghost">
              Email enterprise
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
