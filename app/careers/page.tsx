import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";
import { getCollection } from "@/lib/content";

export const metadata = pageMetadata({
  title: "Careers",
  path: "/careers",
  description: "Help build software that sharpens judgment instead of replacing it.",
});

export default function CareersPage() {
  const roles = getCollection("careers");
  return (
    <>
      <Hero
        eyebrow="Careers"
        title={
          <>
            Build software that
            <br />
            sharpens <em style={{ fontStyle: "italic", color: "var(--gold)" }}>judgment</em>.
          </>
        }
        deck="Not software that replaces it."
      >
        <ButtonLink href="/contact" variant="primary">Talk to us</ButtonLink>
      </Hero>

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 28 }}>Open roles</p>
          <div style={{ display: "grid", gap: 0 }}>
            {roles.map((r, i) => (
              <Link key={r.slug} href={`/careers/${encodeURIComponent(r.slug)}`} style={{ display: "block", padding: "24px 0", borderTop: i === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)" }}>
                <p className="eyebrow" style={{ margin: 0 }}>{r.frontmatter.team} · {r.frontmatter.location}</p>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", margin: "10px 0 0", color: "var(--ink)" }}>{r.frontmatter.title}</h3>
                {r.frontmatter.description ? <p style={{ margin: "8px 0 0", color: "var(--ink-3)", maxWidth: "60ch" }}>{r.frontmatter.description}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="Want to build this? Say hello." primary={{ label: "Talk to us", href: "/contact" }} />
    </>
  );
}
