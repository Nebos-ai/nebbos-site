import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";

/**
 * PAGE · /products/usb · the Nebbos USB product page
 *
 * Follows the 14-section Apple device-marketing arc named in
 * docs/reference/apple-device-marketing-patterns-2026-09-14.md.
 * Institutional Reserve site chrome (paper ground, hairlines, no cards
 * or shadows) — depth reserved for the hero's cinematic still moment.
 *
 * Consumes:
 *  - content/products.ts (typed 4×3 taxonomy)
 *  - content/subscriptions.ts (per-tier subscription structure)
 *
 * Palette: --product-color-usb resolves to Nebbos Obsidian (#1D1C22)
 * pending founder ratification per docs/reference/nebbos-hardware-
 * color-palette-2026-09-14.md.
 *
 * No published pricing per feedback_marketing_site_pricing_editorial_
 * discipline. Every tier CTA routes to /contact.
 */

const USB_PRODUCT = PRODUCTS.find((p) => p.key === "usb")!;
const USB_SUBSCRIPTIONS = subscriptionsForProduct("usb");

export const metadata: Metadata = {
  title: "Nebbos USB · Hardware-attested. FIPS 140-3 L3.",
  description:
    "The Nebbos USB carries the MCP and gates elevated permissions with hardware attestation. FIPS 140-3 Level 3 encrypted storage. On-device keypad. Tamper-evident and epoxy-sealed. TAA-compliant.",
};

// ── Section 1 · Hero ─────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-32 md:py-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
          Nebbos USB
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-ink leading-[1.02] text-balance">
          Peace of mind{" "}
          <em className="font-serif italic text-gold">
            you can hold.
          </em>
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-2 leading-relaxed">
          Hardware-attested security for the operators running work that matters.
          FIPS 140-3 Level 3. On-device keypad. Tamper-evident and
          epoxy-sealed. The Nebbos MCP ships on the device &mdash; physical
          presence gates every elevated action.
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

// ── Section 2 · Get the highlights ───────────────────────────────────────

