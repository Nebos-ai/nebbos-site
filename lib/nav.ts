// Canonical information architecture (ADR-278 AD-6).
// Drives the header nav, footer, and sitemap. Single source of truth.

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; links: NavLink[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "How it works", href: "/platform/how-it-works" },
      { label: "Architecture", href: "/platform/architecture" },
      { label: "Integrations", href: "/platform/integrations" },
      { label: "Pearl", href: "/pearl" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "Overview", href: "/solutions" },
      { label: "K-12 Education", href: "/solutions/k12" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Public Sector", href: "/solutions/public-sector" },
      { label: "Manufacturing", href: "/solutions/manufacturing" },
      { label: "Operations", href: "/solutions/operations" },
      { label: "Finance", href: "/solutions/finance" },
      { label: "People", href: "/solutions/people" },
    ],
  },
  {
    label: "Trust",
    links: [
      { label: "Overview", href: "/trust" },
      { label: "Security", href: "/security" },
      { label: "Governance", href: "/governance" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Resource hub", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Customers", href: "/customers" },
      { label: "Changelog", href: "/changelog" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Footer adds Pricing, Trust legal, and utility links.
export const footerNav: NavGroup[] = [
  {
    label: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Pearl", href: "/pearl" },
      { label: "Integrations", href: "/platform/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "K-12 Education", href: "/solutions/k12" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Financial Services", href: "/solutions/financial-services" },
      { label: "Public Sector", href: "/solutions/public-sector" },
      { label: "Manufacturing", href: "/solutions/manufacturing" },
    ],
  },
  {
    label: "Trust",
    links: [
      { label: "Trust center", href: "/trust" },
      { label: "Security", href: "/security" },
      { label: "Governance", href: "/governance" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customers", href: "/customers" },
      { label: "Changelog", href: "/changelog" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
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
