import type { Metadata } from "next";
import { PRODUCTS } from "@/content/products";
import { MarketingProductDetail } from "@/components/sections/MarketingProductDetail";

/**
 * PAGE · /products/app · v2 · 2026-09-18 · marketing-register rebuild
 * Thin wrapper around MarketingProductDetail (see /products/platform for details).
 */

const app = PRODUCTS.find((p) => p.key === "app")!;

export const metadata: Metadata = {
  title: "Nebbos App · Local native. macOS and Windows.",
  description:
    "The local-native app. Offline-capable. Syncs through the MCP. First install of every operator's tier ceremony.",
};

export default function ProductAppPage() {
  return <MarketingProductDetail product={app} />;
}
