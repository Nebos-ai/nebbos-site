import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { getCollection } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Customers",
  path: "/customers",
  description: "How teams put a Pearl on their hardest department.",
});

export default function CustomersIndexPage() {
  const stories = getCollection("customers");
  return (
    <>
      <PageHero eyebrow="Customers" title="Put a Pearl on your hardest department." lead="How teams use Nebbos to see what their operations are about to do." />
      <Section divider>
        <div className="grid grid-2">
          {stories.map((s) => (
            <Link key={s.slug} href={`/customers/${encodeURIComponent(s.slug)}`} className="tile" style={{ display: "block" }}>
              <div className="dep">{s.frontmatter.industry ?? s.frontmatter.company}</div>
              <h3 style={{ marginTop: 8 }}>{s.frontmatter.title}</h3>
              {s.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{s.frontmatter.description}</p> : null}
            </Link>
          ))}
        </div>
        <p className="mono faint" style={{ marginTop: 24, fontSize: 12 }}>
          Reference customers confirmed before publishing. Stories shown are illustrative.
        </p>
      </Section>
    </>
  );
}
