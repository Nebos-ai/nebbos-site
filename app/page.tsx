import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { ArchitectureGraph } from "@/components/ui/ArchitectureGraph";
import { PlusMark } from "@/components/ui/PlusMark";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { constructMetadata } from "@/lib/seo/constructMetadata";

export const metadata = constructMetadata({ path: "/" });

export const dynamic = "force-static";
export const revalidate = false;

/**
 * Home — rebuild-2026 v4 · Delta brief editorial + doctrine v2 Shape 3 +
 * Wave 2C moncalisse amendment (signature-mark density, one-idea-per-viewport,
 * numbered section rhythm).
 */

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

      {/* Signature 15-layer knowledge graph — the site's central visual.
          Wave 3h · full-viewport section, graph fills the canvas, inline
          note-cards at each node. */}
      <section
        style={{
          borderTop: "1px solid var(--rule)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "56px 0 72px",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: 1440,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <SectionNumeral n="01" label="The architecture" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 4.2vw, 52px)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              Fifteen layers. One system. <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Owned</em> by you.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                maxWidth: "52ch",
                margin: 0,
              }}
            >
              Hover any node — the layer, what it does, and its proof-points appear inline.
              Click to pin. Escape to release.
            </p>
          </div>
          <div style={{ flex: 1, display: "flex" }}>
            <ArchitectureGraph />
          </div>
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
