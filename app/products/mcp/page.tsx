import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";

/**
 * PAGE · /products/mcp · the Nebbos MCP product page
 *
 * Follows the 14-section Apple device-marketing arc adapted for a
 * tool substrate (not a physical device). Sections 3 (physical tour)
 * and 9 (continuity/ecosystem) reframed for the MCP's software+hardware
 * hybrid nature — the MCP binary and credentials LIVE ON the USB device
 * per feedback_nebbos_mcp_lives_on_usb_shared_code_structure_2026_09_14.
 */

const MCP_PRODUCT = PRODUCTS.find((p) => p.key === "mcp")!;
const MCP_SUBSCRIPTIONS = subscriptionsForProduct("mcp");

export const metadata: Metadata = {
  title: "Nebbos MCP · The tool substrate. Attested.",
  description:
    "The Nebbos MCP mediates every tool call across your Nebbos platform. Binary and credentials ship on the Nebbos USB — physical presence gates elevated tiers. Server-verified attestation. Shell-scoped isolation.",
};

// ── Section 1 · Hero ─────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-32 md:py-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
          Nebbos MCP
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-ink leading-[1.02] text-balance">
          The tool substrate.{" "}
          <em className="font-serif italic text-gold">Attested.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed">
          Every tool your Nebbos platform runs passes through one substrate.
          The binary lives on your Nebbos USB. Physical presence gates the
          elevated tiers. Attestation is server-verified, not client-claimed.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="font-mono text-xs uppercase tracking-[0.16em] text-ink border-b border-ink pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            Contact sales &rarr;
          </Link>
          <Link
            href="/demo"
            className="font-mono text-xs uppercase tracking-[0.16em] text-ink-2 hover:text-ink transition-colors"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Section 2 · Highlights ───────────────────────────────────────────────

const HIGHLIGHTS = [
  { label: "Transport", value: "JSON-RPC over HTTPS", note: "Every call authenticated, versioned, and auditable." },
  { label: "Attestation", value: "Server-verified", note: "The MCP verifies factors before executing. Client claims mean nothing." },
  { label: "Isolation", value: "Shell-scoped", note: "Cross-Shell reads require enclave-signed approval. No accidental crossing." },
  { label: "Binary", value: "Ships on the USB", note: "Config, credentials, and code live on your Nebbos USB. Unplug removes them." },
  { label: "Quota", value: "Cost-follow overage", note: "Tool-call quotas per Shell. Overage billed at cost-follow with quarterly reconciliation." },
];

function Highlights() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Get the highlights
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Five commitments. One tool surface.
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className="border-t border-rule pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{h.label}</p>
              <p className="mt-2 font-serif text-2xl font-medium text-ink leading-tight">{h.value}</p>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">{h.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 3 · Take a closer look (MCP architecture) ────────────────────

const ARCHITECTURE = [
  {
    heading: "One substrate, every tool call",
    body: "Every action that touches Shell state &mdash; reads, writes, mutations, cross-boundary joins &mdash; passes through the Nebbos MCP. There are no side channels, no direct database access, no host-shell backdoors.",
  },
  {
    heading: "Tier-gate decorator",
    body: "Every tool declares its required tier (L1 · L2 · L3). The MCP verifies factors before executing. Missing biometric? Refused. Missing USB physical presence for L2? Refused. Missing enclave-signed approval for L3? Refused.",
  },
  {
    heading: "Binary lives on the USB",
    body: "The MCP binary, the config, the attestation credentials, and the Shell state that seeds a session all ship on the encrypted Nebbos USB volume. When the device is mounted, the host reads and executes. Unplug, and the mount is gone; elevated calls cannot produce valid attestations.",
  },
  {
    heading: "Audit chain on every call",
    body: "Every call writes an audit event with a hash-chained parent reference. Hash-chain verifiable end-to-end. Replay-proof, tamper-evident, discovery-ready.",
  },
];

