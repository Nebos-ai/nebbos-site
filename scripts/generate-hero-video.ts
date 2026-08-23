/**
 * scripts/generate-hero-video.ts · Wave 3l · Veo 3.1 hero video generator.
 *
 * Calls Google Veo 3.1 (via the Gemini API) to generate an atmospheric
 * nature loop for the home hero. Polls for completion (Veo is async;
 * generations take ~30-90s), downloads the returned MP4, and drops it
 * at `public/hero-video.mp4`.
 *
 * Usage:
 *   # 1. Get a Gemini API key from https://ai.google.dev/gemini-api
 *   # 2. Set it in your environment:
 *   export GEMINI_API_KEY="AIza…"
 *   # 3. Run:
 *   npx tsx scripts/generate-hero-video.ts
 *
 * Optional args:
 *   --prompt "..."     override the default prompt
 *   --count N          how many variants (default 1)
 *   --out path.mp4     output path (default public/hero-video.mp4)
 *
 * After a video lands:
 *   • Extract a poster still (first frame) via ffmpeg:
 *       ffmpeg -i public/hero-video.mp4 -vf "select=eq(n\,0)" -q:v 2 public/hero-poster.jpg
 *   • The HomeHero component picks up both files automatically on next build.
 *
 * Cost: ~$3-5 per 8s clip at 1080p (Veo 3.1 preview pricing).
 * Model: `veo-3.1-generate-preview` (or bump when the GA release lands).
 */

import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_PROMPT = `Ambient landscape · drifting fog rolls slowly over a single mountain peak at first light · warm-cool color balance · muted ochre and slate palette · subtle 35mm film grain · silent · no cuts · one continuous shot · 8 seconds · horizontal composition · natural-history-monograph aesthetic · quiet institutional beauty · editorial cinematography · no text · no people · no logos.`;

const DEFAULT_MODEL = "veo-3.1-generate-preview";
const DEFAULT_OUT = "public/hero-video.mp4";

type Args = { prompt: string; count: number; out: string; model: string };

function parseArgs(argv: string[]): Args {
  const args: Args = { prompt: DEFAULT_PROMPT, count: 1, out: DEFAULT_OUT, model: DEFAULT_MODEL };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    const next = argv[i + 1];
    if (flag === "--prompt" && next) { args.prompt = next; i++; }
    else if (flag === "--count" && next) { args.count = Number(next); i++; }
    else if (flag === "--out" && next) { args.out = next; i++; }
    else if (flag === "--model" && next) { args.model = next; i++; }
  }
  return args;
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[generate-hero-video] Missing GEMINI_API_KEY environment variable.");
    console.error("  Get a key at https://ai.google.dev/gemini-api then:");
    console.error("    export GEMINI_API_KEY=\"AIza…\"");
    process.exit(1);
  }

  const args = parseArgs(process.argv.slice(2));
  const client = new GoogleGenAI({ apiKey });

  console.log(`[generate-hero-video] prompt:`);
  console.log(`  ${args.prompt}`);
  console.log(`[generate-hero-video] model: ${args.model}`);
  console.log(`[generate-hero-video] variants: ${args.count}`);

  for (let variant = 1; variant <= args.count; variant++) {
    const outPath = args.count > 1
      ? args.out.replace(/(\.mp4)$/i, `-v${variant}$1`)
      : args.out;

    console.log(`\n[variant ${variant}/${args.count}] starting generation → ${outPath}`);

    // Kick off generation (returns an operation immediately)
    let operation = await client.models.generateVideos({
      model: args.model,
      prompt: args.prompt,
      config: {
        aspectRatio: "16:9",
        durationSeconds: 8,
        numberOfVideos: 1,
      },
    });

    // Poll until the operation completes (~30-90s typical)
    const startedAt = Date.now();
    while (!operation.done) {
      await new Promise((r) => setTimeout(r, 5000));
      operation = await client.operations.getVideosOperation({ operation });
      const elapsed = Math.round((Date.now() - startedAt) / 1000);
      console.log(`[variant ${variant}] polling · ${elapsed}s elapsed · done=${operation.done}`);
      if (elapsed > 300) {
        console.error(`[variant ${variant}] TIMEOUT after 300s`);
        break;
      }
    }

    const videos = operation.response?.generatedVideos ?? [];
    if (!videos.length) {
      console.error(`[variant ${variant}] no video returned in operation response`);
      console.error(JSON.stringify(operation, null, 2).slice(0, 1200));
      continue;
    }

    // Download the first (only) video
    const video = videos[0]!;
    console.log(`[variant ${variant}] downloading video…`);
    await client.files.download({
      file: video.video!,
      downloadPath: outPath,
    });

    const stat = fs.statSync(outPath);
    console.log(`[variant ${variant}] ✓ saved ${outPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
  }

  console.log(`\n[generate-hero-video] done.`);
  console.log(`\nNext steps:`);
  console.log(`  1. Extract a poster still:`);
  console.log(`     ffmpeg -i ${args.out} -vf "select=eq(n\\,0)" -q:v 2 public/hero-poster.jpg`);
  console.log(`  2. Verify locally: npm run dev, open http://localhost:3000`);
  console.log(`  3. Commit both files (git add public/hero-video.mp4 public/hero-poster.jpg)`);
}

main().catch((err) => {
  console.error("[generate-hero-video] failed:", err?.message ?? err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
});
