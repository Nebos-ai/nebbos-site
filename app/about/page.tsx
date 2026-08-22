import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description: "Nebbos builds the tool companies use to build their own AI.",
});

export default function AboutPage() {
  return (
    <Hero
      size="xl"
      eyebrow="About"
      title={
        <>
          The tool for building
          <br />
          your company&apos;s brain.
        </>
      }
      deck="Owned by you. Compounding every quarter."
    >
      <ButtonLink href="/demo" variant="primary">
        Book a demo →
      </ButtonLink>
      <ButtonLink href="/contact" variant="ghost">
        Get in touch
      </ButtonLink>
    </Hero>
  );
}
