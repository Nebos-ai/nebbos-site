import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing",
  path: "/solutions/manufacturing",
  description: "Catch the crunch before the line.",
});

/** Manufacturing — rebuild-2026 v4 · Delta brief editorial. */
export default function ManufacturingPage() {
  return (
    <>
      <Hero
        eyebrow="Manufacturing"
        title={
          <>
            Catch the crunch
            <br />
            before the <em style={{ fontStyle: "italic", color: "var(--gold)" }}>line</em>.
          </>
        }
        deck="Suppliers, schedules, shifts — one view before the shortage."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="The part that arrived late."
        body={<p style={{ margin: 0 }}>A supplier slips. A shift is short. The line finds out at the line — and the plan for the week finds out with it.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="See it at the PO, not the pallet."
        body={<p style={{ margin: 0 }}>Pearl reads the orders, the schedules, the callouts. The crunch surfaces upstream, while there&rsquo;s still room to move.</p>}
      />

      <CTABand headline="See next week&rsquo;s crunch, this week." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
