import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description: "Nebbos builds the tool companies use to build their own company brain.",
});

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title={
          <>
            The tool for building
            <br />
            your company&apos;s <em style={{ fontStyle: "italic", color: "var(--gold)" }}>brain</em>.
          </>
        }
        deck="Owned by you. Compounding every quarter."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/contact" variant="ghost">Get in touch</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Why it exists"
        title="Every other AI trains someone else's model."
        body={<p style={{ margin: 0 }}>Nebbos trains yours. The intelligence, the memory, the moat — owned by you, portable to you, compounding every quarter.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="What it is"
        title="A brain built department by department."
        body={<p style={{ margin: 0 }}>One Pearl per department. Pre-educated in your work. Learns independently. Yours to keep.</p>}
      />

      <CTABand
        headline="Put a Pearl on your hardest department."
        primary={{ label: "Book a demo", href: "/demo" }}
      />
    </>
  );
}
