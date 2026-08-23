import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";
import { BRAND } from "@/content/brand";
import { CONTACT, mailto } from "@/content/contact";
import { FACTS } from "@/content/facts";

export const metadata = constructMetadata({
  title: "Press",
  path: "/press",
  description: `For journalists writing about ${BRAND.name}. Facts, contact, and the mark.`,
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
            about <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{BRAND.name}</em>.
          </>
        }
        deck="Facts, contact, and the mark."
      >
        <ButtonLink href={mailto(CONTACT.press)} variant="primary" external>
          Email {CONTACT.press}
        </ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="What Nebbos is" />}
        title="One line."
        body={<p style={{ margin: 0 }}>{BRAND.name} is {BRAND.descriptionShort.replace(BRAND.name, "").replace(/^\s*—\s*/, "")} Fifteen layers, one system, owned by the customer.</p>}
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="02" label="Facts" />}
        title="What&rsquo;s true."
        body={
          <p style={{ margin: 0 }}>
            Founded {FACTS.foundingYear}. {FACTS.teamShape}. {FACTS.category}. Product
            ships behind an approval-gated substrate; no autonomous writes
            without human sign-off. Pricing is public and flat.
          </p>
        }
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="Brand assets" />}
        title="The mark."
        body={
          <p style={{ margin: 0 }}>
            The orange plus is the signature device. The N wordmark is the
            brand. Assets available on request via <a href={mailto(CONTACT.press)}>{CONTACT.press}</a>.
          </p>
        }
      />

      <CTABand
        headline="Writing about us? Reach out."
        primary={{ label: "Email press", href: mailto(CONTACT.press) }}
      />
    </>
  );
}
