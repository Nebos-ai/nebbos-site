import { SCENES } from "@/content/stills";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";
import { BRAND } from "@/content/brand";

/**
 * HomeHero · v2 rebuild 2026-08-23
 *
 * The first three seconds of nebbos.ai. Full-bleed Scene 1 (Where it starts) —
 * a young woman by the coffee-shop window while workers plant a sapling
 * outside. The image tells "morning · beginning · nature." The overlaid
 * serif h1 names Nebbos as "the company brain your team never had time to build."
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
      {/* Full-bleed background — family-band-intelligence (Memory-forward,
          the differentiator). Same visual family used wherever Intelligence
          appears site-wide. */}
      <SceneStill family="band-intelligence" familyVariant={1} shape="fullBleed" priority />

      {/* Editorial overlay: grain + vignette + heavy bottom scrim so copy pops */}
      <SceneOverlay scrim="bottom" vignetteStrength={0.5} />

      {/* Editorial metadata plate · top-right */}
      <SceneMetadataPlate chapter="I" label="Where it starts" position="top-right" />

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
              textShadow: "0 2px 4px rgba(20, 18, 15, 0.42)",
            }}
          >
            Their AI doesn&rsquo;t train on your data.{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: 400 }}>
              Nebbos does.
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(17px, 1.6vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(244, 241, 234, 0.92)",
              maxWidth: "56ch",
              margin: 0,
              textShadow: "0 1px 3px rgba(20, 18, 15, 0.42)",
            }}
          >
            One Pearl per department. Every human decision your team makes trains your model, not someone else&rsquo;s. Portable to you if you ever leave.
          </p>
        </div>
      </div>
    </section>
  );
}
