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
  /** WHO uses / runs / owns this layer (optional, cascades to placeholder when absent) */
  who?: string;
  /** WHERE this layer sits in the architecture (upstream / downstream) */
  where?: string;
  /** WHEN this layer matters — situations that trigger it */
  when?: string[];
  /** WHY this layer is worth caring about — the compounding value */
  why?: string;
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
  { n: 4, name: "Action",       strap: "Who acts. Who approves. Who is on the hook." },
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
    who: "Every Pearl your enterprise runs. Every human who queries the source of truth. Your CISO when they audit which rows any given call touched.",
    where: "Bottom of the stack — the deepest foundation. Every layer above (Identity, Departments, Ingest, Memory, all fifteen) depends on this substrate being sound.",
    when: [
      "Any new capability starts here — schema first",
      "Any audit — the row-level trail comes from here",
      "Any migration — versioned schema means safe rollout",
      "Any tenant isolation question — policy enforced at this layer",
    ],
    why: "One typed source of truth means every downstream layer trusts the data it reads. Row-level tenant isolation at the substrate means no application-layer bug can leak across tenants. Versioned migrations from day one mean schema changes ship without downtime.",
  },
  {
    n: 2,
    band: 1,
    name: "Identity",
    caption: "auth · service tokens · trust",
    detail:
      "Who is who, and what they can do. Enterprise SSO for humans, service tokens for machines, workload identity for every Pearl running on the tenant. Every request carries an identity that cascades through the isolation gate at the substrate.",
    proof: [
      "Enterprise SSO with SCIM provisioning",
      "Service · workload · device credentials",
      "Break-glass with full audit trail",
    ],
    who: "Every human logging in via enterprise SSO. Every Pearl operating under a workload identity. Every machine caller with a service token. Your CISO when they answer &lsquo;who did this&rsquo;.",
    where: "Sits at the substrate. Every request — human or Pearl — carries an identity that cascades into row-level isolation at Layer 1. The origin point of every audit line.",
    when: [
      "Onboarding a new department — SCIM auto-provisions",
      "Rotating credentials — break-glass with full audit",
      "Answering an incident — every action traces to an identity",
      "Passing a SOC 2 audit",
    ],
    why: "Identity is what makes the audit trail meaningful. Without it, every action is anonymous. With it, every action has an accountable actor — human, Pearl, or machine — and every access is checked against the same policy.",
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
    who: "Your CFO, VP Ops, Head of People — the human departments a Pearl runs for. Also the Pearl itself, which is scoped to one department at a time.",
    where: "Sits at the substrate. Everything above (Ingest, Memory, Pearl, Approval) is scoped BY department. Nebbos is department-first, not user-first.",
    when: [
      "You&rsquo;re deploying a new Pearl — it inherits department scope",
      "You&rsquo;re setting on-call rotation — Departments carries it",
      "You&rsquo;re structuring approval — approvers are per-department roles",
      "You&rsquo;re computing per-department cost — attribution lives here",
    ],
    why: "Real work happens in departments, not in individual users&rsquo; silos. Modeling departments as first-class means a Pearl fits the way your enterprise is actually structured, and coverage / handoffs / approvals work the way your teams already work.",
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
    who: "Every source system that emits a signal — Slack, Google Calendar, GitHub, HR, CRM, ticketing, accounting. The Pearls that consume those signals downstream.",
    where: "Sits at the boundary. Everything above (API + MCP, Integrations, Memory, Reasoning) reads from what Ingest lands. Every raw event first lands here before any interpretation touches it.",
    when: [
      "You&rsquo;re connecting a new source system to a Pearl",
      "You&rsquo;re debugging why a Pearl missed an event",
      "You&rsquo;re computing signal-to-noise on incoming feeds",
      "You&rsquo;re proving to an auditor that no event was silently dropped",
    ],
    why: "Append-only means every event survived. Land-before-touch means no interpretation happens without an original record. Together they make the ingest layer the immutable ground truth every downstream layer can trust.",
  },
  {
    n: 5,
    band: 2,
    name: "API + MCP",
    caption: "REST + MCP · one contract",
    detail:
      "The dual interface. Every capability exposed via REST for humans is exposed to Pearls and integrations through MCP against the same contract, same authorization, same limits. What you can do through the UI, a Pearl can do through a tool call.",
    proof: [
      "REST and MCP against one contract",
      "Same authorization on both surfaces",
      "Rate limits enforced uniformly",
    ],
    who: "Every Pearl running inside your tenant, every integration your team wires in, every external system that needs to read from or write to Nebbos. Your engineers when they build against Nebbos. Your CISO when they audit which calls hit which endpoints.",
    where: "Sits at the boundary — between the substrate below (Data · Identity · Departments) and the world above (Ingest · Integrations). Every call from a Pearl to any Nebbos capability crosses this layer. Every third-party integration crosses this layer. The single choke point for authorization + rate limits + audit.",
    when: [
      "You&rsquo;re building an integration that reads Nebbos data",
      "You&rsquo;re wiring a Pearl to act on external systems",
      "Your CISO asks how machine callers authenticate",
      "You need one audit trail across UI + programmatic access",
      "You&rsquo;re rate-limiting a runaway agent-driven workload",
    ],
    why: "One contract eliminates the divergence problem where the UI can do things the API can&rsquo;t (or vice versa). Every capability is exposed identically to humans and to Pearls, so there&rsquo;s no shadow API surface for the security team to worry about. The MCP layer means any modern AI model — yours, a provider&rsquo;s, or a future one — can call Nebbos tools without a bespoke wrapper. Uniform rate limits mean a misbehaving Pearl can&rsquo;t take down the humans who share its tenant.",
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
    who: "Your engineering team when they wire Nebbos to your existing stack. Your solutions engineer during the onboarding sprint. Every Pearl that acts on external systems.",
    where: "Sits at the boundary — the connective tissue between Nebbos and everything else your enterprise runs. Feeds Ingest upstream and gets called by Pearls downstream.",
    when: [
      "You&rsquo;re onboarding a new tenant — the wizard runs here",
      "You&rsquo;re expanding a Pearl to a new source system",
      "You&rsquo;re rotating credentials on a connector",
      "You&rsquo;re evaluating whether Nebbos fits your stack",
    ],
    why: "Named connectors for the tools that matter mean you&rsquo;re wired in without custom glue. OAuth adapters for the long tail mean nothing is unreachable. A wizard-driven onboarding means a tenant goes from zero to first Pearl running in under a day.",
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
    who: "Every Pearl reasoning across your enterprise&rsquo;s accumulated work. Your team when they query institutional knowledge. Your CFO when they compute the compounding return on Nebbos&rsquo;s AI investment.",
    where: "Sits at the intelligence band. Reads from the Data substrate. Serves the Reasoning + Detectors layers. Feeds every Pearl&rsquo;s context. Compounds every quarter.",
    when: [
      "A Pearl needs to answer from context — Memory answers first",
      "A team member searches institutional knowledge",
      "You&rsquo;re measuring inference-of-revenue KPI trend",
      "You&rsquo;re computing per-Pearl memory cost vs new-model cost",
    ],
    why: "Memory-first hybrid retrieval means you&rsquo;re paying for a model call only when memory genuinely can&rsquo;t answer. Same team, month 24 vs month 1: roughly one-tenth the overage. This is the compounding-value layer — the moat that grows with use.",
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
    who: "Every Pearl doing analytical work. Your ML platform team when they set per-tenant model routing policy. Your CFO when they audit provider-mix and budget-vs-actual.",
    where: "Sits at the intelligence band. Consumes Memory + Data. Feeds Detectors + Pearl. Every model call passes through this router.",
    when: [
      "A Pearl needs a model call for something Memory can&rsquo;t answer",
      "A provider degrades — router falls back cleanly",
      "Budget approaches ceiling — router downshifts to cheaper models",
      "You&rsquo;re evaluating a new frontier model provider",
    ],
    why: "Multi-provider routing means you&rsquo;re never locked to one vendor&rsquo;s roadmap or pricing. Real-time budget tracking means AI-usage overage never surprises the CFO. Overage bills in Nebbos tokens — a stable currency decoupled from provider price swings.",
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
    who: "Your operations team when a Pearl flags something worth attention. Your CISO for security-relevant detections. Every Pearl monitoring its own department&rsquo;s signal.",
    where: "Sits at the top of the intelligence band. Consumes Ingest + Memory + Reasoning. Signals into Pearl (which decides whether to act) and Approval (which decides whether to green-light).",
    when: [
      "Something is about to break in your operation",
      "A pattern that&rsquo;s usually benign becomes concerning",
      "A signal crosses a threshold your team defined",
      "A compliance-relevant event needs escalation",
    ],
    why: "Every enterprise is drowning in event streams. Detectors turn that noise into a few concrete &lsquo;about to break&rsquo; items a human actually cares about. Fewer false positives, no missed real ones. The layer that turns your data into decisions.",
  },

  // ─── Band 4 · Agent + Governance ───────────────────────────────────
  {
    n: 10,
    band: 4,
    name: "Pearl · Shell",
    caption: "Nebbos [Domain] · per-department brain",
    detail:
      "Pearl is the per-department brain — one per department, pre-educated on your work, tuned by use. Every Pearl starts as a Nebbos General (Nebbos General Design, Nebbos General Finance, Nebbos General Operations) — the latest version of that function&rsquo;s brain shipped by Nebbos. Deploy it, and it learns your team. Shell is the department-scoped container that gives each Pearl its boundaries. Six departments = six Shells, each with its own tuned Pearl.",
    proof: [
      "One Pearl per department",
      "Shell = department-scoped container",
      "Pre-educated · learns independently",
    ],
    who: "The department the Pearl serves — Nebbos Design serves your product team, Nebbos Finance serves your finance team. Your CTO when they authorize a new Pearl. The Pearl itself as it learns your team&rsquo;s specific work.",
    where: "Sits at the agent band — the visible product surface for the customer. Consumes everything below (Memory · Reasoning · Detectors). Gates every action through Approval before hitting Orchestrator.",
    when: [
      "You&rsquo;re deploying a new department Pearl — this is what runs",
      "The Pearl learns your team&rsquo;s specific patterns",
      "You&rsquo;re measuring per-Pearl value and accuracy",
      "You&rsquo;re offboarding — Pearl is portable to you with memory intact",
    ],
    why: "Pearl is the per-department brain — the visible thing your team interacts with. Shell is the container that gives it boundaries. Every Pearl starts as a Nebbos General (base version) and tunes to your team through use. At month 24 your Pearl is measurably better than at month 1 — and it&rsquo;s portable to you if you ever leave.",
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
    who: "The human in the loop — department heads, compliance officers, whoever holds the sign-off authority. Your CISO when they audit which humans approved which actions.",
    where: "Sits at the agent band. Every consequential Pearl action passes through this gate. If not approved, doesn&rsquo;t hit Orchestrator (the layer that actually executes).",
    when: [
      "A Pearl proposes an action with non-trivial consequences",
      "A compliance-relevant workflow needs human sign-off",
      "An emergency escalation needs immediate human attention",
      "An audit asks &lsquo;who approved this action&rsquo;",
    ],
    why: "Approval is what makes autonomous action safe. Not every Pearl action needs human sign-off, but the ones that do are held here and attested — you always have a receipt showing which human said yes. This is the difference between an AI system and an accountable operating system.",
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
    who: "Every approved Pearl action gets scheduled through here. Your on-call operations lead when they need to see the execution queue. The Pearl itself as it dispatches work.",
    where: "Sits at the top of the agent band. Consumes from Approval (the queue of approved actions). Dispatches into external systems via Integrations.",
    when: [
      "An approved action needs to be scheduled and tracked",
      "Multiple Pearls need coordinated execution",
      "An action fails — retry and fallback logic runs here",
      "You&rsquo;re computing throughput and latency per Pearl",
    ],
    why: "One place where every executed action gets tracked from schedule to outcome. Failures don&rsquo;t disappear silently — they&rsquo;re retried, escalated, and attested. This is where the audit trail becomes an operational tool, not just a compliance artifact.",
  },

  // ─── Band 5 · Commerce ─────────────────────────────────────────────
  {
    n: 13,
    band: 5,
    name: "Onboarding",
    caption: "provisioning · SOW · offboarding",
    detail:
      "Sign, provision, onboard, expand, offboard — the full lifecycle. Tenant provisioning is automated after contract signature; scope-of-work and change-request flows are wired into the same substrate; offboarding preserves the audit trail per retention policy.",
    proof: [
      "Automated tenant provisioning",
      "Scope-of-work · change-requests · expansions",
      "Retention-preserving offboarding",
    ],
    who: "New Nebbos tenants coming online. Your solutions engineer during the initial sprint. Your legal team signing the DPA and MSA. Existing tenants when they add a new department Pearl.",
    where: "Sits at the commerce band. The customer&rsquo;s entry into Nebbos. Feeds all substrate + intelligence + agent layers with the identity and structure the tenant will run on.",
    when: [
      "You&rsquo;re signing an MSA and DPA to become a Nebbos tenant",
      "You&rsquo;re expanding an existing tenant to a new department",
      "You&rsquo;re renewing or restructuring an engagement",
      "You&rsquo;re offboarding — this layer preserves the audit trail per your retention policy",
    ],
    why: "Onboarding-through-offboarding is one continuous accountable flow, not a series of disjoint handoffs. Every state your tenancy is in is a first-class object with an owner and an audit line. When you leave someday, your data, your memory, your Pearls all come with you.",
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
    who: "Your CFO or Head of Finance. The Nebbos accounting team. Any Pearl that needs to compute per-department cost attribution.",
    where: "Sits at the commerce band. Consumes usage from every layer that spends AI budget (primarily Reasoning). Reports to your CFO via monthly invoice and real-time dashboard.",
    when: [
      "Monthly close — invoice generates from usage",
      "AI overage — bills in stable Nebbos tokens",
      "You&rsquo;re forecasting next quarter&rsquo;s per-department AI spend",
      "You&rsquo;re comparing Nebbos cost against ROI on saved head-count",
    ],
    why: "One flat per-seat price for the substrate + governance layers means budget predictability. AI overage in stable Nebbos tokens means provider price swings don&rsquo;t move your line item. Every dollar spent is traceable back to a specific Pearl action on a specific tenant — the whole spend is legible.",
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
    who: "Your CISO. Your general counsel. Your auditor. Your regulator. Any human who needs to prove after the fact that a specific action was authorized, executed, and accounted for.",
    where: "Sits at the very top of the commerce band. Consumes signals from every layer below — every approval, every action, every billing event lands in the attestation stream.",
    when: [
      "An auditor asks for evidence of a specific action&rsquo;s authorization",
      "A regulator asks for the audit trail of a compliance-relevant workflow",
      "A dispute arises over what happened when",
      "You&rsquo;re preparing an EU AI Act Article 11 Annex IV pack",
    ],
    why: "Attestation is what makes Nebbos defensible. Every Pearl action, every human approval, every model call, every billing event lands in an append-only stream that maps to a hash chain your regulator can verify. This is what turns &lsquo;we run an AI operating system&rsquo; into &lsquo;we run an audited AI operating system.&rsquo;",
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

/**
 * Knowledge-graph edges · Wave 2D · founder directive 2026-08-23:
 * "your table should look like a knowledge graph with each point being a note."
 *
 * Two edge kinds:
 * - `peer` — within-band cohesion; the 3 layers of a band reinforce each other.
 * - `depends` — cross-band dependency; a higher layer requires a lower one.
 *
 * Rendered by `<ArchitectureGraph>` as SVG curves between node positions.
 */
export type EdgeKind = "peer" | "depends";
export type Edge = { from: number; to: number; kind: EdgeKind };

export const EDGES: Edge[] = [
  // Band 1 peer triangle · Substrate
  { from: 1, to: 2, kind: "peer" },
  { from: 2, to: 3, kind: "peer" },
  { from: 1, to: 3, kind: "peer" },
  // Band 2 peer triangle · Boundary
  { from: 4, to: 5, kind: "peer" },
  { from: 5, to: 6, kind: "peer" },
  { from: 4, to: 6, kind: "peer" },
  // Band 3 peer triangle · Intelligence
  { from: 7, to: 8, kind: "peer" },
  { from: 8, to: 9, kind: "peer" },
  { from: 7, to: 9, kind: "peer" },
  // Band 4 peer triangle · Agent
  { from: 10, to: 11, kind: "peer" },
  { from: 11, to: 12, kind: "peer" },
  { from: 10, to: 12, kind: "peer" },
  // Band 5 peer triangle · Commerce
  { from: 13, to: 14, kind: "peer" },
  { from: 14, to: 15, kind: "peer" },
  { from: 13, to: 15, kind: "peer" },

  // Cross-band dependencies (`from` = higher layer, `to` = deeper foundation)
  { from: 4,  to: 1,  kind: "depends" }, // Ingest → Data
  { from: 5,  to: 1,  kind: "depends" }, // API+MCP → Data
  { from: 5,  to: 2,  kind: "depends" }, // API+MCP → Identity
  { from: 6,  to: 3,  kind: "depends" }, // Integrations → Departments
  { from: 7,  to: 1,  kind: "depends" }, // Memory → Data
  { from: 8,  to: 7,  kind: "depends" }, // Reasoning → Memory
  { from: 9,  to: 7,  kind: "depends" }, // Detectors → Memory
  { from: 9,  to: 4,  kind: "depends" }, // Detectors → Ingest
  { from: 10, to: 7,  kind: "depends" }, // Pearl → Memory
  { from: 10, to: 8,  kind: "depends" }, // Pearl → Reasoning
  { from: 10, to: 3,  kind: "depends" }, // Pearl → Departments
  { from: 11, to: 2,  kind: "depends" }, // Approval → Identity
  { from: 12, to: 10, kind: "depends" }, // Orchestrator → Pearl
  { from: 12, to: 11, kind: "depends" }, // Orchestrator → Approval
  { from: 13, to: 2,  kind: "depends" }, // Tenant lifecycle → Identity
  { from: 13, to: 3,  kind: "depends" }, // Tenant lifecycle → Departments
  { from: 14, to: 12, kind: "depends" }, // Billing → Orchestrator
  { from: 14, to: 5,  kind: "depends" }, // Billing → API+MCP
  { from: 15, to: 11, kind: "depends" }, // Attestation → Approval
  { from: 15, to: 14, kind: "depends" }, // Attestation → Billing
];

/**
 * Node positions for `<ArchitectureGraph>` — hand-laid within an
 * 800 × 720 viewBox. Rows stacked bottom (foundation) → top (surface).
 * Per-band x-order matches per-band layer order (columns 1-2-3).
 */
export const NODE_POSITIONS: Record<number, { x: number; y: number }> = {
  // Band 1 · Substrate (bottom)
  1:  { x: 170, y: 640 },
  2:  { x: 400, y: 640 },
  3:  { x: 630, y: 640 },
  // Band 2 · Boundary
  4:  { x: 170, y: 500 },
  5:  { x: 400, y: 500 },
  6:  { x: 630, y: 500 },
  // Band 3 · Intelligence
  7:  { x: 170, y: 360 },
  8:  { x: 400, y: 360 },
  9:  { x: 630, y: 360 },
  // Band 4 · Agent
  10: { x: 170, y: 220 },
  11: { x: 400, y: 220 },
  12: { x: 630, y: 220 },
  // Band 5 · Commerce (top)
  13: { x: 170, y: 80 },
  14: { x: 400, y: 80 },
  15: { x: 630, y: 80 },
};

/** Edge geometry — computes a slight bezier curve so peer edges don't overlap dependency edges. */
export function edgePath(from: number, to: number, kind: EdgeKind): string {
  const a = NODE_POSITIONS[from];
  const b = NODE_POSITIONS[to];
  if (!a || !b) return "";
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (kind === "peer") {
    // Peer edges (same band) — small arc above the horizontal line.
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.min(24, Math.abs(dx) * 0.12);
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  }
  // Dependency edges (cross-band) — soft cubic bezier for organic flow.
  const cx1 = a.x + dx * 0.25;
  const cy1 = a.y + dy * 0.55;
  const cx2 = a.x + dx * 0.75;
  const cy2 = a.y + dy * 0.45;
  return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
}
