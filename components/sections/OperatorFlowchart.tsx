"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/Button";

/**
 * OperatorFlowchart · sections/OperatorFlowchart.tsx · v1 · 2026-09-18
 *
 * The substrate-depth section on the home page. Answers the 2-minute
 * decision-stage question — "how deep does the substrate go?" — via a
 * scroll-driven horizontal flowchart tracing one hour of an operator's
 * shift through six substrate stages: Signal → Ingest → Memory →
 * Approval → Action → Attestation.
 *
 * Founder-directed 2026-09-18. Design pattern adapted from the pen
 * https://codepen.io/dermalhealth/pen/GgNrpJx (Deckard, "Interactive
 * Node Flowchart: GSAP") which the docs/marketing/homepage-first-time-
 * visitor-strategy-2026-09-17.md §5.3 already ratified as the reference
 * implementation for this section.
 *
 * Adaptation from the pen (keep structural pattern, restyle to Nebbos v3):
 *   - Motion: GSAP + ScrollTrigger horizontal-pin + path-draw ✓ (same)
 *   - Layout: 6 linear nodes (pen has 6 with branching; we go linear
 *     because the substrate flow is a pipeline, not a branch)
 *   - Ground: cream paper (pen has neomorphic soft blue-gray)
 *   - Cards: cut-corner-card v3 signature device with hairline border
 *     (pen has 32px rounded neomorphic with photo + emoji + colored
 *     overlay)
 *   - Plus markers: Nebbos orange plus (--color-accent) (pen has filled
 *     black circle)
 *   - Connectors: hairline dots in --color-accent (pen has filled black
 *     with neomorphic double-shadow)
 *   - Path: 1.5px hairline in --color-rule (pen has 4px black
 *     stroke-linecap-round)
 *
 * Progressive enhancement:
 *   - SSR renders 6 nodes in a vertical stack (no JS, no GSAP required)
 *   - useEffect mounts GSAP + ScrollTrigger, upgrades to horizontal-pin
 *   - prefers-reduced-motion keeps the vertical-stack layout, no scroll
 *     hijack, all paths drawn statically
 *
 * A11y: the flowchart carries `<h2>` + `<h3>` per node + descriptive
 * `<p>` per node. Screen readers get a clean sequential list of the six
 * substrate stages regardless of the visual layout. Chapter numeral
 * eyebrows use the same numeral pattern as the SectionDivider markers.
 */

type Node = {
  key: string;
  n: string;
  label: string;
  headline: string;
  sources: string;
  body: string;
};

const NODES: readonly Node[] = [
  {
    key: "signal",
    n: "01",
    label: "Signal",
    headline: "The operation emits.",
    sources: "Slack · PagerDuty · ATS · Ledger · Calendar · SIS",
    body: "Every system your team already runs emits signal. The substrate reads all of it, in the same shape, from the first day.",
  },
  {
    key: "ingest",
    n: "02",
    label: "Ingest",
    headline: "Append-only stream.",
    sources: "Layer 04 · every event",
    body: "Every event lands as an append-only record — its source, its timestamp, its permissions envelope, all preserved for auditor replay.",
  },
  {
    key: "memory",
    n: "03",
    label: "Memory",
    headline: "Two-year context graph.",
    sources: "Layer 07 · knowledge graph",
    body: "The substrate answers from institutional memory first. A model runs only when the graph can't. Two years in, Nebbos knows your operation better than any single hire could.",
  },
  {
    key: "approval",
    n: "04",
    label: "Approval",
    headline: "Named human, Cradle-authenticated.",
    sources: "Layer 11 · biometric + Cradle + enclave",
    body: "Every consequential action gates on biometric plus Cradle physical presence plus an enclave-signed approval token. Approval is architectural, not policy.",
  },
  {
    key: "action",
    n: "05",
    label: "Action",
    headline: "MCP-mediated tool call.",
    sources: "Layer 12 · classifier-gated",
    body: "Every tool call passes through the MCP. Rate-limited. Classifier-gated for data egress. The tier a request runs at is a fact about what is physically plugged in.",
  },
  {
    key: "attestation",
    n: "06",
    label: "Attestation",
    headline: "Hash-chained audit record.",
    sources: "Layer 15 · SOC 2 evidence self-writes",
    body: "Every action lands in a hash-chained audit record your CISO, your general counsel, and your regulator can read. Discovery-ready from day one.",
  },
];

/** Position each node card on the 2400×600 canvas — matches the SVG path
 *  d= coordinates below. Six nodes evenly spaced with room for a card,
 *  a plus-marker, and a connector between each pair. */
const NODE_POSITIONS: ReadonlyArray<[number, number]> = [
  [180, 300],
  [560, 300],
  [940, 300],
  [1320, 300],
  [1700, 300],
  [2080, 300],
];

/** Connector-dot + plus-marker positions between nodes.
 *  Cards are 300px wide centered on (x, y) — half-width is 150. Dots
 *  sit at +165 (15px past the card right edge) so they float in the gap
 *  instead of overlapping the mono-source line inside the card.
 *  Non-null assertion satisfies strict noUncheckedIndexedAccess. */
const CONNECTORS = NODE_POSITIONS.slice(0, -1).map(([x, y], i) => {
  const next = NODE_POSITIONS[i + 1]!;
  const [nx] = next;
  return {
    dotStart: [x + 165, y] as const,
    plus: [(x + nx) / 2, y] as const,
    dotEnd: [nx - 165, y] as const,
    path: `M ${x + 165} ${y} L ${nx - 165} ${y}`,
  };
});

