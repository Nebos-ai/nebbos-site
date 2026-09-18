"use client";

import { useState } from "react";
import { CONTACT, mailto } from "@/content/contact";

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
    <section className="mkt mkt-section mkt-hero" aria-labelledby="demo-h">
      <div className="mkt-section__inner">
        <div className="mkt-demo__grid">
          <div className="mkt-demo__copy">
            <p className="mkt-eyebrow">Book a demo</p>
            <h1 id="demo-h" className="mkt-display">
              Name your hardest department.
            </h1>
            <p className="mkt-deck">
              Four fields. Thirty minutes on the calendar. We show you a
              Pearl reading the signals your team already runs on,
              predicting what is about to go wrong, and acting under your
              approval.
            </p>
            <p className="mkt-demo__hint">
              Submitting hands off to your default email client with the
              fields pre-filled. We reply within one business day.
            </p>
          </div>

          {handedOff ? (
            <div className="mkt-demo__ack" role="status" aria-live="polite">
              <p className="mkt-demo__ack-title">Handed off to your email client.</p>
              <p className="mkt-demo__ack-body">
                If nothing opened, mail us directly at{" "}
                <a href={`mailto:${CONTACT.enterprise}`} style={{ color: "var(--mkt-accent)" }}>
                  {CONTACT.enterprise}
                </a>
                . We reply within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mkt-demo__form" noValidate>
              <div className="mkt-field">
                <label htmlFor="demo-name" className="mkt-field__label">Your name</label>
                <input
                  id="demo-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mkt-field__input"
                />
              </div>

              <div className="mkt-field">
                <label htmlFor="demo-email" className="mkt-field__label">Work email</label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mkt-field__input"
                />
              </div>

              <div className="mkt-field">
                <label htmlFor="demo-company" className="mkt-field__label">Company</label>
                <input
                  id="demo-company"
                  type="text"
                  required
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mkt-field__input"
                />
              </div>

              <div className="mkt-field">
                <label htmlFor="demo-message" className="mkt-field__label">Which department? (optional)</label>
                <textarea
                  id="demo-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Finance close · Design ops · IT security · ..."
                  className="mkt-field__textarea"
                />
              </div>

              <button type="submit" className="mkt-cta mkt-cta--primary mkt-cta--submit">
                Send request
                <span className="mkt-cta__arrow" aria-hidden>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
