/**
 * content/product-detail.ts · v1 · 2026-09-18
 *
 * Structured content for each of the 4 product detail pages
 * (/products/platform | app | mcp | cradle). Extracted from the four
 * v3-substrate product pages into one typed registry so the marketing-
 * register template renders all four from one shape.
 *
 * Every string carried verbatim from the pre-existing pages; the
 * migration is a REGISTER change, not a copy change (copy pass is
 * a separate wave, per runlayer-tier voice discipline).
 */

import type { ProductKey } from "@/content/products";

export type ProductHighlight = { label: string; value: string; note: string };
export type ProductDeepItem = { heading: string; body: string };
export type ProductAudience = { audience: string; scope: string };
export type ProductValueCard = { factor: string; headline: string; body: string };

export type ProductDetail = {
  key: ProductKey;
  chapter: string;              // Roman numeral for chapter plate
  heroDeck: string;             // 1-3 sentence deck under the product hero H1
  highlights: ProductHighlight[];       // 5 rows · scannable specs
  deepTitle: string;            // section head over the middle deep-dive
  deep: ProductDeepItem[];      // 4-5 items · deep-dive content
  builtFor: ProductAudience[];  // 3 audience rows
  valueCards: ProductValueCard[]; // 3 value cards (closing narrative)
};

