// Site-wide constants and environment-aware config.
// Wave 3f: brand + contact copy sourced from content/ registries.
import { BRAND } from "@/content/brand";
import { CONTACT } from "@/content/contact";

export const PROD_ORIGIN = "https://nebbos.ai";
export const STAGING_ORIGIN = "https://idvor.ai";
export const APP_URL = "https://app.nebbos.ai";
export const CONTACT_EMAIL = CONTACT.general;

// NEXT_PUBLIC_SITE_ENV controls indexing + canonical origin (AD-8).
//   "production" -> nebbos.ai, indexable
//   "staging"    -> idvor.ai, noindex
// Defaults to "staging" so a misconfigured deploy is never accidentally indexed.
export const SITE_ENV = (process.env.NEXT_PUBLIC_SITE_ENV ?? "staging") as
  | "production"
  | "staging";

export const IS_PRODUCTION = SITE_ENV === "production";

export const SITE_ORIGIN = IS_PRODUCTION ? PROD_ORIGIN : STAGING_ORIGIN;

// Brand names + copy — sourced from content/brand.ts. Never hard-code.
export const SITE_NAME = BRAND.name;
export const SITE_TAGLINE = BRAND.category;
export const SITE_DESCRIPTION = BRAND.descriptionLong;
