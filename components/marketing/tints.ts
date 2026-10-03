import type { ProductKey } from "@/content/products";

/** Pearl / product colour per product key (the `usb` key is the Cradle). */
export const PRODUCT_TINT: Record<ProductKey, string> = {
  platform: "var(--color-platform)",
  app: "var(--color-app)",
  mcp: "var(--color-mcp)",
  usb: "var(--color-cradle)",
};
