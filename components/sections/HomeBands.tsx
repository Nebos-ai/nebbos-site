import Link from "next/link";
import { productTree } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay } from "@/components/ui/SceneOverlay";

/**
 * HomeBands · 2026-08-23 revision — each band column now has its own
 * background image, image + heavy scrim behind editorial magazine type.
 *
 * Founder direction: "each of the 5 blocks on the home page should have
 * an image behind them." Applied to HomeBands (the 5-band middle block).
 *
 * Image mapping (band → v2 industry still):
 *   Substrate    → v2-1  coffee-shop (everyday foundation)
 *   Boundary     → v2-4  logistics dispatch (threshold + flow)
 *   Intelligence → v2-7  corporate boardroom (deliberation space)
 *   Action       → v2-9  manufacturing workshop (precision execution)
 *   Commerce     → v2-12 financial services dawn (ownership + exchange)
 *
 * Each column:
 *   Full-bleed image + heavy warm scrim + grain + vignette
 *   Roman numeral + serif band name + italic strap + hairline gold rule
 *   Layer list (mono numeral + serif name)
 *   Footer link — "See the band →"
 *   Type in paper (light) since backgrounds are dark
 */

const BAND_ROMANS = ["", "I", "II", "III", "IV", "V"];
const BAND_IMAGES: Record<number, number> = {
  1: 1,   // Substrate → v2-1 coffee-shop
  2: 4,   // Boundary → v2-4 logistics dispatch
  3: 7,   // Intelligence → v2-7 corporate boardroom
  4: 9,   // Action → v2-9 manufacturing workshop
  5: 12,  // Commerce → v2-12 financial services dawn
};

export function HomeBands() {
  return (
    <section
      aria-labelledby="bands-heading"
      style={{
        background: "var(--paper)",
        paddingBlock: "var(--section-y-lg) 0",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      {/* Section header — paper background, still */}
      <div className="container">
        <div style={{ maxWidth: "68ch", marginBottom: "clamp(48px, 6vh, 72px)" }}>
          <SectionNumeral n="02" label="The architecture" />
          <h2
            id="bands-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "20px 0 0 0",
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            What&rsquo;s underneath{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              every Pearl
            </em>{" "}
            you deploy.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              maxWidth: "58ch",
              marginTop: 20,
            }}
          >
            Fifteen governance layers, grouped as five bands. Data at the bottom.
            Boundaries the world crosses at. Reasoning across providers. Action
            and the humans who approve it. Commerce at the top.
          </p>
        </div>
      </div>

      {/* 5 image-behind columns · full-bleed grid, each 88vh tall */}
      <div
        className="bands-toc"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          borderTop: "1px solid var(--rule)",
          minHeight: "88vh",
        }}
      >
        {productTree.map(({ band, href, layers }, i) => (
          <Link
            key={band.n}
            href={href}
            style={{
              position: "relative",
              padding: "clamp(32px, 4vh, 48px) clamp(20px, 2vw, 32px)",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              borderRight: i < productTree.length - 1 ? "1px solid var(--rule)" : "none",
              overflow: "hidden",
              justifyContent: "space-between",
              minHeight: 640,
            }}
            className="band-toc-cell"
          >
            {/* Full-bleed background image */}
            <SceneStill v2Scene={BAND_IMAGES[band.n]} v2Variant={1} shape="fullBleed" />

            {/* Heavy scrim so text pops */}
            <SceneOverlay scrim="even" vignetteStrength={0.55} />

            {/* All copy overlaid at z-index 2 */}
            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
              {/* Top: roman numeral + band name + strap */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "var(--accent-2)",
                    letterSpacing: "0.02em",
                    textShadow: "0 1px 2px rgba(20, 18, 15, 0.42)",
                  }}
                >
                  {BAND_ROMANS[band.n]}
                </div>

                <div
                  className="band-name"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(24px, 2vw, 32px)",
                    fontWeight: 400,
                    color: "var(--paper)",
                    letterSpacing: "-0.014em",
                    lineHeight: 1.04,
                    transition: "color var(--dur-fast) var(--ease-out)",
                    textShadow: "0 2px 4px rgba(20, 18, 15, 0.42)",
                  }}
                >
                  {band.name}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(244, 241, 234, 0.9)",
                    maxWidth: "22ch",
                    textShadow: "0 1px 2px rgba(20, 18, 15, 0.42)",
                  }}
                >
                  {band.strap}
                </div>

                <div
                  aria-hidden
                  style={{
                    width: 32,
                    height: 1,
                    background: "var(--accent-2)",
                    marginTop: 12,
                  }}
                />
              </div>

              {/* Middle: layer list */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {layers.map(({ layer }) => (
                  <li
                    key={layer.n}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "24px minmax(0, 1fr)",
                      gap: 10,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "rgba(244, 241, 234, 0.7)",
                        letterSpacing: "0.04em",
                        textShadow: "0 1px 2px rgba(20, 18, 15, 0.42)",
                      }}
                    >
                      {String(layer.n).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 15,
                        color: "rgba(244, 241, 234, 0.95)",
                        lineHeight: 1.35,
                        textShadow: "0 1px 2px rgba(20, 18, 15, 0.42)",
                      }}
                    >
                      {layer.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom: footer link */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--accent-2)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  textShadow: "0 1px 2px rgba(20, 18, 15, 0.42)",
                }}
              >
                See the band <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .band-toc-cell:hover .band-name { color: var(--accent-2) !important; }
        @media (max-width: 1100px) {
          .bands-toc {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .bands-toc > a {
            border-right: 1px solid var(--rule) !important;
            border-bottom: 1px solid var(--rule) !important;
          }
          .bands-toc > a:nth-child(3n) { border-right: none !important; }
        }
        @media (max-width: 720px) {
          .bands-toc {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .bands-toc > a {
            border-right: none !important;
            border-bottom: 1px solid var(--rule) !important;
            min-height: 480px !important;
          }
          .bands-toc > a:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
