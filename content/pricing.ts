/**
 * content/pricing.ts · Wave 3f · pricing copy registry.
 *
 * Every price, minimum, discount, or overage-currency string on the site
 * imports from here. Canonical source: memory
 * `reference_nebbos_pricing_ratified_2026_08_22`.
 *
 * When these numbers change (raise the price, raise the minimum, add a tier),
 * change ONE value here — never grep-and-replace across page.tsx files.
 *
 * Per memory `feedback_marketing_site_pricing_editorial_discipline`, only
 * the flat-price, minimum, discount, and overage-currency belong on
 * marketing surfaces. The 4-tier ARPU + 2× overage math + per-tier user
 * pricing from the ratification stays OFF the marketing site.
 */

export const PRICING = {
  /** Per-user monthly price (currency-locked USD). */
  perUser: "$150",

  /** Full "$150 per user per month" phrasing — most common on the site. */
  perUserFull: "$150 per user per month",

  /** Same phrase compressed for eyebrows / heros. */
  perUserCompact: "$150/user/mo",

  /** Minimum seat count. */
  minimum: 20,

  /** Word form for prose ("Twenty-user minimum"). */
  minimumWord: "Twenty",

  /** Cadence (annual vs monthly). */
  cadence: "annual",

  /** Prepay discount percentage. */
  discountAnnual: "15%",

  /** Full "billed annually with a 15% prepay discount" phrase. */
  cadenceAndDiscountPhrase: "Billed annually with a 15% prepay discount.",

  /** What's included per seat — reused across pricing / /solutions/*. */
  includedPhrase: "Every seat, every capability.",

  /** Overage currency (Wave 2C decision — stable, provider-decoupled). */
  overageCurrency: "Nebbos tokens",

  /** Overage phrase used in hero + FeatureRow. */
  overageExplainer:
    "AI-usage overage bills in Nebbos tokens — a stable currency decoupled from LLM providers' price swings.",

  /** Separately-priced lines. */
  separatelyPriced: [
    "Storage",
    "Bring-your-own-keys",
    "Support tiers",
  ] as const,
} as const;
