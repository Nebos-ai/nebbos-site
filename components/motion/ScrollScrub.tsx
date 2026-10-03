"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/cn";

/**
 * ScrollScrub · pins a stepped block (e.g. timeline beats) to the viewport
 * and gives every step a fixed scroll budget, so the reader must scroll
 * `slow`× the natural distance between two steps to advance one step.
 * Layout (gaps, card sizes) is untouched; only scroll → motion changes.
 *
 * - Steps are the `[data-beat]` rows inside the content. Their centres are
 *   measured once (and on resize); `spacing` is the average distance
 *   between neighbours, i.e. how far one step used to scroll.
 * - perStep = slow × spacing. The track is viewport + steps × perStep tall.
 * - Active step = floor(progress × steps): each step owns an equal slice.
 *   The clock height is read from the overlay's first child (its wrapper is
 *   `display: contents` before pinning and has no box of its own).
 * - Rest pose = normal flow: the clock sits right under the section intro
 *   and the first beat right under the clock (the track is pulled up by the
 *   header height so the pinned overlay lands in that same spot).
 * - End pose: a negative bottom margin removes the empty part of the
 *   viewport-tall frame below the last beat, so the page resumes directly.
 * - Content y: each step holds its beat in the first beat's place for 35%
 *   of its slice, then eases to the next beat, landing as the next step
 *   begins. A light spring smooths chunky wheel input.
 * - `overlay` (the clock) sits above the moving content; content fades out
 *   beneath it through a top mask.
 * - Descendants read { progress, activeStep } via useScrub().
 * - Reduced motion, or before the first measurement: plain document flow.
 *   The DOM tree is identical in both modes, so nothing remounts.
 */

type Scrub = { progress: MotionValue<number>; activeStep: MotionValue<number> };

const ScrubContext = createContext<Scrub | null>(null);

export function useScrub() {
  return useContext(ScrubContext);
}

type Dims = { v: number; centers: number[]; overlayH: number; contentH: number };

export function ScrollScrub({
  children,
  overlay,
  slow = 2,
  offset = 76,
}: {
  children: ReactNode;
  overlay?: ReactNode;
  /** Scroll multiplier per step (2 = twice the natural distance). */
  slow?: number;
  /** Height of the fixed site header the pinned overlay must clear. */
  offset?: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [dims, setDims] = useState<Dims | null>(null);

  useEffect(() => {
    const el = content.current;
    if (!el) return;
    const measure = () => {
      // Rect deltas relative to the content box: layout offsets, unaffected
      // by the content's own translate.
      const base = el.getBoundingClientRect().top;
      const centers = Array.from(el.querySelectorAll<HTMLElement>("[data-beat]")).map((b) => {
        const r = b.getBoundingClientRect();
        return r.top - base + r.height / 2;
      });
      setDims({ v: window.innerHeight, centers, contentH: el.offsetHeight, overlayH: (overlayRef.current?.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const centers = dims?.centers ?? [];
  const steps = centers.length;
  const spacing = steps > 1 ? (centers[steps - 1]! - centers[0]!) / (steps - 1) : 0;
  const perStep = slow * spacing;
  const pinned = !!dims && !reduce && steps > 1 && perStep > 0;
  // Content rests exactly where it sits in normal flow (right under the
  // clock); each step pulls the next beat up into the first beat's place.
  const topPad = offset + (dims?.overlayH ?? 0);
  // At the end of the pin the frame is still a full viewport tall, but the
  // content only fills it down to the last beat. Pull whatever follows up by
  // that empty height so the page continues right after the last card.
  const travel = steps > 1 ? centers[steps - 1]! - centers[0]! : 0;
  const tail = dims ? Math.max(0, dims.v - (topPad + dims.contentH - travel)) : 0;

  // Keyframes per step slice: hold for the first 35%, then an eased slide
  // to the next beat that lands as the next step begins.
  const HOLD = 0.35;
  const input: number[] = [0];
  const output: number[] = [0];
  for (let i = 0; i < steps - 1; i++) {
    input.push((i + HOLD) / steps, (i + 1) / steps);
    output.push(-(centers[i]! - centers[0]!), -(centers[i + 1]! - centers[0]!));
  }
  input.push(1);
  output.push(-((centers[steps - 1] ?? 0) - (centers[0] ?? 0)));

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const rawY = useMotionValue(0);
  // Light spring: chunky wheel steps glide instead of jumping.
  const y = useSpring(rawY, { stiffness: 140, damping: 30, mass: 0.7 });
  const activeStep = useMotionValue(0);

  // Latest keyframes in a ref so the scroll handler never reads stale
  // measurements; re-applied whenever the measurement changes.
  const frames = useRef({ input, output, steps });
  frames.current = { input, output, steps };
  const apply = (p: number) => {
    const f = frames.current;
    rawY.set(interpolate(p, f.input, f.output));
    activeStep.set(Math.min(Math.max(f.steps - 1, 0), Math.floor(p * Math.max(f.steps, 1))));
  };
  useMotionValueEvent(scrollYProgress, "change", apply);
  useEffect(() => {
    apply(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dims, pinned]);

  return (
    <ScrubContext.Provider value={pinned ? { progress: scrollYProgress, activeStep } : null}>
      <div
        ref={track}
        className="relative"
        style={pinned ? { height: dims!.v + steps * perStep, marginTop: -offset, marginBottom: -tail } : undefined}
      >
        <div className={cn(pinned ? "pointer-events-none sticky top-0 h-[100dvh] overflow-hidden" : "relative")}>
          {overlay && (
            // Unpinned: `contents`, so a sticky overlay stays sticky across the whole block.
            <div
              ref={overlayRef}
              className={cn(pinned ? "pointer-events-auto absolute inset-x-0 z-30" : "contents")}
              style={pinned ? { top: offset } : undefined}
            >
              {overlay}
            </div>
          )}
          <div
            className={cn(pinned && "pointer-events-auto absolute inset-0")}
            style={
              pinned
                ? {
                    paddingTop: topPad,
                    maskImage: `linear-gradient(to bottom, transparent 0px, transparent ${topPad - 56}px, #000 ${topPad}px, #000 calc(100% - 64px), transparent 100%)`,
                  }
                : undefined
            }
          >
            <m.div ref={content} style={pinned ? { y } : undefined}>
              {children}
            </m.div>
          </div>
        </div>
      </div>
    </ScrubContext.Provider>
  );
}

/** Piecewise interpolation over ascending `input` stops, smoothstep-eased. */
function interpolate(p: number, input: number[], output: number[]) {
  if (input.length === 0) return 0;
  if (p <= input[0]!) return output[0]!;
  for (let i = 1; i < input.length; i++) {
    if (p <= input[i]!) {
      const a = input[i - 1]!;
      const b = input[i]!;
      const lin = b === a ? 1 : (p - a) / (b - a);
      const t = lin * lin * (3 - 2 * lin); // smoothstep: gentle start and stop
      return output[i - 1]! + (output[i]! - output[i - 1]!) * t;
    }
  }
  return output[output.length - 1]!;
}
