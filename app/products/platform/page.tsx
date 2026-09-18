import type { Metadata } from "next";
import { PRODUCTS } from "@/content/products";
import { MarketingProductDetail } from "@/components/sections/MarketingProductDetail";

/**
 * PAGE · /products/platform · v2 · 2026-09-18 · marketing-register rebuild
 *
 * Thin wrapper around the shared MarketingProductDetail template
 * (components/sections/MarketingProductDetail.tsx) which renders 8
 * dark-register sections from content/product-detail.ts. All 4
 * product-slug routes share the same shape and rebuild from one
 * template — no per-route CSS, no per-route section markup.
 */

const platform = PRODUCTS.find((p) => p.key === "platform")!;

export const metadata: Metadata = {
  title: "Nebbos.ai Platform · Institutional-scale AI operations.",
  description:
    "Runs your Pearls, your fleet, your governance. Multi-Shell by default. Every action attested. Every substrate yours.",
};

export default function ProductPlatformPage() {
  return <MarketingProductDetail product={platform} />;
}
