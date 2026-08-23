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

  /** Team shape at time of writing. */
  teamShape: "Solo-founder-led",

  /** Country / jurisdiction (per project_nebbos_naming_ratified_2026_08_21 legal entity TR3I). */
  jurisdiction: "Serbia (RS)",

  /** Category positioning (mirrored to content/brand.ts for cross-file consistency). */
  category: "AI-agent governance for enterprise",

  /** One-line legal footer. */
  legalFooter: "© 2026 TR3I d.o.o. All rights reserved.",

  /** Compliance stance (marketing-safe phrasing per adversarial review). */
  complianceStance:
    "Engineered to SOC 2 and ISO 27001 controls. Certificates in progress. EU AI Act Article 11 Annex IV pack available under NDA.",

  /** Public product line. */
  productLine: [
    "Nebbos (governance substrate)",
    "Pearl (per-department agent)",
    "Shell (per-department container)",
    "Cradle (customer's owned memory)",
  ] as const,
} as const;
