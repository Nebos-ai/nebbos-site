import type { Metadata } from "next";
import { PRODUCTS } from "@/content/products";
import { MarketingProductDetail } from "@/components/sections/MarketingProductDetail";

/**
 * PAGE · /products/cradle · v2 · 2026-09-18 · marketing-register rebuild
 * Thin wrapper around MarketingProductDetail (see /products/platform for details).
 * Internal key is "usb" for SKU-ID stability; customer-facing name is "Cradle".
 */

const cradle = PRODUCTS.find((p) => p.key === "usb")!;

export const metadata: Metadata = {
  title: "Nebbos Cradle · Hardware-attested memory. Yours.",
  description:
    "FIPS 140-3 Level 3 encrypted storage with an on-device keypad. Tamper-evident, epoxy-sealed, IP68, MIL-STD-810G, TAA-compliant.",
};

export default function ProductCradlePage() {
  return <MarketingProductDetail product={cradle} />;
}
