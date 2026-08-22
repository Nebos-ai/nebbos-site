import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { APP_URL } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { NbLogo } from "@/components/ui/NbLogo";

/**
 * Site header — rebuild-2026 v4 · Delta brief editorial system.
 *
 * Ratified nb-logo wordmark inline via <NbLogo>. Sticky, hairline-bordered
 * on paper. Flat 8-destination nav. Server component. Zero client JS.
 */
export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brandmark" aria-label="Nebbos home">
          <NbLogo size="md" title="Nebbos" />
        </Link>

        <nav className="nav" aria-label="Primary">
          {primaryNav.map((link) => (
            <Link key={link.href} href={link.href} className="nav__trigger">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={APP_URL}
            className="nav__trigger"
            style={{ color: "var(--muted)" }}
            rel="noreferrer"
          >
            Log in
          </a>
          <ButtonLink href="/demo" variant="primary">
            Book a demo
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
