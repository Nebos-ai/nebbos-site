import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press",
  path: "/press",
  description: "For journalists writing about Nebbos. Facts, contact, and the mark.",
});

export default function PressPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Press"
      title="For journalists writing about Nebbos."
      deck="Facts, contact, and the mark."
    >
      <ButtonLink href="mailto:press@nebbos.ai" variant="primary" external>
        Email press@nebbos.ai →
      </ButtonLink>
    </Hero>
  );
}
