import { FullBleedScene } from "@/components/site/FullBleedScene";
import { BRAND } from "@/content/brand";

/**
 * HomeHero · v7 · 2026-09-11 · cold-visitor deck-line added
 *
 * v6 (2026-08-24) fell back to static family-band-intelligence still while
 * the hero video regenerates. Founder feedback on the first cut: Scene A
 * should be a crowd of thousands of visible faces (not 4 close-ups); Scene B
 * should be a much bigger modern bridge with a large crowd, only a few break
 * forward and cross (not people walking opposite directions). Will swap
 * back to FullBleedVideo when new shots land.
 *
 * v7 (2026-09-11) adds BRAND.homeDeck as a hero deck line under the H1
 * manifesto. Cold-visitor problem: the H1 "Remember who you are." is brand
 * doctrine (byte-exact, protected) but explains nothing about what Nebbos
 * DOES. The deck sits under it (via existing .hero-fullbleed__deck class in
 * globals.css) and carries the run-layer product story sourced from
 * content/brand.ts. Chapter I / Where it starts eyebrow preserved.
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
          <h1 id="hero-heading" className="hero-fullbleed__title hero-fullbleed__title--manifesto">
            Remember who you are.
          </h1>
          <p className="hero-fullbleed__deck">{BRAND.homeDeck}</p>
        </div>
      </div>
    </FullBleedScene>
  );
}
