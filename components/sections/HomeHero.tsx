import { ButtonLink } from "@/components/ui/Button";
import { Hero } from "@/components/ui/Hero";
import { BRAND } from "@/content/brand";

/**
 * FRAME · Home / Hero
 * PARENT · app/page.tsx (/)
 * PURPOSE · The first thing a visitor sees. Wordmark eyebrow, italic-gold
 *           accent H1 ("brain"), one-line deck under the title, one CTA.
 */
export function HomeHero() {
  return (
    <Hero
      size="xl"
      eyebrow={BRAND.name}
      title={
        <>
          Build your company&rsquo;s
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>brain</em>.
        </>
      }
      deck={BRAND.homeDeck}
    >
      <ButtonLink href="/demo" variant="primary">
        Book a demo
      </ButtonLink>
    </Hero>
  );
}
