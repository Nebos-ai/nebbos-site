import type { Metadata } from "next";
import tokens from "@/design/tokens.json";
import { PlusMark } from "@/components/ui/PlusMark";

export const metadata: Metadata = {
  title: "Design · Living style guide",
  description:
    "The design substrate of nebbos.ai — colors, type, motion, layout, signature devices. Rendered live from design/tokens.json.",
};

type TokenEntry = { value: string; description: string };
type SpringEntry = { stiffness: number; damping: number; mass?: number; description: string };
type DeviceEntry = { description: string };

const COLORS = tokens.color as Record<string, TokenEntry>;
const TYPE_FAMILY = tokens.type.family as Record<string, TokenEntry>;
const TYPE_SIZE = tokens.type.size as Record<string, TokenEntry>;
const MOTION_DUR = tokens.motion.duration as Record<string, TokenEntry>;
const MOTION_EASE = tokens.motion.easing as Record<string, TokenEntry>;
const MOTION_SPRING = tokens.motion.spring as Record<string, SpringEntry>;
const LAYOUT_CONT = tokens.layout.container as Record<string, TokenEntry>;
const LAYOUT_MEAS = tokens.layout.measure as Record<string, TokenEntry>;
const LAYOUT_SEC = tokens.layout.section as Record<string, TokenEntry>;
const LAYOUT_RAD = tokens.layout.radius as Record<string, TokenEntry>;
const DEVICES = tokens["signature-devices"] as Record<string, DeviceEntry>;

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
  margin: 0,
};

const sectionH2: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(28px, 3.2vw, 42px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  fontWeight: 400,
  color: "var(--ink)",
  margin: "16px 0 8px 0",
  maxWidth: "22ch",
  textWrap: "balance",
};

const sectionDeck: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  lineHeight: 1.5,
  color: "var(--ink-2)",
  margin: "0 0 32px 0",
  maxWidth: "56ch",
};

const cellCode: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--ink-3)",
};

const cellCodeStrong: React.CSSProperties = {
  ...cellCode,
  color: "var(--ink)",
};

