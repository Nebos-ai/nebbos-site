import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Platform",
  path: "/platform",
  description: "Five questions. In order. The platform behind every Pearl.",
});

export default function PlatformPage() {
  return (
    <>
      <Hero
        eyebrow="Platform"
        title={<>Five questions.<br />In order.</>}
        deck="What&rsquo;s changing. What breaks next. What to do."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="How it thinks"
        title="Signals first. Answers second."
        body={<p style={{ margin: 0 }}>The platform reads what your work already emits, then answers the five questions your operators ask every week.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What you get"
        title="One place to see it. One place to act."
        body={<p style={{ margin: 0 }}>Cradle holds the memory. Shell keeps it honest. Pearl does the work.</p>}
      />

      <CTABand headline="See the five questions on your data." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
