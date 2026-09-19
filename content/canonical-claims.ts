/**
 * content/canonical-claims.ts · Nebbos site · cross-piece claim substrate
 *
 * Founder directive 2026-09-19:
 *   "I am more interested in the text and what these all say and that we are
 *    saying the same thing across all and that it's all correct not a little
 *    of this a little of that"
 *
 * Prior state — every deck, portfolio piece, and one-pager was re-authoring
 * the same claims (product framing, where-it-runs, compliance table, tier
 * list, retired-frame list) from scratch. Drift was invisible until multiple
 * pieces ran side-by-side and disagreed.
 *
 * This file is the shared claim substrate. Every publication in
 * `content/pieces/` (and every claim on the marketing site itself)
 * draws from these constants. Change a claim here, every piece
 * re-renders with the new copy.
 *
 * NOT the same as:
 *   content/brand.ts        — brand voice + hero framing (customer-hero copy)
 *   content/facts.ts        — legal + jurisdictional facts (press-desk facts)
 *   content/platform-metrics.json  — measured numbers (with provenance)
 *
 * This file carries the SUBSTANTIVE CLAIMS — the sentences that describe
 * what Nebbos IS, in the shape a reader will encounter across a deck, a
 * portfolio piece, or a one-pager.
 */

import { BRAND } from "./brand";
import { FACTS } from "./facts";

/**
 * PRODUCT FRAMING · Four surfaces, one substrate.
 *
 * Ratified 2026-09-14 (per feedback_nebbos_ai_product_framing_platform_
 * tools_mcp_usb_security_2026_09_14) and carried into the Institutional
 * deck + Compression portfolio piece. Every customer surface uses this
 * exact framing.
 *
 * Cradle is the FOURTH product — hardware you can hold. Prior 2026-08 era
 * usage of "Cradle" as the tenant-wide knowledge root is superseded and
 * appears in `SUPERSEDED_FRAMES` below.
 */
export const PRODUCT_SURFACES = [
  {
    name: "Platform",
    oneLiner: "Where the Pearls live.",
    body: "Every dashboard, every approval, every action lands with an identity attached. One client per row. Every request checked before the query runs.",
  },
  {
    name: "App",
    oneLiner: "Your Pearl on the metal in front of you.",
    body: "Native for macOS and Windows. Runs the offline half of the platform, keeps the last mile of a decision on your laptop, syncs when the network returns.",
  },
  {
    name: "MCP",
    oneLiner: "The line every tool call has to cross.",
    body: "Mediates every read and every write. Classifier decides the tier on your host, redacts before egress, hands the call to the substrate. Your policy, not ours.",
  },
  {
    name: "Cradle",
    oneLiner: "Sovereignty you can put in your pocket.",
    body: "Carries the MCP binary, the Pearl memory, and the keys that unlock the audit trail. When the operator leaves the desk, elevated capability leaves with them.",
  },
] as const;

/**
 * FIVE-TIER DATA TREATMENT · How Nebbos decides where a call goes.
 *
 * The classifier picks the tier on the host, before the wire. Cited in the
 * Institutional deck slide 04 and any piece that touches data governance.
 */
export const DATA_TIERS = [
  {
    label: "Sealed",
    desc: "Journal-grade content stays on the Cradle. Nebbos never sees it, and can prove it didn't. Local weights, local memory, local answer.",
  },
  {
    label: "Portable",
    desc: "Cross-device continuity. Ciphertext-only server side. The key lives on the Cradle. Server side we hold pages we cannot read.",
  },
  {
    label: "Redacted-to-cloud",
    desc: "PII stripped on the host before egress. The provider receives the shape of the question, never the identities. Redaction rules are yours to edit.",
  },
  {
    label: "Attested-cloud",
    desc: "Enclave receipt required. The cloud call comes back signed by the hardware that ran it, and the signature lands in your audit chain.",
  },
  {
    label: "Air-gapped",
    desc: "Zero egress. Local weights, local model, local memory. Some rooms in your operation never touch the network — the Pearl in those rooms doesn't either.",
  },
] as const;

/**
 * FOUR GOVERNANCE PILLARS · How Nebbos proves itself.
 *
 * Every publication that names "governance" or "accountability" pulls
 * from this same set. Prior drift: some pieces named three pillars,
 * some named five, wording differed. Locked here.
 */
