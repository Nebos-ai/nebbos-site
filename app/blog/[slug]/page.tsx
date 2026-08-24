import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import type { Metadata } from "next";

type Params = { slug: string };

async function readPost(slug: string) {
  const dir = path.join(process.cwd(), "content", "blog");
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const name of candidates) {
    try {
      const raw = await fs.readFile(path.join(dir, name), "utf8");
      const { data, content } = matter(raw);
      return {
        title: (data.title as string) ?? slug,
        description: (data.description as string) ?? "",
        date:
          data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : String(data.date ?? ""),
        author: (data.author as string) ?? "Nebbos",
        html: marked.parse(content, { async: false }) as string,
      };
    } catch {
      continue;
    }
  }
  return null;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateStaticParams(): Promise<Params[]> {
  const dir = path.join(process.cwd(), "content", "blog");
  const files = await fs.readdir(dir);
  return files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await readPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} · Nebbos`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await readPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteHeader />
      <main className="container-narrow editorial-post">
        <Link href="/blog" className="editorial-post__backlink">
          ← Notes
        </Link>
        <p className="editorial-post__meta">
          {formatDate(post.date)} · {post.author}
        </p>
        <h1 className="editorial-post__title">{post.title}</h1>
        <p className="editorial-post__lede">{post.description}</p>
        <article className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer className="editorial-post__footer">
          <p>
            <Link href="/blog">More notes</Link> ·{" "}
            <Link href="/product">See the architecture</Link> ·{" "}
            <Link href="/demo">Book a demo</Link>
          </p>
        </footer>
      </main>
      <SiteFooter />
    </>
  );
}
