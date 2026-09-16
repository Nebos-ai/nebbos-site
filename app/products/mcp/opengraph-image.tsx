import { ImageResponse } from "next/og";
import { OGImageShell, Accent } from "@/lib/og-image-shell";

export const runtime = "edge";
export const alt = "Nebbos MCP — the tool substrate, attested";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <OGImageShell
        eyebrow="Product · MCP"
        headline={
          <>
            The tool substrate. <Accent>Attested.</Accent>
          </>
        }
        subline="The Model Context Protocol server that mediates every tool call. Binary and configuration ship on the Nebbos USB — physical presence gates elevated permission tiers."
      />
    ),
    { ...size },
  );
}
