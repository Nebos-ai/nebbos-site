import Link from "next/link";
import Image from "next/image";
import { productTreeByImportance as productTree } from "@/lib/nav";
import { SCENES, stillPath } from "@/content/stills";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneOverlay } from "@/components/ui/SceneOverlay";

/**
 * PAGE · /product · magazine table-of-contents rewrite 2026-08-23
 *
 * Chrome-less. Every band row = full-bleed scene image + magazine layer list.
 * No card borders, no shadows, no rounded rectangles. Hairline gold rules
 * anchor each block. Roman numerals mark bands. Register: Kinfolk masthead
 * meets Loro Piana catalog.
 *
 * Composition:
 *   Hero · paper, no image, section-01 numeral + h1 + deck
 *   5 band rows, each:
 *     Full-bleed scene image (edge to edge, 60vh) with overlay + metadata plate
 *     Followed by a magazine two-column: band name+strap on left, layer TOC on right
 */

const BAND_ROMANS = ["", "I", "II", "III", "IV", "V"];

function getSceneForBand(bandN: number): 1 | 2 | 3 {
  if (bandN <= 2) return 1;
  if (bandN === 3) return 2;
  return 3;
}

export const metadata = {
  title: "Product · Fifteen layers. Five bands. One architecture.",
  description: "The complete architecture underneath every Pearl.",
};

export default function ProductPage() {
  return (
    <>
      {/* Hero — paper, no image, editorial */}
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
          paddingBlock: "clamp(96px, 14vh, 176px) clamp(64px, 8vh, 96px)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="00" label="The architecture" />
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 5.4vw, 80px)",
                lineHeight: 1.04,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "20ch",
                textWrap: "balance",
              }}
            >
              Fifteen layers.{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                Five bands.
              </em>{" "}
              One architecture.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: "56ch",
                marginTop: 24,
              }}
            >
              The complete architecture underneath every Pearl. Data at the
              bottom. Boundaries the world crosses at. Reasoning across
              providers. Action and the humans who approve it. Commerce at
              the top.
            </p>
          </div>
        </div>
      </section>

      {/* 5 band rows · full-bleed image + magazine layer TOC */}
      {productTree.map(({ band, href, layers }) => {
        const sceneId = getSceneForBand(band.n);
        const scene = SCENES[sceneId];
        const variant = (((band.n - 1) % 4) + 1) as 1 | 2 | 3 | 4;

        return (
          <div key={band.n}>
            {/* Full-bleed scene image */}
            <section
              style={{
                position: "relative",
                minHeight: "min(60vh, 640px)",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <Image
                src={stillPath(sceneId, variant)}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                style={{ objectFit: "cover", zIndex: 0 }}
              />
              <SceneOverlay scrim="bottom" />

              {/* Roman numeral + band name overlaid bottom-left · magazine title */}
              <div
                className="container"
                style={{
                  position: "relative",
                  zIndex: 2,
                  paddingBlock: "clamp(48px, 8vh, 96px)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 24,
                      fontWeight: 400,
                      color: "var(--accent-2)",
                      textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
                    }}
                  >
                    {BAND_ROMANS[band.n]}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(40px, 5vw, 72px)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.024em",
                      fontWeight: 400,
                      color: "var(--paper)",
                      margin: 0,
                      textShadow: "0 1px 2px rgba(20, 18, 15, 0.28)",
                    }}
                  >
                    {band.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(17px, 1.5vw, 20px)",
                      lineHeight: 1.5,
                      color: "rgba(244, 241, 234, 0.9)",
                      maxWidth: "38ch",
                      margin: 0,
                      textShadow: "0 1px 2px rgba(20, 18, 15, 0.28)",
                    }}
                  >
                    {band.strap}
                  </p>
                </div>
              </div>
            </section>

            {/* Magazine layer TOC · chrome-less rows with hairline dividers */}
            <section
              style={{
                background: band.n % 2 === 0 ? "var(--paper-2)" : "var(--paper)",
                paddingBlock: "clamp(64px, 9vh, 112px)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <div className="container">
                {/* Small section-label row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 40,
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div className="eyebrow" style={{ color: "var(--gold)" }}>
                    Band {String(band.n).padStart(2, "0")} · Three layers
                  </div>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      textDecoration: "none",
                    }}
                  >
                    See {band.name} in full <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
                  </Link>
                </div>

                {/* Layer rows · magazine table-of-contents (no borders, hairline dividers) */}
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {layers.map(({ layer, href: lHref }, i) => (
                    <li key={layer.n}>
                      <Link
                        href={lHref}
                        className="layer-toc-row"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "80px minmax(0, 3fr) minmax(0, 4fr) 40px",
                          gap: 24,
                          alignItems: "baseline",
                          paddingBlock: "clamp(24px, 3vh, 32px)",
                          borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                          borderBottom: "1px solid var(--rule)",
                          textDecoration: "none",
                          color: "inherit",
                          transition: "background var(--dur-fast) var(--ease-out)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 32,
                            color: "var(--gold)",
                            fontWeight: 400,
                            lineHeight: 1,
                          }}
                        >
                          {String(layer.n).padStart(2, "0")}
                        </span>
                        <div>
                          <div
                            className="layer-name"
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "clamp(20px, 1.8vw, 26px)",
                              fontWeight: 500,
                              color: "var(--ink)",
                              letterSpacing: "-0.014em",
                              marginBottom: 4,
                              transition: "color var(--dur-fast) var(--ease-out)",
                            }}
                          >
                            {layer.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              color: "var(--ink-3)",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {layer.caption}
                          </div>
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 15,
                            lineHeight: 1.55,
                            color: "var(--ink-2)",
                            margin: 0,
                          }}
                        >
                          {layer.detail}
                        </p>
                        <span
                          aria-hidden
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 22,
                            color: "var(--ink-3)",
                            textAlign: "right",
                          }}
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        );
      })}

      <style>{`
        .layer-toc-row:hover .layer-name { color: var(--gold) !important; }
        @media (max-width: 900px) {
          .layer-toc-row {
            grid-template-columns: 48px minmax(0, 1fr) !important;
          }
          .layer-toc-row > p, .layer-toc-row > span[aria-hidden] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
