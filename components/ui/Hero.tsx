import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Display } from "./Display";
import { Deck } from "./Deck";

type HeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  deck?: ReactNode;
  children?: ReactNode;
  size?: "xl" | "lg" | "md";
  /**
   * Doctrine v2 §5 Wave 2 · optional visual slot for a signature diagram,
   * screenshot, or media surface adjacent to the text. When present, layout
   * switches to a 2-column grid on ≥900px viewports (text left, visual
   * right); collapses to stacked single-column below.
   */
  visual?: ReactNode;
};

/**
 * Marketing hero — Delta brief editorial cadence.
 *
 * Paper background inherits from body; big serif Display headline; muted
 * Host Grotesk Deck; CTA row below. Editorial gutters (no hard cards,
 * no glow, no gradient). The signature orange plus-marker sits at the
 * top-left via `.plus-marker` on the section wrapper.
 *
 * With `visual` set, the hero occupies a 2-col grid on large viewports —
 * text takes ~55% of width, visual ~40%, with editorial gap.
 */
export function Hero({ eyebrow, title, deck, children, size = "xl", visual }: HeroProps) {
  // Wave 3g mobile pass: `clamp()` scales padding fluidly from mobile floor to
  // desktop ceiling, so a 375px phone doesn't waste 128px above the fold.
  const paddingBySize: Record<NonNullable<HeroProps["size"]>, string> = {
    xl: "clamp(64px, 10vh, 128px) 0 clamp(48px, 8vh, 88px)",
    lg: "clamp(48px, 8vh, 88px) 0 clamp(36px, 6vh, 64px)",
    md: "clamp(36px, 6vh, 64px) 0 clamp(28px, 5vh, 48px)",
  };
  const padding = paddingBySize[size];
  const displaySize = size;
  const gap = { xl: 28, lg: 22, md: 18 }[size];

  const textCol = (
    <div
      className="plus-marker plus-marker--animated"
      style={{ display: "flex", flexDirection: "column", gap }}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Display size={displaySize}>{title}</Display>
      {deck ? <Deck size="lead">{deck}</Deck> : null}
      {children ? (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );

  return (
    <section style={{ padding }}>
      <div className="container">
        {visual ? (
          // Wave 3g mobile pass: `hero-grid` gets a mobile stacking rule in
          // globals.css so <900px collapses to single-column with a gap that
          // reads correctly on a phone.
          <div className="hero-grid hero-grid--with-visual">
            {textCol}
            <div style={{ minWidth: 0 }}>{visual}</div>
          </div>
        ) : (
          textCol
        )}
      </div>
    </section>
  );
}
