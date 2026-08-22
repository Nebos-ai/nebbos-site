import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  path: "/resources",
  description: "Every read in one place. Blog. Customers. Changelog. Docs.",
});

export default function ResourcesPage() {
  return (
    <Hero
      size="lg"
      eyebrow="Resources"
      title="Every read in one place."
      deck="Blog. Customers. Changelog. Docs."
    >
      <ButtonLink href="/blog" variant="primary">
        Read the blog →
      </ButtonLink>
      <ButtonLink href="/customers" variant="ghost">
        See customers
      </ButtonLink>
    </Hero>
  );
}
