/**
 * scripts/scan-estate-history.ts · Nebbos estate historical scanner
 *
 * Walks git history at monthly intervals from the earliest first-commit across
 * the estate up to today, running full counters at each historical SHA via
 * temporary detached worktrees. Also derives knowledge-side and activity-side
 * dimensions that don't naturally live in git (skills, workflows, concurrent
 * Claude Code sessions) from filesystem timestamps and filename-embedded dates.
 *
 * Outputs (all under content/):
 *   estate-history/<YYYY-MM>.json     — one per historical month
 *   estate-history.index.json         — rolled-up time series for the page
 *   estate-peaks.json                 — all-time peaks across every dimension
 *
 * Runs deterministically: given the same repos at the same SHAs, produces the
 * same numbers. Uses `git worktree add --detach` so no existing branch, no
 * uncommitted change, no peer session is disturbed at any point.
 *
 * Run:  pnpm tsx scripts/scan-estate-history.ts
 * Time: ~30-60 min for the 6-month range (2026-04 through 2026-09).
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { basename, join, resolve } from "node:path";
import { tmpdir } from "node:os";

// ────────────────────────────────────────────────────────────────────────────
// Config (mirrors scan-estate.ts)
// ────────────────────────────────────────────────────────────────────────────

const HOST_ROOT = process.env.NEBBOS_ESTATE_ROOT ?? join(homedir(), "code");
const CLAUDE_ROOT = process.env.NEBBOS_CLAUDE_ROOT ?? join(homedir(), ".claude");

const ESTATE_REPOS = [
  "nebbos-brand", "nebbos-site",
  "nebos-agent-gateway", "nebos-backend", "nebos-billing", "nebos-control-plane",
  "nebos-core", "nebos-dev", "nebos-frontend", "nebos-governance", "nebos-home",
  "nebos-hr", "nebos-k12", "nebos-mail", "nebos-main", "nebos-messaging",
  "nebos-orchestrator", "nebos-platform", "nebos-projects", "nebos-tickets",
] as const;

const EXCLUDE_DIRS = [
  "node_modules", ".git", ".venv", "venv", "__pycache__",
  "dist", "build", ".next", ".turbo", ".cache", "coverage", ".worktrees",
  "generated", "openapi-generated", "codegen", ".openapi",
  "openapi_client", ".openapi-generator",
];
const PRUNE = EXCLUDE_DIRS.map(d => `-name "${d}"`).join(" -o ");
const EXCLUDE_PATHS = [
  "*/clients/python/*",
  "*/clients/typescript/*",
  "*/clients/openapi/*",
];
const PATH_PRUNE = EXCLUDE_PATHS.map(p => `! -path "${p}"`).join(" ");
const NOT_GENERATED = ['"*.generated.ts"', '"*.gen.ts"', '"*.generated.tsx"', '"*.gen.tsx"', '"*.pb.ts"']
  .map(g => `! -name ${g}`).join(" ");

// ────────────────────────────────────────────────────────────────────────────
// Shell helpers
// ────────────────────────────────────────────────────────────────────────────

function sh(cmd: string, cwd?: string): string {
  try {
    return execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 }).trim();
  } catch (err) {
    const e = err as { stdout?: Buffer; status?: number };
    if (e.status === 1 && (e.stdout?.length ?? 0) === 0) return "";
    return "";
  }
}
function shInt(cmd: string, cwd?: string): number {
  const out = sh(cmd, cwd);
  const n = parseInt(out.trim().split(/\s+/)[0] ?? "0", 10);
  return Number.isFinite(n) ? n : 0;
}

// ────────────────────────────────────────────────────────────────────────────
// Historical git walk
// ────────────────────────────────────────────────────────────────────────────

function repoPath(repo: string): string {
  return join(HOST_ROOT, repo);
}

/** First-commit date of a repo (YYYY-MM-DD) or null if repo missing. */
function firstCommitDate(repo: string): string | null {
  const p = repoPath(repo);
  if (!existsSync(join(p, ".git"))) return null;
  return sh(`git log --reverse --format=%as HEAD 2>/dev/null | head -1`, p) || null;
}

/** SHA at repo's HEAD-at-or-before date; null if repo didn't exist yet. */
function shaBefore(repo: string, isoDate: string): string | null {
  const p = repoPath(repo);
  if (!existsSync(join(p, ".git"))) return null;
  const sha = sh(`git rev-list -1 --before="${isoDate}" HEAD 2>/dev/null`, p);
  return sha || null;
}

