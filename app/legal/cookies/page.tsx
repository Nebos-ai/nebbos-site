import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookies",
  path: "/legal/cookies",
  description: "Nebbos uses only functional cookies. Contact legal@nebbos.ai.",
});

export default function Page() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Cookies."
      deck="Nebbos uses only functional cookies. Contact legal@nebbos.ai."
    >
      <ButtonLink href="mailto:legal@nebbos.ai" variant="primary" external>
        Contact legal →
      </ButtonLink>
    </Hero>
  );
}
