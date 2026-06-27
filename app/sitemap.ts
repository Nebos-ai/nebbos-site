import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";
import { getSlugs } from "@/lib/content";

// Static routes in the canonical IA (AD-6). Dynamic content routes are appended
// from the MDX collections below.
const staticPaths = [
  "/",
  "/platform",
  "/platform/how-it-works",
  "/platform/architecture",
  "/platform/integrations",
  "/pearl",
  "/solutions",
  "/solutions/k12",
  "/solutions/healthcare",
  "/solutions/financial-services",
  "/solutions/public-sector",
  "/solutions/manufacturing",
  "/solutions/operations",
  "/solutions/finance",
  "/solutions/people",
  "/trust",
  "/security",
  "/governance",
  "/compliance",
  "/pricing",
  "/resources",
  "/blog",
  "/customers",
  "/changelog",
  "/docs",
  "/about",
  "/careers",
  "/contact",
  "/press",
  "/demo",
  "/status",
  "/legal/privacy",
  "/legal/terms",
  "/legal/dpa",
  "/legal/subprocessors",
  "/legal/cookies",
  "/legal/acceptable-use",
  "/legal/responsible-disclosure",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = staticPaths.map((path) => ({
    url: new URL(path, SITE_ORIGIN).toString(),
    lastModified: now,
  }));

  const dynamic = [
    ...getSlugs("blog").map((s) => `/blog/${s}`),
    ...getSlugs("customers").map((s) => `/customers/${s}`),
    ...getSlugs("careers").map((s) => `/careers/${s}`),
  ].map((path) => ({ url: new URL(path, SITE_ORIGIN).toString(), lastModified: now }));

  return [...base, ...dynamic];
}
