import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Responsible disclosure",
  path: "/legal/responsible-disclosure",
  description: "Report a vulnerability to security@nebbos.ai. PGP key on request.",
});

export default function Page() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Responsible disclosure."
      deck="Report a vulnerability to security@nebbos.ai. PGP key on request."
    >
      <ButtonLink href="mailto:security@nebbos.ai" variant="primary" external>
        Report a vulnerability →
      </ButtonLink>
    </Hero>
  );
}
