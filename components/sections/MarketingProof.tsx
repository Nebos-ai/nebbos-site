import Link from "next/link";
import metrics from "@/content/platform-metrics.json";

/**
 * MarketingProof · sections/MarketingProof.tsx · v3 · 2026-09-18
 *
 * Single-column dogfood-proof band. The proof of the platform is the
 * operation that built it. Numbers sourced from platform-metrics.json —
 * every claim on this section traces to a live, verifiable artifact.
 *
 * HISTORY: v2 (2026-09-18 morning) shipped a two-column band whose left
 * column asserted "12 school districts running Nebbos today — across // claim-source: retraction-history
 * four U.S. states." That claim had no substrate backing and was
 * removed 2026-09-18 afternoon (founder-directed) per
 * feedback_marketing_site_pricing_editorial_discipline's projection
 * rule: marketing surface is a NARROW projection of ratified /
 * verifiable internal facts. Customer counts, geo counts, and use-case
 * lists that cannot be verified against an internal source-of-record
 * do not appear on the site. When in doubt, DEFAULT OFF.
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
            Built with itself.
          </h2>
          <p className="mkt-deck">
            The proof of the platform is the operation that built it.
          </p>
        </header>

        <div className="mkt-proof">
          <p className="mkt-eyebrow">Built with Nebbos, by Nebbos</p>
          <p className="mkt-proof__stat">{M.shipped.lines_of_code_millions}M</p>
          <p className="mkt-proof__body">
            Lines of code, across {M.shipped.repositories} repositories,
            {" "}{M.shipped.commits_last_30d} commits in the last thirty
            days. Every letter, every image, every backend, every
            doctrine: produced by one founder plus a Pearl for every
            department. This site is a Nebbos deploy.
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
