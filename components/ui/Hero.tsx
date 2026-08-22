import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Display } from "./Display";
import { Deck } from "./Deck";

type HeroProps = {
  /** Micro-label above the display headline. */
  eyebrow?: ReactNode;
  /** Display headline. Can contain `<br/>` for intentional line breaks. */
  title: ReactNode;
  /** One-line deck under the headline. Optional; if omitted the hero reads as a pure headline. */
  deck?: ReactNode;
  /** CTA row and other action controls below the deck. */
  children?: ReactNode;
  /**
   * Vertical rhythm. `xl` = home page (full breath), `lg` = interior page hero,
   * `md` = compact section header inside a longer page.
   */
  size?: "xl" | "lg" | "md";
  /** Optional slot for a hero visual on the right side of the display (rare — home only). */
  media?: ReactNode;
};

/**
 * The rebuild-2026 hero. Typography-only by default. No blue radial glow, no
 * decorative gradient — Palantir does not glow.
 *
 * When `media` is provided the hero switches to a 2-column layout on
 * ≥ 960px viewports; below that the media stacks under the text.
 *
 * Replaces the legacy `<PageHero>` primitive with its hard-coded 480px glow
 * and single-column layout. Every marketing page rebuild uses this instead.
 */
export function Hero({ eyebrow, title, deck, children, size = "lg", media }: HeroProps) {
  const padding = { xl: "120px 0 80px", lg: "80px 0 60px", md: "56px 0 40px" }[size];
  const displaySize = { xl: "xl", lg: "lg", md: "md" }[size] as "xl" | "lg" | "md";
  const gap = { xl: 32, lg: 24, md: 20 }[size];

  const textCol = (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Display size={displaySize}>{title}</Display>
      {deck ? <Deck size="lead">{deck}</Deck> : null}
      {children ? (
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          {children}
        </div>
      ) : null}
    </div>
  );

  return (
    <section style={{ padding }}>
      <div className="container">
        {media ? (
          <div className="hero-split" style={{ display: "grid", gap: 48, alignItems: "center" }}>
            {textCol}
            <div>{media}</div>
          </div>
        ) : (
          textCol
        )}
      </div>
    </section>
  );
}
