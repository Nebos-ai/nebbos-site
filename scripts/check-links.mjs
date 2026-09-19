#!/usr/bin/env node
/**
 * scripts/check-links.mjs · v1 · 2026-09-19
 *
 * Founder-directed 2026-09-19: "we need to make sure that every link
 * on the site actually works." Crawls the built marketing site over
 * a running dev/prod server, follows every internal <a href> link,
 * and reports:
 *
 *   - dead internal links (404 / 500 / redirect loop)
 *   - dead in-page anchors (#id that doesn't exist on target page)
 *   - external links skipped (reported at end as an audit list)
 *   - mailto: / tel: links skipped
 *
 * Usage:
 *   node scripts/check-links.mjs                 # crawls http://localhost:3000
 *   node scripts/check-links.mjs --base=URL      # override base
 *   node scripts/check-links.mjs --external      # also HEAD-check external links
 *
 * Non-zero exit if any internal link is broken. External failures
 * are reported but never fail the run (external services can be
 * transiently down and shouldn't block a marketing-site release).
 */

const BASE = (
  process.argv.find((a) => a.startsWith("--base="))?.slice(7) ??
  process.env.CHECK_LINKS_BASE ??
  "http://localhost:3000"
).replace(/\/$/, "");

const CHECK_EXTERNAL = process.argv.includes("--external");

const SEED_ROUTES = ["/"];
const visited = new Set();       // absolute internal URLs already crawled
const queue = [...SEED_ROUTES];  // pending internal paths (relative)
const anchorsByPath = new Map(); // path → Set<anchor-id-on-that-page>
const linksByOrigin = new Map(); // path → Set<{href, kind, status?}>
const external = new Set();      // external URLs discovered
const failures = [];             // {origin, href, reason}

function normalizePath(u) {
  try {
    const url = new URL(u, BASE);
    if (url.origin !== BASE) return null;
    // Strip trailing slash except for root
    let p = url.pathname.replace(/\/+$/, "") || "/";
    return p + url.search + url.hash;
  } catch {
    return null;
  }
}

function stripHash(pathWithHash) {
  const i = pathWithHash.indexOf("#");
  return i === -1 ? pathWithHash : pathWithHash.slice(0, i);
}

function getHash(pathWithHash) {
  const i = pathWithHash.indexOf("#");
  return i === -1 ? "" : pathWithHash.slice(i + 1);
}

async function fetchHtml(path) {
  const url = BASE + path;
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, headers: res.headers, text: res.status === 200 ? await res.text() : "" };
}

function extractLinks(html) {
  const hrefs = new Set();
  const ids = new Set();
  // <a href="…"> (single OR double-quoted)
  const linkRe = /<a\s+[^>]*?href=(?:"([^"]*)"|'([^']*)')[^>]*>/gi;
  let m;
  while ((m = linkRe.exec(html))) {
    const href = m[1] ?? m[2];
    if (href) hrefs.add(href);
  }
  // id="…" for anchor resolution — includes headings + labeled sections
  const idRe = /\sid=(?:"([^"]+)"|'([^']+)')/gi;
  while ((m = idRe.exec(html))) {
    const id = m[1] ?? m[2];
    if (id) ids.add(id);
  }
  return { hrefs, ids };
}

function classify(href) {
  if (!href) return { kind: "empty" };
  if (href.startsWith("#")) return { kind: "in-page-anchor" };
  if (href.startsWith("mailto:")) return { kind: "mailto" };
  if (href.startsWith("tel:")) return { kind: "tel" };
  if (href.startsWith("javascript:")) return { kind: "javascript" };
  if (/^https?:\/\//i.test(href)) {
    try {
      const u = new URL(href);
      if (u.origin === BASE) return { kind: "internal", pathWithHash: (u.pathname.replace(/\/+$/, "") || "/") + u.search + u.hash };
      return { kind: "external", url: href };
    } catch { return { kind: "malformed", href }; }
  }
  // Relative / root-relative
  const p = normalizePath(href);
  if (p === null) return { kind: "malformed", href };
  return { kind: "internal", pathWithHash: p };
}

async function checkExternal(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
    // Some hosts reject HEAD; fall back to GET on 4xx/5xx
    if (res.status >= 400) {
      const g = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(8000) });
      return g.status;
    }
    return res.status;
  } catch (e) {
    return `ERR: ${e.message}`;
  }
}

