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

  /** Country / jurisdiction (per project_nebbos_naming_ratified_2026_08_21 legal entity TR3I). */
  jurisdiction: "Serbia (RS)",

  /** Category positioning (mirrored to content/brand.ts for cross-file consistency). */
  category: "Run-layer substrate for enterprise AI",

  /** One-line legal footer. */
  legalFooter: "© 2026 TR3I d.o.o. All rights reserved.",

  /** Compliance stance (retracted 2026-09-14 to match /compliance body §§02-06 authoritative phrasing). */
  complianceStance:
    "Substrate controls implemented against SOC 2 Type II and ISO 27001:2022 targets. SOC 2 certification is in progress; ISO 27001:2022 not yet held. EU AI Act Annex IV pack in preparation ahead of 2027-08-02 Article 6/Annex III deadline. Full authoritative status at /compliance.",

  /** Public product line. */
  productLine: [
    "Nebbos (operator platform · MCP · USB · biometric-attested)",
    "Pearl (per-domain brain — Nebbos General [Domain], tuned by use)",
    "Shell (per-domain container that holds a Pearl)",
    "Cradle (customer&rsquo;s owned memory · portable when you leave)",
  ] as const,
} as const;
