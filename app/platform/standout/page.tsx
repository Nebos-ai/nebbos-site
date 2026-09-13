import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Standout",
  path: "/platform/standout",
  description:
    "The one-page argument for Nebbos. Every other AI vendor sits above the run layer and can only recommend. Nebbos IS the run layer — governance by construction, not by policy.",
});

/**
 * /platform/standout — Wave 5 · 2026-09-13 rewrite
 *
 * Was: 42-line "somebody else's model" argument.
 * Now: a proper standout page contrasting the run-layer position against
 * every other vendor category. Same rhetorical shape, current voice.
 */
export default function StandoutPage() {
  return (
    <>
      <Hero
        eyebrow="Standout"
        title={
          <>
            Every other vendor sits{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>above</em> the run layer.
            <br />
            Nebbos <em style={{ fontStyle: "italic", color: "var(--gold)" }}>is</em> the run layer.
          </>
        }
        deck="One page. One argument. The category difference every enterprise buying committee needs to see before the shortlist gets drawn."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="01 · The frontier labs"
        title="Sell you a model. Never see the workload."
        body={<p style={{ margin: 0 }}>OpenAI, Anthropic, Google, Meta &mdash; the model providers train the world&rsquo;s best generalists. They cannot see your workload, your operators, your systems of record. They cannot govern a call because the call never reaches their runtime. They are downstream of the run layer.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="02 · The application vendors"
        title="Wrap a model in a UI. Governance ends at the wrapper."
        body={<p style={{ margin: 0 }}>Every AI-native application vendor sits above the model AND above the run layer &mdash; they call a frontier API and render the response. Their governance ends at the API boundary. What the call touched, what it consumed, what it committed &mdash; opaque to them, opaque to you, only auditable at the model provider they don&rsquo;t control.</p>}
      />

      <FeatureRow
        eyebrow="03 · The MLOps platforms"
        title="Deploy models. Governance is a monitoring dashboard."
        body={<p style={{ margin: 0 }}>Vertex, SageMaker, Databricks &mdash; the MLOps stack governs the model. It does not govern the call. When your compliance officer asks &ldquo;which decision consumed which tokens under which policy,&rdquo; MLOps has traces of inference, not traces of governance.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="04 · Nebbos"
        title="The run layer itself. Governance IS the runtime."
        body={<p style={{ margin: 0 }}>Nebbos is where the AI call lives. Every call carries its own audit, its own metering, its own isolation. Every action passes through the approval graph. Every consumption traces to a business decision. Not a wrapper. Not a dashboard. The substrate.</p>}
      />

      <CTABand
        headline="See the position on your workload."
        deck="A 30-minute walkthrough of the same workload evaluated against a frontier-lab call, an application vendor, an MLOps platform, and Nebbos. The category difference lands in the differences."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "See the presentation", href: "/presentation" }}
      />
    </>
  );
}
