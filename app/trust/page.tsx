import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Trust Center",
  path: "/trust",
  description: "Security, governance, and compliance designed into the architecture — not retrofitted to it.",
});

export const dynamic = "force-static";
export const revalidate = false;

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
        eyebrow={<SectionNumeral n="01" label="The premise" />}
        title="Trust you can read, not take on faith."
        body={<p style={{ margin: 0 }}>Nebbos was built to the high-risk AI bar. Oversight, minimisation, and audit are properties of the platform — not a policy page.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="Where to go deep" />}
        title={
          <>
            Security. Governance. <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Compliance</em>.
          </>
        }
        body={<p style={{ margin: 0 }}>Three pages, one standard. A human on every consequential move. Every decision sourced. Your data, your tenant.</p>}
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="What you can request" />}
        title="Security package under NDA."
        body={<p style={{ margin: 0 }}>Ask via <a href="/contact">contact</a>. We turn around the security questionnaire, the sub-processor list, the DPA, and the responsible-disclosure protocol within 48 hours.</p>}
      />

      <CTABand
        headline="Bring the security questionnaire."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
