import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers · Nebbos",
  description:
    "Nebbos is running today inside school districts across multiple U.S. states. Case studies land here as each district signs off publicly.",
};

/**
 * /customers · 2026-09-12 revision 2 · in-production framing
 *
 * PR #23 (2026-09-12) replaced the fictional customer MDX with a pure
 * coming-soon page. This revision adds the specific true claim the
 * founder confirmed: Nebbos is deployed today inside school districts
 * across multiple U.S. states, running district operations / coverage /
 * compliance.
 *
 * No specific district names (client sign-off pending). No specific
 * numbers not yet publicly shareable. Coming-soon still applies to the
 * per-case-study writeups.
 *
 * Prior version's coming-soon framing is superseded by this in-
 * production framing per founder directive 2026-09-12: "We want to say
 * that nebbos is being used by school districts across multiple states."
 * The prior version is preserved via git history on the branch
 * fix/no-fake-customers-coming-soon-2026-09-12 (merged as PR #23).
 */

export default function CustomersIndexPage() {
  return (
    <>
      <FullBleedScene
        className="hero-fullbleed"
        scene={{ imageFamily: "concept-tenant-onboarding", imageFamilyVariant: 1 }}
        scrim="bottom"
        vignetteStrength={0.5}
        chapter="00"
        chapterLabel="In production"
        priority
      >
        <div className="container hero-fullbleed__inner">
          <div className="hero-fullbleed__frame">
            <h1 className="hero-fullbleed__title">
              Running in school districts across multiple states.
            </h1>
            <p className="hero-fullbleed__deck">
              Nebbos is deployed today inside school districts across several
              U.S. states &mdash; running district operations, coverage,
              compliance, and superintendent-scoped approval trails. Case
              studies land here as each district signs off publicly. Until
              then, the shape of the work is real; the names come with
              permission.
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
            01 &middot; The shape today
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
            One Pearl per district operations.
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
            A Pearl scoped to district operations, deployed behind the systems
            each district already runs &mdash; SIS, HR, substitute management,
            state reporting, parent comms. Every consequential action passes
            through named-superintendent approval; every action lands as an
            append-only audit-event. That&rsquo;s the shape running today.
            Case studies as the districts are ready.
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
    </>
  );
}
