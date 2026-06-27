import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { APP_URL } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Site header reflecting the canonical IA (AD-6). CSS-driven hover/focus
 * dropdowns keep this a server component (no client JS needed for the menu).
 * "Log in" links external to app.nebbos.ai; "Book a demo" is the primary CTA.
 */
export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brandmark" aria-label="Nebbos home">
          nebbos
        </Link>

        <nav className="nav" aria-label="Primary">
          {primaryNav.map((group) => (
            <div key={group.label} className="nav__item">
              <button className="nav__trigger" aria-haspopup="true">
                {group.label}
              </button>
              <div className="nav__menu" role="menu">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} role="menuitem">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/pricing" className="nav__trigger" style={{ display: "inline-block" }}>
            Pricing
          </Link>
        </nav>

        <div className="header-actions">
          <a href={APP_URL} className="nav__trigger" style={{ color: "var(--mist)" }} rel="noreferrer">
            Log in
          </a>
          <ButtonLink href="/demo" variant="primary">
            Book a demo →
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
