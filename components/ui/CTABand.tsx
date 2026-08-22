import type { ReactNode } from "react";
import { ButtonLink } from "./Button";

type CTAAction = {
  label: string;
  href: string;
  external?: boolean;
};

type CTABandProps = {
  headline: ReactNode;
  deck?: ReactNode;
  primary: CTAAction;
  secondary?: CTAAction;
  size?: "xl" | "lg";
};

/**
 * Closing band — Delta brief editorial. Cut-corner emphasis surface
 * (paper-2 fill, 30px top-right radius, hairline border). Serif headline,
 * Host Grotesk deck, editorial CTA row.
 */
export function CTABand({
  headline,
  deck,
  primary,
  secondary,
  size = "xl",
}: CTABandProps) {
  const padding = size === "xl" ? "120px 0 128px" : "80px 0 88px";
  return (
    <section
      style={{
        padding,
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <div className="cut-corner" style={{ padding: "40px 44px 44px" }}>
          <div
            className="plus-marker"
            style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(30px, 3.4vw, 46px)",
                lineHeight: 1.06,
                letterSpacing: "-0.022em",
                fontWeight: 500,
                color: "var(--ink)",
                margin: 0,
                maxWidth: "20ch",
                textWrap: "balance",
                fontOpticalSizing: "auto",
              }}
            >
              {headline}
            </h2>
            {deck ? (
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  maxWidth: "44ch",
                }}
              >
                {deck}
              </p>
            ) : null}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
              <ButtonLink href={primary.href} variant="primary" external={primary.external}>
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="ghost" external={secondary.external}>
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