/** Create a temp worktree at the given SHA; return path. Caller must cleanup. */
function addWorktree(repo: string, sha: string): string {
  const p = repoPath(repo);
  const dest = join(tmpdir(), `nebbos-scan-${repo}-${sha.slice(0, 10)}-${process.pid}`);
  // Cleanup any stale worktree at that path
  try { sh(`git worktree remove --force "${dest}" 2>/dev/null`, p); } catch {}
  try { rmSync(dest, { recursive: true, force: true }); } catch {}
  sh(`git worktree add --detach --quiet "${dest}" ${sha} 2>/dev/null`, p);
  return dest;
}

function removeWorktree(repo: string, worktreePath: string) {
  const p = repoPath(repo);
  try { sh(`git worktree remove --force "${worktreePath}" 2>/dev/null`, p); } catch {}
  try { rmSync(worktreePath, { recursive: true, force: true }); } catch {}
}

// ────────────────────────────────────────────────────────────────────────────
// Path-based counters (operate on any filesystem path, not tied to a repo)
// ────────────────────────────────────────────────────────────────────────────

function pathLinesByExt(path: string, ext: string): number {
  if (!existsSync(path)) return 0;
  const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "*.${ext}" ${NOT_GENERATED} ${PATH_PRUNE} -print 2>/dev/null | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}'`;
  return shInt(cmd, path);
}
function pathFilesByExt(path: string, ext: string): number {
  if (!existsSync(path)) return 0;
  const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "*.${ext}" ${NOT_GENERATED} ${PATH_PRUNE} -print 2>/dev/null | wc -l`;
  return shInt(cmd, path);
}
function pathGrepCount(path: string, pattern: string, exts: string[]): number {
  if (!existsSync(path)) return 0;
  const inc = exts.map(e => `--include="*.${e}"`).join(" ");
  const exc = EXCLUDE_DIRS.map(d => `--exclude-dir="${d}"`).join(" ");
  return shInt(`grep -rE ${inc} ${exc} "${pattern}" . 2>/dev/null | wc -l`, path);
}
function pathFindCount(path: string, findExpr: string): number {
  if (!existsSync(path)) return 0;
  const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o ${findExpr} -print 2>/dev/null | wc -l`;
  return shInt(cmd, path);
}

// ────────────────────────────────────────────────────────────────────────────
// Per-month scan
// ────────────────────────────────────────────────────────────────────────────

type MonthSnapshot = {
  month: string;                    // YYYY-MM
  measuredAt: string;               // ISO timestamp
  cutoffDate: string;               // YYYY-MM-DD used for git rev-list
  reposActive: number;              // # of repos that existed at cutoff
  // Code side
  linesOfCodeTotal: number;
  linesOfCodeByLanguage: Record<string, number>;
  sourceFilesTotal: number;
  commitsCumulative: number;
  testsTotal: number;
  testFilesTotal: number;
  httpEndpoints: number;
  dbMigrations: number;
  reactComponents: number;
  pythonCallables: number;
  typescriptExports: number;
  // Knowledge side
  architectureSpecsRatified: number;
  architectureSpecsPipeline: number;
  governanceGraphNodes: number;
  governanceGraphEdges: number;
  constitutionalArticles: number;
  // Substrate (Claude Code) at cutoff
  skills: number;
  enforcementHooks: number;
  doctrineMemories: number;
  feedbackMemories: number;
  sessionReports: number;
  workflows: number;
};

function monthEndCutoff(monthStr: string): string {
  // For month = "2026-05", cutoff is "2026-06-01" (exclusive-before → last commit in May).
  const [y, m] = monthStr.split("-").map(n => parseInt(n, 10));
  const nextMonth = m === 12 ? 1 : m + 1;
  const nextYear = m === 12 ? y + 1 : y;
  return `${nextYear.toString().padStart(4, "0")}-${nextMonth.toString().padStart(2, "0")}-01`;
}

