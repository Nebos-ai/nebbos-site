import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { getCollection } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Blog",
  path: "/blog",
  description: "Notes from Nebbos. Foresight, governance, and the shape of operational work.",
});

export default function BlogIndexPage() {
  const posts = getCollection("blog");
  return (
    <>
      <Hero
        eyebrow="Blog"
        title={<>Notes<br />from Nebbos.</>}
        deck="Foresight. Governance. The shape of operational work."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <section style={{ padding: "56px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 16 }}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${encodeURIComponent(p.slug)}`} className="tile" style={{ display: "block" }}>
                {p.frontmatter.date ? <div className="dep">{p.frontmatter.date}</div> : null}
                <h3 style={{ marginTop: 8 }}>{p.frontmatter.title}</h3>
                {p.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{p.frontmatter.description}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="See what your operations are about to do." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
