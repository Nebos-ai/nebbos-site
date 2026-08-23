#!/usr/bin/env -S uv run --with google-genai --python 3.12
"""
scripts/generate-hero-video.py · Wave 3l · Veo 3.1 hero video generator.

Uses Google's current unified Interactions API (`client.interactions.create`)
via the google-genai Python SDK. Founder pasted the exact API shape they
want us to use — this script mirrors it.

Usage:
    # 1. Get a Gemini API key: https://ai.google.dev/gemini-api
    # 2. Export it:
    export GEMINI_API_KEY="AIza…"
    # 3. Run (uv handles the SDK install per-run — no `uv add` needed):
    uv run scripts/generate-hero-video.py
    # or with args:
    uv run scripts/generate-hero-video.py --count 3

Optional args:
  --prompt "..."     override the default prompt
  --count N          how many variants (default 1)
  --out path.mp4     output path (default public/hero-video.mp4)
  --model NAME       Veo model to use (default veo-3.1-generate-preview)

After a video lands:
  ffmpeg -i public/hero-video.mp4 -vf "select=eq(n\\,0)" -q:v 2 public/hero-poster.jpg

Cost: ~$3-5 per 8-second 1080p clip at Veo 3.1 preview pricing.
"""
from __future__ import annotations

import argparse
import os
import sys
import time
import urllib.request
from pathlib import Path

from google import genai
from google.genai import types

DEFAULT_PROMPT = (
    "Ambient landscape · drifting fog rolls slowly over a single mountain peak "
    "at first light · warm-cool color balance · muted ochre and slate palette · "
    "subtle 35mm film grain · silent · no cuts · one continuous shot · 8 seconds · "
    "horizontal composition · natural-history-monograph aesthetic · "
    "quiet institutional beauty · editorial cinematography · "
    "no text · no people · no logos."
)

DEFAULT_MODEL = "veo-3.1-generate-preview"
DEFAULT_OUT = "public/hero-video.mp4"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate the nebbos.ai hero video via Veo 3.1.")
    p.add_argument("--prompt", default=DEFAULT_PROMPT, help="Veo prompt.")
    p.add_argument("--count", type=int, default=1, help="How many variants to generate.")
    p.add_argument("--out", default=DEFAULT_OUT, help="Output MP4 path.")
    p.add_argument("--model", default=DEFAULT_MODEL, help="Veo model id.")
    return p.parse_args()


def _try_interactions_create(client: genai.Client, model: str, prompt: str):
    """
    Prefer the unified Interactions API (founder-pasted pattern):
        client.interactions.create(model=..., input=..., ...)

    Fall back to the older models.generate_videos if this SDK build doesn't
    yet route video generation through Interactions. Keeps the script
    working across genai SDK versions.
    """
    try:
        return client.interactions.create(
            model=model,
            input=prompt,
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                duration_seconds=8,
                number_of_videos=1,
            ),
        ), "interactions"
    except AttributeError:
        # Older SDK — fall back to models.generate_videos
        return client.models.generate_videos(
            model=model,
            prompt=prompt,
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                duration_seconds=8,
                number_of_videos=1,
            ),
        ), "models"


def _download_video(client: genai.Client, video_obj, out_path: str) -> None:
    """Download the generated video to disk. Supports both response shapes."""
    Path(out_path).parent.mkdir(parents=True, exist_ok=True)
    # Newer SDK: has a .uri that requires the API key for download
    uri = getattr(video_obj, "uri", None)
    if uri:
        req = urllib.request.Request(uri, headers={"x-goog-api-key": os.environ["GEMINI_API_KEY"]})
        with urllib.request.urlopen(req) as r, open(out_path, "wb") as f:
            f.write(r.read())
        return
    # Older SDK: use client.files.download
    client.files.download(file=video_obj, download_path=out_path)


def main() -> int:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[generate-hero-video] Missing GEMINI_API_KEY environment variable.", file=sys.stderr)
        print("  Get a key at https://ai.google.dev/gemini-api then:", file=sys.stderr)
        print('    export GEMINI_API_KEY="AIza…"', file=sys.stderr)
        return 1

    args = parse_args()
    client = genai.Client()  # picks up GEMINI_API_KEY from env

    print("[generate-hero-video] prompt:")
    print(f"  {args.prompt}")
    print(f"[generate-hero-video] model:  {args.model}")
    print(f"[generate-hero-video] count:  {args.count}")

    for variant in range(1, args.count + 1):
        out_path = (
            args.out
            if args.count == 1
            else str(Path(args.out).with_stem(Path(args.out).stem + f"-v{variant}"))
        )
        print(f"\n[variant {variant}/{args.count}] starting generation → {out_path}")

        operation, api = _try_interactions_create(client, args.model, args.prompt)
        print(f"[variant {variant}] using API surface: {api}")

        # Poll until the operation completes.
        started = time.time()
        while not operation.done:
            time.sleep(5)
            operation = client.operations.get(operation)
            elapsed = int(time.time() - started)
            print(f"[variant {variant}] polling · {elapsed}s elapsed · done={operation.done}")
            if elapsed > 300:
                print(f"[variant {variant}] TIMEOUT after 300s", file=sys.stderr)
                break

        response = getattr(operation, "response", None)
        videos = (
            getattr(response, "generated_videos", None)
            or getattr(response, "videos", None)
            or []
        )
        if not videos:
            print(f"[variant {variant}] no video returned in operation response", file=sys.stderr)
            print(repr(operation)[:1200], file=sys.stderr)
            continue

        video = videos[0]
        video_obj = getattr(video, "video", None) or video  # both shapes
        print(f"[variant {variant}] downloading video…")
        _download_video(client, video_obj, out_path)

        size_mb = Path(out_path).stat().st_size / 1024 / 1024
        print(f"[variant {variant}] ✓ saved {out_path} ({size_mb:.2f} MB)")

    print("\n[generate-hero-video] done.\n")
    print("Next steps:")
    if args.count > 1:
        print("  1. Pick a variant and rename to public/hero-video.mp4")
    print("  2. Extract a poster still:")
    print(f'     ffmpeg -i {args.out} -vf "select=eq(n\\,0)" -q:v 2 public/hero-poster.jpg')
    print("  3. Verify locally: npm run dev, open http://localhost:3000")
    print("  4. Commit: git add public/hero-video.mp4 public/hero-poster.jpg && git push")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
