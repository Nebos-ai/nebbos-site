# Apple device-marketing patterns for nebbos.ai

**Date**: 2026-09-14 · **Session**: `761a904f` · **Founder directive**: *"look at the most imprevise product websites and what they do when creating marketing websites for devices this is where the apple website for nebbos ai all there css and java classes are important to take into account"*

**Extends**: `feedback_nebbos_marketing_voice_apple_palantir_hybrid` (Palantir layout, Apple language). This doc adds the **device-marketing surface arc** — how a premium hardware product's marketing site is structured, what interactions carry it, and what class/copy conventions Apple uses that translate directly to nebbos.ai's evolution.

**Grounded in**: same-turn WebFetch of `apple.com/macbook-pro/` + `apple.com/apple-vision-pro/` (2026-09-14). Every pattern below is a lift-and-adapt candidate, not verbatim copy.

**Applies to**: `nebbos.ai` (customer surface) and `nebbostechnologies.com` (corporate parent). Both host device-shaped products (Platform · App · MCP · USB); both benefit from device-marketing rhythm.

---

## 1. The section arc — how Apple sequences a device page

Apple's flagship device pages follow a repeatable arc. Twelve to fourteen sections, always in this order:

| # | Section | Purpose | Example text |
|---|---|---|---|
| 1 | **Hero** | Establish the product visually + one tagline pairing a feature and a benefit | *"Fast runs in the family. Now with M5, M5 Pro, and M5 Max."* |
| 2 | **Get the highlights** | 5-item horizontal carousel of the top feature moments | Titled `"Get the highlights."` — literally a section header that reads like a caption |
| 3 | **Take a closer look** | 3D product viewer OR AR-quicklook. On Vision Pro: materials tour ("aluminum alloy frame," "counterbalanced design"). | `"Take a closer look."` — imperative, editorial |
| 4 | **The chip / the engine** | Deep-dive on the specific silicon or core capability | `"Pick your quick. M5. M5 Pro. M5 Max."` |
| 5 | **Performance** | Benchmark tables + oversized numerals | `"Happily ever faster."` — signature Apple copy: pun + specificity |
| 6 | **Built-for-<X>** | Category positioning ("Built for AI. From the silicon up.") | Second flagship section header |
| 7 | **Battery / endurance / durability** | Anti-anxiety copy about how the device holds up under sustained use | `"All-day battery life. Think outside the outlet."` |
| 8 | **OS / software layer** | What the device runs; the platform experience it enables | `"Fresh faced. Timelessly Mac."` |
| 9 | **Continuity / ecosystem** | How the device composes with the rest of the platform family | `"Even better together."` |
| 10 | **Apps / ecosystem tiles** | 9-tile grid of app category examples | `"Your ambitions. There's an app for that."` |
| 11 | **Display · Camera · Ports · Security** | 3-column technical proof — the "spec confidence" section | Icon + headline + one-sentence explanation |
| 12 | **Values / privacy / security** | Not buried. Independent late section, icon + headline + single-sentence trust claim | Optic ID example: *"data is private and encrypted, and it never leaves your device"* |
| 13 | **Upgrade / trade-in** | Conditional CTA — messaging changes by what the buyer is coming from | `"Why Apple is the best place to shop"` — 8 collapsible incentive blocks |
| 14 | **Related products** | 2-column compare (this vs. sibling model) | MacBook Air ↔ MacBook Pro |
| Footer | **Buy / Book a demo** | Dual CTAs. Experience before purchase for premium hardware. | Vision Pro: `"Book a demo"` + `"Buy"` in that order |

**Rule for nebbos.ai**: any product-detail page under `/product/<slug>` (platform · app · mcp · usb) SHOULD hit sections 1, 2, 4, 5, 6, 11, 12, 13 at minimum. Sections 3 (physical tour) and 9 (ecosystem) are USB-specific — the USB is the only physical device in the portfolio.

## 2. Copy voice — signature Apple sentence patterns

Beyond the general Apple-language rule in the Palantir/Apple-hybrid memory, device pages use these specific patterns:

