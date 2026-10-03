import Link from "next/link";
import { NebbosMark } from "@nebbos/brand/logo";

/**
 * MarketingFooter · site/MarketingFooter.tsx · v2 · 2026-09-23
 *
 * Dark-register footer for nebbos.ai. Same four sitemap columns
 * (Products, Company, Resources, Trust) and the inline legal row.
 *
 * v2: a gradient hairline opens the footer, the brand block sits in its
 * own glass tile, and an oversized flower-of-life mark bleeds off the
 * bottom edge as a watermark.
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
      { label: "Pricing", href: "/pricing" },
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
  { label: "License", href: "/legal/terms" },
  { label: "Cookies", href: "/legal/cookies" },
];

/** Same row treatment as the header's Products menu (source of truth):
 *  full-width row, chip radius, soft fill on hover, no ring. */
const link =
  "-mx-2 flex rounded-chip px-2 py-1.5 text-[14px] text-ink-2 transition-colors duration-300 hover:bg-white/[0.05] hover:text-ink focus-visible:bg-white/[0.05] focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function MarketingFooter() {
  return (
    <footer role="contentinfo" className="mkt relative isolate overflow-hidden px-4 pb-10 pt-4 sm:px-6">
      <div className="rule-fade mx-auto max-w-[1240px]" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[480px] left-1/2 -z-10 -translate-x-1/2 text-ink opacity-[0.03]"
      >
        <NebbosMark size={760} />
      </div>

      <div className="mx-auto max-w-[1240px] pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="flex max-w-sm flex-col gap-6 rounded-bezel bg-white/[0.025] p-6 ring-1 ring-rule ring-inset">
              <Link
                href="/"
                aria-label="Nebbos home"
                className="grid size-12 place-items-center rounded-[0.9rem] bg-ground-3 text-ink ring-1 ring-rule-2 ring-inset transition-transform duration-700 ease-fluid hover:scale-110 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <NebbosMark size={32} />
              </Link>
              <p className="m-0 text-[14px] leading-relaxed text-ink-3">
                Infrastructure for AI operators. Every action attested. Every
                credential on hardware. Every substrate portable when you leave.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 md:col-span-8 md:gap-8">
            {COLS.map((col) => (
              <div key={col.label}>
                <p className="m-0 font-code text-[11px] font-medium uppercase tracking-label text-ink-3">{col.label}</p>
                <ul className="m-0 mt-4 grid list-none gap-1 p-0">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={link}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-rule pt-8 md:flex-row md:items-center md:justify-between">
          <p className="m-0 font-code text-[11px] tracking-[0.08em] text-ink-3">© 2026 Nebbos Technologies. All rights reserved.</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="m-0 inline-flex items-center gap-2 self-start rounded-pill bg-emerald-400/[0.08] px-3 py-1.5 font-code text-[11px] tracking-[0.08em] text-emerald-300 ring-1 ring-emerald-400/20 ring-inset md:self-auto">
            <span className="live-pulse size-1.5 rounded-full bg-emerald-400" aria-hidden />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
