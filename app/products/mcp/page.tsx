import type { Metadata } from "next";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";
import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";

/**
 * PAGE · /products/mcp · Nebbos MCP product page
 *
 * Substrate v3 · migrated 2026-09-17 from legacy FullBleedScene + inline-
 * Tailwind to primitive composition + the shared `.product-page__*`
 * pattern under @layer patterns. Zero page-scoped CSS file.
 *
 * The MCP page composes eight sections on top of the shared shape:
 *   Hero · Highlights · Architecture · CoreComposition · BuiltFor ·
 *   Values · TierPicker · Related · FooterCTA
 *
 * Doctrine cross-refs:
 *   - feedback_nebbos_mcp_lives_on_usb_shared_code_structure_2026_09_14
 *   - feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14
 *   - feedback_nebbos_no_published_pricing_palantir_model
 */

const MCP_SUBSCRIPTIONS = subscriptionsForProduct("mcp");

export const metadata: Metadata = {
  title: "Nebbos MCP · The tool substrate. Attested.",
  description:
    "The Nebbos MCP mediates every tool call across your Nebbos platform. Binary and credentials ship on the Nebbos USB — physical presence gates elevated tiers. Server-verified attestation. Shell-scoped isolation.",
};

const HIGHLIGHTS = [
  { label: "Transport", value: "JSON-RPC over HTTPS", note: "Every call authenticated, versioned, and auditable." },
  { label: "Attestation", value: "Server-verified", note: "The MCP verifies factors before executing. Client claims mean nothing." },
  { label: "Isolation", value: "Shell-scoped", note: "Cross-Shell reads require enclave-signed approval. No accidental crossing." },
  { label: "Binary", value: "Ships on the USB", note: "Config, credentials, and code live on your Nebbos USB. Unplug removes them." },
  { label: "Quota", value: "Cost-follow overage", note: "Tool-call quotas per Shell. Overage billed at cost-follow with quarterly reconciliation." },
];

const ARCHITECTURE = [
  { heading: "One substrate, every tool call", body: "Every action that touches Shell state — reads, writes, mutations, cross-boundary joins — passes through the Nebbos MCP. There are no side channels, no direct database access, no host-shell backdoors." },
  { heading: "Tier-gate decorator", body: "Every tool declares its required tier (L1 · L2 · L3). The MCP verifies factors before executing. Missing biometric? Refused. Missing USB physical presence for L2? Refused. Missing enclave-signed approval for L3? Refused." },
  { heading: "Binary lives on the USB", body: "The MCP binary, the config, the attestation credentials, and the Shell state that seeds a session all ship on the encrypted Nebbos USB volume. When the device is mounted, the host reads and executes. Unplug, and the mount is gone; elevated calls cannot produce valid attestations." },
  { heading: "Audit chain on every call", body: "Every call writes an audit event with a hash-chained parent reference. Hash-chain verifiable end-to-end. Replay-proof, tamper-evident, discovery-ready." },
];

const BUILT_FOR = [
  { audience: "Enterprise operators", scope: "Every tool call authenticated, versioned, and auditable." },
  { audience: "Regulated verticals", scope: "Finance, healthcare, energy, defense contractors, government agencies." },
  { audience: "Platform builders", scope: "Nebbos.ai and your own domain-specific tools, one substrate." },
];

