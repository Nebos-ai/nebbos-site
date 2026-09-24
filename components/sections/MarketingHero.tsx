import type { CSSProperties } from "react";
import { BRAND } from "@/content/brand";
import { SplitWords } from "@/components/patterns/SplitWords";
import { BackgroundBeams } from "@/components/motion/BackgroundBeams";
import { LazyVideo } from "@/components/motion/LazyVideo";
import {
  Eyebrow,
  GhostCta,
  PrimaryCta,
  deck,
  headline,
} from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * MarketingHero · v4 · 2026-09-23 · brain-core redesign
 *
 * Copy unchanged from v2 (2026-09-18 outcome-first rewrite: sovereign
 * brain for your operation, department-scoped gains).
 *
 *   - Accent light beams (adapted from 21st.dev Background Beams) over a
 *     masked engineering grid, lit from the top-left.
 *   - Headline words rise out of blur on first paint via pure CSS, so the
 *     LCP element is painted at t=0 and never waits for hydration.
 *   - v4 replaces the three-panel dashboard mock with BrainCore: the
 *     sovereign brain drawn as a core with one Pearl per department
 *     wired into it. Founder-directed: no pointer-following motion.
 *   - v5 (trial) swaps BrainCore for a muted ambient orb loop in the right
 *     column (public/video/home-orb.*, poster under reduced motion; below
 *     lg the video only downloads once it nears the viewport). Its
 *     black ground is dropped with a screen blend; edges fade radially.
 */

const VIDEO = "/video/home-orb";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function MarketingHero() {
  return (
    <section
      className="mkt relative isolate -mt-[76px] overflow-hidden px-4 pt-[76px] sm:px-6"
      aria-labelledby="mkt-hero-h"
    >
      {/* Ground lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <BackgroundBeams className="opacity-70 [mask-image:radial-gradient(ellipse_80%_70%_at_30%_30%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 -top-40 size-[720px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -right-32 top-24 size-[520px] rounded-full bg-platform/15 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ground" />
      </div>

      <div className="mx-auto grid min-h-[min(calc(100dvh-76px),840px)] w-full max-w-[1240px] items-center gap-14 pb-20 pt-16 md:pt-20 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:pb-24">
        <div className="flex flex-col items-start gap-7">
          <div className="rise-in" style={d(0)}>
            <Eyebrow>Nebbos</Eyebrow>
          </div>
          <h1
            id="mkt-hero-h"
            className={cn(
              headline,
              "rise-words text-[clamp(2.75rem,5vw,4.25rem)] leading-[1]",
            )}
          >
            <SplitWords step={0.07}>{BRAND.taglineShort}</SplitWords>
          </h1>
          <p className={cn(deck, "rise-in max-w-[52ch]")} style={d(260)}>
            {BRAND.homeDeck}
          </p>
          <div
            className="rise-in cta-row pt-1"
            style={d(380)}
          >
            <PrimaryCta href="/demo">Book a demo</PrimaryCta>
            <GhostCta href="/solutions">See the Pearls</GhostCta>
          </div>
        </div>

        <div
          aria-hidden
          className="rise-in-far pointer-events-none relative mx-auto aspect-square w-full max-w-[560px] scale-120 mix-blend-screen [mask-image:radial-gradient(closest-side,#000_72%,transparent)]"
          style={d(300)}
        >
          <img src={`${VIDEO}-poster.jpg`} alt="" className="absolute inset-0 size-full object-cover" />
          <LazyVideo
            src={`${VIDEO}.mp4`}
            mobileSrc={`${VIDEO}-sm.mp4`}
            poster={`${VIDEO}-poster.jpg`}
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
          />
        </div>
      </div>
    </section>
  );
}
