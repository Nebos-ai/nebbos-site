/**
 * content/subscriptions.ts · Nebbos subscription models per SKU
 *
 * Founder directive 2026-09-14 (session 761a904f):
 *   "we need to have are skus for teh nebbos suscription models"
 *
 * Every one of the 12 SKUs (4 products × 3 tiers, see content/products.ts)
 * ships as one or more subscription models. This registry names the SHAPE
 * — billing cadence, seat model, minimum commit, contract term, add-on
 * dimensions — but leaves the rate as `pending_founder_plan_rate` until
 * founder ratifies each price.
 *
 * Discipline:
 * - No dollar figures on the customer-facing marketing surface, per
 *   feedback_marketing_site_pricing_editorial_discipline (2026-08-23,
 *   ratified by founder). Rates render as "Contact sales" on /products
 *   and /pricing.
 * - Subscription structure IS surfaceable (billing cadence, seat model,
 *   minimum commit) — the rule is "keep pricing info clean and minimal",
 *   not "no subscription info at all".
 * - Founder-approval-gated per reference_nebbos_platform_pricing_substrate_5w_2026_09_14
 *   — every rate field defaults to null; founder ratifies before it is
 *   even considered for the /pricing surface.
 *
 * Grounded in:
 * - content/products.ts (PRODUCTS × TIERS = 12 SKUs; this file adds
 *   subscription structure on top)
 * - reference_nebbos_platform_pricing_substrate_5w_2026_09_14
 * - reference_nebbos_platform_billing_cost_substrate_5w_2026_09_14
 *   (cents-precision integer; immutable-after-finalized)
 * - feedback_marketing_site_pricing_editorial_discipline_2026_08_23
 * - reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14
 */

import type { ProductKey, TierKey } from "./products";

/** Billing cadence — how the operator pays over time. */
export type BillingCadence =
  | "monthly"                   // month-to-month, self-serve
  | "annual"                    // 12-month prepay, procurement path
  | "annual-with-monthly-payment" // 12-month commit, billed monthly
  | "one-time-plus-annual-attestation"; // hardware purchase + attestation renewal (USB only)

/** Seat model — what unit the subscription is priced on. */
export type SeatModel =
  | "per-user-per-month"        // human operator seat (Platform · App)
  | "per-Shell-per-month"      // one Shell = one subscription (MCP)
  | "per-device-one-time"       // hardware purchase (USB)
  | "per-device-annual"         // hardware attestation / support renewal (USB)
  | "included-with-platform";   // no separate charge, bundled

/** Contract term — the commitment length that gates the rate. */
export type ContractTerm =
  | "month-to-month"            // no commit, self-serve
  | "annual"                    // 12-month commit
  | "multi-year";               // 24-36 month enterprise contracts

/** Minimum commit — the floor the operator must satisfy to purchase. */
export type MinimumCommit = {
  users?: number;                // e.g., 20 users
  Shells?: number;              // e.g., 1 Shell floor
  devices?: number;              // e.g., 1 device
  monthly_floor_note?: string;   // "per Nebbos-Shell minimum" — one-line
};

/** Subscription model — the full shape of a purchasable SKU-subscription combination. */
export type SubscriptionModel = {
  sku_id: string;                     // matches products.ts SKU.id, e.g. "platform-l1"
  product: ProductKey;                // "platform" | "app" | "mcp" | "usb"
  tier: TierKey;                      // "L1" | "L2" | "L3"

  billing_cadence: BillingCadence[];  // one or more cadences offered
  seat_model: SeatModel;
  contract_term: ContractTerm[];      // one or more terms offered
  minimum_commit: MinimumCommit;

  rate_pending_founder: true;         // ALWAYS true until founder ratifies via
                                       //   reference_nebbos_platform_pricing_substrate
  rate_amount_minor: null;             // cents-precision integer, null until ratified
                                       //   per reference_nebbos_platform_billing_cost_substrate

  /** Overage / add-on dimensions the SKU carries. Free-form list of dimensions;
      rates for each are pending_founder as well. */
  overage_dimensions: string[];

  /** One-line marketing description for the subscription (customer-facing). */
  headline: string;

  /** Longer sales-collateral description (used in /contact quote generation +
      SOW boilerplate). Not rendered on marketing surfaces. */
  sales_description: string;

  /** Prepay discount posture — null when no discount, string like "10% for
      annual prepay" when there is one. Founder-ratifiable. */
  prepay_discount_note: string | null;
};

