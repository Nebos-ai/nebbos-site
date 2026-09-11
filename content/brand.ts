/**
 * content/brand.ts · Nebbos brand-vocabulary compliant revision 2026-09-11
 *
 * Run-layer north-star ratified 2026-09-11 (reference_nebbos_north_star_run_layer_architecture):
 * Nebbos is a RUN LAYER — the metered, isolated, modular executor between operator
 * intent and enterprise state. Prior "operating system for the AI-native enterprise"
 * framing (2026-08-23 revision) is superseded — see supersede-log below.
 *
 * Canonical vocabulary:
 *   Use: run layer         (north-star architectural category, 2026-09-11)
 *   Use: executor          (what Nebbos is, mechanically)
 *   Use: Pearl             (per-domain runtime — brand name, unchanged)
 *   Use: metered / isolated / modular (the three properties)
 *   Use: architecture      (technical / substrate register)
 *
 * NEVER on customer surfaces (vocab-guard enforced):
 *   NEVER: agent, agents, AI agent, chatbot (vendor framing forbidden)
 *   NEVER: tenant, multi-tenant (architecture-internal only, not customer copy)
 *
 * Grep-block-list: this file (and every consumer) MUST pass `scripts/check-vocab.sh`
 * before it can be published. Any hit is a defect.
 *
 * When you change a value here, grep first (many pages import a subset):
 *   grep -rn "from \"@/content/brand\"" app/ components/ lib/
 *
 * Supersede-log:
 *   2026-08-23 → 2026-09-11: "operating system for the AI-native enterprise" +
 *                            "company brain" + "fifteen governance layers"
 *                            → run-layer voice. Per run-layer north-star.
 */

export const BRAND = {
  /** Legal / display name of the product. */
  name: "Nebbos",

  /** Home-page hero title (canonical, most reused). */
  taglineShort: "The run layer for AI-native operations.",

  /** Slightly longer version used in <title> tags. */
  taglineLong:
    "The run layer for AI-native operations — a metered, isolated, modular executor between operator intent and enterprise state.",

  /** Category the company sits in — market label used in press / SEO only. */
  category: "Run-layer substrate for enterprise AI",

  /** Home hero deck under the title. */
  homeDeck:
    "Metered. Isolated. Modular. The executor between your team's intent and your systems of record.",

  /** Sub-category for AI-first buyers (Wave 3e model-training angle). */
  categorySecondary: "MCP substrate for enterprise",

  /** One-line site description (SEO meta + share previews). */
  descriptionShort:
    "Nebbos is a run layer — the metered, isolated, modular executor between operator intent and enterprise state. Every action metered. Every context isolated. Every capability modular.",

  /** Long-form site description (for landing-page bodies + doc). */
  descriptionLong:
    "Nebbos is the run layer that sits between what your operators want done and what your systems actually run. Each Pearl — a domain-specialized runtime — executes work inside its own metered sandbox. You see what it cost, you see what it touched, you see what it produced. Every execution is portable to you: memory intact, work history intact, if you ever leave the platform.",

  /** Positioning one-liner for the two-ecosystem framing. */
  positioningTwoEcosystems:
    "Nebbos operates on both sides of the enterprise-AI equation — the governance side that CISO and Legal have to sign off on, and the execution side that your platform team needs when general-purpose runtimes can't be trusted with production systems.",

  /** Sales-line for the model-training angle. */
  positioningTrainingSubstrate:
    "Your operation is the training data. Nebbos captures every human decision as a preference pair, portable to any model you own or license.",

  /** Legal entity name (per project_nebbos_naming_ratified_2026_08_21). */
  legalEntity: "TR3I",
} as const;
