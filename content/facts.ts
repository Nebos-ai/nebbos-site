/**
 * content/facts.ts · Wave 3f · company-facts copy registry.
 *
 * Facts a journalist or an auditor would ask for. Every occurrence of any of
 * these on the site imports from here so the /press page, /about page,
 * footer copyright, sitemap, and OG images stay consistent.
 */

export const FACTS = {
  /** Year the company was founded. */
  foundingYear: 2026,

  /** Team shape descriptor. */
  teamShape: "Founder-led",

  /** Country / jurisdiction — Nebbos Technologies D.O.O. is the Serbian operating entity. */
  jurisdiction: "Serbia (RS)",

  /** Category positioning (mirrored to content/brand.ts for cross-file consistency). */
  category: "Operator platform for AI-native operations",

  /**
   * One-line legal footer — three-tier form per 2026-09-16 corporate-taxonomy
   * amendment (session 3c918563 clarification, adds middle Nebbos AI tier).
   * Ordered outer → inner: Delaware parent, LA AI unit, Serbian subsidiary.
   */
  legalFooter: "© 2026 Nebbos Technologies Corp · Nebbos AI · Nebbos Technologies D.O.O. — All rights reserved.",

  /** Compliance stance (retracted 2026-09-14 to match /compliance body §§02-06 authoritative phrasing). */
  complianceStance:
    "Substrate controls implemented against SOC 2 Type II and ISO 27001:2022 targets. SOC 2 certification is in progress; ISO 27001:2022 not yet held. EU AI Act Annex IV pack in preparation ahead of 2027-08-02 Article 6/Annex III deadline. Full authoritative status at /compliance.",

  /** Public product line — the four surfaces + one substrate framing per the
   *  Institutional deck, ratified customer-facing taxonomy 2026-09-19.
   *  Prior "Cradle · Shell · Pearl" three-tier architecture (2026-08 era)
   *  is superseded on customer surfaces; retained in the internal register
   *  as run-layer architecture language. See content/pieces/ for the
   *  publications that walk this framing. */
  productLine: [
    "Platform (where the Pearls live — every action attested, every trail portable)",
    "App (your Pearl on the metal in front of you — native macOS and Windows)",
    "MCP (the line every tool call has to cross — classifier decides the tier on your host)",
    "Cradle (sovereignty you can put in your pocket — hardware carrying the MCP binary, the Pearl memory, and the keys)",
  ] as const,
} as const;
