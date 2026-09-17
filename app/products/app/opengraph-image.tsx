import { ImageResponse } from "next/og";
import { OGImageShell, Accent } from "@/lib/og-image-shell";

export const runtime = "edge";
export const alt = "Nebbos App — local native for macOS and Windows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <OGImageShell
        eyebrow="Product · App"
        headline={
          <>
            Local <Accent>native.</Accent> Yours.
          </>
        }
        subline="The local desktop application. Runs an offline-capable subset of the platform and syncs to the cloud through the MCP when online. First install of every operator's tier ceremony."
      />
    ),
    { ...size },
  );
}
