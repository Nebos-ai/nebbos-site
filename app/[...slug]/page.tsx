import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PAGES, type PageSlug } from "@/content/pages";
import { PageRenderer } from "@/components/site/PageRenderer";

/**
 * Catch-all route for every page in content/pages.ts that doesn't have
 * its own dedicated route file (home / about / contact / demo / pricing /
 * product tree already exist as static routes and take precedence).
 *
 * Handles: /solutions, /solutions/operations, /solutions/finance, ...,
 *          /customers, /careers, /blog, /docs, /changelog, /status,
 *          /press, /trust, /security, /compliance,
 *          /legal/privacy, /legal/terms, /legal/dpa, /legal/subprocessors,
 *          /legal/cookies, /legal/acceptable-use, /legal/responsible-disclosure
 *
 * Each renders the section stack from PAGES[slug] via PageRenderer.
 * Adding a new satellite page = adding an entry to content/pages.ts.
 */

type Params = { slug: string[] };

const SLUG_MAP: Record<string, PageSlug> = Object.fromEntries(
  (Object.keys(PAGES) as PageSlug[]).map((k) => [k, k])
);

export function generateStaticParams(): Params[] {
  return (Object.keys(PAGES) as PageSlug[]).flatMap((key) => {
    // Skip pages that have their own static route file (avoid conflict)
    if (["home", "product", "about", "demo", "contact", "blog", "customers"].includes(key)) return [];
    const parts = key.split("/");
    return [{ slug: parts }];
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/") as PageSlug;
  const page = SLUG_MAP[key] ? PAGES[SLUG_MAP[key]] : undefined;
  if (!page) return {};
  return { title: page.title, description: page.metaDescription };
}

export default async function CatchAllPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const key = slug.join("/") as PageSlug;
  const page = SLUG_MAP[key] ? PAGES[SLUG_MAP[key]] : undefined;
  if (!page) notFound();
  return <PageRenderer page={page} />;
}
