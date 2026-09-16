/**
 * components/tokens/tokens.ts · nebbos.ai design substrate v3 · 2026-09-16
 *
 * Typed design tokens — the single source of truth for every color,
 * type-scale slot, spacing step, motion primitive, and radius on
 * nebbos.ai. Every primitive component consumes tokens through this
 * module (or the paired tokens.css runtime); no hard-coded pixel /
 * clamp / color values are permitted in `components/primitives/*`,
 * `components/composites/*`, `components/patterns/*`, or `app/*`.
 *
 * Governance (2026-09-16 substrate-v3 ratification):
 *   - Retires the drifted `design/tokens.json` (warm-cream + Newsreader
 *     stack that never actually shipped) and the drifted `globals.css`
 *     values (Fraunces/Manrope/Fira Code) — both replaced by this
 *     product-catalog register.
 *   - Modular type scale: 1.25 major-third from a 15px body base, mapped
 *     to fluid clamp() ranges over the 375px → 1440px viewport window.
 *   - 8-based space ladder: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
 *   - OKLCH color primitives with rgb() runtime fallbacks. Every color
 *     also emitted as a --token CSS custom property (see tokens.css).
 *   - Cascade layers: this module is consumed only inside `@layer tokens`
 *     of globals.css.
 *
 * Every export is a `const` with an explicit type. TypeScript compile
 * fails at any typo in a token key (unlike a stringly-typed CSS var
 * accessor). Consumers import individual tokens or the whole namespace:
 *
 *   import { color, space, type } from "@/components/tokens/tokens";
 *   <div style={{ color: color.ink, padding: space[6] }}>
 *
 * Or CSS-side via `var(--color-ink)`, `var(--space-6)`, `var(--fs-h2)`.
 * Both accessors compile to the same runtime value.
 *
 * Future extraction: this module (+ tokens.css + primitives/) becomes
 * `packages/brand/` — the semver-versioned DS package the future
 * consolidated app frontend (`nebbos.app` / `app.nebbos.ai`) installs.
 */

/* ────────────────────────────────────────────────────────────────────
 * COLOR — the product-catalog register (Apple-adjacent, Nebbos-branded)
 *
 * Grounds: warm-neutral off-white for surfaces; deep near-black ink for
 * foreground. One accent (Nebbos orange, from the flower mark). Two
 * secondary tones (gold for editorial emphasis, tabular blue for data).
 *
 * All declared in OKLCH first (perceptually uniform, animatable via
 * @property + color-mix), rgb() fallback for older browsers.
 * ──────────────────────────────────────────────────────────────────── */

export const color = {
  /** Site ground. Pure white for product-catalog register (Apple.com pattern). */
  paper: "oklch(100% 0 0)",
  /** Elevated surface — cards, tiles, section-alt. Apple off-white parity. */
  paper2: "oklch(97.5% 0.002 106)",
  /** Deeper elevation — hover states, pressed. */
  paper3: "oklch(95% 0.003 106)",

  /** Body ink — near-black warm. */
  ink: "oklch(15% 0.006 258)",
  /** Secondary text — 60% ink. */
  ink2: "oklch(38% 0.006 258)",
  /** Tertiary text — mono, captions, disabled. */
  ink3: "oklch(55% 0.006 258)",
  /** Muted — placeholder, hint. */
  muted: "oklch(72% 0.005 258)",

  /** Hairline divider. 1px only. */
  rule: "oklch(87% 0.003 106)",
  /** Softer sub-hairline. */
  rule2: "oklch(93% 0.003 106)",

  /**
   * Primary accent — Nebbos orange (from flower mark `#F6A03F`).
   * Used SPARINGLY: brand mark, one CTA per view, focus rings.
   */
  accent: "oklch(75% 0.155 60)",
  /** Deeper accent for hover / active states. */
  accentDeep: "oklch(65% 0.155 55)",

  /** Editorial emphasis in headlines — italic-gold from delta-brief. */
  gold: "oklch(52% 0.1 70)",
  /** Light gold for dark-ground surfaces. */
  goldLight: "oklch(85% 0.08 85)",

  /** Focus ring color — high-contrast blue, WCAG-visible against paper + ink. */
  focus: "oklch(58% 0.2 258)",

  /** Success (positive-emphasis) — restrained. */
  success: "oklch(58% 0.15 155)",
  /** Warning (advisory) — restrained. */
  warning: "oklch(72% 0.15 75)",
  /** Danger (destructive) — restrained. */
  danger: "oklch(58% 0.2 25)",
} as const;

export type ColorToken = keyof typeof color;

/* ────────────────────────────────────────────────────────────────────
 * SPACE — 8-based ladder
 * ──────────────────────────────────────────────────────────────────── */

export const space = {
  0: "0",
  /** 4px */
  1: "0.25rem",
  /** 8px */
  2: "0.5rem",
  /** 12px */
  3: "0.75rem",
  /** 16px */
  4: "1rem",
  /** 24px */
  5: "1.5rem",
  /** 32px */
  6: "2rem",
  /** 48px */
  7: "3rem",
  /** 64px */
  8: "4rem",
  /** 96px */
  9: "6rem",
  /** 128px */
  10: "8rem",
  /** 192px */
  11: "12rem",
  /** 256px */
  12: "16rem",
} as const;

export type SpaceToken = keyof typeof space;

