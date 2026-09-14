# nebbos.ai elite-bar close-out — design spec

**Status**: DRAFT · pending founder review
**Date**: 2026-09-14
**Session**: 761a904f-5b16-4310-a8cf-12b8a82d7934
**Author**: Claude Opus 4.7 (session-agent), on behalf of Nebbos founder
**Governing doctrine**: [Nebbos Design Charter](~/.claude/skills/nebbos-design-charter/SKILL.md) + [FEES ADR-PROV v1.2](~/code/nebos-governance/docs/decisions/drafts/2026-08-22_ADR-PROV-nebbos-front-end-estate-substrate.md)

## Operator surface (Charter Rule 13 compliance)

- **URL**: https://nebbos.ai
- **Repo**: `/Users/matic/code/nebbos-site` (grep-verified `package.json:2` — `"name": "nebbos-site"` v2.0.0)
- **Route files**: `app/**/page.tsx` across 21 static routes + 4 dynamic segments (`[slug]`, `[band]`, `[layer]`, `[...slug]`) + 1 layout. Full inventory in [`scratchpad/audit-route-section-coverage-2026-09-14.md`](../../../../.claude-scratchpad/audit-route-section-coverage-2026-09-14.md).

## Audit corpus (9 parallel Explore streams, 2026-09-14)

All 9 audit reports saved to `/private/tmp/claude-501/-Users-matic/761a904f-5b16-4310-a8cf-12b8a82d7934/scratchpad/`:

1. `audit-content-voice-truth-2026-09-14.md` — 84 voice-drift hits, 32 truth-claim risks (22 HIGH)
2. `audit-design-substrate-drift-2026-09-14.md` — 47 token drifts, 3 undefined-var bugs
3. `audit-framework-rendering-2026-09-14.md` — Dims 1 + 2
4. `audit-motion-polish-2026-09-14.md` — Dims 4 + 12
5. `audit-perf-a11y-2026-09-14.md` — Dims 5 + 6
6. `audit-assets-observability-2026-09-14.md` — Dims 7 + 10
7. `audit-content-design-substrate-2026-09-14.md` — Dims 8 + 9 architecture
8. `audit-route-section-coverage-2026-09-14.md` — full route × section × copy ground truth
9. `audit-governance-scorecard-2026-09-14.md` — Dim 11 + 12-dim synthesis

## Executive summary

The nebbos.ai marketing site scored **0 of 12 at elite** as of 2026-09-14. The [Nebbos Design Charter](~/.claude/skills/nebbos-design-charter/SKILL.md) self-assessment on 2026-08-23 claimed "6 of 12 held at elite; 6 gaps documented" — an over-count of 6 that this audit corrects.

The gap is not just polish. Concrete surface areas:
- **22 HIGH truth-claim risks** on `/trust`, `/security`, `/compliance` — SOC 2 / ISO 27001 / HIPAA / Annex IV / FERPA still asserted as "available under NDA" after retractions swept `/compliance` body only. `/compliance` hero contradicts `/compliance` §§02-06 on the same page. **Legal exposure.**
- **84 voice-drift hits** — retired "company brain", "operating system", "fifteen governance layers", "department" ship across pages.ts + facts.ts + lib/architecture.ts (36 hits alone) + 5 blog posts. Sweep 19e3213 skipped `lib/`.
- **3 undefined CSS variables** referenced across 8 sites: `--accent` (5×), `--paper-3` (1×), `--dur-default` (2×). Colors and durations resolving to browser defaults.
- **1 broken ARIA reference**: `HomeBands.tsx:111` `aria-controls={band-${band.n}-panel}` points to a tabpanel id that is never rendered.
- **1 a11y bypass**: `ArchitectureGraph.tsx` motion-lib inline transforms are not gated by `useReducedMotion()` — bypasses global CSS reduced-motion rule.
- **Two rival design systems in one repo**: `design/tokens.json` (delta-brief editorial warm cream + Newsreader) vs `@nebbos/brand` v2.0.1 (Folio/platform slate + Blue Aura `#637dff`). Both are wired; neither is the SSoT.
- **Charter's own related docs are stale**: `pipeline.md` and `intake-protocol.md` do not exist at the paths the Charter names.
- **Missing infrastructure**: no `/design` route, no `/how` route, 0 `opengraph-image.tsx`, 0 Web Vitals, 0 `error.tsx`/`not-found.tsx`, no `sitemap.ts`/`robots.ts`.

## 12-dimension honest scorecard

