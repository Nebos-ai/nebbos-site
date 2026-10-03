import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/primitives";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
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

const POST_TINT = ["var(--color-accent)", "var(--color-platform)", "var(--color-mcp)", "var(--color-cradle)"];

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHero
        id="blog-h"
        eyebrow="Notes"
        title="Notes from Nebbos."
        deck={
          <>
            Longer writing on the platform, its tools, its MCP, and
            the security of its Cradle. Written by the operators who
            build and run the substrate.
          </>
        }
      />

      <Section labelledBy="blog-list" className="pt-0 md:pt-0 lg:pt-0">
        <h2 id="blog-list" className="m-0 mb-6 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">
          {posts.length} note{posts.length === 1 ? "" : "s"}
        </h2>
        <Stagger as="ol" className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:gap-5" step={0.08}>
          {posts.map((post, i) => (
            <StaggerItem key={post.slug} as="li" className={cn(i === 0 && "md:col-span-2")}>
              <Link
                href={`/blog/${post.slug}`}
                aria-label={post.title}
                style={{ "--tint": POST_TINT[i % 4], "--spot": POST_TINT[i % 4] } as CSSProperties}
                className="spotlight group relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-bezel bg-ground-2 p-7 ring-1 ring-rule ring-inset transition-[translate,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_var(--tint)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-9"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(110%_80%_at_15%_0%,color-mix(in_srgb,var(--tint)_20%,transparent),transparent_70%)]"
                />
                {i === 0 && <span aria-hidden className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-60" />}
                <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{formatDate(post.date)}</p>
                <h3
                  className={cn(
                    "m-0 mt-auto pt-12 font-display font-medium leading-[1.08] tracking-tight text-ink",
                    i === 0 ? "max-w-[24ch] text-[clamp(2rem,3.6vw,3rem)]" : "text-[clamp(1.5rem,2.2vw,1.9rem)]",
                  )}
                >
                  {post.title}
                </h3>
                <p className="m-0 mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">{post.description}</p>
                <span
                  className="mt-6 inline-flex items-center gap-2 self-start font-code text-[11px] font-medium uppercase tracking-label text-ink transition-colors group-hover:text-tint"
                  aria-hidden
                >
                  Read →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
