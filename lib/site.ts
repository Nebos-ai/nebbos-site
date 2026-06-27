// Site-wide constants and environment-aware config.

export const PROD_ORIGIN = "https://nebbos.ai";
export const STAGING_ORIGIN = "https://idvor.ai";
export const APP_URL = "https://app.nebbos.ai";
export const CONTACT_EMAIL = "hello@nebbos.ai";

// NEXT_PUBLIC_SITE_ENV controls indexing + canonical origin (AD-8).
//   "production" -> nebbos.ai, indexable
//   "staging"    -> idvor.ai, noindex
// Defaults to "staging" so a misconfigured deploy is never accidentally indexed.
export const SITE_ENV = (process.env.NEXT_PUBLIC_SITE_ENV ?? "staging") as
  | "production"
  | "staging";

export const IS_PRODUCTION = SITE_ENV === "production";

export const SITE_ORIGIN = IS_PRODUCTION ? PROD_ORIGIN : STAGING_ORIGIN;

export const SITE_NAME = "Nebbos";
export const SITE_TAGLINE = "Operations Intelligence";
export const SITE_DESCRIPTION =
  "Your tools tell you what already broke. Nebbos reads the signal your operation emits, predicts what's about to go wrong, explains why, and acts under your approval — model-agnostic, and governed by design.";
