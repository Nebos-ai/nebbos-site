/**
 * lib/estate-stats.ts · shared contract for the /platform/numbers page
 *
 * The scanner script (scripts/scan-estate.ts) emits a JSON manifest at
 * content/estate-stats.json matching this shape; the page (app/platform/numbers/
 * page.tsx) reads that manifest at build time and renders every stat from it.
 *
 * Update discipline: bump `schemaVersion` on any breaking shape change and
 * update both producer and consumer in the same commit. Additive fields are
 * safe; do not remove or rename fields between snapshots without a version
 * bump — historical manifests must remain readable if we ever archive them.
 */

export const CURRENT_SCHEMA_VERSION = "1.0.0" as const;

export type EstateStats = {
  schemaVersion: typeof CURRENT_SCHEMA_VERSION;
  generatedAt: string; // ISO 8601 timestamp
  generator: {
    script: string;
    gitSha: string | null;
    reposScanned: number;
    hostRoot: string;
  };

  scale: {
    linesOfCodeTotal: number;
    linesOfCodeByLanguage: Record<string, number>;
    sourceFilesTotal: number;
    reposTotal: number;
    commitsTotal: number;
  };

  depth: {
    pythonCallablesTotal: number;
    pythonDefs: number;
    pythonAsyncDefs: number;
    pythonClasses: number;
    typescriptExportsTotal: number;
    typescriptExportFunctions: number;
    typescriptExportArrowConsts: number;
    testCasesTotal: number;
    testCasesTs: number;
    testCasesPython: number;
    testFilesTotal: number;
    testFilesTs: number;
    testFilesPython: number;
    dbTables: number;
    dbMigrationsTotal: number;
    httpEndpointsTotal: number;
    httpEndpointsBackend: number;
    httpEndpointsNextHandlers: number;
    httpEndpointsNextPages: number;
  };

  rigor: {
    architectureSpecsRatified: number;
    architectureSpecsDraft: number;
    architectureSpecsProvisional: number;
    architectureSpecsPipelineTotal: number;
    constitutionalArticles: number;
    governanceGraphNodes: number;
    governanceGraphEdges: number;
  };

  selfObservation: {
    skills: number;
    enforcementHooks: number;
    doctrineMemories: number;
    feedbackMemories: number;
    sessionReports: number;
  };

  velocity: {
    commitsLast7Days: number;
    commitsLast30Days: number;
    activeWorktrees: number;
  };

  productSurface: {
    reactComponentsTotal: number;
    reactComponentsFrontend: number;
    uiPackageModules: number;
    uiComposites: number;
    uiPrimitives: number;
    designTokens: number;
  };

  infrastructure: {
    containerImages: number;
    cloudServiceConfigs: number;
    machineCallableTools: number;
    secretReferences: number;
  };

  substrateObservability: {
    worktreesAuthoritative: number;      // git worktree list, sum across estate
    worktreesWipHookVisible: number;     // what the WIP-ceiling hook reports
    worktreesHookBlindspot: number;      // authoritative - hook-visible
    skillsGlobal: number;                // ~/.claude/skills
    skillsPerRepo: Record<string, number>;  // <repo>/.claude/skills
    skillsPluginMarketplace: number;     // ~/.claude/plugins/**/skills
    skillsUniqueAcrossEstate: number;    // unique names across every source
    ghaWorkflowsTotal: number;           // .github/workflows/*.yml across estate
    ghaWorkflowsByRepo: Record<string, number>;
    sessionShardsActive: number;         // ~/.claude/state/session_shards/*.json
    sessionMtimesCount: number;          // session_reports/*.md total
    concurrentSessionPeaks: {
      window_30min: number;
      window_60min: number;
      window_24hour: number;
    };
    hookFiresTotal: number;              // sum of all hook log lines
    hookFiresByLog: Record<string, number>;
  };
  responsibleAiCoverage: {
    complianceCoverage: Record<string, number>;  // eu_ai_act / gdpr / soc2 / ferpa → doc count
    approvalSurfaces: {
      hooks_that_gate: number;
      approval_grep_estate: number;
    };
    rlsMigrations: number;
    llmProviders: Record<string, number>;
    auditTrailRefs: number;
  };
  coreSubstrates: {
    orchestrator: {
      linesOfCode: number;
      files: number;
      functions: number;
      classes: number;
      tests: number;
      testFiles: number;
      httpEndpoints: number;
      state: "shipped" | "landing" | "specified";
      stateDetail: string;
    };
    unifiedGraph: {
      backendFileRefs: number;
      migrations: number;
      scopeTiers: string[];
      state: "shipped" | "landing" | "specified";
      stateDetail: string;
    };
    memoryFabric: {
      pipelineSpecs: number;
      specsFiledToday: number;
      state: "shipped" | "landing" | "specified";
      stateDetail: string;
    };
  };
};

// ────────────────────────────────────────────────────────────────────────────
// Historical time-series types — produced by scripts/scan-estate-history.ts
// ────────────────────────────────────────────────────────────────────────────

/** One monthly snapshot on the estate timeline. Emitted per-file at
 *  content/estate-history/<YYYY-MM>.json. See scan-estate-history.ts. */
export type MonthlySnapshot = {
  month: string;             // YYYY-MM
  measuredAt: string;        // ISO 8601
  cutoffDate: string;        // YYYY-MM-DD (first-day-of-next-month, exclusive)
  reposActive: number;
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
  architectureSpecsRatified: number;
  architectureSpecsPipeline: number;
  governanceGraphNodes: number;
  governanceGraphEdges: number;
  constitutionalArticles: number;
  skills: number;
  enforcementHooks: number;
  doctrineMemories: number;
  feedbackMemories: number;
  sessionReports: number;
  workflows: number;
};

/** Rolled-up index the page consumes to render every chart. Emitted at
 *  content/estate-history.index.json. */
export type HistoryIndex = {
  schemaVersion: string;
  generatedAt: string;
  monthsCount: number;
  startMonth: string;
  endMonth: string;
  snapshots: Array<{
    month: string;
    reposActive: number;
    loc: number;
    tests: number;
    commits: number;
    httpEndpoints: number;
    components: number;
    specs: number;
    pipeline: number;
    kgNodes: number;
    articles: number;
    hooks: number;
    skills: number;
    memories: number;
    sessionReports: number;
    workflows: number;
  }>;
};

/** All-time peaks across every dimension. Emitted at content/estate-peaks.json. */
export type Peaks = {
  computedAt: string;
  concurrentSessionsPeak: { count: number; observedAt: string | null; windowMinutes: number };
  commitsInSingleDayPeak: { count: number; date: string | null };
  worktreesActivePeak: { count: number; approximatedFrom: string };
};

/** Formatting helpers that both the scanner (for logs) and the page (for render) use. */

export function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${m.toFixed(m >= 10 ? 1 : 2)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  }
  return String(n);
}
