import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";
import { getCollection } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Blog",
  path: "/blog",
  description: "Notes on Operations Intelligence, foresight, and building accountable AI.",
});

export default function BlogIndexPage() {
  const posts = getCollection("blog");
  return (
    <>
      <PageHero eyebrow="Blog" title="Writing from Nebbos." lead="Notes on foresight, governance, and the shape of operational work." />
      <Section divider>
        <div style={{ display: "grid", gap: 16 }}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${encodeURIComponent(p.slug)}`} className="tile" style={{ display: "block" }}>
              {p.frontmatter.date ? <div className="dep">{p.frontmatter.date}</div> : null}
              <h3 style={{ marginTop: 8 }}>{p.frontmatter.title}</h3>
              {p.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{p.frontmatter.description}</p> : null}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
