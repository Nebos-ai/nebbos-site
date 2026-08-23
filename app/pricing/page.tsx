import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  path: "/pricing",
  description: "$150 per user per month. One flat price. Every seat gets everything.",
});

/**
 * Pricing — rebuild-2026 v4 · Delta brief editorial.
 * Canonical $150/user/mo flat per memory reference-nebos-pricing-canonical.
 */
export default function PricingPage() {
  return (
    <>
      <Hero
        eyebrow="Pricing"
        title={
          <>
            $150 per user
            <br />
            per <em style={{ fontStyle: "italic", color: "var(--gold)" }}>month</em>.
          </>
        }
        deck="One flat price. Every seat gets everything."
      >
        <ButtonLink href="/demo" variant="primary">
          Book a demo
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Talk to sales
        </ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="What's included"
        title="Every seat. Every capability."
        body={
          <p style={{ margin: 0 }}>
            One price, every feature. Billed annually with a 15% prepay
            discount. Twenty-user minimum.
          </p>
        }
      />

      <FeatureRow
        reverse
        eyebrow="What's separate"
        title="The lines that scale with usage."
        body={
          <p style={{ margin: 0 }}>
            Storage, bring-your-own-keys, and support tiers price separately —
            never gating the product itself.
          </p>
        }
      />

      <CTABand
        headline="One price. See it pay for itself."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Talk to sales", href: "/contact" }}
      />
    </>
  );
}
