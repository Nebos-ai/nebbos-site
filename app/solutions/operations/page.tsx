import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Operations",
  path: "/solutions/operations",
  description: "Stop finding out on Friday.",
});

export default function OperationsPage() {
  return (
    <>
      <Hero
        eyebrow="Operations"
        title={<>Stop finding out<br />on Friday.</>}
        deck="The week&rsquo;s misses, surfaced while there&rsquo;s still a week."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="The status update that&rsquo;s already too late."
        body={<p style={{ margin: 0 }}>By Friday, the miss is a headline. By Monday, it&rsquo;s a meeting. The week you needed to act was the one before.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="Surface it on Monday."
        body={<p style={{ margin: 0 }}>Pearl reads the handoffs, the deadlines, the decisions. Friday&rsquo;s headline shows up in Monday&rsquo;s view.</p>}
      />

      <CTABand headline="See Friday&rsquo;s problem on Monday." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
