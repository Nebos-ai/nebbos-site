/**
 * content/brand.ts · Nebbos brand-vocabulary compliant revision 2026-09-14
 *
 * Platform + Tools + MCP + USB doctrine ratified 2026-09-14
 * (feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14).
 * On customer-facing surfaces at nebbos.ai the main product is THE PLATFORM,
 * its TOOLS, the MCP's system abilities, and the SECURITY OF THE USB. Prior
 * "run layer for AI-native operations" hero framing (2026-09-11 revision) is
 * superseded on customer surfaces; retained as internal engineering register.
 *
 * Canonical vocabulary:
 *   Use: Platform          (Nebbos = the operator platform)
 *   Use: Tools             (what the platform provides)
 *   Use: MCP               (the capability layer — Model Context Protocol)
 *   Use: USB               (the hardware-attested security substrate)
 *   Use: Pearl             (per-domain runtime — brand name, unchanged)
 *   Use: security · sovereignty · biometric · attested   (2026-09-14 doctrine set)
 *
 * Retained as internal / technical register (NOT customer-hero framing):
 *   run layer, executor, metered, isolated, modular, substrate, architecture
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
 *   2026-09-11 → 2026-09-14: "run layer for AI-native operations" as HERO
 *                            → platform + tools + MCP + USB. Per doctrine
 *                            feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14.
 *                            Run-layer language retained internally; customer
 *                            hero framing leads with the four pillars.
 */

export const BRAND = {
  /** Legal / display name of the product. */
  name: "Nebbos",

  /** Home-page hero title (canonical, most reused). */
  taglineShort: "The platform. Its tools. Its MCP. Its USB.",

  /** Slightly longer version used in <title> tags. */
  taglineLong:
    "The platform your operators live in — its tools, its MCP's system abilities, the security of its USB.",

  /** Category the company sits in — market label used in press / SEO only. */
  category: "Operator platform with hardware-attested MCP",

  /** Home hero deck under the title. */
  homeDeck:
    "A platform. The tools it gives operators. The MCP that runs its capabilities. The USB that gates its authority. Four things — one product.",

  /** Sub-category for AI-first buyers (Wave 3e model-training angle). */
  categorySecondary: "USB-attested MCP substrate for enterprise operators",

  /** One-line site description (SEO meta + share previews). */
  descriptionShort:
    "Nebbos is the operator platform whose tools ship as MCP capabilities and whose privileged actions are gated by the USB you keep with you. Biometric approves; USB attests; MCP executes.",

  /** Long-form site description (for landing-page bodies + doc). */
  descriptionLong:
    "Nebbos is the platform your operators live in. Its tools are the concrete verbs — Pearls, workflows, memory operations — that the platform gives your team. Its MCP is the capability surface every tool routes through, the same substrate whether the caller is a browser, a native desktop, a mobile app, or a headless orchestrator. Its USB is the hardware-attested credential that gates privileged actions: without it in the port, elevated capabilities are not available; with it in the port, biometric approves per-action and photographic audit-frames prove who approved what.",

  /** Positioning one-liner for the two-ecosystem framing. */
  positioningTwoEcosystems:
    "Nebbos operates on both sides of the enterprise-AI equation — the governance side that CISO and Legal have to sign off on, and the execution side that your platform team needs when general-purpose runtimes can't be trusted with production systems.",

  /** Sales-line for the model-training angle. */
  positioningTrainingSubstrate:
    "Your operation is the training data. Nebbos captures every human decision as a preference pair, portable to any model you own or license.",

  /** Legal entity name (per project_nebbos_naming_ratified_2026_08_21). */
  legalEntity: "TR3I",
} as const;
