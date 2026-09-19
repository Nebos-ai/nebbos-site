/**
 * content/product-tier-detail.ts · Per-SKU tier detail (12 entries)
 *
 * Founder-directed 2026-09-19 T10:21 UTC:
 *   "i see on the top bar l1 l2 l3 when i click on it it leads to the
 *    same page and there is no difference between any of them the
 *    content is the same for all levels"
 *
 * Follow-up "lets fix it now" (T10:26): ship dedicated per-tier
 * subpages so every mega-menu tier link opens a distinct page with
 * distinct hero + narrative per SKU. This file is the content
 * substrate for those 12 pages, keyed by `${productKey}-${tierKey}`
 * (e.g. `platform-L1`, `mcp-L3`).
 *
 * Tier vocabulary (per reference_nebbos_westworld_naming_lexicon):
 *   L1 · Guest      — biometric only, surface scope
 *   L2 · Host       — Cradle in port, embedded operator authority
 *   L3 · Architect  — Cradle + enclave-signed approval, substrate scope
 *
 * The tier subpage template (app/products/[slug]/[tier]/page.tsx)
 * consumes:
 *   - tagline           — one-line SKU differentiator
 *   - heroDeck          — 2-3 sentence positioning
 *   - capabilities      — 4-6 items · what YOU get at this tier
 *   - audience          — 2-3 sentences · who this tier is for
 *   - upgradePath       — 1-2 items · what upgrading unlocks (or
 *                          undefined on L3-Architect, the top tier)
 *   - contactCTA        — the buy path from this tier (all tiers →
 *                          `/contact` per no-published-pricing doctrine)
 */

import type { ProductKey, TierKey } from "@/content/products";

export type TierDetail = {
  tagline: string;
  heroDeck: string;
  capabilities: { title: string; body: string }[];
  audience: string;
  upgradePath?: { unlockedTier: string; unlockedCapability: string };
};

export type SKUKey = `${ProductKey}-${TierKey}`;

