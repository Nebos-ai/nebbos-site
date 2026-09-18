import { FullBleedScene } from "@/components/site/FullBleedScene";
import { Button } from "@/components/primitives/Button";
import { BRAND } from "@/content/brand";

/**
 * HomeHero · v9 · 2026-09-18 · in-fold CTAs + category-claim H1
 *
 * v8 shipped the ratified BRAND.taglineShort as H1 + manifesto ceremony line
 * but had NO CTAs in the hero fold — a first-time visitor could not take
 * action from the first viewport without scrolling. Founder-directed
 * 2026-09-18 after live-site audit surfaced the empty-CTA defect.
 *
 * v9 adds two hero-fold CTAs on the ratified 2026-09-17 discipline:
 *   - Primary: Book a demo → /demo (matches homepage-first-time-visitor-
 *     strategy §5.1 primary CTA "Request briefing", but landing on /demo
 *     which is the ratified booking surface today; the label stays "Book
 *     a demo" for consistency with every other page's primary CTA)
 *   - Secondary: See the products → /products (spec-read path for the
 *     Persona-E evaluator who wants to browse before booking)
 *
 * Manifesto ceremony line + H1 + deck unchanged from v8.
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
          <div className="hero-fullbleed__ctas">
            <Button variant="primary" tone="onDark" href="/demo">Book a demo</Button>
            <Button variant="ghost" tone="onDark" href="/products">See the products</Button>
          </div>
        </div>
      </div>
    </FullBleedScene>
  );
}
