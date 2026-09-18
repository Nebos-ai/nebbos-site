/**
 * content/hero-flower-terms.ts · Nebbos.ai home-hero flower-split registry
 *
 * The 19 rings of the Nebbos flower-of-life mark are the 19 aspects a
 * company operates on. The home hero opens with the rings unified into the
 * mark, then fans them out; each ring carries one term + one Nebbos-lens
 * blurb + a link to where that term lives in the platform.
 *
 * Order is BUSINESS-LENS importance-ranked (institutional / regulated /
 * government buyer priority stack: security-first, compliance-adjacent,
 * with sovereignty and continuity ranked above operational tooling). Rank
 * 1 = center ring in the final split layout, 19 = furthest satellite. The
 * split animation reveals rings in this same order — Security lands first
 * ~250ms after trigger, Collaboration last ~3s in.
 *
 * Blurb voice: entity-attribution (Nebbos, not founder-name), 25–35 words,
 * one claim + one proof/restatement. Product voice not marketing voice —
 * describes what Nebbos DOES about the term, not why it matters generically.
 *
 * Founder-directed 2026-09-17: "when you click there should be a little
 * blurb about it thru the nebbos lens and you can order it from level of
 * importantance thru the busniess lens" — captured verbatim to memory
 * archive, paraphrased above for shared-surface entity-voice discipline per
 * feedback_data_classification_chat_contents_private_entity_attribution_only_2026_09_16.
 */

export type HeroFlowerTerm = {
  /** Kebab-case slug — used as the ring's SVG id and the anchor target. */
  key: string;
  /** Display term (one word, title case). */
  label: string;
  /** Nebbos-lens blurb shown when the ring is clicked. 25–35 words. */
  blurb: string;
  /** Where clicking "Learn more" from the blurb card routes to. */
  learnMoreHref: string;
  /**
   * Ring position in the source SVG's <path> order (0-indexed). Ties the
   * DOM ring to the term at animation time. Currently sequential — the
   * component reads `key` and the SVG's paths in document order.
   */
  ringIndex: number;
};

/**
 * Business-lens importance-ranked. Index 0 = highest priority (center ring
 * in the split layout, first term to fade in on reveal).
 */