| Pattern | Apple example | Nebbos adaptation |
|---|---|---|
| **Verb + concise object.** Section headers as complete imperative sentences with a period. | `"Get the highlights."` · `"Take a closer look."` | `"Watch it run."` · `"Hold it in your hand."` |
| **Product-name + past-participle punch.** Introduces the flagship claim in three words. | `"iPhone. Reimagined."` | `"Nebbos MCP. Attested."` · `"The USB. Hardened."` |
| **Pun + specificity paired.** Playful headline that immediately anchors on a real number. | `"Happily ever faster."` (then 24-hour battery + M5 benchmarks) | `"Peace of mind at line rate."` (then FIPS 140-3 L3 + 12 ms latency) |
| **Parallel-structure escalation.** Two clauses, same shape, second one bigger. | `"Big power. Even bigger battery life."` | `"Serious security. Even more serious sovereignty."` |
| **Category ownership in two words.** Names the audience-segment as a declarative. | `"For pros."` · `"For everyone."` | `"For governments."` · `"For teams."` |
| **Feature + benefit paired in the tagline.** Not just the feature, not just the benefit — the pairing. | `"New powerful M5 chip and comfortable Dual Knit Band."` | `"K350 substrate and biometric-gated tier access."` |

**Sentence-length rule** (inherited): median 12-16 words in body copy. Never over 20. Line-breaks in H1s to pace the reading (Apple: `"Design worth the wait. / Speed you can feel."`).

## 3. Interaction patterns — how Apple pages behave on scroll

Detected from the markup (both pages):

- **Sticky local nav** anchored to top after hero scroll-past. Contains 3-5 section anchors + primary CTA. Apple uses `#ac-ln-menustate` as the state hook.
- **Video frame crossfades**. Hero images ship as `_startframe_` + `_endframe_` pairs; the section fades between them on entry. Naming convention: `hero_endframe__<hash>_<size>.jpg`.
- **Section-anchored full-viewport moments**. Big features get their own 100vh slot; user scrolls one full screen per feature. Not endless-scroll — discrete moments.
- **3D product viewer with toggle chips**. Rotate the device, toggle color/size/finish inline. On MacBook Pro: `pv_hero_endframe`, `pv_colors_spaceblack__`, `pv_display__`, `pv_connectivity__` — every product-viewer variant is a discrete asset.
- **AR quicklook** via `.usdz` link ("View in your space"). For a physical device page like Nebbos USB, this is the analog of a 3D-preview embed.
- **Expandable / collapsible incentive blocks** on the shop-CTA section. Uses native `<details>` or an equivalent.
- **Replay button** on hero loops — the visitor can re-trigger the crossfade animation.
- **Reduced-motion respect** — every scroll-triggered animation has a `prefers-reduced-motion` fallback.

**Rule for nebbos.ai**: match the scroll rhythm. Sticky local nav after hero. Discrete section-anchored moments. Never endless-scroll. All scroll-driven CSS goes through `animation-timeline: view()` per the existing nebbostechnologies-com pattern in `globals.css`.

## 4. Class-naming conventions — what Apple uses

Apple's marketing pages do **not** use BEM or Tailwind for CSS classes. From the HTML markup:

- **Image assets** use a hash-versioned pattern: `{section}_{state|feature}__{hash}_{size}.{ext}`
  - Examples: `hero_endframe__fwev9ebh42mq_xlarge.jpg` · `performance_mx_chip_background_endframe__bs7veukzx7yu_large.jpg` · `pv_colors_spaceblack__cxvhfsafswaa.jpg`
- **Local nav state** uses fragment-target CSS: `#ac-ln-menustate` (the checkbox-hack sticky-nav toggle pattern)
- **Product viewer** components use `pv_*` prefix
- **Media gallery** components use `media-card-gallery-item-N` positional naming
- Underlying CSS classes not fully exposed to WebFetch (aggressively minified/prefixed at build), so BEM/Tailwind imitation isn't the ask — the ask is the **shape**: assets versioned by section/feature/state, no cross-page class leakage, each section is its own module.

