import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Architecture",
  path: "/platform/architecture",
  description: "Cheap to watch. Sharp when it counts. The shape of the platform.",
});

/** Architecture — rebuild-2026 v4 · Delta brief editorial. */
export default function ArchitecturePage() {
  return (
    <>
      <Hero
        eyebrow="Architecture"
        title={
          <>
            Cheap to watch.
            <br />
            Sharp when it <em style={{ fontStyle: "italic", color: "var(--gold)" }}>counts</em>.
          </>
        }
        deck="Small models listen. Big models decide."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="The shape"
        title="Three layers. One direction."
        body={<p style={{ margin: 0 }}>Cradle remembers. Shell governs. Pearl acts. Each layer earns its keep — nothing runs on a cost you can&rsquo;t explain.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What that buys"
        title="You own the memory."
        body={<p style={{ margin: 0 }}>The intelligence compounds inside your tenant. Portable to you, never trained back into somebody else&rsquo;s model.</p>}
      />

      <CTABand headline="See the shape on your own stack." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
