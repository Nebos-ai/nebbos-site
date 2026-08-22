import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Healthcare",
  path: "/solutions/healthcare",
  description: "Every shift, accounted for. Coverage before the ward feels it.",
});

export default function HealthcarePage() {
  return (
    <>
      <Hero
        eyebrow="Healthcare"
        title={<>Every shift,<br />accounted for.</>}
        deck="Coverage, licenses, escalations — held before the ward feels it."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="The gap nobody owns."
        body={<p style={{ margin: 0 }}>A license lapses. A shift goes uncovered. The chart shows fine until a patient discovers it isn&rsquo;t.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="Catch it at the schedule, not the bedside."
        body={<p style={{ margin: 0 }}>Pearl reads the roster, the credentials, the escalation log. The miss surfaces where it can still be fixed.</p>}
      />

      <CTABand headline="See the next uncovered shift, this week." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