**Rule for nebbos.ai**: adopt **section-scoped module classes**. Every band component owns its `.band-<name>__<part>` namespace. No global class shadowing. Every scroll-triggered asset gets a `_startframe` / `_endframe` naming pair when it's a state animation.

## 5. Grid + layout — the container rhythm

- **Hero**: 1-column full-viewport with tagline centered or offset-baseline
- **Highlights carousel**: 1-col mobile → 3-5 col desktop, horizontal scroll on mobile
- **Feature deep-dive**: 3-column desktop for chip/finish/spec cards
- **App ecosystem**: 9-tile grid (3×3 desktop, 1-col mobile)
- **Compare sections**: 2-column side-by-side (MacBook Air vs. Pro)
- **Container padding**: consistent 24 / 32 / 48px stops. Apple uses CSS custom properties, likely `--apple-container-pad-*` (not exposed in markup).

**Rule for nebbos.ai**: our tokens already exist (`--container-max: 1240px` · `--container-narrow: 780px` · `--space-6: 24px` · `--space-8: 32px` · `--space-12: 48px`). We're aligned in principle; the discipline is *use these consistently across bands*, never inline pixel values.

## 6. Color + type — what to lift

- **Palette**: light bg, dark type; product finishes named ("Space Black," "Silver") that appear only in the 3D viewer, not as chrome. Accent colors used sparingly, never for structure.
- **Type**: hero massively scaled (Apple uses SF Pro Display at ~80-120px for hero headlines). Section headers at ~40-56px. Body at 16-18px with generous 1.5-1.6 line-height. Stats/callouts at 60-120px, tight tracking.

**Rule for nebbos.ai**: our type scale already goes to `--size-hero-massive: clamp(56px, 13vw, 220px)` — plenty of room. The discipline is using it *on the sections that deserve it* (hero + one signature feature moment per product page) and not diluting it across every section.

## 7. Security / privacy section — the pattern Nebbos USB should adopt directly

Vision Pro's Values section is a template for the Nebbos USB product page:

- **Positioning**: independent late section, not buried in specs. Between the ecosystem/apps material and the shop CTA.
- **Structure**: icon + headline + single-sentence trust claim.
- **Apple's example**: *"Use Optic ID to authorize purchases and unlock passwords with the uniqueness of your iris. Face and iris data is private and encrypted, and it never leaves your device."*
- **Nebbos USB translation**: *"Approve every elevated action with your device's biometric — Touch ID · Face ID · Windows Hello. The private key never leaves your Secure Enclave. Physical presence of your Nebbos USB unlocks tier-two operations; enclave-signed approval unlocks admin."*

**Structure**: three cards, each icon + headline + one sentence:
1. **Biometric** — device-native, never transmitted, per-action
2. **Physical presence** — the USB carries the MCP, gates elevated tiers
3. **Enclave-signed approval** — for admin operations; multi-party quorum available

## 8. The physical-device tour — the pattern the Nebbos USB page uses uniquely

Vision Pro's "Take a closer look" section covers materials. For Nebbos USB, the parallel is:

- **FIPS 140-3 Level 3 encrypted storage** — tamper-evident + epoxy-sealed
- **On-device OLED keypad** — PIN entry never traverses the host
- **IP68 + MIL-STD-810G ruggedness** — field-deployable
- **TAA-compliant supply chain** — no adversarial-jurisdiction components
- **Color-coded body + tier accent** — product identity by flower-of-life color; tier identity by finish (matte L1 · satin L2 · brushed metal L3)

**Layout**: carousel of zoomed detail shots, each with a short caption. `_startframe` / `_endframe` crossfades on entry.

## 9. Section-title library — imperative editorial rhythm

Apple's section titles are always **complete sentences ending in a period**. Not labels. Not fragments. Not gerunds. Not marketing-speak.

Adaptation library for nebbos.ai / nebbostechnologies.com:

