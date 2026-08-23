import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Standalone output for lean Railway/nixpacks deploys.
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
    // View Transitions API for same-taxonomy route changes (doctrine v2 §5).
    // Behind a flag in Next 15.5.x; safe to enable — no-op in unsupported
    // browsers. Adopted in Wave 2 for /customers → /customers/[slug] pairs.
    viewTransition: true,
  },
  // Image optimization ON explicitly (reject Cal/Dub `unoptimized:true`
  // per doctrine v2 §7). AVIF preferred, WebP fallback.
  images: {
    formats: ["image/avif", "image/webp"],
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
  // Cache headers · rapid-iteration marketing site.
  // Default Next behavior on `force-static` + `revalidate:false` was
  // Cache-Control: s-maxage=31536000 (1 year on CDN) which meant every
  // deploy stayed invisible to browsers with the old page cached. Override
  // per-route-type: HTML pages revalidate quickly (~60s CDN, ~30s browser),
  // static assets under /_next/static/ keep the immutable long TTL, images
  // under /vision-board/ get a modest CDN TTL so re-generations propagate.
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|vision-board).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=30, s-maxage=60, stale-while-revalidate=300" },
        ],
      },
      {
        source: "/vision-board/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here as needed.
});

export default withMDX(nextConfig);
