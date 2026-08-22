/**
 * constructMetadata — factory for per-page Next.js `metadata` objects.
 *
 * Doctrine v2 §7 · NEW-L. Every marketing page calls this to get a fully-
 * formed Metadata object with the delta-brief editorial defaults baked in:
 * title template, canonical URL, robots policy, OpenGraph, Twitter card,
 * icons, and structured data readiness.
 *
 * Per-page overrides are shallow-merged over the defaults. Ship one call
 * per page:
 *
 *   export const metadata = constructMetadata({
 *     title: "Pricing",
 *     description: "$150 per user per month. One flat price.",
 *     path: "/pricing",
 *   });
 */
import type { Metadata } from "next";
import { IS_PRODUCTION, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

type ConstructMetadataInput = {
  /** Page title (rendered as `{title} — Nebbos`). Omit for home to get default. */
  title?: string;
  /** Meta description. Falls back to site-wide default. */
  description?: string;
  /** Absolute path from origin, starting with `/`. Used to build canonical URL + og:url. */
  path?: string;
  /** Path to an OG image relative to site origin. Auto-generated in Wave 3+ via `/og`. */
  ogImage?: string;
  /**
   * Robots override. Non-production defaults to `noindex, nofollow`. In production,
   * default is `index, follow`. Pass `{ index: false }` to force a page out of search.
   */
  robots?: { index?: boolean; follow?: boolean };
  /** Extend keywords array (rare — most pages don't need this). */
  keywords?: string[];
};

/** Build the canonical URL from origin + path. Strips trailing slash. */
function canonicalUrl(path?: string): string {
  const p = path ?? "/";
  const cleaned = p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
  return `${SITE_ORIGIN}${cleaned}`;
}

/**
 * Build a per-page Metadata object. Call this from `export const metadata` in
 * every page.tsx across the marketing site. Never hand-write a bare
 * `Metadata` object — this factory owns the defaults.
 */
export function constructMetadata({
  title,
  description,
  path,
  ogImage,
  robots,
  keywords,
}: ConstructMetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — The tool for building your company's brain`;
  const desc = description ?? SITE_DESCRIPTION;
  const url = canonicalUrl(path);
  const image = ogImage ? `${SITE_ORIGIN}${ogImage}` : `${SITE_ORIGIN}/og-default.png`;

  const robotsPolicy = IS_PRODUCTION
    ? { index: robots?.index ?? true, follow: robots?.follow ?? true }
    : { index: false, follow: false };

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: fullTitle,
    description: desc,
    applicationName: SITE_NAME,
    robots: robotsPolicy,
    keywords,
    alternates: {
      canonical: url,
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url,
      title: fullTitle,
      description: desc,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [image],
    },
  };
}
