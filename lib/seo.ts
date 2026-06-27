import type { Metadata } from "next";
import { IS_PRODUCTION, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "./site";

// Per-page metadata helper (AD-8). Sets canonical against the active origin,
// OpenGraph/Twitter defaults, and noindex on the staging origin (idvor.ai).

type PageMetaArgs = {
  title?: string;
  description?: string;
  path?: string;
};

export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
}: PageMetaArgs = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Operations Intelligence`;
  const url = new URL(path, SITE_ORIGIN).toString();

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: IS_PRODUCTION
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

// JSON-LD organization schema, emitted once in the root layout.
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: SITE_DESCRIPTION,
    sameAs: [] as string[],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@nebbos.ai",
    },
  };
}
