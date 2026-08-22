import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acceptable Use",
  path: "/legal/acceptable-use",
  description: "Counsel-reviewed acceptable use policy lands with production.",
});

export default function AcceptableUsePage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Acceptable use policy."
      deck="Counsel-reviewed policy lands with production. Ask us for the current version."
    >
      <ButtonLink href="/contact" variant="primary">
        Get in touch →
      </ButtonLink>
    </Hero>
  );
}
