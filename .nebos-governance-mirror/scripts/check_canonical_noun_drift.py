#!/usr/bin/env python3
"""CI PR-gate — Canonical Concept-Model drift check.

Reads the entity-family registry at
    docs/governance/conventions/entity-models/*.yaml
and greps a list of changed files for unregistered family-adjacent synonyms.

Modes:
  --diff-range <A>..<B>   Compare git range (typical CI: `origin/main..HEAD`).
  --files <path> ...      Explicit list (typical local: pre-commit hook).
  --scan-all              Scan every tracked policed file (for periodic drift audit).

Exit codes:
  0  clean (no unregistered synonyms in changed content)
  1  drift found, WARN mode (default — logs, does not fail CI unless --strict)
  2  drift found, STRICT mode (fails CI); OR internal error

Ratification path: this check ships WARN-first per the auto-upgrade doctrine.
After 30-day soak (or 3+ empirical catches per family), the calling workflow
flips `--strict` via input flag.

Grounding:
  - convention: docs/governance/conventions/canonical-concept-model.md
  - registry: docs/governance/conventions/entity-models/*.yaml
  - sibling: ~/.claude/hooks/canonical_noun_drift_pretooluse.py (tool-boundary)
  - founder directive: 2026-09-24 session 55cc2020 (iron clad enforced across everything)

The hook and this CI check share detection semantics BY DESIGN. Any divergence
between them is a bug — the same synonym-set + same escape-trailer regex +
same excluded-path segments apply. Divergence is caught by
`test_canonical_noun_drift_hook_ci_parity.py` (Wave B).
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

# --------------------------------------------------------------------------
# Configuration (kept in sync with the tool-boundary hook)
# --------------------------------------------------------------------------

POLICED_EXTENSIONS = {
    ".py", ".ts", ".tsx", ".js", ".jsx",
    ".sql", ".go", ".rs", ".java", ".kt", ".swift",
    ".md", ".mdx", ".yaml", ".yml",
    ".vue", ".svelte",
}

EXCLUDED_PATH_SEGMENTS = (
    "/scratchpad/",
    "/tool-results/",
    # The registry files themselves — the definition can freely use the terms.
    "docs/governance/conventions/entity-models/",
    # The convention doc itself.
    "docs/governance/conventions/canonical-concept-model.md",
    # Any file whose diff is deliberately about registry extension.
    # (Escape-trailer handles per-file case; this is the coarse exclude.)
    "test_canonical_noun_drift",
    "check_canonical_noun_drift",
)

# Amendment 4 (2026-09-24) — Round 4 HIGH-NEW-3: anchored to line-start with
# optional comment marker (matching hook). Previously matched inside string
# literals, silencing detection when a fixture example happened to contain a
# trailer-shaped substring.
ESCAPE_TRAILER_PARSE = re.compile(
    r"(?:^|\n)[ \t]*(?:#|//|--|;|<!--)?[ \t]*"
    r"\[canonical-noun-registered:[ \t]*(?P<family>[^/\]\n]+?)[ \t]*/[ \t]*(?P<term>[^\]\n]+?)[ \t]*\]"
)


# --------------------------------------------------------------------------
# Registry loader (no PyYAML dependency — regex parse of the fields we need)
# --------------------------------------------------------------------------

def _yaml_scalar(text: str, key: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith(key) and not stripped.startswith("#"):
            val = stripped[len(key):].strip()
            return val.strip('"').strip("'")
    return ""


def _yaml_list_under_key(text: str, key: str) -> list[str]:
    lines = text.splitlines()
    items: list[str] = []
    in_block = False
    base_indent = -1
    for line in lines:
        stripped = line.rstrip()
        if not stripped:
            if in_block:
                continue
            continue
        current_indent = len(line) - len(line.lstrip())
        if not in_block:
            if line.strip().startswith(key):
                in_block = True
                base_indent = current_indent
            continue
        if current_indent <= base_indent and stripped:
            break
        item_match = re.match(r"^\s*-\s*(.+?)\s*$", line)
        if item_match:
            val = item_match.group(1).strip().strip('"').strip("'")
            items.append(val)
    return items


def load_registry(registry_root: Path) -> list[dict]:
    families: list[dict] = []
    if not registry_root.is_dir():
        return families
    for yaml_path in sorted(registry_root.glob("*.yaml")):
        try:
            text = yaml_path.read_text(encoding="utf-8")
        except Exception:
            continue
        family = _yaml_scalar(text, "family:")
        canonical = _yaml_scalar(text, "canonical_noun:")
        synonyms = _yaml_list_under_key(text, "known_unregistered_synonyms_that_fire_hook:")
        if not family or not canonical or not synonyms:
            continue
        families.append({
            "family": family,
            "canonical_noun": canonical,
            "unregistered_synonyms": [t.lower() for t in synonyms],
            "registry_path": str(yaml_path),
        })
    return families


# --------------------------------------------------------------------------
# File / diff enumeration
# --------------------------------------------------------------------------

def _is_policed_path(path: str) -> bool:
    if not path:
        return False
    for seg in EXCLUDED_PATH_SEGMENTS:
        if seg in path:
            return False
    return any(path.endswith(ext) for ext in POLICED_EXTENSIONS)


def files_from_diff_range(diff_range: str) -> list[str]:
    """Return a list of changed policed files in the diff range (e.g. origin/main..HEAD)."""
    try:
        out = subprocess.check_output(
            ["git", "diff", "--name-only", "--diff-filter=AM", diff_range],
            text=True,
        )
    except subprocess.CalledProcessError as e:
        print(f"error: git diff failed for range {diff_range}: {e}", file=sys.stderr)
        sys.exit(2)
    return [line.strip() for line in out.splitlines() if _is_policed_path(line.strip())]


def files_from_explicit(paths: list[str]) -> list[str]:
    return [p for p in paths if _is_policed_path(p)]


def files_from_scan_all() -> list[str]:
    try:
        out = subprocess.check_output(["git", "ls-files"], text=True)
    except subprocess.CalledProcessError as e:
        print(f"error: git ls-files failed: {e}", file=sys.stderr)
        sys.exit(2)
    return [line.strip() for line in out.splitlines() if _is_policed_path(line.strip())]


# --------------------------------------------------------------------------
# Drift detection
# --------------------------------------------------------------------------

def _hits_in_text(text: str, unregistered: list[str]) -> list[str]:
    """Return unregistered-synonym tokens present in text (word-boundary matched)."""
    lc = text.lower()
    hits: list[str] = []
    for term in unregistered:
        pattern = r"(?<![a-z0-9_-])" + re.escape(term.lower()) + r"(?![a-z0-9_-])"
        if re.search(pattern, lc):
            hits.append(term)
    return hits


def scan_file(path: str, families: list[dict]) -> list[tuple[str, list[str]]]:
    """Return [(family, [hits])] for one file.

    Amendment 3 (2026-09-24) — Round 3 BLOCKER: escape trailer bypass is scoped
    per (family, term). A single valid trailer no longer silences the whole
    file — only the specific term it names is excluded from that family's
    detection. Multiple trailers in the same file each contribute one term to
    the excluded set (multi-term registry extensions in one PR).
    """
    try:
        content = Path(path).read_text(encoding="utf-8", errors="replace")
    except Exception:
        return []

    # Parse all trailers → per-family per-term excluded set.
    per_family_excluded: dict[str, set[str]] = {}
    for trailer_match in ESCAPE_TRAILER_PARSE.finditer(content):
        claimed_family = trailer_match.group("family").strip().lower()
        claimed_term = trailer_match.group("term").strip().lower()
        for family in families:
            if family["family"].lower() == claimed_family:
                if claimed_term in set(family.get("unregistered_synonyms", [])):
                    per_family_excluded.setdefault(claimed_family, set()).add(claimed_term)
                break

    per_family: list[tuple[str, list[str]]] = []
    for family in families:
        excluded = per_family_excluded.get(family["family"].lower(), set())
        effective_synonyms = [
            t for t in family["unregistered_synonyms"] if t.lower() not in excluded
        ]
        hits = _hits_in_text(content, effective_synonyms)
        if hits:
            per_family.append((family["family"], sorted(set(hits))))
    return per_family


# --------------------------------------------------------------------------
# Report formatting
# --------------------------------------------------------------------------

def format_report(
    findings: list[tuple[str, list[tuple[str, list[str]]]]],
    families: list[dict],
    strict: bool,
) -> str:
    """findings = [(file_path, [(family, [hits])])]"""
    lines: list[str] = []
    header = "canonical-noun-drift: BLOCK" if strict else "canonical-noun-drift: WARN"
    lines.append(f"::error::{header}" if strict else f"::warning::{header}")
    lines.append("")
    lines.append(f"Scanned {len(findings)} file(s) with drift; {len(families)} family registr(y|ies) loaded.")
    lines.append("")
    for path, per_family in findings:
        lines.append(f"  {path}")
        for family, hits in per_family:
            lines.append(f"    family={family}: {', '.join(hits)}")
            reg_path = next((f["registry_path"] for f in families if f["family"] == family), "?")
            lines.append(f"    registry: {reg_path}")
    lines.append("")
    lines.append("Fix options:")
    lines.append("  1. Add the term to the family YAML's views[] with predicate + rationale.")
    lines.append("  2. Add to boundary_terms[] if it's an external contract term.")
    lines.append("  3. Add to deprecated_aliases[] if kept for backwards-compat.")
    lines.append("  4. Add [canonical-noun-registered: family/term] inline to signal same-PR registry extension.")
    lines.append("")
    lines.append("Convention: docs/governance/conventions/canonical-concept-model.md")
    return "\n".join(lines)


# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="Canonical Concept-Model drift check")
    parser.add_argument(
        "--diff-range",
        default=None,
        help="Compare git range, e.g. origin/main..HEAD",
    )
    parser.add_argument("--files", nargs="*", default=None, help="Explicit file list")
    parser.add_argument("--scan-all", action="store_true", help="Scan every tracked policed file")
    parser.add_argument("--strict", action="store_true", help="Exit 2 on drift (default: warn / exit 1)")
    parser.add_argument(
        "--registry-root",
        default="docs/governance/conventions/entity-models",
        help="Path to the entity-models registry directory",
    )
    parser.add_argument("--json", action="store_true", help="Emit findings as JSON")
    args = parser.parse_args()

    modes = sum([bool(args.diff_range), args.files is not None, args.scan_all])
    if modes != 1:
        print("error: pass exactly one of --diff-range | --files | --scan-all", file=sys.stderr)
        return 2

    registry_root = Path(args.registry_root)
    families = load_registry(registry_root)
    if not families:
        print(f"warning: no registry files under {registry_root} — check is a no-op", file=sys.stderr)
        return 0

    if args.diff_range:
        files = files_from_diff_range(args.diff_range)
    elif args.files is not None:
        files = files_from_explicit(args.files)
    else:
        files = files_from_scan_all()

    findings: list[tuple[str, list[tuple[str, list[str]]]]] = []
    for path in files:
        per_family = scan_file(path, families)
        if per_family:
            findings.append((path, per_family))

    if not findings:
        if not args.json:
            print("canonical-noun-drift: clean")
        return 0

    if args.json:
        print(json.dumps({
            "strict": args.strict,
            "families_loaded": len(families),
            "files_with_drift": [
                {"file": p, "families": [{"family": f, "hits": h} for f, h in pf]}
                for p, pf in findings
            ],
        }, indent=2))
    else:
        print(format_report(findings, families, strict=args.strict))

    return 2 if args.strict else 1


if __name__ == "__main__":
    sys.exit(main())
