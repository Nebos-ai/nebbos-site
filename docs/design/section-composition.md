# Section composition doctrine

**Ratified 2026-09-18** — founder-directed after live-site review 2026-09-18:

> "you need to break each page down by sections and each section needs to be treated as important and we have to make sure that we are making sure that each section design wise works with the sectiosn above and below right now its a wall and or looks like a swapmeet"

Every page on nebbos.ai is a composed SEQUENCE of sections. This document is
the load-bearing spec for how sections compose — how each section relates to
the one above it and the one below it, so a page reads as one piece instead
of a wall or a swap-meet.

## The two failure modes

1. **Wall** — every section is the same shape (hero + N uniform text-blocks +
   cta-band). No visual variance. Founder-diagnosed 2026-09-18 on `/platform`
   and all `/solutions/*` verticals. The eye slides off; the buyer skims.
2. **Swap-meet** — every section a different register (different font, color,
   spacing, motion) with no coordination. Sections collide instead of
   compose. Founder-diagnosed on the home page adjacencies before this
   doctrine landed.

Both come from the same absence: no explicit contract for how one section
should relate to the next. This doctrine ratifies that contract.

## The four dials of a section

Every section on the site is characterized by four dials. Adjacent sections
must vary on AT LEAST ONE dial. Two consecutive sections identical on all
four dials is a review-blocker.

| Dial | Values |
|---|---|
| **Ground** | `paper` · `paper-2` · `ink` · `scene` |
| **Density** | `compact` · `standard` · `anchor` (heroic) |
| **Register** | `editorial` (serif-forward) · `institutional` (mono-eyebrow-forward) · `catalog` (product-tile grid) · `signature` (kinetic mark, hero) |
| **Boundary** | `hairline` (subtle) · `marker` (plus + numeral) · `register-break` (dark inversion) |

## The nine section shapes

Every section on nebbos.ai should be one of these nine named shapes. Each
shape has a defined visual contract. If you need a tenth shape, add it here
first, then to `components/patterns/section-shell.tsx`.

