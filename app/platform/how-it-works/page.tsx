import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  path: "/platform/how-it-works",
  description:
    "The four-week path from first conversation to a Pearl running in production. Shape the workload. Wire the systems. Define approvals. Promote to production.",
});

/**
 * /platform/how-it-works — the deployment path (Wave 3 · 2026-09-13 rewrite)
 *
 * Concretizes the "live in days" claim into a 4-week timeline every
 * engagement follows. Run-layer voice throughout.
 */
export default function HowItWorksPage() {
  return (
    <>
      <Hero
        eyebrow="How it works"
        title={
          <>
            First conversation to production.{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Four weeks.</em>
          </>
        }
        deck="Every Nebbos deployment follows the same shape. Week one shapes the Pearl. Week two wires the systems. Week three defines the approvals. Week four promotes to production."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Week 01 · Shape the workload"
        title="What department. What actions. What boundary."
        body={<p style={{ margin: 0 }}>Nebbos reads the shape of your operations before writing a line of Pearl code. What department is the Pearl scoped to? What actions can it take, and what actions must always route to a human? What data must never cross the boundary? Week one is the answer to those three questions.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Week 02 · Wire the systems"
        title="Point the Pearl at what you already run."
        body={<p style={{ margin: 0 }}>The systems your operators live in stay where they are &mdash; SIS, HR, ERP, CRM, ticketing, comms. Nebbos provides adapters for the common ones and a fast path for the custom ones. The Pearl reads through the adapters; it never becomes the system of record.</p>}
      />

      <FeatureRow
        eyebrow="Week 03 · Define the approval graph"
        title="Who signs off on what. How delegation flows."
        body={<p style={{ margin: 0 }}>Every consequential action passes through named-human approval. Week three is when the approval graph is drawn: which roles sign off on which actions, how delegation flows when the primary is out, what happens when the approver disagrees. The graph is the governance.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Week 04 · Promote to production"
        title="Shadow mode. Measure. Promote."
        body={<p style={{ margin: 0 }}>The Pearl runs in shadow first &mdash; it observes, it drafts, it flags, but it does not act. Week four is when the shadow trace is compared against your operators&rsquo; decisions, calibration lands where needed, and the promotion to production is a single deliberate cutover. Not a rollout. A cutover.</p>}
      />

      <FeatureRow
        eyebrow="After production"
        title="Every action audited. Every consumption metered. Every Pearl replayable."
        body={<p style={{ margin: 0 }}>Once the Pearl is live, the run-layer contract holds: every action lands in the audit ledger with a hash chain, every token is traced to its call and its business action, every decision can be replayed against a different context to answer &ldquo;what would have changed if we had known X.&rdquo; The four weeks front-load the shape; the substrate carries it forward.</p>}
      />

      <CTABand
        headline="Ready to shape the first Pearl?"
        deck="One 30-minute call opens the four weeks. Engineering scopes the workload with you before the timeline starts."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Read the docs", href: "/docs" }}
      />
    </>
  );
}
