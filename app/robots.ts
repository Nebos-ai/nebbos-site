import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_ORIGIN } from "@/lib/site";

// AD-8: only the production origin (nebbos.ai) is indexable. On the staging
// origin (idvor.ai) every page is disallowed so it can never be indexed.
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: new URL("/sitemap.xml", SITE_ORIGIN).toString(),
  };
}
