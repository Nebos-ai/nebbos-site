/**
 * content/brand.ts · concrete-copy revision 2026-08-23
 *
 * Per founder direction: drop the "institutional substrate for enterprise AI
 * agents" abstraction — name what actually happens. Every headline reads as
 * "here is what Nebbos does" not "here is a philosophy of what Nebbos is."
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
  taglineShort: "The agents your team wishes it had time to build.",

  /** Slightly longer version used in <title> tags. */
  taglineLong: "The AI agents your team wishes it had time to build.",

  /** Category the company sits in (for press, positioning, SEO). */
  category: "AI-agent governance for enterprise",

  /** Home hero deck under the title. */
  homeDeck:
    "One agent per department. Fifteen governance layers underneath. One flat price per user.",

  /** Sub-category for AI-first buyers (Wave 3e model-training angle). */
  categorySecondary: "Enterprise model-training substrate",

  /** One-line site description (SEO meta + share previews). */
  descriptionShort:
    "Nebbos runs the AI agents your enterprise never had time to build — one per department, fifteen governance layers underneath.",

  /** Long-form site description (for landing-page bodies + doc). */
  descriptionLong:
    "Every enterprise has agents that would help. One for the operations handoffs. One for the finance close. One for the HR onboarding sequences. None of them get built because your team is already running the current ones. Nebbos runs the twelve you never built, watches the work not the people, and hands you an audit trail for every decision they make.",

  /** Positioning one-liner for the two-ecosystem framing (Wave 3e). */
  positioningTwoEcosystems:
    "Nebbos runs on both sides of the enterprise AI equation — the governance side that CISO and Legal have to sign off on, and the training side that your ML platform team wishes existed.",

  /** Sales-line for the model-training angle. */
  positioningTrainingSubstrate:
    "Your operation is the training data. Nebbos captures every human decision as a preference pair, portable to any model you own or license.",

  /** Legal entity name (per project_nebbos_naming_ratified_2026_08_21). */
  legalEntity: "TR3I",
} as const;
