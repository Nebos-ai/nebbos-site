import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Responsible Disclosure",
  path: "/legal/responsible-disclosure",
  description: "Report a vulnerability to security@nebbos.ai. Full policy lands with production.",
});

export default function ResponsibleDisclosurePage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Responsible disclosure."
      deck="Report a vulnerability to security@nebbos.ai. Full policy lands with production."
    >
      <ButtonLink href="mailto:security@nebbos.ai" variant="primary">
        Email security@nebbos.ai →
      </ButtonLink>
    </Hero>
  );
}
