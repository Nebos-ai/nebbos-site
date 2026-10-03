#!/usr/bin/env node
// check-marketing-claims.mjs — marketing-claim substrate gate.
//
// RULE (per `feedback_marketing_site_pricing_editorial_discipline` +
// `feedback_content_taxonomy_pattern_nebbos_site`):
//
//   Every specific claim on the marketing site — customer counts, deployment
//   numbers, geo counts, timeline assertions, case-study references, "running
//   today" language — must either (a) import from `content/claims.ts` OR
//   (b) carry an inline `// claim-source: <slug>` comment on the same line
//   pointing at a `CLAIMS.<slug>` entry.
//
// This gate greps `components/` and `app/` for hazard patterns that historically
// generated legal-risk copy (MarketingProof v2, 2026-09-18) and fails the PR
// on any unsourced hit.
//
// SCOPE: `.tsx` and `.ts` files under components/ and app/. Not tests (which
// legitimately quote hazard shapes to test them).
//
// ESCAPE:
//   - Same-line trailing comment: `// claim-source: <slug>`
//   - Fenced ignore block: `/* claims-off */ … /* claims-on */`
//   - Whitelisted file: add path to `WHITELISTED_FILES` below (rare — the
//     file must legitimately need to talk about hazard shapes, e.g. the
//     `content/claims.ts` file itself or the gate's own self-test fixture).
//
// SELF-TEST: `node scripts/check-marketing-claims.mjs --self-test` runs a set
// of fail-before / pass-after fixtures. Re-run after any edit to the pattern
// list before trusting the gate on a real PR.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(fileURLToPath(import.meta.url), "..", "..");

// --------------------------------------------------------------------------
// Hazard patterns — each has a name (for the error message) and a regex.
// Ordered by class so a hit reports the specific concern the pattern encodes.
// --------------------------------------------------------------------------
const HAZARD_PATTERNS = [
  {
    name: "numeric-customer-count",
    description:
      "A number followed by a customer/deployment/pilot noun. If real, " +
      "declare it in `content/claims.ts`; if aspirational, do not ship it.",
    // Digit form.
    regex:
      /\b\d+\s+(school|district|customer|user|client|pilot|state|hospital|company|team|deployment|instance|tenant|reference|case[-\s]?stud(y|ies))\w*\b/gi,
  },
  {
    name: "wordform-customer-count",
    description:
      "A word-form number followed by a customer/deployment/pilot noun. " +
      "Same rule as `numeric-customer-count`.",
    regex:
      /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozens?|hundreds?|thousands?)\s+(schools?|districts?|customers?|users?|clients?|pilots?|states?|hospitals?|companies|companys?|teams?|deployments?|instances?|tenants?|references?|case[-\s]?stud(y|ies))\b/gi,
  },
  {
    name: "timeline-live-claim",
    description:
      "A 'running/deployed/shipping/live/in production' phrase with a " +
      "deployment-timeline marker. Implies real deployments. If real, " +
      "declare in `content/claims.ts`; if aspirational, do not ship it.",
    // Two matched shapes:
    //   1. running|deployed|shipping|shipped|piloting|in production|in flight
    //      + today|now|across|since  (strong deployment claim)
    //   2. live|active + in production|today|now|across|since
    //      (the "live" and "active" words alone are too generic to trigger;
    //       "live in <file>" / "active in <section>" is legitimately non-claim
    //       language and used to false-positive.)
    regex:
      /\b(?:(?:running|deployed|shipping|shipped|piloting|in production|in flight)\s+(?:today|now|across|since)|(?:live|active)\s+(?:in production|today|now|across|since))\b/gi,
  },
  {
    name: "geo-count-claim",
    description:
      "An 'across N states/countries/regions/districts' phrase. Specific " +
      "geographic reach claim — verifiable, so it needs a source-of-record.",
    regex: /\bacross\s+\w+\s+(states?|countries|regions|districts)\b/gi,
  },
  {
    name: "named-reference-claim",
    description:
      "A 'case studies land / case studies as / approved public reference / " +
      "named customer' phrase. Implies a real reference; needs a " +
      "source-of-record. If none exists, do not ship it. Bare 'Case study' " +
      "used as a generic section label (a taxonomy row, not a claim about " +
      "OUR customers) is intentionally excluded.",
    // Plural "case studies" is a stronger signal than bare "Case study"
    // (the latter is used as a generic section-type label in PageRenderer
    // block taxonomy). Require plural OR the "approved public reference"
    // and "named customer" phrases which are unambiguous claims.
    regex:
      /\b(case\s+studies|approved\s+public\s+reference|named\s+customer)s?\b/gi,
  },
];

