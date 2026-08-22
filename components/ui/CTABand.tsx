import type { ReactNode } from "react";
import { ButtonLink } from "./Button";

type CTAAction = {
  label: string;
  href: string;
  external?: boolean;
};

type CTABandProps = {
  /** The one-line headline for the closing band. Apple-shaped, 6-10 words. */
  headline: ReactNode;
  /** Optional supporting line under the headline. */
  deck?: ReactNode;
  /** Primary CTA (usually "Book a demo →" or "Start building →"). */
  primary: CTAAction;
  /** Optional secondary CTA (usually "See how it works" or "Read the doctrine"). */
  secondary?: CTAAction;
  /** Vertical rhythm. `xl` = page-closing, `lg` = section-closing. */
  size?: "xl" | "lg";
};

/**
 * The closing band that currently appears hand-built on 15+ pages
 * ("See what your operations are about to do." + demo button). Now one
 * primitive. Rebuild uses this as the page-footer band above the site
 * footer on every marketing page.
 */
export function CTABand({ headline, deck, primary, secondary, size = "xl" }: CTABandProps) {
  const padding = size === "xl" ? "120px 0 128px" : "80px 0 88px";
  return (
    <section
      style={{
        padding,
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
        <h2
          style={{
            fontFamily: "var(--font-dm-sans), var(--font-sans)",
            fontSize: "clamp(30px, 3.4vw, 46px)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: "var(--paper)",
            margin: 0,
            maxWidth: "20ch",
            textWrap: "balance",
          }}
        >
          {headline}
        </h2>
        {deck ? (
          <p
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.5,
              color: "var(--mist)",
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
    </section>
  );
}
