# content/ams — Nebbos Asset Management System

The prospective inventory of every marketing asset a modern tech company should have, marked with Nebbos's state on each.

Founder directive 2026-09-19: *"we need to look at the marketing assets that we should have i want a completely neatly organized atlas that has all the assets we need this should be our AMS for Nebbos."*

Prior state — assets were tracked one-off per session (blog posts, decks, one-pagers). No canonical register of what a mature tech company keeps, no owner-team assignment, no marked delta between "have" and "need."

## How to use it

- `nebbos.ai/ams` renders the whole register. Filter by status / category / owner via URL search params.
- Add or update an asset by editing `content/ams/registry.ts`. Every change is a single-line edit.
- Types are strict — `status` is one of `have · in-progress · need · not-relevant · not-assessed`, `tier` is one of `core · growth · enterprise`.

## Status semantics

- **have** — asset exists, is current, and readable at `nebbosSource`.
- **in-progress** — asset is being built or refreshed; there's a working version but it's not yet the canonical form.
- **need** — asset does not exist; institutionally required.
- **not-relevant** — asset is standard but doesn't fit Nebbos's shape (e.g. SEC filings for a private company; consumer-review-site profiles for an institutional-buyer motion).
- **not-assessed** — honest default; we haven't looked at this one yet. Reduce as we walk the register.

## Owner semantics

`nebbosOwner` names the team(s) from the ratified 11-team topology (SYSTEM.md §5):

- **Substrate:** MCP · Platform · Data · Users · Design
- **External:** Mobile/App · Onboarding & Ed · Marketing · Sales
- **Internal:** HR · Legal (Serbia + US)

Plus `Founder` for founder-scope items. Multi-team ownership is written with `+` (e.g. `Design + Marketing`).

## Categories

18 categories, 321 assets total (sourced from the Corporate Asset Atlas taxonomy):

- Brand & Identity (19)
- Corporate Narrative (13)
- Product Marketing (25)
- Sales Enablement (25)
- Customer Marketing (7)
- Customer Success (18)
- Developer & Technical (29)
- Trust, Security & Legal (30)
- Investor Relations (21)
- PR & Communications (18)
- Internal & Operations (20)
- Talent & Employer Brand (16)
- Partner & Channel (14)
- Content & Demand Gen (26)
- Product Experience (9)
- Web & Digital (8)
- ESG & Policy (12)
- Events & Community (11)

## Not the same as pieces/

`content/pieces/` — the retrospective register of publications we've actually shipped as HTML.

`content/ams/` — the prospective register of every asset type we should have, whether we've shipped it or not.

A published piece in `pieces/` typically corresponds to one row in `ams/` — the piece is the artifact, the ams row is the slot. Some ams rows are satisfied by section-stack pages in `content/pages.ts` rather than standalone pieces (e.g. Privacy policy is at `/legal/privacy`, not in `pieces/`).

## Updating the assessment

The initial commit marks ~100 of 321 assets. The other ~220 are `not-assessed` — the honest starting point.

Per-team walk-throughs are the right way to close the assessment. When Marketing (or Sales, or Legal, or Design) sits with the AMS, they should:

1. Filter to their category (`/ams?owner=Marketing`)
2. For each `not-assessed` row, mark `have` / `in-progress` / `need` / `not-relevant` — with a source or a note as appropriate
3. Commit the delta

The goal isn't 321 `have`s. It's 321 marks — every asset consciously accepted or rejected, none left as an unknown.