// --------------------------------------------------------------------------
// Scope: files scanned for hazard patterns.
// --------------------------------------------------------------------------
const SCAN_DIRS = ["components", "app"];
const SCAN_EXTENSIONS = [".tsx", ".ts"];
const EXCLUDE_SUFFIXES = [".test.tsx", ".test.ts", ".spec.tsx", ".spec.ts"];

// Files legitimately allowed to reference hazard shapes (the substrate file,
// the gate's own self-test fixture, etc.). Additions to this list require an
// ADR link or a `feedback_` memory slug in the trailing comment.
const WHITELISTED_FILES = new Set([
  // content/claims.ts contains hazard-pattern documentation in its docstring.
  // It is not under components/ or app/, so it's already out of scope; kept
  // here as a landmark in case someone moves it or splits it.
  "content/claims.ts",
]);

// Escape trailer: any occurrence of `claim-source: <slug>` on the line
// suppresses hazard-matches on that line. Works in `//` line comments,
// `* … claim-source: …` JSDoc middle lines, and inline JSX comments.
// The slug is the id of a `content/claims.ts` entry OR a special-purpose
// documentation slug (see `content/claims.ts` for the current set).
const CLAIM_SOURCE_RE = /\bclaim-source:\s*[a-z0-9-]+/i;

// Fenced ignore block: /* claims-off */ ... /* claims-on */
const FENCE_OFF = /\/\*\s*claims-off\s*\*\//g;
const FENCE_ON = /\/\*\s*claims-on\s*\*\//g;

// --------------------------------------------------------------------------
// File-walk helpers.
// --------------------------------------------------------------------------

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch (e) {
    if (e.code === "ENOENT") return;
    throw e;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip nested node_modules just in case.
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      yield* walk(full);
    } else if (entry.isFile()) {
      if (!SCAN_EXTENSIONS.some((ext) => full.endsWith(ext))) continue;
      if (EXCLUDE_SUFFIXES.some((suffix) => full.endsWith(suffix))) continue;
      yield full;
    }
  }
}

function stripFencedIgnores(source) {
  // Remove any section between /* claims-off */ and /* claims-on */.
  // Kept simple — no nested fences.
  const result = [];
  let cursor = 0;
  const offMatches = [...source.matchAll(FENCE_OFF)];
  for (const off of offMatches) {
    const offEnd = off.index + off[0].length;
    // Copy up to the fence-off.
    result.push(source.slice(cursor, off.index));
    // Find the paired fence-on.
    FENCE_ON.lastIndex = offEnd;
    const on = FENCE_ON.exec(source);
    if (!on) {
      // Unclosed fence — treat the rest of the file as ignored.
      return result.join("");
    }
    cursor = on.index + on[0].length;
  }
  result.push(source.slice(cursor));
  return result.join("");
}

// --------------------------------------------------------------------------
// Core check — returns array of {file, line, lineText, pattern} violations.
// --------------------------------------------------------------------------
function checkFile(absPath) {
  const rel = relative(REPO_ROOT, absPath);
  if (WHITELISTED_FILES.has(rel)) return [];
  const raw = readFileSync(absPath, "utf8");
  const source = stripFencedIgnores(raw);
  const lines = source.split("\n");
  const violations = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    // Skip lines that carry an explicit claim-source trailer.
    if (CLAIM_SOURCE_RE.test(line)) continue;
    for (const hazard of HAZARD_PATTERNS) {
      // Reset the regex's lastIndex (they use /g).
      hazard.regex.lastIndex = 0;
      const m = hazard.regex.exec(line);
      if (m) {
        violations.push({
          file: rel,
          line: i + 1,
          lineText: line.trim(),
          pattern: hazard.name,
          match: m[0],
          description: hazard.description,
        });
      }
    }
  }
  return violations;
}

function checkAll() {
  const all = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(REPO_ROOT, dir))) {
      all.push(...checkFile(file));
    }
  }
  return all;
}

