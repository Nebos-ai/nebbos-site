import type { Metadata } from "next";
import { BRAND } from "@/content/brand";
import { PageHero } from "@/components/marketing/PageHero";
import { PearlMosaic } from "@/components/marketing/PearlMosaic";
import { GhostCta, PrimaryCta } from "@/components/marketing/primitives";

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
 *
 * 2026-09-23: redesigned onto the shared PageHero + PearlMosaic (dark
 * register, same copy); the legacy hero-paper / btn markup is retired.
 */
export default function NotFound() {
  return (
    <PageHero
      id="nf-h"
      eyebrow="404 · Not found"
      title={`This page is not part of ${BRAND.name}.`}
      deck={
        <>
          You may have followed a stale link, or a route we retired. The rest of the site is
          still here — start again from the home page, or reach us directly if you were
          expecting something specific.
        </>
      }
      ctas={
        <>
          <PrimaryCta href="/" arrow={false}>
            Return home
          </PrimaryCta>
          <GhostCta href="/contact">Reach us</GhostCta>
        </>
      }
      visual={<PearlMosaic />}
    />
  );
}
