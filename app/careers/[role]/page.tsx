import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { getCollection, getSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getSlugs("careers").map((role) => ({ role }));
}

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const entry = getCollection("careers").find((e) => e.slug === role);
  if (!entry) return pageMetadata({ title: "Role", path: `/careers/${role}` });
  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `/careers/${role}`,
  });
}

export default async function RolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const entry = getCollection("careers").find((e) => e.slug === role);
  if (!entry) notFound();

  let Role;
  try {
    Role = (await import(`@/content/careers/${role}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <article>
      <Section>
        <Link href="/careers" className="mono text-blue" style={{ fontSize: 13 }}>
          ← All roles
        </Link>
        <p className="eyebrow" style={{ marginTop: 20 }}>
          {entry.frontmatter.team} · {entry.frontmatter.location}
        </p>
        <h1 style={{ marginTop: 16, maxWidth: "22ch" }}>{entry.frontmatter.title}</h1>
        <div className="prose" style={{ marginTop: 40 }}>
          <Role />
        </div>
        <div style={{ marginTop: 40 }}>
          <ButtonLink href="/contact" variant="primary">Apply →</ButtonLink>
        </div>
      </Section>
    </article>
  );
}
