import fs from "node:fs";
import path from "node:path";

/**
 * SubstrateBaselineBand · Consumer 5 of the hook-telemetry substrate
 *
 * Renders the Nebbos self-baseline (30-day rolling hook-fire count) as the
 * measurement-doctrine surface on nebbos.ai. Reads
 * public/data/baseline.json at build time (Server Component) and displays
 * the same 100% denominator every deployment is measured against.
 *
 * Voice: nebbos.ai marketing register (Palantir layout · Apple language ·
 * reader-forward · present-tense declarative · trust via specificity).
 * Doctrine: feedback_hook_fire_baseline_is_substrate_understanding_metric
 * · feedback_nebbos_marketing_voice_apple_palantir_hybrid.
 *
 * Composition: sits after InProductionBand — social proof, then substrate
 * measurement — before the platform architecture bands. The number IS the
 * argument.
 *
 * The band consumes only aggregate fields — total_fires, self_total_fires,
 * by_hook, as_of, window_days, understanding_pct, provenance — and
 * intentionally omits the per-deployment breakdown carried in the source
 * JSON. Per-deployment attribution is founder/super-admin telemetry, not
 * customer-facing content on the marketing surface.
 */

type BaselineJson = {
  total_fires: number;
  self_total_fires: number;
  by_hook: Record<string, number>;
  as_of: string;
  window_days: number;
  understanding_pct: number;
  provenance: { first_ts: string | null; last_ts: string | null; row_count: number };
};

function readBaseline(): BaselineJson | null {
  try {
    const file = path.join(process.cwd(), "public", "data", "baseline.json");
    return JSON.parse(fs.readFileSync(file, "utf-8")) as BaselineJson;
  } catch {
    return null;
  }
}

function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function SubstrateBaselineBand() {
  const baseline = readBaseline();

  // Graceful degradation: if the JSON isn't published yet, render an empty
  // shell rather than throwing — the marketing site still builds.
  if (!baseline) return null;

  const distinctHooks = Object.keys(baseline.by_hook).length;
  const topHooks = Object.entries(baseline.by_hook)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <section
      aria-labelledby="substrate-baseline-heading"
      style={{
        background: "var(--ink)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        color: "var(--paper)",
      }}
    >
      <div
        className="container"
        style={{
          // Section spacing tokens · standard tier (dark measurement section) — ratified 2026-09-18
          paddingBlock: "var(--section-y-standard)",
          display: "grid",
          gap: "var(--section-gap-standard)",
          maxWidth: "var(--container-max)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--size-eyebrow)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--accent-2)",
            margin: 0,
          }}
        >
          Substrate measurement
        </p>

        <h2
          id="substrate-baseline-heading"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--size-h1)",
            lineHeight: 1.04,
            letterSpacing: "-0.024em",
            fontWeight: 400,
            color: "var(--paper)",
            margin: 0,
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          Every fire counted.{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-2)", fontWeight: "inherit" }}>
            Every 30 days.
          </em>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--size-lede)",
            lineHeight: 1.55,
            color: "rgba(244, 241, 234, 0.82)",
            margin: 0,
            maxWidth: "58ch",
          }}
        >
          {formatCount(baseline.self_total_fires)} hook fires across{" "}
          {distinctHooks} substrate hooks is the 30-day baseline for Nebbos
          itself. When you deploy on Nebbos, your workload is measured
          against this same 100% baseline. No calibration hand-waving. No
          estimates. The number is the number.
        </p>

        {/* Numbers grid · Palantir-restrained, mono-labeled, no cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(20px, 3vw, 40px)",
            paddingTop: "clamp(16px, 2vw, 28px)",
            borderTop: "1px solid rgba(232, 230, 226, 0.16)",
          }}
        >
          <NumberTile
            value={formatCount(baseline.self_total_fires)}
            label="Fire count · 30-day window"
          />
          <NumberTile value={String(distinctHooks)} label="Substrate hooks" />
          <NumberTile value={`${baseline.window_days} days`} label="Rolling window" />
          <NumberTile
            value={`${baseline.understanding_pct.toFixed(0)}%`}
            label="Nebbos self · 100% baseline"
          />
        </div>

        {/* Top-hook rail · surfaces the SHAPE of the measurement. Reader
            sees "verify_first fires 10,020 times a month" and understands
            that hook fires are not once-a-day rituals but continuous
            substrate signal. */}
        <div
          style={{
            display: "grid",
            gap: "12px",
            paddingTop: "clamp(16px, 2vw, 28px)",
            borderTop: "1px solid rgba(232, 230, 226, 0.16)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--size-micro)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(244, 241, 234, 0.5)",
              margin: 0,
            }}
          >
            Top substrate signals
          </p>
          {topHooks.map(([name, count]) => (
            <HookRow key={name} name={name} count={count} total={baseline.self_total_fires} />
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--size-micro)",
            letterSpacing: "0.18em",
            color: "rgba(244, 241, 234, 0.5)",
            margin: 0,
          }}
        >
          As of {formatDate(baseline.as_of)} · {formatCount(baseline.provenance.row_count)} rows scanned
        </p>
      </div>
    </section>
  );
}

function NumberTile({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--size-h2)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontWeight: 400,
          color: "var(--paper)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--size-micro)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(244, 241, 234, 0.55)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function HookRow({ name, count, total }: { name: string; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        gap: "clamp(16px, 3vw, 32px)",
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          color: "rgba(244, 241, 234, 0.88)",
          letterSpacing: "0.02em",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          color: "var(--paper)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatCount(count)}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--accent-2)",
          fontVariantNumeric: "tabular-nums",
          minWidth: "5ch",
          textAlign: "right",
        }}
      >
        {pct.toFixed(1)}%
      </span>
    </div>
  );
}
