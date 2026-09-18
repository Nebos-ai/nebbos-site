import type { Metadata } from "next";
import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";

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
  title: "Solutions · A working brain for every department",
  description:
    "Nine Pearls — three functions, five industries, one training substrate. Each one is a working brain shaped by the pressure of its domain. Pick the one closest to yours.",
};

const VERTICALS = [
  { slug: "operations",          eyebrow: "Function",  name: "Nebbos Operations",         tagline: "Stays up when the shift can't. Names the fire before it starts." },
  { slug: "finance",             eyebrow: "Function",  name: "Nebbos Finance",            tagline: "Closes on the day you said. Finds the variance before the board asks." },
  { slug: "people",              eyebrow: "Function",  name: "Nebbos People",             tagline: "Reads why people leave two weeks before they say it. Onboards every hire the way your best one was." },
  { slug: "k12",                 eyebrow: "Industry",  name: "Nebbos Education",          tagline: "Runs the district behind the district. Every classroom accounted for by 8:15." },
  { slug: "healthcare",          eyebrow: "Industry",  name: "Nebbos Care",               tagline: "Coordinates the care your chart already ordered. Compliance that doesn't cost a nurse a shift." },
  { slug: "financial-services",  eyebrow: "Industry",  name: "Nebbos FS",                 tagline: "Reads the desk. Names the risk. Signs the audit." },
  { slug: "manufacturing",       eyebrow: "Industry",  name: "Nebbos Manufacturing",      tagline: "Catches the defect before the line stops. Tracks every part from PO to pallet." },
  { slug: "public-sector",       eyebrow: "Industry",  name: "Nebbos Civic",              tagline: "Every case timestamped and answerable. Case management a resident could audit." },
  { slug: "model-training",      eyebrow: "Substrate", name: "Nebbos Training Substrate", tagline: "Every yes and no becomes a preference pair. Six months in, the Pearl talks like your best operator." },
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
              Every department gets its own working brain.
            </h1>
            <p className="mkt-deck">
              A Pearl is the intelligence your ops team never had — it
              watches every handoff, remembers every decision, and shows
              up before the fire does. Nine of them, pre-shaped for a
              domain. Pick the one closest to yours.
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
              Function Pearls (Operations, Finance, People) come with the
              domain-general intelligence — they slot into any industry.
              Industry Pearls (Education, Care, FS, Manufacturing, Civic)
              arrive pre-shaped by the domain — the vocabulary, the
              regulations, the muscle memory. The Training Substrate is
              what makes them yours — every decision your team makes,
              encoded as a preference pair, until the Pearl talks like
              your best operator.
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
                  <span className="mkt-product__mark" aria-hidden>
                    <NebbosMark size={32} />
                  </span>
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
            Thirty minutes. One department. We show you which Pearl fits,
            which signals it reads, what its first shift looks like — and
            where the pressure it&rsquo;s built for lives in your
            operation today.
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
