#!/usr/bin/env node
/**
 * Content-freeze guard for visual redesign work.
 *
 * Dumps the text content of every route (sitemap + a11y routes) to JSON so a
 * restyle can be proven copy-neutral: run once before, once after, diff.
 *
 *   node scripts/text-snapshot.mjs <out.json> [baseURL]
 *   node scripts/text-snapshot.mjs --diff <before.json> <after.json>
 *
 * Captures textContent (not innerText) so hidden-but-present copy (mega-menu,
 * visually-hidden labels) counts, plus alt / aria-label / title attributes.
 * aria-hidden subtrees are included: decorative mocks still carry visible copy.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

// Routes the sitemap does not list (tier pages, bespoke pages, MDX posts).
const EXTRA_ROUTES = [
  "/pricing",
  "/how",
  "/sovereignty",
  "/design",
  ...["platform", "app", "mcp", "cradle"].flatMap((p) =>
    ["guest", "host", "architect"].map((t) => `/products/${p}/${t}`),
  ),
  "/blog/client-isolation-as-a-database-primitive",
  "/blog/deterministic-before-the-model",
  "/blog/why-dashboards-tell-you-too-late",
  "/careers/founding-backend-engineer",
  "/careers/founding-frontend-engineer",
  "/not-found-triggering-route",
];

async function snapshot(out, base = "http://localhost:3000") {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const routes = [
    ...new Set([
      ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname),
      ...EXTRA_ROUTES,
    ]),
  ].sort();

  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const result = {};
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    result[route] = await page.evaluate(() => {
      const words = [];
      const attrs = [];
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          words.push(node.textContent);
          return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const el = node;
        // TITLE/META/LINK: Next 15 streams metadata into <body> on dynamic
        // routes (timing-dependent); the page title is compared separately.
        if (["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TITLE", "META", "LINK"].includes(el.tagName)) return;
        for (const a of ["alt", "aria-label", "title", "placeholder"]) {
          const v = el.getAttribute(a);
          if (v) attrs.push(`${a}=${v.trim()}`);
        }
        el.childNodes.forEach(walk);
      };
      walk(document.body);
      return {
        title: document.title,
        text: words.join(" ").split(/\s+/).filter(Boolean),
        attrs,
      };
    });
  }
  await browser.close();
  writeFileSync(out, JSON.stringify(result, null, 2));
  console.log(`snapshot: ${routes.length} routes -> ${out}`);
}

function diff(beforePath, afterPath) {
  const a = JSON.parse(readFileSync(beforePath, "utf8"));
  const b = JSON.parse(readFileSync(afterPath, "utf8"));
  let failures = 0;
  for (const route of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const x = a[route];
    const y = b[route];
    if (!x || !y) {
      console.log(`✗ ${route}: only in ${x ? "before" : "after"}`);
      failures++;
      continue;
    }
    const problems = [];
    if (x.title !== y.title) problems.push(`title: "${x.title}" -> "${y.title}"`);
    const tx = x.text.join(" ");
    const ty = y.text.join(" ");
    if (tx !== ty) {
      let i = 0;
      while (i < x.text.length && x.text[i] === y.text[i]) i++;
      problems.push(
        `text diverges at word ${i}:\n    before: …${x.text.slice(Math.max(0, i - 6), i + 12).join(" ")}\n    after:  …${y.text.slice(Math.max(0, i - 6), i + 12).join(" ")}`,
      );
    }
    const ax = [...x.attrs].sort().join("\n");
    const ay = [...y.attrs].sort().join("\n");
    if (ax !== ay) {
      const sx = new Set(x.attrs);
      const sy = new Set(y.attrs);
      const gone = x.attrs.filter((v) => !sy.has(v));
      const added = y.attrs.filter((v) => !sx.has(v));
      problems.push(`attrs: -[${gone.join(" | ")}] +[${added.join(" | ")}]`);
    }
    if (problems.length) {
      failures++;
      console.log(`✗ ${route}\n  ${problems.join("\n  ")}`);
    }
  }
  console.log(failures ? `\n${failures} route(s) changed` : "✓ copy identical on all routes");
  process.exit(failures ? 1 : 0);
}

const [, , first, ...rest] = process.argv;
if (first === "--diff") diff(rest[0], rest[1]);
else if (first) await snapshot(first, rest[0]);
else {
  console.error("usage: text-snapshot.mjs <out.json> [baseURL] | --diff <before> <after>");
  process.exit(2);
}
