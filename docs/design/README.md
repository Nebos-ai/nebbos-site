# nebbos.ai design substrate v3

**Ratified 2026-09-16.** Supersedes v2 Institutional Reserve editorial register.

The load-bearing spec for every visual + interaction decision on the marketing site. Every primitive, every page, every future PR compiles against this document.

## Register

**Product-catalog** — the shape of the site is a stack of product tiles. Rendered as: eyebrow (mono uppercase) + big sans headline + one-line tagline + two CTAs (Learn more / Contact). No editorial magazine spreads. No chapter numerals in page bodies. No italic-gold accents in H1/H2 (retained as narrow editorial emphasis inside prose only).

Reference: apple.com home-page tile pattern (curl-verified 2026-09-16).

## Emotional register

Peace of mind + safety. Every headline, every image direction runs through that filter.

## The five substrate layers

```
@layer reset, tokens, primitives, patterns, page
```

Every rule in `app/globals.css` and every future CSS declaration lives in exactly one of these layers. Ordered specificity — no `!important` anywhere in the codebase.

- **reset** — minimal opinionated CSS reset. Sits in `app/globals.css` (rules ~50–110).
- **tokens** — every color, space, type, motion, layout, radius, z value as CSS custom properties. Emitted by `components/tokens/tokens.css`, typed by `components/tokens/tokens.ts`. Zero literals allowed in downstream layers.
- **primitives** — reusable-component styles (`Button`, `PageHero`, `PageSection`, `Eyebrow`, `Numeral`). Each primitive is one file, className-only, consumes only tokens. Ships in Phase 2.
- **patterns** — page-shape sections (`HomePattern`, `ProductGridPattern`, `SolutionsPattern`). Compose primitives. Ships in Phase 3.
- **page** — route-specific rules. Migrated per-route out of `app/globals.css` as Phase 3 sweeps.

## Type scale — modular, mathematical

1.25 major-third from 15px body base. No hand-picked clamps.

```
--fs-hero     56 → 96 px    tile-headline hero shot
--fs-display  44 → 67 px    page-opener H1
--fs-h1       36 → 44 px    section-major
--fs-h2       28 → 36 px    section-minor
--fs-h3       22 → 28 px    sub-heading
--fs-body-lg  18 → 21 px    deck, lede
--fs-body     15 → 17 px    body
--fs-eyebrow  11 px         mono uppercase, tracked
--fs-micro    10.5 px       captions
```

Zero hardcoded `clamp()` outside `tokens.css`. CI-gated.

## Space ladder — 8-based

```
--space-1..12   4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192 · 256 px
```

Zero hardcoded pixel padding / margin / gap in `components/primitives/*`, `components/composites/*`, `components/patterns/*`, `app/*`. CI-gated.

## Color — OKLCH primary, product-catalog register

- **Ground**: `--color-paper` (`oklch(100% 0 0)` — pure white), `--color-paper-2` (Apple off-white)
- **Ink**: `--color-ink` (near-black), `--color-ink-2`, `--color-ink-3`, `--color-muted`
- **Rule**: `--color-rule` (single hairline), `--color-rule-2` (softer)
- **Accent**: `--color-accent` (Nebbos orange, from flower mark). Used SPARINGLY.
- **Secondary**: `--color-gold` (editorial emphasis in prose), `--color-focus` (WCAG-visible blue focus ring)

All declared in OKLCH for perceptual uniformity + `color-mix()` interpolation + `@property` animation.

## Motion — restrained

Five durations (75/120/180/275/400ms), four easings (out/in/inOut/settle). Every animation respects `prefers-reduced-motion: reduce`.

View Transitions API on same-origin navigations. Speculation Rules on hover-prefetch. No JS animation libraries in the primitive layer.

## Security posture

Enforced by `middleware.ts` on every request:

- **CSP with per-request nonce** — `default-src 'self'; script-src 'self' 'nonce-xxx' 'strict-dynamic'; frame-ancestors 'none'; object-src 'none'`
- **HSTS** — `max-age=63072000; includeSubDomains; preload` (2 years)
- **X-Frame-Options: DENY** (defense-in-depth vs frame-ancestors CSP)
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Permissions-Policy** — locks down every browser API this site does not use (30+ features denied)
- **Cross-Origin-Opener-Policy: same-origin** (isolates window.opener)
- **Cross-Origin-Resource-Policy: same-origin**

No inline scripts without a nonce. No `unsafe-eval`. No third-party scripts outside allowlisted CDN. Every external font is self-hosted or SRI-hashed.

## Rendering

