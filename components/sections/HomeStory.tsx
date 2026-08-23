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

// Corporate-only imagery per founder direction — no travel-adjacent scenes.
// Retired: perspective 1 (coffee street), perspective 7 (Mediterranean vista).
const STORY_PERSPECTIVES: Record<SceneId, PerspectiveId> = {
  1: 3,  // coffee-shop interior wide (architectural, no travel)
  2: 5,  // NYC office empty (corporate, no travel)
  3: 5,  // NYC office empty repeat (deferred; v3 corporate scene coming)
};

/**
 * HomeStory · editorial-minimum revision 2026-08-23
 *
 * Founder critique: "the picture should tell the story · this is not an ERP
 * company site." Previous version stacked chapter + strap + italic narrative
 * paragraph + "Under the surface" tech paragraph + layer chip cluster on
 * every scene. Read as tutorial, not magazine.
 *
 * New shape per scene:
 *   [full-bleed image]
 *   Chapter · Roman numeral · label      (metadata plate on the image)
 *   ONE editorial line overlaid           (like a magazine caption)
 *   Layer names as a tiny hairline row below (footer chips, minimal)
 *
 * No paragraphs. No "under the surface" heading. No tutorial voice.
 * The image is the story. Words are a caption.
 */

// One short editorial caption per scene. Not a paragraph. Not a tutorial.
// Reads as a magazine spread's title card.
const SCENE_CAPTIONS: Record<SceneId, { title: string; sub: string }> = {
  1: {
    title: "The company begins the way any garden does.",
    sub: "Substrate. The foundation takes shape.",
  },
  2: {
    title: "At scale, the same hand becomes a system.",
    sub: "Intelligence. Memory compounds. Reasoning routes.",
  },
  3: {
    title: "What compounds quietly outlasts what was announced loudly.",
    sub: "Ownership. The tuned Pearl moves with you.",
  },
};

export function HomeStory() {
  return (
    <section aria-labelledby="story-heading" style={{ background: "var(--paper)" }}>
      {/* Section header — tight, no deck paragraph */}
      <div
        style={{
          paddingBlock: "clamp(80px, 12vh, 160px) clamp(48px, 6vh, 72px)",
          borderBottom: "1px solid var(--rule)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <SectionNumeral n="03" label="Three chapters" />
          <h2
            id="story-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "24px auto 0",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            One{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              operating system.
            </em>{" "}
            Three chapters of a working day.
          </h2>
        </div>
      </div>

      {SCENES_IN_ORDER.map((scene, idx) => {
        const bandLayers = LAYERS.filter((l) => scene.bands.includes(l.band));
        const chapterNum = idx + 2;
        const caption = SCENE_CAPTIONS[scene.id];

        return (
          <article key={scene.id}>
            {/* Full-bleed cinematic scene — image + short caption overlaid */}
            <section
              style={{
                position: "relative",
                minHeight: "min(88vh, 900px)",
                display: "flex",
                alignItems: "flex-end",
                overflow: "hidden",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <SceneStill perspective={STORY_PERSPECTIVES[scene.id]} pVariant={1} shape="fullBleed" />
              <SceneOverlay scrim="bottom" />
              <SceneMetadataPlate
                chapter={ROMAN[chapterNum]}
                label={scene.chapter}
                position="top-right"
              />

              {/* Copy overlay · magazine caption, not essay */}
              <div
                className="container"
                style={{
                  position: "relative",
                  zIndex: 2,
                  paddingBlock: "clamp(56px, 9vh, 112px)",
                }}
              >
                <div style={{ maxWidth: "44ch", display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(28px, 3.6vw, 52px)",
                      lineHeight: 1.06,
                      letterSpacing: "-0.02em",
                      fontWeight: 400,
                      color: "var(--paper)",
                      margin: 0,
                      textWrap: "balance",
                      textShadow: "0 1px 3px rgba(20, 18, 15, 0.42)",
                    }}
                  >
                    {caption.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(244, 241, 234, 0.86)",
                      margin: 0,
                      textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
                    }}
                  >
                    {caption.sub}
                  </p>
                </div>
              </div>
            </section>

            {/* Tiny layer-name row · hairline footer, not a "cluster" */}
            <section
              style={{
                background: idx % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                paddingBlock: "clamp(20px, 3vh, 32px)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <div
                className="container"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  alignItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                }}
              >
                <span style={{ color: "var(--gold)" }}>
                  {String(chapterNum - 1).padStart(2, "0")} · Layers active
                </span>
                <span aria-hidden style={{ opacity: 0.4 }}>—</span>
                {bandLayers.map((layer, i) => (
                  <span key={layer.n} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    {i > 0 && <span aria-hidden style={{ opacity: 0.3 }}>·</span>}
                    <Link
                      href={layerPath(layer)}
                      style={{
                        color: "var(--ink-2)",
                        textDecoration: "none",
                        transition: "color var(--dur-fast) var(--ease-out)",
                      }}
                      className="layer-link"
                    >
                      {layer.name}
                    </Link>
                  </span>
                ))}
              </div>
            </section>
          </article>
        );
      })}

      <style>{`
        .layer-link:hover { color: var(--gold) !important; }
      `}</style>
    </section>
  );
}
