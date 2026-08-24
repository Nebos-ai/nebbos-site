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
        date: (data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date ?? "")),
        author: (data.author as string) ?? "Nebbos",
        html: marked.parse(content, { async: false }) as string,
      };
    } catch {
      continue;
    }
  }
  return null;
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
      <main style={{ maxWidth: "68ch", margin: "0 auto", padding: "6rem 2rem 8rem" }}>
        <Link
          href="/blog"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8a8a8f",
            textDecoration: "none",
            marginBottom: "2rem",
            display: "inline-block",
          }}
        >
          ← Notes
        </Link>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#8a8a8f",
            marginBottom: "0.75rem",
          }}
        >
          {post.date} · {post.author}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.25rem, 3.5vw, 3.25rem)",
            lineHeight: 1.1,
            fontWeight: 500,
            marginBottom: "1.5rem",
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: 1.55,
            color: "#4a4a52",
            marginBottom: "3.5rem",
            fontStyle: "italic",
          }}
        >
          {post.description}
        </p>
        <article
          className="blog-prose"
          style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "#1D1C22" }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr style={{ margin: "4rem 0 2rem", border: 0, borderTop: "1px solid #e6e6ea" }} />
        <p style={{ fontSize: "0.95rem", color: "#4a4a52" }}>
          Written by <strong>{post.author}</strong>.{" "}
          <Link href="/blog" style={{ color: "#F6A03F" }}>
            More notes
          </Link>{" "}
          · <Link href="/product" style={{ color: "#F6A03F" }}>see the architecture</Link>{" "}
          · <Link href="/demo" style={{ color: "#F6A03F" }}>book a demo</Link>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
