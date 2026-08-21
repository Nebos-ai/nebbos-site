import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Standalone output for lean Railway/nixpacks deploys.
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  // Hidden client-facing artifacts (briefs, decks, one-pagers).
  //
  // /brief/delta is the Nebbos brief for Delta Holding (NEB-26-02 Rev 19).
  // Served from /public/nebbos-delta-brief.html. Not linked from public nav;
  // noindex,nofollow inside the file's own <meta>. Share via the exact URL only.
  //
  // Future: swap to /brief/:token/nebbos-delta-brief.html when the SALOS
  // per-recipient token flow lands (see nebbos-delta-brief/HOSTING-AND-TRACKING.md).
  async rewrites() {
    return [
      { source: "/brief/delta", destination: "/nebbos-delta-brief.html" },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here as needed.
});

export default withMDX(nextConfig);
