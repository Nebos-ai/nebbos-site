/**
 * content/contact.ts · Wave 3f · contact-surface copy registry.
 *
 * Every mailto: string on the site imports from here. Change one field and
 * every button, footer link, and legal page updates on the next deploy.
 */

export const CONTACT = {
  /** General inbound — sales, partnerships, misc. */
  general: "hello@nebbos.ai",

  /** Journalist / analyst inquiries. */
  press: "press@nebbos.ai",

  /** Vulnerability reports + incident notification. */
  security: "security@nebbos.ai",

  /** Data-protection officer (GDPR, DSARs). */
  privacy: "privacy@nebbos.ai",

  /** Enterprise / procurement — SOWs, MSAs, DPAs. */
  enterprise: "enterprise@nebbos.ai",

  /** Legal / DPA / policy questions. */
  legal: "legal@nebbos.ai",

  /** Developer + integration questions. */
  engineering: "engineering@nebbos.ai",

  /** Demo booking form. */
  demoFormPath: "/demo",

  /** Contact form / office info. */
  contactPagePath: "/contact",
} as const;

/** Convenience — build a `mailto:` href with subject prefill. */
export function mailto(addr: string, subject?: string): string {
  const base = `mailto:${addr}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
