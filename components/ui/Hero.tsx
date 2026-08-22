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
};

/**
 * Marketing hero — Delta brief editorial cadence.
 *
 * Paper background inherits from body; big serif Display headline; muted
 * Host Grotesk Deck; CTA row below. Editorial gutters (no hard cards,
 * no glow, no gradient). The signature orange plus-marker sits at the
 * top-left via `.plus-marker` on the section wrapper.
 */
export function Hero({ eyebrow, title, deck, children, size = "xl" }: HeroProps) {
  const padding = { xl: "128px 0 88px", lg: "88px 0 64px", md: "64px 0 48px" }[size];
  const displaySize = size;
  const gap = { xl: 28, lg: 22, md: 18 }[size];

  return (
    <section style={{ padding }}>
      <div className="container">
        <div
          className="plus-marker"
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
      </div>
    </section>
  );
}
