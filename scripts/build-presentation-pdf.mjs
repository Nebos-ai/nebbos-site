#!/usr/bin/env node
/**
 * Build the sales presentation as a downloadable PDF.
 *
 * Loads public/nebbos-delta-brief.html in headless Chrome (via Puppeteer),
 * waits for fonts + tab-switching JS to settle, and prints to
 * public/nebbos-presentation.pdf. Runs on-demand via `pnpm build:pdf`.
 *
 * The presentation is a single HTML doc with 4 tabs. In the PDF we
 * force the print-media style so all sections render sequentially
 * instead of only the active-tab view.
 */
import puppeteer from "puppeteer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTML_PATH = path.resolve(__dirname, "..", "public", "nebbos-delta-brief.html");
const OUT_PDF  = path.resolve(__dirname, "..", "public", "nebbos-presentation.pdf");

async function main() {
  console.log("[pdf] launching headless chrome…");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();

    // Give the print output plenty of room — 8.5x11 landscape reads better
    // for a dashboard/presentation than portrait.
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

    console.log(`[pdf] loading file://${HTML_PATH}`);
    await page.goto(`file://${HTML_PATH}`, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });

    // Emulate print media so the delta brief's own print styles apply.
    await page.emulateMediaType("print");

    // Small delay so any font-swap / layout jitter settles.
    await new Promise((r) => setTimeout(r, 800));

    console.log(`[pdf] rendering to ${OUT_PDF}`);
    await page.pdf({
      path: OUT_PDF,
      format: "Letter",
      landscape: true,
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "24px", bottom: "24px", left: "24px", right: "24px" },
    });

    console.log(`[pdf] done — ${OUT_PDF}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("[pdf] failed:", err);
  process.exit(1);
});
