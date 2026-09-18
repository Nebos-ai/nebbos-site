/**
 * lib/nav.ts · Nebbos site v2 · Information architecture
 *
 * Rebuild 2026-08-23 per founder directive: "our menu items should be these 15
 * pages with the five groups on the home page with the 3 in each and then add
 * the standard pages that every enterprise level site has."
 *
 * Structure:
 *   PRIMARY NAV  = 5 top-level items
 *     Product ⌄ (mega-menu · 5 columns · one per band · 3 layers each = 15 links)
 *     Solutions ⌄ (industry verticals)
 *     Customers
 *     Pricing
 *     Docs
 *
 *   SECONDARY NAV = Log in, Book a demo (right-aligned)
 *
 *   FOOTER NAV = full sitemap in 6 columns (Product · Solutions · Company · Resources · Trust · Legal)
 *
 * The product tree is DERIVED from lib/architecture.ts (BANDS + LAYERS) so the
 * nav can never drift from the architecture doctrine.
 */

import { BANDS, LAYERS, type Band, type Layer } from "@/lib/architecture";
import { PRODUCTS, TIERS, type ProductKey, type TierKey } from "@/content/products";

/* ── URL slug maps ────────────────────────────────────────────────────── */

const BAND_SLUGS: Record<number, string> = {
  1: "substrate",
  2: "boundary",
  3: "intelligence",
  4: "action",
  5: "commerce",
};

/**
 * Layer name → URL slug. Kept explicit (not auto-derived from name) so that
 * renames in `LAYERS.name` don't silently break URLs. Every layer number MUST
 * have an entry here; enforced at module load below.
 */
const LAYER_SLUGS: Record<number, string> = {
  1: "data",
  2: "identity",
  3: "departments",
  4: "ingest",
  5: "api-mcp",
  6: "integrations",
  7: "memory",
  8: "reasoning",
  9: "detectors",
  10: "pearl",
  11: "approval",
  12: "orchestrator",
  13: "onboarding",
  14: "billing",
  15: "attestation",
};

// Fail loud at module load if a layer is missing a slug (rebuild-time check).
for (const layer of LAYERS) {
  if (!LAYER_SLUGS[layer.n]) {
    throw new Error(
      `lib/nav.ts · missing LAYER_SLUGS entry for layer ${layer.n} (${layer.name})`
    );
  }
}

export function bandSlug(band: Band | number): string {
  const n = typeof band === "number" ? band : band.n;
  const slug = BAND_SLUGS[n];
  if (!slug) throw new Error(`lib/nav.ts · missing BAND_SLUGS entry for band ${n}`);
  return slug;
}

export function layerSlug(layer: Layer | number): string {
  const n = typeof layer === "number" ? layer : layer.n;
  const slug = LAYER_SLUGS[n];
  if (!slug) throw new Error(`lib/nav.ts · missing LAYER_SLUGS entry for layer ${n}`);
  return slug;
}

/**
 * Retired 2026-09-16 (real fix — PR #75 lost these edits in a staging
 * mistake): the /product/{band}/{layer} route family was deleted (files
 * gone via #75, redirects still catch external inbound). These path
 * helpers now return the live /products index so any residual consumer
 * (HomeStory, productTree below) never emits a link into the retired
 * URL space. bandSlug/layerSlug are still exported for tests + docs.
 */
export function bandPath(_band: Band | number): string {
  return `/products`;
}

export function layerPath(_layer: Layer): string {
  return `/products`;
}

/* ── Derived structures ───────────────────────────────────────────────── */

export type NavLink = {
  label: string;
  href: string;
  strap?: string;
  external?: boolean;
};

export type ProductBandGroup = {
  band: Band;
  href: string;
  layers: Array<{ layer: Layer; href: string }>;
};

/**
 * The 5-band product tree — feeds the primary-nav mega-menu, the home-page
 * band-overview section, and the footer product column.
 *
 * Architectural order (bottom-up: substrate → commerce) — used on /product
 * detail pages and in the doctrine.
 */
export const productTree: ProductBandGroup[] = BANDS.map((band) => ({
  band,
  href: bandPath(band),
  layers: LAYERS.filter((l) => l.band === band.n).map((layer) => ({
    layer,
    href: layerPath(layer),
  })),
}));

/**
 * Marketing order — most-important differentiator first (per founder
 * 2026-08-23: "maybe we need to reorganize these from most important down").
 *
 *   1. Intelligence — where Memory lives, the "trains on your data" story
 *   2. Action — where Pearl lives, the tangible per-department entity
 *   3. Substrate — the foundation (Data, Identity, Departments)
 *   4. Boundary — how the world connects in
 *   5. Commerce — ownership + billing at the top
 *
 * Used on the home page + /product landing. URLs and doctrine unchanged.
 */
const MARKETING_ORDER = [3, 4, 1, 2, 5];
export const productTreeByImportance: ProductBandGroup[] = MARKETING_ORDER
  .map((n) => productTree.find((pt) => pt.band.n === n)!)
  .filter(Boolean);

/* ── Mega-menu (2026-09-14 IA: 4 products × 3 tiers) ──────────────────── */

/**
 * The 4-product × 3-tier customer taxonomy — feeds the primary-nav
 * mega-menu, the home-page product overview (once HomeBands rebuilds),
 * and the footer Product column.
 *
 * Derived from `content/products.ts` (PRODUCTS + TIERS) — the source of
 * truth for the customer taxonomy per feedback_nebbos_ai_product_framing_
 * platform_tools_mcp_usb_security_2026_09_14 + reference_nebbos_customer_
 * product_matrix_4_products_3_tiers_12_skus_2026_09_14.
 *
 * Product order = declaration order in PRODUCTS (platform → app → mcp →
 * usb), matching the ratified taxonomy: software (2) → tooling (1) →
 * hardware (1).
 *
 * Tier links point to the product page with a hash fragment (tiers do not
 * yet have dedicated URLs — L1/L2/L3 are documented on the product page).
 */
