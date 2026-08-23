import Image from "next/image";
import { BRAND } from "@/content/brand";
import { SCENES, stillPath } from "@/content/stills";

/**
 * FRAME · Home / 00 · Hero
 * PARENT · app/page.tsx (/)
 * PURPOSE · The first three seconds. Full-bleed Scene 1 still (the coffee-shop
 *           opening from the site's three-scene narrative — "Where it starts").
 *           Serif H1 overlaid bottom-left in magazine-cover composition.
 *
 * Voice · Institutional Reserve (v1 · 2026-08-23)
 *   "An institutional substrate for enterprise AI agents."
 *
 * Look · Layout A · full-bleed still + text overlay (Kinfolk / Aesop / Nat-Geo cover shape)
 *   Image: Scene 1 (see content/stills.ts). next/image with priority, fill, cover.
 *   Overlay: soft bottom-to-top scrim in warm-ink so the text stays legible without
 *     darkening the whole image (Kinfolk-style, not SaaS-hero-style).
 *   Text: bottom-left inset, mono NEBBOS eyebrow + serif H1 at hero scale, no CTA.
 *   Chapter chip: top-right mono label pointing at Scene 1 in the narrative
 *     ("Where it starts") so the visitor knows the story has begun.
 *
 * The story continues in HomeStory (section 02) which walks all three scenes
 * and names the 15 architecture layers each scene carries.
 */

const HERO_SCENE = SCENES[1];
const HERO_STILL = stillPath(HERO_SCENE.id, 1);

export function HomeHero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      {/* Media layer — Scene 1 still, next/image with priority for LCP */}
      <Image
        src={HERO_STILL}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Legibility scrim — soft bottom-to-top warm-ink gradient over the image.
          Kinfolk-style: light, warm, not SaaS-heavy. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(20, 18, 15, 0.18) 75%, rgba(20, 18, 15, 0.48) 100%)",
        }}
      />

      {/* Chapter chip — top-right corner points at Scene 1 in the narrative */}
      <div
        style={{
          position: "absolute",
          top: "clamp(24px, 4vh, 48px)",
          right: "clamp(24px, 4vw, 48px)",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.86)",
          padding: "8px 14px",
          border: "1px solid rgba(244, 241, 234, 0.32)",
          backdropFilter: "blur(4px)",
        }}
      >
        01 · {HERO_SCENE.chapter}
      </div>

      {/* Text overlay — bottom-left. Serif H1 at hero scale. Small mono eyebrow above. */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBlock: "clamp(48px, 8vh, 96px)",
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
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 1.04,
              letterSpacing: "-0.024em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
              textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
            }}
          >
            An{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--accent-2)",
                fontWeight: 400,
              }}
            >
              institutional
            </em>{" "}
            substrate for enterprise AI agents.
          </h1>
        </div>
      </div>
    </section>
  );
}