export function OperatorFlowchart() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !scrollWrapper || !canvas) return;

    // Respect prefers-reduced-motion: stay in vertical-stack layout with
    // static paths. No horizontal-pin, no scroll hijack.
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    // Only apply horizontal-pin on wide viewports where the canvas can
    // meaningfully translate. Under 900px the vertical-stack fallback is
    // the intended experience.
    if (window.innerWidth < 900) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const [{ gsap }, ScrollTriggerMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        const ScrollTrigger = ScrollTriggerMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Flip to enhanced layout only after GSAP is confirmed loaded.
        wrapper.classList.add("op-flow--enhanced");

        const scrollMax = canvas.scrollWidth - window.innerWidth + 80;

        // Pin ONLY the scroll-wrapper (not the whole section). Intro sits
        // above and scrolls off normally; outro sits below and appears
        // after the pin releases. Fixed 2026-09-18 after "intro stuck at
        // viewport top during the whole pin" defect.
        const horizontalTween = gsap.to(canvas, {
          x: -scrollMax,
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapper,
            pin: true,
            scrub: 1,
            end: () => "+=" + scrollMax,
          },
        });

        // Draw SVG paths on horizontal scroll — each path animates its
        // strokeDashoffset from length → 0 as it enters the viewport.
        const paths = wrapper.querySelectorAll<SVGPathElement>(".op-flow__path");
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: path,
              containerAnimation: horizontalTween,
              start: "left right-=160",
              end: "right center",
              scrub: true,
            },
          });
        });

        // Subtle scale-in per node as it crosses into the horizontal viewport.
        const reveals = wrapper.querySelectorAll<HTMLElement>(".op-flow__reveal");
        reveals.forEach((el) => {
          gsap.from(el, {
            scale: 0.92,
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              containerAnimation: horizontalTween,
              start: "left right-=120",
              toggleActions: "play none none reverse",
            },
          });
        });

        cleanup = () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
          horizontalTween.kill();
          wrapper.classList.remove("op-flow--enhanced");
        };
      } catch {
        // GSAP failed to load — keep the vertical-stack fallback. No throw.
      }
    })();

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="op-flow"
      aria-labelledby="op-flow-heading"
    >
      <div className="op-flow__intro container">
        <p className="op-flow__eyebrow">The complete substrate</p>
        <h2 id="op-flow-heading" className="op-flow__heading">
          One shift. Every system. <em>One audit trail.</em>
        </h2>
        <p className="op-flow__deck">
          Six substrate stages, in order — from the systems your operators
          already run to the hash-chained record your auditor reads. Nothing
          consequential ships without a named human proving they are the
          human.
        </p>
      </div>

      <div className="op-flow__scroll-wrapper" ref={scrollWrapperRef}>
        <div className="op-flow__canvas" ref={canvasRef}>
          <svg
            className="op-flow__lines"
            viewBox="0 0 2400 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {CONNECTORS.map((c, i) => (
              <path key={i} className="op-flow__path" d={c.path} />
            ))}
          </svg>

          <ol className="op-flow__nodes">
            {NODES.map((node, i) => {
              const [x, y] = NODE_POSITIONS[i]!;
              return (
                <li
                  key={node.key}
                  className="op-flow__node op-flow__reveal"
                  style={{
                    ["--nx" as string]: `${x}px`,
                    ["--ny" as string]: `${y}px`,
                  }}
                >
                  <article className="op-flow__card">
                    <p className="op-flow__card-eyebrow">
                      <span className="op-flow__card-numeral">{node.n}</span>
                      <span className="op-flow__card-dot" aria-hidden>·</span>
                      <span className="op-flow__card-label">{node.label}</span>
                    </p>
                    <h3 className="op-flow__card-headline">{node.headline}</h3>
                    <p className="op-flow__card-sources">{node.sources}</p>
                    <p className="op-flow__card-body">{node.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>

          {CONNECTORS.map((c, i) => (
            <div
              key={`conn-${i}`}
              className="op-flow__connectors"
              aria-hidden
            >
              <span
                className="op-flow__dot op-flow__reveal"
                style={{
                  ["--nx" as string]: `${c.dotStart[0]}px`,
                  ["--ny" as string]: `${c.dotStart[1]}px`,
                }}
              />
              <span
                className="op-flow__plus op-flow__reveal"
                style={{
                  ["--nx" as string]: `${c.plus[0]}px`,
                  ["--ny" as string]: `${c.plus[1]}px`,
                }}
              >
                +
              </span>
              <span
                className="op-flow__dot op-flow__reveal"
                style={{
                  ["--nx" as string]: `${c.dotEnd[0]}px`,
                  ["--ny" as string]: `${c.dotEnd[1]}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="op-flow__outro container">
        <p className="op-flow__anchor">
          Nothing consequential ships without a named human proving they are
          the human. <em>Every action lands in a hash-chained record your
          auditor can verify.</em>
        </p>
        <div className="op-flow__cta">
          <Button variant="ghost" tone="onPaper" href="/security">
            Read the substrate spec
          </Button>
          <Link href="/sovereignty" className="op-flow__link">
            See sovereignty <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
