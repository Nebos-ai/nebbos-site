/**
 * content/brand.ts · Nebbos brand-vocabulary compliant revision 2026-08-23
 *
 * Vocabulary rule (per feedback_nebbos_do_not_use_agent_use_brain_os_architecture):
 * NEVER use "agent" on customer surfaces. Canonical vocabulary:
 *   - company brain    (emotional / executive register)
 *   - operating system (systems register)
 *   - architecture     (technical / substrate register)
 *   - Pearl            (per-department entity — brand name)
 *
 * Grep-block-list: this file (and every consumer) MUST pass `grep -iE "\\bagent(s)?\\b"`
 * before it can be published. Any hit is a defect.
 *
 * When you change a value here, grep first (many pages import a subset):
 *   grep -rn "from \"@/content/brand\"" app/ components/ lib/
 */

export const BRAND = {
  /** Legal / display name of the product. */
  name: "Nebbos",

  /** Home-page hero title (canonical, most reused). */
  taglineShort: "The company brain your team never had time to build.",

  /** Slightly longer version used in <title> tags. */
  taglineLong: "The operating system for the enterprise that ships its own intelligence.",

  /** Category the company sits in — market label used in press / SEO only. */
  category: "Company-brain infrastructure for enterprise",

  /** Home hero deck under the title. */
  homeDeck:
    "One Pearl per department. Fifteen governance layers underneath. One flat price per seat.",

  /** Sub-category for AI-first buyers (Wave 3e model-training angle). */
  categorySecondary: "Enterprise model-training substrate",

  /** One-line site description (SEO meta + share previews). */
  descriptionShort:
    "Nebbos is the operating system your enterprise never had time to build — one Pearl per department, fifteen governance layers underneath.",

  /** Long-form site description (for landing-page bodies + doc). */
  descriptionLong:
    "Every enterprise has departments that would run better with a brain. Nebbos gives each one its own — a Pearl. Every Pearl starts as a Nebbos General (the latest version of that function&rsquo;s brain), then learns your team. Nebbos Design tunes itself to how your product team ships. Nebbos Finance to how you close. Nebbos Operations to how handoffs actually run. Every quarter each Pearl works, it works better. Portable to you: the tuned Pearl, memory intact, moves with you if you ever leave the platform.",

  /** Positioning one-liner for the two-ecosystem framing. */
  positioningTwoEcosystems:
    "Nebbos operates on both sides of the enterprise-AI equation — the governance side that CISO and Legal have to sign off on, and the training side that your ML platform team wishes existed.",

  /** Sales-line for the model-training angle. */
  positioningTrainingSubstrate:
    "Your operation is the training data. Nebbos captures every human decision as a preference pair, portable to any model you own or license.",

  /** Legal entity name (per project_nebbos_naming_ratified_2026_08_21). */
  legalEntity: "TR3I",
} as const;