const VALUE_CARDS = [
  {
    factor: "Attestation",
    headline: "The MCP verifies. You don't claim.",
    body: "Every elevated call requires factors the server verifies against enrolled credentials. Signature counter, origin, attestation chain, tier gate — all checked before the tool runs.",
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

export default function ProductMcpPage() {
  const others = PRODUCTS.filter((p) => p.key !== "mcp");

  return (
    <>
      <PageHero
        surface="scene"
        align="start"
        eyebrow="Nebbos MCP"
        chapter="03"
        chapterLabel="Nebbos MCP"
        imageFamily="concept-pearl"
        priority
        headline={
          <>
            The tool substrate. <em>Attested.</em>
          </>
        }
        deck="Every tool your Nebbos platform runs passes through one substrate. The binary lives on your Nebbos USB. Physical presence gates the elevated tiers. Attestation is server-verified, not client-claimed."
        ctas={
          <>
            <Button variant="ghost" tone="onDark" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onDark" href="/demo">Book a demo</Button>
          </>
        }
      />

      <PageSection ruled>
        <Eyebrow>Get the highlights</Eyebrow>
        <h2 className="product-page__section-heading">Five commitments. One tool surface.</h2>
        <ul className="product-page__highlights-grid">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className="product-page__cell">
              <Eyebrow>{h.label}</Eyebrow>
              <p className="product-page__cell-value">{h.value}</p>
              <p className="product-page__cell-note">{h.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Take a closer look</Eyebrow>
        <h2 className="product-page__section-heading">How the substrate holds.</h2>
        <ul className="product-page__capabilities-list">
          {ARCHITECTURE.map((a) => (
            <li key={a.heading} className="product-page__capability-row">
              <h3 className="product-page__capability-heading">{a.heading}</h3>
              <p className="product-page__capability-body">{a.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>The core</Eyebrow>
        <h2 className="product-page__section-heading">
          One code tree. <em>Two surfaces.</em>
        </h2>
        <div className="product-page__core-body">
          <p>
            The Nebbos MCP and the Nebbos USB are one code tree. The binary
            ships on the encrypted USB volume; physical presence of the device
            is the hardware factor that gates elevated tiers.
          </p>
          <p>
            Without the USB plugged in, elevated permissions are not
            available. There is no cloud-only version of the MCP with the
            same authority. The device is the contract.
          </p>
          <Button variant="ghost" tone="onPaper" href="/products/usb">About the Nebbos USB</Button>
        </div>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>Built for</Eyebrow>
        <h2 className="product-page__section-heading">
          Operators who need their tools to prove <em>what they did.</em>
        </h2>
        <ul className="product-page__built-for-grid">
          {BUILT_FOR.map((b) => (
            <li key={b.audience} className="product-page__cell">
              <p className="product-page__audience">{b.audience}</p>
              <p className="product-page__cell-note">{b.scope}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Values</Eyebrow>
        <h2 className="product-page__section-heading">Three commitments. No exceptions.</h2>
        <ul className="product-page__values-grid">
          {VALUE_CARDS.map((v) => (
            <li key={v.factor} className="product-page__cell">
              <Eyebrow tone="accent">{v.factor}</Eyebrow>
              <p className="product-page__cell-headline">{v.headline}</p>
              <p className="product-page__cell-note">{v.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Choose your tier</Eyebrow>
        <h2 className="product-page__section-heading">One MCP. Three tiers.</h2>
        <p className="product-page__lede">
          Each tier unlocks a different scope of the tool surface. L2 and L3
          require the Nebbos USB physically plugged in; L3 additionally
          requires an enclave-signed approval token per admin call.
        </p>
        <ul className="product-page__tier-grid">
          {MCP_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="product-page__cell">
                <Eyebrow tone="accent">{tier.label}</Eyebrow>
                <p className="product-page__cell-headline">{sub.headline}</p>
                <p className="product-page__cell-note">
                  <strong>Factors</strong> · {tier.factors}
                </p>
                <p className="product-page__cell-note">
                  <strong>Ops</strong> · {tier.scope}
                </p>
                <div className="product-page__tier-cta">
                  <Button variant="ghost" tone="onPaper" href="/contact">Contact sales</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>The other three products</Eyebrow>
        <h2 className="product-page__section-heading">One matrix. Four products.</h2>
        <ul className="product-page__related-grid">
          {others.map((p) => (
            <li key={p.key} className="product-page__cell">
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <p className="product-page__cell-value">{p.name}</p>
              <p className="product-page__cell-note">{p.tagline}</p>
              <Button variant="ghost" tone="onPaper" href={`/products/${p.slug}`}>Explore</Button>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <div className="product-page__footer-cta">
          <h2 className="product-page__footer-headline">Every tool call, attested.</h2>
          <p className="product-page__footer-deck">
            Enterprise procurement and regulated deployments: reach out and
            we&rsquo;ll walk you through provisioning, tier gates, and audit
            chain setup.
          </p>
          <div className="product-page__footer-ctas">
            <Button variant="primary" tone="onPaper" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onPaper" href="/demo">Book a demo</Button>
          </div>
        </div>
      </PageSection>
    </>
  );
}
