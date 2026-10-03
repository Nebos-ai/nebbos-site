import { ShiftPlayhead } from "@/components/patterns/ShiftPlayhead";
import { SplitWords } from "@/components/patterns/SplitWords";
import { NebbosMark } from "@nebbos/brand/logo";

/**
 * MarketingShift · sections/MarketingShift.tsx · v2 · 2026-09-18
 *
 * Day-in-the-life animation of one operator's Monday, WITHOUT and WITH
 * Nebbos, along one shared timeline. Founder-directed 2026-09-18:
 * "we should use this animation to show just a day in the life of a
 * nebbos user" — the pattern reference was a scroll-driven timeline
 * pen; the aesthetic is our dark marketing register.
 *
 * Structure — 4 beats × 3 columns:
 *   [ chaos card · without ]  [ spine node · flower tile ]  [ calm card · with ]
 *
 * A sticky clock playhead at the top of the section shows the current
 * beat's hour, updated by IntersectionObserver (ShiftPlayhead client
 * child). Each beat is a scroll-linked reveal (translate-only per the
 * axe-safety doctrine — opacity never animates in scroll-timeline
 * keyframes). Active beat lights up its Pearl color; past beats mute;
 * future beats ghost.
 *
 * The spine flower tile uses the same app-icon shape used elsewhere
 * on the home (per-product color background + white currentColor
 * flower + elevation shadow) so this section reads as one design
 * language with departments/products.
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

export function MarketingShift() {
  return (
    <section className="mkt mkt-section mkt-shift" aria-labelledby="mkt-shift-h">
      <div className="mkt-section__inner">
        <header className="mkt-flow__head">
          <p className="mkt-eyebrow">A day in the life</p>
          <h2 id="mkt-shift-h" className="mkt-h2">
            <SplitWords>One Monday, with and without.</SplitWords>
          </h2>
          <p className="mkt-deck">
            Same operator. Same signals. Same team. The only variable is
            whether a Pearl is watching. Scroll the day.
          </p>
        </header>

        <ShiftPlayhead
          beats={BEATS.map((b) => ({ time: b.time, product: b.product }))}
        />

        <ol className="mkt-shift__timeline" aria-label="Monday, beat by beat">
          {BEATS.map((beat, i) => (
            <li
              key={beat.time}
              className={`mkt-shift__beat mkt-shift__beat--${beat.product}`}
              data-beat={i}
              data-time={beat.time}
            >
              <article className="mkt-shift__card mkt-shift__card--chaos">
                <p className="mkt-shift__cardlabel">Without</p>
                <p className="mkt-shift__hour">{beat.time}</p>
                <h3 className="mkt-shift__event">{beat.chaos.event}</h3>
                <p className="mkt-shift__body">{beat.chaos.body}</p>
              </article>

              <div className="mkt-shift__spine" aria-hidden>
                <span className="mkt-shift__spine-line mkt-shift__spine-line--above" />
                <span className={`mkt-shift__spine-tile mkt-shift__spine-tile--${beat.product}`}>
                  <NebbosMark size={28} />
                </span>
                <span className="mkt-shift__spine-line mkt-shift__spine-line--below" />
              </div>

              <article className="mkt-shift__card mkt-shift__card--calm">
                <p className="mkt-shift__cardlabel">With Nebbos</p>
                <p className="mkt-shift__hour mkt-shift__hour--accent">{beat.time}</p>
                <h3 className="mkt-shift__event">{beat.calm.event}</h3>
                <p className="mkt-shift__body">{beat.calm.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
