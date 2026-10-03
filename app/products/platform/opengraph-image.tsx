import { ImageResponse } from "next/og";
import { OGImageShell, Accent } from "@/lib/og-image-shell";

export const runtime = "edge";
export const alt = "Nebbos.ai Platform — the operator platform your team lives in";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <OGImageShell
        eyebrow="Product · Platform"
        headline={
          <>
            The <Accent>platform</Accent> your operators live in.
          </>
        }
        subline="Multi-Shell by default, enterprise-grade. Where operators run their Pearls, view dashboards, and approve actions."
      />
    ),
    { ...size },
  );
}
