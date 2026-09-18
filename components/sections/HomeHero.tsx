import { FullBleedScene } from "@/components/site/FullBleedScene";
import { BRAND } from "@/content/brand";

/**
 * HomeHero · v8 · 2026-09-18 · category-claim H1 + manifesto ceremony eyebrow
 *
 * v7 (2026-09-11) put the founder-directed manifesto "Remember who you are."
 * in the H1 slot. On 2026-09-17 the ratified BRAND.taglineShort shifted to
 * "Infrastructure for AI operators." — a Stripe-shape categorical claim that
 * lets a CISO decode the category in five seconds. Per
 * docs/marketing/homepage-first-time-visitor-strategy-2026-09-17.md §5.1
 * the H1 IS BRAND.taglineShort verbatim.
 *
 * v8 (2026-09-18) reconciles both directives: H1 = taglineShort (category
 * claim, load-bearing for first-fold decode), manifesto = mono ceremony
 * line above the eyebrow (byte-exact string preserved, aesthetic emphasis
 * retained), deck = BRAND.homeDeck (proof/expansion of the H1 claim).
 * Chapter I / Where it starts eyebrow preserved.
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
          <p className="hero-fullbleed__manifesto" aria-hidden>Remember who you are.</p>
          <h1 id="hero-heading" className="hero-fullbleed__title">
            {BRAND.taglineShort}
          </h1>
          <p className="hero-fullbleed__deck">{BRAND.homeDeck}</p>
        </div>
      </div>
    </FullBleedScene>
  );
}
