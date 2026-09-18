import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

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
          </div>
        </div>
      </FullBleedScene>

      <section
        className="section section--paper"
        style={{
          paddingBlock: "clamp(64px, 10vh, 128px)",
          borderTop: "1px solid var(--rule)",
        }}
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
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: "clamp(32px, 5vh, 56px)",
              flexWrap: "wrap",
            }}
          >
            <Button href="/solutions/k12" variant="primary" size="lg">
              See district operations
            </Button>
            <Button href="/demo" variant="ghost" size="lg" arrow={false}>
              Book a demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