export const GOVERNANCE_PILLARS = [
  {
    label: "Human approval, attested at the tier the action deserves.",
    body: "Basic reads clear on a device-native biometric. Privileged writes require the Cradle physically present on the desk. Admin operations require an enclave-signed approval token. The approval is not a checkbox — it's a signature the substrate can verify.",
  },
  {
    label: "Hash-chained, append-only audit.",
    body: "Every read, every write, every tier decision lands in a chain your inspector-general can walk end to end without asking us. Tamper-evident by construction; portability exercised by the pipeline, not promised in a paragraph.",
  },
  {
    label: "Row-level isolation, enforced by the database.",
    body: "A bug in the application layer cannot cross a client boundary — the query is rejected before the answer is composed. The isolation lives in the substrate the code cannot bypass.",
  },
  {
    label: "Portability continuously exercised.",
    body: "Export runs on every deploy, not on offboarding day. If the escape hatch didn't work last Thursday, we find out on Thursday — not the day you decide to leave.",
  },
] as const;

/**
 * COMPLIANCE POSTURE · The frameworks. The status. In plain English.
 *
 * The single source for the compliance table that appears on:
 *   - /compliance page
 *   - Institutional deck slide 08
 *   - Investor deck slide 09
 *   - any procurement-facing one-pager
 *
 * IMPORTANT: keep this in lockstep with content/facts.ts complianceStance
 * and the /compliance page body. When a certification lands, update here
 * first, everything else pulls.
 *
 * Prior drift: retracted "SOC 2 Type II certified" claims from an earlier
 * marketing wave — replaced with the honest "in progress" phrasing per
 * elite-bar Phase 1 2026-09-14. NEVER regress to certified-past-tense
 * phrasing on any surface.
 */
export const COMPLIANCE_POSTURE = [
  {
    framework: "SOC 2 Type II",
    status: "In progress",
    note: "Controls implemented against the trust-services criteria; observation window and independent audit under way. Report not yet issued.",
  },
  {
    framework: "ISO 27001:2022",
    status: "Not yet held",
    note: "Substrate technical controls implemented; the information security management system is in preparation. Certificate not yet held.",
  },
  {
    framework: "EU AI Act · Art. 11 · Annex IV",
    status: "Pack in preparation",
    note: "Technical documentation pack being assembled ahead of the 2027-08-02 obligation date. Substrate is being built to the Annex-IV structure from day one.",
  },
  {
    framework: "HIPAA",
    status: "Readiness",
    note: "Substrate technical safeguards implemented; BAA and administrative safeguards not yet in place. Do not treat the platform as HIPAA-covered until we do.",
  },
  {
    framework: "FERPA",
    status: "Preventive posture",
    note: "The Nebbos substrate does not currently process individual student records. Preventive controls in place so nothing crosses that line without notice.",
  },
  {
    framework: "GDPR · CCPA",
    status: "DPA available",
    note: "Data processing addendum at nebbos.ai/legal/dpa. Data-subject rights implemented as first-class flows, not as a support ticket.",
  },
] as const;

/**
 * WHERE-IT-RUNS · Public production claim.
 *
 * The single sentence every publication uses. Update the count here
 * when new districts sign; every piece re-renders with the new count.
 */
export const PRODUCTION_CLAIM = {
  category: "K-12 school districts",
  geography: "Across four U.S. states",
  audience: "Institutional operators — regulated enterprise, government agencies, and education districts",
  buyer: "The person whose signature is on the compliance letter",
  disclosureRule: "Districts named on request under NDA",
} as const;

/**
 * CORPORATE STRUCTURE · Three-tier taxonomy.
 *
 * Ratified 2026-09-16 per BRAND.parentEntity / aiEntity / legalEntity.
 * On 2026-09-19 the Serbian operating entity name is being amended from
 * "Nebbos D.O.O." to "Nebbos Technologies D.O.O." (per SYSTEM.md §2).
 * That legal-registration flip lives in BRAND.legalEntity and needs
 * verification against the Serbian registry before propagation — do not
 * duplicate the name here.
 */
export const CORPORATE_STRUCTURE = {
  parent: {
    name: BRAND.parentEntity,
    location: BRAND.parentEntityLocation,
    role: "US parent — Delaware C-Corp, holds the trademark",
  },
  aiUnit: {
    name: BRAND.aiEntity,
    location: BRAND.aiEntityLocation,
    role: "US AI product/business unit",
  },
  operating: {
    name: BRAND.legalEntity,
    location: BRAND.legalEntityLocation,
    role: "Serbian operating subsidiary",
  },
} as const;

