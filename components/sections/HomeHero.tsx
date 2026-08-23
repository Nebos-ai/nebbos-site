import { SCENES } from "@/content/stills";
import { SceneStill } from "@/components/ui/SceneStill";
import { BRAND } from "@/content/brand";

/**
 * HomeHero · v2 rebuild 2026-08-23
 *
 * The first three seconds of nebbos.ai. Full-bleed Scene 1 (Where it starts) —
 * a young woman by the coffee-shop window while workers plant a sapling
 * outside. The image tells "morning · beginning · nature." The overlaid
 * serif h1 tells "institutional substrate for enterprise AI agents."
 *
 * The scene bigger than the character. The character at a golden-ratio
 * intersection. The chapter chip in the top-right announces we're in
 * chapter 01 · Where it starts. The story continues in HomeStory below.
 */

const HERO_SCENE = SCENES[1];

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        minHeight: "min(90vh, 900px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      {/* Full-bleed background */}
      <SceneStill scene={HERO_SCENE.id} variant={1} shape="fullBleed" priority />

      {/* Warm legibility scrim */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(20,18,15,0.10) 0%, transparent 30%, transparent 55%, rgba(20,18,15,0.22) 78%, rgba(20,18,15,0.52) 100%)",
        }}
      />

      {/* Chapter chip · top-right */}
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
        01 · {HERO_SCENE.chapter}
      </div>

      {/* Copy overlay · bottom-left */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBlock: "clamp(56px, 10vh, 128px)",
        }}
      >
        <div style={{ maxWidth: "68ch", display: "flex", flexDirection: "column", gap: 28 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.86)",
            }}
          >
            {BRAND.name}
          </span>
          <h1
            id="hero-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 1.04,
              letterSpacing: "-0.024em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
              textShadow: "0 1px 2px rgba(20, 18, 15, 0.28)",
            }}
          >
            An{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: 400 }}>
              institutional
            </em>{" "}
            substrate for enterprise AI agents.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(17px, 1.6vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(244, 241, 234, 0.86)",
              maxWidth: "48ch",
              margin: 0,
              textShadow: "0 1px 2px rgba(20, 18, 15, 0.28)",
            }}
          >
            Fifteen layers, five bands, three lives they hold together.
          </p>
        </div>
      </div>
    </section>
  );
}
