import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers · Nebbos",
  description:
    "The enterprises running Nebbos on their hardest departments. Case studies by industry, deployment, and outcome.",
};

type CustomerMeta = {
  slug: string;
  title: string;
  company: string;
  industry: string;
  description: string;
  date: string;
};

async function getAllCustomers(): Promise<CustomerMeta[]> {
  const dir = path.join(process.cwd(), "content", "customers");
  const files = await fs.readdir(dir);
  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.mdx?$/, ""),
          title: (data.title as string) ?? file,
          company: (data.company as string) ?? "",
          industry: (data.industry as string) ?? "",
          description: (data.description as string) ?? "",
          date:
            data.date instanceof Date
              ? data.date.toISOString().slice(0, 10)
              : String(data.date ?? ""),
        } satisfies CustomerMeta;
      })
  );
  return items.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function CustomersIndexPage() {
  const customers = await getAllCustomers();
  return (
    <>
      <SiteHeader />
      <main>
        <FullBleedScene
          className="hero-fullbleed"
          scene={{ imageFamily: "concept-tenant-onboarding", imageFamilyVariant: 1 }}
          scrim="bottom"
          vignetteStrength={0.5}
          chapter="I"
          chapterLabel="00 · Customers"
          priority
        >
          <div className="container hero-fullbleed__inner">
            <div className="hero-fullbleed__frame">
              <h1 className="hero-fullbleed__title">The company brain, in production.</h1>
              <p className="hero-fullbleed__deck">
                Enterprises running Nebbos on their hardest departments &mdash;
                finance, operations, people, care, manufacturing, financial
                services, civic case management. Read how they deployed and
                what they measured.
              </p>
            </div>
          </div>
        </FullBleedScene>

        <section className="section section--paper">
          <div className="container-narrow">
            <p className="editorial-page__eyebrow">01 · Case studies</p>
            <h2 className="editorial-page__title">Deployments, by industry.</h2>
            <p className="editorial-page__deck">
              Each case study describes a specific department, a specific
              deployment window, and the outcome the enterprise measured.
            </p>
            <ol className="editorial-list" style={{ marginBlockStart: "var(--space-16)" }}>
              {customers.map((c) => (
                <li key={c.slug} className="editorial-list__item">
                  <Link href={`/customers/${c.slug}`} aria-label={c.title}>
                    <article>
                      <p className="editorial-list__date">
                        {c.industry}
                        {c.company ? ` · ${c.company}` : ""}
                        {c.date ? ` · ${formatDate(c.date)}` : ""}
                      </p>
                      <h3 className="editorial-list__title">{c.title}</h3>
                      <p className="editorial-list__desc">{c.description}</p>
                    </article>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <FullBleedScene
          className="cta-fullbleed"
          scene={{ imageFamily: "concept-tenant-onboarding", imageFamilyVariant: 2 }}
          scrim="left"
          vignetteStrength={0.5}
          chapter="VII"
          chapterLabel="Ready"
        >
          <div className="container cta-fullbleed__inner">
            <div className="cta-fullbleed__frame">
              <h2 className="cta-fullbleed__title">See a Pearl on your hardest department.</h2>
              <p className="cta-fullbleed__deck">
                A live tenant walkthrough with the Pearl scoped to a
                department you care about. Thirty minutes.
              </p>
              <div className="cta-fullbleed__actions">
                <Button href="/demo" variant="solid-light" size="lg">
                  Book a demo
                </Button>
                <Button href="mailto:enterprise@nebbos.ai" variant="ghost-light" size="lg" arrow={false}>
                  Email enterprise
                </Button>
              </div>
            </div>
          </div>
        </FullBleedScene>
      </main>
      <SiteFooter />
    </>
  );
}
