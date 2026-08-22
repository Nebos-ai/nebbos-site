import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Subprocessors",
  path: "/legal/subprocessors",
  description: "The current register is available under NDA. Contact legal@nebbos.ai.",
});

export default function Page() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Subprocessors."
      deck="The current register is available under NDA. Contact legal@nebbos.ai."
    >
      <ButtonLink href="mailto:legal@nebbos.ai" variant="primary" external>
        Request register →
      </ButtonLink>
    </Hero>
  );
}
