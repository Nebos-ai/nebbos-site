import type { Metadata } from "next";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";
import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";

/**
 * PAGE · /products/cradle · Nebbos Cradle product page
 *
 * "Cradle" is the customer-facing brand name for the Nebbos hardware
 * substrate (DataLocker K350 USB form factor). Renamed 2026-09-17 per
 * founder directive — "USB is too generic." Cradle composes with the
 * existing brand vocabulary (BRAND.productLine: "Cradle · customer's owned
 * memory · portable when you leave"). Internal SKU keys still use "usb"
 * for stability; customer-facing surfaces say Cradle.
 *
 * Substrate v3 · primitive composition + shared .product-page__* pattern.
 *
 * Palette: --product-color-usb resolves to Nebbos Obsidian (#1D1C22).
 *
 * No published pricing per feedback_nebbos_no_published_pricing_palantir_model.
 */

const CRADLE_SUBSCRIPTIONS = subscriptionsForProduct("usb");

export const metadata: Metadata = {
  title: "Nebbos Cradle · Hardware-attested. FIPS 140-3 L3.",
  description:
    "The Nebbos Cradle carries the MCP and gates elevated permissions with hardware attestation. FIPS 140-3 L3 encrypted storage. On-device keypad. Tamper-evident. TAA.",
};

const HIGHLIGHTS = [
  { label: "Encryption", value: "FIPS 140-3 L3", note: "Federally-certified encrypted storage volume. AES-256 XTS." },
  { label: "Authentication", value: "On-device keypad", note: "PIN entry never traverses the host machine. Physical, isolated." },
  { label: "Ruggedness", value: "IP68 · MIL-STD-810G", note: "Waterproof, dust-tight, shock-tested. Field-deployable." },
  { label: "Tamper", value: "Epoxy-sealed", note: "Physical break-in required to open; the seal is the evidence." },
  { label: "Supply chain", value: "TAA-compliant", note: "No adversarial-jurisdiction components. Procurement-ready." },
];

const MATERIALS = [
  { heading: "Encrypted volume", body: "AES-256 XTS ciphertext at rest. Federal-tier key management with per-device unique wrapping keys. FIPS 140-3 Level 3 certified." },
  { heading: "On-device keypad", body: "PIN entered on the device itself, not on the host. A compromised host cannot capture the PIN. Programmable read-only and self-destruct modes for regulated deployments." },
  { heading: "Tamper-evident, epoxy-sealed", body: "Any physical intrusion is visible. The internal electronics are potted in place; extraction breaks the seal and voids attestation. There is no invisible way in." },
  { heading: "IP68 waterproof, MIL-STD-810G shock", body: "Full immersion, dust-tight, drop-tested to military-grade standards. Field-deployable in regulated, defense, and disaster-recovery contexts." },
  { heading: "TAA-compliant supply chain", body: "No components sourced from adversarial jurisdictions. Meets US federal Trade Agreements Act procurement requirements. Chain-of-custody documented from manufacture to activation." },
];

const BUILT_FOR = [
  { audience: "Governments", scope: "Classified and sensitive workloads." },
  { audience: "Regulated enterprises", scope: "Finance, healthcare, energy, defense contractors." },
  { audience: "Founder operators", scope: "The people building the substrate the rest run on." },
];

const VALUE_CARDS = [
  {
    factor: "Biometric",
    headline: "Approve every action with your device.",
    body: "Touch ID · Face ID · Windows Hello · Android BiometricPrompt. The private key never leaves your Secure Enclave. No password, no phishable secret, no shared token.",
  },
  {
    factor: "Physical presence",
    headline: "The Cradle is the second factor.",
    body: "Elevated tier operations require the Nebbos Cradle physically plugged in. A remote attacker cannot forge presence — the mount is the assertion.",
  },
  {
    factor: "Enclave-signed",
    headline: "Admin operations pass through the enclave.",
    body: "Cross-boundary reads, substrate mutations, and quorum-required actions require an enclave-signed approval token. Multi-party ceremonies supported for the highest-consequence changes.",
  },
];

export default function ProductCradlePage() {
  const others = PRODUCTS.filter((p) => p.key !== "usb");

  return (
    <>
      <PageHero
        surface="scene"
        align="start"
        eyebrow="Nebbos Cradle"
        chapter="04"
        chapterLabel="Nebbos Cradle"
        imageFamily="concept-audit-attestation"
        heroAlt="Two people at a table in a stately European office, golden-hour light catching a white shirt cuff — the moment a Cradle authenticates an operator for a privileged action."
        priority
        headline={
          <>
            Peace of mind <em>you can hold.</em>
          </>
        }
        deck="Hardware-attested security for the operators running work that matters. FIPS 140-3 Level 3. On-device keypad. Tamper-evident and epoxy-sealed. The Nebbos MCP ships on the device — physical presence gates every elevated action."
        ctas={
          <>
            <Button variant="ghost" tone="onDark" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onDark" href="/demo">Book a demo</Button>
          </>
        }
      />

      <PageSection ruled>
        <Eyebrow>Get the highlights</Eyebrow>
        <h2 className="product-page__section-heading">Five commitments. One device.</h2>
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
        <h2 className="product-page__section-heading">Every layer designed to be trusted.</h2>
        <ul className="product-page__capabilities-list">
          {MATERIALS.map((m) => (
            <li key={m.heading} className="product-page__capability-row">
              <h3 className="product-page__capability-heading">{m.heading}</h3>
              <p className="product-page__capability-body">{m.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>The core</Eyebrow>
        <h2 className="product-page__section-heading">
          The MCP <em>lives on the device.</em>
        </h2>
        <div className="product-page__core-body">
          <p>
            The Nebbos MCP is the tool substrate that mediates every elevated
            action across the Nebbos platform. On other systems it would run
            in a cloud you can&rsquo;t see.
          </p>
          <p>
            On the Nebbos Cradle, the MCP binary and every credential ship on
            the encrypted volume. Plug in, authenticate on the keypad, and
            the MCP starts. Unplug, and elevated permissions are no longer
            available. The MCP goes where you go — nowhere else.
          </p>
          <Button variant="ghost" tone="onPaper" href="/products/mcp">About the Nebbos MCP</Button>
        </div>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>Built for</Eyebrow>
        <h2 className="product-page__section-heading">
          The operators running work that must not <em>leak.</em>
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
        <h2 className="product-page__section-heading">Three factors. Composed top-down.</h2>
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
        <h2 className="product-page__section-heading">
          Three tiers. Twelve total SKUs across the four products.
        </h2>
        <p className="product-page__lede">
          Each Nebbos Cradle ships in the tier you buy — L1 basic, L2
          privileged, L3 admin. Higher tiers unlock more of the MCP surface,
          gated by the composition of biometric + Cradle + enclave-signed
          approval below.
        </p>
        <ul className="product-page__tier-grid">
          {CRADLE_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="product-page__cell">
                <Eyebrow tone="accent">{tier.label}</Eyebrow>
                <p className="product-page__cell-headline">{sub.headline}</p>
                <p className="product-page__cell-note">
                  <strong>Factors</strong> · {tier.factors}
                </p>
                <p className="product-page__cell-note">
                  <strong>Includes</strong> · {sub.minimum_commit.monthly_floor_note}
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
          <h2 className="product-page__footer-headline">
            Ready to hold the substrate that runs your work?
          </h2>
          <p className="product-page__footer-deck">
            Enterprise procurement, government agencies, and founder
            operators: reach out and we&rsquo;ll walk you through
            provisioning, tiering, and deployment.
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
