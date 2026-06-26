# AGENTS.md — nebbos-site

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
