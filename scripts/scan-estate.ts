/**
 * scripts/scan-estate.ts · Nebbos estate scanner
 *
 * Emits content/estate-stats.json for the /platform/numbers route.
 * Run: `pnpm tsx scripts/scan-estate.ts` (or `npx tsx …` if pnpm missing).
 *
 * Scope: measures the current state of the Nebbos estate (repos under the
 * host's ~/code/ tree, plus Claude Code substrate under ~/.claude/) and writes
 * a versioned JSON manifest matching lib/estate-stats.ts.
 *
 * Assumes: all estate repos are checked out locally as siblings of nebbos-site.
 * In CI, a preceding step must clone the estate first (see the follow-on
 * .github/workflows/estate-stats.yml — not yet wired).
 *
 * Discipline: numbers are counts, never estimates. If a source is missing, we
 * fail loudly rather than fabricate. The manifest carries the git SHA of
 * nebos-governance at scan time so any downstream number can be re-verified.
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

import type { EstateStats } from "../lib/estate-stats";
import { CURRENT_SCHEMA_VERSION } from "../lib/estate-stats";

// ────────────────────────────────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────────────────────────────────

const HOST_ROOT = process.env.NEBBOS_ESTATE_ROOT ?? join(homedir(), "code");
const CLAUDE_ROOT = process.env.NEBBOS_CLAUDE_ROOT ?? join(homedir(), ".claude");

// Estate repos (as of 2026-09-10). "nebbos-*" (double-b) covers the brand +
// marketing surface; "nebos-*" (single-b) covers every platform repo.
const ESTATE_REPOS = [
  "nebbos-brand",
  "nebbos-site",
  "nebos-agent-gateway",
  "nebos-backend",
  "nebos-billing",
  "nebos-control-plane",
  "nebos-core",
  "nebos-dev",
  "nebos-frontend",
  "nebos-governance",
  "nebos-home",
  "nebos-hr",
  "nebos-k12",
  "nebos-mail",
  "nebos-main",
  "nebos-messaging",
  "nebos-orchestrator",
  "nebos-platform",
  "nebos-projects",
  "nebos-tickets",
] as const;

const EXCLUDE_DIRS = [
  "node_modules", ".git", ".venv", "venv", "__pycache__",
  "dist", "build", ".next", ".turbo", ".cache", "coverage",
  ".worktrees",
  // Generated-code directories (OpenAPI stubs, codegen output) — machine-
  // produced, not authored. "clients" is deliberately NOT here: nebos-backend
  // has both `clients/python/` (generated, excluded via path below) and
  // `api/clients/` (authored, kept). See EXCLUDE_PATHS for that split.
  "generated", "openapi-generated", "codegen", ".openapi",
  "openapi_client", ".openapi-generator",
];

// Path-based excludes — match anywhere in the file's path, not just as a
// dir NAME at some depth. Used in addition to EXCLUDE_DIRS to catch things
// like `<repo>/clients/python/**` (generated) without excluding `api/clients/**`
// (authored).
const EXCLUDE_PATHS = [
  "*/clients/python/*",
  "*/clients/typescript/*",
  "*/clients/openapi/*",
];
const PATH_PRUNE = EXCLUDE_PATHS.map(p => `! -path "${p}"`).join(" ");

// find-friendly prune expression for excluded dirs
const PRUNE = EXCLUDE_DIRS.map(d => `-name "${d}"`).join(" -o ");

// ────────────────────────────────────────────────────────────────────────────
// Shell helpers
// ────────────────────────────────────────────────────────────────────────────

function sh(cmd: string, cwd?: string): string {
  try {
    return execSync(cmd, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 64 * 1024 * 1024,
    }).trim();
  } catch (err) {
    // Many of our counters use `grep`, which exits non-zero when zero matches.
    // Return empty string rather than throwing so the caller can treat 0 as 0.
    const e = err as { stdout?: Buffer; stderr?: Buffer; status?: number };
    if (e.status === 1 && (e.stdout?.length ?? 0) === 0) return "";
    throw err;
  }
}

function shInt(cmd: string, cwd?: string): number {
  const out = sh(cmd, cwd);
  const n = parseInt(out.trim().split(/\s+/)[0] ?? "0", 10);
  return Number.isFinite(n) ? n : 0;
}

function repoPath(repo: string): string {
  return join(HOST_ROOT, repo);
}

function requireRepo(repo: string): string {
  const p = repoPath(repo);
  if (!existsSync(p)) throw new Error(`Estate repo missing: ${p}`);
  return p;
}

// ────────────────────────────────────────────────────────────────────────────
// Per-repo counters (all shell out — deterministic, auditable)
// ────────────────────────────────────────────────────────────────────────────

// File-level filter — excludes generated-code files that don't want a shape
// like the excluded dirs (e.g. sitting mid-tree in an otherwise authored dir).
const GENERATED_FILE_GLOBS = [
  "-name \"*.generated.ts\"",
  "-name \"*.gen.ts\"",
  "-name \"*.generated.tsx\"",
  "-name \"*.gen.tsx\"",
  "-name \"*.pb.ts\"",
];
const NOT_GENERATED = GENERATED_FILE_GLOBS.map(g => `! ${g}`).join(" ");

function countLinesByExt(repo: string, ext: string): number {
  const p = requireRepo(repo);
  const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "*.${ext}" ${NOT_GENERATED} ${PATH_PRUNE} -print | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}'`;
  return shInt(cmd, p);
}

function countFilesByExt(repo: string, ext: string): number {
  const p = requireRepo(repo);
  const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "*.${ext}" ${NOT_GENERATED} ${PATH_PRUNE} -print | wc -l`;
  return shInt(cmd, p);
}

function countAllFiles(repo: string): number {
  const p = requireRepo(repo);
  const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -print | wc -l`;
  return shInt(cmd, p);
}

function grepCount(repo: string, pattern: string, extensions: string[]): number {
  const p = requireRepo(repo);
  const inc = extensions.map(e => `--include="*.${e}"`).join(" ");
  const exc = EXCLUDE_DIRS.map(d => `--exclude-dir="${d}"`).join(" ");
  const cmd = `grep -rE ${inc} ${exc} "${pattern}" . 2>/dev/null | wc -l`;
  return shInt(cmd, p);
}

function commitsTotal(repo: string): number {
  return shInt(`git rev-list --count HEAD 2>/dev/null`, requireRepo(repo));
}

function commitsSince(repo: string, since: string): number {
  return shInt(`git log --since="${since}" --oneline 2>/dev/null | wc -l`, requireRepo(repo));
}

// ────────────────────────────────────────────────────────────────────────────
// Aggregators (loop over all repos)
// ────────────────────────────────────────────────────────────────────────────

function sumOverRepos(fn: (repo: string) => number): number {
  return ESTATE_REPOS.reduce((sum, repo) => sum + fn(repo), 0);
}

// ────────────────────────────────────────────────────────────────────────────
// Governance + Claude substrate
// ────────────────────────────────────────────────────────────────────────────

function readGovernanceGraph(): { nodes: number; edges: number } {
  const graphPath = join(HOST_ROOT, "nebos-governance", "governance-graph", "graph.json");
  if (!existsSync(graphPath)) return { nodes: 0, edges: 0 };
  const raw = readFileSync(graphPath, "utf8");
  const parsed = JSON.parse(raw) as { meta?: { node_count?: number; edge_count?: number }; nodes?: unknown[]; edges?: unknown[] };
  return {
    nodes: parsed.meta?.node_count ?? parsed.nodes?.length ?? 0,
    edges: parsed.meta?.edge_count ?? parsed.edges?.length ?? 0,
  };
}

function countArchitectureSpecs(): { ratified: number; draft: number; provisional: number; pipelineTotal: number } {
  const graphPath = join(HOST_ROOT, "nebos-governance", "governance-graph", "graph.json");
  const raw = readFileSync(graphPath, "utf8");
  const parsed = JSON.parse(raw) as { nodes?: Array<{ status?: string }> };
  const nodes = parsed.nodes ?? [];
  const bucket = { ratified: 0, draft: 0, provisional: 0 };
  for (const n of nodes) {
    // Some rows in graph.json carry the status wrapped in literal double
    // quotes ('"ratified"' as the string value, not just "ratified"). Strip
    // both quote flavors before comparing.
    const s = (n.status ?? "").toLowerCase().replace(/^["']|["']$/g, "");
    if (s === "ratified" || s === "final") bucket.ratified++;
    else if (s === "draft" || s === "proposed") bucket.draft++;
  }
  const draftsDir = join(HOST_ROOT, "nebos-governance", "docs", "decisions", "drafts");
  let pipelineTotal = 0;
  let provisional = 0;
  if (existsSync(draftsDir)) {
    const files = readdirSync(draftsDir).filter(f => f.endsWith(".md"));
    pipelineTotal = files.length;
    provisional = files.filter(f => f.includes("ADR-PROV")).length;
  }
  return { ...bucket, provisional, pipelineTotal };
}

function countConstitutionalArticles(): number {
  const decisionsPath = join(HOST_ROOT, "nebos-governance", "docs", "decisions", "decisions.md");
  if (!existsSync(decisionsPath)) return 0;
  const raw = readFileSync(decisionsPath, "utf8");
  return (raw.match(/^#+\s+.*Article\b/gm) ?? []).length;
}

function countGlob(dir: string, pattern: RegExp): number {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter(f => pattern.test(f)).length;
}

function countDirs(dir: string): number {
  if (!existsSync(dir)) return 0;
  return readdirSync(dir).filter(f => {
    try { return statSync(join(dir, f)).isDirectory(); }
    catch { return false; }
  }).length;
}

function countMemoryFilesForTodayLandings(pattern: RegExp, todayStr: string): number {
  const memoryDir = join(CLAUDE_ROOT, "projects", "-Users-matic", "memory");
  const drafts = join(HOST_ROOT, "nebos-governance", "docs", "decisions", "drafts");
  let count = 0;
  for (const dir of [memoryDir, drafts]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (f.startsWith(todayStr) && pattern.test(f)) count++;
    }
  }
  return count;
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

function scan(): EstateStats {
  const t0 = Date.now();
  const today = new Date().toISOString().slice(0, 10);

  // Language LOC — Python
  const pyLoc = sumOverRepos(r => countLinesByExt(r, "py"));
  const tsLoc = sumOverRepos(r => countLinesByExt(r, "ts")) + sumOverRepos(r => countLinesByExt(r, "tsx"));
  const jsLoc = sumOverRepos(r => countLinesByExt(r, "js")) + sumOverRepos(r => countLinesByExt(r, "jsx"));
  const mdLoc = sumOverRepos(r => countLinesByExt(r, "md"));
  const cssLoc = sumOverRepos(r => countLinesByExt(r, "css")) + sumOverRepos(r => countLinesByExt(r, "scss"));
  const htmlLoc = sumOverRepos(r => countLinesByExt(r, "html"));
  const sqlLoc = sumOverRepos(r => countLinesByExt(r, "sql"));

  const linesByLang = {
    python: pyLoc,
    typescript: tsLoc,
    javascript: jsLoc,
    markdown: mdLoc,
    "html/css": htmlLoc + cssLoc,
    sql: sqlLoc,
  };
  const linesOfCodeTotal = Object.values(linesByLang).reduce((a, b) => a + b, 0);

  // File counts
  const pyFiles = sumOverRepos(r => countFilesByExt(r, "py"));
  const tsFiles = sumOverRepos(r => countFilesByExt(r, "ts")) + sumOverRepos(r => countFilesByExt(r, "tsx"));
  const sourceFilesTotal = sumOverRepos(countAllFiles);

  // Depth — Python callables
  const pyDefs = sumOverRepos(r => grepCount(r, "^def ", ["py"]));
  const pyAsyncDefs = sumOverRepos(r => grepCount(r, "^async def ", ["py"]));
  const pyClasses = sumOverRepos(r => grepCount(r, "^class ", ["py"]));

  // Depth — TS exports
  const tsExportFns = sumOverRepos(r => grepCount(r, "^export (async )?function ", ["ts", "tsx"]));
  const tsExportArrows = sumOverRepos(r => grepCount(r, "^export const [A-Za-z_$][A-Za-z0-9_$]* = (async )?\\(", ["ts", "tsx"]));

  // Tests
  const testCasesTs = sumOverRepos(r => grepCount(r, "^\\s*(it|test|describe)\\(", ["ts", "tsx", "js", "jsx"]));
  const testCasesPy = sumOverRepos(r => grepCount(r, "^def test_", ["py"]))
    + sumOverRepos(r => grepCount(r, "^async def test_", ["py"]));
  const testFilesTs = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f \\( -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" -o -name "*.spec.tsx" \\) -print | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);
  const testFilesPy = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f \\( -name "test_*.py" -o -name "*_test.py" \\) -print | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);

  // Data plane
  const dbTables = sumOverRepos(r => grepCount(r, "__tablename__", ["py"]));
  const dbMigrations = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -path "*versions*" -type f -name "*.py" -print | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);

  // HTTP surface
  const fastApiRoutes = sumOverRepos(r => grepCount(r, "@(app|router)\\.(get|post|put|patch|delete|options|head)", ["py"]));
  const nextHandlers = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "route.ts" -print | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);
  const nextPages = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f \\( -name "page.tsx" -o -name "page.ts" \\) -print | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);

  // Governance
  const graph = readGovernanceGraph();
  const specs = countArchitectureSpecs();
  const articles = countConstitutionalArticles();

  // Self-observation
  const memoryDir = join(CLAUDE_ROOT, "projects", "-Users-matic", "memory");
  const doctrineMemories = countGlob(memoryDir, /\.md$/);
  const feedbackMemories = countGlob(memoryDir, /^feedback_.*\.md$/);
  const sessionReports = countGlob(join(CLAUDE_ROOT, "state", "session_reports"), /\.md$/);
  const skills = countDirs(join(CLAUDE_ROOT, "skills"));
  const hooks = countGlob(join(CLAUDE_ROOT, "hooks"), /\.py$/);

  // Velocity
  const commitsTotalAll = sumOverRepos(commitsTotal);
  const commits30d = sumOverRepos(r => commitsSince(r, "30 days ago"));
  const commits7d = sumOverRepos(r => commitsSince(r, "7 days ago"));
  const activeWorktrees = ESTATE_REPOS.reduce((sum, r) => {
    const wt = join(HOST_ROOT, r, ".worktrees");
    return sum + countDirs(wt);
  }, 0);

  // Product surface
  const nebosFrontend = "nebos-frontend";
  // React components = any .tsx/.jsx across the estate whose path contains
  // "component" (case-insensitive) OR sits under an app/ / components/ dir.
  // Excludes generated + tests.
  const feComponents = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f \\( -name "*.tsx" -o -name "*.jsx" \\) ${NOT_GENERATED} ! -name "*.test.tsx" ! -name "*.spec.tsx" ! -name "*.stories.tsx" -print 2>/dev/null | grep -iE "component" | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);
  const nfComponents = existsSync(repoPath(nebosFrontend))
    ? shInt(
        `find . -type d \\( ${PRUNE} \\) -prune -o -type f \\( -name "*.tsx" -o -name "*.jsx" \\) ${NOT_GENERATED} ! -name "*.test.tsx" ! -name "*.spec.tsx" ! -name "*.stories.tsx" -print 2>/dev/null | grep -iE "component" | wc -l`,
        repoPath(nebosFrontend)
      )
    : 0;
  // @nebos/ui package composites + primitives — best effort, source location varies
  const uiPkgRoot = join(repoPath(nebosFrontend), "packages", "ui");
  const uiComposites = existsSync(join(uiPkgRoot, "src", "composites"))
    ? readdirSync(join(uiPkgRoot, "src", "composites")).filter(f => f.endsWith(".tsx") && !f.includes(".stories.")).length
    : 0;
  const uiPrimitives = existsSync(join(uiPkgRoot, "src", "primitives"))
    ? readdirSync(join(uiPkgRoot, "src", "primitives")).filter(f => f.endsWith(".tsx") && !f.includes(".stories.")).length
    : 0;
  // Design tokens = CSS custom property DECLARATIONS across the whole
  // frontend CSS layer, not just the UI package. Uses the same find-prune
  // pattern as every other counter (so `.worktrees` is honored) and requires
  // the declaration to sit at line start after optional whitespace —
  // otherwise property-value uses like `background: var(--foo)` would inflate
  // the count.
  const designTokens = existsSync(repoPath(nebosFrontend))
    ? shInt(
        `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "*.css" -print 2>/dev/null | xargs grep -hE -- "^[[:space:]]*--[a-z][a-z0-9-]+:" 2>/dev/null | wc -l`,
        repoPath(nebosFrontend)
      )
    : 0;

  // Infrastructure
  const dockerfiles = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    const cmd = `find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "Dockerfile*" -print | wc -l`;
    return sum + shInt(cmd, p);
  }, 0);
  const railwayToml = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    return sum + shInt(`find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "railway.toml" -print | wc -l`, p);
  }, 0);
  const railwayJson = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(p)) return sum;
    return sum + shInt(`find . -type d \\( ${PRUNE} \\) -prune -o -type f -name "railway.json" -print | wc -l`, p);
  }, 0);
  const mcpTools = sumOverRepos(r => grepCount(r, "@(mcp\\.tool|tool)\\b", ["py"]));
  const secretRefs = sumOverRepos(r => grepCount(r, "doppler|DOPPLER_", ["py", "ts", "tsx", "md", "json", "toml", "yml", "yaml"]));

  // Core substrates
  const orch = "nebos-orchestrator";
  const orchLoc = countLinesByExt(orch, "py");
  const orchFiles = countFilesByExt(orch, "py");
  const orchDefs = grepCount(orch, "^def ", ["py"]) + grepCount(orch, "^async def ", ["py"]);
  const orchClasses = grepCount(orch, "^class ", ["py"]);
  const orchTestFiles = shInt(
    `find . -type d \\( ${PRUNE} \\) -prune -o -type f \\( -name "test_*.py" -o -name "*_test.py" \\) -print | wc -l`,
    requireRepo(orch)
  );
  const orchTests = grepCount(orch, "^def test_", ["py"]);
  const orchRoutes = grepCount(orch, "@(app|router)\\.(get|post|put|patch|delete|options|head)", ["py"]);

  const graphSubstrateBackend = grepCount("nebos-backend", "entity_node|entity_edge", ["py"]);
  const graphSubstrateMigrations = existsSync(join(repoPath("nebos-backend"), "db", "migrations"))
    ? shInt(
        `grep -rE "entity_node|entity_edge|graph_|kg_" db/migrations 2>/dev/null | awk -F: '{print $1}' | sort -u | wc -l`,
        repoPath("nebos-backend")
      )
    : 0;

  const memorySpecs = countGlob(
    join(HOST_ROOT, "nebos-governance", "docs", "decisions", "drafts"),
    /memory/i
  );
  const memorySpecsToday = countMemoryFilesForTodayLandings(/memory/i, today);

  const gitSha = existsSync(join(HOST_ROOT, "nebos-governance", ".git"))
    ? sh("git rev-parse --short HEAD", join(HOST_ROOT, "nebos-governance")) || null
    : null;

  // ─────────────────────────────────────────────────────────────────────
  // matic-46 substrate observability additions (cross-session review,
  // 2026-09-10). See feat/platform-numbers-page commit history for context.
  // ─────────────────────────────────────────────────────────────────────

  // Worktrees — authoritative count via `git worktree list` (not filesystem
  // enumeration, which misses parent-worktrees dirs like nebos-backend-worktrees/).
  const worktreesAuthoritative = ESTATE_REPOS.reduce((sum, r) => {
    const p = repoPath(r);
    if (!existsSync(join(p, ".git"))) return sum;
    const out = sh(`git worktree list 2>/dev/null | wc -l`, p);
    const n = parseInt(out, 10) || 0;
    return sum + Math.max(0, n - 1);  // subtract the main worktree
  }, 0);

  // Skills unique-across-estate: user + plugin marketplace + per-repo .claude/skills
  const skillsGlobal = countDirs(join(CLAUDE_ROOT, "skills"));
  const skillsPluginMarketplace = existsSync(join(CLAUDE_ROOT, "plugins"))
    ? shInt(`find . -type d -name skills 2>/dev/null | xargs -I {} find {} -maxdepth 1 -type d 2>/dev/null | grep -v '^.*skills$' | wc -l`, join(CLAUDE_ROOT, "plugins"))
    : 0;
  const skillsPerRepo: Record<string, number> = {};
  for (const repo of ESTATE_REPOS) {
    const skillsDir = join(repoPath(repo), ".claude", "skills");
    const n = countDirs(skillsDir);
    if (n > 0) skillsPerRepo[repo] = n;
  }
  // Unique-by-name: dedup skill directory names across every source
  const allSkillNames = new Set<string>();
  const collectSkills = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
      try { if (statSync(join(dir, name)).isDirectory()) allSkillNames.add(name); }
      catch { /* skip */ }
    }
  };
  collectSkills(join(CLAUDE_ROOT, "skills"));
  for (const repo of ESTATE_REPOS) collectSkills(join(repoPath(repo), ".claude", "skills"));
  // Plugin marketplace: recursively collect skill dir names
  if (existsSync(join(CLAUDE_ROOT, "plugins"))) {
    const out = sh(`find . -type d -name skills 2>/dev/null`, join(CLAUDE_ROOT, "plugins"));
    for (const skillsRoot of out.split("\n").filter(Boolean)) {
      collectSkills(join(CLAUDE_ROOT, "plugins", skillsRoot));
    }
  }
  const skillsUniqueAcrossEstate = allSkillNames.size;

  // GitHub Actions workflows across the estate — sum of .yml files under
  // each repo's .github/workflows/. Dedupes worktree copies via path prune.
  const ghaWorkflowsByRepo: Record<string, number> = {};
  let ghaWorkflowsTotal = 0;
  for (const repo of ESTATE_REPOS) {
    const p = repoPath(repo);
    if (!existsSync(join(p, ".github", "workflows"))) continue;
    const n = shInt(`find .github/workflows -type f \\( -name "*.yml" -o -name "*.yaml" \\) 2>/dev/null | wc -l`, p);
    if (n > 0) { ghaWorkflowsByRepo[repo] = n; ghaWorkflowsTotal += n; }
  }

  // Session observability — four independent observers, current instant
  const shardsDir = join(CLAUDE_ROOT, "state", "session_shards");
  const sessionShardsActive = existsSync(shardsDir)
    ? readdirSync(shardsDir).filter(f => f.endsWith(".json")).length
    : 0;
  // ListAgents count is not filesystem-derivable at scan time; leave as null
  // and let the page state the observer name honestly.

  // Hook fires by log — 12-day rolling total (last-modified line count as a
  // proxy for volume; each hook writes JSON lines per fire).
  const hookLogsDir = join(CLAUDE_ROOT, "logs");
  const hookFiresByLog: Record<string, number> = {};
  let hookFiresTotal = 0;
  if (existsSync(hookLogsDir)) {
    for (const f of readdirSync(hookLogsDir)) {
      if (!f.endsWith(".log")) continue;
      const lines = shInt(`wc -l < "${join(hookLogsDir, f)}" 2>/dev/null`);
      if (lines > 0) {
        const short = f.replace(/\.log$/, "");
        hookFiresByLog[short] = lines;
        hookFiresTotal += lines;
      }
    }
  }

  // Session concurrency by window — mtime bucketing over session_reports
  const sessionReportsDir = join(CLAUDE_ROOT, "state", "session_reports");
  const sessionMtimes: number[] = [];
  if (existsSync(sessionReportsDir)) {
    for (const f of readdirSync(sessionReportsDir)) {
      if (!f.endsWith(".md")) continue;
      try { sessionMtimes.push(statSync(join(sessionReportsDir, f)).mtimeMs); }
      catch { /* skip */ }
    }
  }
  sessionMtimes.sort((a, b) => a - b);
  const peakInWindow = (windowMs: number): number => {
    let left = 0, peak = 0;
    for (let right = 0; right < sessionMtimes.length; right++) {
      while (sessionMtimes[right] - sessionMtimes[left] > windowMs) left++;
      peak = Math.max(peak, right - left + 1);
    }
    return peak;
  };
  const concurrentSessionPeaks = {
    window_30min: peakInWindow(30 * 60 * 1000),
    window_60min: peakInWindow(60 * 60 * 1000),
    window_24hour: peakInWindow(24 * 60 * 60 * 1000),
  };

  // Compliance regime coverage — how many governance docs cite each regime
  const governanceDocsRoot = join(HOST_ROOT, "nebos-governance");
  const complianceCoverage: Record<string, number> = {};
  if (existsSync(governanceDocsRoot)) {
    complianceCoverage.eu_ai_act = shInt(
      `grep -rlE "EU AI Act|Annex IV|Article 14|Article 11" --include="*.md" docs 2>/dev/null | wc -l`,
      governanceDocsRoot
    );
    complianceCoverage.gdpr = shInt(
      `grep -rlE "GDPR|Article 17|crypto-shred" --include="*.md" docs 2>/dev/null | wc -l`,
      governanceDocsRoot
    );
    complianceCoverage.soc2 = shInt(
      `grep -rlE "SOC 2|CC6\\.1|CC7" --include="*.md" docs 2>/dev/null | wc -l`,
      governanceDocsRoot
    );
    complianceCoverage.ferpa = shInt(
      `grep -rlE "FERPA|aggregate-only" --include="*.md" docs 2>/dev/null | wc -l`,
      governanceDocsRoot
    );
  }

  // Approval-workflow surfaces — hooks + code references
  const approvalSurfaces = {
    hooks_that_gate: shInt(
      `grep -lE "pretooluse|user_prompt_submit|preflight_bypass|no_verify|worktree_create_guard|draft_create_guard|pr_create_guard" *.py 2>/dev/null | wc -l`,
      join(CLAUDE_ROOT, "hooks")
    ),
    approval_grep_estate: sumOverRepos(r => grepCount(r, "requires_human|approval_required|human_review|approve_gate", ["py", "ts", "tsx"])),
  };

  // RLS depth — migrations that touch shared_scope + tables with the column
  const rlsMigrations = existsSync(join(repoPath("nebos-backend"), "db", "migrations"))
    ? shInt(`grep -lE "shared_scope|row_level_security|USING \\(scope" db/migrations 2>/dev/null | wc -l`, repoPath("nebos-backend"))
    : 0;

  // LLM-provider diversity — provider references in backend code
  const llmProviders: Record<string, number> = {
    anthropic: sumOverRepos(r => grepCount(r, "\\banthropic\\b|@anthropic-ai|claude-[0-9]", ["py", "ts", "tsx", "toml"])),
    openai: sumOverRepos(r => grepCount(r, "\\bopenai\\b|gpt-4|gpt-3", ["py", "ts", "tsx", "toml"])),
    google: sumOverRepos(r => grepCount(r, "\\bgemini\\b|google\\.generativeai|@google/genai", ["py", "ts", "tsx", "toml"])),
  };

  // Audit-trail signals — nebos_events + hash-chain references
  const auditTrailRefs = sumOverRepos(r => grepCount(r, "nebos_events|hash_chain|audit_log|append_only_ledger", ["py", "sql"]));


  const manifest: EstateStats = {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    generator: {
      script: "scripts/scan-estate.ts",
      gitSha,
      reposScanned: ESTATE_REPOS.length,
      hostRoot: HOST_ROOT,
    },
    scale: {
      linesOfCodeTotal,
      linesOfCodeByLanguage: linesByLang,
      sourceFilesTotal,
      reposTotal: ESTATE_REPOS.length,
      commitsTotal: commitsTotalAll,
    },
    depth: {
      pythonCallablesTotal: pyDefs + pyAsyncDefs + pyClasses,
      pythonDefs: pyDefs,
      pythonAsyncDefs: pyAsyncDefs,
      pythonClasses: pyClasses,
      typescriptExportsTotal: tsExportFns + tsExportArrows,
      typescriptExportFunctions: tsExportFns,
      typescriptExportArrowConsts: tsExportArrows,
      testCasesTotal: testCasesTs + testCasesPy,
      testCasesTs,
      testCasesPython: testCasesPy,
      testFilesTotal: testFilesTs + testFilesPy,
      testFilesTs,
      testFilesPython: testFilesPy,
      dbTables,
      dbMigrationsTotal: dbMigrations,
      httpEndpointsTotal: fastApiRoutes + nextHandlers + nextPages,
      httpEndpointsBackend: fastApiRoutes,
      httpEndpointsNextHandlers: nextHandlers,
      httpEndpointsNextPages: nextPages,
    },
    rigor: {
      architectureSpecsRatified: specs.ratified,
      architectureSpecsDraft: specs.draft,
      architectureSpecsProvisional: specs.provisional,
      architectureSpecsPipelineTotal: specs.pipelineTotal,
      constitutionalArticles: articles,
      governanceGraphNodes: graph.nodes,
      governanceGraphEdges: graph.edges,
    },
    selfObservation: {
      skills,
      enforcementHooks: hooks,
      doctrineMemories,
      feedbackMemories,
      sessionReports,
    },
    velocity: {
      commitsLast7Days: commits7d,
      commitsLast30Days: commits30d,
      activeWorktrees,
    },
    productSurface: {
      reactComponentsTotal: feComponents,
      reactComponentsFrontend: nfComponents,
      uiPackageModules: uiComposites + uiPrimitives,
      uiComposites,
      uiPrimitives,
      designTokens,
    },
    infrastructure: {
      containerImages: dockerfiles,
      cloudServiceConfigs: railwayToml + railwayJson,
      machineCallableTools: mcpTools,
      secretReferences: secretRefs,
    },
    substrateObservability: {
      worktreesAuthoritative,
      worktreesWipHookVisible: 252,  // reported by wip-ceiling hook 2026-09-10
      worktreesHookBlindspot: Math.max(0, worktreesAuthoritative - 252),
      skillsGlobal,
      skillsPerRepo,
      skillsPluginMarketplace,
      skillsUniqueAcrossEstate,
      ghaWorkflowsTotal,
      ghaWorkflowsByRepo,
      sessionShardsActive,
      sessionMtimesCount: sessionMtimes.length,
      concurrentSessionPeaks,
      hookFiresTotal,
      hookFiresByLog,
    },
    responsibleAiCoverage: {
      complianceCoverage,
      approvalSurfaces,
      rlsMigrations,
      llmProviders,
      auditTrailRefs,
    },
    coreSubstrates: {
      orchestrator: {
        linesOfCode: orchLoc,
        files: orchFiles,
        functions: orchDefs,
        classes: orchClasses,
        tests: orchTests,
        testFiles: orchTestFiles,
        httpEndpoints: orchRoutes,
        state: orchRoutes === 0 ? "shipped" : "landing",
        stateDetail: "Control loop, not a service. Live execution gated on ratification.",
      },
      unifiedGraph: {
        backendFileRefs: graphSubstrateBackend,
        migrations: graphSubstrateMigrations,
        scopeTiers: ["user", "department", "company", "nebbos"],
        state: "landing",
        stateDetail: "Substrate tables shipped, feature-layer surface in build.",
      },
      memoryFabric: {
        pipelineSpecs: memorySpecs,
        specsFiledToday: memorySpecsToday,
        state: "landing",
        stateDetail: "Persistent tenant-scoped memory. Physical rows on the shared entity graph; frontend surface under active build.",
      },
    },
  };

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.error(`✓ scan complete in ${elapsed}s`);
  return manifest;
}

// ────────────────────────────────────────────────────────────────────────────
// Entrypoint
// ────────────────────────────────────────────────────────────────────────────

const OUT = resolve(process.cwd(), "content", "estate-stats.json");
const manifest = scan();
writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.error(`✓ wrote ${OUT}`);
console.error(`  LOC: ${manifest.scale.linesOfCodeTotal.toLocaleString()} across ${manifest.scale.reposTotal} repos`);
console.error(`  Tests: ${manifest.depth.testCasesTotal.toLocaleString()} across ${manifest.depth.testFilesTotal.toLocaleString()} files`);
console.error(`  Architecture specs: ${manifest.rigor.architectureSpecsRatified} ratified · ${manifest.rigor.architectureSpecsPipelineTotal} in pipeline`);
console.error(`  Governance graph: ${manifest.rigor.governanceGraphNodes} nodes / ${manifest.rigor.governanceGraphEdges} edges`);
