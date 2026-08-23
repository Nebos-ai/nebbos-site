import Link from "next/link";
import {
  SCENES_IN_ORDER,
  type SceneId,
  type PerspectiveId,
} from "@/content/stills";
import { LAYERS } from "@/lib/architecture";
import { layerPath } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";

const ROMAN = ["", "II", "III", "IV", "V", "VI"];

/**
 * Per-scene featured perspective for the HomeStory triptych.
 * Hero + CTA use character-forward scene shots (v1 / v4). HomeStory uses
 * these DIFFERENT perspectives so nothing repeats across the scroll.
 *   Scene 1 → perspective 1 (street workers planting)
 *   Scene 2 → perspective 5 (empty office wide)
 *   Scene 3 → perspective 7 (Mediterranean vista alone)
 */
const STORY_PERSPECTIVES: Record<SceneId, PerspectiveId> = {
  1: 1,
  2: 5,
  3: 7,
};

/**
 * HomeStory · v2 rebuild 2026-08-23 (revised: full-bleed images, no framing).
 *
 * Founder directive: "the images should never be framed they should always
 * be full screen."
 *
 * Each of three scenes = ONE full-bleed cinematic section (80vh) with the
 * scene image spanning the viewport, a warm scrim, chapter chip top-right,
 * and life-narrative + strap overlaid at the bottom-left (hero-style).
 * A tech-narrative + layer chips block sits underneath each scene section
 * in a plain container — giving the detail copy room to breathe without
 * fighting the image for legibility.
 */
export function HomeStory() {
  return (
    <section
      aria-labelledby="story-heading"
      style={{
        background: "var(--paper)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          background: "var(--paper-2)",
          paddingBlock: "var(--section-y-lg)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="03" label="The story" />
            <h2
              id="story-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 4.4vw, 56px)",
                lineHeight: 1.06,
                letterSpacing: "-0.022em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "24ch",
                textWrap: "balance",
              }}
            >
              The system is the invisible half.{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                The life
              </em>{" "}
              is what remains.
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
              Three lives the substrate makes possible. A morning by the window. A
              mid-morning at the park. An evening by the sea. Beneath each, the
              architecture is doing exactly what it was designed to do — quietly.
            </p>
          </div>
        </div>
      </div>

      {SCENES_IN_ORDER.map((scene, idx) => {
        const bandLayers = LAYERS.filter((l) => scene.bands.includes(l.band));
        const chapterNum = idx + 4;

        return (
          <article key={scene.id}>
            {/* Full-bleed cinematic scene section */}
            <section
              style={{
                position: "relative",
                minHeight: "min(80vh, 820px)",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <SceneStill perspective={STORY_PERSPECTIVES[scene.id]} pVariant={1} shape="fullBleed" />

              {/* Editorial overlay: grain + vignette + bottom scrim */}
              <SceneOverlay scrim="bottom" />

              {/* Editorial metadata plate · top-right */}
              <SceneMetadataPlate chapter={ROMAN[idx + 2]} label={scene.chapter} position="top-right" />

              {/* Copy · bottom-left overlay */}
              <div
                className="container"
                style={{
                  position: "relative",
                  zIndex: 2,
                  paddingBlock: "clamp(48px, 8vh, 96px)",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: "52ch" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "rgba(244, 241, 234, 0.86)",
                    }}
                  >
                    Chapter {String(chapterNum).padStart(2, "0")} · {scene.chapter}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(32px, 4vw, 60px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                      color: "var(--paper)",
                      margin: 0,
                      textWrap: "balance",
                      textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
                    }}
                  >
                    {scene.strap}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(17px, 1.5vw, 20px)",
                      lineHeight: 1.55,
                      color: "rgba(244, 241, 234, 0.9)",
                      margin: 0,
                      maxWidth: "48ch",
                      textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
                    }}
                  >
                    {scene.narrative}
                  </p>
                </div>
              </div>
            </section>

            {/* Tech narrative + layer chips · plain container below the image */}
            <section
              style={{
                background: idx % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                paddingBlock: "clamp(48px, 8vh, 96px)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <div className="container">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
                    gap: "clamp(32px, 5vw, 88px)",
                    alignItems: "start",
                  }}
                  className="story-detail-grid"
                >
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>
                      Under the surface
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 17,
                        lineHeight: 1.65,
                        color: "var(--ink-2)",
                        margin: 0,
                        maxWidth: "52ch",
                      }}
                    >
                      {scene.techNarrative}
                    </p>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ marginBottom: 12 }}>
                      Layers this scene carries
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {bandLayers.map((layer) => (
                        <Link
                          key={layer.n}
                          href={layerPath(layer)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 14px",
                            background: "var(--paper)",
                            border: "1px solid var(--rule)",
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            letterSpacing: "0.06em",
                            color: "var(--ink-2)",
                            textDecoration: "none",
                            transition: "border-color var(--dur-fast) var(--ease-out)",
                          }}
                          className="layer-chip"
                        >
                          <span style={{ color: "var(--gold)", fontWeight: 600 }}>
                            {String(layer.n).padStart(2, "0")}
                          </span>
                          <span>{layer.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
        );
      })}

      <style>{`
        .layer-chip:hover { border-color: var(--ink) !important; }
        @media (max-width: 900px) {
          .story-detail-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
