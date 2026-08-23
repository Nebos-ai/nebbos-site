import Image from "next/image";
import { SCENES, stillPath, type SceneId, type VariantId } from "@/content/stills";

/**
 * SceneStill · v2 primitive
 *
 * Reusable Next Image wrapper for the 12 vision-board stills that carry the
 * site's visual spine. Auto-derives filename from scene + variant. Provides
 * three display shapes: full-bleed (hero backgrounds), framed (cards/tiles),
 * and inline (in-copy anchor).
 *
 * Every visual appearance of a scene on the site MUST go through this
 * component — never hard-code the /vision-board/*.png path in a page.
 *
 * Usage:
 *   <SceneStill scene={1} variant={1} shape="fullBleed" priority />
 *   <SceneStill scene={2} shape="framed" caption="Where it grows" />
 */

type Shape = "fullBleed" | "framed" | "inline";

type Props = {
  scene: SceneId;
  variant?: VariantId;
  shape?: Shape;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  className?: string;
};

export function SceneStill({
  scene,
  variant = 1,
  shape = "framed",
  priority = false,
  sizes,
  caption,
  className,
}: Props) {
  const sceneMeta = SCENES[scene];
  const src = stillPath(scene, variant);
  const alt = caption || `Scene ${scene}: ${sceneMeta.chapter} — ${sceneMeta.strap}`;

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

  if (shape === "inline") {
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

  // shape === "framed"
  return (
    <figure
      className={className}
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          background: "var(--paper-2)",
          border: "1px solid var(--rule)",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 900px) 100vw, 50vw"}
          style={{ objectFit: "cover" }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
