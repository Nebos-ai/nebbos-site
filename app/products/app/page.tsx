import type { Metadata } from "next";
import { PRODUCTS, TIERS } from "@/content/products";
import { subscriptionsForProduct } from "@/content/subscriptions";
import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import "./app.css";

/**
 * PAGE · /products/app · the Nebbos app product page
 *
 * Substrate v3 · migrated 2026-09-16 from inline-Tailwind + legacy
 * FullBleedScene to primitive composition. Nine sections; identical
 * structural shape to /products/platform, differentiated by copy.
 *
 * Doctrine cross-refs:
 *   - feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14
 *   - feedback_nebbos_no_published_pricing_palantir_model
 */

const APP_SUBSCRIPTIONS = subscriptionsForProduct("app");

export const metadata: Metadata = {
  title: "Nebbos App · Local native. Yours.",
  description:
    "The Nebbos app for macOS and Windows. Runs offline-capable operations; syncs through the MCP when online. Bundled with every Platform subscription.",
};

const HIGHLIGHTS = [
  { label: "Platforms", value: "macOS · Windows", note: "Signed installers. Auto-update opt-in. No install wizard, no adware." },
  { label: "Mode", value: "Offline-capable", note: "Local-first workflows continue when the network doesn't." },
  { label: "Sync", value: "Through the MCP", note: "State reconciles on reconnect via authenticated MCP calls, not shared cloud storage." },
  { label: "Bundle", value: "Included with Platform", note: "Every Platform subscription includes the app at no separate charge." },
  { label: "Approval", value: "Biometric-first", note: "Elevated ops on local files gate on Touch ID · Face ID · Windows Hello." },
];

const FEATURES = [
  { heading: "Runs where you work", body: "The app installs on macOS or Windows and integrates with the OS's native biometric surface. No web tab, no browser context." },
  { heading: "Offline is a first-class mode", body: "Read caches, draft actions, and queue elevated ops locally. When the network returns, everything reconciles through the MCP." },
  { heading: "Air-gapped deployments supported", body: "For sensitive contexts where continuous internet isn't safe, the app runs against a locally-hosted MCP with periodic manual sync." },
  { heading: "Enrolled once, used everywhere", body: "First-touch WebAuthn enrollment registers your biometric-bound credential. Every subsequent session uses that credential; no password to type." },
];

const BUILT_FOR = [
  { audience: "Field operators", scope: "The people executing outside a data center — deployment sites, remote offices, on the move." },
  { audience: "Air-gapped teams", scope: "Defense, classified, and disaster-recovery contexts where continuous internet isn't safe." },
  { audience: "Every Nebbos operator", scope: "Anyone on a Platform seat. First install, day one." },
];

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

