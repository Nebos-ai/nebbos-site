import Link from "next/link";
import { productTreeByImportance as productTree } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";

/**
 * HomeBands · v3 2026-08-23 · 5 full-bleed stacked sections, one per band.
 *
 * Founder critique: "the text across the five sections with the five images
 * is hard to read and too small · not impressive at all · everything needs
 * to feel impressive."
 *
 * Killed: cramped 5-column masthead grid (each column ~200px wide, type
 * shrunk to fit).
 * New: 5 stacked full-bleed sections (each 80vh minimum), one per band.
 * Same treatment as HomeStory scenes:
 *   Full-bleed image (v2 industry still)
 *   Heavy scrim + grain + vignette (letters pop)
 *   Metadata plate top-right (Roman numeral · band name)
 *   Copy overlaid bottom-left: eyebrow + huge serif band name + italic
 *     strap + hairline gold rule + layer list (serif, generous size)
 *     + "See the band →" mono link
 *
 * Marketing order preserved (Intelligence · Action · Substrate · Boundary · Commerce).
 */

const BAND_ROMANS: Record<number, string> = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };
const BAND_IMAGES: Record<number, number> = {
  1: 1,   // Substrate → v2-1 coffee-shop
  2: 4,   // Boundary → v2-4 logistics dispatch
  3: 7,   // Intelligence → v2-7 corporate boardroom
  4: 9,   // Action → v2-9 manufacturing workshop
  5: 6,   // Commerce → v2-6 tech startup desk (v2-12 pending v3 dawn-trading)
};

export function HomeBands() {
  return (
    <section aria-labelledby="bands-heading" style={{ background: "var(--paper)" }}>
      {/* Section header — paper, tight */}
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
          </div>
        </div>
      </div>

      {/* 5 full-bleed stacked sections — one per band, impressive scale */}
      {productTree.map(({ band, href, layers }) => (
        <section
          key={band.n}
          aria-labelledby={`band-${band.n}-title`}
          style={{
            position: "relative",
            minHeight: "min(85vh, 900px)",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <SceneStill v2Scene={BAND_IMAGES[band.n]} v2Variant={1} shape="fullBleed" />
          <SceneOverlay scrim="bottom" vignetteStrength={0.5} />
          <SceneMetadataPlate chapter={BAND_ROMANS[band.n]} label={band.name} position="top-right" />

          {/* Copy overlaid bottom-left · IMPRESSIVE scale */}
          <Link
            href={href}
            className="band-cell"
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              paddingBlock: "clamp(56px, 10vh, 112px)",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div className="container">
              <div style={{ maxWidth: "62ch", display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Eyebrow */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "rgba(244, 241, 234, 0.86)",
                    textShadow: "0 1px 3px rgba(20, 18, 15, 0.42)",
                  }}
                >
                  Band {BAND_ROMANS[band.n]} · The architecture
                </div>

                {/* HUGE serif band name */}
                <h3
                  id={`band-${band.n}-title`}
                  className="band-title"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(56px, 8vw, 128px)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.028em",
                    fontWeight: 400,
                    color: "var(--paper)",
                    margin: 0,
                    textWrap: "balance",
                    textShadow: "0 2px 6px rgba(20, 18, 15, 0.48)",
                    transition: "color var(--dur-fast) var(--ease-out)",
                  }}
                >
                  {band.name}
                </h3>

                {/* Italic strap — generous size */}
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2vw, 28px)",
                    lineHeight: 1.4,
                    color: "rgba(244, 241, 234, 0.92)",
                    maxWidth: "40ch",
                    margin: 0,
                    textShadow: "0 1px 4px rgba(20, 18, 15, 0.48)",
                  }}
                >
                  {band.strap}
                </p>

                {/* Hairline gold rule */}
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 1,
                    background: "var(--accent-2)",
                    marginBlock: 4,
                  }}
                />

                {/* Layer list — serif, generous scale */}
                <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "clamp(20px, 3vw, 40px)" }}>
                  {layers.map(({ layer }) => (
                    <li
                      key={layer.n}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 13,
                          color: "rgba(244, 241, 234, 0.7)",
                          letterSpacing: "0.06em",
                          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
                        }}
                      >
                        {String(layer.n).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(18px, 1.6vw, 22px)",
                          color: "rgba(244, 241, 234, 0.95)",
                          textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
                        }}
                      >
                        {layer.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer link */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--accent-2)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 12,
                    textShadow: "0 1px 3px rgba(20, 18, 15, 0.48)",
                  }}
                >
                  See the band <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))}

      <style>{`
        .band-cell:hover .band-title { color: var(--accent-2) !important; }
      `}</style>
    </section>
  );
}
