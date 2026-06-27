// Nebbos marketing brand tokens.
//
//
// brand truth, consumed by BOTH Folio (@nebos/ui) and this marketing site. This
// file no longer DEFINES tokens — it RE-EXPORTS the package's typed tokens so
// every value lives in one place (a rebrand is a package version bump).
//
// The package's typed surface (color/radius/font/fontSize/easing/zIndex) is
// re-exported verbatim below. The marketing site historically referenced a few
// legacy token names that the package's canonical schema renamed or dropped; a
// thin `legacy` compatibility map bridges those so any TS/JS consumer keeps
// working. The runtime CSS custom properties are bridged separately in
// app/globals.css (which imports @nebbos/brand/theme.css and aliases the
// marketing var names onto the package's canonical vars).

export * from "@nebbos/brand/tokens";
export { default } from "@nebbos/brand/tokens";

import { color as brandColor, font as brandFont } from "@nebbos/brand/tokens";

/**
 * Legacy marketing token aliases → @nebbos/brand canonical values.
 *
 * Kept so older TS call sites that referenced the pre-package names resolve to
 * the package's canonical (founder-refresh 2026-06-26) palette rather than the
 * retired local hexes. Mirrors the :root alias block in app/globals.css.
 *
 * TOKEN GAPS (package does not expose a canonical equivalent — pinned to the
 * package's documented slate-ramp / accent hexes; revisit if the package adds
 * named tokens for these in a future version):
 *   - ink700 / ink600 : mid-slate surfaces (package exposes slate800/slate700
 *                       as ramp anchors but no dedicated ink-700/-600 token)
 *   - blueDeep        : the "Muted Dark Blue" accent (theme.css note, untyped)
 *   - tomato          : legacy warm accent — the package brand theme retired it
 *                       (the OKLCH tom-* ramp lives in tokens.css, not theme.css)
 */
export const legacy = {
  color: {
    ink900: brandColor.ink, // #0c0e12 slate-950
    ink800: brandColor.ink2, // #13161b slate-900
    ink700: brandColor.slate800, // #22262f — GAP: no dedicated package token
    ink600: brandColor.slate700, // #373a41 — GAP: no dedicated package token
    paper: brandColor.text, // #fafafa slate-25
    mist: "rgba(250,250,250,.60)", // package --muted-text (no typed token; matches theme.css)
    faint: "rgba(250,250,250,.40)", // package --faint
    blue: brandColor.accentPrimary, // #637dff Blue Aura
    blueDeep: "#3b4470", // GAP: "Muted Dark Blue" accent, untyped in package
    blueSoft: brandColor.accentTail, // #bbc7ff pastel light indigo
    sky: brandColor.accentTail, // #bbc7ff (legacy --sky #c9d3ff retired)
    tomato: "#f6926c", // GAP: warm accent retired from the package brand theme
    hairline: "rgba(255,255,255,.10)", // package --edge
  },
  font: {
    sans: brandFont.sans,
    mono: brandFont.mono,
  },
  layout: {
    contentMax: "1160px", // site-specific layout constant (not a brand token)
    letterSpacingTightest: "-0.04em",
  },
} as const;

// `layout` was a named export of the original local stub but is NOT part of the
// package's typed surface (it is site-specific), so re-declare it here. `color`,
// `font`, `radius`, `fontSize`, `easing`, `zIndex` all come from the package via
// the `export *` above.
export const layout = legacy.layout;
