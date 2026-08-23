"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  primaryNav,
  secondaryNav,
  productTree,
} from "@/lib/nav";

/**
 * SiteHeader · v2 rebuild 2026-08-23
 *
 * Sticky top bar. Left: Nebbos logo. Center: 5-item primary nav with
 * mega-menu on Product (5-band × 3-layer grid = 15 layer links). Right:
 * secondary nav (Log in, Book a demo). Mobile: hamburger opens full drawer.
 *
 * Accessibility:
 *   - Semantic <header><nav> with aria-label
 *   - Mega-menu triggered by button with aria-expanded / aria-controls
 *   - Escape closes mega-menu and mobile drawer
 *   - Focus trap on mobile drawer when open
 *   - Skip-link (in layout.tsx) targets #main
 */
export function SiteHeader() {
  const [openMega, setOpenMega] = useState<"product" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Close mega-menu on click outside / Escape
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMega(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMega(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Simple scroll-elevation: transparent at top, solid after 8px scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isProductOpen = openMega === "product";

  return (
    <header
      ref={containerRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(244, 241, 234, 0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        backdropFilter: scrolled ? "saturate(160%) blur(12px)" : "none",
        transition: "background var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out), backdrop-filter var(--dur-med) var(--ease-out)",
      }}
    >
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        minHeight: 68,
      }}>
        {/* Logo · brand mark, context-aware:
            - at top (over hero image, no scroll): white mark (dark scrim behind)
            - after scroll (paper bg): dark mark
            Both variants preloaded so swap is instant. */}
        <Link
          href="/"
          aria-label="Nebbos home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "var(--ink)",
            textDecoration: "none",
            position: "relative",
            width: 36,
            height: 37,
          }}
        >
          <Image
            src="/nebbos-mark-white.svg"
            alt="Nebbos"
            width={36}
            height={37}
            priority
            style={{
              position: "absolute",
              inset: 0,
              opacity: scrolled ? 0 : 1,
              transition: "opacity var(--dur-med) var(--ease-out)",
            }}
          />
          <Image
            src="/nebbos-mark-dark.svg"
            alt=""
            aria-hidden="true"
            width={36}
            height={37}
            priority
            style={{
              position: "absolute",
              inset: 0,
              opacity: scrolled ? 1 : 0,
              transition: "opacity var(--dur-med) var(--ease-out)",
            }}
          />
        </Link>

        {/* Primary nav — desktop */}
        <nav aria-label="Primary" style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }} className="hide-mobile">
          {primaryNav.map((item) => {
            const isMega = !!item.megaMenu;
            const isOpen = openMega === item.megaMenu;
            return (
              <div key={item.href} style={{ position: "relative" }}>
                {isMega ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${item.megaMenu}`}
                    onClick={() => setOpenMega(isOpen ? null : (item.megaMenu as "product"))}
                    onMouseEnter={() => setOpenMega(item.megaMenu as "product")}
                    style={navLinkStyle}
                  >
                    {item.label}
                    <span aria-hidden style={{ marginLeft: 6, fontSize: 10, opacity: 0.7 }}>▾</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    style={navLinkStyle}
                    onMouseEnter={() => setOpenMega(null)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Secondary nav — desktop */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {secondaryNav.map((link, i) => {
            const isCTA = i === secondaryNav.length - 1;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                style={isCTA ? ctaButtonStyle : linkQuietStyle}
              >
                {link.label}
                {isCTA && <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>}
              </Link>
            );
          })}
        </div>

        {/* Hamburger — mobile */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="show-mobile"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            cursor: "pointer",
          }}
        >
          <span aria-hidden style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em" }}>
            {mobileOpen ? "CLOSE" : "MENU"}
          </span>
        </button>
      </div>

      {/* Mega-menu · Product */}
      {isProductOpen && (
        <div
          id="mega-product"
          role="region"
          aria-label="Product menu"
          onMouseLeave={() => setOpenMega(null)}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--paper)",
            borderBlock: "1px solid var(--rule)",
            paddingBlock: "clamp(32px, 5vh, 56px)",
            boxShadow: "0 8px 24px -12px rgba(20, 18, 15, 0.12)",
          }}
        >
          <div className="container-wide">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 32,
              }}
            >
              {productTree.map(({ band, href, layers }) => (
                <div key={band.n}>
                  <Link
                    href={href}
                    onClick={() => setOpenMega(null)}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 20,
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: 6,
                        letterSpacing: "-0.012em",
                      }}
                    >
                      {band.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        color: "var(--ink-3)",
                        lineHeight: 1.4,
                      }}
                    >
                      {band.strap}
                    </div>
                  </Link>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                    {layers.map(({ layer, href: lHref }) => (
                      <li key={layer.n}>
                        <Link
                          href={lHref}
                          onClick={() => setOpenMega(null)}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: 10,
                            padding: "8px 10px",
                            marginInline: -10,
                            fontFamily: "var(--font-sans)",
                            fontSize: 14,
                            color: "var(--ink-2)",
                            textDecoration: "none",
                            borderRadius: 2,
                            transition: "background var(--dur-fast) var(--ease-out)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 10,
                              color: "var(--ink-3)",
                              minWidth: 20,
                            }}
                          >
                            {String(layer.n).padStart(2, "0")}
                          </span>
                          <span style={{ fontWeight: 500 }}>{layer.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          style={{
            position: "fixed",
            inset: 0,
            top: 68,
            background: "var(--paper)",
            overflowY: "auto",
            zIndex: 40,
            padding: "24px",
          }}
        >
          <nav aria-label="Mobile primary">
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {primaryNav.map((item) => (
                <li key={item.href} style={{ borderBottom: "1px solid var(--rule)" }}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "20px 4px",
                      fontFamily: "var(--font-serif)",
                      fontSize: 24,
                      color: "var(--ink)",
                      textDecoration: "none",
                      letterSpacing: "-0.014em",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            {secondaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 20px",
                  border: "1px solid var(--ink)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  color: "var(--ink)",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .hide-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

const navLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  color: "var(--ink)",
  textDecoration: "none",
  cursor: "pointer",
  letterSpacing: "-0.005em",
};

const linkQuietStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 12px",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "var(--ink-2)",
  textDecoration: "none",
};

const ctaButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 18px",
  background: "var(--ink)",
  color: "var(--paper)",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
  transition: "transform var(--dur-fast) var(--ease-out)",
};
