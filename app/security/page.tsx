import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security",
  path: "/security",
  description: "Oversight enforced in the architecture. A human on every consequential move. Every decision sourced.",
});

export default function SecurityPage() {
  return (
    <>
      <Hero
        eyebrow="Security"
        title={
          <>
            Oversight isn&apos;t
            <br />
            a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>setting</em>.
          </>
        }
        deck="It's the architecture."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/contact" variant="ghost">Talk to us</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="The guarantees"
        title="Four things true by construction."
        body={<p style={{ margin: 0 }}>A human on every consequential move. Every decision sourced. Bounded, reversible autonomy. Your data isolated at the database — not promised in a clause.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Control frameworks"
        title="Built to the SOC 2 and ISO 27001 controls."
        body={<p style={{ margin: 0 }}>Nebbos was engineered to those controls — they shape how the platform is built, not a certificate currently held. Security package available under NDA.</p>}
      />

      <CTABand
        headline="Bring the security questionnaire."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "How governance works", href: "/governance" }}
      />
    </>
  );
}
