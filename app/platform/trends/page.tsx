import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trends",
  path: "/platform/trends",
  description:
    "The AI economy in 2026 — where the value pools across the stack, and why the run layer is the layer that captures it. Structural market read.",
});

/**
 * /platform/trends — Wave 5 · 2026-09-13 rewrite
 *
 * Was: 48-line market read structured around silicon/foundation/middle/agentic.
 * Now: same structural map, current voice, sharper positioning of where the
 * run layer sits in the stack.
 */
export default function TrendsPage() {
  return (
    <>
      <Hero
        eyebrow="Trends"
        title={
          <>
            The AI economy in{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>2026.</em>{" "}
            Where the value pools.
          </>
        }
        deck="A structural read of who controls what across the AI stack — from silicon at the bottom to governance at the top — and why the run layer is where the value is compounding."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="01 · Silicon and data centers"
        title="Compute at the bottom. Consolidating fast."
        body={<p style={{ margin: 0 }}>NVIDIA at the top of the chip stack; three hyperscalers running most of the training + inference at the data-center layer. Who owns the silicon owns the throughput ceiling for every model above. Costs are compressing but capacity is the constraint &mdash; not price.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="02 · Foundation models"
        title="The frontier keeps moving. The middle is losing."
        body={<p style={{ margin: 0 }}>OpenAI, Anthropic, Google, Meta at the frontier. Mid-tier providers &mdash; the ones between the frontier and open-source &mdash; are getting squeezed on both sides. Multi-provider routing is now table stakes; single-vendor lock-in is a governance risk.</p>}
      />

      <FeatureRow
        eyebrow="03 · Applications"
        title="Every SaaS category is being rewritten."
        body={<p style={{ margin: 0 }}>Applications wrapped around frontier models are commoditizing fast &mdash; the wrapper is thin, the model is generic, the moat is nowhere. Sustainable value in the application layer requires either deep vertical specialization OR an operational-judgment moat that the vendor CAN&rsquo;T see.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="04 · The run layer"
        title="Where governance meets the call. Where the value pools."
        body={<p style={{ margin: 0 }}>Between the model and the world sits the run layer &mdash; the class of work that decides whether the call runs, what it costs, what it touches, what it leaves behind. This is the layer that owns the operational judgment your team generates. This is where enterprise AI value now compounds.</p>}
      />

      <FeatureRow
        eyebrow="05 · Agentic payments"
        title="The emerging layer above run."
        body={<p style={{ margin: 0 }}>AI-mediated commerce is beginning to move real value. Governance, attestation, and human approval graphs move from nice-to-have to regulatory floor. The run layer that already owns the audit contract is where agentic payments will be settled.</p>}
      />

      <CTABand
        headline="See the full market context."
        deck="A 30-minute walk through the structural read, the vendor map at each layer, and where Nebbos sits in the 2026 stack."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "See the presentation", href: "/presentation" }}
      />
    </>
  );
}
