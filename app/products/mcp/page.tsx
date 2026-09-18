import type { Metadata } from "next";
import { PRODUCTS } from "@/content/products";
import { MarketingProductDetail } from "@/components/sections/MarketingProductDetail";

/**
 * PAGE · /products/mcp · v2 · 2026-09-18 · marketing-register rebuild
 * Thin wrapper around MarketingProductDetail (see /products/platform for details).
 */

const mcp = PRODUCTS.find((p) => p.key === "mcp")!;

export const metadata: Metadata = {
  title: "Nebbos MCP · The tool substrate. Ships on the Cradle.",
  description:
    "JSON-RPC over HTTPS. Server-verified attestation on every call. Ships on the Nebbos Cradle. No side channels.",
};

export default function ProductMcpPage() {
  return <MarketingProductDetail product={mcp} />;
}
