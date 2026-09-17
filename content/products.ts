/**
 * content/products.ts · The four-product × three-tier customer registry
 *
 * Founder directive 2026-09-14 (session 761a904f, verbatim):
 *   "we need to use the nebbos logo flower and have it in four colors each
 *    color will represent the different products but each product will have
 *    there [usb/three] levels and then the physical usb will be color
 *    associated by product and the level so 12 total products"
 *
 * Also founder-directed same day:
 *   "we need to make the main product of nebbos.ai the platform and the
 *    tools its has and all the system ability that the mcp has with the
 *    security of the usb"
 *
 * Grounded in:
 *   - reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14
 *   - feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14
 *   - feedback_device_biometric_is_approval_mechanism_2026_09_14
 *   - feedback_nebbos_mcp_lives_on_usb_shared_code_structure_2026_09_14
 *   - feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13
 *
 * No published pricing per feedback_nebbos_no_published_pricing_palantir_model —
 * every SKU renders "contact sales", not dollar figures.
 *
 * Every string editable in this file; pages consume the registry.
 */

export type TierKey = "L1" | "L2" | "L3";

export type Tier = {
  key: TierKey;
  label: string;
  factors: string;
  scope: string;
};

export const TIERS: Tier[] = [
  {
    key: "L1",
    label: "L1 · Basic",
    factors: "Device-native biometric (Touch ID · Face ID · Windows Hello · Android BiometricPrompt)",
    scope: "Dashboard view, personal-scope reads, low-risk tool calls.",
  },
  {
    key: "L2",
    label: "L2 · Privileged",
    factors: "Biometric + Nebbos USB physical presence",
    scope: "Shell writes, memory registers, admin operations within the Shell.",
  },
  {
    key: "L3",
    label: "L3 · Admin",
    factors: "Biometric + Nebbos USB + enclave-signed approval token",
    scope: "Shell creation and destruction, substrate mutation, cross-Shell, quorum-required actions.",
  },
];

export type ProductKey = "platform" | "app" | "mcp" | "usb";

export type Product = {
  key: ProductKey;
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  colorVar: string;
  slug: string;
};

export const PRODUCTS: Product[] = [
  {
    key: "platform",
    eyebrow: "Software",
    name: "Nebbos.ai Platform",
    tagline: "The AI operations platform for institutional scale.",
    description:
      "The web platform where operators run their Pearls, view dashboards, and approve actions. Multi-Shell by default, enterprise-grade, live in production.",
    colorVar: "--product-color-platform",
    slug: "platform",
  },
  {
    key: "app",
    eyebrow: "Software",
    name: "Nebbos App",
    tagline: "Local native for macOS and Windows.",
    description:
      "The local native application. Runs an offline-capable subset of the platform and syncs to the cloud through the MCP when online. First install of every operator's tier ceremony.",
    colorVar: "--product-color-app",
    slug: "app",
  },
  {
    key: "mcp",
    eyebrow: "Tooling",
    name: "Nebbos MCP",
    tagline: "The tool substrate. Ships on the USB device.",
    description:
      "The Model Context Protocol server that mediates every tool call. Binary and configuration ship on the Nebbos USB — physical presence gates elevated permission tiers.",
    colorVar: "--product-color-mcp",
    slug: "mcp",
  },
  {
    key: "usb",
    eyebrow: "Hardware",
    name: "Nebbos USB",
    tagline: "Hardware-attested security devices.",
    description:
      "FIPS 140-3 Level 3 encrypted storage with on-device keypad, tamper-evident and epoxy-sealed, IP68 and MIL-STD-810G, TAA-compliant. Carries the Nebbos MCP and gates elevated operations.",
    colorVar: "--product-color-usb",
    slug: "usb",
  },
];

export type SKU = {
  id: string;
  product: Product;
  tier: Tier;
};

/** Twelve SKUs: 4 products × 3 tiers. */
export const SKUS: SKU[] = PRODUCTS.flatMap((product) =>
  TIERS.map((tier) => ({
    id: `${product.key}-${tier.key.toLowerCase()}`,
    product,
    tier,
  })),
);
