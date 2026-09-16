import { ImageResponse } from "next/og";
import { OGImageShell, Accent } from "@/lib/og-image-shell";

export const runtime = "edge";
export const alt = "Nebbos USB — hardware-attested security devices, peace of mind you can hold";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <OGImageShell
        eyebrow="Product · USB"
        headline={
          <>
            Peace of mind <Accent>you can hold.</Accent>
          </>
        }
        subline="FIPS 140-3 Level 3 encrypted storage with on-device keypad, tamper-evident and epoxy-sealed, IP68 and MIL-STD-810G, TAA-compliant. Carries the Nebbos MCP and gates elevated operations."
      />
    ),
    { ...size },
  );
}
