import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";

/**
 * MarketingFooter · site/MarketingFooter.tsx · v1 · 2026-09-18
 *
 * Dark-register footer for nebbos.ai. Replaces the v3 SiteFooter (cream
 * paper-2, 6-column Institutional Reserve sitemap) with a Linear-tier
 * 4-column dark footer that composes with marketing-register.css.
 *
 * Column-choice discipline: dropped Solutions from the sitemap footer
 * (it's a v3-substrate route not yet migrated); collapsed the 7-entry
 * Legal column into a bottom-row inline list; kept Products, Company,
 * Resources, Trust as the four sitemap columns.
 */

const COLS = [
  {
    label: "Products",
    links: [
      { label: "Overview", href: "/products" },
      { label: "Platform", href: "/products/platform" },
      { label: "App", href: "/products/app" },
      { label: "MCP", href: "/products/mcp" },
      { label: "Cradle", href: "/products/cradle" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    label: "Trust",
    links: [
      { label: "Trust center", href: "/trust" },
      { label: "Security", href: "/security" },
      { label: "Sovereignty", href: "/sovereignty" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "DPA", href: "/legal/dpa" },
  { label: "Subprocessors", href: "/legal/subprocessors" },
  { label: "Cookies", href: "/legal/cookies" },
];

export function MarketingFooter() {
  return (
    <footer role="contentinfo" className="mkt mkt-footer">
      <div className="mkt-footer__inner">
        <div className="mkt-footer__grid">
          <div className="mkt-footer__brand">
            <Link href="/" aria-label="Nebbos home" className="mkt-footer__brand-link">
              <NebbosMark size={40} />
            </Link>
            <p className="mkt-footer__desc">
              Infrastructure for AI operators. Every action attested. Every
              credential on hardware. Every substrate portable when you leave.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.label} className="mkt-footer__col">
              <p className="mkt-footer__label">{col.label}</p>
              <ul className="mkt-footer__links">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="mkt-footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mkt-footer__bottom">
          <p>© 2026 Nebbos Technologies. All rights reserved.</p>
          <ul className="mkt-footer__links" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="mkt-footer__link">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="mkt-footer__status">
            <span className="mkt-footer__status-dot" aria-hidden />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