| Shape | Ground | Density | Register | Boundary | When to use |
|---|---|---|---|---|---|
| `hero-signature` | `scene` | `anchor` | `signature` | none (chapter I) | The one hero per page. Scene image ground, cream text, chapter numeral, kinetic mark. |
| `hero-paper` | `paper` | `anchor` | `editorial` | none (opener) | Institutional non-scene hero. Big display headline, deck, dual CTA. |
| `trust-band` | `paper-2` | `compact` | `institutional` | `hairline` top+bottom | Truthful social-proof (running in school districts / built-with dogfood / substrate baseline). Mono eyebrow, short body, one link. |
| `editorial-block` | `paper` | `standard` | `editorial` | `hairline` top | Prose-forward body block (trust/security/compliance/sovereignty content). Single narrow column, 2-4 sentence chunks. |
| `catalog-grid` | `paper` | `standard` | `catalog` | `hairline` top | N-cell product / capability / value grid. Uniform cells, hairline dividers between. |
| `bento-dark` | `ink` | `anchor` | `institutional` | `register-break` | The ONE dark register break per page. Asymmetric grid, cream on ink, orange accent. Signals depth of substrate. Never twice on the same page. |
| `story-scene` | `scene` | `anchor` | `signature` | `marker` (chapter numeral) | Full-bleed inline scene, chapter-story arc, editorial caption. Not the hero (that's `hero-signature`); a MID-page chapter. |
| `stat-strip` | `paper-2` | `compact` | `institutional` | `hairline` bottom | Horizontal number tiles with borderLeft accent. `BuiltWith`, `NebbosInventory` quadrant band, per-page metrics. |
| `cta-anchor` | `scene` OR `ink` | `anchor` | `signature` | `register-break` | The closing chapter. Mirrors the hero's register but inverts ground. Two CTAs max. |

## Composition rules

**Rule 1 — Adjacent-section dial variance.** No two consecutive sections
share all four dials. Grep-verifiable at page-authoring time.

**Rule 2 — Register-break budget.** At most ONE `bento-dark` per page.
Ratified per v3 substrate spec ("one register break per page max"). The
`cta-anchor` at page bottom counts as a register-break too when it uses
`ink` ground — so if you use `bento-dark` mid-page, use `scene` for the
cta-anchor, not `ink`.

**Rule 3 — Boundary marker cadence.** Every 3rd section boundary carries a
visible `marker` (chapter numeral + plus-marker). The other boundaries stay
`hairline`. This gives the eye a rhythm to attach to without over-cluttering.

**Rule 4 — Density alternation.** Never two consecutive `anchor` density
sections. Anchor sections must alternate with `compact` or `standard`. This
prevents the "wall" pathology on `/security`, `/compliance`, `/solutions/*`.

**Rule 5 — Ground alternation.** Never three consecutive sections with the
same ground. `paper → paper → paper` is a review-blocker; `paper → paper-2 →
paper` is fine.

**Rule 6 — Section-shape naming visible in JSX.** Every section import at
page level names its shape:
```tsx
<HomeHero />                    // shape="hero-signature"
<SectionDivider chapter="II" /> // marker cadence
<InProductionBand />            // shape="trust-band"
```
So a page-shape audit reads the composition at a glance.

## Per-page canonical compositions

### `/` (Home) · v14+ · ratified 2026-09-18

| # | Section | Shape | Ground | Density | Boundary above |
|---|---|---|---|---|---|
| 1 | `HomeHero` | `hero-signature` | scene | anchor | — |
| 2 | `InProductionBand` | `trust-band` | paper-2 | compact | `marker` (II) |
| 3 | `HomeModesBand` | `editorial-block` | paper | standard | `hairline` |
| 4 | `CapabilityBentoGrid` | `bento-dark` | ink | anchor | `register-break` (III) |
| 5 | `HomeBands` | `catalog-grid` | paper | standard | `hairline` |
| 6 | `HomeStory` | `story-scene` | scene | anchor | `marker` (IV) |
| 7 | `BuiltWithNebbosBand` | `stat-strip` | paper-2 | compact | `hairline` |
| 8 | `NebbosInventoryBand` | `catalog-grid` | paper | standard | `marker` (V) |
| 9 | `HomeCTA` | `cta-anchor` | scene | anchor | `register-break` |

Rhythm: SCENE → paper-2 → paper → INK → paper → SCENE → paper-2 → paper →
SCENE. Never three same-ground in a row. One INK register-break at position
4 (bento) plus one scene closing anchor at position 9. Marker boundaries at
positions 2, 4, 6, 8.

### `/products` · ratified 2026-09-18

| # | Section | Shape | Ground |
|---|---|---|---|
| 1 | Hero (paper) | `hero-paper` | paper |
| 2 | Tier composition (3 cells) | `catalog-grid` | paper-2 |
| 3 | The matrix (4 products × 3 tiers) | `catalog-grid` | paper |
| 4 | Closing CTA | `cta-anchor` | scene |

### `/products/{platform,app,mcp,cradle}` · already primitive-migrated · ratified 2026-09-18

| # | Section | Shape | Ground |
|---|---|---|---|
| 1 | Scene hero | `hero-signature` | scene |
| 2 | Highlights (5 cells) | `catalog-grid` | paper |
| 3 | Capabilities (4 rows) | `editorial-block` | paper |
| 4 | The core (cross-product tie) | `editorial-block` | paper-2 |
| 5 | Built for (3 cells) | `catalog-grid` | paper |
| 6 | Values (3 cards) | `catalog-grid` | paper-2 |
| 7 | Tier picker (3 cells) | `catalog-grid` | paper |
| 8 | Other three products (3 cells) | `catalog-grid` | paper-2 |
| 9 | Footer CTA | `cta-anchor` | scene |

Rhythm: scene → paper → paper → paper-2 → paper → paper-2 → paper → paper-2 →
scene. Grounds alternate paper/paper-2 between positions 3-8; hero + closing
break the pattern.

### `/solutions/{vertical}` · ratified 2026-09-18 — REBUILT from 14-block wall

The current 14-section skeleton (problem/what-it-does/how-it-fits/compounding/
signals/triggers/layers/roi/objections/related/getting-started) is a wall
per founder critique. Rebuild as 8 sections with density alternation:

| # | Section | Shape | Ground | Notes |
|---|---|---|---|---|
| 1 | Vertical hero | `hero-signature` | scene | Photograph of the work (school hallway, trading floor, hospital corridor) |
| 2 | The problem | `editorial-block` | paper | 2-3 sentence paragraphs, not 200-word monoliths |
| 3 | What it does (5 signals) | `catalog-grid` | paper-2 | Signals list as cells, not prose |
| 4 | Architecture-layers-that-matter | `bento-dark` | ink | The ONE register-break |
| 5 | ROI + compounding value | `stat-strip` | paper-2 | Numbers first, prose second |
| 6 | Common objections (6 items) | `editorial-block` | paper | Q&A pairs, not paragraphs |
| 7 | Getting started (Week 1/2/3) | `catalog-grid` | paper-2 | 3-cell horizontal timeline |
| 8 | Closing CTA | `cta-anchor` | scene | Vertical-specific closing image |

Same 8-shape template for every solutions vertical. Ground alternation
paper → paper-2 → paper → INK → paper-2 → paper → paper-2 → SCENE. Word
count target: ≤800 per vertical (down from 1,500-1,700 today).

### `/trust`, `/security`, `/compliance`, `/sovereignty` · REBUILT from 12-14-block wall

Same principle as solutions verticals. Rebuild each into ≤8 composed sections
with density + ground alternation. Target ≤1,200 words per page (down from
1,700-2,600).

## What breaks this doctrine

- Adding a `<section>` in a page-level `page.tsx` without picking a shape.
  Every section imports its shape via `<SectionShell shape="editorial-block"
  ground="paper" density="standard">` — no bespoke top-level `<section>` in
  page files.
- Two consecutive sections with same-color ground and same density.
- Using `bento-dark` twice on the same page.
- Cta-band without the closing register-break.
- Boundary hairlines shipped as inline `borderTop: 1px solid var(--rule)` on
  every section. Boundaries live on `SectionShell` and are decided by shape,
  not by the consumer.

## Composition source of truth

- **This document** — the doctrine.
- **`components/patterns/section-shell.tsx`** — the primitive that
  implements each shape.
- **`components/patterns/section-shell.css`** — the visual contract for
  each shape (`@layer patterns` — wins over `@layer page`).
- **Per-page comment at top of `page.tsx`** — the specific composition for
  that page, in the same table format as above.

Every page file's top comment must include the composition table. Any section
addition or reorder that breaks the table breaks the doctrine — the comment
must update alongside the code.

## Migration order

1. Wave 1 · Home page (highest visibility) — landing this commit
2. Wave 2 · `/products` index + 4 product pages — mostly already composed;
   audit for adjacent-dial-variance failures
3. Wave 3 · `/solutions/*` 9 verticals — biggest wall-of-text lift, rebuild
   from 14-section skeleton to 8-section composition
4. Wave 4 · `/trust`, `/security`, `/compliance`, `/sovereignty` — same
   rebuild pattern
5. Wave 5 · `/about`, `/careers`, `/how`, `/design`, `/customers`, `/blog`,
   `/legal/*` — smaller surfaces, audit only
6. Wave 6 · retire `/platform/*` tree and `/presentation` legacy shape

Each wave commits independently. This doctrine document updates as new
shapes are added or rules refined.
