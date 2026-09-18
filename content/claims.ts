/**
 * content/claims.ts · Marketing claim substrate.
 *
 * Every SPECIFIC CLAIM on the marketing site (customer counts, deployment
 * numbers, geo counts, timeline assertions, case-study references, "running
 * today" language) MUST have an entry here, keyed to a source-of-record.
 *
 * Extends the ratified `content/*.ts` taxonomy (brand / facts / pricing /
 * contact) — see `feedback_content_taxonomy_pattern_nebbos_site` (2026-08-23,
 * verified 2026-09-09). Adds the missing category the MarketingProof v2
 * incident (2026-09-18, PR #107) exposed: unverifiable customer claims.
 *
 * WHY THIS FILE EXISTS
 *
 * Marketing surface = NARROW PROJECTION of ratified / verifiable internal
 * facts. When in doubt, DEFAULT OFF (per
 * `feedback_marketing_site_pricing_editorial_discipline`). The prior taxonomy
 * (brand/facts/pricing/contact) covered stable company copy. What it didn't
 * cover: assertions about the state of the operation — "12 school districts
 * running today," "shipping in Q4," "case studies of our education pilots."
 * MarketingProof v2 fabricated exactly those, no substrate to catch it.
 * This file is the substrate; `scripts/check-marketing-claims.mjs` is the
 * gate.
 *
 * DISCIPLINE
 *
 *   1. Every entry has `source_of_record` — one of three kinds:
 *        - {kind: "ratified", memory: "<slug>"}      — traces to a ratified
 *                                                      memory file in
 *                                                      ~/.claude/projects/-Users-matic/memory/
 *        - {kind: "live", file, path}                — traces to a live data
 *                                                      file in this repo
 *                                                      (e.g. platform-metrics.json)
 *        - {kind: "verifiable-external", proof}      — public fact anyone can
 *                                                      look up (SEC filing,
 *                                                      state incorporation
 *                                                      record, published
 *                                                      compliance certificate)
 *   2. If a claim doesn't fit one of the three kinds → the claim doesn't ship.
 *      No "fourth kind" for "trust me on this." That's how MarketingProof v2
 *      happened.
 *   3. Components render claims by IMPORTING from this file. Never inline
 *      the number/name/phrase. The CI gate (`scripts/check-marketing-claims.mjs`)
 *      catches inline hazard patterns and fails the PR.
 *   4. When the underlying source-of-record changes, THIS FILE is the one
 *      place to update. Sections re-render on the next deploy.
 *
 * HAZARD PATTERNS THE GATE CATCHES
 *
 *   - `\d+ (school|district|customer|user|client|pilot|state|hospital|
 *     company|team|deployment|instance|tenant|reference|case[-\s]?stud(y|ies))`
 *   - `(running|deployed|shipping|shipped|live|in production|in flight|
 *     active|piloting) (today|now|in|across|since)`
 *   - `across \w+ (states?|countries|regions|districts)`
 *   - `case (studies?|references?)` / `approved public reference` /
 *     `named customer`
 *   - Any word-form digit (`ten|twelve|dozens|hundreds|thousands`) followed
 *     by one of the nouns above
 *
 * See `scripts/check-marketing-claims.mjs` for the exact patterns + escape
 * mechanism. Two escapes: (1) same-line trailing `claim-source: <slug>`
 * comment (works in `//` line comments, JSDoc `* …` middle lines, and inline
 * JSX comments); (2) fenced ignore blocks in `.mjs` / `.ts` files, opened
 * with a claims-off block-comment delimiter and closed with a claims-on
 * one — used for tests and documentation examples that legitimately
 * embed hazard shapes.
 */

/**
 * Source-of-record kinds. Discriminated on `kind`. Every claim must resolve
 * to exactly one.
 */
export type ClaimSource =
  | {
      kind: "ratified";
      /** Memory slug in ~/.claude/projects/-Users-matic/memory/ */
      memory: string;
      /** One-line rationale — why THIS ratified memory backs the claim. */
      rationale: string;
    }
  | {
      kind: "live";
      /** Repo-relative path to the live data file. */
      file: string;
      /** JSON pointer / dotted path inside the file to the specific value. */
      path: string;
      /** One-line rationale — how to reproduce the value. */
      rationale: string;
    }
  | {
      kind: "verifiable-external";
      /** One-line rationale + optional public link a reader can check. */
      proof: string;
    };

/**
 * One claim entry. `id` is the stable slug used by both components (import
 * `CLAIMS.id`) and the CI gate (which records which slugs are live).
 */
export type Claim = {
  /** Stable kebab-case slug. Never rename in place — retire + replace. */
  readonly id: string;
  /** Human-readable value as it will appear on the site (or a template
   *  string with `${…}` interpolations from a live source). Consumers
   *  render this verbatim. Keep concise; long-form copy lives in the
   *  section that consumes the claim. */
  readonly value: string;
  /** Numeric part of the claim, when the claim carries a number.
   *  Optional; string claims (e.g. category labels) leave this null. */
  readonly numeric: number | null;
  /** Which sections legitimately consume this. Grep-audit target. */
  readonly consumed_by: readonly string[];
  /** Source-of-record — required. */
  readonly source_of_record: ClaimSource;
};

/**
 * The claim registry. Each key is the stable slug; the entry is the claim.
 *
 * Seed set covers what MarketingProof v3 renders today. New entries added
 * as sections migrate off inline strings (follow-up PR sweep once
 * PR #107 merges and peer session dd808040 finishes the concurrent
 * section rewrite).
 */
