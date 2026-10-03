import { cn } from "@/lib/cn";

/**
 * IndexMark · the techy index used on every numbered card.
 *
 *   01 ─────────────── ▮▯▯▯▯
 *
 * Mono numeral with a tint → white gradient, a signal hairline that
 * brightens on hover, and a segmented meter showing this item's position
 * in the run. Inherits `--tint` from the card. Decorative (aria-hidden):
 * the list itself carries the order.
 */
export function IndexMark({ index, total, className }: { index: number; total: number; className?: string }) {
  return (
    <div className={cn("relative flex items-center gap-3", className)} aria-hidden>
      <span className="bg-gradient-to-br from-[color-mix(in_srgb,var(--tint)_70%,#fff)] to-ink bg-clip-text font-code text-[22px] font-medium leading-none tabular-nums tracking-tight text-transparent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative h-px flex-1 overflow-hidden bg-white/10">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[var(--tint)] to-transparent transition-[width] duration-700 ease-out-expo group-hover:w-full" />
      </span>
      <span className="flex items-center gap-[3px]">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn("h-2.5 w-[3px] rounded-full", i === index ? "bg-[var(--tint)] shadow-[0_0_8px_var(--tint)]" : i < index ? "bg-white/35" : "bg-white/10")}
          />
        ))}
      </span>
    </div>
  );
}

/** HUD corner brackets · four tinted ticks framing a card. */
export function HudCorners() {
  const tick = "absolute size-3 border-[color-mix(in_srgb,var(--tint)_60%,transparent)] transition-[border-color] duration-500 group-hover:border-[var(--tint)]";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-2">
      <span className={cn(tick, "left-0 top-0 rounded-tl-[6px] border-l border-t")} />
      <span className={cn(tick, "right-0 top-0 rounded-tr-[6px] border-r border-t")} />
      <span className={cn(tick, "bottom-0 left-0 rounded-bl-[6px] border-b border-l")} />
      <span className={cn(tick, "bottom-0 right-0 rounded-br-[6px] border-b border-r")} />
    </span>
  );
}