/** The subscription registry for every SKU.
 *
 * Twelve SKUs × distinct subscription shapes per SKU. The USB tiers include
 * TWO subscription models each (hardware purchase + annual attestation);
 * all other SKUs have one primary model with monthly + annual cadence.
 */
export const SUBSCRIPTION_MODELS: SubscriptionModel[] = [
  // ─── PLATFORM (Nebbos.ai — the AI operations platform) ─────────────────
  {
    sku_id: "platform-l1",
    product: "platform",
    tier: "L1",
    billing_cadence: ["monthly", "annual-with-monthly-payment"],
    seat_model: "per-user-per-month",
    contract_term: ["month-to-month", "annual"],
    minimum_commit: {
      users: 20,
      monthly_floor_note: "20-user minimum per Nebbos Shell",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "additional users beyond commit",
      "additional Pearls beyond quota",
      "additional tool-calls beyond quota",
    ],
    headline: "Dashboard access, personal-scope reads, low-risk automations.",
    sales_description:
      "Basic-tier Nebbos.ai platform access for a Shell of operators. Every operator authenticates with device biometric (Touch ID · Face ID · Windows Hello · Android BiometricPrompt). No USB required at this tier. Suitable for view-first roles, analysts, and Pearl-consumer teams.",
    prepay_discount_note: null,
  },
  {
    sku_id: "platform-l2",
    product: "platform",
    tier: "L2",
    billing_cadence: ["monthly", "annual-with-monthly-payment", "annual"],
    seat_model: "per-user-per-month",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      users: 20,
      monthly_floor_note: "20-user minimum per Nebbos Shell",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "additional users beyond commit",
      "additional Pearls beyond quota",
      "additional tool-calls beyond quota",
      "additional Nebbos USB units",
    ],
    headline: "Privileged operator access with USB physical-presence gate.",
    sales_description:
      "Privileged-tier Nebbos.ai platform access. Each operator paired with a Nebbos USB device; elevated operations (Shell writes, memory registers, admin ops within Shell) require both biometric AND physical USB presence. Includes annual attestation renewal per USB. Suitable for operators executing writes on Shell substrate.",
    prepay_discount_note: null,
  },
  {
    sku_id: "platform-l3",
    product: "platform",
    tier: "L3",
    billing_cadence: ["annual", "annual-with-monthly-payment"],
    seat_model: "per-user-per-month",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      users: 20,
      monthly_floor_note: "20-user minimum per Nebbos Shell",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "additional admin users beyond commit",
      "quorum-signing rate beyond baseline",
    ],
    headline: "Admin-tier access with enclave-signed approval for cross-boundary and quorum operations.",
    sales_description:
      "Admin-tier Nebbos.ai platform access. Each admin user provisioned with a Nebbos USB plus enclave-signed approval capability (AGSE-attested). Unlocks Shell creation and destruction, substrate mutation, cross-Shell reads, ADR-cluster ratification, and quorum-required actions. Multi-year commit standard for enterprise procurement.",
    prepay_discount_note: null,
  },

  // ─── APP (Nebbos app — local native for macOS + Windows) ──────────────
  {
    sku_id: "app-l1",
    product: "app",
    tier: "L1",
    billing_cadence: ["monthly", "annual-with-monthly-payment"],
    seat_model: "included-with-platform",
    contract_term: ["month-to-month", "annual"],
    minimum_commit: {
      users: 20,
      monthly_floor_note: "Bundled with Platform-L1 subscription; no separate charge",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [],
    headline: "Local native macOS + Windows client, bundled with Platform.",
    sales_description:
      "The Nebbos app for macOS and Windows. Runs an offline-capable subset of the platform; syncs to the cloud via the MCP when online. Included at no separate charge with every Platform subscription. Distributed via signed installers; auto-update opt-in.",
    prepay_discount_note: null,
  },
  {
    sku_id: "app-l2",
    product: "app",
    tier: "L2",
    billing_cadence: ["monthly", "annual-with-monthly-payment"],
    seat_model: "included-with-platform",
    contract_term: ["annual"],
    minimum_commit: {
      users: 20,
      monthly_floor_note: "Bundled with Platform-L2 subscription; requires paired USB per user",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [],
    headline: "Local native client with USB-gated elevated operations.",
    sales_description:
      "The Nebbos app configured for privileged-tier operators. Elevated actions on local resources require both biometric assertion AND paired Nebbos USB physical presence. Bundled with Platform-L2 subscription.",
    prepay_discount_note: null,
  },
  {
    sku_id: "app-l3",
    product: "app",
    tier: "L3",
    billing_cadence: ["annual"],
    seat_model: "included-with-platform",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      users: 20,
      monthly_floor_note: "Bundled with Platform-L3 subscription; requires enclave-attested workstation",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [],
    headline: "Local native client for enclave-attested admin operations.",
    sales_description:
      "The Nebbos app configured for admin-tier operators. Substrate mutations and cross-boundary actions require biometric + USB + enclave-signed approval token. Bundled with Platform-L3 subscription.",
    prepay_discount_note: null,
  },

  // ─── MCP (Nebbos MCP — the tool substrate) ─────────────────────────────
  {
    sku_id: "mcp-l1",
    product: "mcp",
    tier: "L1",
    billing_cadence: ["monthly", "annual-with-monthly-payment"],
    seat_model: "per-Shell-per-month",
    contract_term: ["month-to-month", "annual"],
    minimum_commit: {
      Shells: 1,
      monthly_floor_note: "One Shell floor; scales per Nebbos Shell",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "tool-calls beyond monthly quota",
      "outbound-egress-GB beyond monthly quota",
    ],
    headline: "MCP tool substrate for a Shell — read tools and low-risk operations.",
    sales_description:
      "The Nebbos MCP served over authenticated HTTPS at api.nebbos.ai/mcp for a Shell. L1 tier exposes read tools, personal-scope queries, and low-risk operations. Tool-call quota per Shell per month; overage billed at cost-follow rate. Includes standard SLA (99.5% uptime).",
    prepay_discount_note: null,
  },
  {
    sku_id: "mcp-l2",
    product: "mcp",
    tier: "L2",
    billing_cadence: ["monthly", "annual"],
    seat_model: "per-Shell-per-month",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      Shells: 1,
      devices: 1,
      monthly_floor_note: "One Shell + at least one Nebbos USB with MCP binary",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "tool-calls beyond monthly quota",
      "additional MCP-carrier USB units",
      "outbound-egress-GB beyond monthly quota",
    ],
    headline: "MCP substrate with USB-attested elevated tool surface for a Shell.",
    sales_description:
      "The Nebbos MCP with L2 tier exposure — Shell writes, memory registers, admin ops within Shell. MCP binary + config + attestation credentials ship on a Nebbos USB; elevated tool calls verify USB physical presence server-side before executing. Includes 99.9% SLA and quarterly cost-follow reconciliation.",
    prepay_discount_note: null,
  },
  {
    sku_id: "mcp-l3",
    product: "mcp",
    tier: "L3",
    billing_cadence: ["annual"],
    seat_model: "per-Shell-per-month",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      Shells: 1,
      devices: 1,
      monthly_floor_note: "Enclave-attested admin substrate; per-Shell floor",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "admin tool-calls beyond quota",
      "cross-Shell read volume",
      "quorum-signing rate",
    ],
    headline: "MCP substrate for substrate-mutation and cross-boundary admin ops.",
    sales_description:
      "The Nebbos MCP with L3 tier exposure — Shell creation and destruction, substrate mutation, cross-Shell reads, ADR-cluster ratification, and quorum-required actions. Requires enclave-signed approval tokens per admin call. Includes 99.99% SLA, dedicated support tier, and multi-year contract minimum.",
    prepay_discount_note: null,
  },

  // ─── USB (Nebbos USB — hardware-attested security devices) ────────────
  {
    sku_id: "usb-l1",
    product: "usb",
    tier: "L1",
    billing_cadence: ["one-time-plus-annual-attestation"],
    seat_model: "per-device-one-time",
    contract_term: ["annual"],
    minimum_commit: {
      devices: 1,
      monthly_floor_note: "One-time hardware purchase; annual attestation renewal per device",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "additional device provisioning",
      "expedited shipping",
      "replacement device (tamper-evident break)",
    ],
    headline: "Nebbos USB hardware with basic-tier attestation and encrypted personal store.",
    sales_description:
      "One Nebbos USB device (DataLocker K350 substrate, FIPS 140-3 L3, on-device keypad, TAA-compliant) provisioned with L1-tier attestation credentials, personal encrypted store, and MCP-carrier for basic-tier operations. Purchase includes device + one year of attestation renewal.",
    prepay_discount_note: null,
  },
  {
    sku_id: "usb-l2",
    product: "usb",
    tier: "L2",
    billing_cadence: ["one-time-plus-annual-attestation"],
    seat_model: "per-device-one-time",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      devices: 1,
      monthly_floor_note: "One-time hardware purchase; annual attestation + Shell-write authority renewal",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "additional device provisioning",
      "expedited shipping",
      "replacement device (tamper-evident break)",
      "tier-upgrade re-provisioning",
    ],
    headline: "Nebbos USB with privileged-tier attestation, Shell-write authority.",
    sales_description:
      "One Nebbos USB device provisioned with L2-tier attestation credentials + MCP binary + Shell-write scope. Physical presence gates Shell writes, memory register operations, and admin ops within the operator's Shell. Purchase includes device + one year of attestation renewal.",
    prepay_discount_note: null,
  },
  {
    sku_id: "usb-l3",
    product: "usb",
    tier: "L3",
    billing_cadence: ["one-time-plus-annual-attestation"],
    seat_model: "per-device-one-time",
    contract_term: ["annual", "multi-year"],
    minimum_commit: {
      devices: 1,
      monthly_floor_note: "One-time hardware purchase; annual attestation + enclave-signing authority renewal",
    },
    rate_pending_founder: true,
    rate_amount_minor: null,
    overage_dimensions: [
      "additional admin device provisioning",
      "expedited shipping",
      "replacement device (tamper-evident break; requires new key ceremony)",
      "key-rotation ceremony (quorum-required)",
    ],
    headline: "Nebbos USB with admin-tier attestation + enclave-signing authority.",
    sales_description:
      "One Nebbos USB device provisioned with L3-tier attestation credentials + MCP binary + enclave-signing scope. Physical presence + enclave-signed approval token gate substrate mutations, cross-Shell reads, ADR-cluster ratification, and quorum-required actions. Replacement device requires a new key ceremony. Purchase includes device + one year of attestation renewal.",
    prepay_discount_note: null,
  },
];

/** Look up subscription models for one product across all tiers. */
export function subscriptionsForProduct(product: ProductKey): SubscriptionModel[] {
  return SUBSCRIPTION_MODELS.filter((m) => m.product === product);
}

/** Look up subscription models for one tier across all products. */
export function subscriptionsForTier(tier: TierKey): SubscriptionModel[] {
  return SUBSCRIPTION_MODELS.filter((m) => m.tier === tier);
}

/** Look up one specific SKU's subscription model. */
export function subscriptionForSku(sku_id: string): SubscriptionModel | undefined {
  return SUBSCRIPTION_MODELS.find((m) => m.sku_id === sku_id);
}
