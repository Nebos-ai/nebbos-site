import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pearl",
  path: "/pearl",
  description: "One Pearl per department. Pre-educated. Yours to keep.",
});

/** Pearl — rebuild-2026 v4 · Delta brief editorial. */
export default function PearlPage() {
  return (
    <>
      <Hero
        eyebrow="Pearl"
        title={
          <>
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>One</em> Pearl
            <br />
            per department.
          </>
        }
        deck="Pre-educated in the work. Yours to keep."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What a Pearl is"
        title="An agent that already knows the job."
        body={<p style={{ margin: 0 }}>Every Pearl arrives fluent in its department. It learns your specifics on top — never from a cold start.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What you keep"
        title="The memory belongs to you."
        body={<p style={{ margin: 0 }}>Everything a Pearl learns lives in your tenant. Portable to you, compounding every quarter, trained on nobody else.</p>}
      />

      <CTABand headline="Put a Pearl on your hardest department." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
