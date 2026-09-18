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

  /** Home-page hero title (canonical, most reused).
   *  Supersede-log 2026-09-18: "Infrastructure for AI operators." was
   *  category-defining but sausage — a buyer looking for a sovereign AI
   *  brain does not want to hear "infrastructure." They want to hear
   *  what it DOES for their operation. Founder-directed rewrite to
   *  outcome-first framing: "sovereign brain for your operation."
   *  Prior supersede-log 2026-09-17: "The platform. Its tools. Its MCP.
   *  Its Cradle." → "Infrastructure for AI operators." (now retired). */
  taglineShort: "A sovereign brain for your operation.",

  /** Slightly longer version used in <title> tags. */
  taglineLong:
    "Infrastructure for AI operators. Every action attested. Every credential on hardware. Every substrate yours to take with you.",

  /** Category the company sits in — market label used in press / SEO only. */
  category: "Operator infrastructure",

  /** Home hero deck under the title.
   *  Founder-directed 2026-09-18 (verbatim critique on the substrate/
   *  cert/hashchain-heavy prior deck): "do you go to the restaurant and
   *  say what's in the sausage or do you eat it if it looks good taste
   *  good." Rewrite: outcome-first, department-centric, buyer-scoped.
   *  Every clause names something the buyer will feel in their week. */
  homeDeck:
    "A Pearl for every department. Finance closes without you chasing. Ops covers the shift without a war room. Care gets to think about care. Runs on hardware you own; ships your memory back when you leave.",

  /** CANONICAL HIGHLIGHTS · v1 · 2026-09-18
   *  Founder-directed: "the website and the marketing materials all
   *  need to have the same tone language highlights."
   *
   *  These four phrases ARE the brand voice — every website page,
   *  every deck, every one-pager, every sales email pulls from this
   *  set. Change one here and every touchpoint changes together.
   *
   *  Ordering matters — first phrase leads every material. */
  highlights: [
    "A Pearl for every department.",
    "Finance closes without you chasing. Ops covers the shift without a war room. Care gets to think about care.",
    "Runs on hardware you own.",
    "Ships your memory back when you leave.",
  ],

  /** Named departments Nebbos ships Pearls for (customer-facing).
   *  Same set used across home, /solutions, decks. */
  flagshipDepartments: [
    { name: "Finance",     outcome: "Monthly close without the war room." },
    { name: "Operations",  outcome: "Coverage, handoffs, on-call — quiet." },
    { name: "People",      outcome: "Onboarding runs. Retention risks surface early." },
    { name: "Care",        outcome: "Coordination, compliance, follow-ups." },
  ],

  /** Sub-category for AI-first buyers (Wave 3e model-training angle). */
  categorySecondary: "Hardware-attested infrastructure for the AI-native operator",

  /** One-line site description (SEO meta + share previews). */
  descriptionShort:
    "A Pearl for every department. Runs on hardware you own. Ships your memory back when you leave.",

  /** Long-form site description (for landing-page bodies + doc). */
  descriptionLong:
    "Nebbos is the platform your operators live in. Its tools are the concrete verbs — Pearls, workflows, memory operations — that the platform gives your team. Its MCP is the capability surface every tool routes through, the same substrate whether the caller is a browser, a native desktop, a mobile app, or a headless orchestrator. Its Cradle is the hardware-attested credential that gates privileged actions: without it in the port, elevated capabilities are not available; with it in the port, biometric approves per-action and photographic audit-frames prove who approved what.",

  /** Positioning one-liner for the two-ecosystem framing. */
  positioningTwoEcosystems:
    "Nebbos operates on both sides of the enterprise-AI equation — the governance side that CISO and Legal have to sign off on, and the execution side that your platform team needs when general-purpose runtimes can't be trusted with production systems.",

  /** Sales-line for the model-training angle. */
  positioningTrainingSubstrate:
    "Your operation is the training data. Nebbos captures every human decision as a preference pair, portable to any model you own or license.",

  /**
   * Three-tier corporate taxonomy (per session 3c918563 message-board note
   * 2026-09-16 12:34Z + founder ratification during nebbos-signature.html
   * iteration). Extends the 2026-09-16 08:00Z rename doctrine by adding
   * the AI operating tier that was missing from the initial two-tier form.
   *
   * Structure top-to-bottom:
   *   1. Nebbos Technologies Corp · Wilmington, Delaware (US parent)
   *   2. Nebbos AI · Los Angeles, California (AI product/business unit)
   *   3. Nebbos D.O.O. · Beograd, Serbia (Serbian operating subsidiary)
   *
   * `legalEntity` remains the Serbian tier name for legacy footer usage
   * (single-line copyright). `parentEntity` remains the US parent. The
   * new `aiEntity` fills the middle tier. Full colophon = all three.
   */
  legalEntity: "Nebbos D.O.O.",
  legalEntityLocation: "Beograd, Serbia",

  /** US parent entity (Delaware C-Corp). */
  parentEntity: "Nebbos Technologies Corp",
  parentEntityLocation: "Wilmington, Delaware",

  /** AI product/business unit — the middle tier. */
  aiEntity: "Nebbos AI",
  aiEntityLocation: "Los Angeles, California",
} as const;
