"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { NebbosMark } from "@nebbos/brand/logo";
import { primaryNav, secondaryNav, megaProducts } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { arrowWell } from "@/components/marketing/primitives";

/**
 * SiteHeader · v5 · 2026-09-23 · floating glass island
 *
 * v4 (2026-09-12): full-bleed dark chrome, flower-of-life mark only.
 * v5: the same items, the same order, on a detached glass pill that
 * densifies once the page scrolls. Hover and the current route share a
 * layoutId highlight; the Products mega-menu and mobile drawer animate
 * in and out with AnimatePresence.
 *
 * 2026-09-23: the NEBBOS wordmark (public/nebbos-logo.svg) sits beside
 * the flower-of-life mark at 14.4px, founder-directed. Only the mark scales on
 * hover; neither ever rotates.
 */

const PRODUCT_TINT: Record<string, string> = {
  platform: "var(--color-platform)",
  app: "var(--color-app)",
  mcp: "var(--color-mcp)",
  usb: "var(--color-cradle)",
};

const EASE = [0.32, 0.72, 0, 1] as const;

export function SiteHeader() {
  const [openMega, setOpenMega] = useState<"products" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover intent: leaving the trigger or panel schedules a close; entering
  // either again cancels it, so the pointer can travel between them.
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }
  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMega(null), 220);
  }
  function openProducts() {
    cancelClose();
    setOpenMega("products");
  }
  useEffect(() => cancelClose, []);
  const pathname = usePathname();

  // Densify the glass once the page leaves the top · attribute write, no re-render.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    pillRef.current?.toggleAttribute("data-scrolled", y > 24);
  });

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

  const isProductsOpen = openMega === "products";
  const activeHref = primaryNav.find((i) => pathname === i.href || pathname.startsWith(`${i.href}/`))?.href;
  const highlight = hovered ?? activeHref ?? null;

  const linkBase =
    "relative z-10 inline-flex h-9 items-center gap-1.5 rounded-pill px-3.5 font-display text-[14px] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <header
      ref={containerRef}
      className="sticky top-0 z-40 px-3 pt-3 sm:px-6"
      onMouseLeave={() => {
        setHovered(null);
        scheduleClose();
      }}
    >
      {/* Frosted band behind the whole header strip, so page content never
          reads through the gap around the pill; fades out below it. */}
      <div
        aria-hidden
        className="glass pointer-events-none absolute inset-x-0 top-0 -bottom-6 -z-10 bg-ground/70 backdrop-blur-2xl backdrop-saturate-150 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
      />
      <div
        ref={pillRef}
        className="glass group/pill relative z-50 mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-pill bg-ground/75 pl-4 pr-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_20px_50px_-30px_rgb(0_0_0/0.9)] ring-1 ring-rule ring-inset backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-500 ease-fluid data-[scrolled]:bg-ground-2/90 data-[scrolled]:ring-rule-2"
      >
        <Link
          href="/"
          aria-label="Nebbos home"
          className="group/logo flex items-center gap-3 rounded-pill pr-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="grid size-10 place-items-center transition-transform duration-500 ease-fluid group-hover/logo:scale-110">
            <NebbosMark size={34} />
          </span>
          <Image src="/nebbos-logo.svg" alt="" width={77} height={14} unoptimized priority className="h-[14.4px] w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {primaryNav.map((item) => {
            const isMega = !!item.megaMenu;
            const isOpen = openMega === item.megaMenu;
            const on = highlight === item.href;
            const pill = on && (
              <m.span
                layoutId="nav-highlight"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-pill bg-white/[0.07] ring-1 ring-rule ring-inset"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            );
            return (
              <div key={item.href} className="relative" onMouseEnter={() => setHovered(item.href)}>
                {isMega ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${item.megaMenu}`}
                    onClick={() => setOpenMega(isOpen ? null : (item.megaMenu as "products"))}
                    onMouseEnter={openProducts}
                    className={cn(linkBase, "cursor-pointer", on || isOpen ? "text-ink" : "text-ink-2 hover:text-ink")}
                  >
                    {pill}
                    {item.label}
                    <span
                      aria-hidden
                      className={cn("text-[10px] text-ink-3 transition-transform duration-300", isOpen && "rotate-180")}
                    >
                      ▾
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    className={cn(linkBase, on ? "text-ink" : "text-ink-2 hover:text-ink")}
                    onMouseEnter={scheduleClose}
                  >
                    {pill}
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          {secondaryNav.map((link, i) => {
            const isCTA = i === secondaryNav.length - 1;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={
                  isCTA
                    ? "group inline-flex h-12 items-center gap-2.5 whitespace-nowrap rounded-pill bg-ink pl-5 pr-1.5 font-display text-[14px] font-medium text-ground transition-transform duration-300 ease-fluid active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    : "inline-flex h-10 items-center rounded-pill px-4 font-display text-[14px] font-medium text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                }
              >
                {link.label}
                {isCTA && (
                  <span
                    aria-hidden
                    className={arrowWell}
                  >
                    →
                  </span>
                )}
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
          className="relative z-50 inline-flex h-12 items-center gap-3 rounded-pill bg-white/[0.06] pl-4 pr-3 font-code text-[11px] tracking-label text-ink ring-1 ring-rule ring-inset lg:hidden"
        >
          <span aria-hidden>{mobileOpen ? "CLOSE" : "MENU"}</span>
          <span aria-hidden className="relative block h-3 w-4">
            <span
              className={cn(
                "absolute left-0 top-0.5 h-px w-4 bg-ink transition-transform duration-500 ease-fluid",
                mobileOpen && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-2.5 h-px w-4 bg-ink transition-transform duration-500 ease-fluid",
                mobileOpen && "top-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isProductsOpen && (
          <m.div
            id="mega-products"
            role="region"
            aria-label="Products menu"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            initial={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, scale: 0.985, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-x-3 top-full mx-auto max-w-[1240px] origin-top pt-2 sm:inset-x-6"
          >
            {/* pt-2 above is a transparent hover bridge: the pointer never
                crosses dead space between the pill and the panel. */}
            <div className="glass rounded-bezel bg-ground-2/90 p-1.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-rule-2 ring-inset backdrop-blur-2xl">
            <m.div
              className="grid gap-1.5 md:grid-cols-2 xl:grid-cols-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {megaProducts.map(({ key, name, tagline, href, tiers }) => (
                <m.div
                  key={key}
                  variants={{ hidden: { y: 10, filter: "blur(6px)" }, show: { y: 0, filter: "blur(0px)" } }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative overflow-hidden rounded-inner bg-ground-3/70 p-5 ring-1 ring-rule ring-inset"
                  style={{ "--tint": PRODUCT_TINT[key] ?? "var(--color-accent)" } as CSSProperties}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[var(--tint)] opacity-20 blur-3xl"
                  />
                  <Link href={href} onClick={() => setOpenMega(null)} className="group relative block">
                    <div className="flex items-center gap-2.5 font-display text-lg font-medium text-ink">
                      <span aria-hidden className="grid size-7 place-items-center rounded-chip bg-[var(--tint)] text-white">
                        <NebbosMark size={16} />
                      </span>
                      {name.replace("Nebbos.ai ", "").replace("Nebbos ", "")}
                    </div>
                    <div className="mt-2 min-h-[2lh] text-[13px] leading-snug text-ink-3 transition-colors group-hover:text-ink-2">
                      {tagline}
                    </div>
                  </Link>
                  <ul className="relative m-0 mt-4 grid list-none gap-0.5 border-t border-rule p-0 pt-3">
                    {tiers.map((tier) => {
                      // tier.label is "L1 · Guest" — split for two-column layout
                      const [tierNum, ...rest] = tier.label.split(" · ");
                      const tierName = rest.join(" · ") || tier.key;
                      return (
                        <li key={tier.key}>
                          <Link
                            href={tier.href}
                            onClick={() => setOpenMega(null)}
                            className="flex items-center gap-3 rounded-chip px-2 py-1.5 text-[13px] text-ink-2 transition-colors hover:bg-white/[0.05] hover:text-ink"
                          >
                            <span className="font-code text-[11px] text-tint">{tierNum}</span>
                            <span>{tierName}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </m.div>
              ))}
            </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="glass fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ground/90 px-6 pb-10 pt-28 backdrop-blur-3xl lg:hidden"
          >
            <nav aria-label="Mobile primary">
              <m.ul
                className="grid gap-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              >
                {primaryNav.map((item) => (
                  <m.li
                    key={item.href}
                    className="overflow-hidden"
                    variants={{ hidden: { y: 40 }, show: { y: 0 } }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 font-display text-4xl font-medium tracking-tight text-ink"
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </nav>
            <div className="mt-10 grid gap-3">
              {secondaryNav.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex h-14 items-center justify-center rounded-pill font-display text-base font-medium",
                    i === secondaryNav.length - 1 ? "bg-ink text-ground" : "text-ink ring-1 ring-rule-2 ring-inset",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
