import Link from "next/link";
import metrics from "@/content/platform-metrics.json";
import { SplitWords } from "@/components/patterns/SplitWords";
import { NumberCounter } from "@/components/patterns/NumberCounter";

/**
 * MarketingProof · sections/MarketingProof.tsx · v3 · 2026-09-18
 *
 * Founder-directed 2026-09-18 (peer c900b70e PR #107 rationale):
 * "in what world do we ever put this on a site" — the "12 school
 * districts across 4 U.S. states" claim was unverifiable and legally
 * risky. Column 1 retracted.
 *
 * v2 briefly re-introduced Column 1 (my session dd808040 pushing
 * craft commits without git-pull between them, rolling over peer's
 * PR #107 retraction). v3 re-retracts + centers the dogfood proof.
 *
 * Doctrine: dogfooding is the strongest form of proof AND it's the
 * only claim on this section we can verify from the codebase itself
 * (numbers sourced live from platform-metrics.json). External-customer
 * claims re-land when peer session's PR #108 claim-substrate is
 * live and a district approves public reference.
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
            <SplitWords>Built with itself.</SplitWords>
          </h2>
          <p className="mkt-deck">
            The strongest proof of a platform is the operation that built
            it, running on the platform. Nebbos built Nebbos with Nebbos.
            Every number below is measured from this codebase directly.
          </p>
        </header>

        <div className="mkt-proof mkt-proof--single">
          <p className="mkt-eyebrow">Built with Nebbos, by Nebbos</p>
          <p className="mkt-proof__stat">
            <NumberCounter value={M.shipped.lines_of_code_millions * 1_000_000} format="millions" />
          </p>
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
    </section>
  );
}
