import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Public Sector",
  path: "/solutions/public-sector",
  description: "Accountable by construction. Every decision, traceable.",
});

/** Public Sector — rebuild-2026 v4 · Delta brief editorial. */
export default function PublicSectorPage() {
  return (
    <>
      <Hero
        eyebrow="Public Sector"
        title={
          <>
            Accountable
            <br />
            by <em style={{ fontStyle: "italic", color: "var(--gold)" }}>construction</em>.
          </>
        }
        deck="Every decision traceable. Every handoff on the record."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="The trail that goes cold."
        body={<p style={{ margin: 0 }}>A case moves between agencies. Somewhere in the middle, the trail thins — and the answer to who decided what does too.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="The record writes itself."
        body={<p style={{ margin: 0 }}>Pearl reads the handoffs as they happen. The trail is intact before anyone has to reconstruct it.</p>}
      />

      <CTABand headline="See the trail on your own casework." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
