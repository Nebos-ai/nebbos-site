import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Subprocessors",
  path: "/legal/subprocessors",
  description: "The vendors that process your data. A current list is available on request.",
});

export default function SubprocessorsPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Subprocessors."
      deck="The vendors that process your data. A current list is available on request."
    >
      <ButtonLink href="/contact" variant="primary">
        Request the current list →
      </ButtonLink>
    </Hero>
  );
}
