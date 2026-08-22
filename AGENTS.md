# AGENTS.md — nebbos-site

<!-- derives-from: nebos-governance/docs/agents/BASELINE.md -->

Governs AI agent behavior in this repo. Canonical shared rules in [`Nebos-ai/nebos-governance:AGENTS.md`](https://github.com/Nebos-ai/nebos-governance/blob/main/AGENTS.md).

## What this repo is

Static marketing and landing site for **Nebbos** (the canonical product name; formerly branded "Idvor", and "Nebos" before that). HTML/CSS/JS with no backend. Deploy via Railway or static host.

**Domains:** `nebbos.ai` = **production** (canonical, indexed). `idvor.ai` = **staging only** (preview, `noindex`). Canonical/OG/sitemap URLs always point at `nebbos.ai`.

## Agent checklists — read yours before building

Before writing any code, read the checklist for your work type. Every checklist begins with a Step 0 impact scan — answer it before writing a single line. Missing your work type? Use `_template.md` to create it first, then do the work.

| Work type | Checklist |
|---|---|
| New CI/GitHub Actions workflow | `~/nebos-main/docs/agent-checklists/ci-workflow.md` |
| Work type not listed | `~/nebos-main/docs/agent-checklists/_template.md` — create checklist first, then do the work |

## Hard rules

- **Never hardcode API keys, tokens, or secrets.** Use environment variables only.
- **Never use the names "Idvor" or "Nebos" (single-b) on user-facing surfaces** — the product is "Nebbos" (double-b). Real infrastructure identifiers (the `Nebos-ai` GitHub org, `nebos-governance`, `~/nebos-main` paths) keep their existing spelling until separately renamed.
- Commit author: `dejan@tr3i.com`

## Design system — delta-brief-editorial (single-system, 2026-08-22)

Per founder directive 2026-08-22 ("every level of the front end every level of the
design system needs to all be uniformed"), the sole Nebbos design system across
every surface is **delta-brief-editorial** — paper-white, Trust 3A + Host Grotesk,
orange-plus accent, cut-corner cards.

- Canonical CSS tokens: inlined at the top of `app/globals.css` (mirrors
  `~/.claude/skills/delta-brief-editorial/assets/tokens.css`).
- Canonical TS tokens: `lib/brand/tokens.ts` (typed projection of the same
  values — no external package dependency).
- **RETIRED:** `@nebbos/brand` (Blue Aura / OKLCH product-UI variant) — no
  longer imported anywhere in this repo. Do not re-introduce.
- All new components must consume delta-brief token vars (`--paper`, `--ink`,
  `--gold`, `--accent`, `--navy`, `--rule`) — never the retired
  `--action`/`--surface`/`--edge`/`--accent-1` names.
