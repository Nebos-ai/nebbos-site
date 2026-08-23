import Link from "next/link";
import { productTree } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";

/**
 * HomeBands · v2 rebuild 2026-08-23
 *
 * The site's IA made visible on the front door: five bands (Substrate ·
 * Boundary · Intelligence · Agent · Commerce), three layers each = fifteen
 * pages. Founder directive: "our menu items should be these 15 pages with
 * the five groups on the home page with the 3 in each."
 *
 * Layout · 5 cards in a wrapped grid (5 across on wide, 3+2 on mid, 1
 * across on mobile). Each card: band number + name + strap + 3 layer
 * numerals + name as chip list, plus a "See the band →" hairline link.
 */
export function HomeBands() {
  return (
    <section
      aria-labelledby="bands-heading"
      style={{
        background: "var(--paper)",
        paddingBlock: "var(--section-y-lg)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "68ch", marginBottom: "clamp(48px, 6vh, 72px)" }}>
          <SectionNumeral n="02" label="The system" />
          <h2
            id="bands-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "20px 0 0 0",
              maxWidth: "24ch",
              textWrap: "balance",
            }}
          >
            What&rsquo;s underneath{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              every agent
            </em>{" "}
            you run.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              maxWidth: "58ch",
              marginTop: 20,
            }}
          >
            Fifteen governance layers, grouped as five bands. The data your
            company knows. The boundaries the world crosses at. The way the
            system reasons across providers. The agents that act, and the
            humans who approve them. The commerce that keeps it running.
            Ship an agent, all fifteen apply.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 24,
          }}
          className="bands-grid"
        >
          {productTree.map(({ band, href, layers }) => (
            <Link
              key={band.n}
              href={href}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: 24,
                border: "1px solid var(--rule)",
                background: "var(--paper)",
                textDecoration: "none",
                color: "inherit",
                transition:
                  "background var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out), transform var(--dur-med) var(--ease-out)",
                minHeight: 280,
                justifyContent: "space-between",
              }}
              className="band-card"
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: 12,
                  }}
                >
                  Band {String(band.n).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(20px, 1.8vw, 26px)",
                    fontWeight: 500,
                    color: "var(--ink)",
                    letterSpacing: "-0.014em",
                    marginBottom: 10,
                    lineHeight: 1.1,
                  }}
                >
                  {band.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "var(--ink-2)",
                  }}
                >
                  {band.strap}
                </div>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  borderTop: "1px solid var(--rule-2)",
                  paddingTop: 16,
                }}
              >
                {layers.map(({ layer }) => (
                  <li
                    key={layer.n}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--ink-2)",
                      paddingBlock: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--ink-3)",
                        minWidth: 18,
                      }}
                    >
                      {String(layer.n).padStart(2, "0")}
                    </span>
                    <span style={{ fontWeight: 500 }}>{layer.name}</span>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginTop: 4,
                }}
              >
                See the band <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .band-card:hover {
          background: var(--paper-2);
          border-color: var(--ink-3);
        }
        @media (max-width: 1200px) {
          .bands-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 900px) {
          .bands-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 600px) {
          .bands-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
