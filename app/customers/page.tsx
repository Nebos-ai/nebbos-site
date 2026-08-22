import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { CTABand } from "@/components/ui/CTABand";
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
      <Hero
        eyebrow="Customers"
        title={
          <>
            Put a Pearl on your
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>hardest</em> department.
          </>
        }
        deck="How teams use Nebbos on the work that matters."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
      </Hero>

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container">
          <div style={{ display: "grid", gap: 0 }}>
            {stories.map((s, i) => (
              <Link key={s.slug} href={`/customers/${encodeURIComponent(s.slug)}`} style={{ display: "block", padding: "24px 0", borderTop: i === 0 ? "1px solid var(--rule)" : "none", borderBottom: "1px solid var(--rule)" }}>
                <p className="eyebrow" style={{ margin: 0 }}>{s.frontmatter.industry ?? s.frontmatter.company}</p>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", margin: "10px 0 0", color: "var(--ink)" }}>{s.frontmatter.title}</h3>
                {s.frontmatter.description ? <p style={{ margin: "8px 0 0", color: "var(--ink-3)", maxWidth: "60ch" }}>{s.frontmatter.description}</p> : null}
              </Link>
            ))}
          </div>
          <p className="mono" style={{ marginTop: 24, fontSize: 12, color: "var(--muted)" }}>Stories shown are illustrative.</p>
        </div>
      </section>

      <CTABand headline="See it on your own data." primary={{ label: "Book a demo", href: "/demo" }} />
    </>
  );
}
