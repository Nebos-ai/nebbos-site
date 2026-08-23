import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Pricing",
  path: "/pricing",
  description: "$150 per user per month. One flat price. Every seat gets everything.",
});

export const dynamic = "force-static";
export const revalidate = false;

/**
 * Pricing — v4 delta-brief editorial + W3c numbered section rhythm.
 * Canonical $150/user/mo flat per memory reference_nebos_pricing_ratified_2026_08_22.
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
        eyebrow={<SectionNumeral n="01" label="What's included" />}
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
        eyebrow={<SectionNumeral n="02" label="What's separate" />}
        title={
          <>
            The lines that scale with <em style={{ fontStyle: "italic", color: "var(--gold)" }}>usage</em>.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Storage, bring-your-own-keys, and support tiers price separately —
            never gating the product itself.
          </p>
        }
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="How overage works" />}
        title="Nebbos tokens, not provider dollars."
        body={
          <p style={{ margin: 0 }}>
            AI-usage overage bills in Nebbos tokens — a stable currency
            decoupled from LLM providers&rsquo; price swings. What you sign is
            what you pay, month after month.
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
