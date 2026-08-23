import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BANDS, LAYERS } from "@/lib/architecture";
import { bandPath, layerPath } from "@/lib/nav";
import { SCENES, type SceneId, type VariantId } from "@/content/stills";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { Button } from "@/components/ui/Button";

/**
 * PAGE · /product/[band]/[layer] · One of fifteen layer pages.
 *
 * The deepest surface in the product tree. Renders one layer with its
 * caption, detail, proof-points, its scene image, and prev/next sibling
 * layers in the same band + adjacent bands. generateStaticParams builds
 * all 15 at build time.
 */

type Params = { band: string; layer: string };

const BAND_SLUGS: Record<string, number> = {
  substrate: 1,
  boundary: 2,
  intelligence: 3,
  agent: 4,
  commerce: 5,
};

const LAYER_SLUGS: Record<number, string> = {
  1: "data",         2: "identity",      3: "departments",
  4: "ingest",       5: "api-mcp",       6: "integrations",
  7: "memory",       8: "reasoning",     9: "detectors",
  10: "pearl",      11: "approval",     12: "orchestrator",
  13: "tenant-lifecycle", 14: "billing", 15: "attestation",
};

export function generateStaticParams(): Params[] {
  return LAYERS.map((layer) => {
    const band = BANDS.find((b) => b.n === layer.band);
    if (!band) return null;
    const bandSlug = Object.entries(BAND_SLUGS).find(([, n]) => n === band.n)?.[0];
    if (!bandSlug) return null;
    return { band: bandSlug, layer: LAYER_SLUGS[layer.n] };
  }).filter((p): p is Params => p !== null);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { band: bandSlug, layer: layerSlug } = await params;
  const layerN = Object.entries(LAYER_SLUGS).find(([, s]) => s === layerSlug)?.[0];
  const layer = layerN ? LAYERS.find((l) => l.n === parseInt(layerN, 10)) : undefined;
  if (!layer) return {};
  return {
    title: `${layer.name} · ${layer.caption}`,
    description: layer.detail,
  };
}

