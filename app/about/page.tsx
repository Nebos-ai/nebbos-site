import type { Metadata } from "next";
import { BRAND } from "@/content/brand";
import { FACTS } from "@/content/facts";
import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { SceneStill } from "@/components/ui/SceneStill";
import { SceneOverlay, SceneMetadataPlate } from "@/components/ui/SceneOverlay";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: `${BRAND.name} — ${FACTS.category}. Founded ${FACTS.foundingYear} · ${FACTS.jurisdiction}.`,
};

export default function AboutPage() {
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
            <SectionNumeral n="00" label="About" />
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(40px, 5.6vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: "-0.024em",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "24ch",
                textWrap: "balance",
              }}
            >
              Built to be the{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
                company brain
              </em>{" "}
              your enterprise never had time to build.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(19px, 1.7vw, 23px)",
                lineHeight: 1.5,
                color: "var(--ink-2)",
                margin: "24px 0 0 0",
                maxWidth: "58ch",
              }}
            >
              {BRAND.descriptionLong}
            </p>
          </div>
        </div>
      </section>

      {/* Facts */}
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
            className="about-grid"
          >
            <div>
              <SectionNumeral n="01" label="Facts" />
              <dl
                style={{
                  marginTop: 20,
                  display: "grid",
                  gap: 0,
                }}
              >
                {[
                  ["Founded", String(FACTS.foundingYear)],
                  ["Category", FACTS.category],
                  ["Legal entity", BRAND.legalEntity],
                  ["Jurisdiction", FACTS.jurisdiction],
                  ["Team shape", FACTS.teamShape],
                ].map(([label, value], i) => (
                  <div
                    key={label}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                      borderBottom: "1px solid var(--rule)",
                      paddingBlock: 18,
                      display: "grid",
                      gridTemplateColumns: "180px minmax(0, 1fr)",
                      gap: 20,
                      alignItems: "baseline",
                    }}
                  >
                    <dt className="eyebrow" style={{ color: "var(--ink-3)" }}>{label}</dt>
                    <dd
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif)",
                        fontSize: 18,
                        color: "var(--ink)",
                      }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <SectionNumeral n="02" label="Product line" />
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {FACTS.productLine.map((item, i) => (
                  <li
                    key={item}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                      borderBottom: "1px solid var(--rule)",
                      paddingBlock: 18,
                      fontFamily: "var(--font-serif)",
                      fontSize: 18,
                      color: "var(--ink)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section
        style={{
          background: "var(--paper)",
          paddingBlock: "var(--section-y-lg)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "68ch" }}>
            <SectionNumeral n="03" label="Compliance" />
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.55,
                color: "var(--ink)",
                margin: "20px 0 0 0",
                maxWidth: "60ch",
              }}
            >
              {FACTS.complianceStance}
            </p>
          </div>
        </div>
      </section>

      {/* Scene · NYC full-bleed anchor */}
      <section
        style={{
          position: "relative",
          minHeight: "min(70vh, 720px)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <SceneStill perspective={4} pVariant={1} shape="fullBleed" />
        <SceneOverlay scrim="bottom" />
        <SceneMetadataPlate chapter="IV" label="Where we&rsquo;re going" position="top-right" />
        <div className="container" style={{ position: "relative", zIndex: 2, paddingBlock: "clamp(48px, 8vh, 96px)" }}>
          <div style={{ maxWidth: "48ch", display: "flex", flexDirection: "column", gap: 24 }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.022em",
                fontWeight: 400,
                color: "var(--paper)",
                margin: 0,
                maxWidth: "22ch",
                textWrap: "balance",
                textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
              }}
            >
              An{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: 400 }}>
                institution
              </em>{" "}
              that watches the work.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(17px, 1.5vw, 20px)",
                lineHeight: 1.55,
                color: "rgba(244, 241, 234, 0.9)",
                margin: 0,
                maxWidth: "48ch",
                textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
              }}
            >
              Nebbos is a substrate. Fifteen layers, five bands, one system.
              Owned by the enterprise that runs it, portable to the models it
              trusts, quiet enough that the humans it serves get their
              mornings, mid-mornings, and evenings back.
            </p>
            <div>
              <Button href="/product" variant="solid-light" size="lg">See the system</Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}
