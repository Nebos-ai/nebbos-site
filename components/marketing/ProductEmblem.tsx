import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";

/**
 * ProductEmblem · the hero visual on each product page: the product's
 * Pearl colour as a luminous glass core holding the Nebbos mark, inside
 * slowly drifting orbit rings with a heartbeat halo. Same visual family
 * as the home BrainCore; the mark itself never rotates. Decorative only.
 */
export function ProductEmblem({ tint }: { tint: string }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[460px] select-none"
      style={{ "--tint": tint } as CSSProperties}
    >
      <div className="absolute inset-[14%] rounded-full bg-[var(--tint)] opacity-30 blur-[90px]" />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <g className="bc-spin [--bc-dur:70s]" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="186" stroke="#fff" strokeOpacity="0.1" strokeDasharray="2 7" />
          <circle cx="386" cy="200" r="2.5" fill={tint} className="bc-glow" />
        </g>
        <g className="bc-spin-rev [--bc-dur:48s]" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="200" r="138" stroke={tint} strokeOpacity="0.35" strokeDasharray="1 5" />
          <circle cx="200" cy="62" r="2" fill="#f4f2ee" fillOpacity="0.8" />
        </g>
        <circle cx="200" cy="200" r="92" stroke="#fff" strokeOpacity="0.06" />
      </svg>

      {[0, 1.2, 2.4].map((delay) => (
        <span
          key={delay}
          className="bc-halo absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2 rounded-[28%] ring-1 ring-[color-mix(in_srgb,var(--tint)_55%,transparent)]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 overflow-hidden rounded-[28%] bg-[radial-gradient(circle_at_40%_30%,color-mix(in_srgb,var(--tint)_55%,white)_0%,var(--tint)_45%,color-mix(in_srgb,var(--tint)_45%,black)_100%)] shadow-[0_0_70px_10px_color-mix(in_srgb,var(--tint)_45%,transparent),inset_0_1px_0_rgb(255_255_255/0.45),inset_0_0_0_1px_rgb(255_255_255/0.2)]">
          <div className="bc-spin absolute inset-[-40%] [--bc-dur:10s] bg-[conic-gradient(from_0deg,transparent,rgb(255_255_255/0.35),transparent_35%)] mix-blend-screen blur-lg" />
        </div>
        <div className="bc-breathe absolute inset-0 grid place-items-center text-white drop-shadow-[0_2px_10px_rgb(0_0_0/0.35)]">
          <NebbosMark size={64} />
        </div>
      </div>
    </div>
  );
}
