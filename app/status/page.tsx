import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Status",
  path: "/status",
  description: "Systems operational. For incident reporting: security@nebbos.ai.",
});

export default function StatusPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Status"
      title="Systems operational."
      deck="For incident reporting: security@nebbos.ai."
    >
      <ButtonLink href="mailto:security@nebbos.ai" variant="primary" external>
        Report an incident →
      </ButtonLink>
    </Hero>
  );
}
