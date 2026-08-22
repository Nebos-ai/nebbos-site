import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions",
  path: "/solutions",
  description: "Coordination is where the work lives. A Pearl for every department.",
});

export default function SolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="Solutions"
        title={<>Coordination is where<br />the work lives.</>}
        deck="A Pearl for every department that has to answer for it."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Where it hurts"
        title="The seam between teams."
        body={<p style={{ margin: 0 }}>The problem is rarely inside a team. It&rsquo;s between them — in the handoff, the deadline, the decision nobody wrote down.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="Watch the seam. Surface the miss."
        body={<p style={{ margin: 0 }}>One Pearl per department. Each fluent in its work, each honest about what it sees the others miss.</p>}
      />

      <CTABand headline="Start with the department that hurts most." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
