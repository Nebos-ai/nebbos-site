import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Presentation",
  description:
    "Nebbos in four slides. The platform. Its tools. Its MCP. Its Cradle. Embedded PDF at the bottom.",
};

/**
 * /presentation · v4 · 2026-09-18 · mkt-native rebuild
 *
 * v3 shipped v3 primitives (PageHero, PageSection, Eyebrow, Button)
 * against the cream paper register. v4 rebuilds against the mkt
 * register: one mkt-hero + four mkt-slide cards + PDF viewer inside
 * an mkt-panel. Copy preserved verbatim (the four slides + PDF-viewer
 * fallback + CTA). PDF <object> pattern preserved for WCAG 2.2 §1.3.1
 * Info-and-Relationships fix.
 */

const SLIDES = [
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
    title: "Deploy here and it&rsquo;s governed by default.",
    body: "Governance is not a feature layered on top. It is the shape of the runtime. Every call you route through Nebbos carries its own audit, its own metering, its own isolation. You do not opt in. You get it because you deployed here.",
  },
];

const SLIDE_COLOR = ["platform", "app", "mcp", "cradle"] as const;

export default function PresentationPage() {
  return (
    <>
      <section className="mkt mkt-section mkt-hero" aria-labelledby="pres-h">
        <div className="mkt-section__inner">
          <div className="mkt-hero__copy">
            <p className="mkt-eyebrow">Presentation</p>
            <h1 id="pres-h" className="mkt-display">
              Nebbos in four slides.
            </h1>
            <p className="mkt-deck">
              The platform. Its tools. Its MCP. Its Cradle. Four things,
              one substrate.
            </p>
          </div>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="pres-slides">
        <div className="mkt-section__inner">
          <h2 id="pres-slides" className="sr-only">Slides</h2>
          <ol className="mkt-deck-list">
            {SLIDES.map((s, i) => (
              <li key={s.k} className={`mkt-slide mkt-slide--${SLIDE_COLOR[i]}`}>
                <p className="mkt-slide__k">{s.k}</p>
                <h3
                  className="mkt-slide__title"
                  dangerouslySetInnerHTML={{ __html: s.title }}
                />
                <p className="mkt-slide__body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mkt mkt-section" aria-labelledby="pres-pdf">
        <div className="mkt-section__inner">
          <header className="mkt-products__head">
            <p className="mkt-eyebrow">The deck, on paper</p>
            <h2 id="pres-pdf" className="mkt-h2">
              Same four slides. Portable, printable, forwardable.
            </h2>
          </header>
          <div className="mkt-pdf-frame">
            {/* <object> renders inline PDF where the browser supports it;
                the child <a> serves as the visible fallback for Safari-iOS
                + any browser that blocks inline PDF (WCAG 2.2 §1.3.1). */}
            <object
              data="/nebbos-presentation.pdf#view=FitH"
              type="application/pdf"
              aria-label="Nebbos presentation (PDF)"
              className="mkt-pdf-object"
            >
              <p className="mkt-pdf-fallback">
                Your browser can&rsquo;t display the PDF inline.{" "}
                <Link href="/nebbos-presentation.pdf" className="mkt-cta mkt-cta--primary" style={{ display: "inline-flex", marginInline: 8 }}>
                  Download the four-slide deck (PDF)
                  <span className="mkt-cta__arrow" aria-hidden>→</span>
                </Link>{" "}
                &mdash; same four slides above, portable to any device.
              </p>
            </object>
          </div>
        </div>
      </section>

      <section
        className="mkt mkt-section mkt-closing"
        aria-labelledby="pres-close"
      >
        <div className="mkt-closing__inner">
          <p className="mkt-eyebrow">Walk it live</p>
          <h2 id="pres-close" className="mkt-display">
            Walk it live with the team who runs it.
          </h2>
          <p className="mkt-deck">
            The presentation is the surface. The runtime is the substance.
            Book a demo and see the same primitives running against your
            real workload shape.
          </p>
          <div className="mkt-hero__ctas">
            <Link href="/demo" className="mkt-cta mkt-cta--primary">
              Book a demo
              <span className="mkt-cta__arrow" aria-hidden>→</span>
            </Link>
            <Link href="/nebbos-presentation.pdf" className="mkt-cta mkt-cta--ghost">
              Download the PDF
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
