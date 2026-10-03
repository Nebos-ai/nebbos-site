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
      // /presentation → nebbos-delta-brief.html rewrite retired 2026-09-17
      // per docs/marketing/publication-readiness-2026-09-17.md §8. The delta
      // brief is a client-facing artifact (NEB-26-02 Rev 19, authored for a
      // specific holding co) — not appropriate for public marketing. Remains
      // reachable via /brief/financial for share-only-via-exact-URL delivery
      // (categorical slug, unlisted, noindex,nofollow per file <meta>).

      // Public technical documentation lives in a separate Next.js /
      // Nextra service (github.com/Nebos-ai/nebbos-docs), deployed on
      // Railway. This rewrite proxies /docs/* at the marketing site edge
      // so the docs live at nebbos.ai/docs — the canonical URL — rather
      // than a subdomain or Railway origin.
      //
      // The docs app sets `basePath: '/docs'` in its own next.config, so
      // internal links, static-asset URLs and route segments all emit
      // with the /docs prefix. The origin serves at
      // nebbos-docs-production.up.railway.app/docs/* — this rewrite
      // targets that path shape one-for-one.
      //
      // When docs.nebbos.ai (or a stable Cloudflare Pages URL) lands,
      // switch the destination host without touching the rewrite shape.
      {
        source: "/docs",
        destination: "https://nebbos-docs-production.up.railway.app/docs",
      },
      {
        source: "/docs/:path*",
        destination: "https://nebbos-docs-production.up.railway.app/docs/:path*",
      },
    ];
  },
  // Retired routes → redirect to current IA. Preserves inbound links (SEO,
  // bookmarks, shared URLs) while pointing visitors at what's current. 302
  // (temporary) leaves room to reinstate as internal-doctrine surface later
  // without breaking the redirect.
  //
  // - /product · /product/* — pre-2026-09-14 15-layer × 5-band architecture
  //   treatise · superseded by the 4-product × 3-tier customer taxonomy at
  //   /products · retired 2026-09-15 (Axis A Wave 2 per feedback_nebbos_ai_
  //   product_framing_platform_tools_mcp_usb_security_2026_09_14)
  //
  // - /platform · /platform/* — same architecture treatise family under a
  //   different name (platform → architecture/dashboard/how-it-works/
  //   integrations/presentation/standout/trends). Uses delta-brief-editorial
  //   voice + FeatureRow + CTABand primitives — the pre-2026-09-14 register.
  //   Retired 2026-09-17 per docs/marketing/publication-readiness-2026-09-17
  //   .md §8. Bespoke files at app/platform/**/page.tsx stay on disk per
  //   additive-only doctrine (feedback_governance_additive_only_never_delete_
  //   disable_ignore); the redirect makes them unreachable via URL.
  async redirects() {
    return [
      { source: "/product", destination: "/products", permanent: false },
      { source: "/product/:path*", destination: "/products", permanent: false },
      { source: "/platform", destination: "/products", permanent: false },
      { source: "/platform/:path*", destination: "/products", permanent: false },
      // /products/usb → /products/cradle: brand rename 2026-09-17.
      // Founder directive: "USB is too generic" → "Nebbos Cradle" (composes
      // with existing BRAND.productLine vocabulary). URL preserved via 302
      // so inbound links from press, PRs, bookmarks continue to work.
      { source: "/products/usb", destination: "/products/cradle", permanent: false },
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
