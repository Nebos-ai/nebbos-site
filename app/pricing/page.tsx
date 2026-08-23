import type { Metadata } from "next";
import { PRICING } from "@/content/pricing";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${PRICING.perUserFull}. ${PRICING.minimumWord}-user minimum. ${PRICING.cadenceAndDiscountPhrase}`,
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "var(--paper)",
          borderBottom: "1px solid var(--rule)",
          paddingBlock: "clamp(96px, 14vh, 176px) clamp(64px, 8vh, 96px)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="00" label="Pricing" />
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 5.6vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "20ch",
                textWrap: "balance",
              }}
            >
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                {PRICING.perUser}
              </em>{" "}
              a seat. Every layer.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.4,
                color: "var(--ink-2)",
                margin: "24px 0 0 0",
                maxWidth: "50ch",
              }}
            >
              {PRICING.minimumWord}-seat minimum. {PRICING.cadenceAndDiscountPhrase} No per-agent surcharge, no per-department upsell.
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section
        style={{
          background: "var(--paper-2)",
          paddingBlock: "var(--section-y-lg)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "clamp(32px, 6vw, 88px)",
              alignItems: "start",
            }}
            className="pricing-grid"
          >
            <div>
              <SectionNumeral n="01" label="What's included" />
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                  color: "var(--ink)",
                  margin: "20px 0 20px 0",
                  maxWidth: "22ch",
                  textWrap: "balance",
                }}
              >
                {PRICING.includedPhrase}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  margin: 0,
                  maxWidth: "48ch",
                }}
              >
                Every layer of the substrate. Every band. Every capability the
                fifteen layers provide. Same price whether you use one department
                or twelve.
              </p>
            </div>

            <div>
              <SectionNumeral n="02" label="Priced separately" />
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {PRICING.separatelyPriced.map((item, i) => (
                  <li
                    key={item}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                      borderBottom: "1px solid var(--rule)",
                      paddingBlock: 18,
                      display: "grid",
                      gridTemplateColumns: "auto minmax(0, 1fr)",
                      gap: 20,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="eyebrow"
                      style={{ color: "var(--ink-3)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: 20,
                        color: "var(--ink)",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Overage */}
      <section
        style={{
          background: "var(--paper)",
          paddingBlock: "var(--section-y-lg)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="03" label="AI-usage overage" />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.2vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 20px 0",
                maxWidth: "24ch",
                textWrap: "balance",
              }}
            >
              Overage bills in{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                {PRICING.overageCurrency}
              </em>.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
                maxWidth: "56ch",
              }}
            >
              {PRICING.overageExplainer}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "var(--paper-2)",
          paddingBlock: "clamp(64px, 9vh, 128px)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 3vw, 34px)",
              color: "var(--ink)",
              margin: "0 auto 28px",
              maxWidth: "34ch",
              textWrap: "balance",
            }}
          >
            Ready to price a Pearl for your hardest department?
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Button href="/demo" size="lg">Book a demo</Button>
            <Button href="/contact" variant="ghost" size="lg" arrow={false}>Ask a question</Button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .pricing-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
