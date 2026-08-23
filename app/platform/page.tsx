import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Platform",
  path: "/platform",
  description: "Five questions. In order. The platform behind every Pearl.",
});

export const dynamic = "force-static";
export const revalidate = false;

/** Platform — v4 delta-brief + W3c numbered section rhythm. */
export default function PlatformPage() {
  return (
    <>
      <Hero
        eyebrow="Platform"
        title={
          <>
            Five questions.
            <br />
            In <em style={{ fontStyle: "italic", color: "var(--gold)" }}>order</em>.
          </>
        }
        deck="What&rsquo;s changing. What breaks next. What to do."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/platform/architecture" variant="ghost">See the architecture</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="How it thinks" />}
        title={
          <>
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Signals</em> first. Answers second.
          </>
        }
        body={<p style={{ margin: 0 }}>The platform reads what your work already emits, then answers the five questions your operators ask every week.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="What you get" />}
        title="One place to see it. One place to act."
        body={<p style={{ margin: 0 }}>Cradle holds the memory. Shell keeps it honest. Pearl does the work.</p>}
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="Where to go next" />}
        title="Read the architecture."
        body={<p style={{ margin: 0 }}>Fifteen layers, one system. See how the substrate, boundary, intelligence, agent, and commerce bands connect on the home-page graph — then dive into how it works.</p>}
      />

      <CTABand headline="See the five questions on your data." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
