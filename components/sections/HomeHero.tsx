import { BRAND } from "@/content/brand";
import fs from "node:fs";
import path from "node:path";

/**
 * FRAME · Home / 00 · Hero
 * PARENT · app/page.tsx (/)
 * PURPOSE · The first three seconds. Full-bleed atmospheric-nature video
 *           (Veo 3.1) or graceful cream-gradient placeholder. Serif H1
 *           overlaid bottom-left in magazine-cover composition.
 *
 * Voice · Institutional Reserve (v1 · 2026-08-23)
 *   "An institutional substrate for enterprise AI agents."
 *
 * Look · Layout A · full-bleed video + text overlay (Kinfolk / Aesop / Nat-Geo cover shape)
 *   Video: silent, autoplay, muted, playsinline. 90vh. Cover fit.
 *   Poster: shown before video loads AND when prefers-reduced-motion is set.
 *   Fallback: warm cream + subtle two-stop gradient if neither video nor poster exists yet.
 *   Overlay: soft bottom-to-top scrim in warm-ink so the text stays legible without
 *     darkening the whole image (Kinfolk-style, not SaaS-hero-style).
 *   Text: bottom-left inset, mono NEBBOS eyebrow + serif H1 at hero scale, no CTA.
 *
 * Asset generation:
 *   1. `export GEMINI_API_KEY=…`
 *   2. `npx tsx scripts/generate-hero-video.ts`
 *   3. `ffmpeg -i public/hero-video.mp4 -vf "select=eq(n\,0)" -q:v 2 public/hero-poster.jpg`
 *   4. Rebuild — the component auto-picks up whichever assets exist.
 */

// Assets present? checked at build time so we render the right treatment
// without a broken-video element flashing when the files aren't there yet.
const PUBLIC_DIR = path.join(process.cwd(), "public");
const VIDEO_PATH = "/hero-video.mp4";
const POSTER_PATH = "/hero-poster.jpg";
const hasVideo = fs.existsSync(path.join(PUBLIC_DIR, "hero-video.mp4"));
const hasPoster = fs.existsSync(path.join(PUBLIC_DIR, "hero-poster.jpg"));

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
      {/* Media layer — video if present, poster if only poster, else nothing (gradient body shows through) */}
      {hasVideo ? (
        <video
          className="hero-media"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={hasPoster ? POSTER_PATH : undefined}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={VIDEO_PATH} type="video/mp4" />
        </video>
      ) : hasPoster ? (
        // biome-ignore lint/a11y/useAltText: decorative — text overlay carries meaning
        <img
          src={POSTER_PATH}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      ) : (
        // Placeholder — subtle atmospheric wash while the video is being generated
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(60% 55% at 78% 20%, rgba(246, 160, 63, 0.18), transparent 60%), radial-gradient(50% 55% at 20% 100%, rgba(163, 102, 48, 0.12), transparent 60%), linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%)",
          }}
        />
      )}

      {/* Legibility scrim — soft bottom-to-top warm-ink gradient. Only fires if
          we actually have media behind. Kinfolk-style: light, warm, not SaaS. */}
      {(hasVideo || hasPoster) ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(20, 18, 15, 0.14) 75%, rgba(20, 18, 15, 0.42) 100%)",
          }}
        />
      ) : null}

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
              color: hasVideo || hasPoster ? "rgba(244, 241, 234, 0.86)" : "var(--gold)",
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
              color: hasVideo || hasPoster ? "var(--paper)" : "var(--ink)",
              margin: 0,
              textWrap: "balance",
              textShadow: hasVideo || hasPoster ? "0 1px 2px rgba(20, 18, 15, 0.32)" : "none",
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

      {/* Reduced-motion — hide autoplay video via CSS, show poster instead */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-media { display: none !important; }
        }
      `}</style>
    </section>
  );
}
