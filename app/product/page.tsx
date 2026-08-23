import Link from "next/link";
import Image from "next/image";
import { productTree } from "@/lib/nav";
import { SCENES, stillPath } from "@/content/stills";
import { SectionNumeral } from "@/components/ui/SectionNumeral";

/**
 * PAGE · /product · The full-system overview.
 *
 * Composition, top to bottom:
 *   00 · PageHero      — pale scene wash + h1 "Fifteen layers. Five bands."
 *   01 · BandGallery   — 5 full-width band rows, each showing name + strap +
 *                        3 layer cards + the scene image that carries the band
 *
 * Every band card links deeper: /product/[band] for the band index page,
 * /product/[band]/[layer] for the individual layer page.
 */

export const metadata = {
  title: "Product · The system",
  description: "Fifteen layers, five bands, one system. The full nebbos.ai architecture in one place.",
};

export default function ProductPage() {
  return (
    <>
      {/* Hero band */}
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
          paddingBlock: "clamp(96px, 14vh, 176px) clamp(64px, 8vh, 96px)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="00" label="The system" />
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
              the top. Deploy Nebbos Design, Nebbos Finance, Nebbos Operations
              — every one inherits all fifteen layers, automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Band gallery — one full row per band */}
      {productTree.map(({ band, href, layers }) => {
        // Which scene carries this band's story
        const sceneId = getSceneForBand(band.n);
        const scene = SCENES[sceneId];

        return (
          <section
            key={band.n}
            aria-labelledby={`band-${band.n}-title`}
            style={{
              paddingBlock: "clamp(72px, 10vh, 128px)",
              borderBottom: "1px solid var(--rule)",
              background: band.n % 2 === 0 ? "var(--paper-2)" : "var(--paper)",
            }}
          >
            <div className="container">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
                  gap: "clamp(32px, 5vw, 72px)",
                  alignItems: "start",
                }}
                className="band-row"
              >
                {/* Left: title + strap + scene image */}
                <div>
                  <SectionNumeral n={band.n} label={`Band ${String(band.n).padStart(2, "0")}`} />
                  <h2
                    id={`band-${band.n}-title`}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(32px, 3.8vw, 48px)",
                      lineHeight: 1.06,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                      color: "var(--ink)",
                      margin: "16px 0 12px 0",
                    }}
                  >
                    {band.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 18,
                      lineHeight: 1.5,
                      color: "var(--ink-2)",
                      margin: "0 0 28px 0",
                      maxWidth: "36ch",
                    }}
                  >
                    {band.strap}
                  </p>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 9",
                      background: "var(--paper-2)",
                      border: "1px solid var(--rule)",
                      overflow: "hidden",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      src={stillPath(sceneId, ((band.n % 4) + 1) as 1 | 2 | 3 | 4)}
                      alt={`${band.name} — ${scene.chapter}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 40vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <Link
                    href={href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      textDecoration: "none",
                    }}
                  >
                    Explore the band <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
                  </Link>
                </div>

                {/* Right: 3 layer cards */}
                <div
                  style={{
                    display: "grid",
                    gap: 16,
                  }}
                >
                  {layers.map(({ layer, href: lHref }) => (
                    <Link
                      key={layer.n}
                      href={lHref}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto minmax(0, 1fr)",
                        gap: 24,
                        alignItems: "start",
                        padding: 28,
                        background: "var(--paper)",
                        border: "1px solid var(--rule)",
                        textDecoration: "none",
                        color: "inherit",
                        transition:
                          "border-color var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)",
                      }}
                      className="layer-card"
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 42,
                          lineHeight: 1,
                          color: "var(--gold)",
                          fontWeight: 500,
                        }}
                      >
                        {String(layer.n).padStart(2, "0")}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 24,
                            fontWeight: 500,
                            color: "var(--ink)",
                            letterSpacing: "-0.014em",
                            marginBottom: 6,
                          }}
                        >
                          {layer.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: "var(--ink-3)",
                            letterSpacing: "0.04em",
                            marginBottom: 12,
                            textTransform: "lowercase",
                          }}
                        >
                          {layer.caption}
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 14.5,
                            lineHeight: 1.55,
                            color: "var(--ink-2)",
                            margin: 0,
                            maxWidth: "56ch",
                          }}
                        >
                          {layer.detail}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <style>{`
        .layer-card:hover {
          border-color: var(--ink) !important;
          background: var(--paper-2) !important;
        }
        @media (max-width: 900px) {
          .band-row {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}

/**
 * Which scene carries which band's story. Bands 1+2 → Scene 1 (foundation
 * era · coffee shop). Band 3 → Scene 2 (intelligence era · NYC). Bands 4+5
 * → Scene 3 (action + commerce era · Amalfi). Mirrors content/stills.ts.
 */
function getSceneForBand(bandN: number): 1 | 2 | 3 {
  if (bandN <= 2) return 1;
  if (bandN === 3) return 2;
  return 3;
}
