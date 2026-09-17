import Link from "next/link";
import { SceneStill } from "@/components/ui/SceneStill";

/**
 * ProductTile · Apple-style product-catalog tile · 2026-09-16
 *
 * Shape mirrors apple.com's home-page tile pattern (curl-confirmed
 * 2026-09-16 against https://www.apple.com):
 *   - Full-bleed product image
 *   - Product name as prominent tile-headline (sans, medium weight)
 *   - One-line tagline (smaller sans, muted)
 *   - Two CTAs stacked / inline: "Learn more" (deep) + "Get in touch" (buy)
 *
 * Retires the editorial magazine-spread pattern of HomeHero + Home*Band
 * (long prose paragraphs, chapter numerals, italic-gold accents) that
 * had made the site read as document not product. Institutional Reserve
 * doctrine amended 2026-09-16: home page adopts product-catalog register
 * per founder direction ("https://www.apple.com this is a product site
 * what we have is not").
 *
 * Copy props kept minimal on purpose — no editorial paragraphs. If a
 * tile needs more than a one-line tagline, that content belongs on the
 * product's own deep-dive page (/products/{key}), not on the home tile.
 */

export type ProductTileTone = "ink" | "paper";

export type ProductTileProps = {
  eyebrow: string;              // e.g., "Nebbos Platform"
  headline: string;             // e.g., "Operations at institutional scale."
  imageFamily: string;          // family-concept-* key
  learnHref: string;            // "/products/platform"
  learnLabel?: string;          // default "Learn more"
  buyHref: string;              // "/contact"
  buyLabel?: string;            // default "Get in touch"
  priority?: boolean;           // priority on the first tile only
  tone?: ProductTileTone;       // ink (dark scrim, light text) | paper (paper ground, dark text)
};

export function ProductTile({
  eyebrow,
  headline,
  imageFamily,
  learnHref,
  learnLabel = "Learn more",
  buyHref,
  buyLabel = "Get in touch",
  priority = false,
  tone = "ink",
}: ProductTileProps) {
  const isInk = tone === "ink";
  const fg = isInk ? "var(--paper)" : "var(--ink)";
  const fgMuted = isInk ? "var(--paper-2)" : "var(--ink-2)";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "min(88vh, 900px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        borderBottom: "1px solid var(--rule)",
        isolation: "isolate",
      }}
    >
      <SceneStill family={imageFamily} familyVariant={1} shape="fullBleed" priority={priority} />
      {isInk && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to top, rgba(20,18,15,0.68) 0%, rgba(20,18,15,0.42) 32%, rgba(20,18,15,0.04) 62%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBlock: "clamp(56px, 9vh, 112px)",
          textAlign: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: fgMuted,
            margin: 0,
            textShadow: isInk ? "0 1px 2px rgba(20,18,15,0.32)" : undefined,
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(40px, 5.6vw, 84px)",
            lineHeight: 1.02,
            letterSpacing: "-0.028em",
            fontWeight: 500,
            color: fg,
            margin: 0,
            maxWidth: "22ch",
            textWrap: "balance",
            textShadow: isInk ? "0 2px 4px rgba(20,18,15,0.42)" : undefined,
          }}
        >
          {headline}
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px 40px",
            marginTop: 8,
          }}
        >
          <Link
            href={learnHref}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              fontWeight: 400,
              color: isInk ? "var(--accent-2)" : "var(--accent-2)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {learnLabel} <span aria-hidden>›</span>
          </Link>
          <Link
            href={buyHref}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 17,
              fontWeight: 400,
              color: isInk ? "var(--accent-2)" : "var(--accent-2)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {buyLabel} <span aria-hidden>›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