| # | Dim | Charter expectation | 2026-08-23 self-assess | 2026-09-14 verdict |
|---|---|---|---|---|
| 1 | Framework | Next 16.2.11 / 15.5.21 · React 19.1.0 · standalone · viewTransition | implied at-elite | **gap** |
| 2 | Rendering | force-static + Suspense + streaming SSR | implied at-elite | **gap** |
| 3 | Type system | OKLCH + `light-dark()` + `color-mix()` + `clamp()` + JSON SoT | implied at-elite | **miss** |
| 4 | Motion | View Transitions + `@property` + `@starting-style` + `animation-timeline` | implied at-elite | **gap** |
| 5 | Perf | LCP<1s · INP<100ms · CLS=0 · LH≥95 · CI-gated | advisory | **gap** |
| 6 | A11y | WCAG 2.2 AA + axe CI-gated + reduced-motion + forced-colors | advisory | **gap** |
| 7 | Assets | dynamic OG + AVIF+WebP + video reduced-motion fallback | implied at-elite | **miss** |
| 8 | Content | typed content registry + section-as-frame + MDX | implied at-elite | **gap** |
| 9 | Design substrate | live `/design` + versioned doctrine + published charter | implied at-elite | **miss** |
| 10 | Observability | web-vitals endpoint + error boundary + `/how` + build metadata | pending | **miss** |
| 11 | Governance-as-code | commit doctrine + hooks + doctrine enforced | implied at-elite | **gap** |
| 12 | Cutting-edge polish | speculation rules + view transitions + scroll-driven + dark palette | implied at-elite | **gap** |

**Roll-up**: 0 at elite / 8 gap / 4 miss.

## Resolved decisions (agent-decided per `feedback_agent_decides_and_executes_never_asks_founder_to_pick`)

All 5 decisions resolved autonomously 2026-09-14 with grep-verified reasoning. Founder can override any resolution by editing this block.

| D | Decision | Reasoning |
|---|---|---|
| D1 | **Option A** — converge globals.css to tokens.json (revert to warm-cream + Newsreader/Host Grotesk/JetBrains Mono + flat cream chrome per delta-brief editorial) | Founder ratified "tokens.json wins" 2026-09-14 with full context. FEES v1.2 row 1a ratifies delta-brief as canonical marketing SSoT. 2026-09-14 directive supersedes 2026-08-24 per governance-additive-only. |
| D2 | **Option A** — publish `@nebbos/brand/marketing` sub-export from tokens.json values; site consumes it; Folio/platform consumers keep base `@nebbos/brand` | FEES v1.2 row 1a says marketing consumes delta-brief VIA `@nebbos/brand`. Current v2.0.1 exports Folio/platform tokens — that's the drift. Smallest-lift fix that makes FEES v1.2 true. Preserves platform consumers. |
| D3 | **Retract** the 23% Bessemer/Avante/SFAI Labs 2026 benchmark + OpenAI 56% claim; replace with unattributed framing OR first-party Nebbos-measured stat | Same session produced ROI stats retracted in commit `a80b45d`. Zero primary-source URL/DOI/archive in the repo. Per `feedback_first_party_verification_for_regulatory_deadlines`, attributed third-party stats without a resolvable source ARE fabrication. |
| D4 | **Option A** — unify every H1 selector to `font-variant: small-caps` | globals.css:174-177 doctrine explicitly says "site-wide h2/h3/h4 pattern". Hero-fullbleed uses small-caps. The 4 outliers (`.hero-paper__title`, `.cta-fullbleed__title`, `.editorial-page__title`, `.editorial-post__title`) explicitly set `font-variant: normal` — but that contradicts "site-wide". Unify. |
| D5 | **Option A** — wire `/platform` into primary nav as top-level item; sub-routes become tabs; move `/presentation` into footer Company column | Wave 3 commit `1779557 feat(wave-3): rewrite /platform/* subject-matter pages with run-layer voice` invested content-migration effort — content-worth is public-discovery-worth. |

Phases 3, 6, 7 no longer gated on these decisions.

### D1 · SSoT direction (2026-08-24 override vs 2026-09-14 preference)

**The tension**: On 2026-09-14 you chose "tokens.json wins" as the ratified SSoT (warm cream `#F4F1EA` + Newsreader/Host Grotesk/JetBrains Mono + flat cream chrome per delta-brief editorial). On 2026-08-24 you had ratified the opposite (Nebbos white `#FFFFFF` + Space Grotesk + Fira Code + dark chrome per `app/globals.css:349-354` inline annotation *"Founder direction 2026-08-24: header is always DARK"*). The current site ships the 2026-08-24 state; converging to tokens.json means REVERTING the 2026-08-24 visual identity.

**Alternatives**:
- **A** · Retire 2026-08-24 override; converge globals.css to tokens.json (warm cream + Newsreader + flat chrome). Biggest visual change.
- **B** · Amend tokens.json to reflect 2026-08-24 ratified state (Space Grotesk + cool slate + dark chrome). Least visual change; needs doctrine amendment recorded in Charter.
- **C** · Hybrid — keep dark chrome (2026-08-24) but reconcile everything else to tokens.json.

**Recommendation**: **B**. The 2026-08-24 state is what customers see and what your instinct chose 21 days ago. Amending tokens.json to reflect ratified state costs one doctrine amendment; A costs a full re-design pass on live site.

### D2 · Two-design-system architectural resolution

**The tension**: Two design systems occupy one repo. `design/tokens.json` declares the delta-brief editorial system. `@nebbos/brand` v2.0.1 (`node_modules/@nebbos/brand/tokens.ts`) declares the Folio/platform system (slate ramp + Blue Aura `#637dff` + Bricolage/Inter/Geist Mono). `@nebbos/brand`'s own docstring says it is "consumed by Folio (@nebos/ui) + the marketing sites" — implying it is the SSoT for BOTH platform and marketing, but tokens.json contradicts that.

