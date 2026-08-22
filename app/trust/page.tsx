import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trust Center",
  path: "/trust",
  description: "Security, governance, and compliance designed into the architecture, not retrofitted to it.",
});

export default function TrustPage() {
  return (
    <>
      <Hero
        eyebrow="Trust center"
        title={
          <>
            Accountable by
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>architecture</em>.
          </>
        }
        deck="Read the guarantees. Then read the code."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/security" variant="ghost">Security</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="The premise"
        title="Trust you can read, not take on faith."
        body={<p style={{ margin: 0 }}>Nebbos was built to the high-risk AI bar. Oversight, minimisation, and audit are properties of the platform — not a policy page.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Where to go deep"
        title="Security. Governance. Compliance."
        body={<p style={{ margin: 0 }}>Three pages, one standard. A human on every consequential move. Every decision sourced. Your data, your tenant.</p>}
      />

      <CTABand
        headline="Bring the security questionnaire."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