/**
 * SUPERSEDED FRAMES · Do not resurrect.
 *
 * Every phrase here appeared in an earlier Nebbos publication and has
 * since been retired. When authoring a new piece, grep against this list
 * — if any of these phrases match, the piece is drifting off-doctrine.
 *
 * Add to this list when a supersession lands. Never delete an entry —
 * additive-only per governance doctrine, so the record of what we've
 * moved on from stays legible.
 */
export const SUPERSEDED_FRAMES = [
  {
    phrase: "Cradle · Shell · Pearl three-tier architecture",
    supersededAt: "2026-09-14",
    supersededBy: "Platform · App · MCP · Cradle four-product model",
    reason: "Cradle was redefined from tenant-wide knowledge root to physical hardware device carrying the MCP binary + Pearl memory + keys. The old Shell (per-department container) is retired; Pearls run inside the Platform now.",
  },
  {
    phrase: "company brain / operating system for the AI-native enterprise",
    supersededAt: "2026-09-11",
    supersededBy: "run-layer voice, then platform-tools-MCP-USB doctrine 2026-09-14",
    reason: "Vendor-framing critique from founder — 'operating system' is architecture-internal, 'company brain' has surveillance connotations.",
  },
  {
    phrase: "fifteen governance layers",
    supersededAt: "2026-09-11",
    supersededBy: "Four governance pillars (see GOVERNANCE_PILLARS above)",
    reason: "Marketing-count creep. Four pillars is the actual doctrine.",
  },
  {
    phrase: "The company that never forgets",
    supersededAt: "2026-09-18",
    supersededBy: "Intelligence that compounds. / A sovereign brain for your operation.",
    reason: "Surveillance connotations. Never resurrect.",
  },
  {
    phrase: "TR3I / TR3I D.O.O. as active brand",
    supersededAt: "2026-09-16",
    supersededBy: "Nebbos Technologies Corp · Nebbos AI · Nebbos D.O.O. (operating entity name pending Serbian-registry update to Nebbos Technologies D.O.O. per 2026-09-19 doctrine)",
    reason: "Company rename. Any occurrence of TR3I on a customer surface is stale and needs replacement.",
  },
  {
    phrase: "run layer as hero framing",
    supersededAt: "2026-09-14",
    supersededBy: "Platform · Tools · MCP · USB security — the four-pillar customer-hero framing",
    reason: "Retained in the internal engineering register (architecture-internal), NOT on customer surfaces.",
  },
] as const;

/**
 * NEVER-WORDS on customer surfaces.
 *
 * Enforced by scripts/check-vocab.sh in the prebuild hook. Named here for
 * documentation — the shell script is authoritative.
 */
export const VOCABULARY_NEVER = {
  vendorFraming: ["agent", "agents", "AI agent", "bot", "chatbot"],
  vendorSoftPatterns: ["assistant", "copilot"],
  architectureInternal: ["tenant", "tenants", "multi-tenant"],
  retiredDoctrine: ["company brain", "fifteen governance layers", "department (use 'domain')"],
} as const;

/**
 * PIECE-CLAIM CHECKLIST · When authoring a new piece.
 *
 * Every piece author should walk this list before publishing:
 *
 *   1. Product framing uses PRODUCT_SURFACES (four items in order)
 *   2. Data-tier discussion cites DATA_TIERS (five items in order)
 *   3. Governance claim cites GOVERNANCE_PILLARS (four items)
 *   4. Compliance table copies COMPLIANCE_POSTURE verbatim
 *   5. Numbers come from platform-metrics.json (never re-estimate)
 *   6. Corporate signature: "Nebbos Technologies Corp · Nebbos AI · Nebbos D.O.O."
 *      (or full CORPORATE_STRUCTURE table for institutional pieces)
 *   7. Grep against SUPERSEDED_FRAMES.phrase — must not match
 *   8. Grep against VOCABULARY_NEVER — must not match
 *   9. Piece registered in content/pieces/registry.ts with a status
 *  10. HTML file lands in public/pieces/<slug>.html
 */
export const AUTHOR_CHECKLIST_URL = "/content/pieces/README.md";
