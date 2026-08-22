import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
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
        title={<>Build software<br />that sharpens judgment.</>}
        deck="Not software that replaces it."
      >
        <ButtonLink href="/contact" variant="primary">Talk to us →</ButtonLink>
      </Hero>

      <FeatureRow
        eyebrow="Open roles"
        title="Roles"
        body={
          <div style={{ display: "grid", gap: 16 }}>
            {roles.map((r) => (
              <Link key={r.slug} href={`/careers/${encodeURIComponent(r.slug)}`} className="tile" style={{ display: "block" }}>
                <div className="dep">{r.frontmatter.team} · {r.frontmatter.location}</div>
                <h3 style={{ marginTop: 8 }}>{r.frontmatter.title}</h3>
                {r.frontmatter.description ? <p className="mist" style={{ marginTop: 8 }}>{r.frontmatter.description}</p> : null}
              </Link>
            ))}
          </div>
        }
      />

      <CTABand
        headline="Want to build this? Say hello."
        primary={{ label: "Talk to us →", href: "/contact" }}
      />
    </>
  );
}