export default async function LayerPage({ params }: { params: Promise<Params> }) {
  const { band: bandSlug, layer: layerSlug } = await params;
  const bandN = BAND_SLUGS[bandSlug];
  const band = BANDS.find((b) => b.n === bandN);
  const layerNStr = Object.entries(LAYER_SLUGS).find(([, s]) => s === layerSlug)?.[0];
  const layer = layerNStr ? LAYERS.find((l) => l.n === parseInt(layerNStr, 10) && l.band === bandN) : undefined;
  if (!band || !layer) notFound();

  const sceneId = getSceneForBand(band.n);
  const scene = SCENES[sceneId];
  const variant = (((layer.n - 1) % 4) + 1) as VariantId;

  const prevLayer = LAYERS.find((l) => l.n === layer.n - 1);
  const nextLayer = LAYERS.find((l) => l.n === layer.n + 1);

  return (
    <>
      {/* Breadcrumb + hero header */}
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
          paddingBlock: "clamp(96px, 12vh, 144px) clamp(48px, 6vh, 72px)",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 32 }}>
            <ol
              style={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
              }}
            >
              <li><Link href="/product" style={{ color: "var(--gold)", textDecoration: "none" }}>Product</Link></li>
              <li aria-hidden>›</li>
              <li><Link href={bandPath(band)} style={{ color: "var(--gold)", textDecoration: "none" }}>{band.name}</Link></li>
              <li aria-hidden>›</li>
              <li style={{ color: "var(--ink-2)" }}>{layer.name}</li>
            </ol>
          </nav>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "clamp(32px, 5vw, 72px)",
              alignItems: "start",
            }}
            className="layer-header-grid"
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  letterSpacing: "0.16em",
                  color: "var(--gold)",
                  fontWeight: 500,
                  marginBottom: 24,
                }}
              >
                Layer {String(layer.n).padStart(2, "0")} of 15
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(48px, 6vw, 88px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.026em",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: "0 0 20px 0",
                  textWrap: "balance",
                }}
              >
                {layer.name}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 15,
                  letterSpacing: "0.04em",
                  color: "var(--ink-3)",
                  margin: 0,
                  textTransform: "lowercase",
                }}
              >
                {layer.caption}
              </p>
            </div>

            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                background: "var(--paper-2)",
                border: "1px solid var(--rule)",
                overflow: "hidden",
              }}
            >
              <SceneStill scene={sceneId} variant={variant} shape="fullBleed" />
            </div>
          </div>
        </div>
      </section>

      {/* Detail + proof */}
      <section
        style={{
          background: "var(--paper)",
          paddingBlock: "clamp(64px, 9vh, 128px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 5fr) minmax(0, 4fr)",
              gap: "clamp(40px, 6vw, 88px)",
              alignItems: "start",
            }}
            className="detail-grid"
          >
            <div>
              <SectionNumeral n="01" label="What it is" />
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(20px, 2vw, 26px)",
                  lineHeight: 1.55,
                  color: "var(--ink)",
                  margin: "20px 0 0 0",
                  maxWidth: "60ch",
                  textWrap: "pretty",
                }}
              >
                {layer.detail}
              </p>
            </div>
            <div>
              <SectionNumeral n="02" label="Proof" />
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {layer.proof.map((p, i) => (
                  <li
                    key={p}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                      borderBottom: "1px solid var(--rule)",
                      paddingBlock: 20,
                      display: "grid",
                      gridTemplateColumns: "auto minmax(0, 1fr)",
                      gap: 20,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: "var(--gold)",
                        letterSpacing: "0.14em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 18,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scene context — this layer sits in Scene X of the story */}
      <section
        style={{
          background: "var(--paper-2)",
          paddingBlock: "clamp(48px, 7vh, 96px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="03" label="In the story" />
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.5,
                color: "var(--ink-2)",
                margin: "20px 0 0 0",
                maxWidth: "56ch",
              }}
            >
              {layer.name} is part of the {band.name} band — chapter{" "}
              <Link href="/#story" style={{ color: "var(--gold)", fontStyle: "normal", textDecoration: "none" }}>
                {scene.chapter}
              </Link>{" "}
              of the story. {scene.strap}
            </p>
          </div>
        </div>
      </section>

      {/* Prev / Next layer nav */}
      <section
        style={{
          background: "var(--paper)",
          paddingBlock: "clamp(56px, 8vh, 96px)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          {prevLayer ? (
            <Link
              href={layerPath(prevLayer)}
              style={{ display: "inline-flex", flexDirection: "column", gap: 4, textDecoration: "none", color: "var(--ink)" }}
            >
              <span className="eyebrow" style={{ color: "var(--ink-3)" }}>
                ← Layer {String(prevLayer.n).padStart(2, "0")}
              </span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500 }}>
                {prevLayer.name}
              </span>
            </Link>
          ) : <div />}
          <Link
            href={bandPath(band)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            All {band.name} layers
          </Link>
          {nextLayer ? (
            <Link
              href={layerPath(nextLayer)}
              style={{ display: "inline-flex", flexDirection: "column", gap: 4, textDecoration: "none", color: "var(--ink)", textAlign: "right" }}
            >
              <span className="eyebrow" style={{ color: "var(--ink-3)" }}>
                Layer {String(nextLayer.n).padStart(2, "0")} →
              </span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500 }}>
                {nextLayer.name}
              </span>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(64px, 9vh, 128px)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 34px)", color: "var(--ink)", margin: "0 auto 28px", maxWidth: "34ch", textWrap: "balance" }}>
            See {layer.name.toLowerCase()} in your own operation.
          </p>
          <Button href="/demo" size="lg">Book a demo</Button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .layer-header-grid, .detail-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
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