const HIGHLIGHTS = [
  {
    label: "Encryption",
    value: "FIPS 140-3 L3",
    note: "Federally-certified encrypted storage volume. AES-256 XTS.",
  },
  {
    label: "Authentication",
    value: "On-device keypad",
    note: "PIN entry never traverses the host machine. Physical, isolated.",
  },
  {
    label: "Ruggedness",
    value: "IP68 · MIL-STD-810G",
    note: "Waterproof, dust-tight, shock-tested. Field-deployable.",
  },
  {
    label: "Tamper",
    value: "Epoxy-sealed",
    note: "Physical break-in required to open; the seal is the evidence.",
  },
  {
    label: "Supply chain",
    value: "TAA-compliant",
    note: "No adversarial-jurisdiction components. Procurement-ready.",
  },
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
            Five commitments. One device.
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className="border-t border-rule pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                {h.label}
              </p>
              <p className="mt-2 font-serif text-2xl font-medium text-ink leading-tight">
                {h.value}
              </p>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                {h.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 3 · Take a closer look (physical tour) ───────────────────────

const MATERIALS = [
  {
    heading: "Encrypted volume",
    body: "AES-256 XTS ciphertext at rest. Federal-tier key management with per-device unique wrapping keys. FIPS 140-3 Level 3 certified.",
  },
  {
    heading: "On-device keypad",
    body: "PIN entered on the device itself, not on the host. A compromised host cannot capture the PIN. Programmable read-only and self-destruct modes for regulated deployments.",
  },
  {
    heading: "Tamper-evident, epoxy-sealed",
    body: "Any physical intrusion is visible. The internal electronics are potted in place; extraction breaks the seal and voids attestation. There is no invisible way in.",
  },
  {
    heading: "IP68 waterproof, MIL-STD-810G shock",
    body: "Full immersion, dust-tight, drop-tested to military-grade standards. Field-deployable in regulated, defense, and disaster-recovery contexts.",
  },
  {
    heading: "TAA-compliant supply chain",
    body: "No components sourced from adversarial jurisdictions. Meets US federal Trade Agreements Act procurement requirements. Chain-of-custody documented from manufacture to activation.",
  },
];

function CloserLook() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-14 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Take a closer look
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Every layer designed to be trusted.
          </h2>
        </header>
        <ul className="space-y-10">
          {MATERIALS.map((m) => (
            <li key={m.heading} className="border-t border-rule pt-6">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-ink tracking-tight">
                {m.heading}
              </h3>
              <p className="mt-3 max-w-2xl text-base text-ink-2 leading-relaxed">
                {m.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 4 · The core (MCP substrate) ─────────────────────────────────

function CoreSubstrate() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-8 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            The core
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            The MCP{" "}
            <em className="font-serif italic text-gold">lives on the device.</em>
          </h2>
        </header>
        <div className="max-w-2xl space-y-6">
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            The Nebbos MCP is the tool substrate that mediates every elevated
            action across the Nebbos platform. On other systems it would run
            in a cloud you can&rsquo;t see.
          </p>
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            On the Nebbos USB, the MCP binary and every credential ship on
            the encrypted volume. Plug in, authenticate on the keypad, and
            the MCP starts. Unplug, and elevated permissions are no longer
            available. The MCP goes where you go &mdash; nowhere else.
          </p>
          <p>
            <Link
              href="/products/mcp"
              className="font-mono text-xs uppercase tracking-[0.14em] text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
            >
              About the Nebbos MCP &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Section 5-6 · Performance / Built-for ────────────────────────────────

const BUILT_FOR = [
  { audience: "Governments", scope: "Classified and sensitive workloads." },
  { audience: "Regulated enterprises", scope: "Finance, healthcare, energy, defense contractors." },
  { audience: "Founder operators", scope: "The people building the substrate the rest run on." },
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
            The operators running work that must not{" "}
            <em className="font-serif italic text-gold">leak.</em>
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BUILT_FOR.map((b) => (
            <li key={b.audience} className="border-t border-rule pt-5">
              <p className="font-serif text-2xl font-medium text-ink tracking-tight">
                {b.audience}
              </p>
              <p className="mt-3 text-base text-ink-2 leading-relaxed">
                {b.scope}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 12 · Values (security three-card) ────────────────────────────

const VALUE_CARDS = [
  {
    factor: "Biometric",
    headline: "Approve every action with your device.",
    body: "Touch ID · Face ID · Windows Hello · Android BiometricPrompt. The private key never leaves your Secure Enclave. No password, no phishable secret, no shared token.",
  },
  {
    factor: "Physical presence",
    headline: "The USB is the second factor.",
    body: "Elevated tier operations require the Nebbos USB physically plugged in. A remote attacker cannot forge presence &mdash; the mount is the assertion.",
  },
  {
    factor: "Enclave-signed",
    headline: "Admin operations pass through the enclave.",
    body: "Cross-boundary reads, substrate mutations, and quorum-required actions require an enclave-signed approval token. Multi-party ceremonies supported for the highest-consequence changes.",
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
            Three factors. Composed top-down.
          </h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUE_CARDS.map((v) => (
            <li key={v.factor} className="border-t border-rule pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
                {v.factor}
              </p>
              <p className="mt-3 font-serif text-xl md:text-2xl font-medium text-ink tracking-tight leading-tight">
                {v.headline}
              </p>
              <p className="mt-4 text-base text-ink-2 leading-relaxed">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Section 13 · Tier picker (subscription models per tier) ──────────────

function TierPicker() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
            Choose your tier
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Three tiers. Twelve total SKUs across the four products.
          </h2>
          <p className="max-w-2xl text-base text-ink-2 leading-relaxed pt-2">
            Each Nebbos USB ships in the tier you buy &mdash; L1 basic, L2
            privileged, L3 admin. Higher tiers unlock more of the MCP surface,
            gated by the composition of biometric + USB + enclave-signed
            approval below.
          </p>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USB_SUBSCRIPTIONS.map((sub) => {
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
                  <strong className="text-ink">Includes</strong> &middot;{" "}
                  {sub.minimum_commit.monthly_floor_note}
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

// ── Section 14 · Related products ────────────────────────────────────────

function Related() {
  const others = PRODUCTS.filter((p) => p.key !== "usb");
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
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                {p.eyebrow}
              </p>
              <p className="mt-2 font-serif text-xl font-medium text-ink tracking-tight">
                {p.name}
              </p>
              <p className="mt-3 text-sm text-ink-2 leading-relaxed">
                {p.tagline}
              </p>
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
          Ready to hold the substrate that runs your work?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
          Enterprise procurement, government agencies, and founder operators:
          reach out and we&rsquo;ll walk you through provisioning, tiering,
          and deployment.
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

export default function ProductUsbPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <Highlights />
      <CloserLook />
      <CoreSubstrate />
      <BuiltFor />
      <Values />
      <TierPicker />
      <Related />
      <FooterCTA />
    </main>
  );
}
