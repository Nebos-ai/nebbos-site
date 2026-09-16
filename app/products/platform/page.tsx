import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";
import { FullBleedScene } from "@/components/site/FullBleedScene";

/**
 * PAGE · /products/platform · the Nebbos.ai platform product page
 *
 * Follows the 14-section Apple device-marketing arc adapted for the
 * flagship software product. Sections align to the ratified product
 * framing per feedback_nebbos_ai_product_framing_platform_tools_mcp_
 * usb_security_2026_09_14.
 */

const PLATFORM_PRODUCT = PRODUCTS.find((p) => p.key === "platform")!;
const PLATFORM_SUBSCRIPTIONS = subscriptionsForProduct("platform");

export const metadata: Metadata = {
  title: "Nebbos.ai platform · The AI operations platform for institutional scale.",
  description:
    "Runs your Pearls, your fleet, your governance. Multi-Shell by default. Live in production with government and enterprise customers today.",
};

function Hero() {
  return (
    <FullBleedScene
      className="hero-fullbleed"
      scene={{ imageFamily: "concept-operator-onboarding", imageFamilyVariant: 1 }}
      scrim="bottom"
      vignetteStrength={0.5}
      chapter="01"
      chapterLabel="Nebbos.ai platform"
      priority
    >
      <div className="container hero-fullbleed__inner">
        <div className="hero-fullbleed__frame">
          <h1 className="hero-fullbleed__title">
            Your operations, <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>at institutional scale.</em>
          </h1>
          <p className="hero-fullbleed__deck">
            Runs your Pearls, your fleet, your governance. Multi-Shell by
            default. Live in production with government and enterprise
            customers today. Every action attested. Every substrate yours.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, marginTop: 32 }}>
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--paper)",
                borderBottom: "1px solid var(--paper)",
                paddingBottom: 4,
                textDecoration: "none",
              }}
            >
              Contact sales &rarr;
            </Link>
            <Link
              href="/demo"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--paper-2)",
                textDecoration: "none",
                opacity: 0.85,
              }}
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </FullBleedScene>
  );
}

const HIGHLIGHTS = [
  { label: "Register", value: "Multi-Shell", note: "Shell isolation by default. Cross-Shell is a ceremony, not an accident." },
  { label: "Runtime", value: "Pearls at scale", note: "Every Pearl runs metered, isolated, and modular. Fleet-wide governance in one plane." },
  { label: "Auth", value: "Biometric-native", note: "Touch ID · Face ID · Windows Hello. Every session, every operator, every action." },
  { label: "Audit", value: "Hash-chained", note: "Every action writes a hash-chained audit event. Replay-proof, tamper-evident." },
  { label: "Deploy", value: "Live in production", note: "In use today by government and enterprise customers. Not vaporware." },
];

function Highlights() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Get the highlights</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Five commitments. One platform.
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

const CAPABILITIES = [
  { heading: "Pearl orchestration", body: "Run Pearl workflows in isolated Shells. Metered execution, per-Pearl audit trails, and per-Shell policy enforcement out of the box." },
  { heading: "Knowledge graph as memory", body: "Your operational context lives in a queryable graph. Every substrate change writes a settled entry; every query resolves to the same truth." },
  { heading: "Approval-as-a-mechanism", body: "Every elevated action gates on operator biometric plus the Nebbos USB. Approval is architectural, not a policy paragraph." },
  { heading: "Full-observability from day one", body: "Metrics, logs, traces, and audit shards wired from your first deploy. Not a follow-up quarter." },
];

function Capabilities() {
  return (
    <section className="border-b border-rule">
      <div className="container-narrow py-24 md:py-32">
        <header className="space-y-3 mb-14 max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Take a closer look</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">What the platform runs.</h2>
        </header>
        <ul className="space-y-10">
          {CAPABILITIES.map((c) => (
            <li key={c.heading} className="border-t border-rule pt-6">
              <h3 className="font-serif text-xl md:text-2xl font-medium text-ink tracking-tight">{c.heading}</h3>
              <p className="mt-3 max-w-2xl text-base text-ink-2 leading-relaxed">{c.body}</p>
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
            The tools your platform runs{" "}
            <em className="font-serif italic text-gold">live on the substrate you own.</em>
          </h2>
        </header>
        <div className="max-w-2xl space-y-6">
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            The platform composes with the Nebbos MCP (the tool substrate) and
            the Nebbos USB (the hardware attestation gate). Every tool call
            passes through the MCP; the MCP itself lives on your USB.
          </p>
          <p className="text-base md:text-lg text-ink-2 leading-relaxed">
            You own the ground. Sovereignty isn&rsquo;t marketing &mdash;
            it&rsquo;s the architecture.
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

const BUILT_FOR = [
  { audience: "Government agencies", scope: "Classified and sensitive operations at scale." },
  { audience: "Regulated enterprise", scope: "Finance, healthcare, energy, defense &mdash; every audit-heavy vertical." },
  { audience: "Institutional operators", scope: "Teams building the substrate other teams run on." },
];

function BuiltFor() {
  return (
    <section className="border-b border-rule bg-paper-2">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Built for</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            The operators building{" "}
            <em className="font-serif italic text-gold">what runs next.</em>
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
    factor: "Sovereignty",
    headline: "You own the substrate you run on.",
    body: "Nebbos.ai does not lock you into our data plane. Your Shell state, your keys, your operators &mdash; portable to any Nebbos deployment.",
  },
  {
    factor: "Attestation",
    headline: "Approval is architectural.",
    body: "Every elevated action gates on biometric + Nebbos USB. No policy document; the platform refuses to execute without valid factors.",
  },
  {
    factor: "Cost-transparency",
    headline: "Model costs follow you, not us.",
    body: "Tool-call and Pearl usage bills at cost-follow with quarterly reconciliation. No fixed markup that grows with your workload.",
  },
];

function Values() {
  return (
    <section className="border-b border-rule">
      <div className="container py-24 md:py-32">
        <header className="max-w-3xl space-y-3 mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Values</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            Three commitments. Architectural, not aspirational.
          </h2>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">Choose your tier</p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            One platform. Three operator tiers.
          </h2>
          <p className="max-w-2xl text-base text-ink-2 leading-relaxed pt-2">
            Every operator seat gates on device biometric. L2 seats add the
            Nebbos USB physical-presence factor. L3 seats add enclave-signed
            approval for cross-boundary and quorum operations.
          </p>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLATFORM_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="border-t border-rule pt-6 flex flex-col">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">{tier.label}</p>
                <p className="mt-3 font-serif text-xl md:text-2xl font-medium text-ink tracking-tight leading-tight">{sub.headline}</p>
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

function Related() {
  const others = PRODUCTS.filter((p) => p.key !== "platform");
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
          Run your operations on the substrate you own.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-ink-2 leading-relaxed">
          Enterprise and government procurement: reach out and we&rsquo;ll
          walk you through Shell provisioning, tier gates, and deployment.
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

export default function ProductPlatformPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Hero />
      <Highlights />
      <Capabilities />
      <Core />
      <BuiltFor />
      <Values />
      <TierPicker />
      <Related />
      <FooterCTA />
    </main>
  );
}
