import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { PageHero } from "@/components/marketing/PageHero";
import { ClosingCta } from "@/components/marketing/ClosingCta";
import { Eyebrow, PrimaryCta, Section, headline } from "@/components/marketing/primitives";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Presentation",
  description:
    "Nebbos in four slides. The platform. Its tools. Its MCP. Its Cradle. Embedded PDF at the bottom.",
};

/**
 * /presentation · v5 · 2026-09-23 · Tailwind + Motion redesign (visual
 * only): the four slides as a sticky card stack (each slide pins a little
 * lower than the last as you scroll), the PDF on a bezel frame.
 *
 * v4 · 2026-09-18 · mkt-native rebuild:
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

const SLIDE_TINT = ["var(--color-platform)", "var(--color-app)", "var(--color-mcp)", "var(--color-cradle)"];

export default function PresentationPage() {
  const h2 = cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]");
  return (
    <>
      <PageHero
        id="pres-h"
        eyebrow="Presentation"
        title="Nebbos in four slides."
        deck={
          <>
            The platform. Its tools. Its MCP. Its Cradle. Four things,
            one substrate.
          </>
        }
      />

      {/* SLIDES · sticky stack */}
      <Section labelledBy="pres-slides">
        <h2 id="pres-slides" className="sr-only">Slides</h2>
        <ol className="m-0 grid list-none gap-6 p-0">
          {SLIDES.map((s, i) => (
            <li
              key={s.k}
              className="md:sticky"
              style={{ top: `${110 + i * 28}px`, "--tint": SLIDE_TINT[i] } as CSSProperties}
            >
              <div className="bezel shadow-[0_-30px_60px_-30px_rgb(0_0_0/0.9)]">
                <div className="bezel-core relative grid min-h-[360px] gap-8 overflow-hidden p-8 md:grid-cols-[180px_1fr] md:p-12">
                  <span aria-hidden className="grid-field pointer-events-none absolute inset-0 opacity-50" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[var(--tint)] opacity-[0.22] blur-[110px]"
                  />
                  <p className="relative m-0 font-code text-[clamp(3rem,6vw,5rem)] font-medium leading-none tabular-nums text-tint">
                    {s.k}
                  </p>
                  <div className="relative flex flex-col gap-5 self-end">
                    <h3
                      className="m-0 max-w-[22ch] font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-tight text-ink"
                      dangerouslySetInnerHTML={{ __html: s.title }}
                    />
                    <p className="m-0 max-w-[62ch] text-[16px] leading-relaxed text-ink-2">{s.body}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="pres-pdf">
        <Reveal as="header" className="flex max-w-3xl flex-col items-start gap-6">
          <Eyebrow>The deck, on paper</Eyebrow>
          <h2 id="pres-pdf" className={h2}>
            <RevealWords>Same four slides. Portable, printable, forwardable.</RevealWords>
          </h2>
        </Reveal>
        <Reveal className="bezel mt-14" amount={0.1}>
          <div className="bezel-core overflow-hidden p-2">
            {/* <object> renders inline PDF where the browser supports it;
                the child <a> serves as the visible fallback for Safari-iOS
                + any browser that blocks inline PDF (WCAG 2.2 §1.3.1). */}
            <object
              data="/nebbos-presentation.pdf#view=FitH"
              type="application/pdf"
              aria-label="Nebbos presentation (PDF)"
              className="block aspect-[16/10] w-full rounded-[1.1rem] bg-ground-3"
            >
              <p className="m-0 flex flex-wrap items-center gap-3 p-8 text-[15px] leading-relaxed text-ink-2">
                Your browser can&rsquo;t display the PDF inline.{" "}
                <PrimaryCta href="/nebbos-presentation.pdf">Download the four-slide deck (PDF)</PrimaryCta>{" "}
                &mdash; same four slides above, portable to any device.
              </p>
            </object>
          </div>
        </Reveal>
      </Section>

      <ClosingCta
        id="pres-close"
        eyebrow="Walk it live"
        title="Walk it live with the team who runs it."
        deck={
          <>
            The presentation is the surface. The runtime is the substance.
            Book a demo and see the same primitives running against your
            real workload shape.
          </>
        }
        primary={{ href: "/demo", label: "Book a demo" }}
        secondary={{ href: "/nebbos-presentation.pdf", label: "Download the PDF" }}
      />
    </>
  );
}
