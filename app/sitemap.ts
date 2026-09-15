import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { solutionsNav, footerNav } from "@/lib/nav";

/**
 * app/sitemap.ts · Nebbos site sitemap generator (Next 15 native).
 *
 * Renders /sitemap.xml at build time. Google, Bing, and other crawlers
 * consult it to discover the site's canonical URL surface. Every entry
 * carries a `lastModified` and a `priority` hint per Google's sitemap
 * XML protocol.
 *
 * Sources of truth:
 *   - PRODUCTS (content/products.ts) — 4-product taxonomy (Wave 1)
 *   - solutionsNav (lib/nav.ts) — 9 industry-vertical solutions pages
 *   - footerNav (lib/nav.ts) — company + resources + trust + legal pages
 *   - hardcoded routes below — home + top-level surfaces that don't
 *     live in the nav data (blog, careers, demo, contact, presentation)
 *
 * Every route enumerated here is verified 200 in production per the
 * 2026-09-15 live-route audit; retiring routes (/product/*) are
 * intentionally excluded — the 302 redirect handles inbound links.
 *
 * Renders as: <https://nebbos.ai/sitemap.xml> at build time.
 * Cache: revalidated on every deploy (static generation).
 */

const BASE_URL = "https://nebbos.ai";
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Home + primary marketing surfaces
  entries.push(
    { url: `${BASE_URL}/`, lastModified: NOW, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: NOW, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/customers`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/demo`, lastModified: NOW, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/careers`, lastModified: NOW, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/press`, lastModified: NOW, changeFrequency: "monthly", priority: 0.5 },
  );

  // 2. Products taxonomy (4 per-product pages, priority high)
  for (const product of PRODUCTS) {
    entries.push({
      url: `${BASE_URL}/products/${product.slug}`,
      lastModified: NOW,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // 3. Solutions (9 industry verticals — derived from lib/nav solutionsNav)
  entries.push({ url: `${BASE_URL}/solutions`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 });
  for (const solution of solutionsNav) {
    entries.push({
      url: `${BASE_URL}${solution.href}`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  // 4. Trust + security + compliance
  entries.push(
    { url: `${BASE_URL}/trust`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/security`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compliance`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
  );

  // 5. Resources
  entries.push(
    { url: `${BASE_URL}/blog`, lastModified: NOW, changeFrequency: "weekly", priority: 0.65 },
    { url: `${BASE_URL}/docs`, lastModified: NOW, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/changelog`, lastModified: NOW, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/status`, lastModified: NOW, changeFrequency: "daily", priority: 0.4 },
    { url: `${BASE_URL}/presentation`, lastModified: NOW, changeFrequency: "monthly", priority: 0.5 },
  );

  // 6. /platform/* subtree (7 pages — technical deep-dives)
  const platformPages = ["", "/architecture", "/dashboard", "/how-it-works", "/integrations", "/presentation", "/standout", "/trends"];
  for (const path of platformPages) {
    entries.push({
      url: `${BASE_URL}/platform${path}`,
      lastModified: NOW,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  // 7. Legal (footer sourced — auto-enumerates from footerNav)
  const legalCol = footerNav.find((col) => col.label === "Legal");
  if (legalCol) {
    for (const link of legalCol.links) {
      entries.push({
        url: `${BASE_URL}${link.href}`,
        lastModified: NOW,
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  }

  return entries;
}
