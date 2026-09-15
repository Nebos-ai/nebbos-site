import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/content/brand";

export const metadata: Metadata = {
  title: `404 · ${BRAND.name}`,
  robots: { index: false, follow: false },
};

/**
 * app/not-found.tsx · site-chrome branded 404 fallback (2026-09-14).
 *
 * Renders inside the root layout (SiteHeader + SiteFooter), so a stale link
 * still lands the visitor inside Nebbos chrome rather than Next's built-in
 * white-screen 404. Consumed by the catchall route's notFound() calls +
 * any direct 404s.
 */
export default function NotFound() {
  return (
    <section className="hero-paper">
      <div className="container-narrow">
        <p className="eyebrow">404 · Not found</p>
        <h1 className="hero-paper__title">This page is not part of {BRAND.name}.</h1>
        <p className="hero-paper__deck">
          You may have followed a stale link, or a route we retired. The rest of the site is
          still here — start again from the home page, or reach us directly if you were
          expecting something specific.
        </p>
        <div className="hero-paper__cta" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Return home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Reach us
          </Link>
        </div>
      </div>
    </section>
  );
}
