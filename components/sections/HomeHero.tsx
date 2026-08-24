import { FullBleedScene } from "@/components/site/FullBleedScene";

/**
 * HomeHero · v6 (temp static during video re-shoot) · 2026-08-24
 *
 * Fell back to static family-band-intelligence still while the hero video
 * regenerates. Founder feedback on the first cut: Scene A should be a
 * crowd of thousands of visible faces (not 4 close-ups); Scene B should
 * be a much bigger modern bridge with a large crowd, only a few break
 * forward and cross (not people walking opposite directions).
 * Will swap back to FullBleedVideo when new shots land.
 */

export function HomeHero() {
  return (
    <FullBleedScene
      className="hero-fullbleed"
      scene={{ imageFamily: "band-intelligence", imageFamilyVariant: 1 }}
      scrim="bottom"
      vignetteStrength={0.5}
      chapter="I"
      chapterLabel="Where it starts"
      ariaLabelledby="hero-heading"
      priority
    >
      <div className="container hero-fullbleed__inner">
        <div className="hero-fullbleed__frame">
          <h1 id="hero-heading" className="hero-fullbleed__title">
            Remember who you are.
          </h1>
        </div>
      </div>
    </FullBleedScene>
  );
}
