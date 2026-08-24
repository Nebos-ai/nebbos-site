import type { ReactNode } from "react";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";

/**
 * FullBleedScene · C15 primitive · v1 · 2026-08-24
 *
 * The one component that renders "full-bleed image + overlay + optional
 * chapter metadata + content overlay children" for every scene-heavy
 * surface on the site — HomeHero, HomeCTA, PageRenderer.HeroFullBleed,
 * PageRenderer.CTAFullBleed, /customers page hero + closing CTA.
 *
 * Consumers pass the className (typically `hero-fullbleed` or
 * `cta-fullbleed` — both defined in app/globals.css) which sets
 * min-height + item-alignment + border. This component owns the image
 * source resolution, the scrim / vignette, and the metadata plate.
 * Children are the content overlay (inner container + frame + copy).
 *
 * Every scene-heavy surface now shares one composition. Change how images
 * load, or how overlays behave, or where the chapter plate sits — one
 * file to edit.
 */

type Chapter = string;

type SceneSource =
  | { imageFamily: string; imageFamilyVariant?: 1 | 2 }
  | { imageV3: number }
  | { imageV2: number }
  | { imageScene: 1 | 2 | 3; sceneVariant?: 1 | 2 | 3 | 4 }
  | { imagePerspective: number };

export type FullBleedSceneProps = {
  /** Which CSS class governs the section chrome (min-height, border). Typically
   *  "hero-fullbleed" for openers and "cta-fullbleed" for closers. */
  className: string;
  /** Image source. Exactly one of imageFamily / imageV3 / imageV2 / imageScene
   *  / imagePerspective should be set. */
  scene?: SceneSource;
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
  /** LCP priority — set on the home hero + first-scene surfaces. */
  priority?: boolean;
  /** Inner content overlay — typically a container with title / deck / CTAs. */
  children: ReactNode;
};

function renderScene(scene: SceneSource | undefined, priority?: boolean) {
  if (!scene) return null;
  if ("imageFamily" in scene) {
    return (
      <SceneStill
        family={scene.imageFamily}
        familyVariant={scene.imageFamilyVariant ?? 1}
        shape="fullBleed"
        priority={priority}
      />
    );
  }
  if ("imageV3" in scene) {
    return <SceneStill v3Scene={scene.imageV3} v3Variant={1} shape="fullBleed" priority={priority} />;
  }
  if ("imageV2" in scene) {
    return <SceneStill v2Scene={scene.imageV2} v2Variant={1} shape="fullBleed" priority={priority} />;
  }
  if ("imageScene" in scene) {
    return (
      <SceneStill
        scene={scene.imageScene}
        variant={(scene.sceneVariant ?? 1) as 1 | 2 | 3 | 4}
        shape="fullBleed"
        priority={priority}
      />
    );
  }
  if ("imagePerspective" in scene) {
    return (
      <SceneStill
        perspective={scene.imagePerspective as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}
        pVariant={1}
        shape="fullBleed"
        priority={priority}
      />
    );
  }
  return null;
}

export function FullBleedScene({
  className,
  scene,
  scrim = "bottom",
  vignetteStrength = 0.5,
  chapter,
  chapterLabel,
  chapterPosition = "top-right",
  ariaLabelledby,
  priority,
  children,
}: FullBleedSceneProps) {
  return (
    <section className={className} aria-labelledby={ariaLabelledby}>
      {renderScene(scene, priority)}
      <SceneOverlay scrim={scrim} vignetteStrength={vignetteStrength} />
      {chapter && chapterLabel && (
        <SceneMetadataPlate chapter={chapter} label={chapterLabel} position={chapterPosition} />
      )}
      {children}
    </section>
  );
}
