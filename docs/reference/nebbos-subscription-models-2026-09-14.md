# Nebbos subscription models — 12 SKUs, subscription structure per SKU

**Date**: 2026-09-14 · **Session**: `761a904f` · **Branch**: `feat/subscription-models-per-sku-2026-09-14`

**Founder directive**: *"we need to have are skus for teh nebbos suscription models"*

**Companion registry**: [`content/subscriptions.ts`](../../content/subscriptions.ts) (typed, consumed by pages + quote-generation)

## What this doc is

Every one of Nebbos's 12 SKUs (4 products × 3 tiers) is purchasable as a subscription. This doc names the **shape** of each subscription — billing cadence, seat model, minimum commit, contract term, overage dimensions, prepay discount posture — without committing to a rate.

Rates are founder-approval-gated per [`reference_nebbos_platform_pricing_substrate_5w_2026_09_14`](../../../../.claude/projects/-Users-matic/memory/reference_nebbos_platform_pricing_substrate_5w_2026_09_14.md). Every rate field in the registry is `null` with `rate_pending_founder: true` until the founder ratifies each. Customer surfaces render "Contact sales" per [`feedback_marketing_site_pricing_editorial_discipline`](../../../../.claude/projects/-Users-matic/memory/feedback_marketing_site_pricing_editorial_discipline.md).

## Subscription dimensions — the 4-part shape

Each subscription model carries four commitments:

**1. Billing cadence** — how the operator pays over time:

| Cadence | Description | Applies to |
|---|---|---|
| `monthly` | Month-to-month, self-serve, no annual commit | Platform / MCP L1-L2 |
| `annual` | 12-month prepay, procurement path | Platform / MCP L2-L3 |
| `annual-with-monthly-payment` | 12-month commit, billed monthly | Platform / MCP / App |
| `one-time-plus-annual-attestation` | Hardware purchase + annual attestation renewal | USB (all tiers) |

**2. Seat model** — what unit the subscription is priced on:

| Model | Description | Applies to |
|---|---|---|
| `per-user-per-month` | Human operator seat | Platform (all tiers) |
| `per-tenant-per-month` | One tenant = one subscription | MCP (all tiers) |
| `per-device-one-time` | Hardware purchase | USB (all tiers) |
| `per-device-annual` | Annual attestation / support renewal on hardware | USB (renewal side) |
| `included-with-platform` | Bundled, no separate charge | App (all tiers) |

**3. Contract term** — the commitment length:

| Term | Description |
|---|---|
| `month-to-month` | No commit, self-serve |
| `annual` | 12-month commit |
| `multi-year` | 24-36 month enterprise contract |

**4. Minimum commit** — the floor the operator must satisfy to purchase:

- Platform: 20 users per Nebbos tenant floor (all tiers)
- MCP: 1 tenant floor (all tiers)
- USB: 1 device (all tiers)
- App: bundled with Platform (no separate floor)

## The 12 SKUs at a glance

| SKU id | Product | Tier | Cadence | Seat model | Min commit | Overage dims |
|---|---|---|---|---|---|---|
| `platform-l1` | Platform | L1 Basic | monthly / annual | per-user/mo | 20 users | +users, +Pearls, +tool-calls |
| `platform-l2` | Platform | L2 Privileged | monthly / annual / multi-year | per-user/mo | 20 users | +users, +Pearls, +tool-calls, +USB |
| `platform-l3` | Platform | L3 Admin | annual / multi-year | per-user/mo | 20 users | +admin users, +quorum ops |
| `app-l1` | App | L1 Basic | monthly / annual | bundled w/ Platform | 20 users | — |
| `app-l2` | App | L2 Privileged | monthly / annual | bundled w/ Platform | 20 users + paired USB | — |
| `app-l3` | App | L3 Admin | annual / multi-year | bundled w/ Platform | 20 users + enclave-attested workstation | — |
| `mcp-l1` | MCP | L1 Basic | monthly / annual | per-tenant/mo | 1 tenant | +tool-calls, +egress-GB |
| `mcp-l2` | MCP | L2 Privileged | monthly / annual / multi-year | per-tenant/mo | 1 tenant + 1 USB | +tool-calls, +USB units, +egress-GB |
| `mcp-l3` | MCP | L3 Admin | annual / multi-year | per-tenant/mo | 1 tenant + 1 USB | +admin tool-calls, +cross-tenant reads, +quorum-signing |
| `usb-l1` | USB | L1 Basic | one-time + annual attestation | per-device | 1 device | +provisioning, +shipping, +replacement |
| `usb-l2` | USB | L2 Privileged | one-time + annual attestation | per-device | 1 device | +provisioning, +shipping, +replacement, +tier-upgrade |
| `usb-l3` | USB | L3 Admin | one-time + annual attestation | per-device | 1 device | +admin provisioning, +shipping, +replacement (new key ceremony), +key-rotation ceremony |

