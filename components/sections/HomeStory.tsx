import Image from "next/image";
import { SCENES_IN_ORDER } from "@/content/stills";
import { LAYERS } from "@/lib/architecture";
import { SectionNumeral } from "@/components/ui/SectionNumeral";

/**
 * FRAME · Home / 02 · The story
 * PARENT · app/page.tsx (/)
 * PURPOSE · Three scene tiles that carry the site's narrative arc + name the
 *           15 architecture layers by scene. Each tile pairs a still with two
 *           registers of copy: LIFE (what the person is doing) and TECH (what
 *           Nebbos is doing quietly underneath). Together they answer the
 *           founder directive "the 15 points can be told through these images
 *           as well · you are missing the tech aspect of these scenes".
 *
 * Layout · alternating architectural block:
 *
 *   ┌────────────────────────────┬──────────────────────┐
 *   │   [Scene 1 · full-bleed]   │  01 · Where it starts │
 *   │                            │  Life copy...         │
 *   │                            │  Tech copy...         │
 *   │                            │  Layer chips...       │
 *   └────────────────────────────┴──────────────────────┘
 *
 * Tile 2 flips (image right / copy left). Tile 3 flips back. Institutional
 * Reserve register — paper cream ground, serif display, mono eyebrows,
 * hairline dividers between tiles.
 */
export function HomeStory() {
  return (
    <section
      style={{
        background: "var(--paper)",
        borderBlock: "1px solid var(--rule)",
        paddingBlock: "clamp(72px, 10vh, 128px)",
      }}
    >
      <div className="container" style={{ marginBottom: "clamp(48px, 6vh, 80px)" }}>
        <SectionNumeral n="02" label="The story" />
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 4.4vw, 56px)",
            lineHeight: 1.06,
            letterSpacing: "-0.022em",
            fontWeight: 400,
            color: "var(--ink)",
            margin: "20px 0 0 0",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          Fifteen layers,{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
            three lives
          </em>{" "}
          they hold together.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--ink-2)",
            maxWidth: "58ch",
            marginTop: 20,
          }}
        >
          The architecture is real. So are the lives it makes possible. Here is
          how a substrate becomes a morning by the window, a mid-morning at the
          park, an evening by the sea — and what is quietly running beneath each.
        </p>
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
              {/* Media block */}
              <div
                style={{
                  order: flip ? 2 : 1,
                  position: "relative",
                  aspectRatio: "16 / 9",
                  background: "var(--paper-2)",
                  border: "1px solid var(--rule)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`/vision-board/scene-${scene.id}-v1.png`}
                  alt={`Scene ${scene.id}: ${scene.chapter} — ${scene.strap}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  priority={idx === 0}
                />
              </div>

              {/* Copy block */}
              <div
                style={{
                  order: flip ? 1 : 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                <div>
                  <SectionNumeral
                    n={`0${idx + 3}`}
                    label={scene.chapter}
                  />
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

                {/* Tech narrative — separated by a hairline + mono heading */}
                <div
                  style={{
                    borderTop: "1px solid var(--rule)",
                    paddingTop: 20,
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: 12,
                    }}
                  >
                    Under the surface
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--ink-2)",
                      margin: 0,
                      maxWidth: "48ch",
                    }}
                  >
                    {scene.techNarrative}
                  </p>
                </div>

                {/* Layer chips — the specific architecture layers this scene carries */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  {bandLayers.map((layer) => (
                    <span
                      key={layer.n}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 12px",
                        background: "var(--paper-2)",
                        border: "1px solid var(--rule)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--ink-2)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--gold)",
                          fontWeight: 600,
                        }}
                      >
                        {String(layer.n).padStart(2, "0")}
                      </span>
                      <span>{layer.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}

      {/* Mobile — collapse to single column */}
      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns"] {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .container > div[style*="grid-template-columns"] > div[style*="order: 1"],
          .container > div[style*="grid-template-columns"] > div[style*="order: 2"] {
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
