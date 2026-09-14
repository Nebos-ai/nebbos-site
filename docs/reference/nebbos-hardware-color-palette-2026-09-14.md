# Nebbos hardware color palette — Apple × Zegna proposal

**Date**: 2026-09-14 · **Session**: `761a904f` · **Branch**: `feat/hardware-color-palette-candidates-2026-09-14`

**Founder directive**: *"we need to research the most markable colors for hardware the colors that apple has used for there devices so some type of gray a red a black and a brown we need to use the zenya color palat"*

**Extends**: `feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13` — the flower-of-life mark ships in 4 color variants (one per product line), driven by `--product-color-{platform,app,mcp,usb}` CSS tokens. This doc names four **candidate hex values** for founder ratification.

## The two references

### Apple device colors — what's marketable for hardware

Apple's device-color grammar over the last decade shows a durable set of neutrals. Not primary hues. Not seasonal fashion palettes. **Metallic warm-cool grays + one deep dark + occasional warm accents.**

| Apple color | Approx hex | Debut | Register |
|---|---|---|---|
| **Silver** | `#A2AAAD` | classic — aerospace-aluminum reference | cool neutral, precision-engineering signal |
| **Space Gray** | `#7D7E80` (approx) | 2013 → 2021 aluminum flagship | cool dark neutral, replaced Slate |
| **Graphite** | `#3C3C3D` (approx) | 2020 (Series 6 · iPhone 12 Pro) → still current | very dark neutral, still in Series 10 titanium |
| **Midnight** | `#1D2A3A` (approx) | 2021 (M-series MacBook Air) | dark neutral with cool cast, replaced Space Gray |
| **Space Black** | `#1F1E1D` (approx) | 2018 (Apple Watch stainless) → still current | matte black, high-restraint hardware finish |
| **Titanium (natural)** | `#8B8680` (approx) | 2023 (iPhone 15 Pro) | warm-gray with metallic overtone |
| **Bronze (Titanium)** | `#8B7355` (approx) | 2024 titanium Watch variant | warm metallic, pushes toward brown |
| **Product Red** | `#BF0A2C` | 2006 → still current | primary red, community-facing, not institutional |

**Pattern**: Apple's device palette is 90% neutrals. Any warm color is a **titanium-bronze**, not a primary red or a saturated hue. Product Red exists as a cause-marketing sub-brand, not the durable palette.

