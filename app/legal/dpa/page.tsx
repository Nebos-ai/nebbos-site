import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Data Processing Agreement",
  path: "/legal/dpa",
  description: "Counsel-reviewed DPA lands with production. A current draft is available on request.",
});

export default function DpaPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Data Processing Agreement."
      deck="Counsel-reviewed DPA lands with production. A current draft is available on request."
    >
      <ButtonLink href="/contact" variant="primary">
        Request the current draft →
      </ButtonLink>
    </Hero>
  );
}
