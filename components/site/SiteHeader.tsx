"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { primaryNav, secondaryNav, productTree } from "@/lib/nav";

/**
 * SiteHeader · v3 · 2026-08-24 (dark-chrome rebuild)
 *
 * Founder direction 2026-08-24: header is always DARK. Nebbos mark +
 * wordmark are always the WHITE variants (never orange, never dark on
 * dark). No scroll-elevation crossfade — the chrome is a constant.
 *
 * Left: mark + wordmark (both white). Center: primary nav (white text).
 * Right: secondary nav (paper CTA button on the ink background). Mobile:
 * hamburger opens full-screen dark drawer. Mega-menu drops down onto
 * paper for contrast against the ink chrome.
 *
 * All styling reads from design tokens via class rules in
 * app/globals.css — no inline color literals, no clamp() magic numbers.
 */
export function SiteHeader() {
  const [openMega, setOpenMega] = useState<"product" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isProductOpen = openMega === "product";

  return (
    <header ref={containerRef} className="site-header">
      <div className="container site-header__inner">
        <Link href="/" aria-label="Nebbos home" className="site-header__brand">
          <Image
            src="/nebbos-mark-white.svg"
            alt="Nebbos"
            width={40}
            height={41}
            priority
            className="site-header__mark"
          />
          <Image
            src="/nebbos-wordmark-white.svg"
            alt=""
            aria-hidden="true"
            width={132}
            height={25}
            priority
            className="site-header__wordmark"
          />
        </Link>

        <nav aria-label="Primary" className="site-header__nav site-header__hide-mobile">
          {primaryNav.map((item) => {
            const isMega = !!item.megaMenu;
            const isOpen = openMega === item.megaMenu;
            return (
              <div key={item.href} className="site-header__nav-item">
                {isMega ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${item.megaMenu}`}
                    onClick={() => setOpenMega(isOpen ? null : (item.megaMenu as "product"))}
                    onMouseEnter={() => setOpenMega(item.megaMenu as "product")}
                    className="site-header__link site-header__link--button"
                  >
                    {item.label}
                    <span aria-hidden className="site-header__caret">▾</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="site-header__link"
                    onMouseEnter={() => setOpenMega(null)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="site-header__actions site-header__hide-mobile">
          {secondaryNav.map((link, i) => {
            const isCTA = i === secondaryNav.length - 1;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={isCTA ? "site-header__cta" : "site-header__link site-header__link--quiet"}
              >
                {link.label}
                {isCTA && <span aria-hidden className="site-header__cta-arrow">→</span>}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="site-header__mobile-toggle site-header__show-mobile"
        >
          <span aria-hidden>{mobileOpen ? "CLOSE" : "MENU"}</span>
        </button>
      </div>

      {isProductOpen && (
        <div
          id="mega-product"
          role="region"
          aria-label="Product menu"
          onMouseLeave={() => setOpenMega(null)}
          className="site-mega"
        >
          <div className="container-wide">
            <div className="site-mega__grid">
              {productTree.map(({ band, href, layers }) => (
                <div key={band.n} className="site-mega__band">
                  <Link
                    href={href}
                    onClick={() => setOpenMega(null)}
                    className="site-mega__band-link"
                  >
                    <div className="site-mega__band-name">{band.name}</div>
                    <div className="site-mega__band-strap">{band.strap}</div>
                  </Link>
                  <ul className="site-mega__layers">
                    {layers.map(({ layer, href: lHref }) => (
                      <li key={layer.n}>
                        <Link
                          href={lHref}
                          onClick={() => setOpenMega(null)}
                          className="site-mega__layer-link"
                        >
                          <span className="site-mega__layer-num">
                            {String(layer.n).padStart(2, "0")}
                          </span>
                          <span className="site-mega__layer-name">{layer.name}</span>
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

      {mobileOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="site-drawer"
        >
          <nav aria-label="Mobile primary">
            <ul className="site-drawer__nav">
              {primaryNav.map((item) => (
                <li key={item.href} className="site-drawer__nav-item">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="site-drawer__nav-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="site-drawer__actions">
            {secondaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={() => setMobileOpen(false)}
                className="site-drawer__action"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
