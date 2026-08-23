import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Tideline",
  path: "/governance",
  description: "Tideline is the line your AI never crosses. Four tiers of scrutiny. A small set of red lines.",
});

export const dynamic = "force-static";
export const revalidate = false;

export default function GovernancePage() {
  return (
    <>
      <Hero
        eyebrow="Tideline"
        title={
          <>
            Nothing skips
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>scrutiny</em>.
          </>
        }
        deck="Tideline is the line your AI never crosses."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/security" variant="ghost">How oversight works</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="The idea" />}
        title={
          <>
            Scrutiny that scales with <em style={{ fontStyle: "italic", color: "var(--gold)" }}>consequence</em>.
          </>
        }
        body={<p style={{ margin: 0 }}>Reading a report and rewriting the rules aren&rsquo;t the same act. Tideline sorts every action into four tiers — from read-only to rule-changing.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="The simulation gate" />}
        title="Rehearsed before it&rsquo;s real."
        body={<p style={{ margin: 0 }}>Consequential moves rehearse against a private copy of your operational state. A person signs off before anything lands.</p>}
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="The red lines" />}
        title="Some things an AI must never write."
        body={<p style={{ margin: 0 }}>Human-only zones are enforced in the substrate — not by a policy, by the architecture. The list is small, deliberate, and per-tenant tunable within a global ceiling.</p>}
      />

      <CTABand
        headline="See the gates on your own operation."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Compliance posture", href: "/compliance" }}
      />
    </>
  );
}