**Alternatives**:
- **A** · Publish `@nebbos/brand/marketing` sub-export from tokens.json values; site consumes it; delete tokens.json local copy.
- **B** · Scope this site to `@nebbos/brand` platform tokens and delete `design/tokens.json`. Retire the delta-brief editorial system from the marketing site.
- **C** · Formally split `@nebbos/brand` into two packages: `@nebbos/brand-marketing` (delta-brief) and `@nebbos/brand-platform` (Folio). Marketing site consumes the marketing package.

**Recommendation**: **C** — clearest boundary, but heaviest lift. **A** is the medium-cost path.

### D3 · 23% benchmark verification

**The tension**: `content/pages.ts:1513, 1525` + 3 blog posts cite "23% inference-of-revenue benchmark (Bessemer/Avante/SFAI Labs 2026)" + "OpenAI is running at 56%". These are specific attributable third-party statistics. The retraction commit `a80b45d` explicitly retracted fabricated ROI stats. If the Bessemer/Avante/SFAI Labs 2026 study does not resolve to a real source, this is the same class of fabrication.

**Ask**: Can you (or can Nebbos) produce the citation for the Bessemer/Avante/SFAI Labs 2026 study — a URL, DOI, or archive that resolves? If not, retract to unattributed framing.

**Recommendation**: verify or retract. Do not ship attributed statistics without a resolvable source.

### D4 · H1 first-letter-caps consistency

**The tension**: 6 title-selector rules in globals.css disagree on the small-caps convention. `.hero-fullbleed__title` uses `font-variant: small-caps` (first letter big-cap, rest small-cap). `.hero-paper__title`, `.cta-fullbleed__title`, `.editorial-page__title`, `.editorial-post__title`, and bare `<h1>` all render mixed-case. The doctrine comment at globals.css:174-177 says *"small-caps restored as the site-wide h2/h3/h4 pattern"* — h2/h3/h4 are unified on small-caps, but H1 has drifted per-hero-type.

**Alternatives**:
- **A** · Unify — every H1 selector uses `font-variant: small-caps` matching the hero-fullbleed pattern.
- **B** · Keep per-type variance — full-bleed heroes use small-caps for editorial weight; paper heroes + CTAs + editorial pages stay mixed-case for prose readability.
- **C** · Retire small-caps site-wide — return to mixed-case everywhere.

**Recommendation**: **A** if the doctrine is "editorial weight everywhere"; **B** if the doctrine is "big hero = small-caps, prose page = mixed-case". Pick and document.

### D5 · Orphan `/platform/*` + `/presentation` routes

**The tension**: 9 routes ship but are not linked from primary nav OR footer: `/platform` + 7 sub-routes + `/presentation`. They are reachable only from cross-links between each other + press-kit list + changelog. A user landing on the homepage cannot find them.

**Alternatives**:
- **A** · Wire `/platform` into primary nav; keep sub-routes as tabs within it. Retire `/presentation` OR add to footer Company column.
- **B** · Retire the 9 routes; fold what content survives into `/product/*` band pages.
- **C** · Keep them orphan on purpose — sales-hand-off surfaces not meant for organic discovery.

**Recommendation**: **A** if these are meant for public discovery; **C** if they are sales enablement (in which case, document that in AGENTS.md).

## Approach

Wave-based per [Article XIV Standard 3](~/code/nebos-governance/docs/decisions/decisions.md) — every wave has entry/exit criteria + single measurable gate + mandatory retrospective. Truth-claim retractions land Phase 1 due to legal exposure. Session-ready fixes bundle in Phase 2 parallel-executable with Phase 1. Multi-session structural work Phases 3-13.

**Portfolio balance target** (per [feedback_portfolio_balance_governance_vs_product_1_1](~/.claude/projects/-Users-matic/memory/feedback_portfolio_balance_governance_vs_product_1_1.md)): 1:1 governance:product. This spec IS the governance side. Every implementation phase = product side. Balance maintained across the sequence.

**HITL discipline** (per [feedback_hitl_lifecycle_planning_gates_execution_autonomous](~/.claude/projects/-Users-matic/memory/feedback_hitl_lifecycle_planning_gates_execution_autonomous.md)): founder approves this spec + resolves D1-D5. Execution then proceeds autonomously per phase, returning on warning / attack / not-working.

**Verify-first** binds throughout: every ADR / PR / file:line cited in any phase's PR message needs same-turn grep evidence.

## Phased plan (13 phases)

### Phase 1 · Truth-claim retraction sweep [LEGAL — 1 session]

**Goal**: Every certification / attestation claim on customer-facing pages agrees with `/compliance` body's authoritative state.

