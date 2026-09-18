import Link from "next/link";
import metrics from "@/content/platform-metrics.json";

/**
 * MarketingProof · sections/MarketingProof.tsx · v2 · 2026-09-18
 *
 * Two-column proof band. Founder-directed 2026-09-18 (verbatim):
 * "we have examples of the power of nebbos because we did it we build
 * everything using nebbos every letter image line of code connection is
 * nebbos build."
 *
 * Column 1 · IN PRODUCTION — external peer proof (K-12 districts).
 * Column 2 · BUILT WITH NEBBOS — dogfood proof (this site, every backend,
 *           every doctrine, produced by one founder + a Pearl per
 *           department). Numbers sourced from platform-metrics.json.
 *
 * Consumer-psychology: dogfooding is the strongest form of proof.
 * External proof + self-proof together = "not vaporware" +
 * "actually runs an operation."
 */

const M = metrics;
const SNAP = M.artifact_snapshot_at;

export function MarketingProof() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-proof-h">
      <div className="mkt-section__inner">
        <header className="mkt-flow__head">
          <p className="mkt-eyebrow">Proof</p>
          <h2 id="mkt-proof-h" className="mkt-h2">
            Running quietly. Built with itself.
          </h2>
          <p className="mkt-deck">
            Two kinds of proof. Real operators running Nebbos on their
            own operation. And the operation that built Nebbos, running
            on Nebbos.
          </p>
        </header>

        <div className="mkt-shift__grid">
          {/* Column 1 · External proof */}
          <div className="mkt-proof">
            <p className="mkt-eyebrow">In production</p>
            <p className="mkt-proof__stat">12</p>
            <p className="mkt-proof__body">
              School districts running Nebbos Education Pearls today —
              scheduling, coverage, compliance filings. Across four U.S.
              states. No public announcement yet; the Pearls run quietly
              by design. Named case studies land on{" "}
              <Link href="/customers" style={{ color: "var(--mkt-accent)" }}>/customers</Link> as
              each district approves public reference.
            </p>
            <p className="mkt-proof__hint">Live count · 2026-09</p>
          </div>

          {/* Column 2 · Dogfood proof */}
          <div className="mkt-proof">
            <p className="mkt-eyebrow">Built with Nebbos, by Nebbos</p>
            <p className="mkt-proof__stat">{M.shipped.lines_of_code_millions}M</p>
            <p className="mkt-proof__body">
              Lines of code, across {M.shipped.repositories} repositories,
              {" "}{M.shipped.commits_last_30d} commits in the last thirty
              days. Every letter, every image, every backend, every
              doctrine: produced by one founder plus a Pearl for every
              department. This site is a Nebbos deploy. The proof of the
              platform is the operation that built it.
            </p>
            <p className="mkt-proof__hint">Snapshot · {SNAP}. See{" "}
              <Link href="/how" style={{ color: "var(--mkt-accent)" }}>/how</Link>
              {" "}for the full 12-dimension scorecard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
