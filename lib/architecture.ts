/**
 * Nebbos 15-layer architecture · doctrine v2 Framing B (full-system).
 *
 * The load-bearing mental model rendered by `<ArchitectureGrid>`.
 * 5 bands × 3 layers, ordered foundation → surface.
 *
 * CONTENT RULE (per memory `artifact-governance-violation-2026-08-21`
 * and the `delta-brief-editorial` skill grep-block-list): NO internal
 * governance identifiers (GOV-*, ADR-*, PAT-*, FSR-*, SS-*, AD-*), NO
 * real credentials, NO internal table names, NO internal implementation
 * patterns by exact name. Every proof-point is a capability statement,
 * not an instance identifier. Illustrative language only.
 *
 * Band 1 · Substrate      (data that persists)
 * Band 2 · Boundary       (how the world crosses in and out)
 * Band 3 · Intelligence   (how the system reasons)
 * Band 4 · Agent + Gov    (who acts and who checks them)
 * Band 5 · Commerce       (how customers are provisioned and billed)
 *
 * Layer numbering: bottom-up (1 = deepest foundation, 15 = top surface).
 * Visual rendering orders bands top-to-bottom AS AN ARCHITECTURAL
 * CROSS-SECTION (Band 5 roof at top, Band 1 foundation at bottom).
 */

export type Layer = {
  /** Global 1-15 layer number (1 = deepest). */
  n: number;
  /** Which band (1 = substrate, 5 = commerce). */
  band: number;
  /** Layer name — shown big in the cell. Two words max. */
  name: string;
  /** One-line caption — shown small in the cell under the name. */
  caption: string;
  /** Detail paragraph — shown in the side panel when the cell is hovered/pinned. */
  detail: string;
  /** Capability proof-points — illustrative only, no internal identifiers. */
  proof: string[];
};

export type Band = {
  n: number;
  name: string;
  strap: string;
};

export const BANDS: Band[] = [
  { n: 1, name: "Substrate",    strap: "The data that persists." },
  { n: 2, name: "Boundary",     strap: "How the world crosses in and out." },
  { n: 3, name: "Intelligence", strap: "How the system reasons." },
  { n: 4, name: "Agent",        strap: "Who acts. Who checks them." },
  { n: 5, name: "Commerce",     strap: "How customers are provisioned and billed." },
];