async function crawl() {
  console.log(`# link check against ${BASE}\n`);
  const t0 = Date.now();

  while (queue.length) {
    const raw = queue.shift();
    const path = normalizePath(raw);
    if (!path) continue;
    const pageOnly = stripHash(path);
    if (visited.has(pageOnly)) continue;
    visited.add(pageOnly);

    let res;
    try {
      res = await fetchHtml(pageOnly);
    } catch (e) {
      failures.push({ origin: "(seed)", href: pageOnly, reason: `fetch: ${e.message}` });
      continue;
    }
    if (res.status !== 200) {
      failures.push({ origin: "(seed)", href: pageOnly, reason: `HTTP ${res.status}` });
      continue;
    }

    const { hrefs, ids } = extractLinks(res.text);
    anchorsByPath.set(pageOnly, ids);
    const originLinks = new Set();
    linksByOrigin.set(pageOnly, originLinks);

    for (const href of hrefs) {
      const c = classify(href);
      originLinks.add(JSON.stringify({ href, kind: c.kind }));
      if (c.kind === "internal") {
        // enqueue for crawl (page + fragment resolution)
        const targetPage = stripHash(c.pathWithHash);
        if (!visited.has(targetPage)) queue.push(targetPage);
        // remember to check fragment later once we have the target page's ids
      } else if (c.kind === "external") {
        external.add(c.url);
      }
    }
    process.stdout.write(".");
  }
  process.stdout.write("\n\n");

  // Second pass: resolve internal fragments against the target page's ids
  for (const [origin, links] of linksByOrigin) {
    for (const raw of links) {
      const { href, kind } = JSON.parse(raw);
      if (kind !== "internal") continue;
      const c = classify(href);
      if (c.kind !== "internal") continue;
      const target = stripHash(c.pathWithHash);
      const hash = getHash(c.pathWithHash);
      if (!visited.has(target)) {
        failures.push({ origin, href, reason: "target page not fetched (404 or off-site)" });
        continue;
      }
      if (hash) {
        const ids = anchorsByPath.get(target) ?? new Set();
        if (!ids.has(hash)) {
          failures.push({ origin, href, reason: `anchor #${hash} not present on ${target}` });
        }
      }
    }
  }

  // In-page anchors (href="#foo") — check they resolve within the origin page
  for (const [origin, links] of linksByOrigin) {
    const originIds = anchorsByPath.get(origin) ?? new Set();
    for (const raw of links) {
      const { href, kind } = JSON.parse(raw);
      if (kind !== "in-page-anchor") continue;
      const id = href.slice(1);
      if (!id) continue; // href="#" is a no-op scroll-to-top, skip
      if (!originIds.has(id)) failures.push({ origin, href, reason: `in-page anchor #${id} not present` });
    }
  }

  // External audit (skip check by default; only when --external)
  let externalStatuses = [];
  if (CHECK_EXTERNAL && external.size) {
    console.log(`# checking ${external.size} external links (HEAD/GET, 8s timeout)…\n`);
    for (const url of external) {
      const status = await checkExternal(url);
      externalStatuses.push({ url, status });
    }
  }

  const t1 = Date.now();
  console.log(`# crawled ${visited.size} internal pages in ${((t1 - t0) / 1000).toFixed(1)}s\n`);
  console.log(`# internal failures: ${failures.length}`);
  console.log(`# external links discovered: ${external.size} (checked: ${CHECK_EXTERNAL ? externalStatuses.length : 0})`);
  console.log("");

  if (failures.length) {
    console.log("## broken internal links\n");
    // Group by origin
    const byOrigin = new Map();
    for (const f of failures) {
      if (!byOrigin.has(f.origin)) byOrigin.set(f.origin, []);
      byOrigin.get(f.origin).push(f);
    }
    for (const [origin, list] of [...byOrigin.entries()].sort()) {
      console.log(`### ${origin}`);
      for (const f of list) {
        console.log(`  - href="${f.href}"  → ${f.reason}`);
      }
      console.log("");
    }
  }

  if (CHECK_EXTERNAL && externalStatuses.length) {
    console.log("## external link statuses\n");
    for (const { url, status } of externalStatuses) {
      const bad = typeof status === "string" || status >= 400;
      console.log(`  [${bad ? "!!" : "ok"}] ${status}  ${url}`);
    }
    console.log("");
  } else if (external.size) {
    console.log("## external links (not verified — pass --external to check)\n");
    for (const url of [...external].sort()) console.log(`  - ${url}`);
    console.log("");
  }

  if (failures.length) process.exit(1);
}

crawl().catch((e) => {
  console.error("Crawler error:", e);
  process.exit(2);
});
