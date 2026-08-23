/**
 * Ecosystems data · Wave 3e · founder directive 2026-08-23:
 * "show the two catagories and make a map showing two ecosystems and
 *  nebbos being central living in both."
 *
 * Feeds `<EcosystemBridge>` — the SVG bridge visual on `/solutions/model-training`.
 * Two flanking ecosystems (Governance · Training-data), one central Nebbos spine,
 * edges showing which Nebbos primitive each ecosystem actor consumes.
 *
 * Design intent: quiet hairline circles for the flanking ecosystem actors,
 * filled orange circles for the Nebbos primitives. Nebbos = the one bright
 * thing in the middle everyone touches.
 */

export type EcoSide = "governance" | "training";

export type EcoActor = {
  id: string;
  name: string;
  role: string;
  side: EcoSide;
  /** Y position within the ecosystem cluster (0-1 range). */
  y: number;
};

export type NebbosPrimitive = {
  id: string;
  name: string;
  caption: string;
  /** Y position along the central spine (0-1 range). */
  y: number;
};

export type EcoEdge = { from: string; to: string };

export const ECOSYSTEMS: Record<EcoSide, { title: string; strap: string }> = {
  governance: {
    title: "AI governance",
    strap: "The compliance side. Legal, CISO, audit, the regulator.",
  },
  training: {
    title: "Model training",
    strap: "The revenue side. ML Platform, fine-tune, RLHF, eval.",
  },
};

export const ACTORS: EcoActor[] = [
  // Left ecosystem · Governance
  { id: "legal",       side: "governance", name: "VP Legal",           role: "Contract + regulatory",   y: 0.10 },
  { id: "ciso",        side: "governance", name: "CISO",               role: "Control framework",       y: 0.26 },
  { id: "compliance",  side: "governance", name: "Compliance Officer", role: "Retention + evidence",    y: 0.42 },
  { id: "auditor",     side: "governance", name: "Auditor",            role: "External audit pack",     y: 0.58 },
  { id: "euaiact",     side: "governance", name: "EU AI Act",          role: "Article 11 Annex IV",     y: 0.74 },
  { id: "soc2",        side: "governance", name: "SOC 2",              role: "Control activity",        y: 0.90 },

  // Right ecosystem · Training data
  { id: "mlplatform",  side: "training",   name: "ML Platform Lead",   role: "Integration surface",     y: 0.10 },
  { id: "finetune",    side: "training",   name: "Fine-tune service",  role: "Preference pairs in",     y: 0.26 },
  { id: "rlhf",        side: "training",   name: "RLHF firm",          role: "Behavior + preferences",  y: 0.42 },
  { id: "labeling",    side: "training",   name: "Labeling ops",       role: "Curated examples",        y: 0.58 },
  { id: "mlops",       side: "training",   name: "MLOps tooling",      role: "Corpus + monitoring",     y: 0.74 },
  { id: "eval",        side: "training",   name: "Eval suites",        role: "Rubric + edge cases",     y: 0.90 },
];

export const PRIMITIVES: NebbosPrimitive[] = [
  { id: "memory",       name: "Memory",       caption: "Every interaction, timestamped",    y: 0.12 },
  { id: "approval",     name: "Approval",     caption: "Every approve / reject / edit",     y: 0.30 },
  { id: "detectors",    name: "Detectors",    caption: "Every edge case flagged",           y: 0.48 },
  { id: "pearl",        name: "Pearl",        caption: "Every agent action + override",     y: 0.66 },
  { id: "apimcp",       name: "API + MCP",    caption: "One export contract",               y: 0.82 },
  { id: "attestation",  name: "Attestation",  caption: "Tamper-evident audit trail",        y: 0.94 },
];

/**
 * Edges from each actor to the Nebbos primitive it consumes.
 * Every ecosystem actor should terminate at 1-2 primitives.
 */
export const EDGES: EcoEdge[] = [
  // Governance side
  { from: "legal",       to: "attestation" },
  { from: "ciso",        to: "attestation" },
  { from: "ciso",        to: "approval" },
  { from: "compliance",  to: "attestation" },
  { from: "compliance",  to: "memory" },
  { from: "auditor",     to: "attestation" },
  { from: "auditor",     to: "memory" },
  { from: "euaiact",     to: "attestation" },
  { from: "euaiact",     to: "approval" },
  { from: "soc2",        to: "attestation" },
  { from: "soc2",        to: "approval" },

  // Training side
  { from: "mlplatform",  to: "apimcp" },
  { from: "finetune",    to: "memory" },
  { from: "finetune",    to: "approval" },
  { from: "rlhf",        to: "approval" },
  { from: "rlhf",        to: "pearl" },
  { from: "labeling",    to: "memory" },
  { from: "mlops",       to: "apimcp" },
  { from: "mlops",       to: "memory" },
  { from: "eval",        to: "pearl" },
  { from: "eval",        to: "detectors" },
];

/** Precomputed adjacency for O(1) hover-highlight neighborhood lookup. */
export const ECO_ADJACENCY: Record<string, Set<string>> = (() => {
  const map: Record<string, Set<string>> = {};
  for (const a of ACTORS) map[a.id] = new Set<string>();
  for (const p of PRIMITIVES) map[p.id] = new Set<string>();
  for (const e of EDGES) {
    map[e.from].add(e.to);
    map[e.to].add(e.from);
  }
  return map;
})();
