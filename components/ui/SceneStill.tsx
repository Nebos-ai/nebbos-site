import Image from "next/image";
import {
  SCENES,
  PERSPECTIVES,
  stillPath,
  perspectivePath,
  type SceneId,
  type VariantId,
  type PerspectiveId,
  type PerspectiveVariantId,
} from "@/content/stills";

/**
 * SceneStill · v2 primitive
 *
 * Reusable next/image wrapper for the vision-board stills that carry the
 * site's visual spine. Every visual appearance of a scene or perspective
 * on the site MUST go through this component — never hard-code image paths.
 *
 * Two source modes:
 *   - `scene` + `variant`  → renders /vision-board/scene-{N}-v{V}.png
 *   - `perspective` + `pVariant`  → renders /vision-board/perspective-{N}-v{V}.png
 *
 * Two shapes:
 *   - `fullBleed`  — Image with fill + object-cover; parent MUST be relative
 *   - `inline`     — Image with fixed dimensions; sits in flow
 *
 * Founder directive 2026-08-23: "the images should never be framed they
 * should always be full screen." The old `framed` shape (figure + border +
 * aspect-ratio wrapper) has been removed. Use `fullBleed` inside a
 * position:relative section wrapper.
 */

type Shape = "fullBleed" | "inline";

type BaseProps = {
  shape?: Shape;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
};

type SceneProps = BaseProps & {
  scene: SceneId;
  variant?: VariantId;
  perspective?: never;
  pVariant?: never;
};

type PerspectiveProps = BaseProps & {
  perspective: PerspectiveId;
  pVariant?: PerspectiveVariantId;
  scene?: never;
  variant?: never;
  v2Scene?: never;
  v2Variant?: never;
};

type V2Props = BaseProps & {
  v2Scene: number;
  v2Variant?: 1 | 2;
  scene?: never;
  variant?: never;
  perspective?: never;
  pVariant?: never;
};

type Props = SceneProps | PerspectiveProps | V2Props;

function resolveSource(props: Props): { src: string; alt: string } {
  if ("v2Scene" in props && props.v2Scene) {
    return {
      src: `/vision-board/v2-${props.v2Scene}-v${props.v2Variant ?? 1}.png`,
      alt: props.caption || "",
    };
  }
  if ("perspective" in props && props.perspective) {
    const p = PERSPECTIVES[props.perspective];
    return {
      src: perspectivePath(props.perspective, props.pVariant ?? 1),
      alt: props.caption || p.description,
    };
  }
  if ("scene" in props && props.scene) {
    const s = SCENES[props.scene];
    return {
      src: stillPath(props.scene, props.variant ?? 1),
      alt: props.caption || `${s.chapter} — ${s.strap}`,
    };
  }
  throw new Error("SceneStill requires scene, perspective, or v2Scene");
}

export function SceneStill(props: Props) {
  const { shape = "fullBleed", priority = false, sizes, className } = props;
  const { src, alt } = resolveSource(props);

  if (shape === "fullBleed") {
    return (
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={className}
        style={{ objectFit: "cover" }}
      />
    );
  }

  // shape === "inline"
  return (
    <Image
      src={src}
      alt={alt}
      width={1400}
      height={787}
      sizes={sizes ?? "(max-width: 900px) 100vw, 780px"}
      className={className}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
