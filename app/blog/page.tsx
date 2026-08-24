import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes from Nebbos",
  description: "Longer writing on architecture, governance, and the company brain.",
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
          date: (data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : String(data.date ?? "")),
          author: (data.author as string) ?? "Nebbos",
        } satisfies PostMeta;
      })
  );
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: "68ch", margin: "0 auto", padding: "6rem 2rem 8rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8a8a8f",
            marginBottom: "0.75rem",
          }}
        >
          00 · Notes
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
            lineHeight: 1.05,
            fontWeight: 500,
            marginBottom: "1rem",
          }}
        >
          Notes from Nebbos.
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.55,
            color: "#4a4a52",
            marginBottom: "4rem",
          }}
        >
          Longer writing on architecture, governance, and what an operating
          system for the AI-native enterprise actually looks like.
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "3rem",
          }}
        >
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#8a8a8f",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {post.date}
                  </p>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.75rem",
                      lineHeight: 1.2,
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                      fontVariant: "small-caps",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p style={{ fontSize: "1rem", lineHeight: 1.55, color: "#4a4a52" }}>
                    {post.description}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
