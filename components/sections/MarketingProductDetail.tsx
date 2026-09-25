import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { PRODUCTS, TIERS, type Product } from "@/content/products";
import { PRODUCT_DETAILS } from "@/content/product-detail";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductEmblem } from "@/components/marketing/ProductEmblem";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { TierCard } from "@/components/marketing/TierCard";
import { PearlCard } from "@/components/marketing/PearlCard";
import { PRODUCT_TINT } from "@/components/marketing/tints";
import { Eyebrow, GhostCta, PrimaryCta, Section, deck, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * MarketingProductDetail · sections/MarketingProductDetail.tsx · v2 · 2026-09-23
 *
 * Shared template for the four product-slug pages (/products/platform ·
 * /app · /mcp · /cradle). Consumes PRODUCTS + PRODUCT_DETAILS, keyed by
 * ProductKey. v2 is visual only (copy frozen); every section takes the
 * product's Pearl colour as its tint.
 *
 * Sections (each a different layout family):
 *   1. Hero — PageHero + ProductEmblem (luminous core, orbit rings)
 *   2. Highlights — 5-cell bento (3 + 3 / 2 + 2 + 2), value as display type
 *   3. Deep-dive — sticky heading left, capability cards stacking right
 *   4. Built for — full-width audience rows with a tinted hover wash
 *   5. Values — asymmetric trio (one tall card + two stacked)
 *   6. Tier composition — the rising L1 → L3 staircase, cards link to tiers
 *   7. Other products — tinted spotlight cards
 *   8. Closing CTA — shared ClosingCta
 */

function shortName(product: Product): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");
const HIGHLIGHT_SPAN = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2"];
const STEP = ["lg:mt-20", "lg:mt-10", "lg:mt-0"];

export function MarketingProductDetail({ product }: { product: Product }) {
  const detail = PRODUCT_DETAILS[product.key];
  const others = PRODUCTS.filter((p) => p.key !== product.key);
  const name = shortName(product);
  const tint = PRODUCT_TINT[product.key];
  const k = product.key;

  return (
    <div style={{ "--tint": tint, "--spot": tint } as CSSProperties}>
      {/* 1. HERO */}
      <PageHero
        id={`prod-${k}-h`}
        tint={tint}
        lead={
          <span
            className="grid size-14 place-items-center rounded-[1.1rem] bg-[var(--tint)] text-white shadow-[0_14px_36px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]"
            aria-hidden
          >
            <NebbosMark size={32} />
          </span>
        }
        eyebrow={
          <>
            {product.eyebrow} · Chapter {detail.chapter}
          </>
        }
        title={name}
        deck={detail.heroDeck}
        ctas={
          <>
            <PrimaryCta href="/demo">Book a demo</PrimaryCta>
            <GhostCta href="/contact">Contact sales</GhostCta>
          </>
        }
        visual={<ProductEmblem tint={tint} />}
      />

      {/* 2. HIGHLIGHTS */}
      <Section labelledBy={`hl-${k}-h`}>
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>At a glance</Eyebrow>
          <h2 id={`hl-${k}-h`} className={h2}>
            <RevealWords>The specs.</RevealWords>
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 lg:gap-5" step={0.08}>
          {detail.highlights.map((h, i) => (
            <StaggerItem
              key={h.label}
              className={cn(
                "spotlight relative flex min-h-[220px] flex-col overflow-hidden rounded-bezel bg-ground-2 p-7 ring-1 ring-rule ring-inset",
                HIGHLIGHT_SPAN[i],
              )}
            >
              {i < 2 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,color-mix(in_srgb,var(--tint)_22%,transparent),transparent_65%)]"
                />
              )}
              {i < 2 && <span aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-50" />}
              <p className="relative m-0 font-code text-[11px] font-medium uppercase tracking-label text-tint">
                {h.label}
              </p>
              <p
                className={cn(
                  "relative m-0 mt-auto pt-10 font-display font-medium leading-[1.02] tracking-[-0.03em] text-ink",
                  i < 2 ? "text-[clamp(2rem,3.6vw,3.25rem)]" : "text-[clamp(1.6rem,2.4vw,2.1rem)]",
                )}
              >
                {h.value}
              </p>
              <p className="relative m-0 mt-3 max-w-[44ch] text-[14px] leading-relaxed text-ink-3">{h.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 3. DEEP-DIVE */}
      <Section labelledBy={`deep-${k}-h`}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal as="header" className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow>Under the hood</Eyebrow>
            <h2 id={`deep-${k}-h`} className={h2}>
              <RevealWords>{detail.deepTitle}</RevealWords>
            </h2>
          </Reveal>
          <Stagger className="grid gap-4 lg:col-span-7" step={0.1}>
            {detail.deep.map((item) => (
              <StaggerItem key={item.heading} as="article" className="bezel">
                <div className="bezel-core flex gap-5 p-6 md:p-7">
                  <span
                    aria-hidden
                    className="mt-1.5 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-[var(--tint)] to-transparent"
                  />
                  <div>
                    <h3 className="m-0 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                      {item.heading}
                    </h3>
                    <p className="m-0 mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{item.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* 4. BUILT FOR */}
      <Section labelledBy={`bf-${k}-h`}>
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Built for</Eyebrow>
          <h2 id={`bf-${k}-h`} className={h2}>
            <RevealWords>{`Who runs on ${name}.`}</RevealWords>
          </h2>
        </Reveal>
        <Stagger className="mt-14 border-t border-rule" step={0.08}>
          {detail.builtFor.map((row) => (
            <StaggerItem
              key={row.audience}
              className="group relative grid gap-2 border-b border-rule px-2 py-8 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--tint)_6%,transparent)] md:grid-cols-[1fr_1.3fr] md:items-baseline md:gap-10 md:px-4"
            >
              <p className="m-0 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-tight text-ink">
                {row.audience}
              </p>
              <p className="m-0 text-[16px] leading-relaxed text-ink-2">{row.scope}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 5. VALUES */}
      <Section labelledBy={`val-${k}-h`}>
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>The bet</Eyebrow>
          <h2 id={`val-${k}-h`} className={h2}>
            <RevealWords>{`Why ${name} is shaped this way.`}</RevealWords>
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:gap-5" step={0.1}>
          {detail.valueCards.map((v, i) => (
            <StaggerItem
              key={v.factor}
              as="article"
              className={cn(
                "spotlight relative flex flex-col overflow-hidden rounded-bezel bg-ground-2 p-7 ring-1 ring-rule ring-inset md:p-8",
                i === 0 && "lg:row-span-2 lg:min-h-[420px]",
              )}
            >
              {i === 0 && (
                <>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_100%,color-mix(in_srgb,var(--tint)_26%,transparent),transparent_70%)]"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 -right-16 text-[var(--tint)] opacity-[0.12]"
                  >
                    <NebbosMark size={300} />
                  </span>
                </>
              )}
              <p className="relative m-0 font-code text-[11px] font-medium uppercase tracking-label text-tint">
                {v.factor}
              </p>
              <h3
                className={cn(
                  "relative m-0 mt-4 font-display font-medium leading-[1.08] tracking-tight text-ink",
                  i === 0 ? "text-[clamp(1.9rem,3.2vw,2.75rem)]" : "text-2xl",
                )}
              >
                {v.headline}
              </h3>
              <p className={cn("relative m-0 mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-2", i === 0 && "lg:mt-auto lg:pt-10")}>
                {v.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 6. TIER COMPOSITION */}
      <Section labelledBy={`tier-${k}-h`}>
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Three tiers</Eyebrow>
          <h2 id={`tier-${k}-h`} className={h2}>
            <RevealWords>{`${name}, at L1, L2, and L3.`}</RevealWords>
          </h2>
          <p className={deck}>
            Every product ships in three tiers. Each tier adds a stricter
            factor to the ceremony. Contact sales for pricing.
          </p>
        </Reveal>
        <Stagger className="mt-16 grid items-start gap-4 md:grid-cols-3 lg:gap-5" step={0.12}>
          {TIERS.map((tier, i) => {
            // Extract the human-readable tier name (Guest/Host/Architect)
            // from the "L1 · Guest" label — the buyer sees the word, the
            // engineering L# stays as a small chip.
            const humanName = tier.label.includes("·") ? tier.label.split("·")[1]!.trim() : tier.key;
            const tierSlug = humanName.toLowerCase();
            return (
              <StaggerItem key={tier.key} className={STEP[i]}>
                <TierCard
                  id={`tier-${k}-${tier.key.toLowerCase()}`}
                  href={`/products/${product.slug}/${tierSlug}`}
                  tier={tier.key}
                  tint={tint}
                  label={
                    <>
                      {name} · {humanName}
                    </>
                  }
                  footer={
                    <span
                      className="inline-flex items-center gap-2 font-code text-[11px] font-medium uppercase tracking-label text-ink transition-colors group-hover:text-tint"
                      aria-hidden
                    >
                      See {humanName} tier <span>→</span>
                    </span>
                  }
                >
                  <p className="m-0 text-ink-2">{tier.factors}</p>
                  <p className="m-0">{tier.scope}</p>
                </TierCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* 7. OTHER PRODUCTS */}
      <Section labelledBy={`others-${k}-h`}>
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>Also in the portfolio</Eyebrow>
          <h2 id={`others-${k}-h`} className={h2}>
            <RevealWords>The other three products.</RevealWords>
          </h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5" step={0.1}>
          {others.map((p) => (
            <StaggerItem key={p.key}>
              <PearlCard
                href={`/products/${p.slug}`}
                tint={PRODUCT_TINT[p.key]}
                eyebrow={p.eyebrow}
                name={shortName(p)}
                tagline={p.tagline}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* 8. CLOSING CTA */}
      <ClosingCta
        id={`close-${k}-h`}
        eyebrow="Book a briefing"
        title={`See ${name} on your hardest department.`}
        deck={
          <>
            Thirty minutes. We map one department. We name the Pearls that
            would live inside it. You see {name} running.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: "/products", label: "Back to the four products" }}
      />
    </div>
  );
}
