import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { getCollection, getSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCollection("blog").find((e) => e.slug === slug);
  if (!entry) return pageMetadata({ title: "Post", path: `/blog/${slug}` });
  return pageMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCollection("blog").find((e) => e.slug === slug);
  if (!entry) notFound();

  let Post;
  try {
    Post = (await import(`@/content/blog/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <article>
      <Section>
        <Link href="/blog" className="mono text-blue" style={{ fontSize: 13 }}>
          ← All posts
        </Link>
        <p className="eyebrow" style={{ marginTop: 20 }}>
          {entry.frontmatter.date} {entry.frontmatter.author ? `· ${entry.frontmatter.author}` : ""}
        </p>
        <h1 style={{ marginTop: 16, maxWidth: "22ch" }}>{entry.frontmatter.title}</h1>
        <div className="prose" style={{ marginTop: 40 }}>
          <Post />
        </div>
      </Section>
    </article>
  );
}