export const PRODUCT_TIER_DETAIL: Record<SKUKey, TierDetail> = {
  // ─── PLATFORM ────────────────────────────────────────────────────
  "platform-L1": {
    tagline: "Dashboard for the operator who reads before they write.",
    heroDeck:
      "Every operator's first surface. Biometric-only login, personal-scope reads, low-risk tool calls. The place where you watch what your Pearls did overnight and approve the ones that need you.",
    capabilities: [
      { title: "Live dashboards across every Pearl", body: "One pane that shows what every Pearl on your workspace has done and what needs your read." },
      { title: "Personal-scope reads across your data", body: "Every read you make is scoped to what your role authorizes — no cross-user leakage possible." },
      { title: "Low-risk tool calls with biometric-only", body: "Draft artifacts, summarize threads, run searches — anything that doesn't mutate substrate." },
      { title: "One-tap approvals on Pearl proposals", body: "Every proposal a Pearl surfaces gets your yes/no, with the reasoning trace attached." },
      { title: "Attested audit trail on every action", body: "Every read, every approval, every tool call lands in the hash-chained audit trail your auditor reads directly." },
    ],
    audience: "Every operator on your workspace starts here. Analysts, department leads, executive sponsors — anyone who reads dashboards, reviews Pearl proposals, and approves the routine actions.",
    upgradePath: { unlockedTier: "L2 · Host", unlockedCapability: "shell writes, memory registers, and elevated operations that require your Cradle in the port." },
  },
  "platform-L2": {
    tagline: "Embedded operator authority. Shell writes with your Cradle plugged in.",
    heroDeck:
      "The operator tier for people who don't just watch — they change things. Every write requires biometric plus your Nebbos Cradle physically in the port. Elevated capability follows the hardware on your desk.",
    capabilities: [
      { title: "Shell writes across your workspace", body: "Create, edit, delete anything within the shell scope you own. Every write attested with hardware presence." },
      { title: "Memory registers you can update", body: "Pearl memory is yours to shape — record decisions, capture preferences, correct misreads." },
      { title: "Elevated tool calls that mutate state", body: "Any tool call that changes something in your ops stack runs at L2 · Host — never L1." },
      { title: "Everything from L1 · Guest", body: "Dashboards, reads, approvals, and audit trail all included." },
      { title: "Cradle physical-presence gate", body: "Unplug the Cradle and the elevated capability is cryptographically absent — not policy-disabled." },
      { title: "Session recording + attestation", body: "Every write session records with operator identity, hardware serial, and timestamp." },
    ],
    audience: "The operators who actually run the workflow. Department leads shipping approvals into production systems, ops managers updating Pearl memory as the org learns, engineers changing configurations in the shell.",
    upgradePath: { unlockedTier: "L3 · Architect", unlockedCapability: "shell creation and destruction, substrate mutation, cross-shell operations, and quorum-required actions." },
  },
  "platform-L3": {
    tagline: "Substrate authority. Two-person hardware quorum on every consequential action.",
    heroDeck:
      "The operator tier that reshapes the substrate itself. Biometric + Cradle + enclave-signed approval token, with two-person quorum enforced in hardware. Any action that touches multiple shells or changes the substrate runs here.",
    capabilities: [
      { title: "Shell creation and destruction", body: "Stand up new shells for new departments, retire old ones cleanly. Every shell lifecycle event attested end-to-end." },
      { title: "Substrate mutation across the workspace", body: "Change tier policy, redefine Pearl scope, adjust the classifier — the ops-of-ops surface." },
      { title: "Cross-shell operations", body: "Read + write across every shell in your organization. Reserved for the operators who need to see the whole." },
      { title: "Quorum-required actions in hardware", body: "Two Cradles co-sign via WebAuthn ceremony with a 60-second time-to-live. Enforced in the silicon, not the policy layer." },
      { title: "Everything from L1 · Guest + L2 · Host", body: "Dashboards, reads, approvals, writes, memory registers all included." },
      { title: "Enclave-signed approval tokens", body: "Every L3 action requires an approval token derived from a WebAuthn ceremony on your Cradle's secure enclave." },
    ],
    audience: "The CISO. The COO. The two-or-three operators every enterprise trusts with substrate-level authority. Not many people at this tier — by design.",
  },

  // ─── APP ─────────────────────────────────────────────────────────
  "app-L1": {
    tagline: "Local native for the operator who prefers a desktop app to a browser tab.",
    heroDeck:
      "The Nebbos App on macOS or Windows, running the L1 · Guest surface locally. Same dashboards, same approvals, same audit trail — offline-capable, syncs when the network returns.",
    capabilities: [
      { title: "Full L1 · Guest surface, offline-capable", body: "Dashboards, personal-scope reads, and low-risk tool calls all work whether you're on the wire or not." },
      { title: "Native macOS + Windows", body: "Signed installers, auto-update opt-in, no browser between you and the substrate." },
      { title: "Sync via MCP when online", body: "Every offline action syncs back through the MCP the moment the connection returns." },
      { title: "System-tray notification for Pearl proposals", body: "The moment a Pearl surfaces something for your approval, your OS knows." },
      { title: "Bundled with Platform · Guest", body: "No separate charge — every Platform · Guest seat includes the desktop app." },
    ],
    audience: "Operators who live in their laptop. Field roles that drop off the network. Anyone who prefers a native app to a browser tab.",
    upgradePath: { unlockedTier: "L2 · Host", unlockedCapability: "shell writes and elevated tool calls with your Cradle in the port." },
  },
  "app-L2": {
    tagline: "The desktop app with your Cradle plugged in. Full Host authority, offline-capable.",
    heroDeck:
      "The Nebbos App running at L2 · Host. Every elevated action requires your Cradle. Works offline against local shell state; sync + attestation land when the network returns.",
    capabilities: [
      { title: "Full L2 · Host surface in a native app", body: "Shell writes, memory registers, and elevated operations all run locally with Cradle presence." },
      { title: "Offline-capable elevated writes", body: "Write locally with Cradle presence, sync + attest when the network returns. Audit trail never loses events." },
      { title: "System-level Cradle detection", body: "The OS knows when your Cradle is in the port; elevated capability appears + disappears with the hardware." },
      { title: "Everything from App · Guest", body: "Dashboards, reads, approvals, offline-capable sync — all included." },
      { title: "Bundled with Platform · Host", body: "Every Platform · Host seat includes the desktop app at the same tier." },
    ],
    audience: "Host-tier operators who need to keep working when the network's flaky — remote field work, secure environments, air-gapped moments during travel.",
    upgradePath: { unlockedTier: "L3 · Architect", unlockedCapability: "substrate mutation and cross-shell operations from the local app." },
  },
  "app-L3": {
    tagline: "The desktop app with full Architect authority. Substrate operations from your laptop.",
    heroDeck:
      "The Nebbos App running at L3 · Architect. Substrate mutation, shell creation, cross-shell operations — with the two-person quorum ceremony running locally against two Cradles on-desk or across the office LAN.",
    capabilities: [
      { title: "Full L3 · Architect surface in a native app", body: "Substrate operations, shell lifecycle, cross-shell reads + writes — all from the desktop." },
      { title: "Two-Cradle quorum ceremony locally", body: "WebAuthn ceremony runs across two Cradles on your local network with the same 60-second TTL." },
      { title: "Enclave-signed tokens generated on-device", body: "The approval token doesn't leave the local enclave until the action commits." },
      { title: "Everything from App · Guest + Host", body: "Dashboards, reads, writes, offline sync — all included." },
      { title: "Bundled with Platform · Architect", body: "Every Platform · Architect seat includes the desktop app at the same tier." },
    ],
    audience: "The two or three operators authorized for substrate-level authority who need to work from their laptop — not tied to a specific workstation.",
  },

  // ─── MCP ─────────────────────────────────────────────────────────
  "mcp-L1": {
    tagline: "The tool substrate for low-risk calls. Server-verified attestation, biometric-gated.",
    heroDeck:
      "The MCP running at Guest tier. Every tool call goes through server-side attestation before it runs. Biometric-only gate for anything that reads without mutating state.",
    capabilities: [
      { title: "Server-verified attestation on every call", body: "The MCP verifies factors against enrolled credentials — hardware, biometric, approval token — before a tool runs." },
      { title: "Read-only tool calls at biometric-only", body: "Dashboard queries, search, summarization, translation — anything that doesn't change state." },
      { title: "Tier-gate decorator on every tool", body: "Each tool declares its required tier; the MCP refuses tools above L1 without the required factors." },
      { title: "Hash-chained audit trail per call", body: "Every tool invocation lands in the append-only audit chain. Provable end-to-end." },
      { title: "Ships bundled with the Cradle at L2+", body: "Guest tier runs against Nebbos-hosted MCP; upgrade to L2 ships the MCP binary on your Cradle." },
    ],
    audience: "Every operator's tool substrate at read scope. Analysts running queries, executives running reports, anyone whose tool use doesn't mutate state.",
    upgradePath: { unlockedTier: "L2 · Host", unlockedCapability: "the MCP binary shipped on your Cradle, plus tool calls that write to the shell." },
  },
  "mcp-L2": {
    tagline: "The MCP on your Cradle. Every write tool gated by hardware presence.",
    heroDeck:
      "The MCP binary and configuration ship on your Nebbos Cradle. Any tool call that writes to the shell requires Cradle in the port — biometric alone won't lift a tool from L1 to L2.",
    capabilities: [
      { title: "MCP binary on your Cradle", body: "The tool substrate travels with the hardware. Unplug the Cradle and the elevated tools go with it." },
      { title: "Write-tier tools gated by presence", body: "Shell writes, memory registers, external system updates — all L2 tools verify Cradle presence server-side before execution." },
      { title: "Everything from MCP · Guest", body: "Read-tier tool calls + server-verified attestation + audit trail all included." },
      { title: "Per-client key material on-device", body: "The keys that authenticate your tool calls live on your Cradle, not in a shared vault." },
      { title: "Bundled with Platform · Host", body: "Every Platform · Host seat includes the MCP at Host tier." },
    ],
    audience: "Host-tier operators whose Pearls call tools that change state — the shell writers, memory register-updaters, external-system integrators.",
    upgradePath: { unlockedTier: "L3 · Architect", unlockedCapability: "substrate-mutation tools that require enclave-signed approval and a two-Cradle quorum." },
  },
  "mcp-L3": {
    tagline: "The MCP for substrate-level tool calls. Enclave-signed approval on every action.",
    heroDeck:
      "The MCP running at Architect tier. Any tool call that mutates substrate — shell creation, tier-policy change, cross-shell operations — requires an enclave-signed approval token plus two-Cradle co-signature.",
    capabilities: [
      { title: "Enclave-signed approval on substrate tools", body: "Every L3 tool call requires an approval token derived from a WebAuthn ceremony inside your Cradle's secure enclave." },
      { title: "Two-Cradle quorum enforced in hardware", body: "WebAuthn ceremony across Architect Cradle + Developer Cradle with 60-second TTL. No policy-layer bypass." },
      { title: "Cross-shell tool operations", body: "Tools that read or write across multiple shells run only at L3 with the quorum in place." },
      { title: "Everything from MCP · Guest + Host", body: "Read tools, write tools, on-Cradle binary, audit trail — all included." },
      { title: "Bundled with Platform · Architect", body: "Every Platform · Architect seat includes the MCP at Architect tier." },
    ],
    audience: "The two-to-three operators authorized for substrate-level tool authority. CISO, COO, the ops-of-ops role.",
  },

  // ─── CRADLE (internal key "usb" for SKU-ID stability; user-facing "Cradle") ──
  "usb-L1": {
    tagline: "The hardware carrier of your keys. Baseline configuration for read-tier operators.",
    heroDeck:
      "The Nebbos Cradle at Guest tier. FIPS 140-3 Level 3 encrypted storage, tamper-evident and IP68-rated, TAA-compliant. Optional at L1 · Guest — every operator gets one at L2 · Host.",
    capabilities: [
      { title: "FIPS 140-3 Level 3 cryptographic module", body: "The certificate covers the module boundary. Every key operation happens inside the validated hardware." },
      { title: "On-device keypad for direct authentication", body: "Biometric on your device unlocks the Cradle; no browser or host software required." },
      { title: "Tamper-evident, epoxy-sealed at manufacture", body: "The device seals at manufacture. If it's ever been opened, you see it immediately." },
      { title: "IP68 waterproof + MIL-STD-810G shock-tested", body: "Built to travel. Every environmental threshold documented." },
      { title: "TAA-compliant supply chain", body: "Federal-procurement-eligible from day one." },
    ],
    audience: "Optional at Guest tier — Guest operators can carry a Cradle if their workflow anticipates an upgrade to Host. Every Host-tier operator gets one automatically.",
    upgradePath: { unlockedTier: "L2 · Host", unlockedCapability: "the MCP binary + Pearl memory on-device, and Cradle physical-presence as the gate for elevated operations." },
  },
  "usb-L2": {
    tagline: "The Cradle every Host operator carries. MCP + Pearl memory ride with the hardware.",
    heroDeck:
      "The Nebbos Cradle at Host tier. Ships with the MCP binary, per-client key material, and your Pearl memory on the encrypted volume. Elevated capability follows the physical device.",
    capabilities: [
      { title: "MCP binary + configuration on the encrypted volume", body: "The tool substrate travels with the hardware — the MCP that mediates every write lives here." },
      { title: "Pearl memory on-device", body: "Your accumulated context, preference pairs, and tuning data sit on the Cradle's encrypted volume." },
      { title: "Per-operator key material", body: "Each Cradle holds keys unique to its operator; a lost or damaged Cradle triggers key rotation, not a service outage." },
      { title: "Physical-presence gate for elevated ops", body: "Unplug the Cradle and elevated capability is cryptographically absent — not policy-disabled." },
      { title: "Everything from Cradle · Guest", body: "FIPS 140-3 L3, on-device keypad, tamper-evident, IP68, MIL-STD-810G, TAA — all included." },
      { title: "Annual attestation renewal included", body: "Every Cradle re-attests annually; ownership transfers, retirements, and re-provisioning all traceable." },
    ],
    audience: "Every Host-tier operator carries one. Ships automatically with the Platform · Host subscription.",
    upgradePath: { unlockedTier: "L3 · Architect", unlockedCapability: "enclave-signed approval token capability + two-Cradle quorum via WebAuthn." },
  },
  "usb-L3": {
    tagline: "The Cradle for the Architect. Enclave-signed approval, two-Cradle quorum capability.",
    heroDeck:
      "The Nebbos Cradle at Architect tier. Adds enclave-signed approval token capability to the Host baseline — the token that unlocks substrate mutation, shell lifecycle, and cross-shell operations.",
    capabilities: [
      { title: "Enclave-signed approval capability", body: "The Cradle generates approval tokens inside its secure enclave via WebAuthn ceremony. The token never leaves the enclave until the action commits." },
      { title: "Two-Cradle quorum via WebAuthn", body: "Any L3 action requires Architect Cradle + Developer Cradle co-signature with 60-second TTL. Enforced in silicon." },
      { title: "AGSE-attested at provisioning", body: "Every Architect Cradle carries an AGSE (Attested Global Serial Enrollment) certificate binding it to its human operator at provisioning." },
      { title: "Everything from Cradle · Guest + Host", body: "FIPS L3 module, on-device keypad, MCP binary, Pearl memory, key material — all included." },
      { title: "Reserved for the few operators authorized at L3", body: "Not a widely-issued device. Every Architect Cradle is traced individually." },
    ],
    audience: "The two-or-three operators per enterprise authorized for substrate-level authority. Provisioning requires enterprise-admin sign-off on top of the standard Cradle onboarding.",
  },
};
