import { ImageResponse } from "next/og";

/**
 * app/apple-icon.tsx · Wave 3a · Apple touch icon (180×180 PNG).
 *
 * iOS/macOS home-screen bookmark tile. Slightly larger canvas than the
 * favicon so the N glyph reads at ~60% of the tile, with generous padding.
 */
export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4F1EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 12 12" width={108} height={108}>
          <path
            d="M6.03594 7.06903L4.8345 6.07791C2.7857 4.38863 1.65689 2.23003 1.65689 0H0V11H1.65689V5.04744C2.22432 5.85928 2.92794 6.62011 3.76471 7.30953L4.96614 8.30065C5.85436 9.03379 6.34311 9.95786 6.34311 10.9067H8C8 9.47688 7.30244 8.11409 6.03594 7.06903Z"
            fill="#F6A03F"
          />
          <path d="M9 0H7L7 4H9L9 0Z" fill="#14120F" />
        </svg>
      </div>
    ),
    size,
  );
}
