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
  category: "Company-brain infrastructure for enterprise",

  /** One-line legal footer. */
  legalFooter: "© 2026 TR3I d.o.o. All rights reserved.",

  /** Compliance stance (marketing-safe phrasing per adversarial review). */
  complianceStance:
    "Engineered to SOC 2 Type II and ISO 27001:2022 controls. EU AI Act Article 11 Annex IV pack available under NDA.",

  /** Public product line. */
  productLine: [
    "Nebbos (company-brain operating system)",
    "Pearl (per-department brain — Nebbos General [Domain], tuned by use)",
    "Shell (per-department container that holds a Pearl)",
    "Cradle (customer&rsquo;s owned memory · portable when you leave)",
  ] as const,
} as const;
