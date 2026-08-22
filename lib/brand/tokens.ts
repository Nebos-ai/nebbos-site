/**
 * Nebbos marketing brand tokens — delta-brief-editorial (single system).
 *
 * Per 2026-08-22 founder directive: "every level of the front end every level
 * of the design system needs to all be uniformed". Retired: the
 * `@nebbos/brand` package (Blue Aura / OKLCH product-UI variant). The sole
 * Nebbos brand across every surface is delta-brief-editorial — paper-white,
 * Trust 3A + Host Grotesk, orange-plus accent, cut-corner cards.
 *
 * This file is the typed projection of the same values that live in
 * `app/globals.css` (also mirrored from
 * `~/.claude/skills/delta-brief-editorial/assets/tokens.css`). Consumers that
 * need the tokens in TS/JS contexts (Satori/next-og images, chart libraries,
 * motion configs) import from here; consumers that need CSS custom properties
 * consume the vars defined in globals.css.
 *
 * When the delta-brief-editorial skill body moves, both this file and
 * globals.css move with it in lockstep.
 */

/** Brand palette — delta-brief-editorial (paper-first, orange accent, navy support). */
export const color = {
  /* Paper — background layers, lightest to darkest */
  paper: "#FFFFFF",
  paper2: "#EDEEEB",
  paper3: "#E1DAD0",

  /* Ink — text scale, darkest to lightest */
  ink: "#1D1C22",
  ink2: "#3F4045",
  ink3: "#606162",
  muted: "#5F6067",

  /* Navy — cool accent, sparingly */
  navy: "#557994",
  navy2: "#6B8089",
  navy3: "#A3C1DB",
  navy4: "#557994",

  /* Gold / accent — the Nebbos brand orange */
  accent: "#A36630",
  accent2: "#F6A03F",
  gold: "#A36630",
  gold2: "#F6A03F",

  /* Semantic — reserved for confirmed status only */
  success: "#3F7A5C",
  warning: "#B8862B",

  /* Rules */
  rule: "#D8D6D5",
  rule2: "#E7E7E7",

  /* Dark-theme mirrors (for surfaces that opt into dark) */
  darkPaper: "#1D1C22",
  darkPaper2: "#1B1B20",
  darkPaper3: "#232329",
  darkInk: "#F4F4F6",
  darkInk2: "#C9CACF",
  darkInk3: "#9C9C9D",
  darkMuted: "#7E7F87",
  darkAccent: "#F6A03F",
  darkAccent2: "#FDDA88",
  darkRule: "#2E2E34",
  darkRule2: "#212127",
} as const;

/** Border radius scale — delta-brief-editorial defaults + cut-corner signature. */
export const radius = {
  none: "0",
  sm: "2px",
  md: "4px",
  lg: "8px",
  /** Emphasis-card signature: single top-right cut corner. */
  cut: "0 30px 0 0",
} as const;

/** Font-family stacks — the host provides --font-* CSS variables from next/font. */
export const font = {
  serif:
    'var(--font-newsreader), "trust-3a", "Trust 3A", "Newsreader", "Charter", "Iowan Old Style", Georgia, serif',
  sans: 'var(--font-host-grotesk), "Host Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  mono: 'var(--font-jetbrains-mono), "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
} as const;

/** Fluid type ramp for marketing pages (matches globals.css scale). */
export const fontSize = {
  xs: "0.75rem",
  sm: "0.8125rem",
  base: "0.9375rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.375rem",
  "2xl": "1.75rem",
  "3xl": "2.25rem",
  "4xl": "3rem",
  "5xl": "4rem",
} as const;

/** Motion easings — kept sparse; the editorial register avoids showy motion. */
export const easing = {
  standard: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  linear: "linear",
} as const;

/** Layered z-index scale for marketing pages. */
export const zIndex = {
  base: 0,
  raised: 1,
  overlay: 10,
  modal: 100,
  toast: 1000,
} as const;

/**
 * Legacy marketing aliases retained for older TS call sites (pre-delta-brief
 * naming). Prefer the top-level `color` / `font` exports for new code.
 */
export const legacy = {
  color: {
    ink900: color.ink,
    ink800: color.ink2,
    ink700: color.ink3,
    ink600: color.ink3,
    paper: color.paper,
    mist: "rgba(29, 28, 34, .60)",
    faint: "rgba(29, 28, 34, .40)",
    /* legacy names for accent — mapped to editorial orange */
    blue: color.navy,
    blueDeep: color.navy2,
    blueSoft: color.navy3,
    sky: color.navy3,
    tomato: color.accent2,
    hairline: color.rule,
  },
  font: {
    sans: font.sans,
    mono: font.mono,
  },
  layout: {
    contentMax: "1160px",
    letterSpacingTightest: "-0.04em",
  },
} as const;

export const layout = legacy.layout;

/** Default export — the palette (backwards-compat with @nebbos/brand default). */
export default color;
