#!/usr/bin/env -S uv run --with google-genai --python 3.12
"""
generate-stills-manifest.py · Nebbos-agent authored 2026-08-23.

Per founder directive: "we should be tracking a description and the exact
prompts used for creating the stills so when we are looking for a still we
can find it right away."

Scans public/vision-board/*.png against the prompt configs in scripts/, then
emits public/vision-board/manifest.json with one entry per still: filename,
scene id + name, variant, short description (first sentence of prompt),
full prompt text, config source, model, generated_at (from file mtime).

Run:
    uv run scripts/generate-stills-manifest.py
"""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path


REPO = Path(__file__).parent.parent
STILLS_DIR = REPO / "public" / "vision-board"
CONFIGS = [
    ("scripts/vision-board-prompts.json", "scene"),
    ("scripts/vision-board-perspectives.json", "perspective"),
]


def short_description(prompt: str) -> str:
    """First sentence-ish of the prompt — up to first period."""
    cleaned = prompt.replace("Bespoke editorial photograph. ", "").strip()
    sentences = re.split(r"(?<=[.!?])\s+", cleaned)
    first = sentences[0] if sentences else cleaned
    return first[:280]


def main() -> int:
    entries = []
    total_files = set()

    for config_rel, expected_prefix in CONFIGS:
        cfg_path = REPO / config_rel
        if not cfg_path.exists():
            print(f"[skip] {config_rel} not found")
            continue
        cfg = json.loads(cfg_path.read_text())
        model = cfg["config"]["model"]
        aspect = cfg["config"].get("aspect_ratio", "16:9")
        variants = cfg["config"]["variants_per_scene"]
        prefix = cfg["config"].get("output_prefix", expected_prefix)

        for scene in cfg["scenes"]:
            for v in range(1, variants + 1):
                filename = f"{prefix}-{scene['id']}-v{v}.png"
                path = STILLS_DIR / filename
                if not path.exists():
                    continue
                total_files.add(filename)
                stat = path.stat()
                entries.append({
                    "filename": filename,
                    "path": f"/vision-board/{filename}",
                    "kind": prefix,
                    "id": scene["id"],
                    "name": scene["name"],
                    "variant": v,
                    "maps_to_scene": scene.get("$maps_to_scene", scene["id"] if prefix == "scene" else None),
                    "description": short_description(scene["prompt"]),
                    "prompt": scene["prompt"],
                    "config_source": config_rel,
                    "model": model,
                    "aspect_ratio": aspect,
                    "size_kb": round(stat.st_size / 1024, 1),
                    "generated_at": datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc).isoformat(),
                })

    # Sort: scene first, then perspective; then by id and variant
    entries.sort(key=lambda e: (0 if e["kind"] == "scene" else 1, e["id"], e["variant"]))

    manifest = {
        "$schema": "internal · nebbos-stills-manifest v1",
        "$generated_at": datetime.now(tz=timezone.utc).isoformat(),
        "$governed_by": "founder directive 2026-08-23 · track description + exact prompt for every still · Pearl-level discipline",
        "$total_stills": len(entries),
        "$scenes": {
            "1": "Coffee shop · Where it starts",
            "2": "NYC executive · Where it grows",
            "3": "Amalfi elder · Where it endures",
        },
        "stills": entries,
    }

    out = STILLS_DIR / "manifest.json"
    out.write_text(json.dumps(manifest, indent=2) + "\n")

    orphans = sorted(
        f.name for f in STILLS_DIR.glob("*.png") if f.name not in total_files
    )

    print(f"[manifest] wrote {out}")
    print(f"[manifest] {len(entries)} stills indexed from {len(CONFIGS)} config files")
    if orphans:
        print(f"[manifest] warning · {len(orphans)} orphan file(s) not in any prompt config:")
        for f in orphans:
            print(f"  {f}")
    else:
        print("[manifest] no orphans — every PNG is traced back to a prompt")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
