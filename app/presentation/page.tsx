import { PageHero } from "@/components/primitives/PageHero";
import { PageSection } from "@/components/primitives/PageSection";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/primitives/Button";
import { SectionDivider } from "@/components/patterns/section-divider";
import { pageMetadata } from "@/lib/seo";
import "./presentation.css";

export const metadata = pageMetadata({
  title: "Presentation",
  path: "/presentation",
  description:
    "Nebbos in four slides. The platform. Its tools. Its MCP. Its Cradle. Embedded PDF at the bottom.",
});

/**
 * /presentation · v3 · 2026-09-18 · migrated to v3 primitives + Cradle framing
 *
 * v2 (2026-09-13) shipped legacy Hero + 4× FeatureRow + CTABand — the exact
 * "wall of text" template the founder called out on /platform 2026-09-18.
 * Voice was pre-2026-09-14 run-layer (retired for customer surfaces per
 * feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14).
 *
 * v3 replaces the legacy component set with v3 primitives (PageHero,
 * PageSection, Eyebrow, Button) and rewrites the four slides against the
 * ratified Platform · Tools · MCP · Cradle framing. Chapter cadence via
 * SectionDivider between the slide sections. PDF iframe now sits inside
 * an <object> with a visible download-link fallback (Safari on iOS blocks
 * inline PDF — WCAG 2.2 §1.3.1 Info-and-Relationships fix).
 */

const slides = [
  {
    k: "01",
    title: "The platform between intent and state.",
    body: "Nebbos is the substrate that sits between the human operator and the systems the human is responsible for. Not the model. Not the app. The layer that decides whether the call runs, what it costs, what it touches, and what it leaves behind.",
  },
  {
    k: "02",
    title: "Four things. One product.",
    body: "The platform runs the work — dashboards, approval graphs, per-domain Pearls. The app puts a local, biometric-gated console on the operator's desk. The MCP mediates every tool call an AI can make. The Cradle carries the keys — FIPS 140-3 Level 3 — so the tier a request runs at is a fact about what is physically plugged in, not a policy the vendor can override.",
  },
  {
    k: "03",
    title: "Every action attested.",
    body: "Every consequential permission gates on biometric + Cradle physical presence + enclave-signed approval token. Every action lands in a hash-chained audit trail. SOC 2 evidence writes itself. The KG settles the truth every time — the graph answers from institutional memory first; a model runs only when the graph can't.",
  },
  {
    k: "04",
    title: "Deploy here and it's governed by default.",
    body: "Governance is not a feature layered on top. It is the shape of the runtime. Every call you route through Nebbos carries its own audit, its own metering, its own isolation. You do not opt in. You get it because you deployed here.",
  },
];

export default function PresentationPage() {
  return (
    <div className="mkt-mode">
      <PageHero
        surface="paper"
        align="start"
        eyebrow="Presentation"
        headline={
          <>
            Nebbos in <em>four slides.</em>
          </>
        }
        deck="The platform. Its tools. Its MCP. Its Cradle. Four things, one substrate."
      />

      {slides.map((s, i) => (
        <div key={s.k}>
          {i > 0 && i % 3 === 0 ? (
            <SectionDivider chapter={s.k} strap="The four slides" />
          ) : null}
          <PageSection ruled ground={i % 2 === 0 ? "paper" : "paper2"}>
            <Eyebrow>{s.k}</Eyebrow>
            <h2 className="presentation__slide-title">{s.title}</h2>
            <p className="presentation__slide-body">{s.body}</p>
          </PageSection>
        </div>
      ))}

      <SectionDivider chapter="V" strap="The deck, on paper" />

      <PageSection ruled ground="paper2">
        <Eyebrow>The deck, on paper</Eyebrow>
        <h2 className="presentation__slide-title">Same four slides. Portable, printable, forwardable.</h2>
        <div className="presentation__pdf-frame">
          {/* <object> renders inline PDF where the browser supports it; the
              child <a> serves as the visible fallback for Safari-iOS + any
              browser that blocks inline PDF (WCAG 2.2 §1.3.1). */}
          <object
            data="/nebbos-presentation.pdf#view=FitH"
            type="application/pdf"
            aria-label="Nebbos presentation (PDF)"
            className="presentation__pdf-object"
          >
            <p className="presentation__pdf-fallback">
              Your browser can&rsquo;t display the PDF inline.{" "}
              <a href="/nebbos-presentation.pdf" download className="presentation__pdf-download">
                Download the four-slide deck (PDF)
              </a>{" "}
              — same four slides above, portable to any device.
            </p>
          </object>
        </div>
      </PageSection>

      <PageSection>
        <div className="presentation__footer-cta">
          <h2 className="presentation__footer-headline">
            Walk it live with the team who runs it.
          </h2>
          <p className="presentation__footer-deck">
            The presentation is the surface. The runtime is the substance.
            Book a demo and see the same primitives running against your
            real workload shape.
          </p>
          <div className="presentation__footer-ctas">
            <Button variant="primary" tone="onPaper" href="/demo">Book a demo</Button>
            <Button variant="ghost" tone="onPaper" href="/nebbos-presentation.pdf">Download the PDF</Button>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
