import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BANDS, LAYERS } from "@/lib/architecture";
import { bandPath, layerPath } from "@/lib/nav";
import { SCENES, type SceneId, type VariantId } from "@/content/stills";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { FullBleedScene } from "@/components/site/FullBleedScene";
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
  action: 4,
  commerce: 5,
};

const LAYER_SLUGS: Record<number, string> = {
  1: "data",         2: "identity",      3: "departments",
  4: "ingest",       5: "api-mcp",       6: "integrations",
  7: "memory",       8: "reasoning",     9: "detectors",
  10: "pearl",      11: "approval",     12: "orchestrator",
  13: "onboarding", 14: "billing", 15: "attestation",
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
  const { layer: layerSlug } = await params;
  const layerN = Object.entries(LAYER_SLUGS).find(([, s]) => s === layerSlug)?.[0];
  const layer = layerN ? LAYERS.find((l) => l.n === parseInt(layerN, 10)) : undefined;
  if (!layer) return {};
  return {
    title: `${layer.name} · ${layer.caption}`,
    description: layer.detail,
  };
}

export default async function LayerPage({ params }: { params: Promise<Params> }) {
  const { band: bandParam, layer: layerSlug } = await params;
  const bandN = BAND_SLUGS[bandParam];
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
      {/* Full-bleed hero — image + breadcrumb + h1 overlaid */}
      <FullBleedScene
        className="hero-fullbleed"
        scene={{ imageFamily: bandFamily(band.n), imageFamilyVariant: ((layer.n % 2) + 1) as 1 | 2 }}
        scrim="bottom"
        vignetteStrength={0.5}
        priority
      >
        <nav aria-label="Breadcrumb" className="hero-breadcrumb">
          <div className="container">
            <ol className="hero-breadcrumb__list">
              <li><Link href="/product" className="hero-breadcrumb__link">Product</Link></li>
              <li aria-hidden className="hero-breadcrumb__sep">›</li>
              <li><Link href={bandPath(band)} className="hero-breadcrumb__link">{band.name}</Link></li>
              <li aria-hidden className="hero-breadcrumb__sep">›</li>
              <li className="hero-breadcrumb__current">{layer.name}</li>
            </ol>
          </div>
        </nav>
        <div className="container hero-fullbleed__inner">
          <div className="hero-fullbleed__frame">
            <span className="hero-fullbleed__brand">
              Layer {String(layer.n).padStart(2, "0")} of 15
            </span>
            <h1 className="hero-fullbleed__title">{layer.name}</h1>
            <p className="hero-fullbleed__deck">{layer.caption}</p>
          </div>
        </div>
      </FullBleedScene>

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

      {/* WHO · who uses / runs / owns this layer */}
      {layer.who && (
        <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container">
            <div style={{ maxWidth: "68ch" }}>
              <SectionNumeral n="03" label="Who" />
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.6, color: "var(--ink)", margin: "20px 0 0 0", maxWidth: "62ch" }}>
                {layer.who}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* WHERE · where this layer sits in the architecture */}
      {layer.where && (
        <section style={{ background: "var(--paper)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container">
            <div style={{ maxWidth: "68ch" }}>
              <SectionNumeral n="04" label="Where it fits" />
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.6, color: "var(--ink)", margin: "20px 0 0 0", maxWidth: "62ch" }}>
                {layer.where}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* WHEN · situations that trigger this layer's use */}
      {layer.when && layer.when.length > 0 && (
        <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <SectionNumeral n="05" label="When it matters" />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "28ch", textWrap: "balance" }}>
              Situations that put {layer.name} in the frame.
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
              {layer.when.map((item, i) => (
                <li key={item} style={{ borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", paddingBlock: 18, display: "grid", gridTemplateColumns: "40px minmax(0, 1fr)", gap: 20, alignItems: "baseline" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, lineHeight: 1.5, color: "var(--ink)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* WHY · the compounding value */}
      {layer.why && (
        <section style={{ background: "var(--paper)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container">
            <div style={{ maxWidth: "68ch" }}>
              <SectionNumeral n="06" label="Why it matters" />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 20px 0", maxWidth: "28ch", textWrap: "balance" }}>
                The compounding value of {layer.name}.
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: "62ch" }}>
                {layer.why}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 07 · HOW TO THINK ABOUT IT · framework paragraph */}
      {layer.howToThink && (
        <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container">
            <div style={{ maxWidth: "68ch" }}>
              <SectionNumeral n="07" label="How to think about it" />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 20px 0", maxWidth: "28ch", textWrap: "balance" }}>
                A framework for {layer.name}.
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(19px, 1.8vw, 24px)", lineHeight: 1.6, color: "var(--ink)", margin: 0, maxWidth: "64ch" }}>
                {layer.howToThink}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 08 · PITFALLS · what teams get wrong */}
      {layer.pitfalls && layer.pitfalls.length > 0 && (
        <section style={{ background: "var(--paper)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container" style={{ maxWidth: 960 }}>
            <SectionNumeral n="08" label="Common pitfalls" />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "32ch", textWrap: "balance" }}>
              What teams get wrong when they try to build {layer.name} themselves.
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
              {layer.pitfalls.map((p, i) => (
                <li key={p.title} style={{ borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", paddingBlock: 24, display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)", gap: 24, alignItems: "baseline" }}>
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{p.title}</div>
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", margin: 0, maxWidth: "58ch" }}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 09 · BENCHMARKS · data points + numbers */}
      {layer.benchmarks && layer.benchmarks.length > 0 && (
        <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container" style={{ maxWidth: 1000 }}>
            <SectionNumeral n="09" label="Benchmark numbers" />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "26ch", textWrap: "balance" }}>
              What good looks like for {layer.name}.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0, borderTop: "1px solid var(--rule)", borderLeft: "1px solid var(--rule)" }}>
              {layer.benchmarks.map((b) => (
                <div key={b.label} style={{ padding: "24px 28px", borderRight: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
                  <div className="eyebrow" style={{ color: "var(--ink-3)", marginBottom: 12 }}>{b.label}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 3.4vw, 44px)", fontWeight: 500, color: "var(--gold)", lineHeight: 1, marginBottom: 12, letterSpacing: "-0.014em" }}>{b.value}</div>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5, color: "var(--ink-2)", margin: 0 }}>{b.context}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10 · RELATED LAYERS · cross-links */}
      {layer.related && layer.related.length > 0 && (
        <section style={{ background: "var(--paper)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <SectionNumeral n="10" label="Related layers" />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "26ch" }}>
              {layer.name} sits alongside these layers.
            </h2>
            <ul style={{ listStyle: "none", display: "grid", gap: 0 }}>
              {layer.related.map((relN, i) => {
                const rel = LAYERS.find((l) => l.n === relN);
                if (!rel) return null;
                return (
                  <li key={relN}>
                    <Link href={layerPath(rel)} style={{ display: "grid", gridTemplateColumns: "56px minmax(0, 1fr) auto", gap: 24, alignItems: "baseline", padding: "20px 0", borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", textDecoration: "none", color: "inherit" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--gold)" }}>{String(rel.n).padStart(2, "0")}</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, color: "var(--ink)" }}>{rel.name}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.04em", marginTop: 4 }}>{rel.caption}</div>
                      </div>
                      <span aria-hidden style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink-3)" }}>→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* 11 · PEARLS THAT LEAN ON THIS LAYER */}
      {layer.pearls && layer.pearls.length > 0 && (
        <section style={{ background: "var(--paper-2)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <SectionNumeral n="11" label="Pearls that lean on this" />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "32ch" }}>
              Which per-department Pearls use {layer.name} the most.
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {layer.pearls.map((p) => (
                <span key={p} style={{ padding: "12px 20px", background: "var(--paper)", border: "1px solid var(--rule)", fontFamily: "var(--font-serif)", fontSize: 18, color: "var(--ink)" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12 · RESOURCES · deeper reading */}
      {layer.resources && layer.resources.length > 0 && (
        <section style={{ background: "var(--paper)", paddingBlock: "clamp(56px, 8vh, 104px)", borderBottom: "1px solid var(--rule)" }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <SectionNumeral n="12" label="Deep dive" />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 2.6vw, 34px)", lineHeight: 1.15, letterSpacing: "-0.014em", fontWeight: 500, color: "var(--ink)", margin: "20px 0 32px 0", maxWidth: "28ch" }}>
              Longer reading on {layer.name}.
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
              {layer.resources.map((r, i) => (
                <li key={r.title}>
                  <Link href={r.href} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "20px 0", borderTop: i === 0 ? "1px solid var(--rule)" : undefined, borderBottom: "1px solid var(--rule)", textDecoration: "none", color: "inherit" }}>
                    <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, color: "var(--ink)", flex: 1 }}>{r.title}</span>
                    <span aria-hidden style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--gold)" }}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
            <SectionNumeral n="13" label="In the story" />
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

function bandFamily(bandN: number): string {
  const map: Record<number, string> = {
    1: "band-substrate", 2: "band-boundary", 3: "band-intelligence",
    4: "band-action",    5: "band-commerce",
  };
  return map[bandN] ?? "band-intelligence";
}
