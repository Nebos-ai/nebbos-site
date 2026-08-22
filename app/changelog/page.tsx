import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
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
      <Hero
        eyebrow="Changelog"
        title={<>What shipped,<br />and when.</>}
        deck="A running record of how Nebbos gets sharper."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <section style={{ padding: "56px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 16 }}>
            {entries.map((e) => (
              <div key={e.slug} className="tile">
                <div className="dep">{e.frontmatter.date}</div>
                <h3 style={{ marginTop: 8 }}>{e.frontmatter.title}</h3>
                {e.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{e.frontmatter.description}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="See what your operations are about to do." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
