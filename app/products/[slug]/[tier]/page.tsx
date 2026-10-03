import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NebbosMark } from "@nebbos/brand/logo";
import { PRODUCTS, TIERS, type Product, type Tier, type TierKey } from "@/content/products";
import { PRODUCT_TIER_DETAIL } from "@/content/product-tier-detail";

/**
 * /products/[slug]/[tier] · v1 · 2026-09-19
 *
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

const PRODUCT_CLASS: Record<Product["key"], string> = {
  platform: "mkt-product--platform",
  app: "mkt-product--app",
  mcp: "mkt-product--mcp",
  usb: "mkt-product--cradle",
};

const PRODUCT_TILE_CLASS: Record<Product["key"], string> = {
  platform: "mkt-tile__mark--platform",
  app: "mkt-tile__mark--app",
  mcp: "mkt-tile__mark--mcp",
  usb: "mkt-tile__mark--cradle",
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

  return (
    <>
      {/* 1. HERO */}
      <section className={`mkt mkt-section mkt-hero ${PRODUCT_CLASS[product.key]}`} aria-labelledby="tier-hero">
        <div className="mkt-section__inner mkt-hero__row">
          <div className="mkt-hero__copy">
            <span className={`mkt-tile__mark ${PRODUCT_TILE_CLASS[product.key]}`} aria-hidden style={{ marginBottom: 24 }}>
              <NebbosMark />
            </span>
            <p className="mkt-eyebrow">
              {product.eyebrow} · {tier.label}
            </p>
            <h1 id="tier-hero" className="mkt-display">
              {name} · {tierName}
            </h1>
            <p className="mkt-deck">{detail.tagline}</p>
            <p className="mkt-deck" style={{ marginTop: 12 }}>{detail.heroDeck}</p>
            <div className="mkt-hero__ctas">
              <Link href="/contact" className="mkt-cta mkt-cta--primary">
                Contact sales
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </Link>
              <Link href={`/products/${product.slug}`} className="mkt-cta mkt-cta--ghost">
                Back to {name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT YOU GET AT THIS TIER */}
      <section className="mkt mkt-section" aria-labelledby="tier-caps">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">What you get at {tierName}</p>
            <h2 id="tier-caps" className="mkt-h2">
              {name} · {tierName}, capability by capability.
            </h2>
          </header>
          <ol className="mkt-numcards">
            {detail.capabilities.map((c, i) => {
              const pearlKey = product.key === "usb" ? "cradle" : product.key;
              return (
                <li key={c.title} className={`mkt-numcard mkt-numcard--${pearlKey}`}>
                  <span className={`mkt-numcard__index mkt-numcard__index--${pearlKey}`} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mkt-numcard__body">
                    <div className="mkt-numcard__title">{c.title}</div>
                    <p className="mkt-numcard__desc">{c.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 3. WHO THIS TIER IS FOR */}
      <section className="mkt mkt-section" aria-labelledby="tier-audience">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">Who runs at {tierName}</p>
            <h2 id="tier-audience" className="mkt-h2">
              The operator this tier is for.
            </h2>
            <p className="mkt-deck">{detail.audience}</p>
          </header>
        </div>
      </section>

      {/* 4. UPGRADE PATH (only if not on the top tier) */}
      {detail.upgradePath && nextTierSlug && (
        <section className="mkt mkt-section" aria-labelledby="tier-upgrade">
          <div className="mkt-section__inner">
            <div className={`mkt-case mkt-case--${product.key === "usb" ? "cradle" : product.key}`}>
              <aside className="mkt-case__aside">
                <span className={`mkt-case__mark ${PRODUCT_TILE_CLASS[product.key].replace("mkt-tile__mark--", "mkt-case__mark--")}`} aria-hidden>
                  <NebbosMark />
                </span>
                <p className="mkt-eyebrow">Path up</p>
                <h3 className="mkt-case__subject">
                  Upgrading to {detail.upgradePath.unlockedTier}
                </h3>
              </aside>
              <div className="mkt-case__body">
                <p>
                  When you outgrow {tierName}, upgrading to <strong>{detail.upgradePath.unlockedTier}</strong> unlocks {detail.upgradePath.unlockedCapability}
                </p>
                <p style={{ marginTop: 16 }}>
                  <Link href={`/products/${product.slug}/${nextTierSlug}`} className="mkt-cta mkt-cta--ghost" style={{ display: "inline-flex" }}>
                    See {name} · {humanTierName(TIERS[TIERS.findIndex((t) => t.key === tier.key) + 1]!)}
                    <span className="mkt-cta__arrow" aria-hidden>→</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. CLOSING CTA */}
      <section
        className={`mkt mkt-section mkt-closing`}
        aria-labelledby="tier-close"
      >
        <div className="mkt-closing__inner">
          <span aria-hidden className={`mkt-tile__mark ${PRODUCT_TILE_CLASS[product.key]}`} style={{ marginBottom: 24 }}>
            <NebbosMark />
          </span>
          <p className="mkt-eyebrow">Ready</p>
          <h2 id="tier-close" className="mkt-display">
            See {name} · {tierName} on your workflow.
          </h2>
          <p className="mkt-deck">
            Thirty minutes. Bring one department. We map the tier ceremony to your operators + show you the shape running.
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
