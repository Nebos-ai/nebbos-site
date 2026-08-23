"use client";

import Link from "next/link";
import { useState } from "react";
import { productTreeByImportance as productTree } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";

/**
 * HomeBands · v4 accordion · 2026-08-23
 *
 * Founder: "we can keep it but do an accordion animation that opens to a
 * full image and the other images compress."
 *
 * Layout · 5 side-by-side full-height cells, one expanded to full image
 * with copy, the other 4 compressed to narrow strips showing just
 * rotated band name + Roman numeral. Click a compressed strip → it
 * expands, the current expanded one compresses. Smooth grid-template-
 * columns transition.
 *
 * Client component (useState). Marketing order preserved.
 */

const BAND_ROMANS: Record<number, string> = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };
// v4 concept families — same visual identity everywhere each band appears
const BAND_FAMILIES: Record<number, string> = {
  1: "band-substrate",
  2: "band-boundary",
  3: "band-intelligence",
  4: "band-action",
  5: "band-commerce",
};

export function HomeBands() {
  const [activeId, setActiveId] = useState<number>(productTree[0].band.n);

  // Dynamic grid: active gets 6fr, others 1fr each (6+4×1 = 10, active ≈ 60%)
  const cols = productTree
    .map(({ band }) => (band.n === activeId ? "6fr" : "1fr"))
    .join(" ");

  return (
    <section aria-labelledby="bands-heading" style={{ background: "var(--paper)" }}>
      {/* Section header · paper */}
      <div
        style={{
          paddingBlock: "clamp(80px, 12vh, 160px) clamp(56px, 8vh, 80px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="02" label="The architecture" />
            <h2
              id="bands-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.022em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "26ch",
                textWrap: "balance",
              }}
            >
              Five bands. Fifteen layers.{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                One architecture.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginTop: 24,
              }}
            >
              Click a band to open it.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion · 5 side-by-side cells, click to expand */}
      <div
        role="tablist"
        aria-label="Architecture bands"
        className="bands-accordion"
        style={{
          display: "grid",
          gridTemplateColumns: cols,
          height: "min(88vh, 900px)",
          borderTop: "1px solid var(--rule)",
          transition: "grid-template-columns var(--dur-slow) var(--ease-out)",
        }}
      >
        {productTree.map(({ band, href, layers }, i) => {
          const isActive = band.n === activeId;
          return (
            <div
              key={band.n}
              role="tab"
              tabIndex={0}
              aria-selected={isActive}
              aria-controls={`band-${band.n}-panel`}
              onClick={() => setActiveId(band.n)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveId(band.n); }
                if (e.key === "ArrowRight") { setActiveId(productTree[(i + 1) % productTree.length].band.n); }
                if (e.key === "ArrowLeft") { setActiveId(productTree[(i - 1 + productTree.length) % productTree.length].band.n); }
              }}
              className="band-cell"
              style={{
                position: "relative",
                overflow: "hidden",
                cursor: isActive ? "default" : "pointer",
                borderRight: i < productTree.length - 1 ? "1px solid var(--rule)" : "none",
              }}
            >
              <SceneStill family={BAND_FAMILIES[band.n]} familyVariant={1} shape="fullBleed" />
              <SceneOverlay scrim={isActive ? "bottom" : "even"} vignetteStrength={0.55} />

              {isActive ? (
                <ExpandedContent band={band} href={href} layers={layers} />
              ) : (
                <CompressedContent bandName={band.name} bandN={band.n} />
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .band-cell:focus-visible { outline: 2px solid var(--accent-2); outline-offset: -2px; z-index: 3; }
        @media (max-width: 900px) {
          .bands-accordion {
            grid-template-columns: minmax(0, 1fr) !important;
            grid-auto-rows: auto;
            height: auto !important;
          }
          .bands-accordion > div { min-height: 320px; border-right: none !important; border-bottom: 1px solid var(--rule); }
        }
      `}</style>
    </section>
  );
}

function ExpandedContent({ band, href, layers }: { band: { n: number; name: string; strap: string }; href: string; layers: Array<{ layer: { n: number; name: string } }> }) {
  return (
    <>
      <SceneMetadataPlate chapter={BAND_ROMANS[band.n]} label={band.name} position="top-right" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          padding: "clamp(40px, 6vh, 80px) clamp(32px, 4vw, 64px)",
        }}
      >
        <div style={{ maxWidth: "60ch", display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.86)",
              textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
            }}
          >
            Band {BAND_ROMANS[band.n]} · The architecture
          </div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(48px, 6vw, 96px)",
              lineHeight: 0.98,
              letterSpacing: "-0.026em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
              textShadow: "0 2px 6px rgba(20, 18, 15, 0.48)",
            }}
          >
            {band.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.8vw, 24px)",
              lineHeight: 1.4,
              color: "rgba(244, 241, 234, 0.92)",
              maxWidth: "40ch",
              margin: 0,
              textShadow: "0 1px 4px rgba(20, 18, 15, 0.48)",
            }}
          >
            {band.strap}
          </p>
          <div aria-hidden style={{ width: 48, height: 1, background: "var(--accent-2)", marginBlock: 4 }} />
          <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "clamp(16px, 2vw, 28px)" }}>
            {layers.map(({ layer }) => (
              <li key={layer.n} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(244,241,234,0.7)", letterSpacing: "0.06em", textShadow: "0 1px 3px rgba(20,18,15,0.48)" }}>
                  {String(layer.n).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(17px, 1.5vw, 21px)", color: "rgba(244,241,234,0.95)", textShadow: "0 1px 3px rgba(20,18,15,0.48)" }}>
                  {layer.name}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href={href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--accent-2)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            See {band.name} in full <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}

function CompressedContent({ bandName, bandN }: { bandName: string; bandN: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(24px, 4vh, 48px) 12px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 24,
          color: "var(--accent-2)",
          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
        }}
      >
        {BAND_ROMANS[bandN]}
      </div>
      <div
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(20px, 2.4vw, 32px)",
          fontWeight: 400,
          letterSpacing: "-0.012em",
          color: "var(--paper)",
          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
        }}
      >
        {bandName}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.7)",
          textAlign: "center",
          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
        }}
      >
        Open
      </div>
    </div>
  );
}
