import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { NebbosMark } from "@nebbos/brand/logo";
import { PRODUCTS, TIERS, type Product, type Tier, type TierKey } from "@/content/products";
import { PRODUCT_TIER_DETAIL } from "@/content/product-tier-detail";
import { PageHero } from "@/components/marketing/PageHero";
import { ProductEmblem } from "@/components/marketing/ProductEmblem";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { TierMeter } from "@/components/marketing/TierCard";
import { PRODUCT_TINT } from "@/components/marketing/tints";
import { Eyebrow, GhostCta, PrimaryCta, Section, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ScrollBeam } from "@/components/motion/ScrollBeam";
import { cn } from "@/lib/cn";

/**
 * /products/[slug]/[tier] · v2 · 2026-09-23 · Tailwind + Motion redesign
 *
 * v2 is visual only (copy frozen): PageHero + ProductEmblem, capabilities
 * as a numbered rail with a scroll-filled beam, audience as a tinted
 * statement panel, upgrade path as a split bezel card, shared ClosingCta.
 * Every surface takes the product's Pearl colour.
 *
 * v1 · 2026-09-19:
 * Founder-directed: build 12 dedicated tier subpages so every mega-menu
 * link (Platform · Guest, MCP · Host, Cradle · Architect, ...) opens
 * a distinct page with distinct hero + narrative. Prior state — all
 * tier links opened the same product-detail page at the top with
 * identical scroll position (fixed intermediately by anchor scroll +
 * :target highlight; this route is the durable substrate).
 *
 * Route: /products/{platform,app,mcp,cradle}/{guest,host,architect}
 * Content: content/product-tier-detail.ts (12 entries keyed by
 * `${productKey}-${tierKey}`).
 */

// Buyer-facing tier slug → engineering TierKey
const TIER_SLUG_TO_KEY: Record<string, TierKey> = {
  guest: "L1",
  host: "L2",
  architect: "L3",
};
const TIER_KEY_TO_SLUG: Record<TierKey, string> = {
  L1: "guest",
  L2: "host",
  L3: "architect",
};

function shortName(product: Product): string {
  return product.name.replace("Nebbos.ai ", "").replace("Nebbos ", "");
}

function humanTierName(tier: Tier): string {
  return tier.label.includes("·") ? tier.label.split("·")[1]!.trim() : tier.key;
}

type Params = { slug: string; tier: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.flatMap((product) =>
    TIERS.map((tier) => ({
      slug: product.slug,
      tier: TIER_KEY_TO_SLUG[tier.key],
    })),
  );
}

function resolve(params: { slug: string; tier: string }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  const tierKey = TIER_SLUG_TO_KEY[params.tier];
  if (!product || !tierKey) return null;
  const tier = TIERS.find((t) => t.key === tierKey)!;
  const detail = PRODUCT_TIER_DETAIL[`${product.key}-${tier.key}`];
  if (!detail) return null;
  return { product, tier, detail };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = resolve(await params);
  if (!resolved) return {};
  const { product, tier, detail } = resolved;
  const name = shortName(product);
  const tierName = humanTierName(tier);
  return {
    title: `${name} · ${tierName} — ${detail.tagline}`,
    description: detail.heroDeck,
  };
}