/* ────────────────────────────────────────────────────────────────────
 * TYPE — modular scale 1.25 major-third from 15px body
 *
 * Every step: fluid clamp() from mobile (375px) → desktop (1440px).
 * Mathematical progression, not hand-picked. Consumers reference by
 * slot name (--fs-h2) not by pixel value.
 * ──────────────────────────────────────────────────────────────────── */

export const type = {
  family: {
    /** Space Grotesk — geometric sans, display + body. Loaded via next/font. */
    sans: "var(--font-space-grotesk, ui-sans-serif, system-ui, sans-serif)",
    /** Fira Code — mono for eyebrows, numerals, code. */
    mono: "var(--font-mono, ui-monospace, SFMono-Regular, monospace)",
  },
  /**
   * Fluid type scale. Modular 1.25 from 15px body:
   *   body     = 15px      →  17px   at desktop
   *   body-lg  = 18.75px   →  21.25px
   *   h3       = 23.44px   →  26.56px
   *   h2       = 29.30px   →  33.20px
   *   h1       = 36.62px   →  41.50px
   *   display  = 45.78px   →  67.20px  (wider clamp for hero impact)
   *   hero     = 57.22px   →  96.00px  (largest tile-headline)
   *   eyebrow  = 11px      →  12px     (mono, small caps)
   *   micro    = 10.5px    →  11px
   */
  size: {
    hero:     "clamp(3.5rem, 5.5vw + 1rem, 6rem)",
    display:  "clamp(2.75rem, 3.5vw + 1rem, 4.2rem)",
    h1:       "clamp(2.25rem, 2.5vw + 1rem, 2.75rem)",
    h2:       "clamp(1.75rem, 1.8vw + 1rem, 2.25rem)",
    h3:       "clamp(1.35rem, 0.6vw + 1rem, 1.75rem)",
    bodyLg:   "clamp(1.125rem, 0.25vw + 1rem, 1.3125rem)",
    body:     "clamp(0.9375rem, 0.1vw + 0.875rem, 1.0625rem)",
    eyebrow:  "0.6875rem",
    micro:    "0.65rem",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  leading: {
    tight: 1.05,
    heading: 1.15,
    body: 1.5,
    loose: 1.7,
  },
  tracking: {
    tight: "-0.028em",
    normal: "-0.011em",
    wide: "0.02em",
    caps: "0.16em",
  },
} as const;

export type TypeSizeToken = keyof typeof type.size;
export type TypeFamilyToken = keyof typeof type.family;
export type TypeWeightToken = keyof typeof type.weight;

/* ────────────────────────────────────────────────────────────────────
 * MOTION — durations, easings, springs
 * ──────────────────────────────────────────────────────────────────── */

export const motion = {
  duration: {
    /** Instant micro-feedback (75ms). */
    instant: "75ms",
    /** Hover transitions (120ms). */
    fast: "120ms",
    /** Default component transitions (180ms). */
    default: "180ms",
    /** Section entry, ScrollReveal (275ms). */
    slow: "275ms",
    /** View Transitions, page morph (400ms). */
    page: "400ms",
  },
  easing: {
    /** Ease-out · component enter. */
    out: "cubic-bezier(0.22, 1, 0.36, 1)",
    /** Ease-in · component exit. */
    in: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    /** Ease-in-out · property change. */
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    /** Settle · generous decel, section enter. */
    settle: "cubic-bezier(0.19, 1, 0.22, 1)",
  },
} as const;

/* ────────────────────────────────────────────────────────────────────
 * LAYOUT — container widths, gutters, section rhythm
 * ──────────────────────────────────────────────────────────────────── */

export const layout = {
  container: {
    /** Marketing content max-width. */
    max: "77.5rem",     // 1240px
    /** Container side padding. */
    gutter: "1.5rem",   // 24px
    /** Narrow container for prose / dense forms. */
    narrow: "48rem",    // 768px
    /** Wide container for full-bleed heroes. */
    wide: "100%",
  },
  measure: {
    /** Optimal reading measure. */
    prose: "72ch",
    /** Max characters per line for h1/h2. */
    title: "22ch",
    /** Deck / lede line-length. */
    deck: "56ch",
  },
  section: {
    /** Default section vertical padding. */
    y: "clamp(3rem, 6vh, 6rem)",
    /** One-idea-per-viewport panel. */
    monoMin: "88vh",
    /** Full-bleed hero min-height. */
    heroMin: "min(88vh, 56.25rem)",
  },
} as const;

/* ────────────────────────────────────────────────────────────────────
 * RADIUS + Z-INDEX + BREAKPOINTS
 * ──────────────────────────────────────────────────────────────────── */

export const radius = {
  none: "0",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "1rem",
  full: "9999px",
  /** Signature cut-corner: top-right only. */
  cutCorner: "0 1.875rem 0 0",
} as const;

export const z = {
  base: 0,
  raised: 1,
  overlay: 10,
  scrim: 20,
  header: 30,
  modal: 40,
  toast: 50,
} as const;

export const breakpoint = {
  sm: "24rem",   // 384px
  md: "48rem",   // 768px
  lg: "64rem",   // 1024px
  xl: "80rem",   // 1280px
  xxl: "96rem",  // 1536px
} as const;

/* ────────────────────────────────────────────────────────────────────
 * VERSION + META
 * ──────────────────────────────────────────────────────────────────── */

export const meta = {
  version: "3.0.0",
  register: "product-catalog" as const,
  ratified: "2026-09-16",
} as const;
