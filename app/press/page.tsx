import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Press",
  path: "/press",
  description: "For journalists writing about Nebbos. Facts, contact, and the mark.",
});

export const dynamic = "force-static";
export const revalidate = false;

export default function PressPage() {
  return (
    <>
      <Hero
        eyebrow="Press"
        title={
          <>
            For journalists writing
            <br />
            about <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Nebbos</em>.
          </>
        }
        deck="Facts, contact, and the mark."
      >
        <ButtonLink href="mailto:press@nebbos.ai" variant="primary" external>
          Email press@nebbos.ai
        </ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="What Nebbos is" />}
        title="One line."
        body={<p style={{ margin: 0 }}>Nebbos is the tool for building your company&rsquo;s brain — a governance substrate for enterprise AI agents. Fifteen layers, one system, owned by the customer.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="Facts" />}
        title="What&rsquo;s true."
        body={
          <p style={{ margin: 0 }}>
            Founded 2026. Solo-founder-led. Enterprise AI-agent governance
            category. Product ships behind an approval-gated substrate; no
            autonomous writes without human sign-off. Pricing is public and
            flat.
          </p>
        }
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="Brand assets" />}
        title="The mark."
        body={
          <p style={{ margin: 0 }}>
            The orange plus is the signature device. The N wordmark is the
            brand. Assets available on request via <a href="mailto:press@nebbos.ai">press@nebbos.ai</a>.
          </p>
        }
      />

      <CTABand
        headline="Writing about us? Reach out."
        primary={{ label: "Email press", href: "mailto:press@nebbos.ai" }}
      />
    </>
  );
}
