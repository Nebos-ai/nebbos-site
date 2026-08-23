import Link from "next/link";
import { productTree } from "@/lib/nav";
import { SectionNumeral } from "@/components/ui/SectionNumeral";

/**
 * HomeBands · magazine table-of-contents 2026-08-23 rewrite
 *
 * Founder direction: tiles must feel like Kinfolk masthead / Loro Piana
 * catalog / Rolex product page. Chrome-less. No borders. Structure via
 * hairline gold horizontal rules + vertical whitespace + hairline vertical
 * dividers between columns. Roman numerals as anchors.
 *
 * Layout · five bands as five columns, separated by hairline vertical rules.
 * Each column: Roman numeral top → serif band name → italic strap → hairline
 * gold rule → numbered layer list → "See the band" as mono footer link.
 * Hover = title shifts to gold. No card background, no border box, no shadow.
 */

const BAND_ROMANS = ["", "I", "II", "III", "IV", "V"];

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
        {/* Section header */}
        <div style={{ maxWidth: "68ch", marginBottom: "clamp(56px, 8vh, 96px)" }}>
          <SectionNumeral n="02" label="The architecture" />
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
              maxWidth: "26ch",
              textWrap: "balance",
            }}
          >
            What&rsquo;s underneath{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              every Pearl
            </em>{" "}
            you deploy.
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
            Fifteen governance layers, grouped as five bands. Data at the bottom.
            Boundaries the world crosses at. Reasoning across providers. Action
            and the humans who approve it. Commerce at the top.
          </p>
        </div>
      </div>

      {/* Magazine grid — full-width, hairline vertical dividers between columns */}
      <div
        className="container-wide bands-toc"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          borderTop: "1px solid var(--rule)",
        }}
      >
        {productTree.map(({ band, href, layers }, i) => (
          <Link
            key={band.n}
            href={href}
            style={{
              padding: "clamp(32px, 4vh, 48px) clamp(20px, 2.5vw, 32px)",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              borderRight: i < productTree.length - 1 ? "1px solid var(--rule)" : "none",
              transition: "background var(--dur-med) var(--ease-out)",
              minHeight: 340,
            }}
            className="band-toc-cell"
          >
            {/* Roman numeral anchor */}
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--accent-2)",
                letterSpacing: "0.02em",
              }}
            >
              {BAND_ROMANS[band.n]}
            </div>

            {/* Band name */}
            <div
              className="band-name"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(24px, 2vw, 30px)",
                fontWeight: 400,
                color: "var(--ink)",
                letterSpacing: "-0.014em",
                lineHeight: 1.06,
                transition: "color var(--dur-fast) var(--ease-out)",
              }}
            >
              {band.name}
            </div>

            {/* Italic strap */}
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                maxWidth: "22ch",
              }}
            >
              {band.strap}
            </div>

            {/* Hairline gold rule */}
            <div
              aria-hidden
              style={{
                width: 32,
                height: 1,
                background: "var(--accent-2)",
                marginBlock: 8,
              }}
            />

            {/* Layer list — mono numeral + serif name */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              {layers.map(({ layer }) => (
                <li
                  key={layer.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px minmax(0, 1fr)",
                    gap: 10,
                    alignItems: "baseline",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--ink-3)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {String(layer.n).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 15,
                      color: "var(--ink-2)",
                      lineHeight: 1.35,
                    }}
                  >
                    {layer.name}
                  </span>
                </li>
              ))}
            </ul>

            {/* Footer link · mono, tiny */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginTop: 8,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              See the band <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .band-toc-cell:hover .band-name { color: var(--gold) !important; }
        @media (max-width: 1100px) {
          .bands-toc {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .bands-toc > a {
            border-right: 1px solid var(--rule) !important;
            border-bottom: 1px solid var(--rule) !important;
          }
          .bands-toc > a:nth-child(3n) { border-right: none !important; }
        }
        @media (max-width: 720px) {
          .bands-toc {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .bands-toc > a {
            border-right: none !important;
            border-bottom: 1px solid var(--rule) !important;
          }
          .bands-toc > a:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}
