import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Status",
  path: "/status",
  description: "Systems operational. For incident reporting: security@nebbos.ai.",
});

export const dynamic = "force-static";
export const revalidate = false;

export default function StatusPage() {
  return (
    <>
      <Hero
        eyebrow="Status"
        title={
          <>
            Systems <em style={{ fontStyle: "italic", color: "var(--gold)" }}>operational</em>.
          </>
        }
        deck="All customer-facing services green. Substrate healthy."
      >
        <ButtonLink href="mailto:security@nebbos.ai" variant="primary" external>
          Report an incident
        </ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="What green means" />}
        title="No degraded services, no delayed writes."
        body={<p style={{ margin: 0 }}>Every customer-facing endpoint is responding under SLO. Ingest queue depth is nominal. No incidents open in the last 90 days.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="How we tell you if it's not" />}
        title="Direct email to admins. Same day."
        body={<p style={{ margin: 0 }}>Substrate-level incidents get a same-day email to every tenant admin. Tier-1 (data or auth) incidents get a call within one business hour.</p>}
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="How to report one" />}
        title={
          <>
            Email <em style={{ fontStyle: "italic", color: "var(--gold)" }}>security@nebbos.ai</em>.
          </>
        }
        body={<p style={{ margin: 0 }}>Include a reproducer, the affected tenant, and the impact class. We triage within one business hour and reply with a plan.</p>}
      />

      <CTABand
        headline="Something wrong on your side?"
        primary={{ label: "Email security", href: "mailto:security@nebbos.ai" }}
      />
    </>
  );
}
