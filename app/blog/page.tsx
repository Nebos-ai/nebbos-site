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
        title={
          <>
            Notes from
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Nebbos</em>.
          </>
        }
        deck="Foresight. Governance. The shape of operational work."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 0 }}>
            {posts.map((p, i) => (
              <Link key={p.slug} href={`/blog/${encodeURIComponent(p.slug)}`} style={{ display: "block", padding: "24px 0", borderTop: i === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)" }}>
                {p.frontmatter.date ? <p className="eyebrow" style={{ margin: 0 }}>{p.frontmatter.date}</p> : null}
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", margin: "10px 0 0", color: "var(--ink)" }}>{p.frontmatter.title}</h3>
                {p.frontmatter.description ? <p style={{ margin: "8px 0 0", color: "var(--ink-3)", maxWidth: "60ch" }}>{p.frontmatter.description}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="See what your operations are about to do." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
