import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Params = { slug: string };

async function readCustomer(slug: string) {
  const dir = path.join(process.cwd(), "content", "customers");
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const name of candidates) {
    try {
      const raw = await fs.readFile(path.join(dir, name), "utf8");
      const { data, content } = matter(raw);
      return {
        title: (data.title as string) ?? slug,
        company: (data.company as string) ?? "",
        industry: (data.industry as string) ?? "",
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

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateStaticParams(): Promise<Params[]> {
  const dir = path.join(process.cwd(), "content", "customers");
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
  const item = await readCustomer(slug);
  if (!item) return { title: "Not found" };
  return {
    title: `${item.title} · Nebbos`,
    description: item.description,
  };
}

export default async function CustomerCaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = await readCustomer(slug);
  if (!item) notFound();

  const metaParts = [item.industry, item.company, formatDate(item.date)].filter(Boolean);

  return (
    <div className="container-narrow editorial-post">
      <Link href="/customers" className="editorial-post__backlink">
        ← Customers
      </Link>
      <p className="editorial-post__meta">{metaParts.join(" · ")}</p>
      <h1 className="editorial-post__title">{item.title}</h1>
      <p className="editorial-post__lede">{item.description}</p>
      <article className="blog-prose" dangerouslySetInnerHTML={{ __html: item.html }} />
      <footer className="editorial-post__footer">
        <p>
          <Link href="/customers">More case studies</Link> ·{" "}
          <Link href="/solutions">See the solutions</Link> ·{" "}
          <Link href="/demo">Book a demo</Link>
        </p>
      </footer>
    </div>
  );
}
