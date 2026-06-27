import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Standalone output for lean Railway/nixpacks deploys.
  output: "standalone",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here as needed.
});

export default withMDX(nextConfig);
