import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookies",
  path: "/legal/cookies",
  description: "Nebbos uses only functional cookies. Counsel-reviewed policy lands with production.",
});

export default function CookiesPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Cookie policy."
      deck="Nebbos uses only functional cookies. Counsel-reviewed policy lands with production."
    >
      <ButtonLink href="/contact" variant="primary">
        Get in touch →
      </ButtonLink>
    </Hero>
  );
}
