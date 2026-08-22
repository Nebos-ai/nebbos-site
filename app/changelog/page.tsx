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
        title={
          <>
            What shipped,
            <br />
            and <em style={{ fontStyle: "italic", color: "var(--gold)" }}>when</em>.
          </>
        }
        deck="A running record of how Nebbos gets sharper."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 0 }}>
            {entries.map((e, i) => (
              <div key={e.slug} style={{ padding: "24px 0", borderTop: i === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)" }}>
                <p className="eyebrow" style={{ margin: 0 }}>{e.frontmatter.date}</p>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", margin: "10px 0 0", color: "var(--ink)" }}>{e.frontmatter.title}</h3>
                {e.frontmatter.description ? <p style={{ margin: "8px 0 0", color: "var(--ink-3)", maxWidth: "60ch" }}>{e.frontmatter.description}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="See what your operations are about to do." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
