import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/ui/Button";

/**
 * HomeCTA · v3 · 2026-08-24 (C15 refactor)
 *
 * The closing band. Full-bleed concept-operator-onboarding scene — the
 * customer moment, the natural next-step after walking the site. Chapter VII
 * metadata plate top-right; the narrative arc opened at HomeHero (Chapter I)
 * closes here. Composes FullBleedScene primitive.
 *
 * v3.1 (2026-09-15, Axis A Wave 2): scene family renamed to concept-operator-
 * onboarding per feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_
 * security_2026_09_14 banned-term list (see scripts/check-vocab.sh for the
 * enforced pattern set). "Operator" is the ratified customer role per
 * feedback_operator_and_pearl_shape_doctrine_8.
 */

export function HomeCTA() {
  return (
    <FullBleedScene
      className="cta-fullbleed"
      scene={{ imageFamily: "concept-operator-onboarding", imageFamilyVariant: 1 }}
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
            domain.
          </h2>
          <p className="cta-fullbleed__deck">
            Live in days, not quarters. Owned by you, portable to you,
            compounding every quarter.
          </p>
          <div className="cta-fullbleed__actions">
            <Button href="/demo" variant="solid-light" size="lg">
              Remember who you are
            </Button>
            <Button href="/products" variant="ghost-light" size="lg" arrow={false}>
              See the products
            </Button>
          </div>
        </div>
      </div>
    </FullBleedScene>
  );
}