export default function ProductAppPage() {
  const others = PRODUCTS.filter((p) => p.key !== "app");

  return (
    <>
      <PageHero
        surface="scene"
        align="start"
        eyebrow="Nebbos App"
        chapter="02"
        chapterLabel="Nebbos App"
        imageFamily="concept-memory"
        priority
        headline={
          <>
            Local. Native. <em>Yours.</em>
          </>
        }
        deck="The Nebbos app for macOS and Windows. Runs an offline-capable subset of the platform. Syncs to the cloud through the Nebbos MCP when online. Every operator's first install."
        ctas={
          <>
            <Button variant="ghost" tone="onDark" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onDark" href="/demo">Book a demo</Button>
          </>
        }
      />

      <PageSection ruled>
        <Eyebrow>Get the highlights</Eyebrow>
        <h2 className="app__section-heading">Five commitments. One local surface.</h2>
        <ul className="app__highlights">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className="app__highlight-cell">
              <Eyebrow>{h.label}</Eyebrow>
              <p className="app__highlight-value">{h.value}</p>
              <p className="app__cell-note">{h.note}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Take a closer look</Eyebrow>
        <h2 className="app__section-heading">What the app is good at.</h2>
        <ul className="app__capabilities">
          {FEATURES.map((f) => (
            <li key={f.heading} className="app__capability-row">
              <h3 className="app__capability-heading">{f.heading}</h3>
              <p className="app__capability-body">{f.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>The core</Eyebrow>
        <h2 className="app__section-heading">
          Bundled with <em>Platform.</em>
        </h2>
        <div className="app__core-body">
          <p>
            The Nebbos app is not a separate purchase. Every Platform seat
            includes the app for the operator on that seat. Install on any
            macOS or Windows machine that operator uses.
          </p>
          <p>
            When an operator pairs a Nebbos Cradle (L2 or L3), the app enables
            the tier-gated operations for the paired device. Same code, same
            binary — the gate is the presence, not a feature flag.
          </p>
          <Button variant="ghost" tone="onPaper" href="/products/platform">About the Nebbos.ai platform</Button>
        </div>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>Built for</Eyebrow>
        <h2 className="app__section-heading">
          The operators working <em>where the network isn&rsquo;t.</em>
        </h2>
        <ul className="app__built-for">
          {BUILT_FOR.map((b) => (
            <li key={b.audience} className="app__built-for-cell">
              <p className="app__audience">{b.audience}</p>
              <p className="app__cell-note">{b.scope}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Values</Eyebrow>
        <h2 className="app__section-heading">Three commitments.</h2>
        <ul className="app__values">
          {VALUE_CARDS.map((v) => (
            <li key={v.factor} className="app__value-cell">
              <Eyebrow tone="accent">{v.factor}</Eyebrow>
              <p className="app__value-headline">{v.headline}</p>
              <p className="app__cell-note">{v.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection ruled>
        <Eyebrow>Tiers</Eyebrow>
        <h2 className="app__section-heading">Same app. Tier scope depends on your Platform seat.</h2>
        <p className="app__tier-lede">
          The app itself is one binary. What it lets you do depends on your
          Platform tier. L2 unlocks paired-Cradle operations; L3 unlocks
          enclave-attested workstation ops.
        </p>
        <ul className="app__tier-grid">
          {APP_SUBSCRIPTIONS.map((sub) => {
            const tier = TIERS.find((t) => t.key === sub.tier)!;
            return (
              <li key={sub.sku_id} className="app__tier-cell">
                <Eyebrow tone="accent">{tier.label}</Eyebrow>
                <p className="app__value-headline">{sub.headline}</p>
                <p className="app__cell-note">
                  <strong>Bundled with</strong> · Platform {sub.tier} subscription
                </p>
                <p className="app__cell-note">
                  <strong>Ops</strong> · {tier.scope}
                </p>
                <div className="app__tier-cta">
                  <Button variant="ghost" tone="onPaper" href="/contact">Contact sales</Button>
                </div>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection ruled ground="paper2">
        <Eyebrow>The other three products</Eyebrow>
        <h2 className="app__section-heading">One matrix. Four products.</h2>
        <ul className="app__related">
          {others.map((p) => (
            <li key={p.key} className="app__related-cell">
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <p className="app__related-name">{p.name}</p>
              <p className="app__cell-note">{p.tagline}</p>
              <Button variant="ghost" tone="onPaper" href={`/products/${p.slug}`}>Explore</Button>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection>
        <div className="app__footer-cta">
          <h2 className="app__footer-headline">
            Native. Local. Every operator&rsquo;s first install.
          </h2>
          <p className="app__footer-deck">
            The Nebbos app ships with every Platform subscription. Reach out
            and we&rsquo;ll walk you through onboarding, biometric enrollment,
            and Cradle pairing for elevated tiers.
          </p>
          <div className="app__footer-ctas">
            <Button variant="primary" tone="onPaper" href="/contact">Contact sales</Button>
            <Button variant="ghost" tone="onPaper" href="/demo">Book a demo</Button>
          </div>
        </div>
      </PageSection>
    </>
  );
}
