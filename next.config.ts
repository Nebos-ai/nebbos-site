import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Standalone output for lean Railway/nixpacks deploys.
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  // The @nebbos/brand package ships raw .tsx / .ts source (its exports map
  // ./logo → logo/index.tsx directly). Next won't compile TSX inside
  // node_modules by default — transpilePackages routes them through swc.
  transpilePackages: ["@nebbos/brand"],
  // Hidden client-facing artifacts (briefs, decks, one-pagers).
  //
  // URL slugs are CATEGORICAL, not client-named, so the URL itself doesn't
  // leak the deal target if a recipient shares a tab or email preview. The
  // underlying file name (nebbos-<slug>-brief.html) is internal only.
  //
  //   /brief/financial   → financial-services brief (currently the NEB-26-02
  //                        Rev 19 file authored for one specific holding co)
  //
  // Not linked from public nav; noindex,nofollow inside each file's own
  // <meta>. Share via the exact URL only.
  //
  // Future: swap to /brief/:token/... when the SALOS per-recipient token
  // flow lands (see HOSTING-AND-TRACKING.md in the brief's source folder).
  async rewrites() {
    return [
      { source: "/brief/financial", destination: "/nebbos-delta-brief.html" },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here as needed.
});

export default withMDX(nextConfig);
