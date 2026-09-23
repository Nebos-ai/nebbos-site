"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/cn";
import { useScrub } from "./ScrollScrub";

/**
 * ScrollBeam · adapted from 21st.dev "Timeline" (manuarora700).
 *
 * The source animated the beam's `height` from a measured pixel value.
 * Here the track is absolutely sized to its parent and the fill is a
 * full-height column translated up/down, so the effect is transform-only
 * (no layout per frame, no ResizeObserver) and the glowing head rides the
 * leading edge of the fill.
 *
 * Inside a <ScrollScrub>, the fill follows the scrub progress instead of
 * the beam's own position, so it stays in step with the pinned content.
 */
export function ScrollBeam({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrub = useScrub();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const progress = scrub?.progress ?? scrollYProgress;
  const y = useTransform(progress, (v) => `${(v - 1) * 100}%`);
  const glow = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 w-px overflow-hidden bg-gradient-to-b from-transparent via-white/10 to-transparent",
        className,
      )}
    >
      <m.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/60 to-accent" />
        <m.div
          style={{ opacity: glow }}
          className="absolute -left-[3px] bottom-0 h-16 w-[7px] rounded-full bg-accent blur-[6px]"
        />
      </m.div>
    </div>
  );
}
