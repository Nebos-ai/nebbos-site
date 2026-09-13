import { Hero } from "@/components/ui/Hero";
import { FeatureRow } from "@/components/ui/FeatureRow";
import { CTABand } from "@/components/ui/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Presentation",
  path: "/presentation",
  description:
    "Nebbos in four slides. What the run layer does, what it meters, and what changes when your calls go through it. Embedded PDF at the bottom.",
});

/**
 * /presentation — the canonical presentation surface (Wave 1 · 2026-09-13)
 *
 * Was: linked from 4 pages in /platform/* with no route to serve it.
 * Now: real page carrying the four-slide run-layer story, followed by the
 * downloadable PDF embed (already shipped at /public/nebbos-presentation.pdf).
 *
 * Voice: run-layer doctrine (per feedback_nebbos_real_voice_run_layer_clarity_mcp_stance
 * + reference_nebbos_north_star_run_layer_architecture). Nebbos speaks as the
 * substrate being called. Customer-facing terms: Pearl runs the workload,
 * tokens meter the consumption, nested calls roll up their traces, the
 * knowledge graph settles the truth.
 */

const slides = [
  {
    k: "01",
    title: "Every AI call needs a run layer.",
    body: "The class of work that sits between intent and state. Not the model. Not the app. The layer that decides whether the call runs, what it costs, what it touches, and what it leaves behind.",
  },
  {
    k: "02",
    title: "Metered. Isolated. Modular.",
    body: "Every call is measured — tokens are the unit of accounting. Every call is scoped — no reach across workloads. Every call is composable — nested calls roll up, the substrate settles. Not a wrapper. A runtime.",
  },
  {
    k: "03",
    title: "Pearl runs. Tokens meter. Nested calls rollup. KG settles.",
    body: "Four primitives. Pearl is the VM your workload runs on. Tokens are the unit of accounting — every consumption traced to its origin. Nested calls roll their traces back up to Pearl. The knowledge graph is where the substrate settles the truth.",
  },
  {
    k: "04",
    title: "Deploy on Nebbos. Every call is governed by default.",
    body: "Governance is not a feature layered on top. It is the shape of the runtime. Every call you route through Nebbos carries its own audit, its own metering, its own isolation. You do not opt in. You get it because you deployed here.",
  },
];

export default function PresentationPage() {
  return (
    <>
      <Hero
        eyebrow="Presentation"
        title={
          <>
            Nebbos in{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>four slides.</em>
          </>
        }
        deck="What the run layer does. What it meters. What changes when your calls go through it."
      />

      {slides.map((s) => (
        <FeatureRow
          key={s.k}
          eyebrow={s.k}
          title={s.title}
          body={<p style={{ margin: 0 }}>{s.body}</p>}
        />
      ))}

      {/* PDF embed — the same 4-slide deck, downloadable. iframe is
          intentional: modern browsers render PDFs inline via the built-in
          viewer, and the download button below covers the "give me a file"
          reader. */}
      <section style={{ padding: "clamp(48px, 8vh, 96px) 0", background: "var(--paper-2)" }}>
        <div className="container">
          <div
            className="plus-marker"
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--size-eyebrow)",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--gold)",
                margin: 0,
              }}
            >
              The deck, on paper
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "var(--size-h2)",
                lineHeight: 1.06,
                letterSpacing: "-0.022em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: 0,
                maxWidth: "26ch",
                textWrap: "balance",
              }}
            >
              Same four slides. Portable, printable, forwardable.
            </h2>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                border: "1px solid var(--rule)",
                background: "var(--paper)",
              }}
            >
              <iframe
                src="/nebbos-presentation.pdf#view=FitH"
                title="Nebbos presentation (PDF)"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="Walk it live with the team who runs it."
        deck="The presentation is the surface. The runtime is the substance. Book a demo and see the same primitives running against your real workload shape."
        primary={{ label: "Book a demo", href: "/demo" }}
        secondary={{ label: "Download the PDF", href: "/nebbos-presentation.pdf" }}
      />
    </>
  );
}
