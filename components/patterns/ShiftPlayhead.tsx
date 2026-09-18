"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ShiftPlayhead · patterns/ShiftPlayhead.tsx · v1 · 2026-09-18
 *
 * Sticky clock playhead for MarketingShift. Reads which .mkt-shift__beat
 * is nearest the top of the viewport via IntersectionObserver and:
 *   1. Renders the current beat's time in a large mono display.
 *   2. Renders a 4-dot progress rail with the active dot lit in that
 *      beat's product color.
 *   3. Updates data attributes on each beat (data-state="past"|"active"|"future")
 *      so plain CSS transitions can style them without touching keyframes
 *      — respects the axe-safety doctrine that scroll-linked keyframes
 *      never animate opacity.
 *
 * No animation library. No RAF loop. IO fires only when the user
 * actually scrolls a beat past the trigger line (rootMargin steers).
 */

type BeatMeta = {
  time: string;
  product: "app" | "platform" | "mcp" | "cradle";
};

export function ShiftPlayhead({ beats }: { beats: BeatMeta[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("section.mkt-shift");
    if (!section) return;

    const beatNodes = Array.from(
      section.querySelectorAll<HTMLElement>(".mkt-shift__beat"),
    );
    if (beatNodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(
            (entry.target as HTMLElement).dataset.beat ?? "-1",
          );
          if (Number.isNaN(idx) || idx < 0) continue;
          if (entry.isIntersecting) {
            setActiveIdx(idx);
          }
        }
      },
      {
        // Trigger when the beat crosses ~40% down the viewport — feels
        // like a real playhead running through content rather than
        // toggling as soon as any pixel enters.
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    beatNodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // Push data-state onto each beat so CSS can style past/active/future.
  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("section.mkt-shift");
    if (!section) return;
    const beatNodes = section.querySelectorAll<HTMLElement>(".mkt-shift__beat");
    beatNodes.forEach((n) => {
      const idx = Number(n.dataset.beat ?? "-1");
      if (idx < activeIdx) n.dataset.state = "past";
      else if (idx === activeIdx) n.dataset.state = "active";
      else n.dataset.state = "future";
    });
  }, [activeIdx]);

  if (beats.length === 0) return null;
  const active = beats[activeIdx] ?? beats[0]!;

  return (
    <div ref={rootRef} className="mkt-shift__playhead" aria-hidden>
      <div className="mkt-shift__playhead-inner">
        <span className="mkt-shift__playhead-label">Monday</span>
        <span
          className={`mkt-shift__playhead-clock mkt-shift__playhead-clock--${active.product}`}
        >
          {active.time}
        </span>
        <ol className="mkt-shift__playhead-rail">
          {beats.map((b, i) => (
            <li
              key={b.time}
              className={`mkt-shift__playhead-dot mkt-shift__playhead-dot--${b.product}`}
              data-state={
                i < activeIdx ? "past" : i === activeIdx ? "active" : "future"
              }
            >
              <span className="mkt-shift__playhead-tick">{b.time}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
