import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tideline",
  path: "/governance",
  description: "Tideline is the line your AI never crosses. Four tiers of scrutiny. A small set of red lines.",
});

export default function GovernancePage() {
  return (
    <>
      <Hero
        eyebrow="Tideline"
        title={<>Nothing<br />skips scrutiny.</>}
        deck="Tideline is the line your AI never crosses."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
        <ButtonLink href="/security" variant="ghost">How oversight works</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="The idea"
        title="Scrutiny that scales with consequence."
        body={<p style={{ margin: 0 }}>Reading a report and rewriting the rules aren&apos;t the same act. Tideline sorts every action into four tiers — from read-only to rule-changing.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="The simulation gate"
        title="Rehearsed before it's real."
        body={<p style={{ margin: 0 }}>Consequential moves rehearse against a private copy of your operational state. A person signs off before anything lands.</p>}
      />

      <CTABand
        headline="See the gates on your own operation."
        primary={{ label: "Book a demo →", href: "/demo" }}
        secondary={{ label: "Compliance posture", href: "/compliance" }}
      />
    </>
  );
}
