// Canonical information architecture — rebuild-2026.
//
// Drives the header nav (8 flat destinations, no dropdowns), the footer,
// and the sitemap. Single source of truth.
//
// The audit rated the existing 5-dropdown IA as noise on a marketing site
// intended to sell to a founder / operator persona who wants to skim, not
// wander a menu. Flat 8-destination nav follows Palantir / Anthropic /
// Linear pattern — every link is a bet the reader is likely to want.

export type NavLink = { label: string; href: string; external?: boolean; strap?: string };
export type NavGroup = { label: string; links: NavLink[] };

/**
 * The 8 destinations. Straps are the target-voice one-line summary a
 * mega-menu / preview panel can render, and are also used by the sitemap
 * generator for internal descriptions.
 */
export const primaryNav: NavLink[] = [
  { label: "Platform",  href: "/platform",  strap: "One graph. Five questions. One source of operational truth." },
  { label: "How",       href: "/platform/how-it-works", strap: "Live in days, not quarters." },
  { label: "Pricing",   href: "/pricing",   strap: "One flat per-user price." },
  { label: "Solutions", href: "/solutions", strap: "Coordination is where the work lives. Start with yours." },
  { label: "Trust",     href: "/trust",     strap: "Accountable by architecture." },
  { label: "About",     href: "/about",     strap: "From a village in Vojvodina." },
  { label: "Blog",      href: "/blog",      strap: "Notes from Nebbos." },
  { label: "Contact",   href: "/contact",   strap: "Put a Pearl on your hardest department." },
];

// Footer keeps the fuller taxonomy — long-tail links live here so the header
// doesn't have to carry them. Every route in the app should appear in one
// footer group OR be intentionally excluded (e.g. hidden internal routes).
export const footerNav: NavGroup[] = [
  {
    label: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "How it works", href: "/platform/how-it-works" },
      { label: "Architecture", href: "/platform/architecture" },
      { label: "Integrations", href: "/platform/integrations" },
      { label: "Pearl", href: "/pearl" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "Operations", href: "/solutions/operations" },
      { label: "Finance", href: "/solutions/finance" },
      { label: "People", href: "/solutions/people" },
      { label: "K-12 Education", href: "/solutions/k12" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Manufacturing", href: "/solutions/manufacturing" },
      { label: "Public Sector", href: "/solutions/public-sector" },
    ],
  },
  {
    label: "Trust",
    links: [
      { label: "Trust center", href: "/trust" },
      { label: "Security", href: "/security" },
      { label: "Tideline", href: "/governance" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customers", href: "/customers" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Subprocessors", href: "/legal/subprocessors" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
      { label: "Responsible disclosure", href: "/legal/responsible-disclosure" },
    ],
  },
];
