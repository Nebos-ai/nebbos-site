import Image from "next/image";
import { stillPath, SCENES } from "@/content/stills";

/**
 * FRAME · Home / 05 · Closing CTA
 * PARENT · app/page.tsx (/)
 * PURPOSE · The final band before the site footer. Full-bleed Scene 3 still
 *           (the Amalfi elder — "Where it endures") as the closing image.
 *           Single primary action overlaid: book a demo. The narrative arc
 *           opened with Scene 1 (Where it starts) and closes here (Where it
 *           endures). Every visitor walks the same story from top to bottom.
 */
const CTA_SCENE = SCENES[3];
const CTA_STILL = stillPath(CTA_SCENE.id, 4);

export function HomeCTA() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "72vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <Image
        src={CTA_STILL}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", zIndex: 0 }}
      />

      {/* Warm scrim for text legibility — Kinfolk-style, not SaaS-heavy */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(20, 18, 15, 0.56) 0%, rgba(20, 18, 15, 0.32) 40%, transparent 70%)",
        }}
      />

      {/* Chapter chip — top-right, closes the arc opened at the top */}
      <div
        style={{
          position: "absolute",
          top: "clamp(24px, 4vh, 48px)",
          right: "clamp(24px, 4vw, 48px)",
          zIndex: 2,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.86)",
          padding: "8px 14px",
          border: "1px solid rgba(244, 241, 234, 0.32)",
          backdropFilter: "blur(4px)",
        }}
      >
        03 · {CTA_SCENE.chapter}
      </div>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBlock: "clamp(48px, 8vh, 96px)",
        }}
      >
        <div
          style={{
            maxWidth: "42ch",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.6vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--paper)",
              margin: 0,
              textWrap: "balance",
              textShadow: "0 1px 2px rgba(20, 18, 15, 0.32)",
            }}
          >
            Put a Pearl on your{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: 400 }}>
              hardest
            </em>{" "}
            department.
          </h2>
          <div>
            <a
              href="/demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 28px",
                background: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "0.02em",
                textDecoration: "none",
                border: "1px solid var(--paper)",
                transition: "transform 180ms ease-out",
              }}
            >
              Book a demo
              <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
