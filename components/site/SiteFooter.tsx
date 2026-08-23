import Link from "next/link";
import Image from "next/image";
import { footerNav } from "@/lib/nav";
import { BRAND } from "@/content/brand";

/**
 * SiteFooter · v2 rebuild 2026-08-23
 *
 * Six-column sitemap-style footer. Groups: Product · Solutions · Company ·
 * Resources · Trust · Legal. Bottom bar: logo, legal entity, © line,
 * status badge. Institutional Reserve register — hairline dividers,
 * mono column labels, restrained gold accent.
 */
export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      style={{
        marginTop: 0,
        background: "var(--paper-2)",
        borderTop: "1px solid var(--rule)",
        paddingBlock: "clamp(56px, 8vh, 96px) clamp(32px, 4vh, 48px)",
      }}
    >
      <div className="container-wide">
        {/* Top section: brand strap + sitemap columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) repeat(6, minmax(0, 1fr))",
            gap: 32,
            marginBottom: 64,
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              aria-label="Nebbos home"
              style={{ display: "inline-flex", alignItems: "center", color: "var(--ink)", marginBottom: 20, textDecoration: "none" }}
            >
              <Image
                src="/nebbos-mark-dark.svg"
                alt="Nebbos"
                width={48}
                height={49}
              />
            </Link>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                maxWidth: "32ch",
                margin: 0,
              }}
            >
              {BRAND.descriptionShort}
            </p>
          </div>

          {/* Sitemap columns */}
          {footerNav.map((col) => (
            <div key={col.label}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 16,
                }}
              >
                {col.label}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        color: "var(--ink-2)",
                        textDecoration: "none",
                        transition: "color var(--dur-fast) var(--ease-out)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar: legal entity + © + status */}
        <div
          style={{
            borderTop: "1px solid var(--rule)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--ink-3)",
            }}
          >
            © {new Date().getFullYear()} {BRAND.legalEntity} · All rights reserved
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Link
              href="/status"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--ink-3)",
                textDecoration: "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--gold)",
                }}
              />
              All systems operational
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr) repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 700px) {
          .footer-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  );
}
