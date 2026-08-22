import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compliance",
  path: "/compliance",
  description: "Designed to the EU AI Act high-risk bar and GDPR-aligned. Documentation available for active evaluations.",
});

export default function CompliancePage() {
  return (
    <>
      <Hero
        eyebrow="Compliance"
        title={<>Written for<br />the high-risk bar.</>}
        deck="EU AI Act high-risk ready. GDPR-aligned."
      >
        <ButtonLink href="/contact" variant="primary">Request documentation →</ButtonLink>
        <ButtonLink href="/security" variant="ghost">Security guarantees</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="The premise"
        title="Compliance you can demonstrate, not just assert."
        body={<p style={{ margin: 0 }}>Human oversight, traceable decisions, data minimisation — the things a regulator looks for are properties of how Nebbos was built. The evidence already exists.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Control frameworks"
        title="The controls we build to, stated honestly."
        body={<p style={{ margin: 0 }}>Nebbos was engineered to the SOC 2 and ISO 27001 controls — not a certificate currently held. The security package is available under NDA.</p>}
      />

      <CTABand
        headline="Running an evaluation? Request the pack."
        primary={{ label: "Request documentation →", href: "/contact" }}
        secondary={{ label: "How governance works", href: "/governance" }}
      />
    </>
  );
}
