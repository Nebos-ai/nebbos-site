import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press",
  path: "/press",
  description: "For journalists writing about Nebbos. Facts, contact, and the mark, on request.",
});

export default function PressPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Press"
      title="For journalists writing about Nebbos."
      deck="Facts, contact, and the mark, on request."
    >
      <ButtonLink href="mailto:press@nebbos.ai" variant="primary">
        Email press@nebbos.ai →
      </ButtonLink>
    </Hero>
  );
}
