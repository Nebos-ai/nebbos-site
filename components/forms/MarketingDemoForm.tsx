"use client";

import { useState, type CSSProperties } from "react";
import { CONTACT, mailto } from "@/content/contact";
import { Eyebrow, arrowWell, deck, headline } from "@/components/marketing/primitives";
import { cn } from "@/lib/cn";

const labelClass = "font-code text-[11px] font-medium uppercase tracking-label text-ink-2";
const fieldClass =
  "h-12 w-full rounded-[0.9rem] bg-ground-3 px-4 font-display text-[15px] text-ink ring-1 ring-rule-2 ring-inset outline-none transition-[box-shadow,background-color] duration-300 placeholder:text-ink-3 hover:bg-panel focus:bg-panel focus:shadow-[0_0_0_4px_rgb(255_107_30/0.18),inset_0_0_0_1px_rgb(255_107_30/0.8)]";

/**
 * MarketingDemoForm · v1 · 2026-09-18
 *
 * Dark-register book-a-demo form. Text-left copy + right-column form
 * on the marketing register. Same mailto: handoff as BookDemoForm —
 * no backend call, no third-party account. Preserved so the future
 * substrate swap (Calendly / HubSpot / nebos-backend endpoint)
 * happens at the buildMailto boundary.
 */

const SUBJECT_PREFIX = "Demo request";

function buildMailto(fields: {
  email: string;
  name: string;
  company: string;
  message: string;
}): string {
  const subject = `${SUBJECT_PREFIX}: ${fields.company || fields.name || "Nebbos"}`;
  const body = [
    `Name: ${fields.name}`,
    `Work email: ${fields.email}`,
    `Company: ${fields.company}`,
    "",
    "Notes:",
    fields.message || "(none)",
    "",
    "---",
    "Sent from https://nebbos.ai/demo",
  ].join("\n");
  return `${mailto(CONTACT.enterprise, subject)}&body=${encodeURIComponent(body)}`;
}

export function MarketingDemoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [handedOff, setHandedOff] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const href = buildMailto({ name, email, company, message });
    window.location.href = href;
    setHandedOff(true);
  }

  return (
    <section
      className="mkt relative isolate -mt-[76px] overflow-hidden px-4 pt-[76px] sm:px-6"
      aria-labelledby="demo-h"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-field absolute inset-0" />
        <div className="absolute -left-40 -top-40 size-[680px] rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -right-32 top-24 size-[480px] rounded-full bg-platform/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ground" />
      </div>

      <div className="mx-auto grid w-full max-w-[1240px] items-start gap-12 pb-20 pt-20 md:pb-28 md:pt-28 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7 lg:sticky lg:top-32">
          <div className="rise-in">
            <Eyebrow>Book a demo</Eyebrow>
          </div>
          <h1 id="demo-h" className={cn(headline, "rise-in max-w-[14ch] text-[clamp(2.75rem,5.4vw,4.5rem)] leading-[1]")}>
            Name your hardest department.
          </h1>
          <p className={cn(deck, "rise-in max-w-[50ch]")} style={{ "--d": "200ms" } as CSSProperties}>
            Four fields. Thirty minutes on the calendar. We show you a
            Pearl reading the signals your team already runs on,
            predicting what is about to go wrong, and acting under your
            approval.
          </p>
          <p
            className="rise-in m-0 max-w-[50ch] rounded-[1rem] bg-white/[0.03] px-4 py-3 font-code text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-3 ring-1 ring-rule ring-inset"
            style={{ "--d": "300ms" } as CSSProperties}
          >
            Submitting hands off to your default email client with the
            fields pre-filled. We reply within one business day.
          </p>
        </div>

        <div className="rise-in-far bezel glass bg-white/[0.035] backdrop-blur-md" style={{ "--d": "250ms" } as CSSProperties}>
          <div className="bezel-core p-6 md:p-8">
            {handedOff ? (
              <div className="flex min-h-[320px] flex-col justify-center gap-4" role="status" aria-live="polite">
                <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-xl text-accent" aria-hidden>
                  ✓
                </span>
                <p className="m-0 font-display text-2xl font-medium tracking-tight text-ink">Handed off to your email client.</p>
                <p className="m-0 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
                  If nothing opened, mail us directly at{" "}
                  <a href={`mailto:${CONTACT.enterprise}`} className="font-medium text-accent transition-colors hover:font-bold">
                    {CONTACT.enterprise}
                  </a>
                  . We reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5" noValidate>
                <div className="grid gap-2">
                  <label htmlFor="demo-name" className={labelClass}>Your name</label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="demo-email" className={labelClass}>Work email</label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="demo-company" className={labelClass}>Company</label>
                  <input
                    id="demo-company"
                    type="text"
                    required
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="demo-message" className={labelClass}>Which department? (optional)</label>
                  <textarea
                    id="demo-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Finance close · Design ops · IT security · ..."
                    className={cn(fieldClass, "min-h-[120px] resize-y py-3")}
                  />
                </div>

                <button
                  type="submit"
                  className="group mt-2 flex w-full items-center justify-between gap-3 rounded-pill bg-ink py-1.5 pl-6 pr-1.5 font-display text-[15px] font-medium text-ground shadow-[0_10px_40px_-12px_rgb(255_107_30/0.55),inset_0_-2px_0_rgb(0_0_0/0.12)] transition-[scale] duration-300 ease-fluid active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Send request
                  <span className={arrowWell} aria-hidden>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
