import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/seo/loadGoogleFont";

/**
 * Dynamic OG image route · Wave 3a · every page gets a branded 1200×630
 * share preview rendered on the fly at the edge. Passes:
 *   /og?title=Pricing&eyebrow=NEBBOS
 * Fallback title defaults to the site tagline.
 *
 * Design: delta-brief editorial system — paper background, orange plus mark,
 * big Newsreader serif title, mono eyebrow, hairline rules. Same aesthetic
 * as the site itself so previews on Slack/WhatsApp/LinkedIn read as-brand.
 *
 * Fonts loaded via `loadGoogleFont` (Dub-pattern, TTF via Firefox UA hint).
 * `next/og` runs on the edge — no Node file APIs available.
 */
export const runtime = "edge";

const OG_SIZE = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "Build your company's brain").slice(0, 100);
  const eyebrow = (searchParams.get("eyebrow") ?? "Nebbos").slice(0, 30);
  const deck = searchParams.get("deck")?.slice(0, 120) ?? undefined;

  // Only fetch the glyphs actually used in the requested strings (subsetting)
  // so the request stays fast and the payload small.
  const subset = `${title}${eyebrow}${deck ?? ""}${"·+"}`;

  const [newsreader, hostGrotesk, jetbrainsMono] = await Promise.all([
    loadGoogleFont("Newsreader", 500, "normal", subset).catch(() => null),
    loadGoogleFont("Host Grotesk", 400, "normal", subset).catch(() => null),
    loadGoogleFont("JetBrains Mono", 500, "normal", subset).catch(() => null),
  ]);

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"] = [];
  if (newsreader)  fonts.push({ name: "Newsreader",  data: newsreader,  style: "normal", weight: 500 });
  if (hostGrotesk) fonts.push({ name: "HostGrotesk", data: hostGrotesk, style: "normal", weight: 400 });
  if (jetbrainsMono) fonts.push({ name: "JetBrainsMono", data: jetbrainsMono, style: "normal", weight: 500 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F1EA",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          fontFamily: "HostGrotesk",
          position: "relative",
        }}
      >
        {/* Orange plus mark in top-right — signature */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 96,
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", background: "#F6A03F", width: 44, height: 3 }} />
          <div style={{ position: "absolute", background: "#F6A03F", width: 3, height: 44 }} />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: "JetBrainsMono",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#A36630",
            marginBottom: 40,
          }}
        >
          {eyebrow}
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "Newsreader",
            fontSize: title.length > 40 ? 72 : 96,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: "#14120F",
            marginBottom: 32,
            maxWidth: 960,
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Deck (optional) */}
        {deck ? (
          <div
            style={{
              fontFamily: "HostGrotesk",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#403C36",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {deck}
          </div>
        ) : null}

        {/* Bottom rail — hairline + wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 96,
            right: 96,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #C9C1B4",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 28,
              color: "#14120F",
              letterSpacing: -0.4,
              display: "flex",
            }}
          >
            nebbos.ai
          </div>
          <div
            style={{
              fontFamily: "JetBrainsMono",
              fontSize: 15,
              letterSpacing: 3,
              color: "#7A7365",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            15 layers · one system
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        "cache-control": "public, immutable, max-age=31536000",
      },
    },
  );
}
