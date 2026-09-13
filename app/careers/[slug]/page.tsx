import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

/**
 * /careers/[slug] — MDX-backed role detail page (Wave 5 · 2026-09-13)
 *
 * Mirrors the /blog/[slug] pattern: reads content/careers/*.mdx via
 * gray-matter + marked, renders the frontmatter (title, team, location)
 * + the body. Roles list in /careers now links here instead of mailto.
 */

type Params = { slug: string };

async function readRole(slug: string) {
  const dir = path.join(process.cwd(), "content", "careers");
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const name of candidates) {
    try {
      const raw = await fs.readFile(path.join(dir, name), "utf8");
      const { data, content } = matter(raw);
      return {
        title: (data.title as string) ?? slug,
        team: (data.team as string) ?? "",
        location: (data.location as string) ?? "",
        description: (data.description as string) ?? "",
        date:
          data.date instanceof Date
            ? data.date.toISOString().slice(0, 10)
            : String(data.date ?? ""),
        html: marked.parse(content, { async: false }) as string,
      };
    } catch {
      continue;
    }
  }
  return null;
}

export async function generateStaticParams(): Promise<Params[]> {
  const dir = path.join(process.cwd(), "content", "careers");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => ({ slug: f.replace(/\.mdx?$/, "") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await readRole(slug);
  if (!role) return { title: "Not found" };
  return {
    title: `${role.title} · Careers · Nebbos`,
    description: role.description,
  };
}

export default async function CareerRolePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const role = await readRole(slug);
  if (!role) notFound();

  const subject = encodeURIComponent(`Role: ${role.title}`);

  return (
    <div className="container-narrow editorial-post">
      <Link href="/careers" className="editorial-post__backlink">
        ← Careers
      </Link>
      <p className="editorial-post__meta">
        {role.team}
        {role.team && role.location ? " · " : ""}
        {role.location}
      </p>
      <h1 className="editorial-post__title">{role.title}</h1>
      <p className="editorial-post__lede">{role.description}</p>
      <article className="blog-prose" dangerouslySetInnerHTML={{ __html: role.html }} />
      <footer className="editorial-post__footer">
        <p>
          <Link href={`mailto:careers@nebbos.ai?subject=${subject}`}>
            Apply: careers@nebbos.ai
          </Link>{" "}
          ·{" "}
          <Link href="/careers">Other roles</Link>{" "}
          ·{" "}
          <Link href="/about">About Nebbos</Link>
        </p>
      </footer>
    </div>
  );
}
