import type { CSSProperties } from "react";
import { NebbosMark } from "@nebbos/brand/logo";
import { ShiftPlayhead } from "@/components/patterns/ShiftPlayhead";
import { RevealWords } from "@/components/motion/RevealWords";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollBeam } from "@/components/motion/ScrollBeam";
import { ScrollScrub } from "@/components/motion/ScrollScrub";
import {
  Eyebrow,
  Section,
  deck,
  headline,
} from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

/**
 * MarketingShift · sections/MarketingShift.tsx · v3 · 2026-09-23
 *
 * Day-in-the-life of one operator's Monday, WITHOUT and WITH Nebbos,
 * along one shared timeline. Copy and beats unchanged from v2.
 *
 * v3 visual layer:
 *   - A scroll-linked accent beam (adapted from 21st.dev Timeline) runs
 *     down the spine and fills as the visitor scrolls the day.
 *   - Sticky glass playhead with rolling clock digits (ShiftPlayhead).
 *   - "Without" cards are flat and muted; "With Nebbos" cards are
 *     double-bezel surfaces that light up in the beat's Pearl colour
 *     when the playhead reaches them. Cards slide in from their side.
 *   - The timeline pins to the viewport (ScrollScrub) and moves at half
 *     ~3/8 of the scroll speed: same card spacing, ~2.7× the scroll per
 *     hour, with eased hand-offs between hours.
 */

type Beat = {
  time: string;
  product: "app" | "platform" | "mcp" | "cradle";
  chaos: { event: string; body: string };
  calm: { event: string; body: string };
};

const BEATS: Beat[] = [
  {
    time: "07:14",
    product: "app",
    chaos: {
      event: "Slack alert",
      body: "Ops chat lit up overnight. Coverage gap for the 8am shift. You start reading backlog in bed.",
    },
    calm: {
      event: "Pearl catches it",
      body: "Ops Pearl spotted the gap at 04:30. Drafted a shift-cover plan against your on-call roster. Waiting on you.",
    },
  },
  {
    time: "08:15",
    product: "platform",
    chaos: {
      event: "War room",
      body: "Standup turns into a war room. Three people reconstruct what happened while they were asleep.",
    },
    calm: {
      event: "Coffee approve",
      body: "You approve on your phone. Biometric confirms it was you. The plan runs itself. Standup is a status update, not a fire.",
    },
  },
  {
    time: "14:20",
    product: "mcp",
    chaos: {
      event: "Reactive fixes",
      body: "The rest of the day is stitching. Finance close slips a day; the retention 1:1 gets rescheduled again.",
    },
    calm: {
      event: "Close is closed",
      body: "Finance Pearl already closed the month over the weekend. Flagged the two variances that need your read. Posted the reconciliation.",
    },
  },
  {
    time: "18:00",
    product: "cradle",
    chaos: {
      event: "Backlog",
      body: "You leave with a mental map of what to catch tomorrow. Your team leaves with the same one, staggered.",
    },
    calm: {
      event: "Home",
      body: "You leave on time. So does your team. Nothing behind you. Every action from today is in an audit trail your CISO can walk.",
    },
  },
];

const TINT: Record<Beat["product"], string> = {
  platform: "var(--color-platform)",
  app: "var(--color-app)",
  mcp: "var(--color-mcp)",
  cradle: "var(--color-cradle)",
};

export function MarketingShift() {
  return (
    <Section labelledBy="mkt-shift-h" className="overflow-x-clip">
      <div data-shift>
        <Reveal
          as="header"
          className="flex max-w-3xl flex-col items-start gap-6"
        >
          <Eyebrow>A day in the life</Eyebrow>
          <h2
            id="mkt-shift-h"
            className={cn(headline, "text-[clamp(2.25rem,4.8vw,4rem)]")}
          >
            <RevealWords>One Monday, with and without.</RevealWords>
          </h2>
          <p className={deck}>
            Same operator. Same signals. Same team. The only variable is whether
            a Pearl is watching. Scroll the day.
          </p>
        </Reveal>

        <ScrollScrub
          slow={8 / 3}
          overlay={
            <ShiftPlayhead
              beats={BEATS.map((b) => ({ time: b.time, product: b.product }))}
            />
          }
        >
          <div className="relative">
            <ScrollBeam className="left-6 md:left-1/2 md:-translate-x-1/2" />
            <ol
              className="relative m-0 grid list-none gap-6 p-0 md:gap-10"
              aria-label="Monday, beat by beat"
            >
              {BEATS.map((beat, i) => (
                <li
                  key={beat.time}
                  data-beat={i}
                  data-time={beat.time}
                  data-state={i === 0 ? "active" : "future"}
                  style={{ "--tint": TINT[beat.product] } as CSSProperties}
                  className="group/beat relative grid grid-cols-[48px_1fr] gap-x-4 gap-y-4 md:grid-cols-[1fr_96px_1fr] md:gap-x-0"
                >
                  <Reveal
                    as="article"
                    x={-40}
                    y={0}
                    className="col-start-2 row-start-1 rounded-[1.4rem] bg-ground-2/60 p-6 ring-1 ring-rule ring-inset transition-[filter,opacity] duration-700 ease-fluid md:col-start-1 md:p-7"
                  >
                    <p className="m-0 font-code text-[10.5px] font-medium uppercase tracking-label text-ink-3">
                      Without
                    </p>
                    <p className="m-0 mt-2 font-code text-[13px] tabular-nums text-ink-3">
                      {beat.time}
                    </p>
                    <h3 className="m-0 mt-3 font-display text-xl font-medium tracking-tight text-ink-2 md:text-2xl">
                      {beat.chaos.event}
                    </h3>
                    <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink-3">
                      {beat.chaos.body}
                    </p>
                  </Reveal>

                  <div
                    className="col-start-1 row-span-2 row-start-1 flex justify-center pt-6 md:col-start-2 md:row-span-1 md:items-center md:pt-0"
                    aria-hidden
                  >
                    <span className="relative grid size-12 place-items-center rounded-[0.9rem] bg-ground-3 text-ink-3 ring-1 ring-rule-2 ring-inset transition-all duration-700 ease-fluid group-data-[state=active]/beat:scale-110 group-data-[state=active]/beat:bg-[var(--tint)] group-data-[state=active]/beat:text-white group-data-[state=active]/beat:shadow-[0_0_0_6px_var(--color-ground),0_0_40px_4px_color-mix(in_srgb,var(--tint)_60%,transparent)] group-data-[state=past]/beat:bg-[color-mix(in_srgb,var(--tint)_35%,var(--color-ground-3))] group-data-[state=past]/beat:text-ink">
                      <NebbosMark size={26} />
                    </span>
                  </div>

                  <Reveal
                    as="article"
                    x={40}
                    y={0}
                    className="bezel col-start-2 row-start-2 transition-shadow duration-700 ease-fluid md:col-start-3 md:row-start-1 group-data-[state=active]/beat:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--tint)_55%,transparent),0_30px_80px_-40px_var(--tint)]"
                  >
                    <div className="bezel-core h-full p-6 md:p-7">
                      <p className="m-0 font-code text-[10.5px] font-medium uppercase tracking-label text-ink-3">
                        With Nebbos
                      </p>
                      <p className="m-0 mt-2 font-code text-[13px] tabular-nums text-accent">
                        {beat.time}
                      </p>
                      <h3 className="m-0 mt-3 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                        {beat.calm.event}
                      </h3>
                      <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink-2">
                        {beat.calm.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </ScrollScrub>
      </div>
    </Section>
  );
}
