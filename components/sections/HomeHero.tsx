import { BRAND } from "@/content/brand";

/**
 * FRAME · Home / 00 · Hero
 * PARENT · app/page.tsx (/)
 * PURPOSE · The first three seconds. One declarative sentence in serif.
 *           No deck. No CTA above the fold. Silence does the rest.
 *
 * Voice · Institutional Reserve (v1 · 2026-08-23)
 *   Kill the sales-verb "Build your company's brain."
 *   Replace with a definite-article, no-verb, category-defining STATEMENT:
 *     "An institutional substrate for enterprise AI agents."
 *   No "you", no imperative, no CTA prompt. Reads as fact, not sale.
 *
 * Look · Institutional Reserve (v1 · 2026-08-23)
 *   Serif at hero scale — Newsreader 500, no bold.
 *   Cream paper, dead flat, zero atmosphere gradient.
 *   Hero lives at ~70vh not 100vh — lets the next section peek.
 *   One small mono eyebrow above — the brand name, dot-separated.
 *   Air below the title carries the composition.
 */
export function HomeHero() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(64px, 8vh, 128px) 0 clamp(48px, 6vh, 96px)",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "68ch", display: "flex", flexDirection: "column", gap: 32 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {BRAND.name}
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 1.04,
              letterSpacing: "-0.024em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            An <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>institutional</em> substrate for enterprise AI agents.
          </h1>
        </div>
      </div>
    </section>
  );
}
