// Canonical information architecture — rebuild-2026 v4.
//
// 8 flat destinations (no dropdowns). Palantir / Linear / Anthropic pattern.
// Delta brief editorial system consumed uniformly.

export type NavLink = { label: string; href: string; external?: boolean; strap?: string };
export type NavGroup = { label: string; links: NavLink[] };

export const primaryNav: NavLink[] = [
  { label: "Platform",  href: "/platform",  strap: "Five questions. In order." },
  { label: "How",       href: "/platform/how-it-works", strap: "Live in days, not quarters." },
  { label: "Pricing",   href: "/pricing",   strap: "One flat per-user price." },
  { label: "Solutions", href: "/solutions", strap: "Coordination is where the work lives." },
  { label: "Trust",     href: "/trust",     strap: "Accountable by architecture." },
  { label: "About",     href: "/about",     strap: "The tool for building your company's brain." },
  { label: "Blog",      href: "/blog",      strap: "Notes from Nebbos." },
  { label: "Contact",   href: "/contact",   strap: "Put a Pearl on your hardest department." },
];

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
