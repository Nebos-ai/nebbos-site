import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  path: "/legal/privacy",
  description: "Counsel-reviewed privacy policy lands with production.",
});

export default function PrivacyPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Privacy policy."
      deck="Counsel-reviewed policy lands with production. Ask us for the current disclosure."
    >
      <ButtonLink href="/contact" variant="primary">
        Get in touch →
      </ButtonLink>
    </Hero>
  );
}
