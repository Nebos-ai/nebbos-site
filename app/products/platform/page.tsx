import type { Metadata } from "next";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";
import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import "./platform.css";

/**
 * PAGE · /products/platform · Nebbos.ai platform product page
 *
 * Substrate v3 · migrated 2026-09-16 from inline-Tailwind + legacy
 * FullBleedScene to primitive composition. Nine sections, all consuming
 * PageSection / PageHero / Eyebrow / Button. Zero inline style={{}},
 * zero hand-written font-mono text-[10px] tracking-[0.14em] literals.
 *
 * Doctrine cross-refs:
 *   - feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14
 *   - feedback_nebbos_no_published_pricing_palantir_model  (contact-sales, no dollar figures)
 */

const PLATFORM_SUBSCRIPTIONS = subscriptionsForProduct("platform");

export const metadata: Metadata = {
  title: "Nebbos.ai Platform · Institutional-scale AI operations.",
  description:
    "Runs your Pearls, your fleet, your governance. Multi-Shell by default. Every action attested. Every substrate yours.",
};

const HIGHLIGHTS = [
  { label: "Register", value: "Multi-Shell", note: "Shell isolation by default. Cross-Shell is a ceremony, not an accident." },
  { label: "Runtime", value: "Pearls at scale", note: "Every Pearl runs metered, isolated, and modular. Fleet-wide governance in one plane." },
  { label: "Auth", value: "Biometric-native", note: "Touch ID · Face ID · Windows Hello. Every session, every operator, every action." },
  { label: "Audit", value: "Hash-chained", note: "Every action writes a hash-chained audit event. Replay-proof, tamper-evident." },
  { label: "Deploy", value: "Live in production", note: "Running in K-12 school districts across multiple U.S. states today. Not vaporware." },
];

const CAPABILITIES = [
  { heading: "Pearl orchestration", body: "Run Pearl workflows in isolated Shells. Metered execution, per-Pearl audit trails, and per-Shell policy enforcement out of the box." },
  { heading: "Knowledge graph as memory", body: "Your operational context lives in a queryable graph. Every substrate change writes a settled entry; every query resolves to the same truth." },
  { heading: "Approval-as-a-mechanism", body: "Every elevated action gates on operator biometric plus the Nebbos Cradle. Approval is architectural, not a policy paragraph." },
  { heading: "Full-observability from day one", body: "Metrics, logs, traces, and audit shards wired from your first deploy. Not a follow-up quarter." },
];

const BUILT_FOR = [
  { audience: "Government agencies", scope: "Classified and sensitive operations at scale." },
  { audience: "Regulated enterprise", scope: "Finance, healthcare, energy, defense — every audit-heavy vertical." },
  { audience: "Institutional operators", scope: "Teams building the substrate other teams run on." },
];

const VALUE_CARDS = [
  {
    factor: "Sovereignty",
    headline: "You own the substrate you run on.",
    body: "Nebbos.ai does not lock you into our data plane. Your Shell state, your keys, your operators — portable to any Nebbos deployment.",
  },
  {
    factor: "Attestation",
    headline: "Approval is architectural.",
    body: "Every elevated action gates on biometric + Nebbos Cradle. No policy document; the platform refuses to execute without valid factors.",
  },
  {
    factor: "Cost-transparency",
    headline: "Model costs follow you, not us.",
    body: "Tool-call and Pearl usage bills at cost-follow with quarterly reconciliation. No fixed markup that grows with your workload.",
  },
];