RSC-first. Client boundary only for `WebVitalsReporter` + View Transition state. Every fetch server-side through typed server actions. Zero client-side secrets.

Bundle budget: 100KB gzip initial JS. Enforced at CI.

## Type safety

TypeScript strict + `noUncheckedIndexedAccess` + `noImplicitOverride` + `noFallthroughCasesInSwitch`. Zero `any`, zero `as unknown as`. Every indexed access checked at compile time.

## Testing pyramid

- axe-core WCAG 2.2 AA on every route — blocking CI (shipped)
- Lighthouse ≥95 all four categories — blocking CI (shipped)
- Vitest unit for every primitive — Phase 2
- Playwright integration + visual regression — Phase 2/3

## CI gates (all blocking on main)

Existing:
- `Analyze (actions/javascript-typescript/python)` — CodeQL
- `axe-core WCAG 2.2 AA` — WCAG 2.2 AA
- `lighthouse-ci` — perf/a11y ≥95
- `floor / Nebos-ai governance floor` — grep gates for retired vocab

Landing with substrate v3 (Phase 1):
- `tsc --noEmit` with strict + `noUncheckedIndexedAccess`
- vocab-guard extended

Landing in Phase 2:
- `grep 'clamp('` outside `components/tokens/` + `globals.css` = FAIL
- `grep 'style={{[^}]*fontFamily\|fontSize\|padding\|gap: '` in `components/primitives/` = FAIL
- `grep '\bany\b'` in `.ts/.tsx` outside `tests/` = FAIL
- Bundle-size regressor = FAIL
- CSP linter (any inline `<script>` or `<style>` without nonce) = FAIL
- HTTP headers linter (curl live URL, verify HSTS + CSP + X-Frame set) = FAIL
- Broken-link + broken-image checker = FAIL

## Directory structure

```
app/                              route files only
components/
  tokens/                         tokens.ts + tokens.css (SUBSTRATE — Phase 1)
  primitives/                     PageHero, PageSection, Button, Eyebrow, Numeral (Phase 2)
  composites/                     ProductTile, StatCard (Phase 2)
  patterns/                       HomePattern, ProductGridPattern (Phase 3)
  site/                           SiteHeader, SiteFooter, WebVitalsReporter (global chrome)
  sections/                       DEPRECATED — migrating out to patterns/
  ui/                             DEPRECATED — migrating out to primitives/
content/                          typed content registry
lib/                              helpers, types, security utils
middleware.ts                     CSP nonce + security headers (Phase 1)
tests/                            unit, integration, a11y, visual (Phase 2)
docs/design/                      this spec + every primitive documented
packages/brand/                   FUTURE — extractable DS package for future consolidated app frontend
```

## Governance

Every future PR compiles against this document. Change to any doctrine (register, tokens, security posture, layer order) is an amendment to this file — grep + Read the amendment before proposing further work.

## Roadmap

- **Phase 1 (this PR)** — tokens.ts + tokens.css + middleware.ts + security headers + tsconfig strictness + this spec. Foundation.
- **Phase 2** — primitives library: `PageHero`, `PageSection`, `Button`, `Eyebrow`, `Numeral`, `Prose`, `Stat`, `Card`, `Tile`. Each in its own file, className-only, tokens-only.
- **Phase 3** — per-route migration sweep. Every `app/*` rewires to compose primitives. Blocking CI enforces no hardcoded `clamp()`, no inline style-with-fontSize/padding, no mixed className+style.
- **Phase 4** — package extraction: `packages/brand` as npm-installable, semver-versioned. Future consolidated app frontend (`nebbos.app` / `app.nebbos.ai`) installs it and gets uniform DS from day 1.

## Cross-refs

- Doctrine: 2026-09-16 rebuild-not-patch (`feedback_doctrine_shift_mid_flight_rebuild_not_patch_2026_09_16`)
- Doctrine: 2026-09-14 product framing (`feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14`)
- Doctrine: 2026-09-14 4-product × 3-tier matrix (`reference_nebbos_customer_product_matrix_4_products_3_tiers_12_skus_2026_09_14`)
- Doctrine: 2026-09-13 flower-of-life identity (`feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13`)
- Doctrine: 2026-09-14 peace-of-mind + safety hero register (`reference_nebbos_technologies_three_pillar_positioning_2026_09_14`)
- Prior ADR (partially superseded): `ADR-PROV-nebbos-front-end-estate-substrate` v1.2 (2026-08-23) — two-register model retained; register-specific token values in this doc supersede v1.2 marketing-register decisions where they conflict
