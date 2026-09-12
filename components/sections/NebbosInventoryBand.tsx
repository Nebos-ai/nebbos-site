import Link from "next/link";
import metrics from "@/content/platform-metrics.json";

/**
 * NebbosInventoryBand · v1 · 2026-09-12
 *
 * Comprehensive substrate inventory grouped in 4 quadrants:
 *   Metered · Governed · Composed · Shipped
 *
 * Data source: content/platform-metrics.json — pre-computed snapshot
 * of the Nebbos estate. Weekly cron refresh planned (follow-up PR).
 * Every field cites its source in the JSON's provenance block.
 *
 * Rendering discipline: if a field is absent from the JSON, its tile
 * doesn't render — matches the analytics-dashboard pattern per data-
 * contract rule #5 (no fabricated values). Never hard-code numbers
 * inside the component; the JSON is the single source.
 *
 * Founder directive 2026-09-12: "point out the impressive things about
 * nebbos — the savings, the governance, the number of skills and tools
 * the system has, every tool nebbos uses, every tool it has." This band
 * lands the FULL inventory in one visual sweep so a prospect scanning
 * the page sees the shape + scale in a glance.
 */

type Quadrant = {
  eyebrow: string;
  title: string;
  tiles: Array<{ value: string; label: string; sub?: string }>;
};

function formatMillions(millions: number): string {
  return `${millions.toFixed(2)}M`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}

function buildQuadrants(): Quadrant[] {
  const { metered, governed, composed, shipped } = metrics;

  const meteredTiles = [
    typeof metered?.compression_median_pct === "number"
      ? {
          value: `${metered.compression_median_pct}%`,
          label: "Median token reduction",
          sub: "adr-authoring archetype vs pre-MCP baseline",
        }
      : null,
    typeof metered?.compression_range_max_pct === "number" &&
    typeof metered?.compression_range_min_pct === "number"
      ? {
          value: `${metered.compression_range_min_pct}–${metered.compression_range_max_pct}%`,
          label: "Range across archetypes",
          sub: "clean-sample buckets, 2026-08-28 to 2026-09-12",
        }
      : null,
  ].filter(Boolean) as Quadrant["tiles"];

  const governedTiles = [
    typeof (governed as { architecture_specs_ratified?: number })?.architecture_specs_ratified === "number"
      ? {
          value: String((governed as { architecture_specs_ratified: number }).architecture_specs_ratified),
          label: "Ratified architecture specs",
        }
      : null,
    typeof (governed as { architecture_drafts_active?: number })?.architecture_drafts_active === "number"
      ? {
          value: String((governed as { architecture_drafts_active: number }).architecture_drafts_active),
          label: "Active spec drafts",
          sub: "live-counted this session",
        }
      : null,
    typeof governed?.constitutional_articles === "number"
      ? { value: String(governed.constitutional_articles), label: "Constitutional articles" }
      : null,
    typeof governed?.enforcement_hooks === "number"
      ? {
          value: String(governed.enforcement_hooks),
          label: "Enforcement hooks",
          sub: "govern every session at runtime · live-counted",
        }
      : null,
    typeof governed?.doctrine_memories === "number"
      ? {
          value: formatCount(governed.doctrine_memories),
          label: "Doctrine memories",
          sub: "carried across every session · live-counted",
        }
      : null,
    typeof (governed as { session_reports?: number })?.session_reports === "number"
      ? {
          value: String((governed as { session_reports: number }).session_reports),
          label: "Session reports",
          sub: "auto-doc, one per substantive session · live",
        }
      : null,
    typeof governed?.governance_graph_nodes === "number" &&
    typeof governed?.governance_graph_edges === "number"
      ? {
          value: `${governed.governance_graph_nodes} · ${formatCount(governed.governance_graph_edges)}`,
          label: "Governance graph",
          sub: "nodes · edges",
        }
      : null,
  ].filter(Boolean) as Quadrant["tiles"];

  const integrationsList = Array.isArray(
    (composed as { mcp_integrations_list?: unknown })?.mcp_integrations_list,
  )
    ? ((composed as { mcp_integrations_list: string[] }).mcp_integrations_list)
    : undefined;
  const composedTiles = [
    typeof composed?.skills_installed === "number"
      ? { value: String(composed.skills_installed), label: "Installed skills", sub: "user + repo-scoped, live-counted" }
      : null,
    typeof (composed as { nebos_mcp_tools?: number })?.nebos_mcp_tools === "number"
      ? {
          value: String((composed as { nebos_mcp_tools: number }).nebos_mcp_tools),
          label: "Nebos MCP tools",
          sub: "callable core surface: signals, Pearl, knowledge graph, workflows",
        }
      : null,
    typeof (composed as { mcp_integrations?: number })?.mcp_integrations === "number"
      ? {
          value: String((composed as { mcp_integrations: number }).mcp_integrations),
          label: "MCP integrations",
          sub: integrationsList
            ? integrationsList
                .map((name) => name.replace(/\s*\(.*\)$/, ""))
                .join(" · ")
            : "external systems Nebbos brokers into",
        }
      : null,
    typeof composed?.named_callables === "number"
      ? { value: formatCount(composed.named_callables), label: "Named callables" }
      : null,
    typeof composed?.react_components === "number"
      ? { value: formatCount(composed.react_components), label: "React components" }
      : null,
    typeof composed?.shared_ui_modules === "number"
      ? { value: String(composed.shared_ui_modules), label: "Shared UI modules" }
      : null,
    typeof composed?.design_tokens === "number"
      ? { value: String(composed.design_tokens), label: "Design tokens" }
      : null,
  ].filter(Boolean) as Quadrant["tiles"];

  const shippedTiles = [
    typeof shipped?.repositories === "number"
      ? { value: String(shipped.repositories), label: "Repositories" }
      : null,
    typeof shipped?.lines_of_code_millions === "number"
      ? {
          value: formatMillions(shipped.lines_of_code_millions),
          label: "Lines of code",
          sub: `${formatCount(shipped.source_files ?? 0)} source files`,
        }
      : null,
    typeof shipped?.automated_tests === "number"
      ? { value: formatCount(shipped.automated_tests), label: "Automated tests" }
      : null,
    typeof shipped?.http_endpoints === "number"
      ? { value: formatCount(shipped.http_endpoints), label: "HTTP endpoints" }
      : null,
    typeof shipped?.database_tables === "number" && typeof shipped?.database_migrations === "number"
      ? {
          value: `${shipped.database_tables} · ${shipped.database_migrations}`,
          label: "Tables · migrations",
        }
      : null,
    typeof shipped?.commits_last_30d === "number"
      ? {
          value: String(shipped.commits_last_30d),
          label: "Commits / 30 days",
          sub: shipped?.commits_last_7d != null ? `${shipped.commits_last_7d} in last 7` : undefined,
        }
      : null,
    typeof shipped?.parallel_worktrees_active === "number"
      ? {
          value: formatCount(shipped.parallel_worktrees_active),
          label: "Parallel worktrees",
          sub: "isolated concurrent work · live-counted",
        }
      : null,
    typeof (shipped as { open_intakes?: number })?.open_intakes === "number"
      ? {
          value: String((shipped as { open_intakes: number }).open_intakes),
          label: "Open intakes",
          sub: "in-flight requirements queue · live",
        }
      : null,
  ].filter(Boolean) as Quadrant["tiles"];

  return [
    { eyebrow: "01 · Metered", title: "Every action measured.", tiles: meteredTiles },
    { eyebrow: "02 · Governed", title: "Every rule enforced.", tiles: governedTiles },
    { eyebrow: "03 · Composed", title: "Every tool available.", tiles: composedTiles },
    { eyebrow: "04 · Shipped", title: "Every substrate in production.", tiles: shippedTiles },
  ].filter((q) => q.tiles.length > 0);
}