| Section | Apple pattern | Nebbos adaptation |
|---|---|---|
| Highlights | `"Get the highlights."` | `"See what you own."` |
| Physical tour | `"Take a closer look."` | `"Hold it in your hand."` · `"See how it's built."` |
| Chip / core | `"Pick your quick."` | `"Pick your tier."` · `"Choose your ground."` |
| Performance | `"Happily ever faster."` | `"Serious operators. Faster still."` |
| AI moment | `"Built for AI. From the silicon up."` | `"Attested from the silicon up."` |
| Battery | `"All-day battery life. Think outside the outlet."` | `"Sovereign at every level."` · `"Peace of mind, always." |
| OS layer | `"Fresh faced. Timelessly Mac."` | `"Fresh face. Timelessly yours."` |
| Continuity | `"Even better together."` | `"One matrix. Every product."` |
| Apps | `"Your ambitions. There's an app for that."` | `"Your mandate. There's a Pearl for that."` |
| Values | (icon + headline + sentence, no big title) | (same shape — biometric · USB · enclave) |
| Shop CTA | `"Why Apple is the best place to shop."` | `"Why the platform ships with the hardware."` |
| Related | (Air vs. Pro compare) | (L1 vs. L2 vs. L3 compare per product) |

## 10. What to build first on nebbos.ai

Priority order for the next wave (post this session's `/products` landing):

1. **Per-product pages** — `/product/platform`, `/product/app`, `/product/mcp`, `/product/usb` — each follows section arc #1-#14 above.
2. **The USB product page first** (highest visual leverage; physical device unlocks the whole Apple-device-marketing playbook).
3. **Sticky local nav** as a shared component consumed by every product page.
4. **Video crossfade primitive** as a shared component (startframe/endframe pattern, respects reduced-motion).
5. **3-column values/security section** as a shared component (icon + headline + one-sentence — used on every product page).
6. **9-tile app-ecosystem grid** as a shared component (used on Platform + App pages, showing what Pearls run).

## 11. What NOT to lift from Apple

Not everything transfers. Explicitly do NOT:

- **Adopt Apple's minified `.class-<hash>` compiled naming** — we author in Next.js / Tailwind / CSS modules. Our source classes must be readable in the repo.
- **Copy Apple's carousel component with autoplay** — WCAG concerns; Nebbos surfaces respect prefers-reduced-motion by default, and Apple's own reduced-motion fallback is basic. We do better.
- **Copy Apple's "shop incentives" collapsible pile** — Nebbos does not sell to consumers; the enterprise-procurement analog is a `/contact` funnel + custom quote, not a stack of trade-in offers.
- **Copy Apple's marketing-adjacent hyperbole** — Apple's "impossibly thin," "revolutionary" language is banned by the existing Palantir/Apple-hybrid memory (specificity beats adjectives). Nebbos body copy stays measurable.

## 12. Cross-references

- **`feedback_nebbos_marketing_voice_apple_palantir_hybrid`** — the parent voice rule (Palantir layout + Apple language). This doc extends it with device-marketing surface arc + interaction patterns.
- **`reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14`** — the 12-SKU taxonomy this design vocabulary serves.
- **`feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14`** — the four-pillar customer framing; each pillar gets a per-product page following the Apple arc.
- **`reference_nebbos_technologies_three_pillar_positioning_2026_09_14`** — the four claims (secure system perf · personal company AI · sovereignty · build your own platform); each claim is a copy touchpoint inside section 6 (Built-for-X).
- **`feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13`** — the flower-of-life mark rendered per product in its color; the mark is the identity anchor across every product page hero.
- **App-side**: `content/products.ts` (typed registry, this session) + `app/products/page.tsx` (taxonomy landing, this session) — this doc names the *next* step: per-product deep-dive pages.

## 13. Empirical grounding

WebFetch of `apple.com/macbook-pro/` and `apple.com/apple-vision-pro/` on 2026-09-14. Both pages analyzed for section structure, copy voice, interaction patterns, class conventions, grid, palette, and security-section shape. Findings synthesized against the existing Palantir/Apple-hybrid voice memory (which covers language + register but not the device-marketing surface arc).

Nothing in this doc is Apple-owned IP; the observations are *pattern* extractions (structure, sequence, sentence shape). Every adaptation is Nebbos-native.
