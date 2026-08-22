import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Finance",
  path: "/solutions/finance",
  description: "Predictable cost. A tool that compounds.",
});

export default function FinancePage() {
  return (
    <>
      <Hero
        eyebrow="Finance"
        title={<>Predictable cost.<br />A tool that compounds.</>}
        deck="One flat price. Intelligence that grows into your business."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What breaks"
        title="Software you can&rsquo;t forecast."
        body={<p style={{ margin: 0 }}>Per-seat, per-token, per-surprise. The bill for AI has become the hardest line on the plan.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What we do"
        title="$150 per user. That&rsquo;s the line."
        body={<p style={{ margin: 0 }}>One flat price for everything. Billed annually with a 15% prepay discount. The value compounds; the invoice doesn&rsquo;t.</p>}
      />

      <CTABand headline="One price. See it pay for itself." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
