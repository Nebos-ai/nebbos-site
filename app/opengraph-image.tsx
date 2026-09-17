import { ImageResponse } from "next/og";
import { BRAND } from "@/content/brand";

/**
 * app/opengraph-image.tsx · Nebbos site default OG image generator.
 *
 * Renders a 1200x630 branded social-share image at /opengraph-image at
 * build time (Next 15 native next/og edge runtime). Consumed by:
 *   - Twitter (twitter:image via twitter:card=summary_large_image)
 *   - LinkedIn (og:image via <link rel="image_src">)
 *   - Facebook / iMessage / Discord / Slack link previews
 *
 * Design: Institutional Reserve register (paper + hairline + gold accent),
 * the flower-of-life mark inline, the BRAND.name + taglineShort as the
 * text stack. Static — no per-page personalization at this layer (that's
 * a Wave 3d follow-up: opengraph-image.tsx per-route for pages that want
 * their own title).
 *
 * Runtime: edge (fast global CDN). Content-Type: image/png.
 *
 * Charter elite-bar dim 7 (assets — dynamic edge OG per site).
 */

export const runtime = "edge";
export const alt = `${BRAND.name} — ${BRAND.taglineShort}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette locked to brand (post-2026-09-17 tagline shift):
// --paper #FFFFFF · --ink #1D1C22 · --accent-2 #FF6B1E (electric Nebbos orange) · --ink-2 #4A4952
const PAPER = "#FFFFFF";
const INK = "#1D1C22";
const ACCENT = "#FF6B1E"; // was --gold #9A5D2A (dull) — electric Nebbos orange for the display accent
const INK_2 = "#4A4952";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          padding: "80px 96px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Top hairline */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 96,
            right: 96,
            height: 1,
            background: "#E8E6E2",
          }}
        />

        {/* Bottom hairline */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 96,
            right: 96,
            height: 1,
            background: "#E8E6E2",
          }}
        />

        {/* Header: mark + BRAND name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {/* Flower-of-life mark — 7-circle rosette matching nebbos-mark.svg */}
          <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <g stroke={INK} strokeWidth="1.6" fill="none">
              <circle cx="20" cy="20" r="7" />
              <circle cx="20" cy="13" r="7" />
              <circle cx="26" cy="16.5" r="7" />
              <circle cx="26" cy="23.5" r="7" />
              <circle cx="20" cy="27" r="7" />
              <circle cx="14" cy="23.5" r="7" />
              <circle cx="14" cy="16.5" r="7" />
            </g>
          </svg>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: INK,
              letterSpacing: "-0.01em",
            }}
          >
            {BRAND.name}
          </div>
        </div>

        {/* Main headline · Stripe-shape category claim */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            maxWidth: 1000,
            marginTop: "auto",
          }}
        >
          Infrastructure{" "}
          <span
            style={{
              color: ACCENT,
              fontWeight: 700,
            }}
          >
            for AI operators.
          </span>
        </div>

        {/* Subline · three parallel claims */}
        <div
          style={{
            fontSize: 26,
            color: INK_2,
            lineHeight: 1.4,
            marginTop: 36,
            maxWidth: 900,
            fontWeight: 400,
          }}
        >
          Every action attested. Every credential on hardware. Every substrate portable when you leave.
        </div>

        {/* Bottom bar: domain + orange plus-marker accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: INK_2,
              fontFamily: "monospace",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            nebbos.ai
          </div>
          <div
            style={{
              fontSize: 40,
              color: ACCENT,
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            +
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