export type MegaProduct = {
  key: ProductKey;
  name: string;
  eyebrow: string;
  tagline: string;
  href: string;
  tiers: Array<{
    key: TierKey;
    label: string;
    href: string;
  }>;
};

export const megaProducts: MegaProduct[] = PRODUCTS.map((product) => ({
  key: product.key,
  name: product.name,
  eyebrow: product.eyebrow,
  tagline: product.tagline,
  href: `/products/${product.slug}`,
  tiers: TIERS.map((tier) => ({
    key: tier.key,
    label: tier.label,
    href: `/products/${product.slug}#${tier.key.toLowerCase()}`,
  })),
}));

/* ── Primary nav ──────────────────────────────────────────────────────── */

export type PrimaryNavItem = {
  label: string;
  href: string;
  megaMenu?: "products";
  strap?: string;
};

/**
 * Migration 2026-09-18: primaryNav shape moved to §3 of
 * docs/marketing/site-wide-route-revision-plan-2026-09-17.md.
 * Customers + Docs demoted to footer (Company / Resources columns —
 * already present there). Security + Sovereignty + Contact promoted
 * from footer-only to primary. Trust stays. Products + Solutions
 * unchanged.
 *
 * Rationale: institutional-trust surfaces (Security · Sovereignty ·
 * Trust) are the buying-decision pages for the CISO / procurement
 * persona. Primary nav should route them there in one click, not
 * force a Trust → sub-item chase. Customers stays in the footer as
 * an in-production placeholder until named case studies exist.
 */
export const primaryNav: PrimaryNavItem[] = [
  { label: "Products",    href: "/products",    megaMenu: "products", strap: "The platform. The app. The MCP. The Cradle." },
  { label: "Solutions",   href: "/solutions",   strap: "Coordination is where the work lives." },
  { label: "Security",    href: "/security",    strap: "Engineered to institutional controls." },
  { label: "Sovereignty", href: "/sovereignty", strap: "Your data. Your model. Your keys." },
  { label: "Trust",       href: "/trust",       strap: "Accountable by architecture." },
  { label: "Pricing",     href: "/pricing",     strap: "Enterprise. On a call." },
  { label: "Contact",     href: "/contact",     strap: "Direct routing to every inbox." },
];

/* ── Solutions nav (industry verticals · appears in mega-menu + footer) ── */

export const solutionsNav: NavLink[] = [
  { label: "Operations",         href: "/solutions/operations",         strap: "Coverage · schedules · handoffs" },
  { label: "Finance",            href: "/solutions/finance",            strap: "Close · forecast · variance" },
  { label: "People",             href: "/solutions/people",             strap: "Hiring · onboarding · retention" },
  { label: "K-12 Education",     href: "/solutions/k12",                strap: "District ops · classroom insight" },
  { label: "Healthcare",         href: "/solutions/healthcare",         strap: "Care coordination · compliance" },
  { label: "Financial Services", href: "/solutions/financial-services", strap: "Trading ops · risk · audit" },
  { label: "Manufacturing",      href: "/solutions/manufacturing",      strap: "Production · quality · supply" },
  { label: "Public Sector",      href: "/solutions/public-sector",      strap: "Case management · accountability" },
  { label: "Model Training",     href: "/solutions/model-training",     strap: "Train the model on your operational judgment" },
];

/* ── Secondary (right-aligned in header) ──────────────────────────────── */

export const secondaryNav: NavLink[] = [
  { label: "Log in",       href: "https://app.nebbos.ai", external: true },
  { label: "Book a demo",  href: "/demo" },
];

/* ── Footer nav ────────────────────────────────────────────────────────── */

export type FooterColumn = {
  label: string;
  links: NavLink[];
};

export const footerNav: FooterColumn[] = [
  {
    label: "Products",
    links: [
      { label: "Overview", href: "/products" },
      ...PRODUCTS.map((product) => ({
        label: product.name.replace("Nebbos.ai ", "").replace("Nebbos ", ""),
        href: `/products/${product.slug}`,
      })),
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    label: "Solutions",
    links: solutionsNav,
  },
  {
    label: "Company",
    links: [
      { label: "About",      href: "/about" },
      { label: "Customers",  href: "/customers" },
      { label: "Careers",    href: "/careers" },
      { label: "Press",      href: "/press" },
      { label: "Contact",    href: "/contact" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Docs",       href: "/docs" },
      { label: "Blog",       href: "/blog" },
      { label: "Changelog",  href: "/changelog" },
      { label: "Status",     href: "/status" },
    ],
  },
  {
    label: "Trust",
    links: [
      { label: "Trust center", href: "/trust" },
      { label: "Security",     href: "/security" },
      { label: "Sovereignty",  href: "/sovereignty" },
      { label: "Compliance",   href: "/compliance" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy",                 href: "/legal/privacy" },
      { label: "Terms",                   href: "/legal/terms" },
      { label: "DPA",                     href: "/legal/dpa" },
      { label: "Subprocessors",           href: "/legal/subprocessors" },
      { label: "Cookies",                 href: "/legal/cookies" },
      { label: "Acceptable use",          href: "/legal/acceptable-use" },
      { label: "Responsible disclosure",  href: "/legal/responsible-disclosure" },
    ],
  },
];
