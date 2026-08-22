import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  path: "/legal/terms",
  description: "Counsel-reviewed terms of service land with production.",
});

export default function TermsPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Terms of service."
      deck="Counsel-reviewed terms land with production. Ask us for the current version."
    >
      <ButtonLink href="/contact" variant="primary">
        Get in touch →
      </ButtonLink>
    </Hero>
  );
}
