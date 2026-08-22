import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  path: "/platform/how-it-works",
  description: "Live in days, not quarters. Connect the stack. Turn on a Pearl.",
});

export default function HowItWorksPage() {
  return (
    <>
      <Hero
        eyebrow="How it works"
        title={<>Live in days,<br />not quarters.</>}
        deck="Connect the stack. Turn on a Pearl. Watch the work."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Week one"
        title="We read what you already run."
        body={<p style={{ margin: 0 }}>Point us at the tools your team lives in. The platform learns the shape of the work before it touches a single decision.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="Week two"
        title="One Pearl, live in the room."
        body={<p style={{ margin: 0 }}>Pick the department that hurts most. A Pearl starts answering the five questions on your data, in your voice.</p>}
      />

      <CTABand headline="Days to first answer. Quarters to compound." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
