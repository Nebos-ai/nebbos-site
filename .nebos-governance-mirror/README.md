# .nebos-governance-mirror — self-contained copy for the canonical-noun-drift check

**Why this exists:** Wave B pilot ships the canonical-noun-drift check on
`nebbos-site` PRs. The Wave A convention + registry + script live canonically
in `Nebos-ai/nebos-governance` (private repo). The workflow ideally would
checkout that repo in CI and use the canonical files, but the caller's
`github.token` 404s on private-cross-repo checkout, and no
`NEBOS_GOVERNANCE_READ_TOKEN` PAT is set on `nebbos-site` yet.

**Contract:** the files here are a MIRROR of the canonical files at:

  - `nebos-governance/docs/governance/conventions/entity-models/people.yaml` → `.nebos-governance-mirror/entity-models/people.yaml`
  - `nebos-governance/scripts/check_canonical_noun_drift.py` → `.nebos-governance-mirror/scripts/check_canonical_noun_drift.py`

**Drift:** the mirror gets stale when the canonical files change. Two fixes,
both out-of-scope for the Wave B pilot ship:

1. **Preferred long-term:** set `NEBOS_GOVERNANCE_READ_TOKEN` (fine-grained
   PAT with contents:read on Nebos-ai/nebos-governance) as a repo secret on
   `nebbos-site`. Then revert this mirror + restore the cross-repo checkout in
   `.github/workflows/canonical-noun-drift-wireup.yml`. Automatic freshness.

2. **Shorter-term:** a scheduled workflow that re-fetches the two files via
   `gh api` using a PAT that DOES have access, opens an auto-PR when the
   mirror drifts. Requires the same PAT as #1 for the fetch, so the
   `secret-once + delete-mirror` fix (#1) is strictly simpler.

**Last mirror sync:** 2026-09-24 (files copied from
`nebos-governance-worktrees/rename-nebbos-double-b-w0-2026-09-24/` on session
55cc2020). Canonical source: Wave A merged as
`Nebos-ai/nebos-governance` PR #2630, commit `18c00a10`.

**Do not edit these files here** — always edit at the canonical source and
re-copy. Editing here creates the exact taxonomy-drift problem the
canonical-noun convention exists to prevent.
