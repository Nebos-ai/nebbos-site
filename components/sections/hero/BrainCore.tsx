import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { StatusTicker } from "./StatusTicker";

/**
 * BrainCore · hero visual · 2026-09-23
 *
 * "A sovereign brain for your operation", drawn: a luminous core holding
 * the Nebbos mark, orbit rings carrying signal particles, and one Pearl
 * per department wired into the core by beams that pulse inward as the
 * Pearls read their signals.
 *
 * Composition draws on the 21st.dev Orbiting Circles / Animated Beam /
 * Pulse Beams family, rebuilt as SVG + CSS transforms so it costs no JS
 * to animate and never touches layout.
 *
 * A slow conic radar sweep crosses the rings: the brain reading each
 * department's signals.
 *
 * Rules: the mark itself never rotates (only the light inside the orb
 * moves); nothing follows the pointer; everything holds still under
 * prefers-reduced-motion.
 */

const C = 300; // viewBox centre (600 × 600)
const R_NODE = 218;

type Node = { name: string; tint: string; angle: number; delay: number };

const NODES: Node[] = [
  { name: "Finance", tint: "var(--color-platform)", angle: 215, delay: 0 },
  { name: "Operations", tint: "var(--color-app)", angle: 325, delay: 0.9 },
  { name: "People", tint: "var(--color-mcp)", angle: 145, delay: 1.8 },
  { name: "Care", tint: "var(--color-cradle)", angle: 35, delay: 2.7 },
];

const STATUS = [
  { dept: "Finance", status: "Closed", tint: "var(--color-platform)" },
  { dept: "Ops", status: "2 waiting", tint: "var(--color-app)" },
  { dept: "Care", status: "Quiet", tint: "var(--color-cradle)" },
];

