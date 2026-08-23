import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { PlusMark } from "@/components/ui/PlusMark";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { EcosystemBridge } from "@/components/ui/EcosystemBridge";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({
  title: "Model training",
  path: "/solutions/model-training",
  description:
    "Your operation is your training data. Nebbos captures every human decision — approvals, edits, overrides — as preference pairs, portable to any model you own.",
});

export const dynamic = "force-static";
export const revalidate = false;

/**
 * /solutions/model-training · Wave 3e · founder directive 2026-08-23:
 * "we need to add all of this to the website. show the two categories
 *  and make a map showing two ecosystems and nebbos being central living
 *  in both. we need to think of a creative way to show this on the site."
 *
 * Introduces the two-ecosystem framing (AI governance + Model training)
 * with Nebbos as the shared substrate. Ships the <EcosystemBridge> visual
 * as the page's signature — full SVG bridge on desktop, stacked list on
 * mobile (per founder directive 2026-08-23: "the site needs to be built
 * for all screen sizes including mobile").
 */
export default function ModelTrainingPage() {
  return (
    <>
      <Hero
        eyebrow="Model training"
        title={
          <>
            Your operation is your
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>training</em> data.
          </>
        }
        deck="Every approval, every edit, every override — a preference pair. Portable to any model you own."
      >
        <ButtonLink href="/demo" variant="primary">Book a demo</ButtonLink>
        <ButtonLink href="/platform" variant="ghost">See the platform</ButtonLink>
      </Hero>

      {/* Section 01 · The premise */}
      <FeatureRow
        eyebrow={<SectionNumeral n="01" label="The premise" />}
        title={
          <>
            Every human decision is a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>preference pair</em>.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            RLHF firms charge $8+ per preference pair. Nebbos generates them as
            an operational byproduct — every time your team approves an agent&rsquo;s
            suggestion, edits it, or overrides it, that&rsquo;s labeled training
            signal for your model. No labeling contract. No side workflow. Just
            the work you were doing anyway.
          </p>
        }
      />

      {/* Section 02 · The map — the signature visual */}
      <section
        className="section-mono"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div className="container" style={{ maxWidth: 1240 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
            <SectionNumeral n="02" label="The map" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(24px, 2.6vw, 32px)",
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Two ecosystems · <em style={{ fontStyle: "italic", color: "var(--gold)" }}>one</em> substrate.
            </h2>
          </div>
          <EcosystemBridge />
        </div>
      </section>

      {/* Section 03 · What Nebbos captures */}
      <FeatureRow
        eyebrow={<SectionNumeral n="03" label="What Nebbos captures" />}
        title="Six primitives, all training signal."
        body={
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <PrimitiveLine name="Memory" value="Every interaction, timestamped, tenant-scoped." />
            <PrimitiveLine name="Approval" value="Every approve / reject / edit = a labeled preference." />
            <PrimitiveLine name="Detectors" value="Every edge case flagged = high-signal training example." />
            <PrimitiveLine name="Pearl" value="Every agent action + human override = a behavior trace." />
            <PrimitiveLine name="API + MCP" value="One export contract to your fine-tune / eval pipeline." />
            <PrimitiveLine name="Attestation" value="Every export carries its audit chain — provenance intact." />
          </div>
        }
      />

      {/* Section 04 · What you export */}
      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="04" label="What you export" />}
        title={
          <>
            Formats your <em style={{ fontStyle: "italic", color: "var(--gold)" }}>pipeline</em> already speaks.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            JSONL preference pairs for RLHF. Chat-format traces for supervised
            fine-tuning. Structured eval sets sliced by department. Every export
            carries the audit chain so a compliance question about a training
            example lands at the specific approval decision it came from.
          </p>
        }
      />

      {/* Section 05 · Portable */}
      <FeatureRow
        eyebrow={<SectionNumeral n="05" label="Portable" />}
        title="Point it at any base model."
        body={
          <p style={{ margin: 0 }}>
            The training corpus is yours. You own the tenant, the substrate, the
            data. Fine-tune a Claude, a GPT, a Llama, your own from-scratch
            model — swap the base without losing what your team taught it. Your
            moat compounds inside your walls, not somebody else&rsquo;s API.
          </p>
        }
      />

      <CTABand
        headline="Build your own model on your own operation."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "See the architecture", href: "/platform/architecture" }}
      />
    </>
  );
}

/**
 * PrimitiveLine · a compact list row for Section 03 — one Nebbos primitive
 * paired with its training-signal contribution. Uses PlusMark as bullet.
 */
function PrimitiveLine({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "baseline" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 120 }}>
        <PlusMark size="xs" color="var(--accent-2)" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500 }}>
          {name}
        </span>
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5 }}>
        {value}
      </span>
    </div>
  );
}
