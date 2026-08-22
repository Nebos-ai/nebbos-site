import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Acceptable use",
  path: "/legal/acceptable-use",
  description: "For the current AUP, contact legal@nebbos.ai.",
});

export default function Page() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Acceptable use."
      deck="For the current AUP, contact legal@nebbos.ai."
    >
      <ButtonLink href="mailto:legal@nebbos.ai" variant="primary" external>
        Contact legal →
      </ButtonLink>
    </Hero>
  );
}
