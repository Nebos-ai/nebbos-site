import { FullBleedScene } from "@/components/site/FullBleedScene";
import { BRAND } from "@/content/brand";

/**
 * HomeHero · v3 · 2026-08-24 (C15 refactor)
 *
 * The first three seconds of nebbos.ai. Full-bleed family-band-intelligence
 * scene, overlaid with the flagship headline: "The company brain your team
 * never had time to build." Chapter I metadata plate top-right. Composes
 * FullBleedScene primitive so image + overlay + chapter plate + section
 * chrome share the same discipline as every other scene surface on the site.
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
          <span className="hero-fullbleed__brand">{BRAND.name}</span>
          <h1 id="hero-heading" className="hero-fullbleed__title">
            The company brain your team{" "}
            <em className="hero-fullbleed__accent">never had time to build.</em>
          </h1>
          <p className="hero-fullbleed__deck">
            One Pearl per department. Every human decision your team makes trains
            your model, not someone else&rsquo;s. Portable to you if you ever leave.
          </p>
        </div>
      </div>
    </FullBleedScene>
  );
}
