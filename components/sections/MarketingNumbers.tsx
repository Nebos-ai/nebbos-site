import metrics from "@/content/platform-metrics.json";

/**
 * MarketingNumbers · sections/MarketingNumbers.tsx · v1 · 2026-09-18
 *
 * The Persona-E diligence surface on the dark marketing register. Replaces
 * NebbosInventoryBand (cream paper, 24-metric wall) with a curated
 * 8-metric grid: the numbers a serious buyer wants to see in the first
 * scroll. Sourced from content/platform-metrics.json (live-verified +
 * snapshot fields, honestly labelled).
 *
 * Selection criterion: metrics that answer "is this real?" not "is this
 * impressive?" — a technical buyer wants ship-shape numbers, not
 * founder-brag numbers. Full 24-metric wall stays available on the /trust
 * or /security pages when we wire them in the register.
 */

const SNAPSHOT = metrics.artifact_snapshot_at;

const NUMBERS = [
  {
    label: "Repositories",
    value: `${metrics.shipped.repositories}`,
    note: "Live count 2026-09-12",
  },
  {
    label: "Lines of code",
    value: `${metrics.shipped.lines_of_code_millions}M`,
    note: `Snapshot ${SNAPSHOT}`,
  },
  {
    label: "Automated tests",
    value: `${(metrics.shipped.automated_tests / 1000).toFixed(1)}K`,
    note: `Snapshot ${SNAPSHOT}`,
  },
  {
    label: "HTTP endpoints",
    value: `${metrics.shipped.http_endpoints.toLocaleString("en-US")}`,
    note: `Snapshot ${SNAPSHOT}`,
  },
  {
    label: "Database tables",
    value: `${metrics.shipped.database_tables}`,
    note: `Snapshot ${SNAPSHOT}`,
  },
  {
    label: "Architecture specs ratified",
    value: `${metrics.governed.architecture_specs_ratified}`,
    note: `Snapshot ${SNAPSHOT}`,
  },
  {
    label: "Enforcement hooks",
    value: `${metrics.governed.enforcement_hooks}`,
    note: "Live count 2026-09-12",
  },
  {
    label: "Commits, last 30 days",
    value: `${metrics.shipped.commits_last_30d}`,
    note: `Snapshot ${SNAPSHOT}`,
  },
];

export function MarketingNumbers() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-numbers-h">
      <div className="mkt-section__inner">
        <header className="mkt-numbers__head">
          <p className="mkt-eyebrow">In numbers</p>
          <h2 id="mkt-numbers-h" className="mkt-h2">
            Measured. Sourced. Never estimated.
          </h2>
          <p className="mkt-deck">
            Every figure below traces to a live filesystem count or a dated
            estate snapshot. No hand-waving. Weekly refresh planned; source
            cites live in the platform-metrics registry.
          </p>
        </header>

        <div className="mkt-numbers__grid">
          {NUMBERS.map((m) => (
            <div key={m.label} className="mkt-metric">
              <p className="mkt-metric__label">{m.label}</p>
              <p className="mkt-metric__value">{m.value}</p>
              <p className="mkt-metric__note">{m.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
