import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Security",
  path: "/security",
  description: "Oversight enforced in the architecture. A human on every consequential move. Every decision sourced.",
});

export const dynamic = "force-static";
export const revalidate = false;

export default function SecurityPage() {
  return (
    <>
      <Hero
        eyebrow="Security"
        title={
          <>
            Oversight isn&rsquo;t
            <br />
            a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>setting</em>.
          </>
        }
        deck="It&rsquo;s the architecture."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/contact" variant="ghost">Talk to us</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="The guarantees" />}
        title="Four things true by construction."
        body={<p style={{ margin: 0 }}>A human on every consequential move. Every decision sourced. Bounded, reversible autonomy. Your data isolated at the database — not promised in a clause.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="Control frameworks" />}
        title={
          <>
            Built to the SOC 2 and ISO 27001 <em style={{ fontStyle: "italic", color: "var(--gold)" }}>controls</em>.
          </>
        }
        body={<p style={{ margin: 0 }}>Nebbos was engineered to those controls — they shape how the platform is built, not a certificate currently held. Security package available under NDA.</p>}
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="Responsible disclosure" />}
        title="Report a vulnerability."
        body={<p style={{ margin: 0 }}>Email <a href="mailto:security@nebbos.ai">security@nebbos.ai</a>. We triage within one business day. See <a href="/legal/responsible-disclosure">the responsible-disclosure policy</a> for the full protocol.</p>}
      />

      <CTABand
        headline="Bring the security questionnaire."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "How governance works", href: "/governance" }}
      />
    </>
  );
}
