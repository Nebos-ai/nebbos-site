#!/usr/bin/env -S uv run --with google-genai --python 3.12
"""
generate-vision-board-stills.py · Nebbos-agent authored 2026-08-23.

Generates the vision-board stills for the nebbos.ai hero film via Google
Imagen 4 (via the same GEMINI_API_KEY that also unlocks Veo 3.1 for video
generation). Reads prompts from `scripts/vision-board-prompts.json`;
produces 4 variants per scene = 12 stills total at
`public/vision-board/scene-{N}-v{V}.png`.

Governed by:
  ~/.claude/skills/nebbos-design-charter/               (parent substrate)
  ~/.claude/skills/nebbos-design-charter/build-matrix.md (which cells this fills)
  ~/.claude/skills/ai-still-image-prompting/            (craft skill)
  ~/.claude/skills/ai-video-generation-prompting/       (downstream consumer)

North-star filter: every image serves "we are giving hope for the future"
(reference_nebbos_voice_north_star_hope_for_the_future).

Governance rules this script embodies (Pearl-inheritable):
  1. Config-driven prompts — swap prompts without touching code
  2. Deterministic filenames — traceable across the pipeline
  3. Per-scene error isolation — one bad scene does not kill the batch
  4. Cost reporting — every $ spent is auditable
  5. Cross-linked docs — every downstream consumer can trace back

Usage:
    export GEMINI_API_KEY="AIza..."
    uv run scripts/generate-vision-board-stills.py

Optional:
    --config scripts/vision-board-prompts.json  (default)
    --dry-run                                    (prints the plan without spending)
    --scene N                                    (only generate scene N)
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import time
from pathlib import Path

from google import genai
from google.genai import types


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate vision-board stills via Imagen 4.")
    p.add_argument("--config", default="scripts/vision-board-prompts.json",
                   help="Path to the prompts config JSON.")
    p.add_argument("--dry-run", action="store_true",
                   help="Print the plan without calling the API.")
    p.add_argument("--scene", type=int, default=None,
                   help="Only generate this scene id (1, 2, or 3). Default: all.")
    return p.parse_args()


def load_config(path: str) -> dict:
    p = Path(path)
    if not p.exists():
        print(f"[fatal] config not found: {path}", file=sys.stderr)
        sys.exit(1)
    return json.loads(p.read_text())


def main() -> int:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[fatal] Missing GEMINI_API_KEY environment variable.", file=sys.stderr)
        print("  Get a key at https://ai.google.dev/gemini-api", file=sys.stderr)
        return 1

    args = parse_args()
    cfg = load_config(args.config)
    conf = cfg["config"]
    scenes = cfg["scenes"]

    if args.scene is not None:
        scenes = [s for s in scenes if s["id"] == args.scene]
        if not scenes:
            print(f"[fatal] no scene with id={args.scene} in config", file=sys.stderr)
            return 1

    output_dir = Path(conf["output_dir"])
    output_dir.mkdir(parents=True, exist_ok=True)

    print("[vision-board] plan:")
    print(f"  model:              {conf['model']}")
    print(f"  aspect_ratio:       {conf['aspect_ratio']}")
    print(f"  variants_per_scene: {conf['variants_per_scene']}")
    print(f"  scenes:             {len(scenes)}")
    print(f"  output_dir:         {output_dir}")
    print(f"  estimated cost:     ~${conf['total_estimated_cost_usd']:.2f}")

    if args.dry_run:
        print("\n[dry-run] not calling API. exiting.")
        return 0

    client = genai.Client()  # picks up GEMINI_API_KEY from env

    total_saved = 0
    total_failed = 0
    start = time.time()

    for scene in scenes:
        scene_id = scene["id"]
        scene_name = scene["name"]
        prompt = scene["prompt"]

        print(f"\n[scene {scene_id} · {scene_name}] generating {conf['variants_per_scene']} variants...")

        # Nano Banana (gemini-*-image) uses generate_content with response_modalities=['Image'].
        # Each call returns 1 image; loop per variant.
        for i in range(1, conf["variants_per_scene"] + 1):
            out_path = output_dir / f"{conf['output_prefix']}-{scene_id}-v{i}.png"
            try:
                response = client.models.generate_content(
                    model=conf["model"],
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_modalities=["Image"],
                    ),
                )
            except Exception as exc:
                print(f"[scene {scene_id} · v{i}] FAILED: {exc}", file=sys.stderr)
                total_failed += 1
                continue

            # Extract image bytes from the first inline_data part
            image_bytes = None
            for candidate in getattr(response, "candidates", None) or []:
                content = getattr(candidate, "content", None)
                if not content:
                    continue
                for part in getattr(content, "parts", None) or []:
                    inline = getattr(part, "inline_data", None)
                    if inline and getattr(inline, "data", None):
                        raw = inline.data
                        image_bytes = raw if isinstance(raw, bytes) else base64.b64decode(raw)
                        break
                if image_bytes:
                    break

            if not image_bytes:
                print(f"[scene {scene_id} · v{i}] no image data in response", file=sys.stderr)
                total_failed += 1
                continue

            out_path.write_bytes(image_bytes)
            size_kb = out_path.stat().st_size / 1024
            print(f"  ✓ {out_path}  ({size_kb:.1f} KB)")
            total_saved += 1

    elapsed = time.time() - start
    print(f"\n[vision-board] done · {total_saved} saved · {total_failed} failed · {elapsed:.1f}s elapsed")
    print(f"[vision-board] estimated cost: ~${(total_saved * 0.04):.2f}")

    if total_saved == 0:
        print("[fatal] no images generated; check the config + API key + quota", file=sys.stderr)
        return 1

    print(f"\n[next] review the {total_saved} stills at {output_dir}/")
    print("[next] founder picks 1 per scene for Veo Frames-to-Video conditioning")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
