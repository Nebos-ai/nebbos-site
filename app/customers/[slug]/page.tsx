import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { getCollection, getSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getSlugs("customers").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCollection("customers").find((e) => e.slug === slug);
  if (!entry) return pageMetadata({ title: "Customer", path: `/customers/${slug}` });
  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `/customers/${slug}`,
  });
}

export default async function CustomerStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCollection("customers").find((e) => e.slug === slug);
  if (!entry) notFound();

  let Story;
  try {
    Story = (await import(`@/content/customers/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <article>
      <Section>
        <Link href="/customers" className="mono text-blue" style={{ fontSize: 13 }}>
          ← All customers
        </Link>
        <p className="eyebrow" style={{ marginTop: 20 }}>
          {entry.frontmatter.company} · {entry.frontmatter.industry}
        </p>
        <h1 style={{ marginTop: 16, maxWidth: "22ch" }}>{entry.frontmatter.title}</h1>
        <div className="prose" style={{ marginTop: 40 }}>
          <Story />
        </div>
      </Section>
    </article>
  );
}
