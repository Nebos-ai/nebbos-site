# components/sections/ · Named page sections

Wave 3j · founder directive 2026-08-23:
> "this is now how a designer would organize their figma components and
> label them for a clean handover to developer — you're doing the same
> thing with yourself"

Each file in this directory is a **named page section**, mirroring how a
designer would name and organize their Figma frames. One file per section,
one purpose per file, clear top-of-file label.

## Naming convention

- **`Home*`** — sections that only appear on the home page (`/`)
- **`Solutions*`** — sections that only appear on `/solutions/*` pages
- **`Marketing*`** — sections reused across multiple marketing pages
- Everything else — page-specific, prefixed with the page name

## Composition contract

Each section component:

1. Exports a named function matching the filename (no default exports)
2. Carries a top-of-file comment identifying:
   - the **FRAME** name (as it would read in Figma)
   - the **PARENT PAGE(S)** it appears on
   - the **PURPOSE** (one sentence)
3. Uses only `@/components/ui/*` primitives + `@/content/*` copy
4. Never inlines styles that could live in a token (`design/tokens.json`)
5. Is server-safe by default; add `"use client"` only when a section needs
   client interactivity

## Why sections vs one big page.tsx

- **Grep friendly** — "which section shows the pricing?" → `HomePricing.tsx`
- **Diff-friendly** — a section edit is a small isolated diff, not a
  1000-line page.tsx rewrite
- **Reuse-friendly** — the same section can appear on multiple pages
  without duplication
- **Hand-off friendly** — a developer opening `app/page.tsx` sees a
  5-line composition of clearly-named sections; every section is a
  named file they can jump to

## When to promote inline JSX into a section

If a chunk of `page.tsx` is >30 lines AND has a clear standalone purpose,
extract it. Sections should not be micro-fragments; they are proper
page-sized units of work.

## Related memories

- `feedback_content_taxonomy_pattern_nebbos_site` — copy lives in content/
- `moncalisse-doctrine-v2c-amendment` — signature-mark + one-idea-per-viewport
- `feedback_delta_brief_editorial_depth_amendment` — depth admitted on nebbos.ai