export default function ProductPlatformPage() {
  const others = PRODUCTS.filter((p) => p.key !== "platform");

  return (
    <>
      <PageHero
        surface="scene"
        align="start"
        eyebrow="Nebbos.ai Platform"
        chapter="01"
        chapterLabel="Nebbos.ai Platform"
        imageFamily="concept-operator-onboarding"
        heroAlt="A morning briefing at a wide table, warm ochre-plaster walls in the background — the operator's first hour on the platform."
        priority
        headline={
          <>
            Your operations, <em>at institutional scale.</em>
          </>
        }
        deck="Runs your Pearls, your fleet, your governance. Multi-Shell by default. Every action attested. Every substrate yours. Running in K-12 school districts across multiple U.S. states today."
        ctas={
          <>
            <Button variant="ghost" tone="onDark" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onDark" href="/demo">Book a demo</Button>
          </>
        }
      />

      <PageSection ruled>
        <Eyebrow>Get the highlights</Eyebrow>
        <h2 className="platform__section-heading">Five commitments. One platform.</h2>
        <ul className="platform__highlights">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className="platform__highlight-cell">
              <Eyebrow>{h.label}</Eyebrow>
              <p className="platform__highlight-value">{h.value}</p>
              <p className="platform__cell-note">{h.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Take a closer look</Eyebrow>
        <h2 className="platform__section-heading">What the platform runs.</h2>
        <ul className="platform__capabilities">
          {CAPABILITIES.map((c) => (
            <li key={c.heading} className="platform__capability-row">
              <h3 className="platform__capability-heading">{c.heading}</h3>
              <p className="platform__capability-body">{c.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>The core</Eyebrow>
        <h2 className="platform__section-heading">
          The tools your platform runs <em>live on the substrate you own.</em>
        </h2>
        <div className="platform__core-body">
          <p>
            The platform composes with the Nebbos MCP (the tool substrate) and
            the Nebbos Cradle (the hardware attestation gate). Every tool call
            passes through the MCP; the MCP itself lives on your Cradle.
          </p>
          <p>You own the ground. Sovereignty isn&rsquo;t marketing — it&rsquo;s the architecture.</p>
          <Button variant="ghost" tone="onPaper" href="/products/mcp">About the Nebbos MCP</Button>
        </div>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>Built for</Eyebrow>
        <h2 className="platform__section-heading">
          The operators building <em>what runs next.</em>
        </h2>
        <ul className="platform__built-for">
          {BUILT_FOR.map((b) => (
            <li key={b.audience} className="platform__built-for-cell">
              <p className="platform__audience">{b.audience}</p>
              <p className="platform__cell-note">{b.scope}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Values</Eyebrow>
        <h2 className="platform__section-heading">Three commitments. Architectural, not aspirational.</h2>
        <ul className="platform__values">
          {VALUE_CARDS.map((v) => (
            <li key={v.factor} className="platform__value-cell">
              <Eyebrow tone="accent">{v.factor}</Eyebrow>
              <p className="platform__value-headline">{v.headline}</p>
              <p className="platform__cell-note">{v.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Choose your tier</Eyebrow>
        <h2 className="platform__section-heading">One platform. Three operator tiers.</h2>
        <p className="platform__tier-lede">
          Every operator seat gates on device biometric. L2 seats add the
          Nebbos Cradle physical-presence factor. L3 seats add enclave-signed
          approval for cross-boundary and quorum operations.
        </p>
        <ul className="platform__tier-grid">
          {PLATFORM_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="platform__tier-cell">
                <Eyebrow tone="accent">{tier.label}</Eyebrow>
                <p className="platform__value-headline">{sub.headline}</p>
                <p className="platform__cell-note">
                  <strong>Factors</strong> · {tier.factors}
                </p>
                <p className="platform__cell-note">
                  <strong>Ops</strong> · {tier.scope}
                </p>
                <div className="platform__tier-cta">
                  <Button variant="ghost" tone="onPaper" href="/contact">Contact sales</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>The other three products</Eyebrow>
        <h2 className="platform__section-heading">One matrix. Four products.</h2>
        <ul className="platform__related">
          {others.map((p) => (
            <li key={p.key} className="platform__related-cell">
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <p className="platform__related-name">{p.name}</p>
              <p className="platform__cell-note">{p.tagline}</p>
              <Button variant="ghost" tone="onPaper" href={`/products/${p.slug}`}>Explore</Button>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <div className="platform__footer-cta">
          <h2 className="platform__footer-headline">
            Run your operations on the substrate you own.
          </h2>
          <p className="platform__footer-deck">
            Enterprise and government procurement: reach out and we&rsquo;ll
            walk you through Shell provisioning, tier gates, and deployment.
          </p>
          <div className="platform__footer-ctas">
            <Button variant="primary" tone="onPaper" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onPaper" href="/demo">Book a demo</Button>
          </div>
        </div>
      </PageSection>
    </>
  );
}