**Scope** (grep-verified from `audit-content-voice-truth-2026-09-14.md`):
- `content/pages.ts:1670-1675` — `/trust` §10 certs list (SOC 2, ISO 27001, Annex IV, HIPAA, FERPA all "available under NDA")
- `content/pages.ts:1614` — `/trust` §05 attestation ("Auditors accept it as SOX-adequate...")
- `content/pages.ts:1825` — `/security` §11 certs list (SOC 2 report, ISO 27001 statement, HIPAA BAA "available")
- `content/pages.ts:1710/1712/1719` — `/security` hero "Engineered to SOC 2 Type II and ISO 27001:2022 controls"
- `content/pages.ts:1847-1868` — `/compliance` hero + §01 (intra-page contradiction with §§02-06)
- `content/pages.ts:958` — `/solutions/healthcare` §09 objection "Is this HIPAA-compliant? Yes."
- `content/pages.ts:984` — `/solutions/healthcare` week-1 "MSA + BAA signed"
- `content/pages.ts:942` — `/solutions/healthcare` §04 "HIPAA-adequate audit trail"
- `content/pages.ts:817` — `/solutions/k12` §09 FERPA-compliant answer
- `content/pages.ts:393` — `/solutions/operations` "Ready for SOC 2 evidence + EU AI Act Article 11 pack"
- `content/pages.ts:538` — `/solutions/finance` §09 "External auditors we've walked through it accept the attestation as SOX-adequate"
- `content/facts.ts:27` — `FACTS.complianceStance` "Annex IV pack available under NDA" (renders on /about + /press)
- `lib/architecture.ts:695` — Layer 15 benchmark "Pack available under NDA — Ahead of 2027-08-02 deadline"
- `content/blog/client-isolation-as-a-database-primitive.mdx:76-78` — "Every SOC 2 auditor, every ISO 27001 assessor, every HIPAA risk assessment we have walked through..."

**Verification gate**:
- `grep -rn 'SOC 2\|ISO 27001\|HIPAA\|FERPA\|Annex IV\|BAA available\|available under NDA' content/ lib/` returns only claims consistent with `/compliance` body §§02-06 language ("in progress" / "in preparation" / "not yet held").
- Playwright test asserts `/compliance` hero + `/compliance` §01 language agrees with §§02-06.

**Rollback**: single revert of Phase 1 PR restores prior state. Language change is data-shape-safe.

**Cost/Runway**: 1 session, single author. Revenue-adjacency high — legal exposure removed. Opportunity-cost lowest — this is not shipping new capability but retracting overclaim.

### Phase 2 · Session-ready fixes bundle [10 items, 1 session, parallel with P1]

**Goal**: Close 10 &lt; 1-hr fixes surfaced by the audit that don't need multi-session planning.

**Scope**:
1. `components/sections/HomeBands.tsx:111` — fix broken `aria-controls` (render tabpanel `id={band-N-panel}` OR drop attribute + switch to `role="button"` toggle)
2. `components/ui/ArchitectureGraph.tsx` — add `useReducedMotion()` gate around parallax-tilt springs
3. `scripts/check-vocab.sh` — extend `FORBIDDEN_PATTERNS` with `\bcompany[- ]brain\b`, `\boperating system\b`, `\bfifteen (governance )?layers\b`, `\b(per-)?department(s|-first)?\b`, `\bper-domain brain\b` (whitelist blog corpus preserved)
4. `content/pages.ts:15-17` — update JSDoc canonical-vocab header to run-layer north star
5. `package.json` — add `"packageManager": "pnpm@10.33.2"`; delete `package-lock.json`
6. `app/layout.tsx` — de-duplicate `Space_Grotesk` load (share font object across `--font-serif` and `--font-sans` variables)
7. `app/layout.tsx` — emit `organizationJsonLd()` from `lib/seo.ts` as `<script type="application/ld+json">`
8. Delete or reconcile root `lighthouserc.json` (keep only `.lighthouserc.json`)
9. `app/not-found.tsx` — site-chrome branded 404 fallback
10. `app/globals.css` — fix 3 undefined-var references: replace `var(--accent)` at lines 1477/1478/1590/1805/1920 with `var(--gold)` (same hex); declare `--paper-3` OR replace `.btn-light:hover` reference at line 1497; replace `var(--dur-default)` at lines 1707/1827 with `var(--dur-med)`

**Verification gate**:
- `pnpm run test:a11y` shows `HomeBands` aria-controls violation resolved
- `pnpm run check:vocab` blocks a fixture line containing "company brain" (added test)
- `pnpm build` succeeds; `pnpm run test:lh` produces one clean run
- `grep '\-\-accent\|\-\-paper-3\|\-\-dur-default' app/globals.css` returns only declarations, no unresolved references

**Rollback**: each item is an independent commit. Any single item revertable without cascade.

**Cost/Runway**: 1 session, ~4 hours cumulative. Zero external dependencies.

### Phase 3 · Ship `/design` page + tokens.json convergence [closes Dims 3+9+11 halves]

**Goal**: Build `app/design/page.tsx` that imports `design/tokens.json` at build time and renders every declared color / type / motion / layout / signature-device token. tokens.json becomes the live SSoT it was declared to be.

**Depends on**: D1 resolved (which direction to converge) + D2 resolved (which brand package supplies the tokens).

