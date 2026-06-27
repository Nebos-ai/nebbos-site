import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { getCollection } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Changelog",
  path: "/changelog",
  description: "What shipped, and when.",
});

export default function ChangelogPage() {
  const entries = getCollection("changelog");
  return (
    <>
      <PageHero eyebrow="Changelog" title="What shipped, and when." lead="A running record of how Nebbos gets sharper." />
      <Section divider>
        <div style={{ display: "grid", gap: 16 }}>
          {entries.map((e) => (
            <div key={e.slug} className="tile">
              <div className="dep">{e.frontmatter.date}</div>
              <h3 style={{ marginTop: 8 }}>{e.frontmatter.title}</h3>
              {e.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{e.frontmatter.description}</p> : null}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