export const HERO_FLOWER_TERMS: readonly HeroFlowerTerm[] = [
  {
    key: "security",
    label: "Security",
    blurb:
      "Every action requires biometric approval and hardware attestation. A breach demands physical possession of your Cradle, your fingerprint, and an enclave signature. Not policy. Architecture.",
    learnMoreHref: "/security",
    ringIndex: 0,
  },
  {
    key: "compliance",
    label: "Compliance",
    blurb:
      "Every operation writes a hash-chained audit event. The substrate is designed against SOC 2, ISO 27001, and EU AI Act Annex IV controls — certification is in progress; the audit trail is production. Full status at /compliance.",
    learnMoreHref: "/compliance",
    ringIndex: 1,
  },
  {
    key: "continuity",
    label: "Continuity",
    blurb:
      "Your memory, your Pearls, your policies are portable to any Nebbos deployment. When you leave a provider, you take your operating substrate with you.",
    learnMoreHref: "/products/platform",
    ringIndex: 2,
  },
  {
    key: "sovereignty",
    label: "Sovereignty",
    blurb:
      "You own the substrate you run on. No provider lock-in on your data plane, your keys, or your operators. The moat is yours to keep.",
    learnMoreHref: "/products/platform",
    ringIndex: 3,
  },
  {
    key: "governance",
    label: "Governance",
    blurb:
      "Every consequential decision gates on the approval graph you define. Policy lives in code, not in a PDF. Ratification is a signed ceremony with a hash-chained trail.",
    learnMoreHref: "/trust",
    ringIndex: 4,
  },
  {
    key: "audit",
    label: "Audit",
    blurb:
      "Every event hash-chained end-to-end. Replay-proof, tamper-evident, discovery-ready. Auditors read the chain directly; there is no summary layer to mistrust.",
    learnMoreHref: "/trust",
    ringIndex: 5,
  },
  {
    key: "attestation",
    label: "Attestation",
    blurb:
      "The Nebbos MCP verifies factors on the server before executing. Client claims are refused. The truth of what happened lives outside any operator's authority.",
    learnMoreHref: "/products/mcp",
    ringIndex: 6,
  },
  {
    key: "identity",
    label: "Identity",
    blurb:
      "Five-tier identity from consumer to founder, biometric-bound at every level. Every action carries the identity that took it — no shared credentials, ever.",
    learnMoreHref: "/products/platform",
    ringIndex: 7,
  },
  {
    key: "approval",
    label: "Approval",
    blurb:
      "Elevated actions require biometric plus Nebbos Cradle physical presence. Approval is architectural — the platform refuses to execute without the factors.",
    learnMoreHref: "/products/cradle",
    ringIndex: 8,
  },
  {
    key: "cost",
    label: "Cost",
    blurb:
      "Every model call metered at provider cost with quarterly reconciliation. No fixed markup that grows with your workload. A team's month-24 spend runs a tenth of month-1.",
    learnMoreHref: "/products/platform",
    ringIndex: 9,
  },
  {
    key: "memory",
    label: "Memory",
    blurb:
      "Every fact your operation knows lives in one queryable graph. Portable, versioned, yours. The graph answers from itself first; a model runs only when it can't.",
    learnMoreHref: "/products/platform",
    ringIndex: 10,
  },
  {
    key: "domains",
    label: "Domains",
    blurb:
      "Every domain runs in an isolated Shell. Cross-boundary reads are a ceremony, not an accident. Your finance data cannot leak into a marketing prompt.",
    learnMoreHref: "/solutions",
    ringIndex: 11,
  },
  {
    key: "workflow",
    label: "Workflow",
    blurb:
      "Every operator runs Pearls in metered, isolated, modular executors. Same engineering discipline as your production infrastructure. Fleet-wide governance in one plane.",
    learnMoreHref: "/how",
    ringIndex: 12,
  },
  {
    key: "knowledge",
    label: "Knowledge",
    blurb:
      "Time-aware knowledge graph answers from institutional memory first; frontier models run only when memory can't. Every query resolves to the same truth for everyone.",
    learnMoreHref: "/products/platform",
    ringIndex: 13,
  },
  {
    key: "automation",
    label: "Automation",
    blurb:
      "Pearls per domain — one for finance, one for legal, one for ops. Each metered, isolated, and modular. Compound institutional intelligence, not brittle scripts.",
    learnMoreHref: "/how",
    ringIndex: 14,
  },
  {
    key: "optimization",
    label: "Optimization",
    blurb:
      "A resilient router selects across frontier providers per query class, tracking budget in real time, falling back cleanly when one degrades. Efficiency compounds.",
    learnMoreHref: "/products/platform",
    ringIndex: 15,
  },
  {
    key: "analytics",
    label: "Analytics",
    blurb:
      "Metrics, logs, traces, and audit shards wired from your first deploy. Not a follow-up quarter. Every decision is measurable against the state before and after.",
    learnMoreHref: "/products/platform",
    ringIndex: 16,
  },
  {
    key: "communication",
    label: "Communication",
    blurb:
      "Messaging integrates natively with Slack, email, and your own tools. Every message a first-class entity with the same audit chain as every other action.",
    learnMoreHref: "/products/platform",
    ringIndex: 17,
  },
  {
    key: "collaboration",
    label: "Collaboration",
    blurb:
      "Every operator works at exactly their identity level. Delegation flows through the same approval graph as every other decision — nothing consequential ships without a named human proving they are the human.",
    learnMoreHref: "/products/platform",
    ringIndex: 18,
  },
] as const;

/** Compile-time invariant — must match the 19 ring paths in the flower mark. */
export const HERO_FLOWER_TERM_COUNT = HERO_FLOWER_TERMS.length;
