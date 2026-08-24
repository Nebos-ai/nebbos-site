import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes from Nebbos",
  description:
    "Longer writing on architecture, governance, and what an operating system for the AI-native enterprise actually looks like.",
};

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

async function getAllPosts(): Promise<PostMeta[]> {
  const dir = path.join(process.cwd(), "content", "blog");
  const files = await fs.readdir(dir);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.mdx?$/, ""),
          title: (data.title as string) ?? file,
          description: (data.description as string) ?? "",
          date:
            data.date instanceof Date
              ? data.date.toISOString().slice(0, 10)
              : String(data.date ?? ""),
          author: (data.author as string) ?? "Nebbos",
        } satisfies PostMeta;
      })
  );
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <>
      <SiteHeader />
      <main className="container-narrow editorial-page">
        <header className="editorial-page__lede">
          <p className="editorial-page__eyebrow">Notes · from Nebbos</p>
          <h1 className="editorial-page__title">Notes from Nebbos.</h1>
          <p className="editorial-page__deck">
            Longer writing on architecture, governance, and what an operating
            system for the AI-native enterprise actually looks like.
          </p>
        </header>
        <ol className="editorial-list">
          {posts.map((post) => (
            <li key={post.slug} className="editorial-list__item">
              <Link href={`/blog/${post.slug}`} aria-label={post.title}>
                <article>
                  <p className="editorial-list__date">{formatDate(post.date)}</p>
                  <h2 className="editorial-list__title">{post.title}</h2>
                  <p className="editorial-list__desc">{post.description}</p>
                </article>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
