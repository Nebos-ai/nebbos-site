import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Documentation",
  path: "/docs",
  description: "For technical questions, contact engineering@nebbos.ai.",
});

export default function DocsPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Documentation"
      title="For technical questions,"
      deck="reach engineering directly."
    >
      <ButtonLink href="mailto:engineering@nebbos.ai" variant="primary" external>
        Contact engineering →
      </ButtonLink>
    </Hero>
  );
}
