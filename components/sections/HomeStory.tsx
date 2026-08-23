import Link from "next/link";
import { SCENES_IN_ORDER } from "@/content/stills";
import { LAYERS } from "@/lib/architecture";
import { layerPath } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";

/**
 * HomeStory · v2 rebuild 2026-08-23
 *
 * Three scenes told back-to-back: coffee shop (Where it starts) → NYC
 * executive (Where it grows) → Amalfi elder (Where it endures). Each tile
 * carries TWO registers of copy — the life narrative (what the person is
 * doing) and the tech narrative (what Nebbos is doing quietly underneath).
 * Together they answer the founder directive: "the 15 points can be told
 * through these images as well · you are missing the tech aspect."
 *
 * Every tile pairs its scene with the specific architecture layers that
 * scene carries, rendered as numbered chips. Together the three tiles
 * cover all 15 layers.
 */
export function HomeStory() {
  return (
    <section
      aria-labelledby="story-heading"
      style={{
        background: "var(--paper-2)",
        paddingBlock: "var(--section-y-lg)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "68ch", marginBottom: "clamp(48px, 6vh, 80px)" }}>
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

      {SCENES_IN_ORDER.map((scene, idx) => {
        const flip = idx % 2 === 1;
        const bandLayers = LAYERS.filter((l) => scene.bands.includes(l.band));

        return (
          <article
            key={scene.id}
            style={{
              borderTop: "1px solid var(--rule)",
              paddingBlock: "clamp(56px, 8vh, 96px)",
            }}
          >
            <div
              className="container"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                gap: "clamp(32px, 5vw, 72px)",
                alignItems: "center",
              }}
            >
              {/* Media */}
              <div style={{ order: flip ? 2 : 1 }} className="story-media">
                <SceneStill scene={scene.id} variant={1} shape="framed" />
              </div>

              {/* Copy */}
              <div
                style={{
                  order: flip ? 1 : 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
                className="story-copy"
              >
                <div>
                  <SectionNumeral n={`0${idx + 4}`} label={scene.chapter} />
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(24px, 2.8vw, 34px)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.014em",
                      fontWeight: 500,
                      color: "var(--ink)",
                      margin: "16px 0 0 0",
                      textWrap: "balance",
                    }}
                  >
                    {scene.strap}
                  </h3>
                </div>

                {/* Life narrative */}
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "var(--ink-2)",
                    margin: 0,
                    maxWidth: "48ch",
                    fontStyle: "italic",
                  }}
                >
                  {scene.narrative}
                </p>

                {/* Tech narrative */}
                <div
                  style={{
                    borderTop: "1px solid var(--rule)",
                    paddingTop: 20,
                    marginTop: 4,
                  }}
                >
                  <div className="eyebrow" style={{ marginBottom: 12 }}>
                    Under the surface
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: "var(--ink-2)",
                      margin: 0,
                      maxWidth: "48ch",
                    }}
                  >
                    {scene.techNarrative}
                  </p>
                </div>

                {/* Layer chips + band links */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {bandLayers.map((layer) => (
                      <Link
                        key={layer.n}
                        href={layerPath(layer)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "6px 12px",
                          background: "var(--paper)",
                          border: "1px solid var(--rule)",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
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
          </article>
        );
      })}

      <style>{`
        .layer-chip:hover {
          border-color: var(--ink) !important;
        }
        @media (max-width: 900px) {
          .story-media, .story-copy {
            order: unset !important;
          }
          article > .container {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

