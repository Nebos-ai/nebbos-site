import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/ui/Button";

/**
 * HomeCTA · v3 · 2026-08-24 (C15 refactor)
 *
 * The closing band. Full-bleed concept-tenant-onboarding scene — the customer
 * moment, the natural next-step after walking the site. Chapter VII metadata
 * plate top-right; the narrative arc opened at HomeHero (Chapter I) closes
 * here. Composes FullBleedScene primitive.
 */

export function HomeCTA() {
  return (
    <FullBleedScene
      className="cta-fullbleed"
      scene={{ imageFamily: "concept-tenant-onboarding", imageFamilyVariant: 1 }}
      scrim="left"
      vignetteStrength={0.5}
      chapter="VII"
      chapterLabel="Where you take it next"
      ariaLabelledby="cta-heading"
    >
      <div className="container cta-fullbleed__inner">
        <div className="cta-fullbleed__frame">
          <h2 id="cta-heading" className="cta-fullbleed__title">
            Put a Pearl on your{" "}
            <em className="cta-fullbleed__accent">hardest</em>{" "}
            department.
          </h2>
          <p className="cta-fullbleed__deck">
            Live in days, not quarters. Owned by you, portable to you,
            compounding every quarter.
          </p>
          <div className="cta-fullbleed__actions">
            <Button href="/demo" variant="solid-light" size="lg">
              Book a demo
            </Button>
            <Button href="/product" variant="ghost-light" size="lg" arrow={false}>
              See the system
            </Button>
          </div>
        </div>
      </div>
    </FullBleedScene>
  );
}