export const CLAIMS = {
  "dogfood-lines-of-code-millions": {
    id: "dogfood-lines-of-code-millions",
    value: "M", // Template — actual value is interpolated from platform-metrics.json
    numeric: null,
    consumed_by: ["components/sections/MarketingProof.tsx"],
    source_of_record: {
      kind: "live",
      file: "content/platform-metrics.json",
      path: "shipped.lines_of_code_millions",
      rationale:
        "Regenerated on deploy from the loc-across-repositories build step; " +
        "auditable against `wc -l` on the tree.",
    },
  },

  "dogfood-repositories-count": {
    id: "dogfood-repositories-count",
    value: "(repositories count from platform-metrics.json)",
    numeric: null,
    consumed_by: ["components/sections/MarketingProof.tsx"],
    source_of_record: {
      kind: "live",
      file: "content/platform-metrics.json",
      path: "shipped.repositories",
      rationale:
        "Count of active repositories under the Nebos-ai org, regenerated " +
        "on deploy. Verifiable via `gh repo list Nebos-ai --limit 200`.",
    },
  },

  "dogfood-commits-last-30d": {
    id: "dogfood-commits-last-30d",
    value: "(commits-last-30d from platform-metrics.json)",
    numeric: null,
    consumed_by: ["components/sections/MarketingProof.tsx"],
    source_of_record: {
      kind: "live",
      file: "content/platform-metrics.json",
      path: "shipped.commits_last_30d",
      rationale:
        "Regenerated on deploy from `git log --since='30 days ago'` across " +
        "the org's active repos.",
    },
  },

  "founding-year": {
    id: "founding-year",
    value: "2026",
    numeric: 2026,
    consumed_by: [
      "content/facts.ts::FACTS.foundingYear",
      "components/site/Footer.tsx",
    ],
    source_of_record: {
      kind: "verifiable-external",
      proof:
        "Nebbos Technologies Corp — Delaware corporate filing, 2026. " +
        "State-of-Delaware entity search is public record.",
    },
  },

  "team-shape-founder-led": {
    id: "team-shape-founder-led",
    value: "Founder-led",
    numeric: null,
    consumed_by: ["content/facts.ts::FACTS.teamShape"],
    source_of_record: {
      kind: "verifiable-external",
      proof:
        "Public fact — Dejan Matic is the founder; there are no other named " +
        "principals on public filings. See `content/facts.ts::FACTS.teamShape`.",
    },
  },

  "retraction-history": {
    id: "retraction-history",
    value: "(documentation-only — not rendered on the site)",
    numeric: null,
    consumed_by: [
      "components/sections/MarketingProof.tsx",
      "components/sections/InProductionBand.tsx",
      "app/customers/page.tsx",
      "app/page.tsx",
    ],
    source_of_record: {
      kind: "ratified",
      memory: "feedback_marketing_site_pricing_editorial_discipline",
      rationale:
        "Documentation-only slug used to escape-trail the retraction " +
        "history blocks in JSDoc comments across sections that carried " +
        "unverifiable customer claims prior to 2026-09-18. Each retraction " +
        "docstring quotes the removed phrasing verbatim so future editors " +
        "understand what was there and why it was removed. The gate " +
        "(`scripts/check-marketing-claims.mjs`) matches the same hazard " +
        "shape in the quoted-history text; the `// claim-source: retraction-history` " +
        "trailer on each quoted line tells the gate this occurrence is " +
        "audit history, not a live claim. Never use this slug on a line " +
        "that renders to the user.",
    },
  },

  "corporate-taxonomy-one-company": {
    id: "corporate-taxonomy-one-company",
    value: "Three entities. One company.",
    numeric: null,
    consumed_by: ["app/contact/page.tsx"],
    source_of_record: {
      kind: "verifiable-external",
      proof:
        "Public corporate structure — Nebbos Technologies Corp (Delaware " +
        "parent), Nebbos AI (US operating unit), Nebbos D.O.O. (Serbian " +
        "operating subsidiary). All three are on the public filings; the " +
        "'one company' phrasing describes the unified operating entity, " +
        "not a customer/deployment claim.",
    },
  },

  "hypothetical-scope-enumeration": {
    id: "hypothetical-scope-enumeration",
    value:
      "(pattern-only — enumerates hypothetical scopes an engagement could " +
      "take, e.g. 'pilot, one department, one district, one agency')",
    numeric: null,
    consumed_by: ["app/pricing/page.tsx"],
    source_of_record: {
      kind: "ratified",
      memory: "feedback_marketing_site_pricing_editorial_discipline",
      rationale:
        "Enumerations that describe the RANGE of engagement shapes a " +
        "single tier covers ('pilot, one department, one district, one " +
        "agency') are descriptive, not customer claims. They describe the " +
        "CONTRACT SHAPE, not a deployment reality. The pricing surface " +
        "uses this pattern to make the tier-vs-scope relationship " +
        "explicit. Adjacent lines that WOULD assert a real customer " +
        "count (e.g. 'we serve <N> districts') must not use this slug " +
        "and remain gate-blocked.",
    },
  },
} as const satisfies Readonly<Record<string, Claim>>;

/**
 * Type-level index of claim slugs. Consumers can restrict a prop to
 * `keyof typeof CLAIMS` to get autocomplete + refactor-safety.
 */
export type ClaimId = keyof typeof CLAIMS;

/**
 * Look up a claim by slug. Fails typed at compile time if the slug is
 * unknown. Preferred over `CLAIMS[slug as ClaimId]` because it makes the
 * consumption grep-visible: every callsite reads `claim("<id>")` and the
 * CI gate can enumerate them.
 */
export function claim<T extends ClaimId>(id: T): (typeof CLAIMS)[T] {
  return CLAIMS[id];
}