**Sources**: [Apple Wiki: List of product colors](https://apple.fandom.com/wiki/List_of_Apple_product_colors) · [ColorArchive: Apple brand palette](https://colorarchive.org/brands/apple/) · [ChromaCreator: Apple brand colors](https://chromacreator.com/brands/apple)

### Zegna palette — what says institutional-luxury restraint

Ermenegildo Zegna's menswear color grammar is **earth-toned warm neutrals**. Camel · tobacco · chocolate · charcoal · deep oxblood suit-red. The register is grounded sophistication — Italian wool-suit language — not fashion-primary.

Zegna casual-wear pattern: camel-and-tan earth tones, layered warm neutrals. Their signature suit-red (when they use red at all) is a deep oxblood/burgundy, not primary. Charcoal-grays lean warm; blacks are true matte-blacks with slight warmth.

**Sources**: [InFashionBalance: Zegna style palette](https://infashionbalance.com/fashion-palette-168-zegna-style/) · [The Vou: Soft-autumn colors](https://thevou.com/blog/what-colours-should-soft-autumn-wear/) · [Como Milano: Zegna camel throw](https://www.comomilano.com/products/ermenegildo-zegna-throw-blanket-camel-brown-wool-angora-silk)

## The Nebbos proposal — 4 candidate hex codes

Where Apple's device-neutrals overlap with Zegna's earth-tone restraint, the palette resolves to **four grounded hues, no primary saturation**. Each maps to one product line.

| # | Name | Hex candidate | Character | Product |
|---|---|---|---|---|
| 1 | **Nebbos Titanium Steel** | `#4A4A52` | Anthracite gray with slight warm undertone. Apple-Titanium-adjacent, Zegna charcoal-suit reference. | **Platform** — the neutral operating substrate |
| 2 | **Nebbos Cedar** | `#6D4C2F` | Zegna camel-tobacco brown. Apple-Bronze-Titanium-adjacent. Warm, personal, in-hand. | **App** — the local native you hold |
| 3 | **Nebbos Oxblood** | `#7B2F2A` | Deep burgundy suit-red. Institutional, not primary. Zegna signature. | **MCP** — the tool substrate that carries the signal (red = the wire) |
| 4 | **Nebbos Obsidian** | `#1D1C22` | Matte deep black. Apple Space Black. Existing `--ink` token on nebbos-site (permanent, weighted). | **USB** — the hardware you trust (black = permanence, security) |

### Why these four hues (Apple × Zegna reasoning)

**Titanium Steel `#4A4A52`** — sits between Apple Graphite (`~#3C3C3D`) and Apple Space Gray (`~#7D7E80`). Warmer than Silver, cooler than Zegna's tobacco range. On light-paper marketing surfaces reads as "engineering precision" (Apple), on dark-ground surfaces reads as "restrained institutional" (Zegna suit charcoal). Universally legible at favicon scale.

**Cedar `#6D4C2F`** — deeper than Zegna's camel (`~#C19A6B`), lighter than Zegna's chocolate (`~#3C2A1E`). Sits where Apple's warmer Titanium finishes go (Titanium Bronze `~#8B7355`) but a shade deeper for print-safe rendering on paper backgrounds. On dark grounds reads as premium hardware; on light grounds reads as wool/leather warmth. NOT a "tech beige" — heavier, more grounded.

**Oxblood `#7B2F2A`** — deliberately NOT Product Red (`#BF0A2C`). Product Red is community-facing, primary-saturation, mass-market. Oxblood is enterprise-institutional — Zegna suit-red, wine-cellar register. Legible as "carries a signal" (the MCP's job) without shouting. Distinct from any traffic-signal red on dashboards.

**Obsidian `#1D1C22`** — this is the existing `--ink` token on `nebbos-site` globals.css (line 76) and matches the ratified Nebbos dark ground (`--paper` on nebbostechnologies-com globals.css). Not a new hex — a durable choice already ratified as brand ink. Reusing it as the USB product color makes the physical device the same color as the brand's ground — "you own the ground it runs on."

### Physical USB tier accents (finish, not new hex)

Founder-directed 2026-09-14 also names tier-level physical accents. Proposed shapes (finish, not color — each tier renders in the product's color body):

- **L1 Basic** — matte finish
- **L2 Privileged** — satin finish
- **L3 Admin** — brushed metal + engraved tier band

Founder ratifies alongside the hex codes.

## Where these tokens live

Both marketing sites carry `--product-color-{platform,app,mcp,usb}` CSS custom properties. Once founder ratifies these four hex codes, the token declarations are the only edits needed:

### `nebbos-site/app/globals.css`

```css
--product-color-platform: #4A4A52;  /* Titanium Steel */
--product-color-app:      #6D4C2F;  /* Cedar */
--product-color-mcp:      #7B2F2A;  /* Oxblood */
--product-color-usb:      #1D1C22;  /* Obsidian */
```

### `nebbostechnologies-com/src/app/globals.css`

Same four declarations. Nested under `:root` after the `--accent` block.

### `@nebbos/brand` v2.1.0 (canonical, deferred)

Once tokens ratify, `@nebbos/brand/tokens.css` ships them centrally and both marketing sites import from there instead of local declarations. Single source of truth per the identity-mark memory.

## Palette anti-patterns explicitly avoided

- **NOT Product-Red primary saturation.** Nebbos MCP-red is institutional, not community-facing. Oxblood not Ferrari.
- **NOT tech-blue.** No `#0066CC` Science-Blue or Palantir-adjacent techy blue anywhere in the product palette. Nebbos-orange (`--accent` `#F6A03F`) remains the SOLE brand-accent hue; the four product colors are grounded neutrals + one deep red.
- **NOT off-the-shelf category colors.** Green-for-eco is not a Nebbos color even though the portfolio includes renewable-grid — the substrate memo (`reference_nebbos_technologies_product_portfolio_2026_09_14`) treats renewables as an infrastructure line, not a green-marketing pitch.
- **NOT dark navy.** Space navy is a common tech-hardware color (Dell XPS, some ThinkPads); Nebbos avoids it because Zegna's institutional gray-brown range reads more distinctive at favicon scale than navy.
- **NOT bright metallics.** Silver/chrome finishes read as consumer electronics; Nebbos hardware target market (regulated, defense, classified) wants matte and depth, not shine.

## Founder decisions still pending

1. **Ratify the four hex codes** (or override any of the four)
2. **Ratify the product-to-color mapping** — the assignment above is the assistant's proposal; founder can swap any pairing
3. **Ratify the tier-accent finish scheme** — matte L1 · satin L2 · brushed+band L3 or an alternate
4. **`@nebbos/brand` v2.1.0 bump** — schedule the package bump that carries the 4-color variant pack + a canonical `tokens.css`

## Composition

- **[[feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13]]** — the mark this palette drives (monochrome via currentColor / stroke color inheritance)
- **[[reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14]]** — the 4-product taxonomy each color anchors to
- **[[feedback_nebbos_marketing_voice_apple_palantir_hybrid]]** — the Apple + Palantir voice rule; this palette adds Zegna as the color-and-materials register alongside Apple's grammar
- **[[reference_nebbos_technologies_three_pillar_positioning_2026_09_14]]** — the four positioning claims; each product's color signals its role in the four-claim story

## Empirical grounding

2026-09-14 founder directive verbatim above. Same-day WebSearch of Apple device color history + Zegna palette references (linked in this doc). Palette candidates derived from the overlap of Apple's neutral-anchored device grammar and Zegna's earth-tone institutional restraint. No hex code was invented outside those two references' spectra. Founder ratifies the four values; the assistant proposes and grounds them.