/** Read graph.json AT the given SHA of nebos-governance via `git show`. */
function graphAtSha(sha: string): { nodes: number; edges: number; ratified: number; pipeline: number; articles: number } {
  const govPath = repoPath("nebos-governance");
  if (!sha || !existsSync(join(govPath, ".git"))) {
    return { nodes: 0, edges: 0, ratified: 0, pipeline: 0, articles: 0 };
  }
  let raw: string;
  try {
    raw = sh(`git show ${sha}:governance-graph/graph.json 2>/dev/null`, govPath);
  } catch { return { nodes: 0, edges: 0, ratified: 0, pipeline: 0, articles: 0 }; }
  if (!raw) return { nodes: 0, edges: 0, ratified: 0, pipeline: 0, articles: 0 };
  let parsed: { meta?: { node_count?: number; edge_count?: number }; nodes?: Array<{ status?: string }>; edges?: unknown[] };
  try { parsed = JSON.parse(raw); } catch { return { nodes: 0, edges: 0, ratified: 0, pipeline: 0, articles: 0 }; }
  const nodes = parsed.meta?.node_count ?? parsed.nodes?.length ?? 0;
  const edges = parsed.meta?.edge_count ?? parsed.edges?.length ?? 0;
  let ratified = 0;
  for (const n of (parsed.nodes ?? [])) {
    const s = (n.status ?? "").toLowerCase().replace(/^["']|["']$/g, "");
    if (s === "ratified" || s === "final") ratified++;
  }
  // Pipeline drafts at that SHA (files under decisions/drafts/)
  const draftsList = sh(`git ls-tree -r --name-only ${sha} -- docs/decisions/drafts/ 2>/dev/null | grep '\\.md$' | wc -l`, govPath);
  const pipeline = parseInt(draftsList, 10) || 0;
  // Constitutional articles = "^## Article" (or any header depth) matches in decisions.md at that SHA
  let articles = 0;
  const decisionsRaw = sh(`git show ${sha}:docs/decisions/decisions.md 2>/dev/null`, govPath);
  if (decisionsRaw) {
    articles = (decisionsRaw.match(/^#+\s+.*Article\b/gm) ?? []).length;
  }
  return { nodes, edges, ratified, pipeline, articles };
}

/** Filename-embedded date (YYYY-MM-DD) or null. Handles feedback_XXXX_2026_09_04.md too. */
function fileDateFromName(name: string): string | null {
  // Try YYYY-MM-DD anywhere
  const m1 = name.match(/(\d{4})[-_](\d{2})[-_](\d{2})/);
  if (m1) return `${m1[1]}-${m1[2]}-${m1[3]}`;
  return null;
}

/** Count files under `dir` (non-recursive) whose date (filename OR mtime) is ≤ cutoff. */
function claudeFilesAtCutoff(dir: string, cutoffISO: string, filter: (name: string) => boolean): number {
  if (!existsSync(dir)) return 0;
  const cutoffTs = Date.parse(cutoffISO);
  let count = 0;
  for (const name of readdirSync(dir)) {
    if (!filter(name)) continue;
    const filenameDate = fileDateFromName(name);
    if (filenameDate) {
      if (Date.parse(filenameDate) <= cutoffTs) count++;
      continue;
    }
    try {
      const st = statSync(join(dir, name));
      if (st.mtimeMs <= cutoffTs) count++;
    } catch { /* skip */ }
  }
  return count;
}

/** Count directories under `dir` whose earliest-file mtime is ≤ cutoff (proxy for "existed by then"). */
function claudeDirsAtCutoff(dir: string, cutoffISO: string): number {
  if (!existsSync(dir)) return 0;
  const cutoffTs = Date.parse(cutoffISO);
  let count = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    try {
      const st = statSync(p);
      if (!st.isDirectory()) continue;
      if (st.mtimeMs <= cutoffTs) count++;
    } catch { /* skip */ }
  }
  return count;
}

function scanMonth(monthStr: string): MonthSnapshot {
  const cutoff = monthEndCutoff(monthStr);
  const cutoffISO = `${cutoff}T00:00:00Z`;
  const measuredAt = new Date().toISOString();

  process.stderr.write(`⏳ ${monthStr} — walking ${ESTATE_REPOS.length} repos to their SHA at ${cutoff}...\n`);

  const langLoc: Record<string, number> = { python: 0, typescript: 0, javascript: 0, markdown: 0, "html/css": 0, sql: 0 };
  let sourceFilesTotal = 0;
  let commitsCumulative = 0;
  let reposActive = 0;
  let testCasesTs = 0;
  let testCasesPy = 0;
  let testFilesTs = 0;
  let testFilesPy = 0;
  let httpEndpoints = 0;
  let dbMigrations = 0;
  let reactComponents = 0;
  let pyDefs = 0;
  let pyAsyncDefs = 0;
  let pyClasses = 0;
  let tsExportFns = 0;
  let tsExportArrows = 0;
  let governanceSha: string | null = null;

  for (const repo of ESTATE_REPOS) {
    const sha = shaBefore(repo, cutoff);
    if (!sha) continue;
    reposActive++;
    if (repo === "nebos-governance") governanceSha = sha;

    commitsCumulative += shInt(`git rev-list --count ${sha}`, repoPath(repo));

    let wt: string | null = null;
    try {
      wt = addWorktree(repo, sha);
      langLoc.python      += pathLinesByExt(wt, "py");
      langLoc.typescript  += pathLinesByExt(wt, "ts") + pathLinesByExt(wt, "tsx");
      langLoc.javascript  += pathLinesByExt(wt, "js") + pathLinesByExt(wt, "jsx");
      langLoc.markdown    += pathLinesByExt(wt, "md");
      langLoc["html/css"] += pathLinesByExt(wt, "css") + pathLinesByExt(wt, "scss") + pathLinesByExt(wt, "html");
      langLoc.sql         += pathLinesByExt(wt, "sql");
      sourceFilesTotal    += pathFindCount(wt, `-type f`);
      testCasesTs         += pathGrepCount(wt, "^\\s*(it|test|describe)\\(", ["ts", "tsx", "js", "jsx"]);
      testCasesPy         += pathGrepCount(wt, "^def test_", ["py"]) + pathGrepCount(wt, "^async def test_", ["py"]);
      testFilesTs         += pathFindCount(wt, `-type f \\( -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" -o -name "*.spec.tsx" \\)`);
      testFilesPy         += pathFindCount(wt, `-type f \\( -name "test_*.py" -o -name "*_test.py" \\)`);
      httpEndpoints       += pathGrepCount(wt, "@(app|router)\\.(get|post|put|patch|delete|options|head)", ["py"]);
      httpEndpoints       += pathFindCount(wt, `-type f -name "route.ts"`);
      httpEndpoints       += pathFindCount(wt, `-type f \\( -name "page.tsx" -o -name "page.ts" \\)`);
      dbMigrations        += pathFindCount(wt, `-path "*versions*" -type f -name "*.py"`);
      reactComponents     += pathFindCount(wt, `-type f \\( -name "*.tsx" -o -name "*.jsx" \\) ${NOT_GENERATED} ! -name "*.test.tsx" ! -name "*.spec.tsx" ! -name "*.stories.tsx"`);
      pyDefs              += pathGrepCount(wt, "^def ", ["py"]);
      pyAsyncDefs         += pathGrepCount(wt, "^async def ", ["py"]);
      pyClasses           += pathGrepCount(wt, "^class ", ["py"]);
      tsExportFns         += pathGrepCount(wt, "^export (async )?function ", ["ts", "tsx"]);
      tsExportArrows      += pathGrepCount(wt, "^export const [A-Za-z_$][A-Za-z0-9_$]* = (async )?\\(", ["ts", "tsx"]);
    } finally {
      if (wt) removeWorktree(repo, wt);
    }
  }

  const linesOfCodeTotal = Object.values(langLoc).reduce((a, b) => a + b, 0);

  // Governance graph AT that SHA of nebos-governance
  const gov = graphAtSha(governanceSha ?? "");

  // Claude substrate at that cutoff (filename dates + mtime fallback)
  const memoryDir = join(CLAUDE_ROOT, "projects", "-Users-matic", "memory");
  const doctrineMemories = claudeFilesAtCutoff(memoryDir, cutoffISO, n => n.endsWith(".md"));
  const feedbackMemories = claudeFilesAtCutoff(memoryDir, cutoffISO, n => n.startsWith("feedback_") && n.endsWith(".md"));
  const sessionReports = claudeFilesAtCutoff(join(CLAUDE_ROOT, "state", "session_reports"), cutoffISO, n => n.endsWith(".md"));
  const enforcementHooks = claudeFilesAtCutoff(join(CLAUDE_ROOT, "hooks"), cutoffISO, n => n.endsWith(".py"));
  const skills = claudeDirsAtCutoff(join(CLAUDE_ROOT, "skills"), cutoffISO);
  // Workflows = user-authored workflow scripts + governance routines. Approximate by counting files.
  const userWorkflows = claudeFilesAtCutoff(join(CLAUDE_ROOT, "workflows"), cutoffISO, n => n.endsWith(".ts") || n.endsWith(".js") || n.endsWith(".mjs"));
  const govRoutinesDir = join(HOST_ROOT, "nebos-governance", "docs", "governance", "routines");
  const govRoutines = existsSync(govRoutinesDir)
    ? (governanceSha ? (parseInt(sh(`git ls-tree -r --name-only ${governanceSha} -- docs/governance/routines/ 2>/dev/null | grep -c '\\.md$'`, repoPath("nebos-governance")), 10) || 0) : 0)
    : 0;
  const workflows = userWorkflows + govRoutines;

  return {
    month: monthStr,
    measuredAt,
    cutoffDate: cutoff,
    reposActive,
    linesOfCodeTotal,
    linesOfCodeByLanguage: langLoc,
    sourceFilesTotal,
    commitsCumulative,
    testsTotal: testCasesTs + testCasesPy,
    testFilesTotal: testFilesTs + testFilesPy,
    httpEndpoints,
    dbMigrations,
    reactComponents,
    pythonCallables: pyDefs + pyAsyncDefs + pyClasses,
    typescriptExports: tsExportFns + tsExportArrows,
    architectureSpecsRatified: gov.ratified,
    architectureSpecsPipeline: gov.pipeline,
    governanceGraphNodes: gov.nodes,
    governanceGraphEdges: gov.edges,
    constitutionalArticles: gov.articles,
    skills,
    enforcementHooks,
    doctrineMemories,
    feedbackMemories,
    sessionReports,
    workflows,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Peaks — activity-side dimensions computed once from full history
// ────────────────────────────────────────────────────────────────────────────

type Peaks = {
  computedAt: string;
  concurrentSessionsPeak: { count: number; observedAt: string | null; windowMinutes: number };
  commitsInSingleDayPeak: { count: number; date: string | null };
  worktreesActivePeak: { count: number; approximatedFrom: string };
};

/**
 * Concurrent-session peak — count the maximum number of session_reports whose
 * mtime falls within a 30-minute rolling window. A session_report's mtime is
 * updated on every assistant turn, so overlapping mtimes correspond to sessions
 * being actively worked on at the same time.
 */
function concurrentSessionsPeak(): { count: number; observedAt: string | null; windowMinutes: number } {
  const dir = join(CLAUDE_ROOT, "state", "session_reports");
  if (!existsSync(dir)) return { count: 0, observedAt: null, windowMinutes: 30 };
  const mtimes: number[] = [];
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".md")) continue;
    try { mtimes.push(statSync(join(dir, f)).mtimeMs); } catch {}
  }
  mtimes.sort((a, b) => a - b);
  const windowMs = 30 * 60 * 1000;
  let left = 0;
  let peak = 0;
  let peakAt = 0;
  for (let right = 0; right < mtimes.length; right++) {
    while (mtimes[right] - mtimes[left] > windowMs) left++;
    const window = right - left + 1;
    if (window > peak) { peak = window; peakAt = mtimes[right]; }
  }
  return {
    count: peak,
    observedAt: peakAt ? new Date(peakAt).toISOString() : null,
    windowMinutes: 30,
  };
}

/** Peak commits merged on any single calendar day across the whole estate. */
function commitsPerDayPeak(): { count: number; date: string | null } {
  const perDay: Record<string, number> = {};
  for (const repo of ESTATE_REPOS) {
    const p = repoPath(repo);
    if (!existsSync(join(p, ".git"))) continue;
    const raw = sh(`git log --format=%as HEAD 2>/dev/null`, p);
    for (const line of raw.split("\n")) {
      if (!line) continue;
      perDay[line] = (perDay[line] ?? 0) + 1;
    }
  }
  let peak = 0;
  let peakDay: string | null = null;
  for (const [day, n] of Object.entries(perDay)) {
    if (n > peak) { peak = n; peakDay = day; }
  }
  return { count: peak, date: peakDay };
}

/** Peak worktrees active — count currently-open worktrees across estate (approximation). */
function worktreesPeak(): { count: number; approximatedFrom: string } {
  let total = 0;
  for (const repo of ESTATE_REPOS) {
    const wt = join(HOST_ROOT, `${repo}-worktrees`);
    if (existsSync(wt)) {
      try {
        for (const name of readdirSync(wt)) {
          try { if (statSync(join(wt, name)).isDirectory()) total++; } catch {}
        }
      } catch {}
    }
    const wtLocal = join(repoPath(repo), ".worktrees");
    if (existsSync(wtLocal)) {
      try {
        for (const name of readdirSync(wtLocal)) {
          try { if (statSync(join(wtLocal, name)).isDirectory()) total++; } catch {}
        }
      } catch {}
    }
  }
  return { count: total, approximatedFrom: "current snapshot of *-worktrees + repo/.worktrees dirs" };
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

function enumerateMonths(startMonth: string, endMonth: string): string[] {
  const out: string[] = [];
  const [sy, sm] = startMonth.split("-").map(n => parseInt(n, 10));
  const [ey, em] = endMonth.split("-").map(n => parseInt(n, 10));
  let y = sy; let m = sm;
  while (y < ey || (y === ey && m <= em)) {
    out.push(`${y.toString().padStart(4, "0")}-${m.toString().padStart(2, "0")}`);
    m++; if (m > 12) { m = 1; y++; }
  }
  return out;
}

function findEarliestMonth(): string {
  let earliest = "9999-99";
  for (const repo of ESTATE_REPOS) {
    const d = firstCommitDate(repo);
    if (!d) continue;
    const m = d.slice(0, 7);
    if (m < earliest) earliest = m;
  }
  return earliest === "9999-99" ? new Date().toISOString().slice(0, 7) : earliest;
}

function todayMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

async function main() {
  const t0 = Date.now();
  const start = findEarliestMonth();
  const end = todayMonth();
  const months = enumerateMonths(start, end);

  console.error(`\n╭─ Nebbos estate — historical scan`);
  console.error(`│  Range:  ${start} → ${end}  (${months.length} months)`);
  console.error(`│  Estate: ${ESTATE_REPOS.length} repos`);
  console.error(`╰─────────────────────────────────────────────\n`);

  const outDir = resolve(process.cwd(), "content", "estate-history");
  mkdirSync(outDir, { recursive: true });

  const snapshots: MonthSnapshot[] = [];
  for (const month of months) {
    const t1 = Date.now();
    const snap = scanMonth(month);
    snapshots.push(snap);
    writeFileSync(join(outDir, `${month}.json`), JSON.stringify(snap, null, 2) + "\n", "utf8");
    const dt = ((Date.now() - t1) / 1000).toFixed(1);
    console.error(`✓ ${month} (${dt}s):  LOC ${snap.linesOfCodeTotal.toLocaleString().padStart(10)}  ·  specs ${snap.architectureSpecsRatified.toString().padStart(4)}  ·  KG ${snap.governanceGraphNodes.toString().padStart(4)} nodes  ·  memories ${snap.doctrineMemories.toString().padStart(4)}`);
  }

  // Rolled-up index for the page
  const indexPath = resolve(process.cwd(), "content", "estate-history.index.json");
  writeFileSync(indexPath, JSON.stringify({
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    monthsCount: snapshots.length,
    startMonth: start,
    endMonth: end,
    snapshots: snapshots.map(s => ({
      month: s.month,
      reposActive: s.reposActive,
      loc: s.linesOfCodeTotal,
      tests: s.testsTotal,
      commits: s.commitsCumulative,
      httpEndpoints: s.httpEndpoints,
      components: s.reactComponents,
      specs: s.architectureSpecsRatified,
      pipeline: s.architectureSpecsPipeline,
      kgNodes: s.governanceGraphNodes,
      articles: s.constitutionalArticles,
      hooks: s.enforcementHooks,
      skills: s.skills,
      memories: s.doctrineMemories,
      sessionReports: s.sessionReports,
      workflows: s.workflows,
    })),
  }, null, 2) + "\n", "utf8");
  console.error(`\n✓ wrote index: ${indexPath}`);

  // Peaks
  console.error(`\n⏳ computing peaks...`);
  const peaks: Peaks = {
    computedAt: new Date().toISOString(),
    concurrentSessionsPeak: concurrentSessionsPeak(),
    commitsInSingleDayPeak: commitsPerDayPeak(),
    worktreesActivePeak: worktreesPeak(),
  };
  const peaksPath = resolve(process.cwd(), "content", "estate-peaks.json");
  writeFileSync(peaksPath, JSON.stringify(peaks, null, 2) + "\n", "utf8");
  console.error(`✓ wrote peaks:  ${peaksPath}`);
  console.error(`  · Concurrent sessions (30-min window):  ${peaks.concurrentSessionsPeak.count}   ${peaks.concurrentSessionsPeak.observedAt ?? ""}`);
  console.error(`  · Commits in single day (all-estate):   ${peaks.commitsInSingleDayPeak.count}   ${peaks.commitsInSingleDayPeak.date ?? ""}`);
  console.error(`  · Worktrees active right now:            ${peaks.worktreesActivePeak.count}`);

  const totalMin = ((Date.now() - t0) / 60000).toFixed(1);
  console.error(`\n╰─ done in ${totalMin} min\n`);
}

main().catch(err => { console.error("historical scan failed:", err); process.exit(1); });