## Where subscription info renders

**Customer marketing surface (nebbos.ai)**:
- `/products` — taxonomy landing, one card per SKU, shows: SKU name · tier factors · scope · billing cadence · seat model · min commit · **"Contact sales"** (no dollar figures)
- `/product/{platform,app,mcp,usb}` (proposed per ADR-278 amendment) — per-product deep pages with each tier's subscription detail
- `/pricing` — clean minimal summary per [`feedback_marketing_site_pricing_editorial_discipline`](../../../../.claude/projects/-Users-matic/memory/feedback_marketing_site_pricing_editorial_discipline.md): headline structure + minimum + prepay note, nothing more

**Internal + sales surfaces (not marketing)**:
- Quote generation (once wired) — consumes `content/subscriptions.ts` + founder-ratified rates from `pending_founder_plan_rate` table per pricing substrate memo
- SOW/MSA boilerplate — pulls `sales_description` field per SKU
- Sales collateral — per [`reference_nebbos_platform_sales_collateral_substrate_5w`](../../../../.claude/projects/-Users-matic/memory/reference_nebbos_platform_sales_collateral_substrate_5w_2026_09_14.md) — snapshot-at-send

**CRM (Attio)**:
- Opportunities carry line items that reference `sku_id` from this registry
- Quotes are snapshots of `SubscriptionModel` rows with ratified rate at send time

## Composition with product-taxonomy work this session

- `content/products.ts` — the 4-product × 3-tier taxonomy (PRODUCTS × TIERS = 12 SKUs). Base layer.
- `content/subscriptions.ts` — the subscription-model shape per SKU (this doc's registry). Extension layer.
- `app/products/page.tsx` — the taxonomy landing (existing on `chore/retract-run-layer-vocabulary-mandate` branch). Will be extended to render subscription info per SKU in a follow-up commit.
- `docs/reference/apple-device-marketing-patterns-2026-09-14.md` — the Apple device-marketing arc reference. Per-product pages under `/product/{platform,app,mcp,usb}` will follow this arc and consume both `products.ts` and `subscriptions.ts`.

## Open items — founder-ratifiable

1. **Twelve rates** (`rate_amount_minor` per SKU). Each is null until the founder sets it via `pending_founder_plan_rate` table per [`reference_nebbos_platform_pricing_substrate_5w`](../../../../.claude/projects/-Users-matic/memory/reference_nebbos_platform_pricing_substrate_5w_2026_09_14.md).
2. **Prepay discount posture** — currently `null` for all SKUs. If the founder wants "10% for annual prepay" (or similar) on any SKU, that lands as a `prepay_discount_note` string per row.
3. **App tier upgrade path** — App-L1/L2/L3 are all `included-with-platform` today; founder may want to split the App as a standalone SKU with its own rate (e.g. air-gapped-only deployments where the platform isn't purchased). Structural addition, not pricing.
4. **USB replacement policy for L3** — currently marked as "requires new key ceremony". Founder may want to define the ceremony cost model (quorum-signing rate) as its own subscription line.

## Governance

- **Ratification path**: this registry structure lands with founder direction (2026-09-14 verbatim above). Rate assignments per SKU are separate founder-scope decisions and NEVER inferred by the assistant.
- **Additive-only** per [`feedback_governance_additive_only_never_delete_disable_ignore`](../../../../.claude/projects/-Users-matic/memory/feedback_governance_additive_only_never_delete_disable_ignore.md): future SKUs (new products, new tiers) append; existing entries never mutate silently. Field-level changes require an inline `Amendment N` block in this doc + a new row in a `subscription_model_history` table (deferred until first rate ratifies).
- **Base dependency**: `content/products.ts` must exist for this registry's types to resolve. Currently that file lives on the `chore/retract-run-layer-vocabulary-mandate-2026-09-14` branch (unmerged); this branch was rebased onto it. On main-merge, this branch rebases to main directly.

## Empirical grounding

Founder directive same-day (2026-09-14). Products.ts + tier definitions grounded in [`reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14`](../../../../.claude/projects/-Users-matic/memory/reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14.md) — Nebbos's ratified customer-facing taxonomy. Subscription dimensions derived from standard enterprise SaaS + hardware-with-attestation-renewal patterns; rate structure kept null pending founder plan rate table.
