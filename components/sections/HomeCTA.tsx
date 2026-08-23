import { SCENES } from "@/content/stills";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";
import { Button } from "@/components/ui/Button";

/**
 * HomeCTA · v2 rebuild 2026-08-23
 *
 * The closing band. Full-bleed Scene 3 (Where it endures) — the Amalfi
 * elder beside his vintage Porsche and the ancient olive, Mediterranean
 * spread wide. The narrative arc opened at the hero with Scene 1 and
 * closes here. Every visitor walks the same three-scene story from top
 * to bottom.
 */

const CTA_SCENE = SCENES[3];

export function HomeCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{
        position: "relative",
        minHeight: "min(72vh, 720px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderTop: "1px solid var(--rule)",
      }}
    >
      {/* v2-7 corporate boardroom — corporate, not travel */}
      <SceneStill v2Scene={7} v2Variant={1} shape="fullBleed" />

      {/* Editorial overlay: grain + vignette + left scrim for text legibility */}
      <SceneOverlay scrim="left" />

      {/* Editorial metadata plate · top-right — closes the arc opened at hero */}
      <SceneMetadataPlate chapter="VII" label={CTA_SCENE.chapter} position="top-right" />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBlock: "clamp(48px, 8vh, 96px)",
        }}
      >
        <div style={{ maxWidth: "44ch", display: "flex", flexDirection: "column", gap: 32 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.86)",
            }}
          >
            Where you take it next
          </span>
          <h2
            id="cta-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.6vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
              textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
            }}
          >
            Put a Pearl on your{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: 400 }}>
              hardest
            </em>{" "}
            department.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(244, 241, 234, 0.86)",
              margin: 0,
              textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
            }}
          >
            Live in days, not quarters. Owned by you, portable to you, compounding
            every quarter.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
            <Button href="/demo" variant="solid-light" size="lg">Book a demo</Button>
            <Button href="/product" variant="ghost-light" size="lg" arrow={false}>
              See the system
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
