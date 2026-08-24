import { FullBleedScene } from "@/components/site/FullBleedScene";

/**
 * HomeHero · v4 · 2026-08-24
 *
 * Founder direction 2026-08-24: the hero is one line. No brand chip, no
 * deck, no CTA button, no aside. Just the manifesto. Palantir-tier
 * restraint — the image + the line + nothing else.
 *
 * Full-bleed family-band-intelligence scene. Chapter I metadata plate
 * top-right. The h1 is the whole hero, and it is the whole invitation.
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
