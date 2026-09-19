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
    factors: "Biometric + Nebbos Cradle physical presence",
    scope: "Shell writes, memory registers, admin operations within the Shell.",
  },
  {
    key: "L3",
    label: "L3 · Admin",
    factors: "Biometric + Nebbos Cradle + enclave-signed approval token",
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
    tagline: "The foundation your operation runs on.",
    description:
      "Where the Pearls live. Where every dashboard, every approval, every action lands with an identity attached. Multi-Shell by default, one client per row, every request checked before the query runs.",
    colorVar: "--product-color-platform",
    slug: "platform",
  },
  {
    key: "app",
    eyebrow: "Software",
    name: "Nebbos App",
    tagline: "Your Pearl on the metal in front of you.",
    description:
      "Native for macOS and Windows. Runs the offline half of the platform, keeps the last mile of a decision on your laptop, syncs to the cloud through the MCP the moment you are back on the network. First install of every operator's tier ceremony.",
    colorVar: "--product-color-app",
    slug: "app",
  },
  {
    key: "mcp",
    eyebrow: "Tooling",
    name: "Nebbos MCP",
    tagline: "The line every tool call has to cross.",
    description:
      "The Model Context Protocol server that mediates every read and every write a Pearl makes. Classifier decides the tier client-side, redacts before egress, hands the call to the substrate. Binary and policy ship on your Cradle — no Nebbos-side deploy can change how your host answers a request.",
    colorVar: "--product-color-mcp",
    slug: "mcp",
  },
  {
    key: "usb", // internal key stays for SKU-ID stability; customer-facing name is "Cradle"
    eyebrow: "Hardware",
    name: "Nebbos Cradle",
    tagline: "Sovereignty you can put in your pocket.",
    description:
      "FIPS 140-3 Level 3 encrypted storage with an on-device keypad, tamper-evident and epoxy-sealed, IP68 and MIL-STD-810G, TAA-compliant. Carries the MCP binary, your Pearl memory, and the keys that unlock your audit trail. Elevated capability follows the object on the desk — not the network location.",
    colorVar: "--product-color-usb",
    slug: "cradle",
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