**Scope**:
- `app/design/page.tsx` — new route rendering from `design/tokens.json`
- `content/pages.ts` — add `/design` to `PAGES` OR add to `nav.ts` primary or Trust column
- Reconcile drift in `app/globals.css` `:root` block per D1 direction (either revert to tokens.json values OR amend tokens.json to match globals.css)
- Address self-referential font-var pattern at globals.css:92-94 (`--font-serif: var(--font-serif), ...` is a recursion cycle)
- Declare 4 missing signature-device CSS classes: `.plus-marker`, `.cut-corner`, `.section-numeral` + `.n`, `.italic-gold-em`
- Build `<PlusMark>` primitive component in `components/ui/PlusMark.tsx` (declared in tokens.json but no component exists)
- Delete or wire `.section-mono` (declared but never used)

**Verification gate**:
- `curl -s https://nebbos.ai/design` returns 200 with every token rendered as a visible swatch/example
- `grep -rn 'plus-marker\|cut-corner\|section-numeral\|italic-gold-em' components/` returns matches, and each className resolves to a CSS rule
- No undefined-var references anywhere in globals.css

**Rollback**: revert PR — `/design` route disappears; token classes go back to broken state (pre-Phase 3).

**Cost/Runway**: 2-3 sessions (Phase 3 is the pivot from paper doctrine to live substrate).

### Phase 4 · Vocab-guard extension + voice-drift sweep across 15 files

**Goal**: Every customer-facing surface reads on the 2026-09-11 run-layer north star. Prior "company brain" / "operating system" / "fifteen layers" / "department" framing retired.

**Depends on**: Phase 2 item 3 landed (vocab-guard patterns extended).