function Architecture() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-14 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Take a closer look
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            How the substrate holds.
          </h2>
        </header>
        <ul className="space-y-10">
          {ARCHITECTURE.map((a) => (
            <li key={a.heading} className="border-t border-rule pt-6">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-ink tracking-tight">
                {a.heading}
              </h3>
              <p className="mt-3 max-w-2xl text-base text-ink-2 leading-relaxed">
                {a.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 4 · Core (composition with USB) ──────────────────────────────

function CoreComposition() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-8 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            The core
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            One code tree.{" "}
            <em className="font-serif italic text-gold">Two surfaces.</em>
          </h2>
        </header>
        <div className="max-w-2xl space-y-6">
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            The Nebbos MCP and the Nebbos USB are one code tree. The binary
            ships on the encrypted USB volume; physical presence of the
            device is the hardware factor that gates elevated tiers.
          </p>
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            Without the USB plugged in, elevated permissions are not
            available. There is no cloud-only version of the MCP with the
            same authority. The device is the contract.
          </p>
          <p>
            <Link
              href="/products/usb"
              className="font-mono text-xs uppercase tracking-[0.14em] text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
            >
              About the Nebbos USB &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 6 · Built for ────────────────────────────────────────────────

const BUILT_FOR = [
  { audience: "Enterprise operators", scope: "Every tool call authenticated, versioned, and auditable." },
  { audience: "Regulated verticals", scope: "Finance, healthcare, energy, defense contractors, government agencies." },
  { audience: "Platform builders", scope: "Nebbos.ai and your own domain-specific tools, one substrate." },
];

function BuiltFor() {
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Built for
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Operators who need their tools to prove{" "}
            <em className="font-serif italic text-gold">what they did.</em>
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUILT_FOR.map((b) => (
            <li key={b.audience} className="border-t border-rule pt-5">
              <p className="font-serif text-2xl font-medium text-ink tracking-tight">{b.audience}</p>
              <p className="mt-3 text-base text-ink-2 leading-relaxed">{b.scope}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 12 · Values ──────────────────────────────────────────────────

const VALUE_CARDS = [
  {
    factor: "Attestation",
    headline: "The MCP verifies. You don't claim.",
    body: "Every elevated call requires factors the server verifies against enrolled credentials. Signature counter, origin, attestation chain, tier gate &mdash; all checked before the tool runs.",
  },
  {
    factor: "Shell isolation",
    headline: "Cross-Shell reads are a ceremony.",
    body: "The MCP refuses cross-Shell operations without an enclave-signed approval token. Accidental crossing is impossible; deliberate crossing is audited and reviewable.",
  },
  {
    factor: "Cost-follow",
    headline: "Overage matches provider cost.",
    body: "Tool-call quotas per Shell. When you exceed, overage rates follow underlying provider costs with quarterly reconciliation. No markup surprises, no lock-in.",
  },
];

function Values() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Values
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Three commitments. No exceptions.
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUE_CARDS.map((v) => (
            <li key={v.factor} className="border-t border-rule pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">{v.factor}</p>
              <p className="mt-3 font-serif text-xl md:text-2xl font-medium text-ink tracking-tight leading-tight">
                {v.headline}
              </p>
              <p className="mt-4 text-base text-ink-2 leading-relaxed">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 13 · Tier picker ─────────────────────────────────────────────

function TierPicker() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Choose your tier
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            One MCP. Three tiers.
          </h2>
          <p className="max-w-2xl text-base text-ink-2 leading-relaxed pt-2">
            Each tier unlocks a different scope of the tool surface. L2 and L3
            require the Nebbos USB physically plugged in; L3 additionally
            requires an enclave-signed approval token per admin call.
          </p>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MCP_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="border-t border-rule pt-6 flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                  {tier.label}
                </p>
                <p className="mt-3 font-serif text-xl md:text-2xl font-medium text-ink tracking-tight leading-tight">
                  {sub.headline}
                </p>
                <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                  <strong className="text-ink">Factors</strong> &middot; {tier.factors}
                </p>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">
                  <strong className="text-ink">Ops</strong> &middot; {tier.scope}
                </p>
                <p className="mt-6 pt-6 border-t border-rule-2">
                  <Link
                    href="/contact"
                    className="font-mono text-xs uppercase tracking-[0.14em] text-ink hover:text-gold transition-colors underline underline-offset-4 decoration-rule hover:decoration-gold"
                  >
                    Contact sales &rarr;
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ── Section 14 · Related ─────────────────────────────────────────────────

function Related() {
  const others = PRODUCTS.filter((p) => p.key !== "mcp");
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            The other three products
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            One matrix. Four products.
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {others.map((p) => (
            <li key={p.key} className="border-t border-rule pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{p.eyebrow}</p>
              <p className="mt-2 font-serif text-xl font-medium text-ink tracking-tight">{p.name}</p>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">{p.tagline}</p>
              <p className="mt-4">
                <Link
                  href={`/products/${p.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:text-gold transition-colors underline underline-offset-4 decoration-rule hover:decoration-gold"
                >
                  Explore &rarr;
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Footer CTA ───────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section>
      <div className="container-narrow py-24 md:py-32 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink text-balance">
          Every tool call, attested.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
          Enterprise procurement and regulated deployments: reach out and
          we&rsquo;ll walk you through provisioning, tier gates, and audit
          chain setup.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/contact"
            className="font-mono text-sm uppercase tracking-[0.16em] text-ink border-b border-ink pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            Contact sales &rarr;
          </Link>
          <Link
            href="/demo"
            className="font-mono text-sm uppercase tracking-[0.16em] text-ink-2 hover:text-ink transition-colors"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page composition ─────────────────────────────────────────────────────

export default function ProductMcpPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <Highlights />
      <Architecture />
      <CoreComposition />
      <BuiltFor />
      <Values />
      <TierPicker />
      <Related />
      <FooterCTA />
    </main>
  );
}
