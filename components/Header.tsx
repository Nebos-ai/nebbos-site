import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { APP_URL } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Site header — rebuild-2026. Flat 8-destination nav, no dropdowns.
 *
 * The five-group hover-dropdown pattern was noise on a marketing site whose
 * job is to sell to a founder / operator who wants to skim. Flat nav lets
 * the reader see the whole IA at a glance (Platform / How / Pricing /
 * Solutions / Trust / About / Blog / Contact) and pick the destination
 * they need in one click. Server component — zero client JS.
 */
export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brandmark" aria-label="Nebbos home">
          nebbos
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
            style={{ color: "var(--mist)" }}
            rel="noreferrer"
          >
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
