import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { ArchitectureGrid } from "@/components/ui/ArchitectureGrid";
import { PlusMark } from "@/components/ui/PlusMark";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({ path: "/" });

export const dynamic = "force-static";
export const revalidate = false;

/**
 * Home — rebuild-2026 v4 · Delta brief editorial + doctrine v2 Shape 3 +
 * Wave 2C moncalisse amendment (signature-mark density, one-idea-per-viewport,
 * numbered section rhythm).
 */
function SectionNumeral({ n, label }: { n: string; label: string }) {
  return (
    <span className="section-numeral">
      <PlusMark size="sm" color="currentColor" />
      <span className="n">{n}</span>
      <span aria-hidden>·</span>
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero
        size="xl"
        eyebrow="Nebbos"
        title={
          <>
            Build your company&rsquo;s
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>brain</em>.
          </>
        }
        deck="Fifteen layers. One system. Owned by you."
      >
        <ButtonLink href="/demo" variant="primary">
          Book a demo
        </ButtonLink>
      </Hero>

      {/* Signature 15-layer architecture grid — the site's central visual.
          Wave 2C: promoted to a `.section-mono` one-idea-per-viewport panel. */}
      <section
        className="section-mono"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div className="container" style={{ maxWidth: 1240 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
            <SectionNumeral n="01" label="The architecture" />
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
              What you deploy · <em style={{ fontStyle: "italic", color: "var(--gold)" }}>foundation</em> to surface.
            </h2>
          </div>
          <ArchitectureGrid />
        </div>
      </section>

      <div className="section-divider-plus" aria-hidden>
        <PlusMark size="md" />
      </div>

      <FeatureRow
        eyebrow={<SectionNumeral n="02" label="What it does" />}
        title="It watches the work. Not the people."
        body={
          <p style={{ margin: 0 }}>
            Nebbos reads the signal your work already emits — decisions,
            handoffs, deadlines — and shows you what breaks next.
          </p>
        }
      />

      <FeatureRow
        reverse
        eyebrow={<SectionNumeral n="03" label="What you build" />}
        title={
          <>
            One <em style={{ fontStyle: "italic", color: "var(--gold)" }}>agent</em> per department.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Pre-educated in your work. Learns independently. Yours to keep.
          </p>
        }
      />

      <FeatureRow
        eyebrow={<SectionNumeral n="04" label="Why it matters" />}
        title={
          <>
            Every other AI trains{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>someone else&rsquo;s</em>{" "}
            model.
          </>
        }
        body={
          <p style={{ margin: 0 }}>
            Nebbos trains yours. The intelligence, the memory, the moat — owned
            by you, portable to you, compounding every quarter.
          </p>
        }
      />

      <CTABand
        headline="Put a Pearl on your hardest department."
        primary={{ label: "Book a demo", href: "/demo" }}
      />
    </>
  );
}