// --------------------------------------------------------------------------
// Reporting.
// --------------------------------------------------------------------------
function report(violations) {
  if (violations.length === 0) {
    console.log("✓ marketing-claims gate clean — no unsourced hazard shapes.");
    return 0;
  }
  console.error(
    `✗ marketing-claims gate FAILED — ${violations.length} unsourced claim(s):\n`,
  );
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    pattern: ${v.pattern}  match: "${v.match}"`);
    console.error(`    line:    ${v.lineText}`);
    console.error(`    fix:     ${v.description}`);
    console.error(
      `    escape:  add "// claim-source: <slug>" on the same line, or import from content/claims.ts, or wrap in /* claims-off */ ... /* claims-on */ if the shape is legitimately non-claim (e.g. a test fixture).\n`,
    );
  }
  return 1;
}

// --------------------------------------------------------------------------
// Self-test.
// --------------------------------------------------------------------------
function selfTest() {
  const fixtures = [
    {
      name: "bare digit + customer noun triggers",
      source: "<p>12 school districts running Nebbos today</p>",
      shouldFail: true,
    },
    {
      name: "word-form + customer noun triggers",
      source: "<p>Twelve school districts running today</p>",
      shouldFail: true,
    },
    {
      name: "timeline-live phrase triggers",
      source: "<p>Nebbos is running today across four regions.</p>",
      shouldFail: true,
    },
    {
      name: "geo-count phrase triggers",
      source: "<p>Across four states.</p>",
      shouldFail: true,
    },
    {
      name: "case-study phrase triggers",
      source: "<p>Named case studies land on /customers.</p>",
      shouldFail: true,
    },
    {
      name: "claim-source escape suppresses",
      source:
        '<p>{M.shipped.commits_last_30d} commits in the last thirty days</p> // claim-source: dogfood-commits-last-30d',
      shouldFail: false,
    },
    {
      name: "fenced ignore block suppresses",
      source:
        "/* claims-off */ const x = '12 school districts'; /* claims-on */",
      shouldFail: false,
    },
    {
      name: "unrelated numeric (Tailwind class-like) does not trigger",
      source: '<div className="text-[0.65rem] w-1.5 h-1.5 p-2">…</div>',
      shouldFail: false,
    },
    {
      name: "dogfood metrics import (no inline numeric noun) passes",
      source:
        '<p>{M.shipped.lines_of_code_millions}M lines of code, across {M.shipped.repositories} repositories</p>',
      shouldFail: false,
    },
    {
      name: "'live in <file>' does not trigger (false-positive class)",
      source: 'Design tokens live in design/tokens.json (see /design).',
      shouldFail: false,
    },
    {
      name: "'live in production' still triggers (real deployment claim)",
      source: 'Multi-Shell by default, live in production today.',
      shouldFail: true,
    },
    {
      name: "bare 'Case study' section-label does not trigger",
      source: '{eb ? `${eb.n} · ${eb.label}` : "Case study"}',
      shouldFail: false,
    },
    {
      name: "'case studies land here' still triggers (plural, claim shape)",
      source:
        'Case studies land here as each district signs off publicly.',
      shouldFail: true,
    },
  ];
  let passed = 0;
  let failed = 0;
  for (const fx of fixtures) {
    // Wrap the fixture in a fake file check.
    const source = stripFencedIgnores(fx.source);
    let hit = false;
    for (const hazard of HAZARD_PATTERNS) {
      hazard.regex.lastIndex = 0;
      // Also skip line if it carries the claim-source trailer.
      if (CLAIM_SOURCE_RE.test(source)) continue;
      if (hazard.regex.test(source)) {
        hit = true;
        break;
      }
    }
    const gotFailure = hit;
    if (gotFailure === fx.shouldFail) {
      passed += 1;
      console.log(`  PASS  ${fx.name}`);
    } else {
      failed += 1;
      console.error(
        `  FAIL  ${fx.name}  (expected shouldFail=${fx.shouldFail}, got hit=${gotFailure})`,
      );
    }
  }
  console.log(`\n${passed}/${passed + failed} self-test fixtures passed.`);
  return failed === 0 ? 0 : 1;
}

// --------------------------------------------------------------------------
// Entry.
// --------------------------------------------------------------------------
const args = process.argv.slice(2);
if (args.includes("--self-test")) {
  process.exit(selfTest());
} else {
  process.exit(report(checkAll()));
}
