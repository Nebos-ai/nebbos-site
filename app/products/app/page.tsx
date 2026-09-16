import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";
import { FullBleedScene } from "@/components/site/FullBleedScene";

/**
 * PAGE · /products/app · the Nebbos app product page
 *
 * The local native application for macOS + Windows. Bundled with every
 * Platform subscription; runs an offline-capable subset and syncs to the
 * cloud through the MCP when online.
 */

const APP_PRODUCT = PRODUCTS.find((p) => p.key === "app")!;
const APP_SUBSCRIPTIONS = subscriptionsForProduct("app");

export const metadata: Metadata = {
  title: "Nebbos app · Local native. Yours.",
  description:
    "The Nebbos app for macOS and Windows. Runs offline-capable operations; syncs through the MCP when online. Bundled with every Platform subscription.",
};

function Hero() {
  return (
    <FullBleedScene
      className="hero-fullbleed"
      scene={{ imageFamily: "concept-memory", imageFamilyVariant: 1 }}
      scrim="bottom"
      vignetteStrength={0.5}
      chapter="02"
      chapterLabel="Nebbos app"
      priority
    >
      <div className="container hero-fullbleed__inner">
        <div className="hero-fullbleed__frame">
          <h1 className="hero-fullbleed__title">
            Local. Native. <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>Yours.</em>
          </h1>
          <p className="hero-fullbleed__deck">
            The Nebbos app for macOS and Windows. Runs an offline-capable
            subset of the platform. Syncs to the cloud through the Nebbos MCP
            when online. Every operator&rsquo;s first install.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, marginTop: 32 }}>
            <Link href="/contact" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--paper)", borderBottom: "1px solid var(--paper)", paddingBottom: 4, textDecoration: "none" }}>
              Contact sales &rarr;
            </Link>
            <Link href="/demo" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--paper-2)", textDecoration: "none", opacity: 0.85 }}>
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </FullBleedScene>
  );
}

const HIGHLIGHTS = [
  { label: "Platforms", value: "macOS · Windows", note: "Signed installers. Auto-update opt-in. No install wizard, no adware." },
  { label: "Mode", value: "Offline-capable", note: "Local-first workflows continue when the network doesn't." },
  { label: "Sync", value: "Through the MCP", note: "State reconciles on reconnect via authenticated MCP calls, not shared cloud storage." },
  { label: "Bundle", value: "Included with Platform", note: "Every Platform subscription includes the app at no separate charge." },
  { label: "Approval", value: "Biometric-first", note: "Elevated ops on local files gate on Touch ID · Face ID · Windows Hello." },
];

function Highlights() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Get the highlights</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Five commitments. One local surface.
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

const FEATURES = [
  { heading: "Runs where you work", body: "The app installs on macOS or Windows and integrates with the OS's native biometric surface. No web tab, no browser context." },
  { heading: "Offline is a first-class mode", body: "Read caches, draft actions, and queue elevated ops locally. When the network returns, everything reconciles through the MCP." },
  { heading: "Air-gapped deployments supported", body: "For sensitive contexts where continuous internet isn't safe, the app runs against a locally-hosted MCP with periodic manual sync." },
  { heading: "Enrolled once, used everywhere", body: "First-touch WebAuthn enrollment registers your biometric-bound credential. Every subsequent session uses that credential; no password to type." },
];

function Features() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-14 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Take a closer look</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">What the app is good at.</h2>
        </header>
        <ul className="space-y-10">
          {FEATURES.map((f) => (
            <li key={f.heading} className="border-t border-rule pt-6">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-ink tracking-tight">{f.heading}</h3>
              <p className="mt-3 max-w-2xl text-base text-ink-2 leading-relaxed">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Core() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-8 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">The core</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Bundled with{" "}
            <em className="font-serif italic text-gold">Platform.</em>
          </h2>
        </header>
        <div className="max-w-2xl space-y-6">
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            The Nebbos app is not a separate purchase. Every Platform seat
            includes the app for the operator on that seat. Install on any
            macOS or Windows machine that operator uses.
          </p>
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            When an operator pairs a Nebbos USB (L2 or L3), the app enables
            the tier-gated operations for the paired device. Same code, same
            binary &mdash; the gate is the presence, not a feature flag.
          </p>
          <p>
            <Link
              href="/products/platform"
              className="font-mono text-xs uppercase tracking-[0.14em] text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
            >
              About the Nebbos.ai platform &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

const BUILT_FOR = [
  { audience: "Field operators", scope: "The people executing outside a data center &mdash; deployment sites, remote offices, on the move." },
  { audience: "Air-gapped teams", scope: "Defense, classified, and disaster-recovery contexts where continuous internet isn't safe." },
  { audience: "Every Nebbos operator", scope: "Anyone on a Platform seat. First install, day one." },
];

function BuiltFor() {
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Built for</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            The operators working{" "}
            <em className="font-serif italic text-gold">where the network isn&rsquo;t.</em>
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

const VALUE_CARDS = [
  {
    factor: "Local isolation",
    headline: "Your data stays on your device.",
    body: "The app operates on local caches and drafts. Nothing transmits until you approve it via biometric assertion.",
  },
  {
    factor: "Biometric approval",
    headline: "Every elevated action, your fingerprint.",
    body: "Touch ID · Face ID · Windows Hello. The private key never leaves your device's Secure Enclave. No password, no shared token.",
  },
  {
    factor: "Signed distribution",
    headline: "Signed installers. Verifiable builds.",
    body: "Notarized on macOS, code-signed on Windows. Auto-update opt-in with signature verification per release. Reproducible from source.",
  },
];

function Values() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Values</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">Three commitments.</h2>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {VALUE_CARDS.map((v) => (
            <li key={v.factor} className="border-t border-rule pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">{v.factor}</p>
              <p className="mt-3 font-serif text-xl md:text-2xl font-medium text-ink tracking-tight leading-tight">{v.headline}</p>
              <p className="mt-4 text-base text-ink-2 leading-relaxed">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TierPicker() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Tiers</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Same app. Tier scope depends on your Platform seat.
          </h2>
          <p className="max-w-2xl text-base text-ink-2 leading-relaxed pt-2">
            The app itself is one binary. What it lets you do depends on
            your Platform tier. L2 unlocks paired-USB operations; L3 unlocks
            enclave-attested workstation ops.
          </p>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {APP_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="border-t border-rule pt-6 flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">{tier.label}</p>
                <p className="mt-3 font-serif text-xl md:text-2xl font-medium text-ink tracking-tight leading-tight">{sub.headline}</p>
                <p className="mt-4 text-sm text-ink-2 leading-relaxed">
                  <strong className="text-ink">Bundled with</strong> &middot; Platform {sub.tier} subscription
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

function Related() {
  const others = PRODUCTS.filter((p) => p.key !== "app");
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">The other three products</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">One matrix. Four products.</h2>
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

function FooterCTA() {
  return (
    <section>
      <div className="container-narrow py-24 md:py-32 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink text-balance">
          Native. Local. Every operator&rsquo;s first install.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
          The Nebbos app ships with every Platform subscription. Reach out
          and we&rsquo;ll walk you through onboarding, biometric enrollment,
          and USB pairing for elevated tiers.
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

export default function ProductAppPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <Highlights />
      <Features />
      <Core />
      <BuiltFor />
      <Values />
      <TierPicker />
      <Related />
      <FooterCTA />
    </main>
  );
}