**Scope** (per `audit-content-voice-truth-2026-09-14.md`):
1. `content/pages.ts` — home + about + solutions/* + trust + security + compliance rewrites (17+ HIGH hits)
2. `content/facts.ts` — `category`, `productLine[0]`, `productLine[1]` rewrites
3. `lib/architecture.ts` — 36 department hits + 8 OS/brain/fifteen-layers hits. **Biggest single migration debt** because it renders on every `/product/*` page.
4. `lib/nav.ts:144` — Product strap "Fifteen layers. Five bands. One system."
5. `app/blog/page.tsx:10, 60-62` — metadata + visible deck
6. `app/platform/architecture/page.tsx:41`, `app/platform/dashboard/page.tsx:54-55`, `app/platform/how-it-works/page.tsx:38-39` — department scoping noun
7. `app/product/page.tsx:32-34, 44` — metadata title + H1 "Fifteen layers. Five bands. One architecture."
8. `app/product/[band]/[layer]/page.tsx:354` — "per-department Pearls"
9-15. Five blog posts: `the-company-brain.mdx` (title + premise), `the-fifteen-layers-in-fifteen-minutes.mdx` (title + premise), `approval-is-the-moat.mdx:93`, `governance-must-be-architectural.mdx:101`, `naming-a-pearl-for-a-department.mdx` (title + `The company-brain framing` section)

**Verification gate**:
- `pnpm run check:vocab` returns zero hits on the extended pattern set (customer surfaces only; blog whitelist preserved for negative-framing posts)
- Playwright a11y sweep succeeds against all rewritten pages

**Rollback**: per-file commit series; each file revertable independently.

**Cost/Runway**: 3-5 sessions (largest single content-migration wave; `lib/architecture.ts` alone is significant).

### Phase 5 · Web-vitals + branded error/not-found + `/how` meta-demo [closes Dim 10]

**Goal**: Nebbos self-observes its own runtime and publishes what it sees.

**Scope**:
- Install `web-vitals` npm package
- `app/layout.tsx` — mount `useReportWebVitals` client component → POST to `/api/vitals` beacon (Next Route Handler at `app/api/vitals/route.ts`)
- Sink: TBD (Vercel Web Vitals? Custom endpoint? Doppler-secured to a real database?) — founder-scope decision
- `app/error.tsx` + `app/global-error.tsx` — branded fallbacks with error-log POST to `/api/errors`
- `app/how/page.tsx` — the meta-demo. Ingests `process.env.RAILWAY_GIT_COMMIT_SHA` at build time + Web Vitals p75 (from the sink) + last-N commits from a build-time GitHub API fetch. Retires the static hand-written `/changelog` OR wires `/changelog` to `content/changelog/*.mdx` (currently orphan)

**Verification gate**:
- `curl https://nebbos.ai/api/vitals -d '{"metric":"LCP","value":1234}'` returns 200
- `curl https://nebbos.ai/how` renders live deploy commit SHA + LCP p75 from the last 24h
- Manually trigger error → `app/error.tsx` renders + POST hits `/api/errors`

**Rollback**: per-artifact commit series. The vitals endpoint can be a no-op sink in a rollback state without breaking pages.

**Cost/Runway**: 2-3 sessions. Sink decision (self-hosted vs Vercel Analytics vs other) may add 1 session.

### Phase 6 · Two-design-system architectural resolution [closes Dim 9]

**Goal**: One design system per surface class per FEES ADR-PROV v1.2, cleanly published.

**Depends on**: D2 resolved.

**Scope** (per D2 recommendation C — clearest boundary):
- Split `@nebbos/brand` into `@nebbos/brand-marketing` (delta-brief) and `@nebbos/brand-platform` (Folio)
- nebbos-site consumes `@nebbos/brand-marketing`
- Platform surfaces (nebos-frontend, nebos-projects, nebos-mail, nebos-tickets) consume `@nebbos/brand-platform`
- Retire the local `lib/brand/tokens.ts` re-export shim from nebbos-site
- Update Charter doctrine 3 + doctrine 4 with amendment note recording the split

**Verification gate**:
- `grep 'from "@nebbos/brand"' /Users/matic/code/nebbos-site` returns 0 hits (must import from `@nebbos/brand-marketing`)
- `grep 'from "@nebbos/brand-platform"' /Users/matic/code/nebbos-site` returns 0 hits (marketing must not import platform tokens)
- CI grep-check per FEES v1.2 AD-1 row 1a passes

**Rollback**: revert brand package split; restore local shim.

**Cost/Runway**: 3-4 sessions (spans multiple repos — @nebbos/brand + nebbos-site + Charter amendment).

### Phase 7 · Type-system upgrade [closes Dim 3]

**Goal**: Palette on `oklch()`; dark mode via `light-dark()`; state via `color-mix()`; JSON registry as live SoT.

**Depends on**: Phase 3 landed (design/tokens.json is the SSoT; drift zeroed).

**Scope**:
- Convert every hex color in `design/tokens.json` to `oklch()` triples
- Convert every `--color-*` in `app/globals.css` to `light-dark(<light>, <dark>)` — activates the reserved `--gold-2 /* dark-mode primary */` token
- Convert hover / focus / disabled state colors to `color-mix()` derivations from base tokens
- Add `[data-theme=dark]` selector + user-preference toggle in header

**Verification gate**:
- `grep -E '#[0-9a-fA-F]{6}' app/globals.css` returns only inside comments (no raw hex in rules)
- `grep 'oklch(' app/globals.css` returns matches for every color token
- Dark mode toggle in `/design` page flips both light and dark palettes end-to-end

**Rollback**: revert token migration; restore hex declarations from Phase 3 state.

**Cost/Runway**: 2 sessions.

### Phase 8 · Motion + polish upgrade [closes Dim 4 + 12]

**Goal**: Same-taxonomy route pairs morph via View Transitions; speculation rules pre-render hover targets; scroll-driven animations extend past `CanonicalSection`.

**Scope**:
- Add `view-transition-name` to persistent elements across same-taxonomy pairs: `/customers ↔ /customers/[slug]`, `/product/[band] ↔ /product/[band]/[layer]`, `/blog ↔ /blog/[slug]`, mega-menu → band page
- Ship `<script type="speculationrules">` in `app/layout.tsx` with `prerender` for top-6 hub routes (`/product`, `/customers`, `/blog`, `/platform/*`)
- Register animatable custom properties with `@property` (start with `--graph-i`)
- Adopt `@starting-style` for menu / drawer / mega-menu open animations
- Extend `animation-timeline: view()` to numbered lists, split-frames, editorial-list items, CTA bands (plumbing already works)

**Verification gate**:
- DevTools "View transitions" panel shows named morphs firing on same-taxonomy nav
- Chrome DevTools "Speculative loads" shows prerender hits on hover for top-6 routes
- `grep 'animation-timeline: view()' app/globals.css components/` returns ≥5 sites

**Rollback**: per-primitive commit series; each is CSS-additive.

**Cost/Runway**: 2 sessions.

### Phase 9 · SectionBase discriminated union + real MDX [closes Dim 8]

**Goal**: Section-kind authoring is type-safe; blog + careers use real MDX with custom components.

**Scope**:
- Convert `SectionBase` in `content/pages.ts` to discriminated union — `list-numbered` requires `items[]`; `hero-full-bleed` requires image; `case-study` requires body; etc.
- Swap `app/blog/[slug]/page.tsx` + `app/careers/[slug]/page.tsx` from `marked` + `dangerouslySetInnerHTML` to `next-mdx-remote` (or Next 15 MDX file-route)
- Register real components in `mdx-components.tsx`: `<Pull>`, `<ArchInsert>`, `<GoldEm>`, `<CutCornerCallout>`
- Add zod frontmatter schemas for blog + careers
- Sanitize the remaining `dangerouslySetInnerHTML` sites in `PageRenderer` — either introduce `rehype-sanitize` at build time OR a typed inline-markup DSL (`{ text, em?: [start,end][] }`)
- Retire dead SectionKinds (`split-columns`, `case-study`, `empty-state` never used) OR add content that consumes them
- Wire `PageRenderer.TableRows` to read from `s.items` instead of hard-coding `FACTS` rows
- Wire `PageRenderer.InboxRouter` to read from `s.items` instead of hard-coding `CONTACT` inboxes

**Verification gate**:
- `tsc --noEmit` catches a fixture where `list-numbered` is authored without `items[]`
- Blog post that uses `<Pull>` renders correctly
- `grep 'dangerouslySetInnerHTML' components/` returns 0 hits OR only sanitizer-piped sites

**Rollback**: per-file series. Type-safe registry can revert to loose without runtime break.

**Cost/Runway**: 3 sessions.

### Phase 10 · OG image pipeline [closes Dim 7 half]

**Goal**: Every route ships a per-page dynamic OG image using brand tokens.

**Scope**:
- Build `app/og/route.tsx` edge route with `next/og` + `loadGoogleFont` (helper already exists in `lib/seo/loadGoogleFont.ts:4-11`)
- Wire `lib/seo/constructMetadata.ts` (defined but never imported) into every page metadata export
- Add per-route `opengraph-image.tsx` for `/`, `/product`, `/product/[band]`, `/product/[band]/[layer]`, `/blog/[slug]`, `/customers`, `/trust`, `/security`, `/compliance`, top 3 solutions
- Emit `twitter.images` per page matching openGraph
- `app/layout.tsx` — set fallback `openGraph.images` + `twitter.images`

**Verification gate**:
- `curl -sI https://nebbos.ai/og?title=X | grep 200` returns 200
- `curl -s https://nebbos.ai/product/action | grep 'og:image'` returns the correct per-page URL
- Twitter card preview renders correctly

**Rollback**: per-route commit series.

**Cost/Runway**: 2 sessions.

### Phase 11 · Asset pipeline · AVIF+WebP + `<picture>` + video reduced-motion [closes Dim 7 rest + Dim 5 asset part]

**Goal**: 99 vision-board PNGs pre-generated as AVIF + WebP; `<picture>` with explicit source fallbacks; video autoplay gated on reduced-motion.

**Scope**:
- `scripts/optimize-vision-board.mjs` — sharp-based pre-generation of `.avif` + `.webp` siblings for every `.png` under `public/vision-board/`
- `components/ui/SceneStill.tsx` — swap `next/image` for `<picture>` emitting explicit `<source type="image/avif">` + `<source type="image/webp">` + `<img>` fallback
- Delete or use `public/vision-board/hero.webm` + `hero.mp4` orphans
- Wire `<FullBleedVideo>` into `HomeHero` OR retire the primitive. Gate autoplay on `useReducedMotion()` — swap to `<SceneStill>` poster when reduced-motion active
- Register `family-*` and `v2-*/v3-*` images in `content/stills.ts` OR delete unreferenced ones
- Add `poster` attribute + reduced-motion swap to any video that ships

**Verification gate**:
- `find public/vision-board -name '*.avif' | wc -l` matches PNG count
- Page load with DevTools "Save-Data: on" pulls AVIF variants
- Reduced-motion simulator shows poster image instead of autoplay

**Rollback**: per-artifact revert. AVIF/WebP files can be deleted independently.

**Cost/Runway**: 2 sessions + build-time cost impact.

### Phase 12 · Framework + packageManager reconciliation [closes Dim 1]

**Goal**: Version pins agree with FEES ADR-PROV v1.2 row 6 OR an in-repo exception cites ADR-394.

**Depends on**: D2-adjacent — package manager decision.

**Scope**:
- Decide: upgrade `next` from 15.5.21 to 16.2.11 (FEES stable target) OR cite ADR-394 preview-track exception in AGENTS.md
- Add ADR-394 exception header to nebbos-site `AGENTS.md` if keeping 15.5.21
- Migrate `.eslintrc.json` legacy to ESLint 9 flat-config (`eslint.config.mjs`)
- Wire `next lint` (or dedicated `eslint .`) into a required GitHub Actions step (currently only implicit via `next build`)
- Add `eslint-plugin-unicorn` with `unicorn/filename-case: [error, {case: kebabCase}]` scoped to `app/**/*`
- Fill in `mdx-components.tsx` prose mapping OR update the stale comment claim
- Reconcile the mdx-components identity spread vs the file comment claiming a `.prose` mapping

**Verification gate**:
- `pnpm ls next` returns the ratified version
- Fixture PR authoring `PascalCase.tsx` in `app/` triggers unicorn lint failure
- `grep 'next@\|"next":' package.json pnpm-lock.yaml` cross-checks agree

**Rollback**: version revert restores prior lockfile.

**Cost/Runway**: 1-2 sessions.

### Phase 13 · Content pipeline unification + CSS dead-code cleanup + sitemap/robots [closes remaining Dim 2 + 8 + 11 + 12]

**Goal**: One content pipeline documented; dead CSS/kinds removed; SEO infra shipped.

**Scope**:
- Decide: fold home-page bespoke sections (`components/sections/*.tsx`) behind additional `SectionKind` entries in `PageRenderer` OR document home as first-class bespoke composition
- Delete dead CSS families (`.case-study*` ~76 lines, `.split` ~10 lines) OR write content that consumes them
- Retire dead section-kinds from `SectionKind` union (`split-columns`, `case-study`, `empty-state`) OR wire content
- Delete or wire `PAGES.home`, `PAGES.product`, `PAGES.demo.hero` (dead content in registry)
- Delete or wire `content/changelog/2026-06-*.mdx` (orphan MDX)
- Ship `app/sitemap.ts` reading routes from `nav.ts` + `PAGES`
- Ship `app/robots.ts`
- Populate 7 empty-shell legal pages OR mark them "coming soon"
- Give `/solutions` its vertical-cards grid (currently a hero-only shell)
- Explicit `export const dynamic = "force-static"` at each route root — declarative intent matching runtime behavior
- Introduce at least one `<Suspense>` boundary OR retire Charter dim 2 "streaming SSR" phrase for marketing register
- `content/README.md` — remove references to non-existent `pricing.ts` + `proof-points.ts` OR create them
- Resolve orphan-route decision per D5 — wire `/platform/*` into nav OR retire

**Verification gate**:
- `curl https://nebbos.ai/sitemap.xml` returns 200 with every route listed
- `grep -l 'case-study\|split-columns\|empty-state' components/ content/` returns 0 (or matches consumers)
- `find app -name 'not-found.tsx'` covers site chrome
- `/solutions` renders more than a hero

**Rollback**: per-item series.

**Cost/Runway**: 2 sessions.

## Verification (site-wide, post-Phase-13)

- Every dim in the 12-dim scorecard moves to at-elite state, grep-verified.
- `pnpm run check:vocab` blocks all retired vocab; whitelist scoped to negative-framing blog posts only.
- `pnpm run test:a11y` returns 0 violations across all 47 concrete URLs.
- `pnpm run test:lh` all four categories ≥ 0.95; LCP < 1s; INP < 100ms; CLS = 0.
- `curl https://nebbos.ai/design` renders every token from `tokens.json` end-to-end.
- `curl https://nebbos.ai/how` renders live deploy metadata + Web Vitals p75.
- `curl https://nebbos.ai/sitemap.xml` lists every route.
- `pnpm audit` clean; `pnpm ls next` matches ratified pin.
- Both CI checks (a11y + lighthouse) removed `|| true` and land as required.

## Rollback (site-wide)

Every phase is a revertable PR. The dependency graph is:
- Phases 1 + 2 are independent, land in parallel
- Phase 3 (design page) depends on D1 + D2 resolved
- Phase 4 depends on Phase 2 item 3 (vocab-guard patterns)
- Phase 5 is independent
- Phase 6 depends on D2 resolved
- Phase 7 depends on Phase 3
- Phases 8-13 are largely independent, order flexible

Full site rollback = revert Phases 13 → 1 in reverse.

## Cost/Runway (per Cost/Runway continuous discipline)

- **eng-days**: 20-30 total across 13 phases (spread across ~5-8 sessions)
- **token-$**: mid-high (many parallel Explore agents in audit + spec + wave retros)
- **revenue-adjacency**: HIGH — nebbos.ai IS the buyer's first read. Phase 1 removes legal exposure; Phase 3 (/design) becomes the credibility artifact.
- **opportunity-cost**: none higher on the current queue after MCP surface-parity (`intake-nebbos-mcp-team-wide-surface-parity-2026-09-14.md`) — that intake ships independently.
- **won't-ship-if**: founder scopes smaller OR resolves D1/D2 in a way that invalidates Phases 3/6/7.

## Alternatives rejected

- **Big-bang refactor** — REJECTED. Blast radius unbounded across 47 routes + content + design system; violates Article XIV Standard 3 wave discipline.
- **Content-only pass** — REJECTED. Founder explicitly chose "full 12-dim elite-bar close-out" via AskUserQuestion 2026-09-14; content-only would leave 8 dims at gap indefinitely.
- **Audit-only, no edits this session** — REJECTED. Founder explicitly chose "dispatch now" and full-scope close-out.
- **Retire the entire delta-brief editorial system** — REJECTED without D2 founder-scope resolution. Would be a doctrine-level retirement, not a spec-level decision.

## Related resources

- Nebbos Design Charter — `~/.claude/skills/nebbos-design-charter/SKILL.md`
- FEES ADR-PROV v1.2 — `~/code/nebos-governance/docs/decisions/drafts/2026-08-22_ADR-PROV-nebbos-front-end-estate-substrate.md`
- Delta-brief editorial skill — `~/.claude/skills/delta-brief-editorial/SKILL.md`
- All 9 audit reports — `/private/tmp/claude-501/-Users-matic/761a904f-5b16-4310-a8cf-12b8a82d7934/scratchpad/audit-*-2026-09-14.md`
- KG-routed ADRs (read before Phase 6): ADR-240-folio-canonical-design-system, ADR-240-amendment-1-nebbos-design-system-v1, ADR-PROV-nebbos-platform-design-system-architecture, ADR-278-nebbos-marketing-site-architecture, ADR-394-nextjs-prerelease-pin
- Prior intake corpus — `intake-nebbos-mcp-team-wide-surface-parity-2026-09-14.md` (adjacent scope, not overlapping)

## Amendment log

- v1.0 (2026-09-14) — DRAFT authored by Claude Opus 4.7 session 761a904f under founder-directed full 12-dim close-out. Pending founder review + D1-D5 resolution before Phase 1 kicks.
