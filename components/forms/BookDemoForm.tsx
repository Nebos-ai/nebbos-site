"use client";

import { useState } from "react";
import { CONTACT, mailto } from "@/content/contact";

/**
 * BookDemoForm · v1 · 2026-09-12
 *
 * Inline demo-request form on /demo. Submit builds a mailto: URL with
 * pre-filled subject + body and hands off to the visitor's email client.
 * No backend, no third-party account, no external network call.
 *
 * FUTURE SUBSTRATE SWAP (founder-decision pending):
 *   To swap mailto for a real booking substrate (Calendly / HubSpot /
 *   nebos-backend endpoint), replace the buildMailto() call inside
 *   onSubmit with the substrate-specific submission. Every field on
 *   the form matches what a Calendly intake / HubSpot form / backend
 *   POST body would consume: email, name, company, message.
 *
 *   For Calendly: replace with
 *     window.location.href = `https://calendly.com/<username>/<event>?email=${enc(email)}&name=${enc(name)}&company=${enc(company)}`
 *
 *   For HubSpot: replace with a fetch POST to the HubSpot forms API +
 *   redirect to a thank-you page.
 *
 *   For a Nebos backend endpoint: POST to /api/v1/leads/demo with the
 *   full payload + show a thank-you state inline.
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

export function BookDemoForm() {
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
      aria-labelledby="book-demo-heading"
      style={{
        background: "var(--paper)",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div
        className="container"
        style={{
          paddingBlock: "clamp(64px, 10vh, 120px)",
          display: "grid",
          gap: "clamp(32px, 5vw, 64px)",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <div style={{ maxWidth: "48ch" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              margin: 0,
            }}
          >
            00 · Book a demo
          </p>
          <h2
            id="book-demo-heading"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 4.4vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              fontWeight: 400,
              color: "var(--ink)",
              margin: "20px 0 0 0",
              textWrap: "balance",
            }}
          >
            Tell us your{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)", fontWeight: 400 }}>
              hardest domain.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.5,
              color: "var(--ink-2)",
              margin: "20px 0 0 0",
              maxWidth: "44ch",
            }}
          >
            Four fields. Thirty minutes on the calendar. We show you a Pearl reading the signal your work emits, predicting what&rsquo;s about to go wrong, and acting under your approval.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          style={{
            display: "grid",
            gap: 20,
            maxWidth: "56ch",
          }}
          noValidate={false}
        >
          <FormField
            id="book-demo-name"
            label="Your name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={setName}
          />
          <FormField
            id="book-demo-email"
            label="Work email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={setEmail}
          />
          <FormField
            id="book-demo-company"
            label="Company"
            type="text"
            required
            autoComplete="organization"
            value={company}
            onChange={setCompany}
          />
          <FormField
            id="book-demo-message"
            label="Which domain? (optional)"
            type="textarea"
            value={message}
            onChange={setMessage}
            placeholder="Finance close · Design ops · IT security · …"
          />

          <button
            type="submit"
            disabled={handedOff}
            style={{
              alignSelf: "start",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "18px 32px",
              background: "var(--ink)",
              color: "var(--paper)",
              border: "1px solid var(--ink)",
              cursor: handedOff ? "default" : "pointer",
              transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)",
            }}
          >
            {handedOff ? "Opened in your email client →" : "Send request →"}
          </button>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              margin: 0,
              maxWidth: "56ch",
            }}
          >
            Submitting hands off to your default email client with the fields pre-filled. We reply within one business day.
          </p>
        </form>
      </div>
    </section>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
};

function FormField({ id, label, type, value, onChange, required, autoComplete, placeholder }: FormFieldProps) {
  const shared = {
    id,
    name: id,
    value,
    required,
    autoComplete,
    placeholder,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      lineHeight: 1.4,
      padding: "14px 16px",
      background: "var(--paper-2, #FBFAF7)",
      color: "var(--ink)",
      border: "1px solid var(--rule)",
      width: "100%",
      resize: type === "textarea" ? ("vertical" as const) : ("none" as const),
    },
  };

  return (
    <label
      htmlFor={id}
      style={{
        display: "grid",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
      }}
    >
      {label}
      {type === "textarea" ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
