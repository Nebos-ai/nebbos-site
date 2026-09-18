import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes from Nebbos",
  description:
    "Longer writing on the platform, its tools, its MCP, the security of its Cradle, and how operators run their Pearls under the whole system.",
};

/**
 * /blog · v3 · 2026-09-18 · mkt-native rebuild
 *
 * v2 shape: container-narrow editorial-page + editorial-list (cream
 * paper serif register). v3 shape: mkt-hero + a hairline-separated
 * mkt-postlist to match the home / products / catchall visual language.
 * Content pipeline (gray-matter over content/blog/*.mdx) is unchanged.
 */

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
      <section className="mkt mkt-section mkt-hero" aria-labelledby="blog-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Notes</p>
            <h1 id="blog-h" className="mkt-display">
              Notes from Nebbos.
            </h1>
            <p className="mkt-deck">
              Longer writing on the platform, its tools, its MCP, and
              the security of its Cradle. Written by the operators who
              build and run the substrate.
            </p>
          </div>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="blog-list">
        <div className="mkt-section__inner">
          <h2 id="blog-list" className="mkt-eyebrow" style={{ marginBottom: 16 }}>
            {posts.length} note{posts.length === 1 ? "" : "s"}
          </h2>
          <ol className="mkt-postlist">
            {posts.map((post) => (
              <li key={post.slug} className="mkt-postlist__item">
                <Link href={`/blog/${post.slug}`} className="mkt-postlist__link" aria-label={post.title}>
                  <p className="mkt-postlist__date">{formatDate(post.date)}</p>
                  <h3 className="mkt-postlist__title">{post.title}</h3>
                  <p className="mkt-postlist__desc">{post.description}</p>
                  <span className="mkt-postlist__cta" aria-hidden>Read →</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
