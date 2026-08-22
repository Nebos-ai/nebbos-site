import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Docs",
  path: "/docs",
  description: "Docs are on the way. For now, ask us directly.",
});

export default function DocsPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Docs"
      title="Docs are on the way."
      deck="For now, ask us directly."
    >
      <ButtonLink href="/contact" variant="primary">
        Get in touch →
      </ButtonLink>
    </Hero>
  );
}
