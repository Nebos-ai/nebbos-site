import Link from "next/link";

/**
 * MarketingProof · sections/MarketingProof.tsx · v1 · 2026-09-18
 *
 * Social-proof band. Consumer-psychology: proof from PEERS beats claims
 * from vendors. K-12 school districts is Nebbos's honest in-production
 * proof — real operators, sensitive data, quiet running.
 *
 * Anchoring: opens with a specific number the visitor can hold onto.
 * Concrete: names the vertical the districts are in. No "leading
 * enterprises trust us" empty marketing.
 */

export function MarketingProof() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-proof-h">
      <div className="mkt-section__inner">
        <header className="mkt-flow__head">
          <p className="mkt-eyebrow">In production</p>
          <h2 id="mkt-proof-h" className="mkt-h2">
            Quiet in K-12 school districts across four U.S. states.
          </h2>
        </header>

        <div className="mkt-shift__grid">
          <div className="mkt-proof">
            <p className="mkt-proof__stat">12</p>
            <p className="mkt-proof__body">
              School districts running Nebbos Education Pearls in
              production today — scheduling, coverage, compliance
              filings. No public announcement yet; the Pearls run
              quietly by design.
            </p>
            <p className="mkt-proof__hint">Live count · 2026-09</p>
          </div>

          <div className="mkt-proof">
            <p className="mkt-proof__stat">4</p>
            <p className="mkt-proof__body">
              U.S. states with active deployments. Named case studies
              land on <Link href="/customers" style={{ color: "var(--mkt-accent)" }}>/customers</Link> as
              each district approves public reference. Until then, the
              proof is the running.
            </p>
            <p className="mkt-proof__hint">Live count · 2026-09</p>
          </div>
        </div>
      </div>
    </section>
  );
}
