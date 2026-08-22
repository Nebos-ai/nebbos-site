import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "K-12",
  path: "/solutions/k12",
  description: "See the coverage gap before it reaches a family.",
});

/** K-12 — rebuild-2026 v4 · Delta brief editorial. */
export default function K12Page() {
  return (
    <>
      <Hero
        eyebrow="K-12"
        title={
          <>
            See the gap before
            <br />
            it reaches a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>family</em>.
          </>
        }
        deck="The absence, the substitute, the parent email — all in one view."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="A gap you find on Monday."
        body={<p style={{ margin: 0 }}>Somebody called out. The class isn&rsquo;t covered. The families find out first — and the district finds out from them.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="See Monday&rsquo;s gap on Friday."
        body={<p style={{ margin: 0 }}>Pearl reads the schedule, the callouts, the sub pool. You see the gap in time to close it before a family notices.</p>}
      />

      <CTABand headline="See next week&rsquo;s coverage on your data." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
