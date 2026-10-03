import type { Metadata } from "next";
import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";

export const metadata: Metadata = {
  title: "Customers · Nebbos",
  description:
    "Nebbos is used inside the business that builds it. Case studies land here as external customers sign off publicly.",
};

/**
 * /customers · 2026-09-18 · v3 · mkt-native rebuild + dogfood-only framing
 *
 * v2 (2026-09-12) claimed deployment inside U.S. school-district
 * operations. That was the same class of unverifiable external claim
 * the home page retracted in 73af932 (2026-09-18) — retracted here
 * for consistency with the claims-registry doctrine (peer PR #108).
 *
 * v3 replaces:
 *   - shape: v3 FullBleedScene + section--paper → mkt-hero + mkt-section
 *   - copy: external-customer claim → dogfood-only framing (the
 *     business that builds Nebbos is running on it today)
 *
 * When external customers land, this page swaps to per-customer case
 * study cards. Until then, honesty about the deployment shape.
 */

export default function CustomersIndexPage() {
  return (
    <>
      <section className="mkt mkt-section mkt-hero" aria-labelledby="cus-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Customers</p>
            <h1 id="cus-h" className="mkt-display">
              Running inside the business that builds it.
            </h1>
            <p className="mkt-deck">
              Nebbos is used every day by the team that builds it. The
              platform, its Pearls, its Cradle. Case studies from external
              customers land here as each customer signs off publicly.
              Until then, the shape of the work is real; the names arrive
              with permission.
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
        <div className="mkt-closing__inner">
          <span aria-hidden style={{ display: "inline-flex", marginBottom: 24 }}>
            <NebbosMark size={40} />
          </span>
          <p className="mkt-eyebrow">Talk to us</p>
          <h2 id="cus-close" className="mkt-display">
            See the same shape on your operation.
          </h2>
          <p className="mkt-deck">
            Thirty minutes. Bring one department. We show you a Pearl
            running against a workload the same shape as yours.
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
