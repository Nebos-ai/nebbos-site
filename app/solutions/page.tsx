import type { Metadata } from "next";
import Link from "next/link";

/**
 * PAGE · /solutions · v2 · 2026-09-18 · marketing-register rebuild
 *
 * Migrates from PAGES.solutions (single-hero stub with "Vertical cards
 * rendered inline" comment) to a native dark-register directory: 9
 * industry verticals as a card grid. Each card carries eyebrow + Pearl
 * name + tagline + "Open" link, colored per row for scanability.
 *
 * The 9 vertical detail pages (/solutions/operations, /finance, ...)
 * still route via [...slug] and inherit the .mkt-mode wrapper for
 * color-only migration; per-vertical native rebuilds are Wave 3.
 */

export const metadata: Metadata = {
  title: "Solutions · A Pearl for every domain",
  description:
    "Nine industry Pearls. Nebbos Operations, Finance, People, Education, Care, FS, Manufacturing, Civic, Training Substrate. Pick the domain closest to yours.",
};

const VERTICALS = [
  { slug: "operations",          eyebrow: "Function",  name: "Nebbos Operations",         tagline: "Handoffs, coverage, incident triage." },
  { slug: "finance",             eyebrow: "Function",  name: "Nebbos Finance",            tagline: "Close, forecast, variance." },
  { slug: "people",              eyebrow: "Function",  name: "Nebbos People",             tagline: "Hiring, onboarding, retention." },
  { slug: "k12",                 eyebrow: "Industry",  name: "Nebbos Education",          tagline: "The Pearl for district operations." },
  { slug: "healthcare",          eyebrow: "Industry",  name: "Nebbos Care",               tagline: "Care coordination, compliance." },
  { slug: "financial-services",  eyebrow: "Industry",  name: "Nebbos FS",                 tagline: "Trading ops, risk, audit." },
  { slug: "manufacturing",       eyebrow: "Industry",  name: "Nebbos Manufacturing",      tagline: "Production, quality, supply." },
  { slug: "public-sector",       eyebrow: "Industry",  name: "Nebbos Civic",              tagline: "Case management, accountability." },
  { slug: "model-training",      eyebrow: "Substrate", name: "Nebbos Training Substrate", tagline: "Your operation is the training data." },
];

export default function SolutionsPage() {
  return (
    <>
      {/* HERO */}
      <section className="mkt mkt-section mkt-hero" aria-labelledby="solutions-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Solutions</p>
            <h1 id="solutions-h" className="mkt-display">
              A Pearl for every domain.
            </h1>
            <p className="mkt-deck">
              Every industry has departments that would run better with a
              brain. Nebbos ships a Pearl for each — three functions, five
              industries, one training substrate. Pick the one closest to
              yours.
            </p>
            <div className="mkt-hero__ctas">
              <Link href="/demo" className="mkt-cta mkt-cta--primary">
                Book a demo
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href="#verticals" className="mkt-cta mkt-cta--ghost">
                See the Pearls
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICALS DIRECTORY */}
      <section className="mkt mkt-section" aria-labelledby="verticals">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The nine Pearls</p>
            <h2 id="verticals" className="mkt-h2">
              Three functions. Five industries. One training substrate.
            </h2>
            <p className="mkt-deck">
              Function Pearls (Operations, Finance, People) work across every
              industry. Industry Pearls (Education, Care, FS, Manufacturing,
              Civic) come pre-tuned to that vertical&rsquo;s ops shape. The
              Training Substrate captures every decision your team makes as
              a preference pair.
            </p>
          </header>

          <div className="mkt-products__grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {VERTICALS.map((v, i) => {
              const variantClass = i % 4 === 0 ? "mkt-product--platform"
                : i % 4 === 1 ? "mkt-product--app"
                : i % 4 === 2 ? "mkt-product--mcp"
                : "mkt-product--cradle";
              return (
                <Link key={v.slug} href={`/solutions/${v.slug}`} className={`mkt-product ${variantClass}`}>
                  <span className="mkt-product__mark" aria-hidden />
                  <div className="mkt-product__body">
                    <p className="mkt-product__eyebrow">{v.eyebrow}</p>
                    <h3 className="mkt-product__name">{v.name.replace("Nebbos ", "")}</h3>
                    <p className="mkt-product__tagline">{v.tagline}</p>
                  </div>
                  <span className="mkt-product__link">
                    Open
                    <span className="mkt-product__link-arrow" aria-hidden>→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mkt mkt-section mkt-closing" aria-labelledby="solutions-close">
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">Which one first?</p>
          <h2 id="solutions-close" className="mkt-display">
            Name the department. We map the Pearl.
          </h2>
          <p className="mkt-deck">
            Thirty minutes. Bring one department. We show you which Pearl
            fits, which signals it reads, and what its first shift looks like.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/demo" className="mkt-cta mkt-cta--primary">
              Book a demo
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href="/contact" className="mkt-cta mkt-cta--ghost">
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