export const PRODUCT_DETAILS: Record<ProductKey, ProductDetail> = {
  platform: {
    key: "platform",
    chapter: "I",
    heroDeck:
      "Where the Pearls live and the operators approve. Multi-Shell by default — one client per row, one identity per request, one hash chain per action. Portable in full the day you leave. Running in production today, in K-12 districts across four U.S. states.",
    highlights: [
      { label: "Register", value: "Multi-Shell", note: "Shell isolation by default. Cross-Shell is a ceremony, not an accident." },
      { label: "Runtime", value: "Pearls at scale", note: "Every Pearl runs metered, isolated, and modular. Fleet-wide governance in one plane." },
      { label: "Auth", value: "Biometric-native", note: "Touch ID · Face ID · Windows Hello. Every session, every operator, every action." },
      { label: "Audit", value: "Hash-chained", note: "Every action writes a hash-chained audit event. Replay-proof, tamper-evident." },
      { label: "Deploy", value: "Live in production", note: "Running in K-12 school districts across multiple U.S. states today. Not vaporware." },
    ],
    deepTitle: "Capabilities.",
    deep: [
      { heading: "Pearl orchestration", body: "Run Pearl workflows in isolated Shells. Metered execution, per-Pearl audit trails, and per-Shell policy enforcement out of the box." },
      { heading: "Knowledge graph as memory", body: "Your operational context lives in a queryable graph. Every substrate change writes a settled entry; every query resolves to the same truth." },
      { heading: "Approval-as-a-mechanism", body: "Every elevated action gates on operator biometric plus the Nebbos Cradle. Approval is architectural, not a policy paragraph." },
      { heading: "Full-observability from day one", body: "Metrics, logs, traces, and audit shards wired from your first deploy. Not a follow-up quarter." },
    ],
    builtFor: [
      { audience: "Government agencies", scope: "Classified and sensitive operations at scale." },
      { audience: "Regulated enterprise", scope: "Finance, healthcare, energy, defense — every audit-heavy vertical." },
      { audience: "Institutional operators", scope: "Teams building the substrate other teams run on." },
    ],
    valueCards: [
      { factor: "Sovereignty",       headline: "You own the substrate you run on.", body: "Nebbos.ai does not lock you into our data plane. Your Shell state, your keys, your operators — portable to any Nebbos deployment." },
      { factor: "Attestation",       headline: "Approval is architectural.", body: "Every elevated action gates on biometric + Nebbos Cradle. No policy document; the platform refuses to execute without valid factors." },
      { factor: "Cost-transparency", headline: "Model costs follow you, not us.", body: "Tool-call and Pearl usage bills at cost-follow with quarterly reconciliation. No fixed markup that grows with your workload." },
    ],
  },

  app: {
    key: "app",
    chapter: "II",
    heroDeck:
      "Native for macOS and Windows. Keeps the last mile of a decision on the machine in front of you. Works when the network doesn't, reconciles through the MCP the moment it's back. First install of every operator's tier ceremony.",
    highlights: [
      { label: "Platforms", value: "macOS · Windows", note: "Signed installers. Auto-update opt-in. No install wizard, no adware." },
      { label: "Mode", value: "Offline-capable", note: "Local-first workflows continue when the network doesn't." },
      { label: "Sync", value: "Through the MCP", note: "State reconciles on reconnect via authenticated MCP calls, not shared cloud storage." },
      { label: "Bundle", value: "Included with Platform", note: "Every Platform subscription includes the app at no separate charge." },
      { label: "Approval", value: "Biometric-first", note: "Elevated ops on local files gate on Touch ID · Face ID · Windows Hello." },
    ],
    deepTitle: "Features.",
    deep: [
      { heading: "Runs where you work", body: "The app installs on macOS or Windows and integrates with the OS's native biometric surface. No web tab, no browser context." },
      { heading: "Offline is a first-class mode", body: "Read caches, draft actions, and queue elevated ops locally. When the network returns, everything reconciles through the MCP." },
      { heading: "Air-gapped deployments supported", body: "For sensitive contexts where continuous internet isn't safe, the app runs against a locally-hosted MCP with periodic manual sync." },
      { heading: "Enrolled once, used everywhere", body: "First-touch WebAuthn enrollment registers your biometric-bound credential. Every subsequent session uses that credential; no password to type." },
    ],
    builtFor: [
      { audience: "Field operators",     scope: "The people executing outside a data center — deployment sites, remote offices, on the move." },
      { audience: "Air-gapped teams",    scope: "Defense, classified, and disaster-recovery contexts where continuous internet isn't safe." },
      { audience: "Every Nebbos operator", scope: "Anyone on a Platform seat. First install, day one." },
    ],
    valueCards: [
      { factor: "Local isolation",   headline: "Your data stays on your device.", body: "The app operates on local caches and drafts. Nothing transmits until you approve it via biometric assertion." },
      { factor: "Biometric approval", headline: "Every elevated action, your fingerprint.", body: "Touch ID · Face ID · Windows Hello. The private key never leaves your device's Secure Enclave. No password, no shared token." },
      { factor: "Signed distribution", headline: "Signed installers. Verifiable builds.", body: "Notarized on macOS, code-signed on Windows. Auto-update opt-in with signature verification per release. Reproducible from source." },
    ],
  },

  mcp: {
    key: "mcp",
    chapter: "III",
    heroDeck:
      "The line every read and every write has to cross. Client-side classifier decides the tier, redacts before the wire, hands the call to the substrate. Ships on your Cradle — the host answers requests the way your hardware says to, not the way our deploy says to.",
    highlights: [
      { label: "Transport", value: "JSON-RPC over HTTPS", note: "Every call authenticated, versioned, and auditable." },
      { label: "Attestation", value: "Server-verified", note: "The MCP verifies factors before executing. Client claims mean nothing." },
      { label: "Isolation", value: "Shell-scoped", note: "Cross-Shell reads require enclave-signed approval. No accidental crossing." },
      { label: "Binary", value: "Ships on the Cradle", note: "Config, credentials, and code live on your Nebbos Cradle. Unplug removes them." },
      { label: "Quota", value: "Cost-follow overage", note: "Tool-call quotas per Shell. Overage billed at cost-follow with quarterly reconciliation." },
    ],
    deepTitle: "Architecture.",
    deep: [
      { heading: "One substrate, every tool call", body: "Every action that touches Shell state — reads, writes, mutations, cross-boundary joins — passes through the Nebbos MCP. There are no side channels, no direct database access, no host-shell backdoors." },
      { heading: "Tier-gate decorator", body: "Every tool declares its required tier (L1 · L2 · L3). The MCP verifies factors before executing. Missing biometric? Refused. Missing Cradle physical presence for L2? Refused. Missing enclave-signed approval for L3? Refused." },
      { heading: "Binary lives on the Cradle", body: "The MCP binary, the config, the attestation credentials, and the Shell state that seeds a session all ship on the encrypted Nebbos Cradle volume. When the device is mounted, the host reads and executes. Unplug, and the mount is gone; elevated calls cannot produce valid attestations." },
      { heading: "Audit chain on every call", body: "Every call writes an audit event with a hash-chained parent reference. Hash-chain verifiable end-to-end. Replay-proof, tamper-evident, discovery-ready." },
    ],
    builtFor: [
      { audience: "Enterprise operators", scope: "Every tool call authenticated, versioned, and auditable." },
      { audience: "Regulated verticals",   scope: "Finance, healthcare, energy, defense contractors, government agencies." },
      { audience: "Platform builders",     scope: "Nebbos.ai and your own domain-specific tools, one substrate." },
    ],
    valueCards: [
      { factor: "Attestation",    headline: "The MCP verifies. You don't claim.", body: "Every elevated call requires factors the server verifies against enrolled credentials. Signature counter, origin, attestation chain, tier gate — all checked before the tool runs." },
      { factor: "Shell isolation", headline: "Cross-Shell reads are a ceremony.", body: "The MCP refuses cross-Shell operations without an enclave-signed approval token. Accidental crossing is impossible; deliberate crossing is audited and reviewable." },
      { factor: "Cost-follow",     headline: "Overage matches provider cost.", body: "Tool-call quotas per Shell. When you exceed, overage rates follow underlying provider costs with quarterly reconciliation. No markup surprises, no lock-in." },
    ],
  },

  usb: {
    key: "usb",
    chapter: "IV",
    heroDeck:
      "Sovereignty you can put in your pocket. Carries the MCP that mediates every tool call, the memory that makes your Pearl yours, and the keys that unlock your audit trail. Elevated capability follows the object on the desk — not the network location. FIPS 140-3 Level 3, epoxy-sealed, IP68, MIL-STD-810G, TAA-compliant.",
    highlights: [
      { label: "Encryption",     value: "FIPS 140-3 L3",         note: "Federally-certified encrypted storage volume. AES-256 XTS." },
      { label: "Authentication", value: "On-device keypad",       note: "PIN entry never traverses the host machine. Physical, isolated." },
      { label: "Ruggedness",     value: "IP68 · MIL-STD-810G",   note: "Waterproof, dust-tight, shock-tested. Field-deployable." },
      { label: "Tamper",         value: "Epoxy-sealed",           note: "Physical break-in required to open; the seal is the evidence." },
      { label: "Supply chain",   value: "TAA-compliant",          note: "No adversarial-jurisdiction components. Procurement-ready." },
    ],
    deepTitle: "Materials.",
    deep: [
      { heading: "Encrypted volume",              body: "AES-256 XTS ciphertext at rest. Federal-tier key management with per-device unique wrapping keys. FIPS 140-3 Level 3 certified." },
      { heading: "On-device keypad",              body: "PIN entered on the device itself, not on the host. A compromised host cannot capture the PIN. Programmable read-only and self-destruct modes for regulated deployments." },
      { heading: "Tamper-evident, epoxy-sealed",  body: "Any physical intrusion is visible. The internal electronics are potted in place; extraction breaks the seal and voids attestation. There is no invisible way in." },
      { heading: "IP68 waterproof, MIL-STD-810G", body: "Full immersion, dust-tight, drop-tested to military-grade standards. Field-deployable in regulated, defense, and disaster-recovery contexts." },
      { heading: "TAA-compliant supply chain",    body: "No components sourced from adversarial jurisdictions. Meets US federal Trade Agreements Act procurement requirements. Chain-of-custody documented from manufacture to activation." },
    ],
    builtFor: [
      { audience: "Governments",           scope: "Classified and sensitive workloads." },
      { audience: "Regulated enterprises", scope: "Finance, healthcare, energy, defense contractors." },
      { audience: "Founder operators",     scope: "The people building the substrate the rest run on." },
    ],
    valueCards: [
      { factor: "Biometric",         headline: "Approve every action with your device.", body: "Touch ID · Face ID · Windows Hello · Android BiometricPrompt. The private key never leaves your Secure Enclave. No password, no phishable secret, no shared token." },
      { factor: "Physical presence", headline: "The Cradle is the second factor.", body: "Elevated tier operations require the Nebbos Cradle physically plugged in. A remote attacker cannot forge presence — the mount is the assertion." },
      { factor: "Enclave-signed",    headline: "Admin operations pass through the enclave.", body: "Cross-boundary reads, substrate mutations, and quorum-required actions require an enclave-signed approval token. Multi-party ceremonies supported for the highest-consequence changes." },
    ],
  },
};
