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

/* ── URL slug maps ────────────────────────────────────────────────────── */

const BAND_SLUGS: Record<number, string> = {
  1: "substrate",
  2: "boundary",
  3: "intelligence",
  4: "agent",
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
  13: "tenant-lifecycle",
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
  return BAND_SLUGS[n];
}

export function layerSlug(layer: Layer | number): string {
  const n = typeof layer === "number" ? layer : layer.n;
  return LAYER_SLUGS[n];
}

export function bandPath(band: Band | number): string {
  return `/product/${bandSlug(band)}`;
}

export function layerPath(layer: Layer): string {
  return `/product/${bandSlug(layer.band)}/${layerSlug(layer)}`;
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
 */
export const productTree: ProductBandGroup[] = BANDS.map((band) => ({
  band,
  href: bandPath(band),
  layers: LAYERS.filter((l) => l.band === band.n).map((layer) => ({
    layer,
    href: layerPath(layer),
  })),
}));

/* ── Primary nav ──────────────────────────────────────────────────────── */

export type PrimaryNavItem = {
  label: string;
  href: string;
  megaMenu?: "product";
  strap?: string;
};

export const primaryNav: PrimaryNavItem[] = [
  { label: "Product",   href: "/product",   megaMenu: "product", strap: "Fifteen layers. Five bands. One system." },
  { label: "Solutions", href: "/solutions", strap: "Coordination is where the work lives." },
  { label: "Customers", href: "/customers", strap: "Who's building on it." },
  { label: "Pricing",   href: "/pricing",   strap: "Per user. Per department." },
  { label: "Docs",      href: "/docs",      strap: "How to build on it." },
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
    label: "Product",
    links: [
      { label: "Overview", href: "/product" },
      ...productTree.map(({ band }) => ({
        label: band.name,
        href: bandPath(band),
      })),
      { label: "Pricing", href: "/pricing" },
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