export default async function ProductTierPage({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params);
  if (!resolved) notFound();
  const { product, tier, detail } = resolved;
  const name = shortName(product);
  const tierName = humanTierName(tier);
  const nextTierSlug = detail.upgradePath
    ? TIER_KEY_TO_SLUG[TIERS[TIERS.findIndex((t) => t.key === tier.key) + 1]!.key]
    : null;

  const tint = PRODUCT_TINT[product.key];
  const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");
  const markTile = (
    <span
      className="grid size-14 place-items-center rounded-[1.1rem] bg-[var(--tint)] text-white shadow-[0_14px_36px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]"
      aria-hidden
    >
      <NebbosMark size={32} />
    </span>
  );

  return (
    <div style={{ "--tint": tint, "--spot": tint } as CSSProperties}>
      {/* 1. HERO */}
      <PageHero
        id="tier-hero"
        tint={tint}
        lead={markTile}
        eyebrow={
          <>
            {product.eyebrow} · {tier.label}
          </>
        }
        title={`${name} · ${tierName}`}
        deck={detail.tagline}
        deck2={detail.heroDeck}
        ctas={
          <>
            <PrimaryCta href="/contact">Contact sales</PrimaryCta>
            <GhostCta href={`/products/${product.slug}`}>Back to {name}</GhostCta>
          </>
        }
        visual={<ProductEmblem tint={tint} />}
      />

      {/* 2. WHAT YOU GET AT THIS TIER */}
      <Section labelledBy="tier-caps">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal as="header" className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow>What you get at {tierName}</Eyebrow>
            <h2 id="tier-caps" className={h2}>
              <RevealWords>{`${name} · ${tierName}, capability by capability.`}</RevealWords>
            </h2>
            <TierMeter tier={tier.key} tint={tint} />
          </Reveal>
          <div className="relative lg:col-span-7">
            <ScrollBeam className="left-[27px]" />
            <Stagger as="ol" className="relative m-0 grid list-none gap-4 p-0" step={0.08}>
              {detail.capabilities.map((c, i) => (
                <StaggerItem key={c.title} as="li" className="relative grid grid-cols-[56px_1fr] gap-5">
                  <span
                    className="relative z-10 grid size-14 place-items-center rounded-[1.1rem] bg-ground-3 font-code text-[15px] font-medium tabular-nums text-tint ring-1 ring-[color-mix(in_srgb,var(--tint)_40%,transparent)] ring-inset shadow-[0_0_0_6px_var(--color-ground)]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="spotlight relative rounded-[1.4rem] bg-ground-2 p-6 ring-1 ring-rule ring-inset">
                    <div className="relative font-display text-xl font-medium tracking-tight text-ink">{c.title}</div>
                    <p className="relative m-0 mt-2 text-[15px] leading-relaxed text-ink-2">{c.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* 3. WHO THIS TIER IS FOR */}
      <Section labelledBy="tier-audience">
        <Reveal className="bezel">
          <div className="bezel-core relative overflow-hidden p-8 md:p-14">
            <span aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-60" />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[var(--tint)] opacity-20 blur-[110px]"
            />
            <header className="relative flex max-w-4xl flex-col items-start gap-6">
              <Eyebrow>Who runs at {tierName}</Eyebrow>
              <h2 id="tier-audience" className={h2}>
                <RevealWords>The operator this tier is for.</RevealWords>
              </h2>
              <p className="m-0 max-w-[48ch] text-pretty font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-ink-2">
                {detail.audience}
              </p>
            </header>
          </div>
        </Reveal>
      </Section>

      {/* 4. UPGRADE PATH (only if not on the top tier) */}
      {detail.upgradePath && nextTierSlug && (
        <Section labelledBy="tier-upgrade" className="pt-0 md:pt-0 lg:pt-0">
          <Reveal className="bezel" amount={0.3}>
            <div
              id="tier-upgrade"
              className="bezel-core grid gap-8 overflow-hidden p-8 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-12 md:p-12"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-[var(--tint)] opacity-20 blur-[100px]"
              />
              <aside className="relative flex flex-col items-start gap-4">
                <span
                  className="grid size-12 place-items-center rounded-[0.9rem] bg-[var(--tint)] text-white shadow-[0_12px_30px_-8px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]"
                  aria-hidden
                >
                  <NebbosMark size={26} />
                </span>
                <Eyebrow>Path up</Eyebrow>
                <h3 className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-medium tracking-tight text-ink">
                  Upgrading to {detail.upgradePath.unlockedTier}
                </h3>
              </aside>
              <div className="relative text-[16px] leading-relaxed text-ink-2">
                <p className="m-0 max-w-[58ch]">
                  When you outgrow {tierName}, upgrading to <strong className="font-medium text-ink">{detail.upgradePath.unlockedTier}</strong> unlocks {detail.upgradePath.unlockedCapability}
                </p>
                <p className="m-0 mt-6">
                  <GhostCta href={`/products/${product.slug}/${nextTierSlug}`} arrow>
                    See {name} · {humanTierName(TIERS[TIERS.findIndex((t) => t.key === tier.key) + 1]!)}
                  </GhostCta>
                </p>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* 5. CLOSING CTA */}
      <ClosingCta
        id="tier-close"
        lead={markTile}
        eyebrow="Ready"
        title={`See ${name} · ${tierName} on your workflow.`}
        deck={
          <>
            Thirty minutes. Bring one department. We map the tier ceremony to your operators + show you the shape running.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: "/contact", label: "Contact sales" }}
      />
    </div>
  );
}