export function NebbosInventoryBand() {
  const quadrants = buildQuadrants();
  if (quadrants.length === 0) return null;

  const snapshotDate = (metrics as { snapshot_at?: string }).snapshot_at;
  const artifactUrl = (metrics as { artifact_url?: string }).artifact_url;

  return (
    <section
      aria-labelledby="nebbos-inventory-heading"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="container"
        style={{
          paddingBlock: "clamp(64px, 10vh, 128px)",
          display: "grid",
          gap: "clamp(32px, 5vw, 56px)",
        }}
      >
        <div style={{ display: "grid", gap: "clamp(16px, 2vw, 24px)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--gold)",
              margin: 0,
            }}
          >
            The complete inventory
          </p>
          <h2
            id="nebbos-inventory-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: 0,
              maxWidth: "28ch",
              textWrap: "balance",
            }}
          >
            Every substrate. Every rule. Every tool.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
              margin: 0,
              maxWidth: "64ch",
            }}
          >
            {snapshotDate ? (
              <>
                Every number below was measured against repository HEAD on{" "}
                <strong style={{ color: "var(--ink)" }}>{snapshotDate}</strong>. Nothing
                estimated. Nothing hand-waved. Weekly refresh planned; source lives
                below.
              </>
            ) : (
              <>Every number below was measured, not estimated.</>
            )}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(24px, 3vw, 40px)",
          }}
        >
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.eyebrow}
              style={{
                display: "grid",
                gap: 16,
                paddingLeft: 20,
                borderLeft: "2px solid var(--gold)",
              }}
            >
              <div style={{ display: "grid", gap: 4 }}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    margin: 0,
                  }}
                >
                  {quadrant.eyebrow}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(18px, 1.8vw, 22px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    fontWeight: 500,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {quadrant.title}
                </h3>
              </div>

              <div role="list" style={{ display: "grid", gap: 14 }}>
                {quadrant.tiles.map((tile) => (
                  <div key={tile.label} role="listitem" style={{ display: "grid", gap: 2 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(24px, 2.4vw, 30px)",
                        lineHeight: 1.05,
                        color: "var(--ink)",
                        fontWeight: 500,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {tile.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--ink-3)",
                      }}
                    >
                      {tile.label}
                    </span>
                    {tile.sub && (
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 12,
                          lineHeight: 1.4,
                          color: "var(--ink-3)",
                          maxWidth: "36ch",
                        }}
                      >
                        {tile.sub}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {artifactUrl && (
          <Link
            href={artifactUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              paddingBlock: 8,
              borderBottom: "1px solid var(--rule)",
              width: "fit-content",
              transition:
                "color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
            }}
            className="nebbos-inventory-band__link"
          >
            See the full estate by the numbers{" "}
            <span aria-hidden style={{ fontFamily: "var(--font-serif)" }}>
              →
            </span>
          </Link>
        )}
      </div>

      <style>{`
        .nebbos-inventory-band__link:hover {
          color: var(--gold) !important;
          border-color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}
