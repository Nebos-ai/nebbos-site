import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { GhostCta, PrimaryCta, Section } from "@/components/marketing/primitives";
import type { Metadata } from "next";

/**
 * /blog/[slug] · v3 · 2026-09-18 · mkt-native rebuild
 *
 * v2 shape: container-narrow editorial-post + blog-prose (cream paper
 * serif). v3 shape: mkt-hero + mkt-article + .mkt-prose for the reader
 * body typography. Content pipeline (gray-matter + marked over
 * content/blog/*.mdx) is unchanged.
 */

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
      <PageHero
        id="post-h"
        lead={
          <Link
            href="/blog"
            className="inline-flex items-center rounded-pill px-3 py-1.5 font-code text-[11px] font-medium uppercase tracking-label text-ink-2 ring-1 ring-rule ring-inset transition-colors hover:bg-white/[0.05] hover:text-ink"
          >
            ← Notes
          </Link>
        }
        eyebrow={
          <>
            {formatDate(post.date)} · {post.author}
          </>
        }
        title={post.title}
        deck={post.description || undefined}
      />

      <Section labelledBy="post-body" className="pt-0 md:pt-0 lg:pt-0">
        <h2 id="post-body" className="sr-only">Article body</h2>
        <div className="mx-auto max-w-[760px]">
          <article className="mkt-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          <footer className="mt-16 flex flex-wrap items-center gap-3 border-t border-rule pt-10">
            <GhostCta href="/blog">More notes</GhostCta>
            <GhostCta href="/products">See the products</GhostCta>
            <PrimaryCta href="/demo">Book a demo</PrimaryCta>
          </footer>
        </div>
      </Section>
    </>
  );
}
