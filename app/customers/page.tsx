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
        title={<>Put a Pearl<br />on your hardest department.</>}
        deck="How teams use Nebbos on the work that matters."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo →</ButtonLink>
      </Hero>

      <section style={{ padding: "56px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <div className="grid grid-2">
            {stories.map((s) => (
              <Link key={s.slug} href={`/customers/${encodeURIComponent(s.slug)}`} className="tile" style={{ display: "block" }}>
                <div className="dep">{s.frontmatter.industry ?? s.frontmatter.company}</div>
                <h3 style={{ marginTop: 8 }}>{s.frontmatter.title}</h3>
                {s.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{s.frontmatter.description}</p> : null}
              </Link>
            ))}
          </div>
          <p className="mono faint" style={{ marginTop: 24, fontSize: 12 }}>Stories shown are illustrative.</p>
        </div>
      </section>

      <CTABand headline="See it on your own data." primary={{ label: "Book a demo →", href: "/demo" }} />
    </>
  );
}
