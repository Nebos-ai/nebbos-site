/**
 * content/brand.ts · Wave 3f · brand-level copy registry.
 *
 * Tagline, category, one-liners. Every occurrence of these strings on the
 * site imports from here. A rebrand or repositioning changes ONE file.
 *
 * When you change a value here, grep first (many pages import a subset):
 *   grep -rn "from \"@/content/brand\"" app/ components/ lib/
 */

export const BRAND = {
  /** Legal / display name of the product. */
  name: "Nebbos",

  /** Home-page hero title (canonical, most reused). */
  taglineShort: "Build your company's brain",

  /** Slightly longer version used in <title> tags. */
  taglineLong: "Build your company's brain",

  /** Category the company sits in (for press, positioning, SEO). */
  category: "AI-agent governance for enterprise",

  /** Home hero deck under the title. */
  homeDeck: "Fifteen layers. One system. Owned by you.",

  /** Sub-category for AI-first buyers (Wave 3e model-training angle). */
  categorySecondary: "Enterprise model-training substrate",

  /** One-line site description (SEO meta + share previews). */
  descriptionShort:
    "The tool for building your company's brain — a governance substrate for enterprise AI agents.",

  /** Long-form site description (for landing-page bodies + doc). */
  descriptionLong:
    "Your tools tell you what already broke. Nebbos reads the signal your operation emits, predicts what's about to go wrong, explains why, and acts under your approval — model-agnostic, and governed by design.",

  /** Positioning one-liner for the two-ecosystem framing (Wave 3e). */
  positioningTwoEcosystems:
    "Nebbos lives in both ecosystems — the AI governance side (Legal, CISO, audit) and the training-data side (ML Platform, fine-tune, RLHF).",

  /** Sales-line for the model-training angle. */
  positioningTrainingSubstrate:
    "Your operation is your training data. Nebbos captures every human decision as a preference pair, portable to any model you own.",

  /** Legal entity name (per project_nebbos_naming_ratified_2026_08_21). */
  legalEntity: "TR3I",
} as const;
