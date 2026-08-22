import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description: "Nebbos comes from a village in Vojvodina. The idea it is built on came from there too.",
});

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title={<>Nebbos comes<br />from a village.</>}
        deck="Vojvodina. Birthplace of Mihajlo Pupin."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
        <ButtonLink href="/careers" variant="ghost">Join us</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="The name"
        title="Carry a faint signal across distance, intact."
        body={<p style={{ margin: 0 }}>Pupin spent his life on one problem — letting a weak voice travel far without losing what it held. Every operation is full of faint signal that fades before anyone acts.</p>}
      />

      <FeatureRow
        reverse
        eyebrow="How Nebbos builds"
        title="Sharpen judgment. Show the work."
        body={<p style={{ margin: 0 }}>The consequential calls stay with people. Every answer comes with its evidence. Autonomy is earned by being right over time — never flipped on day one.</p>}
      />

      <CTABand
        headline="See what your operations are about to do."
        primary={{ label: "Book a demo →", href: "/demo" }}
        secondary={{ label: "Join us", href: "/careers" }}
      />
    </>
  );
}
