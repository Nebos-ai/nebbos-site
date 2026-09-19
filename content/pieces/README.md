# content/pieces — Nebbos publication registry

Every Nebbos publication (decks, portfolio pieces, tenant assessments, internal audits, references) is registered here and served at `nebbos.ai/p/<slug>`.

Founder-directed 2026-09-19: rehost every claude.ai artifact under nebbos.ai URLs. Prior state — publications lived only as `claude.ai/artifact/...` links; drift was invisible; no canonical URL.

## How it works

- `content/pieces/registry.ts` — the registry. TypeScript, imported by both the route and the index page.
- `public/pieces/<slug>.html` — the pre-rendered publication. Complete standalone HTML with its own fonts, CSS, and inline SVG.
- `app/p/[slug]/page.tsx` — dynamic route. Reads the registry, serves the matching HTML inside an iframe so the piece's own visual language is isolated from the marketing site's design tokens.
- `app/p/page.tsx` — the publication index.

## Before writing a piece: read the canonical claims

Every publication draws from `content/canonical-claims.ts`. Product framing, data-tier list, governance pillars, compliance posture, corporate structure, superseded frames — all live there. When you author a piece, walk the ten-item checklist at the bottom of that file. If your piece invents a framing or names its own version of the four products, it's drifting.

## Adding a piece

1. Drop the pre-rendered HTML into `public/pieces/<slug>.html`. The file should be a complete, standalone document — `<!doctype html>`, its own `<head>`, its own `<style>` block, inline SVG. It runs inside an iframe on the piece route.
2. Append an entry to `PIECES` in `content/pieces/registry.ts`:

   ```ts
   {
     slug: "<slug>",
     title: "The published title",
     oneLiner: "A single sentence summary.",
     audience: ["investor", "board"],
     register: "delta-brief-editorial",
     status: "current",
     surface: "public",
     publishedAt: "2026-09-19",
   }
   ```
3. That's it. `nebbos.ai/p/<slug>` renders it; `nebbos.ai/p` lists it.

## Statuses

- **current** — content and brand align with the ratified system state.
- **refresh** — content valid but brand or numbers need updating. The route renders a "refresh pending" banner above the piece.
- **superseded** — teaches doctrine that has since been retired. The route renders a "superseded" banner and points at the successor via `supersededBy`. Search indexing is turned off.
- **unverified** — not yet read against the ratified state.

## Registers

Pieces come from many visual systems. The registry names the register each piece uses so it can be spot-checked against the two-register doctrine (marketing = Delta brief editorial; platform = dark cool-blue). Pieces that use a legacy register are flagged for eventual re-authoring.

## Not the same as content/pages.ts

`content/pages.ts` is the site's own page registry — every page is a section-stack that renders through `PageRenderer`, and every string on the site is authored in the registry. Pieces are the opposite pattern — self-contained pre-rendered documents from various visual systems, served as they are. Do not put site pages here, and do not put pieces in `pages.ts`.

## Not the same as content/blog

Blog posts are MDX in `content/blog/`, authored inline against the site's design system. Pieces are pre-rendered artifacts with their own design systems, imported from external sources (claude.ai artifacts, decks generated for a specific presentation, etc.).