export const LAYERS: Layer[] = [
  // ─── Band 1 · Substrate ────────────────────────────────────────────
  {
    n: 1,
    band: 1,
    name: "Data",
    caption: "schema · store · mapping",
    detail:
      "Every fact your company knows lives here as a typed row. A hardened relational store with vector search, row-level tenant isolation enforced by policy, and versioned migrations. The single source of what is true.",
    proof: [
      "Typed schema across every entity",
      "Row-level isolation by tenant",
      "Versioned migrations from day one",
    ],
  },
  {
    n: 2,
    band: 1,
    name: "Identity",
    caption: "auth · service tokens · trust",
    detail:
      "Who is who, and what they can do. Enterprise SSO for humans, service tokens for machines, workload identity for agents. Every request carries an identity that cascades through the isolation gate at the substrate.",
    proof: [
      "Enterprise SSO with SCIM provisioning",
      "Service · workload · device credentials",
      "Break-glass with full audit trail",
    ],
  },
  {
    n: 3,
    band: 1,
    name: "Departments",
    caption: "org · teams · people",
    detail:
      "Nebbos is department-first, not user-first. Teams, roles, schedules, coverage — all first-class. This is why a Shell fits a whole department and a Pearl learns how that department actually works.",
    proof: [
      "Departments modeled as first-class",
      "Coverage · schedules · presence",
      "Department-scoped orchestration",
    ],
  },

  // ─── Band 2 · Boundary ─────────────────────────────────────────────
  {
    n: 4,
    band: 2,
    name: "Ingest",
    caption: "webhooks · connectors · signals",
    detail:
      "The real-time entrance. Messaging, calendar, source-control, and unified HR/CRM/ticketing/accounting feeds. Raw inbound events land in an append-only log before anything else touches them.",
    proof: [
      "Messaging · calendar · source-control feeds",
      "Unified HR · CRM · ticketing · accounting",
      "Append-only inbound event log",
    ],
  },
  {
    n: 5,
    band: 2,
    name: "API + MCP",
    caption: "REST + MCP · one contract",
    detail:
      "The dual interface. Every capability exposed via REST for humans is exposed to agents through MCP against the same contract, same authorization, same limits. What you can do through the UI, an agent can do through a tool call.",
    proof: [
      "REST and MCP against one contract",
      "Same authorization on both surfaces",
      "Rate limits enforced uniformly",
    ],
  },
  {
    n: 6,
    band: 2,
    name: "Integrations",
    caption: "connector catalog · onboarding",
    detail:
      "How a customer plugs Nebbos into their existing stack. Named connectors for the tools that matter, OAuth adapters for the rest, and an onboarding wizard that walks a tenant from zero to first Pearl running in under a day.",
    proof: [
      "Named connector catalog",
      "OAuth adapters for long-tail sources",
      "Wizard-driven tenant onboarding",
    ],
  },

  // ─── Band 3 · Intelligence ─────────────────────────────────────────
  {
    n: 7,
    band: 3,
    name: "Memory",
    caption: "graph · embeddings · retrieval",
    detail:
      "Time-aware knowledge graph over vector search. High-dimensional semantic embeddings. Hybrid retrieval that answers from memory first and only calls a model when memory can't. Same team, month 24 vs month 1: roughly one-tenth the overage.",
    proof: [
      "Time-aware knowledge graph",
      "Semantic embeddings, high-dimensional",
      "Memory-first hybrid retrieval",
    ],
  },
  {
    n: 8,
    band: 3,
    name: "Reasoning",
    caption: "provider router · fallback · budget",
    detail:
      "A resilient router selects across frontier providers per query class, tracks budget in real time, and falls back cleanly when a provider degrades. Overage bills in Nebbos tokens — a stable currency decoupled from provider price swings.",
    proof: [
      "Multi-provider router",
      "Real-time budget tracking",
      "Graceful fallback on provider degradation",
    ],
  },
  {
    n: 9,
    band: 3,
    name: "Detectors",
    caption: "6 patterns · always watching",
    detail:
      "Six deterministic pattern detectors run continuously against the operational stream. Cheap to watch — a model call only fires when a pattern actually trips. This is why the cost curve bends down as your Cradle matures.",
    proof: [
      "Deadline · capacity · velocity · handoff · absence · cascade",
      "Continuous watching, deterministic",
      "Reasoning fires only when a pattern trips",
    ],
  },

  // ─── Band 4 · Agent + Governance ───────────────────────────────────
  {
    n: 10,
    band: 4,
    name: "Pearl · Shell",
    caption: "per-agent · per-department",
    detail:
      "Pearl is the reasoning agent — one per department, pre-educated on your work, learning independently. Shell is the department-scoped container that gives Pearl its boundaries. Six departments at a mid-size company means six Shells, each with its own Pearl.",
    proof: [
      "One Pearl per department",
      "Shell = department-scoped container",
      "Pre-educated · learns independently",
    ],
  },
  {
    n: 11,
    band: 4,
    name: "Approval",
    caption: "HITL · break-glass · autonomy",
    detail:
      "Every riskier move waits for a human. Approval inbox, handoffs, break-glass, human-only zones for the categories where an AI must never write. Autonomy is earned, bounded to what's been proven, and always reversible.",
    proof: [
      "Approval inbox · handoffs · resolution",
      "Human-only zones enforced",
      "Confidence-graded autonomy · reversible",
    ],
  },
  {
    n: 12,
    band: 4,
    name: "Orchestrator",
    caption: "cross-shell · durable · fault-tolerant",
    detail:
      "Cross-department coordination on durable workflows. Survives process restarts, retries with exponential backoff, records every state transition. This is how a handoff between Sales and Ops actually lands.",
    proof: [
      "Durable workflows · survives restarts",
      "Cross-department coordination",
      "Every state transition recorded",
    ],
  },

  // ─── Band 5 · Commerce ─────────────────────────────────────────────
  {
    n: 13,
    band: 5,
    name: "Tenant lifecycle",
    caption: "provisioning · SOW · offboarding",
    detail:
      "Sign, provision, onboard, expand, offboard — the full lifecycle. Tenant provisioning is automated after contract signature; scope-of-work and change-request flows are wired into the same substrate; offboarding preserves the audit trail per retention policy.",
    proof: [
      "Automated tenant provisioning",
      "Scope-of-work · change-requests · expansions",
      "Retention-preserving offboarding",
    ],
  },
  {
    n: 14,
    band: 5,
    name: "Billing",
    caption: "$150/user · Nebbos tokens · storage",
    detail:
      "One flat price: $150 per user per month, billed annually with a 15% prepay discount. AI-usage metering rolls overage into the same subscription as Nebbos tokens — a stable currency. Storage prices on separate lines.",
    proof: [
      "$150/user/mo flat · every seat, every capability",
      "Subscription · AI-usage metering",
      "Nebbos-token overage · storage on separate line",
    ],
  },
  {
    n: 15,
    band: 5,
    name: "Attestation",
    caption: "audit · compliance · EU AI Act",
    detail:
      "Tideline's four scrutiny tiers meet a tamper-evident audit trail. GDPR compliance register, EU AI Act Article 11 Annex IV pack, SOC 2 control-framework alignment. Not policy pages — enforced substrates.",
    proof: [
      "Tamper-evident audit trail",
      "Tideline · four scrutiny tiers · red lines",
      "GDPR · EU AI Act · retention CI-enforced",
    ],
  },
];

/**
 * Layers grouped by band for grid rendering. Bands ordered
 * top-to-bottom AS AN ARCHITECTURAL CROSS-SECTION — governance at
 * the top (Band 5, roof), substrate at the bottom (Band 1, foundation).
 */
export function layersByBandTopDown(): Array<{ band: Band; layers: Layer[] }> {
  return BANDS.slice()
    .reverse()
    .map((band) => ({
      band,
      layers: LAYERS.filter((l) => l.band === band.n),
    }));
}
