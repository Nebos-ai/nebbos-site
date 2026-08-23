import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BANDS, LAYERS } from "@/lib/architecture";
import { bandPath, layerPath } from "@/lib/nav";
import { SCENES, type SceneId } from "@/content/stills";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";

/**
 * PAGE · /product/[band] · One of five band pages.
 *
 * Renders substrate / boundary / intelligence / agent / commerce as a
 * consistent template. Full-bleed scene hero at top, then the band's three
 * layers as detail cards with proof-points, then prev/next sibling nav.
 */

type Params = { band: string };

const BAND_SLUGS: Record<string, number> = {
  substrate: 1,
  boundary: 2,
  intelligence: 3,
  agent: 4,
  commerce: 5,
};

export function generateStaticParams(): Params[] {
  return Object.keys(BAND_SLUGS).map((band) => ({ band }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { band: bandSlug } = await params;
  const bandN = BAND_SLUGS[bandSlug];
  const band = BANDS.find((b) => b.n === bandN);
  if (!band) return {};
  return {
    title: `${band.name} · ${band.strap}`,
    description: `Band ${band.n} of the nebbos.ai architecture: ${band.strap}`,
  };
}

export default async function BandPage({ params }: { params: Promise<Params> }) {
  const { band: bandSlug } = await params;
  const bandN = BAND_SLUGS[bandSlug];
  const band = BANDS.find((b) => b.n === bandN);
  if (!band) notFound();

  const layers = LAYERS.filter((l) => l.band === band.n);
  const sceneId = getSceneForBand(band.n);
  const scene = SCENES[sceneId];
  const prevBand = BANDS.find((b) => b.n === band.n - 1);
  const nextBand = BANDS.find((b) => b.n === band.n + 1);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "min(68vh, 640px)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <SceneStill scene={sceneId} variant={((band.n % 4) + 1) as 1 | 2 | 3 | 4} shape="fullBleed" priority />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(180deg, rgba(20,18,15,0.10) 0%, transparent 30%, transparent 55%, rgba(20,18,15,0.28) 82%, rgba(20,18,15,0.56) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "clamp(24px, 5vh, 56px)",
            right: "clamp(24px, 4vw, 48px)",
            zIndex: 2,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(244, 241, 234, 0.9)",
            padding: "8px 14px",
            border: "1px solid rgba(244, 241, 234, 0.32)",
            backdropFilter: "blur(6px)",
          }}
        >
          {scene.chapter}
        </div>
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            paddingBlock: "clamp(48px, 8vh, 96px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: "48ch" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(244, 241, 234, 0.86)",
              }}
            >
              Band {String(band.n).padStart(2, "0")} of 05
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(48px, 6.6vw, 96px)",
                lineHeight: 1.02,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--paper)",
                margin: 0,
                textShadow: "0 1px 2px rgba(20, 18, 15, 0.28)",
              }}
            >
              {band.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.4,
                color: "rgba(244, 241, 234, 0.9)",
                margin: 0,
                textShadow: "0 1px 2px rgba(20, 18, 15, 0.28)",
              }}
            >
              {band.strap}
            </p>
          </div>
        </div>
      </section>

      {/* Layers detail */}
      <section
        style={{
          background: "var(--paper)",
          paddingBlock: "var(--section-y-lg)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch", marginBottom: "clamp(48px, 6vh, 72px)" }}>
            <SectionNumeral n="01" label="The three layers" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.6vw, 44px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "26ch",
                textWrap: "balance",
              }}
            >
              {band.name} is <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>three layers</em>: {layers.map((l) => l.name).join(" · ")}.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {layers.map((layer) => (
              <Link
                key={layer.n}
                href={layerPath(layer)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0, 1fr) auto",
                  gap: 32,
                  alignItems: "start",
                  padding: "clamp(28px, 3vw, 40px)",
                  background: "var(--paper-2)",
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
                    fontSize: 64,
                    lineHeight: 1,
                    color: "var(--gold)",
                    fontWeight: 400,
                  }}
                >
                  {String(layer.n).padStart(2, "0")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 32,
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
                      marginBottom: 16,
                    }}
                  >
                    {layer.caption}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 17,
                      lineHeight: 1.55,
                      color: "var(--ink-2)",
                      margin: "0 0 20px 0",
                      maxWidth: "62ch",
                    }}
                  >
                    {layer.detail}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {layer.proof.map((p) => (
                      <li
                        key={p}
                        style={{
                          padding: "6px 12px",
                          background: "var(--paper)",
                          border: "1px solid var(--rule)",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.02em",
                          color: "var(--ink-2)",
                        }}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  aria-hidden
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 32,
                    color: "var(--ink-3)",
                    alignSelf: "center",
                  }}
                >
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sibling nav */}
      <section
        style={{
          background: "var(--paper-2)",
          paddingBlock: "clamp(56px, 8vh, 96px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          {prevBand ? (
            <Link
              href={bandPath(prevBand)}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 4,
                textDecoration: "none",
                color: "var(--ink)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                ← Previous band
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 500,
                }}
              >
                {prevBand.name}
              </span>
            </Link>
          ) : <div />}
          <Link
            href="/product"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            All bands
          </Link>
          {nextBand ? (
            <Link
              href={bandPath(nextBand)}
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 4,
                textDecoration: "none",
                color: "var(--ink)",
                textAlign: "right",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                Next band →
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 500,
                }}
              >
                {nextBand.name}
              </span>
            </Link>
          ) : <div />}
        </div>
      </section>

      <style>{`
        .layer-card:hover {
          border-color: var(--ink) !important;
          background: var(--paper) !important;
        }
      `}</style>
    </>
  );
}

function getSceneForBand(bandN: number): SceneId {
  if (bandN <= 2) return 1;
  if (bandN === 3) return 2;
  return 3;
}
