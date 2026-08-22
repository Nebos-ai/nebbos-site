/**
 * loadGoogleFont · doctrine v2 §7 NEW-B · Dub-pattern OG font loader.
 *
 * Fetches a Google Font's TTF/WOFF binary at build/edge time so `next/og`
 * `ImageResponse` can render text in the actual site typography. Same pattern
 * as `apps/web/app/api/og/load-google-font.ts` in the Dub monorepo — 14 lines
 * of the same shape, in TS.
 *
 * The Google Fonts CSS endpoint returns an @font-face block with a `src: url(...)`
 * pointing at a woff2/ttf. We regex the URL out, fetch the binary, and return
 * an ArrayBuffer ready for `ImageResponse.fonts`.
 *
 * Runs at the edge — no bundling required.
 */
export async function loadGoogleFont(
  family: string,
  weight: number | string = 400,
  style: "normal" | "italic" = "normal",
  text?: string,
): Promise<ArrayBuffer> {
  const familyParam = family.replace(/\s+/g, "+");
  const italRange = style === "italic" ? "1," : "0,";
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set(
    "family",
    `${familyParam}:ital,wght@${italRange}${weight}`,
  );
  if (text) {
    // Subset request — only glyphs for this string are fetched. Faster + tiny.
    url.searchParams.set("text", text);
  }
  url.searchParams.set("display", "swap");

  const css = await fetch(url.toString(), {
    headers: {
      // Google returns woff2 when it thinks a modern browser is asking. TTF
      // when it thinks it's not. `next/og` needs TTF/WOFF, not WOFF2.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; rv:107.0) Gecko/20100101 Firefox/107.0",
    },
  }).then((r) => r.text());

  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?(?:truetype|woff)['"]?\)/);
  if (!match) {
    throw new Error(`Could not extract font URL from Google Fonts CSS for ${family} ${weight} ${style}`);
  }
  const fontUrl = match[1].replace(/^['"]|['"]$/g, "");

  const buf = await fetch(fontUrl).then((r) => r.arrayBuffer());
  return buf;
}