function polar(angle: number, r: number) {
  const a = (angle * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

/** Gentle curve from the node into the core's rim. */
function beamPath(angle: number) {
  const from = polar(angle, R_NODE - 34);
  const to = polar(angle, 78);
  const mid = polar(angle + (angle > 180 ? 12 : -12), (R_NODE + 78) / 2);
  return `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${mid.x.toFixed(1)} ${mid.y.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

const pct = (v: number) => `${(v / 600) * 100}%`;

export function BrainCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[580px] select-none" aria-hidden>
      {/* Ambient bloom */}
      <div className="absolute inset-[16%] rounded-full bg-accent/30 blur-[90px]" />

      {/* Radar sweep · the brain reading every department's signals */}
      <div className="absolute inset-[3%] overflow-hidden rounded-full [mask-image:radial-gradient(circle,transparent_20%,#000_30%,#000_58%,transparent_72%)]">
        <div className="bc-spin absolute inset-0 [--bc-dur:7s] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_260deg,rgb(255_107_30/0.04)_300deg,rgb(255_107_30/0.18)_356deg,transparent_360deg)] blur-[2px]" />
      </div>

      {/* Rings, beams, particles */}
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="bc-ring-fade" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#fff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit rings · dashes drift in opposite directions */}
        <g className="bc-spin [--bc-dur:80s]" style={{ transformOrigin: "300px 300px" }}>
          <circle cx={C} cy={C} r={R_NODE} stroke="url(#bc-ring-fade)" strokeWidth="1" strokeDasharray="2 6" />
        </g>
        <g className="bc-spin-rev [--bc-dur:60s]" style={{ transformOrigin: "300px 300px" }}>
          <circle cx={C} cy={C} r={150} stroke="#fff" strokeOpacity="0.09" strokeWidth="1" strokeDasharray="1 5" />
        </g>
        <circle cx={C} cy={C} r={284} stroke="#fff" strokeOpacity="0.05" strokeWidth="1" />

        {/* Signal particles riding the rings */}
        <g className="bc-spin [--bc-dur:14s]" style={{ transformOrigin: "300px 300px" }}>
          <circle cx={C + 150} cy={C} r="2.5" fill="#ff6b1e" className="bc-glow" />
        </g>
        <g className="bc-spin-rev [--bc-dur:22s]" style={{ transformOrigin: "300px 300px" }}>
          <circle cx={C} cy={C - R_NODE} r="2" fill="#f4f2ee" fillOpacity="0.8" />
        </g>
        <g className="bc-spin [--bc-dur:36s]" style={{ transformOrigin: "300px 300px" }}>
          <circle cx={C - 284} cy={C} r="1.6" fill="#ffb27a" />
          <circle cx={C + 284} cy={C} r="1.2" fill="#f4f2ee" fillOpacity="0.6" />
        </g>
        <g className="bc-spin [--bc-dur:18s]" style={{ transformOrigin: "300px 300px" }}>
          <circle cx={C} cy={C + R_NODE} r="2.2" fill="#b96bff" className="bc-glow" />
        </g>

        {/* Beams · static rail + travelling pulse per Pearl */}
        {NODES.map((n) => {
          const d = beamPath(n.angle);
          return (
            <g key={n.name}>
              <path d={d} stroke={n.tint} strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 4" />
              <path
                d={d}
                pathLength={100}
                stroke={n.tint}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="bc-pulse"
                style={{ animationDelay: `${n.delay}s`, color: n.tint } as CSSProperties}
              />
            </g>
          );
        })}
      </svg>

      {/* Heartbeat halos */}
      {[0, 1.2, 2.4].map((delay) => (
        <span
          key={delay}
          className="bc-halo absolute left-1/2 top-1/2 size-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-accent/50"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* The core · light moves inside, the mark stays still */}
      <div className="absolute left-1/2 top-1/2 size-[24%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_45%,#fff7ef_0%,#ffb27a_22%,#ff6b1e_48%,#9c3408_78%,#2a0e03_100%)] shadow-[0_0_60px_12px_rgb(255_107_30/0.55),0_0_160px_40px_rgb(255_107_30/0.25),inset_0_0_0_1px_rgb(255_255_255/0.3)]">
          <div className="absolute inset-[-40%] bc-spin [--bc-dur:8s] bg-[conic-gradient(from_0deg,transparent,rgb(255_255_255/0.55),transparent_30%,rgb(74_92_255/0.45)_55%,transparent_70%)] mix-blend-screen blur-lg" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_28%,rgb(255_255_255/0.6),transparent_38%)]" />
        </div>
        <div className="bc-breathe absolute inset-0 grid place-items-center text-white drop-shadow-[0_0_10px_rgb(120_40_0/0.8)]">
          <NebbosMark size={56} />
        </div>
      </div>

      {/* Pearl nodes */}
      {NODES.map((n) => {
        const p = polar(n.angle, R_NODE);
        return (
          <div
            key={n.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: pct(p.x), top: pct(p.y), "--tint": n.tint } as CSSProperties}
          >
            <div
              className="bc-node glass inline-flex items-center gap-2.5 rounded-pill bg-ground-2/80 py-1.5 pl-1.5 pr-4 shadow-[0_18px_40px_-18px_var(--tint)] ring-1 ring-rule-2 ring-inset backdrop-blur-md"
              style={{ animationDelay: `${n.delay + 1.1}s` }}
            >
              <span className="grid size-7 place-items-center rounded-full bg-[var(--tint)] shadow-[0_0_18px_var(--tint)]">
                <span className="size-2 rounded-full bg-white/90" />
              </span>
              <span className="font-display text-[13px] font-medium text-ink sm:text-sm">{n.name}</span>
            </div>
          </div>
        );
      })}

      {/* Floating live chips */}
      <div className="bc-float absolute right-[2%] top-[4%] hidden sm:block">
        <div className="glass inline-flex items-center gap-2 rounded-pill bg-ground-2/80 px-3.5 py-2 font-code text-[10.5px] uppercase tracking-[0.14em] text-ink-3 ring-1 ring-rule ring-inset backdrop-blur-md">
          <span className="live-pulse size-1.5 rounded-full bg-emerald-400" />
          Live · Monday 08:12
        </div>
      </div>
      <div className="bc-float absolute bottom-[3%] left-1/2 -translate-x-1/2 [animation-delay:-3s]">
        <div className="glass inline-flex items-center gap-3 rounded-pill bg-ground-2/85 py-2 pl-4 pr-2 font-display text-[13px] ring-1 ring-rule-2 ring-inset backdrop-blur-md">
          <StatusTicker items={STATUS} />
          <span className="rounded-pill bg-accent px-3 py-1 font-code text-[10px] font-medium uppercase tracking-[0.14em] text-ground">
            Approve
          </span>
        </div>
      </div>
    </div>
  );
}
