"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Minimal client-side contact form. Mirrors the legacy static behaviour: it
 * composes a mailto: so there is no backend to stand up for this pass. A real
 * form endpoint is a follow-up once the marketing CRM is wired.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Access request — ${company || name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nWork email: ${email}\nCompany: ${company}\n\nDepartment to start with:\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const fieldStyle = {
    width: "100%",
    background: "var(--ink-900)",
    border: "1px solid var(--hairline)",
    borderRadius: 10,
    color: "var(--paper)",
    padding: "11px 13px",
    fontFamily: "inherit",
    fontSize: 15,
  } as const;

  const labelStyle = { display: "block", fontSize: 14, marginBottom: 6, color: "var(--mist)" } as const;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required style={fieldStyle} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email" style={labelStyle}>Work email</label>
        <input id="email" name="email" type="email" autoComplete="email" required style={fieldStyle} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="company" style={labelStyle}>Company</label>
        <input id="company" name="company" type="text" autoComplete="organization" style={fieldStyle} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="message" style={labelStyle}>Which department would you start with?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="e.g. Delivery — handoffs keep slipping between two teams"
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
        Request access →
      </button>
      {sent ? (
        <p className="mono text-blue" style={{ marginTop: 16, fontSize: 12 }}>
          Opening your email app with the details filled in — just hit send.
        </p>
      ) : null}
    </form>
  );
}
