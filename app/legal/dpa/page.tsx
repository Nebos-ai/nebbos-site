import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Data Processing Agreement",
  path: "/legal/dpa",
  description: "Article 28 processor terms under NDA. Contact legal@nebbos.ai.",
});

export default function Page() {
  return (
    <Hero
      size="lg"
      eyebrow="Legal"
      title="Data Processing Agreement."
      deck="Article 28 processor terms under NDA. Contact legal@nebbos.ai."
    >
      <ButtonLink href="mailto:legal@nebbos.ai" variant="primary" external>
        Request DPA →
      </ButtonLink>
    </Hero>
  );
}
