import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { PRODUCTS, TIERS, type Product } from "@/content/products";
import { PageHero } from "@/components/marketing/PageHero";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { TierCard } from "@/components/marketing/TierCard";
import { PRODUCT_TINT } from "@/components/marketing/tints";
import { Eyebrow, GhostCta, PrimaryCta, Section, deck, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * PAGE · /products · v3 · 2026-09-23 · Tailwind + Motion redesign
 *
 * v3 is visual only (copy frozen): shared PageHero, tier composition as a
 * rising staircase (each tier strictly composes the one below), product
 * matrix as tinted bezel panels, shared ClosingCta.
 *
 * v2 · 2026-09-18 · marketing-register rebuild:
 * Migrated from the v3 substrate primitives (PageHero paper /
 * PageSection / Eyebrow / Button) to the dark Linear-tier marketing
 * register (components/patterns/marketing-register.css). Every string
 * kept verbatim; only the register + shape changed.
 *
 * Shape:
 *   1. Hero  — dark; eyebrow · display · deck · CTAs
 *   2. Tiers — 3-tier composition explainer
 *   3. Rows  — one per product: colored mark + name + description on
 *              left; 3 tier cards on right
 *   4. CTA   — closing "Book a briefing" bookend
 */

export const metadata: Metadata = {
  title: "Products · Four lines. Twelve SKUs.",
  description:
    "The Nebbos platform, the app, the MCP, and the Cradle. Four products, three tiers each — twelve SKUs total. Every operator picks along (product, tier).",
};

function shortName(product: Product): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

// Staircase: L1 sits lowest, L3 highest, on desktop.
const STEP = ["lg:mt-20", "lg:mt-10", "lg:mt-0"];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        id="products-h"
        eyebrow="Products"
        title="Four products. Twelve SKUs."
        deck={
          <>
            The platform runs the Pearls. The app runs local. The MCP
            carries the tools. The Cradle carries the credentials. Three
            tiers per product. Twelve SKUs. Enterprise only.
          </>
        }
        ctas={
          <>
            <PrimaryCta href="/demo">Book a demo</PrimaryCta>
            <GhostCta href="#matrix">See the matrix</GhostCta>
          </>
        }
      />

      {/* TIER COMPOSITION */}
      <Section labelledBy="tiers-h">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Tier composition</Eyebrow>
          <h2 id="tiers-h" className={cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]")}>
            <RevealWords>Three tiers. Each strictly composes the one below.</RevealWords>
          </h2>
          <p className={deck}>
            L1 adds device biometric. L2 adds the Cradle in the port.
            L3 adds an enclave-signed approval token. Higher tiers never
            relax lower-tier factors.
          </p>
        </Reveal>
        <Stagger className="mt-16 grid items-start gap-4 md:grid-cols-3 lg:gap-5" step={0.12}>
          {TIERS.map((tier, i) => (
            <StaggerItem key={tier.key} className={STEP[i]}>
              <TierCard tier={tier.key} label={tier.label.split(" · ").slice(1).join(" · ") || tier.key}>
                <p className="m-0 text-ink-2">{tier.factors}</p>
                <p className="m-0">{tier.scope}</p>
              </TierCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* PRODUCT MATRIX */}
      <Section labelledBy="matrix">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>The matrix</Eyebrow>
          <h2 id="matrix" className={cn(headline, "scroll-mt-32 text-[clamp(2.25rem,4.8vw,4rem)]")}>
            <RevealWords>Pick along (product, tier).</RevealWords>
          </h2>
          <p className={deck}>
            Every SKU carries a product color and a tier finish. A
            Cradle-L2 device ships in the Cradle color body with the
            L2 accent. No published pricing. Contact sales.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5">
          {PRODUCTS.map((product) => {
            const tint = PRODUCT_TINT[product.key];
            const name = shortName(product);
            return (
              <Reveal key={product.key} amount={0.15}>
                <article
                  className="bezel"
                  aria-labelledby={`prod-${product.key}-h`}
                  style={{ "--tint": tint } as CSSProperties}
                >
                  <div className="bezel-core grid gap-6 overflow-hidden p-6 md:p-8 lg:grid-cols-[5fr_7fr] lg:gap-8">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[var(--tint)] opacity-20 blur-[90px]"
                    />
                    <div className="relative flex flex-col items-start gap-4">
                      <span
                        className="grid size-12 place-items-center rounded-[0.9rem] bg-[var(--tint)] text-white shadow-[0_12px_30px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]"
                        aria-hidden
                      >
                        <NebbosMark size={26} />
                      </span>
                      <p className="m-0 mt-2 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">
                        {product.eyebrow}
                      </p>
                      <h3
                        id={`prod-${product.key}-h`}
                        className="m-0 font-display text-[clamp(1.75rem,2.6vw,2.4rem)] font-medium tracking-tight text-ink"
                      >
                        {name}
                      </h3>
                      <p className="m-0 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">{product.description}</p>
                      <GhostCta href={`/products/${product.slug}`} arrow className="mt-2">
                        Open {name}
                      </GhostCta>
                    </div>

                    <div className="relative grid gap-3 sm:grid-cols-3">
                      {TIERS.map((tier) => (
                        <TierCard
                          key={`${product.key}-${tier.key}`}
                          tier={tier.key}
                          tint={tint}
                          className="bg-ground-3/70 p-5"
                          label={
                            <>
                              {name} · {tier.key}
                            </>
                          }
                          footer={
                            <GhostCta href="/contact" size="sm">
                              Contact sales
                            </GhostCta>
                          }
                        >
                          <p className="m-0 text-[13px]">{tier.scope}</p>
                        </TierCard>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <ClosingCta
        id="products-close"
        eyebrow="Book a briefing"
        title="One SKU. One department. One shift."
        deck={
          <>
            Name the department you would put a Pearl on first. We map it
            to a SKU and a tier. You watch one shift run on the Cradle.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: "/contact", label: "Contact sales" }}
      />
    </>
  );
}
