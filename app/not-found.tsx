import { PlusMark } from "@/components/ui/PlusMark";
import { ButtonLink } from "@/components/ui/Button";

/**
 * app/not-found.tsx · Wave 3a · 404 page in delta-brief voice.
 *
 * Rendered by Next.js when no route matches. Same aesthetic as the home
 * hero: paper background, orange plus, big serif with italic-gold accent,
 * mono eyebrow. No "sad face" copy. Direct.
 */
export default function NotFound() {
  return (
    <section className="section-mono" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
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
            404 · Not found
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
          This signal didn&rsquo;t reach a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>page</em>.
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
          The URL you followed doesn&rsquo;t match any page on the site. It may
          have moved. Head back to the home page or jump into the platform.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <ButtonLink href="/" variant="primary">Back home</ButtonLink>
          <ButtonLink href="/platform" variant="ghost">Explore the platform</ButtonLink>
        </div>
      </div>
    </section>
  );
}