function Section({
  n,
  label,
  title,
  deck,
  children,
}: {
  n: string;
  label: string;
  title: string;
  deck: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="section section--paper"
      style={{
        paddingBlock: "clamp(48px, 8vh, 96px)",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <p
          style={{
            ...eyebrow,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <PlusMark size="sm" />
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{n}</span>
          <span aria-hidden>&middot;</span>
          <span>{label}</span>
        </p>
        <h2 style={sectionH2}>{title}</h2>
        <p style={sectionDeck}>{deck}</p>
        {children}
      </div>
    </section>
  );
}

export default function DesignPage() {
  return (
    <>
      {/* Hero — paper, no full-bleed image (this page is meta, not editorial) */}
      <section
        className="section section--paper"
        style={{ paddingBlock: "clamp(80px, 14vh, 160px)" }}
      >
        <div className="container">
          <p
            style={{
              ...eyebrow,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <PlusMark size="sm" />
            <span style={{ fontVariantNumeric: "tabular-nums" }}>00</span>
            <span aria-hidden>&middot;</span>
            <span>Design substrate</span>
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.028em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "16px 0 20px 0",
              maxWidth: "22ch",
              textWrap: "balance",
            }}
          >
            The design substrate,{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: 400 }}>
              rendered live.
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
              margin: "0 0 24px 0",
              maxWidth: "56ch",
            }}
          >
            Every color, every type scale, every motion duration on nebbos.ai
            comes from <code style={cellCode}>design/tokens.json</code>. This
            page reads that file and renders it. What you see below is what the
            site uses &mdash; there is no second source of truth.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              margin: 0,
            }}
          >
            v{tokens.$version} &middot; updated {tokens.$updated}
          </p>
        </div>
      </section>

      <Section
        n="01"
        label="Color"
        title="Warm cream, warm ink, one gold, one orange."
        deck="Paper ground, ink foreground, a hairline rule that lands anywhere without shouting. Gold and orange do all the accent work &mdash; the deep gold reads institutional, the orange reads brand."
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {Object.entries(COLORS).map(([name, tok]) => (
            <li
              key={name}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: 16,
                border: "1px solid var(--rule)",
                background: "var(--paper-2)",
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 64,
                  height: 64,
                  flex: "0 0 64px",
                  background: tok.value,
                  border: "1px solid var(--rule)",
                }}
              />
              <div style={{ minWidth: 0 }}>
                <p style={{ ...cellCodeStrong, margin: 0 }}>--{name}</p>
                <p style={{ ...cellCode, margin: "4px 0 0 0" }}>{tok.value}</p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    lineHeight: 1.4,
                    color: "var(--ink-2)",
                    margin: "8px 0 0 0",
                  }}
                >
                  {tok.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        n="02"
        label="Type"
        title="Three families. Nine sizes."
        deck="A display serif for headings, a humanist sans for body, a mono for eyebrows and numerals. Sizes scale with clamp() &mdash; hero to micro."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div>
            <p style={{ ...eyebrow, marginBottom: 12 }}>Families</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {Object.entries(TYPE_FAMILY).map(([name, tok]) => (
                <li key={name} style={{ borderTop: "1px solid var(--rule-2)", paddingTop: 16 }}>
                  <p style={{ ...cellCodeStrong, margin: 0 }}>--font-{name}</p>
                  <p
                    style={{
                      fontFamily: `var(--font-${name}, ${tok.value})`,
                      fontSize: 28,
                      lineHeight: 1.15,
                      color: "var(--ink)",
                      margin: "8px 0",
                    }}
                  >
                    The quick brown fox jumps over the lazy dog.
                  </p>
                  <p style={{ ...cellCode, margin: 0 }}>{tok.value}</p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--ink-2)",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {tok.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ ...eyebrow, marginBottom: 12 }}>Sizes</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(TYPE_SIZE).map(([name, tok]) => (
                <li key={name} style={{ borderTop: "1px solid var(--rule-2)", paddingTop: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ ...cellCodeStrong, minWidth: "9ch" }}>--size-{name}</span>
                    <span style={{ ...cellCode }}>{tok.value}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        color: "var(--ink-2)",
                      }}
                    >
                      &middot; {tok.description}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: name === "eyebrow" || name === "micro" ? "var(--font-mono)" : "var(--font-serif)",
                      fontSize: tok.value,
                      lineHeight: 1.1,
                      color: "var(--ink)",
                      margin: "8px 0 0 0",
                    }}
                  >
                    Aa &middot; The design substrate.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        n="03"
        label="Motion"
        title="Five durations. Three easings. Three springs."
        deck="Motion is applied thinly. Every animation on the site picks its duration from this table &mdash; instant for micro-feedback, page for view transitions."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <div>
            <p style={{ ...eyebrow, marginBottom: 12 }}>Durations</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <tbody>
                {Object.entries(MOTION_DUR).map(([name, tok]) => (
                  <tr key={name} style={{ borderTop: "1px solid var(--rule-2)" }}>
                    <td style={{ ...cellCodeStrong, padding: "8px 12px 8px 0", verticalAlign: "top" }}>--dur-{name}</td>
                    <td style={{ ...cellCode, padding: "8px 12px 8px 0", verticalAlign: "top" }}>{tok.value}</td>
                    <td style={{ padding: "8px 0", color: "var(--ink-2)", fontFamily: "var(--font-sans)" }}>{tok.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p style={{ ...eyebrow, marginBottom: 12 }}>Easings</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <tbody>
                {Object.entries(MOTION_EASE).map(([name, tok]) => (
                  <tr key={name} style={{ borderTop: "1px solid var(--rule-2)" }}>
                    <td style={{ ...cellCodeStrong, padding: "8px 12px 8px 0", verticalAlign: "top", whiteSpace: "nowrap" }}>--ease-{name}</td>
                    <td style={{ ...cellCode, padding: "8px 12px 8px 0", verticalAlign: "top" }}>{tok.value}</td>
                    <td style={{ padding: "8px 0", color: "var(--ink-2)", fontFamily: "var(--font-sans)" }}>{tok.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p style={{ ...eyebrow, marginBottom: 12 }}>Springs (motion@13)</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <tbody>
                {Object.entries(MOTION_SPRING).map(([name, s]) => (
                  <tr key={name} style={{ borderTop: "1px solid var(--rule-2)" }}>
                    <td style={{ ...cellCodeStrong, padding: "8px 12px 8px 0", verticalAlign: "top" }}>{name}</td>
                    <td style={{ ...cellCode, padding: "8px 12px 8px 0", verticalAlign: "top" }}>
                      k={s.stiffness} d={s.damping}
                      {s.mass !== undefined ? ` m=${s.mass}` : ""}
                    </td>
                    <td style={{ padding: "8px 0", color: "var(--ink-2)", fontFamily: "var(--font-sans)" }}>{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section
        n="04"
        label="Layout"
        title="Containers, measures, section rhythm."
        deck="The site breathes on a 1240 max-width and 24px gutter. Prose wraps at 72ch, titles at 22ch. Section rhythm is 72px vertical, or 92vh for one-idea-per-viewport panels."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {[
            ["Container", LAYOUT_CONT],
            ["Measure", LAYOUT_MEAS],
            ["Section", LAYOUT_SEC],
            ["Radius", LAYOUT_RAD],
          ].map(([groupLabel, group]) => (
            <div key={groupLabel as string}>
              <p style={{ ...eyebrow, marginBottom: 12 }}>{groupLabel as string}</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <tbody>
                  {Object.entries(group as Record<string, TokenEntry>).map(([name, tok]) => (
                    <tr key={name} style={{ borderTop: "1px solid var(--rule-2)" }}>
                      <td style={{ ...cellCodeStrong, padding: "8px 12px 8px 0", verticalAlign: "top" }}>{name}</td>
                      <td style={{ ...cellCode, padding: "8px 12px 8px 0", verticalAlign: "top" }}>{tok.value}</td>
                      <td style={{ padding: "8px 0", color: "var(--ink-2)", fontFamily: "var(--font-sans)" }}>{tok.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Section>

      <Section
        n="05"
        label="Signature devices"
        title="Small marks that read as Nebbos."
        deck="A plus glyph, a cut corner, a numbered eyebrow, an italic-gold accent. Applied thinly, they compose into the register the site holds top-to-bottom."
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 20 }}>
          {Object.entries(DEVICES).map(([name, dev]) => (
            <li
              key={name}
              style={{
                borderTop: "1px solid var(--rule-2)",
                paddingTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <p style={{ ...cellCodeStrong, margin: 0 }}>{name}</p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  margin: 0,
                  maxWidth: "72ch",
                }}
              >
                {dev.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
