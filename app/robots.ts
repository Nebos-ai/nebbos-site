import type { MetadataRoute } from "next";

/**
 * app/robots.ts · Nebbos robots.txt generator (Next 15 native).
 *
 * Renders /robots.txt at build time. Instructs crawlers what to index
 * and points at the sitemap.
 *
 * Rules:
 *   - Allow all customer-facing surfaces (see app/sitemap.ts for the
 *     canonical URL list)
 *   - Disallow /brief/* — hidden client-facing artifacts (briefs, decks,
 *     one-pagers) that are noindex,nofollow per next.config.ts rewrites
 *     comment. They live at categorical slugs and are shared via direct
 *     link only, never surfaced through search
 *   - Disallow /_next/* — Next.js internal build artifacts
 *   - Disallow /api/* — API routes if any (none today, defensive)
 *   - Point at sitemap.xml for canonical URL discovery
 *
 * Staging (idvor.ai per AGENTS.md) is a separate concern — that domain
 * carries noindex globally via a distinct staging config. This robots.ts
 * is for the production nebbos.ai domain only.
 */

const BASE_URL = "https://nebbos.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/brief/", "/_next/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
