import type { ReactNode } from "react";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";

/**
 * FullBleedVideo · v1 · 2026-08-24
 *
 * Video counterpart to FullBleedScene. Renders a full-bleed silent auto-
 * looping video as the hero background layer, with the same overlay
 * treatment (scrim + vignette + optional chapter plate) and the same
 * content-overlay children pattern.
 *
 * Attributes on the video element are the four required for autoplay on
 * every browser:
 *   - autoPlay
 *   - loop
 *   - muted
 *   - playsInline   (iOS Safari won't autoplay without it)
 *
 * A poster image is required — it shows during video load (LCP-friendly)
 * and stays as fallback if video fails or the user's browser blocks it.
 * The poster can be a concept-family still (via `posterFamily`), so it
 * shares the same visual grammar as the rest of the site's imagery.
 */

type Chapter = string;

export type FullBleedVideoProps = {
  /** CSS class governing section chrome (min-height, border). Typically
   *  "hero-fullbleed" for openers and "cta-fullbleed" for closers. */
  className: string;
  /** Video source URL(s). At least MP4 (H.264). Provide WebM as fallback if
   *  optimized separately; ordered — browser picks the first it supports. */
  sources: Array<{ src: string; type: string }>;
  /** Poster shown during load and as fallback. One of:
   *   - posterFamily + posterFamilyVariant (uses concept-family still)
   *   - posterSrc (raw URL) */
  posterFamily?: string;
  posterFamilyVariant?: 1 | 2;
  posterSrc?: string;
  /** Scrim direction on the SceneOverlay. Default: "bottom". */
  scrim?: "bottom" | "left" | "right" | "none";
  /** Vignette strength (0–1). Default: 0.5. */
  vignetteStrength?: number;
  /** Optional metadata plate — chapter numeral + label + position. */
  chapter?: Chapter;
  chapterLabel?: string;
  chapterPosition?: "top-left" | "top-right";
  /** ARIA labelledby target on the outer section. */
  ariaLabelledby?: string;
  /** Inner content overlay — typically a container with title / deck / CTAs. */
  children: ReactNode;
};

export function FullBleedVideo({
  className,
  sources,
  posterFamily,
  posterFamilyVariant = 1,
  posterSrc,
  scrim = "bottom",
  vignetteStrength = 0.5,
  chapter,
  chapterLabel,
  chapterPosition = "top-right",
  ariaLabelledby,
  children,
}: FullBleedVideoProps) {
  // Resolve poster: explicit posterSrc wins, else family-based
  const posterUrl =
    posterSrc ??
    (posterFamily
      ? `/vision-board/family-${posterFamily}-v${posterFamilyVariant}.png`
      : undefined);

  return (
    <section className={className} aria-labelledby={ariaLabelledby}>
      {/* Video layer — same z-order as SceneStill in FullBleedScene */}
      <video
        className="fullbleed-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterUrl}
        aria-hidden="true"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        {/* Fallback: poster image shows if <video> is unsupported */}
        {posterFamily ? (
          <SceneStill
            family={posterFamily}
            familyVariant={posterFamilyVariant}
            shape="fullBleed"
            priority
          />
        ) : null}
      </video>

      <SceneOverlay scrim={scrim} vignetteStrength={vignetteStrength} />

      {chapter && chapterLabel && (
        <SceneMetadataPlate chapter={chapter} label={chapterLabel} position={chapterPosition} />
      )}

      {children}
    </section>
  );
}
