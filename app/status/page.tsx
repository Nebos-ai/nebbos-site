import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Status",
  path: "/status",
  description: "Live status feed lands with production.",
});

export default function StatusPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Status"
      title="All systems operational."
      deck="Live status feed lands with production."
    >
      <ButtonLink href="/contact" variant="primary">
        Get in touch →
      </ButtonLink>
    </Hero>
  );
}
