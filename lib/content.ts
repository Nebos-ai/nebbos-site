import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Lightweight MDX content loader (AD-5). Reads frontmatter + body from
// content/<collection>/*.mdx. Body rendering uses next-mdx-remote-free parsing
// is avoided to keep deps lean — instead each [slug] route imports the compiled
// MDX module directly (see those routes). This helper powers index listings.

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type Frontmatter = {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  // customers
  company?: string;
  industry?: string;
  // careers
  team?: string;
  location?: string;
};

export type ContentEntry = {
  slug: string;
  frontmatter: Frontmatter;
};

export function getCollection(collection: string): ContentEntry[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      // gray-matter parses unquoted YAML dates into JS Date objects; normalise
      // to an ISO date string so they're safe to render as React children.
      if (data.date instanceof Date) {
        data.date = data.date.toISOString().slice(0, 10);
      }
      return { slug, frontmatter: data as Frontmatter };
    })
    .sort((a, b) => (b.frontmatter.date ?? "").localeCompare(a.frontmatter.date ?? ""));
}

export function getSlugs(collection: string): string[] {
  return getCollection(collection).map((e) => e.slug);
}
