# Bundle size note (ADR-278 AD-7)

This is a deliberately lean marketing app. Quality gates are **warn-first** — they
inform, they don't block — until the founder Figma lands and the design system
stabilises.

## Dependency budget

Runtime dependencies are intentionally minimal:

- `next`, `react`, `react-dom` — the framework.
- No CSS framework runtime (Tailwind CDN from the legacy site is **removed**).
  Styling is hand-authored CSS in `app/globals.css`, driven by the shared brand
  tokens from `@nebbos/brand` (ADR-278 AD-3): `app/globals.css` imports the
  package's `theme.css` and aliases the marketing var names onto its canonical
  vars; `lib/brand/tokens.ts` re-exports the package's typed tokens. The package
  is a git-tag dependency (no registry, no client runtime). No utility-class
  runtime ships to the client.
- No animation libraries. The legacy site shipped GSAP + Lenis from CDNs; the
  rebuild drops them. Re-introduce only with a measured budget if motion is
  needed after the Figma.
- MDX (`@next/mdx`, `gray-matter`) is build-time only — content compiles to RSC,
  so it adds ~0 to the client bundle.

## What to watch

- **First-load JS per route.** `next build` prints this per route; keep shared
  first-load JS comfortably under ~110 kB. Most marketing pages here are RSC with
  near-zero client JS (only `ContactForm` is a client component).
- **Fonts.** DM Sans + DM Mono are self-hosted via `next/font/google` (no render-
  blocking external stylesheet, unlike the legacy `<link>` to Google Fonts).
- **Images.** None ship yet. When the Figma adds imagery, use `next/image` and
  re-enable the Lighthouse image assertions in `lighthouserc.json`.

## How to check

```bash
npm run build          # per-route first-load JS in the output table
npx @lhci/cli autorun  # Lighthouse CI against lighthouserc.json (warn-first)
```
