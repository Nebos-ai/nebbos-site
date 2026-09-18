import { SplitWords } from "@/components/patterns/SplitWords";

/**
 * MarketingShift · sections/MarketingShift.tsx · v1 · 2026-09-18
 *
 * Replaces MarketingSubstrate (6-stage architecture diagram) on the home.
 * Founder-directed: buyers don't want the substrate, they want the
 * PROMISE — what does Monday morning look like with a Pearl running?
 *
 * Consumer-psychology principles:
 *   - Story: two-column before/after ("your Monday without" / "your
 *     Monday with Nebbos"). Contrast makes the value scan.
 *   - Concrete: specific times ("7:14"), specific actions, specific
 *     relief. Not "improves efficiency."
 *   - Loss aversion (quietly): "without" column names the pain the
 *     buyer already feels. Then the "with" column shows it gone.
 *   - Named human at every stage: signals that the buyer is still in
 *     control, not being replaced.
 */

const WITHOUT = [
  { time: "07:14", event: "Slack alert",     body: "Ops chat lit up overnight. Coverage gap for the 8am shift. You start reading backlog in bed." },
  { time: "08:30", event: "War room",        body: "Standup turns into a war room. Three people needed to reconstruct what happened while they were asleep." },
  { time: "14:20", event: "Reactive fixes",  body: "The rest of the day is stitching. Finance close slips a day; the retention 1:1 gets rescheduled again." },
  { time: "18:00", event: "Backlog",         body: "You leave with a mental map of what to catch tomorrow. Your team leaves with the same one, staggered." },
];

const WITH = [
  { time: "07:14", event: "Pearl catches it", body: "Ops Pearl spotted the coverage gap at 04:30. Drafted a call-shift plan against your on-call roster. Waiting on your approval." },
  { time: "08:15", event: "Coffee approve",   body: "You approve on your phone. Biometric confirms it was you. The plan runs itself. Standup is a status update, not a fire." },
  { time: "14:20", event: "Close is closed",  body: "Finance Pearl already closed the month over the weekend, flagged the two variances that need your read, and posted the reconciliation." },
  { time: "18:00", event: "Home",             body: "You leave on time. So does your team. Nothing behind you. Every action from today is in an audit trail your CISO can walk." },
];

export function MarketingShift() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-shift-h">
      <div className="mkt-section__inner">
        <header className="mkt-flow__head">
          <p className="mkt-eyebrow">What changes on Monday</p>
          <h2 id="mkt-shift-h" className="mkt-h2">
            <SplitWords>One shift, with and without.</SplitWords>
          </h2>
          <p className="mkt-deck">
            Same team. Same signals. Same operators. The only variable is
            whether a Pearl is watching. Here is Monday, both ways.
          </p>
        </header>

        <div className="mkt-shift__grid">
          <div className="mkt-shift__col">
            <p className="mkt-shift__label">Monday without Nebbos</p>
            <div className="mkt-shift__list">
              {WITHOUT.map((item) => (
                <div key={item.time} className="mkt-shift__item">
                  <p className="mkt-shift__hour" style={{ color: "var(--mkt-text-3)" }}>{item.time}</p>
                  <h3 className="mkt-shift__event">{item.event}</h3>
                  <p className="mkt-shift__body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mkt-shift__col">
            <p className="mkt-shift__label" style={{ color: "var(--mkt-accent)" }}>Monday with Nebbos</p>
            <div className="mkt-shift__list">
              {WITH.map((item) => (
                <div key={item.time} className="mkt-shift__item">
                  <p className="mkt-shift__hour">{item.time}</p>
                  <h3 className="mkt-shift__event">{item.event}</h3>
                  <p className="mkt-shift__body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
