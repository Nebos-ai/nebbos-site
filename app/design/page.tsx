import { constructMetadata } from "@/lib/seo/constructMetadata";
import { PlusMark } from "@/components/ui/PlusMark";
import { ButtonLink } from "@/components/ui/Button";
import tokens from "@/design/tokens.json";

export const metadata = constructMetadata({
  title: "Design",
  description: "The delta-brief editorial system that ships every Nebbos surface. Tokens, primitives, patterns.",
  path: "/design",
});

export const dynamic = "force-static";
export const revalidate = false;

/**
 * /design · Wave 3d · living style guide.
 *
 * The design system as a marketing surface. Renders tokens/primitives/patterns
 * pulled from the same registry (`design/tokens.json`) that governs the site.
 * This IS the source of truth — not a screenshot of it.
 */

type ColorSwatch = { value: string; description: string };
type Colors = Record<string, ColorSwatch>;
const COLORS = tokens.color as unknown as Colors;

type MotionDur = Record<string, { value: string; description: string }>;
const DURATIONS = tokens.motion.duration as unknown as MotionDur;
const EASINGS = tokens.motion.easing as unknown as MotionDur;

export default function DesignPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="section-mono"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <PlusMark size="md" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Design system · v{tokens.$version}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "var(--ink)",
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            The <em style={{ fontStyle: "italic", color: "var(--gold)" }}>substrate</em> under every surface.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--ink-2)",
              maxWidth: "52ch",
              margin: 0,
            }}
          >
            Delta-brief editorial. Paper, orange, hairlines, one voice. This page
            is the living style guide — every value below is imported from{" "}
            <code style={{ background: "var(--paper-2)", padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: 14 }}>
              design/tokens.json
            </code>{" "}
            and rendered live.
          </p>
        </div>
      </section>

      {/* Color */}
      <SectionShell numeral="01" label="Color">
        <SectionHeadline>
          Warm paper, orange <em style={{ fontStyle: "italic", color: "var(--gold)" }}>signal</em>.
        </SectionHeadline>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 16,
            marginTop: 32,
          }}
        >
          {Object.entries(COLORS).map(([name, swatch]) => (
            <div
              key={name}
              style={{
                border: "1px solid var(--rule)",
                background: "var(--paper-2)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background: swatch.value,
                  height: 96,
                  borderBottom: "1px solid var(--rule)",
                }}
                aria-label={`${name} swatch`}
              />
              <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--gold)" }}>
                  --{name}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
                  {swatch.value}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.35, marginTop: 4 }}>
                  {swatch.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Type */}
      <SectionShell numeral="02" label="Type">
        <SectionHeadline>
          Three families. Deliberate <em style={{ fontStyle: "italic", color: "var(--gold)" }}>weight</em> contrast.
        </SectionHeadline>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 32 }}>
          <TypeSpec
            label="Display · Newsreader 500"
            style={{ fontFamily: "var(--font-serif)", fontSize: 72, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 500 }}
          >
            Aa · Build your <em style={{ fontStyle: "italic", color: "var(--gold)" }}>brain</em>
          </TypeSpec>
          <TypeSpec
            label="H2 · Newsreader 500"
            style={{ fontFamily: "var(--font-serif)", fontSize: 42, lineHeight: 1.08, letterSpacing: "-0.02em", fontWeight: 500 }}
          >
            One agent per department.
          </TypeSpec>
          <TypeSpec
            label="Body · Host Grotesk 400"
            style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.55, color: "var(--ink-2)" }}
          >
            Nebbos reads the signal your work already emits — decisions, handoffs, deadlines — and shows you what breaks next.
          </TypeSpec>
          <TypeSpec
            label="Mono · JetBrains Mono 500 · eyebrows and numerals"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}
          >
            + 01 · Section eyebrow
          </TypeSpec>
        </div>
      </SectionShell>

      {/* PlusMark sizes */}
      <SectionShell numeral="03" label="Signature devices · PlusMark">
        <SectionHeadline>
          One glyph, five voices, <em style={{ fontStyle: "italic", color: "var(--gold)" }}>everywhere</em>.
        </SectionHeadline>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 40, marginTop: 32, flexWrap: "wrap" }}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <PlusMark size={size} />
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)" }}>
                {size}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* Motion */}
      <SectionShell numeral="04" label="Motion">
        <SectionHeadline>
          Duration, easing, <em style={{ fontStyle: "italic", color: "var(--gold)" }}>spring</em>.
        </SectionHeadline>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 32,
          }}
        >
          {Object.entries(DURATIONS).map(([name, tok]) => (
            <TokenCard key={name} name={`--dur-${name}`} value={tok.value} desc={tok.description} />
          ))}
          {Object.entries(EASINGS).map(([name, tok]) => (
            <TokenCard key={name} name={`--ease-${name}`} value={tok.value} desc={tok.description} />
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--ink-3)", marginTop: 24, maxWidth: "60ch" }}>
          Spring physics via motion@13 for graph node force-jitter and hover feedback.
          CSS transitions everywhere else. Reduced-motion honored on every surface.
        </p>
      </SectionShell>

      {/* Primitives */}
      <SectionShell numeral="05" label="Primitives">
        <SectionHeadline>Buttons, cards, hairlines.</SectionHeadline>
        <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 32 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ButtonLink href="/design#" variant="primary">Primary</ButtonLink>
            <ButtonLink href="/design#" variant="ghost">Ghost</ButtonLink>
          </div>
          <div
            className="cut-corner"
            style={{ maxWidth: 480 }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>
              Cut-corner card
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.012em", marginBottom: 8 }}>
              Single top-right cut.
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5 }}>
              Radius asymmetry is the signature. Hairline-lift on hover — no drop-shadow.
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Footer */}
      <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <PlusMark size="sm" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
              Source of truth · design/tokens.json
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-2)", maxWidth: "60ch", margin: 0 }}>
            This page renders live from the token registry. Change a value there
            and it changes here — and everywhere else on the site — on the next
            deploy.
          </p>
        </div>
      </section>
    </>
  );
}

/* ── helpers ────────────────────────────────────────────────────────── */
function SectionShell({ numeral, label, children }: { numeral: string; label: string; children: React.ReactNode }) {
  return (
    <section style={{ padding: "72px 0", borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <PlusMark size="sm" color="currentColor" />
          <span
            className="section-numeral"
            style={{ background: "transparent", padding: 0, gap: 8 }}
          >
            <span className="n">{numeral}</span>
            <span aria-hidden>·</span>
            {label}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}

function SectionHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(28px, 3.2vw, 42px)",
        lineHeight: 1.08,
        letterSpacing: "-0.02em",
        fontWeight: 500,
        color: "var(--ink)",
        margin: "8px 0 0",
        maxWidth: "22ch",
      }}
    >
      {children}
    </h2>
  );
}

function TypeSpec({ label, style, children }: { label: string; style: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: "1px solid var(--rule-2)", paddingTop: 14 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", color: "var(--ink-3)", marginBottom: 12, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={style}>{children}</div>
    </div>
  );
}

function TokenCard({ name, value, desc }: { name: string; value: string; desc: string }) {
  return (
    <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--gold)" }}>
        {name}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
        {value}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.35 }}>
        {desc}
      </div>
    </div>
  );
}
