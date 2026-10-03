import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";

/**
 * PearlMosaic · hero visual for the CMS-driven pages: the four Pearl
 * colours as floating glass tiles around a central core, joined by faint
 * signal lines. Same family as BrainCore / ProductEmblem, lighter weight.
 * The marks never rotate; tiles only float. Decorative only.
 */

const TILES = [
  { tint: "var(--color-platform)", x: "22%", y: "24%", delay: "0s" },
  { tint: "var(--color-app)", x: "78%", y: "20%", delay: "-2s" },
  { tint: "var(--color-mcp)", x: "18%", y: "76%", delay: "-4s" },
  { tint: "var(--color-cradle)", x: "80%", y: "74%", delay: "-1s" },
];

export function PearlMosaic() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[440px] select-none">
      <div className="absolute inset-[20%] rounded-full bg-accent/20 blur-[90px]" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
        {TILES.map((t) => (
          <line
            key={t.x + t.y}
            x1="50"
            y1="50"
            x2={parseFloat(t.x)}
            y2={parseFloat(t.y)}
            stroke="#fff"
            strokeOpacity="0.12"
            strokeWidth="0.3"
            strokeDasharray="1 1.4"
          />
        ))}
        <g className="bc-spin [--bc-dur:60s]" style={{ transformOrigin: "50px 50px" }}>
          <circle cx="50" cy="50" r="38" stroke="#fff" strokeOpacity="0.08" strokeWidth="0.3" strokeDasharray="0.6 2" />
        </g>
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 size-[26%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1.4].map((d) => (
          <span key={d} className="bc-halo absolute inset-0 rounded-[28%] ring-1 ring-accent/40" style={{ animationDelay: `${d}s` }} />
        ))}
        <div className="absolute inset-0 overflow-hidden rounded-[28%] bg-[radial-gradient(circle_at_45%_35%,#fff3e8_0%,#ffb27a_25%,#ff6b1e_55%,#7a2a05_100%)] shadow-[0_0_60px_8px_rgb(255_107_30/0.4),inset_0_1px_0_rgb(255_255_255/0.45)]" />
        <div className="bc-breathe absolute inset-0 grid place-items-center text-white drop-shadow-[0_2px_8px_rgb(120_40_0/0.7)]">
          <NebbosMark size={48} />
        </div>
      </div>

      {/* Pearl tiles */}
      {TILES.map((t) => (
        <div
          key={t.x + t.y}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: t.x, top: t.y, "--tint": t.tint } as CSSProperties}
        >
          <div className="bc-float" style={{ animationDelay: t.delay }}>
            <span className="grid size-16 place-items-center rounded-[1.2rem] bg-[var(--tint)] text-white shadow-[0_18px_40px_-10px_var(--tint),inset_0_1px_0_rgb(255_255_255/0.35)]">
              <NebbosMark size={30} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
