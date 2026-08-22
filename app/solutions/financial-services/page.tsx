import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Financial Services",
  path: "/solutions/financial-services",
  description: "Catch the control before it breaches.",
});

/** Financial Services — rebuild-2026 v4 · Delta brief editorial. */
export default function FinancialServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Financial Services"
        title={
          <>
            Catch the control
            <br />
            before it <em style={{ fontStyle: "italic", color: "var(--gold)" }}>breaches</em>.
          </>
        }
        deck="Every exception, every approval, held to the same line."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="The exception that stops being one."
        body={<p style={{ margin: 0 }}>One-off approvals become the norm. By the time it&rsquo;s findable, the auditor already found it.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="Watch the drift, not the incident."
        body={<p style={{ margin: 0 }}>Pearl reads the approvals, the exceptions, the sign-offs. Drift surfaces before it hardens into a finding.</p>}
      />

      <CTABand headline="See the control before it breaches." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
