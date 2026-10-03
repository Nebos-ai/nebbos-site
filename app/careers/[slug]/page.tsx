import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { PearlMosaic } from "@/components/marketing/PearlMosaic";
import { GhostCta, PrimaryCta, Section } from "@/components/marketing/primitives";
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
  const meta = role.team || role.location;

  return (
    <>
      <PageHero
        id="role-h"
        lead={
          <Link
            href="/careers"
            className="inline-flex items-center rounded-pill px-3 py-1.5 font-code text-[11px] font-medium uppercase tracking-label text-ink-2 ring-1 ring-rule ring-inset transition-colors hover:bg-white/[0.05] hover:text-ink"
          >
            ← Careers
          </Link>
        }
        eyebrow={
          meta ? (
            <>
              {role.team}
              {role.team && role.location ? " · " : ""}
              {role.location}
            </>
          ) : undefined
        }
        title={role.title}
        deck={role.description || undefined}
        visual={<PearlMosaic />}
      />

      <Section labelledBy="role-h" className="pt-0 md:pt-0 lg:pt-0">
        <div className="mx-auto max-w-[760px]">
          <article className="mkt-prose" dangerouslySetInnerHTML={{ __html: role.html }} />
          <footer className="mt-16 flex flex-wrap items-center gap-3 border-t border-rule pt-10">
            <PrimaryCta href={`mailto:careers@nebbos.ai?subject=${subject}`} arrow={false}>
              Apply: careers@nebbos.ai
            </PrimaryCta>{" "}
            <span className="text-ink-3" aria-hidden>·</span>{" "}
            <GhostCta href="/careers">Other roles</GhostCta>{" "}
            <span className="text-ink-3" aria-hidden>·</span>{" "}
            <GhostCta href="/about">About Nebbos</GhostCta>
          </footer>
        </div>
      </Section>
    </>
  );
}
