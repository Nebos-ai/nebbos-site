import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "People",
  path: "/solutions/people",
  description: "The gap. Not the person.",
});

export default function PeoplePage() {
  return (
    <>
      <Hero
        eyebrow="People"
        title={<>The gap.<br />Not the person.</>}
        deck="Where the work is stuck. Not who to blame for it."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="The dashboard that names names."
        body={<p style={{ margin: 0 }}>Most tools rank people. The problem is almost never one person — it&rsquo;s the seam between two.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="Show the seam. Fix the flow."
        body={<p style={{ margin: 0 }}>Pearl reads the handoffs, not the headcount. What surfaces is where the work slows — and what to change so it stops.</p>}
      />

      <CTABand headline="See the seam on your own team." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
