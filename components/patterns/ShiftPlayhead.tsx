"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValue, useMotionValueEvent } from "motion/react";
import { useScrub } from "@/components/motion/ScrollScrub";
import { cn } from "@/lib/cn";

/**
 * ShiftPlayhead · patterns/ShiftPlayhead.tsx · v2 · 2026-09-23
 *
 * Sticky clock playhead for MarketingShift. Reads which [data-beat] row
 * is crossing ~40% down the viewport via IntersectionObserver and:
 *   1. Renders the current beat's time; digits roll between beats.
 *   2. Renders a 4-tick rail with the active tick lit in that beat's
 *      Pearl colour.
 *   3. Writes data-state="past"|"active"|"future" onto each beat so the
 *      section styles itself with plain data-attribute variants.
 *
 * v4 (2026-09-23): inside ScrollScrub the hour comes from the scrub's
 * active step (equal scroll per hour); IntersectionObserver is only the
 * unpinned fallback.
 *
 * v3 (2026-09-23): denser frosted-glass lens with a tint-coloured rim so
 * the clock never gets lost over the cards scrolling beneath it.
 *
 * v2: hooks moved from legacy `.mkt-shift__*` classes to `[data-shift]`
 * / `[data-beat]` so the Tailwind register owns every style.
 */

type BeatMeta = {
  time: string;
  product: "app" | "platform" | "mcp" | "cradle";
};

const TINT_VAR: Record<BeatMeta["product"], string> = {
  platform: "var(--color-platform)",
  app: "var(--color-app)",
  mcp: "var(--color-mcp)",
  cradle: "var(--color-cradle)",
};

const TINT: Record<BeatMeta["product"], string> = {
  platform: "bg-platform",
  app: "bg-app",
  mcp: "bg-mcp",
  cradle: "bg-cradle",
};

export function ShiftPlayhead({ beats }: { beats: BeatMeta[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Pinned (inside ScrollScrub): the hour is the scrub's active step, so
  // every hour owns an equal, fixed scroll budget.
  const scrub = useScrub();
  const idle = useMotionValue(-1);
  const step = scrub?.activeStep ?? idle;
  useMotionValueEvent(step, "change", (v) => {
    if (v >= 0) setActiveIdx(v);
  });
  useEffect(() => {
    if (scrub) setActiveIdx(scrub.activeStep.get());
  }, [scrub]);

  // Unpinned fallback (reduced motion): the beat crossing ~40% down the viewport.
  useEffect(() => {
    if (scrub) return;
    const section = rootRef.current?.closest<HTMLElement>("[data-shift]");
    if (!section) return;

    const beatNodes = Array.from(section.querySelectorAll<HTMLElement>("[data-beat]"));
    if (beatNodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number((entry.target as HTMLElement).dataset.beat ?? "-1");
          if (Number.isNaN(idx) || idx < 0) continue;
          if (entry.isIntersecting) setActiveIdx(idx);
        }
      },
      // Trigger when the beat crosses ~40% down the viewport — feels
      // like a real playhead running through content.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    beatNodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [scrub]);

  // Push data-state onto each beat so CSS can style past/active/future.
  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("[data-shift]");
    if (!section) return;
    section.querySelectorAll<HTMLElement>("[data-beat]").forEach((n) => {
      const idx = Number(n.dataset.beat ?? "-1");
      n.dataset.state = idx < activeIdx ? "past" : idx === activeIdx ? "active" : "future";
    });
  }, [activeIdx]);

  if (beats.length === 0) return null;
  const active = beats[activeIdx] ?? beats[0]!;

  return (
    <div ref={rootRef} className="sticky top-[92px] z-30 flex justify-center py-8" aria-hidden>
      {/* Frosted glass lens: dense enough that the clock stays legible
          while cards scroll underneath; the rim picks up the beat's tint. */}
      <div
        className="glass inline-flex items-center gap-5 rounded-pill bg-ground/60 py-2.5 pl-6 pr-4 ring-1 ring-inset ring-white/15 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-700 ease-fluid"
        style={{
          boxShadow: `0 0 0 1px color-mix(in srgb, ${TINT_VAR[active.product]} 35%, transparent), 0 20px 60px -12px rgb(0 0 0 / 0.95), 0 0 48px -8px color-mix(in srgb, ${TINT_VAR[active.product]} 45%, transparent), inset 0 1px 0 rgb(255 255 255 / 0.1)`,
        }}
      >
        <span className="font-code text-[11px] uppercase tracking-label text-ink-2">Monday</span>
        <span className="relative inline-flex h-9 w-[5.6ch] items-center justify-center overflow-x-visible overflow-y-clip font-code text-2xl font-medium tabular-nums text-ink">
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={active.time}
              initial={{ y: "100%", filter: "blur(4px)" }}
              animate={{ y: "0%", filter: "blur(0px)" }}
              exit={{ y: "-100%", filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="inline-block"
            >
              {active.time}
            </m.span>
          </AnimatePresence>
        </span>
        <ol className="m-0 flex list-none items-center gap-1.5 p-0">
          {beats.map((b, i) => {
            const state = i < activeIdx ? "past" : i === activeIdx ? "active" : "future";
            return (
              <li key={b.time} data-state={state} className="flex items-center">
                <span
                  className={cn(
                    "block h-1.5 rounded-pill transition-all duration-500 ease-fluid",
                    state === "active" ? cn("w-6", TINT[b.product]) : state === "past" ? "w-1.5 bg-ink-3" : "w-1.5 bg-white/15",
                  )}
                />
                <span className="sr-only">{b.time}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
