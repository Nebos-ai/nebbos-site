import type { Metadata } from "next";
import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";

export const metadata: Metadata = {
  title: "Customers · Nebbos",
  description:
    "Customer references will appear here when they are ready to be named.",
};

/**
 * /customers · revision 3 · 2026-09-18 · substantiated-only framing
 *
 * HISTORY: revision 2 (2026-09-12) asserted "Nebbos is deployed today // claim-source: retraction-history
 * inside school districts across multiple U.S. states" with named
 * operations (SIS / HR / substitute / reporting / parent comms), no
 * customer names but a specific-shape claim. Retracted 2026-09-18 for
 * the same reason MarketingProof v2 was (PR #107): specific customer /
 * geo / use-case claims without a `source_of_record` in
 * `content/claims.ts` are legal-risk, regardless of whether the shape
 * is claimed to be "true but confidential." Per ratified
 * `feedback_marketing_site_pricing_editorial_discipline`: marketing
 * surface = narrow projection of verifiable internal facts; default
 * OFF when in doubt.
 *
 * This revision is the honest empty state: the page acknowledges the
 * category (customer references), commits to naming references only
 * with permission, and does not describe use-cases, geographic reach,
 * industry, or count. When the first customer is namable, add their
 * entry to `content/claims.ts` under a `customer-<slug>` id with a
 * `verifiable-external` source-of-record (linked case study, signed
 * approval), and this page renders their reference.
 *
 * Prior versions preserved via git history:
 *   - revision 1 (coming-soon)      : PR #23, 2026-09-12
 *   - revision 2 (in-production)    : this branch, retracted 2026-09-18
 */

export default function CustomersIndexPage() {
  return (
    <div className="mkt-mode">
      <FullBleedScene
        className="hero-fullbleed"
        scene={{ imageFamily: "concept-operator-onboarding", imageFamilyVariant: 1 }}
        scrim="bottom"
        vignetteStrength={0.5}
        chapter="00"
        chapterLabel="In production"
        priority
      >
        <div className="container hero-fullbleed__inner">
          <div className="hero-fullbleed__frame">
            <h1 className="hero-fullbleed__title">
              Customer references appear here when they are ready to be
              named.
            </h1>
            <p className="hero-fullbleed__deck">
              Nebbos does not name customers on this page ahead of their
              written permission. When a customer is namable, their
              reference appears here.
            </p>
            <div className="mkt-hero__ctas">
              <Link href="/how" className="mkt-cta mkt-cta--primary">
                See how it is built
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="/demo" className="mkt-cta mkt-cta--ghost">
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="cus-shape">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The shape today</p>
            <h2 id="cus-shape" className="mkt-h2">
              A Pearl per department. Approved from the operator&rsquo;s
              phone.
            </h2>
            <p className="mkt-deck">
              A Pearl scoped to each department, deployed behind the
              systems that department already runs. Every consequential
              action passes through named-operator approval. Every action
              lands as an append-only audit event. That is the shape
              running inside the business that builds Nebbos.
            </p>
          </header>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="cus-when">
        <div className="mkt-section__inner">
          <div className="mkt-case">
            <aside className="mkt-case__aside">
              <p className="mkt-eyebrow">Case studies</p>
              <h3 className="mkt-case__subject">Written when the customer says yes.</h3>
            </aside>
            <div className="mkt-case__body">
              <p>
                Every case study on this page names a real customer,
                describes a real deployment, and lands only after the
                customer has read and approved the language. No composite
                accounts. No aggregated numbers. If it&rsquo;s on this
                page, the operator quoted has signed off in writing.
              </p>
              <p>
                Until customers reach that point, this page tells you
                what the shape of the work is, not who is running it.
                That is the trade-off. It stays that way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mkt mkt-section mkt-closing"
        aria-labelledby="cus-close"
      >
        <div className="container-narrow">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              margin: 0,
            }}
          >
            01 &middot; Why this page is quiet
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "20px 0 0 0",
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            Named permission, or nothing.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
              margin: "20px 0 0 0",
              maxWidth: "56ch",
            }}
          >
            Customer counts, geographies, industries, and use-cases are
            things a competitor could infer from &mdash; and things a
            regulator could hold us to. Until a customer signs off on
            being named on this page, we say nothing specific about them
            here. When they are ready, their reference is what appears.
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
    </>
  );
}
