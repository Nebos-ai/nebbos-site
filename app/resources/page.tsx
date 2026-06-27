import { Section } from "@/components/ui/Section";
import { Tile } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  path: "/resources",
  description: "Writing, customer stories, product changelog and documentation from Nebbos.",
});

const hubs = [
  { href: "/blog", dep: "Writing", title: "Blog", body: "Notes on Operations Intelligence, foresight, and building accountable AI." },
  { href: "/customers", dep: "Stories", title: "Customers", body: "How teams put a Pearl on their hardest department." },
  { href: "/changelog", dep: "Product", title: "Changelog", body: "What shipped, and when." },
  { href: "/docs", dep: "Reference", title: "Docs", body: "Connectors, the agent interface, and how to get started." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything that explains Nebbos."
        lead="Writing, customer stories, product changelog and documentation — in one place."
      />
      <Section divider>
        <div className="grid grid-2">
          {hubs.map((h) => (
            <a key={h.href} href={h.href} style={{ display: "block" }}>
              <Tile label={h.dep} title={h.title}>{h.body}</Tile>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
