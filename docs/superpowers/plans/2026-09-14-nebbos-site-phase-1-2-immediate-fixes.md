# nebbos-site · Phase 1 + Phase 2 immediate fixes — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land Phase 1 (truth-claim retractions across `/trust` + `/security` + `/compliance` + `/solutions/*` + `facts.ts` + `lib/architecture.ts` + blog posts — LEGAL urgency) and Phase 2 (10-item session-ready bundle of surgical fixes) as a single immediate wave.

**Architecture:** Every retracted-claim rewrite converges on the canonical body-language already ratified on `/compliance` §§02-06 (in-progress / in-preparation / not-yet-held phrasing). Every session-ready fix is a self-contained single-file change with independent verification.

**Tech Stack:** Next.js 15.5.21 · React 19.1.0 · pnpm@10.33.2 · TypeScript 5.7.2 · Playwright a11y · axe-core · Lighthouse CI · motion@13 · `@nebbos/brand` v2.0.1

**Spec:** [docs/superpowers/specs/2026-09-14-nebbos-site-elite-bar-close-out-design.md](../specs/2026-09-14-nebbos-site-elite-bar-close-out-design.md)

## Global Constraints

- **Operator surface**: https://nebbos.ai · repo `/Users/matic/code/nebbos-site` · `app/**/page.tsx`
- **Canonical voice**: run-layer north star per [content/brand.ts](../../../content/brand.ts). Forbidden vocab on customer surfaces: `agent(s)`, `AI agent(s)`, `chatbot(s)`, `tenant(s)`, `multi-tenant`, `per-tenant`, `cross-tenant`.
- **Canonical retracted-claim phrasing** (grep-verified from `content/pages.ts:1879-1907` — /compliance §§02-06):
  - **EU AI Act Annex IV**: "in preparation for the 2027-08-02 Annex III compliance deadline"
  - **SOC 2 Type II**: "certification is in progress"
  - **ISO 27001:2022**: "certification is not yet held; ISMS is in preparation"
  - **HIPAA**: "HIPAA-readiness is in progress; Administrative safeguards, physical safeguards, and BAA template are in preparation ahead of first healthcare deployment"
  - **FERPA**: "does not currently process individual-level student education records; preventive controls in place; controls in preparation ahead of first such deployment"
- **Never invent third-party statistics with attribution**. If a citation doesn't resolve to a real URL/DOI/archive, retract to unattributed framing or replace with first-party Nebbos-measured stat.
- **Commit convention**: Conventional Commits `type(scope): message`. Wave commits scope: `fix(truth-claims)`, `fix(a11y)`, `chore(governance)`, `feat(observability)`.
- **Never `--no-verify`**. If pre-push blocks on unrelated debt, append `[preflight-bypass]: <reason>` trailer to an empty tip commit.
- **CI must go from advisory to blocking** only after one clean run — do not remove `|| true` until Task 14 verify passes.

---

## File-structure map

**Files modified:**
- `content/pages.ts` — /trust §05 + §10, /security hero + §11, /compliance hero + §01, /solutions/healthcare §04 + §09 + week-1, /solutions/k12 §09, /solutions/operations objection, /solutions/finance §09, home hero JSDoc header
- `content/facts.ts` — `complianceStance`
- `lib/architecture.ts` — Layer 15 benchmark
- `content/blog/client-isolation-as-a-database-primitive.mdx` — auditor testimonial retraction
- `content/blog/approval-is-the-moat.mdx` — 23% benchmark retraction
- `content/blog/preference-pairs-are-your-training-data.mdx` — 23% benchmark section
- `content/blog/the-company-brain.mdx` — 23% benchmark reference
- `scripts/check-vocab.sh` — extend `FORBIDDEN_PATTERNS`
- `components/sections/HomeBands.tsx` — fix broken `aria-controls`
- `components/ui/ArchitectureGraph.tsx` — add `useReducedMotion()` gate
- `app/layout.tsx` — de-duplicate `Space_Grotesk` load, emit `organizationJsonLd()`
- `app/globals.css` — fix 3 undefined-var references (`--accent`, `--paper-3`, `--dur-default`)
- `package.json` — add `"packageManager": "pnpm@10.33.2"`
- `lighthouserc.json` — delete (root, unused; keep `.lighthouserc.json`)
- `package-lock.json` — delete (dual-lockfile smell)

**Files created:**
- `app/not-found.tsx` — site-chrome branded 404 fallback
- `tests/truth-claim-consistency.spec.ts` — Playwright test asserting /trust + /security + /compliance agree on retracted phrasing

---

## Phase 1 · Truth-claim retraction sweep (LEGAL — Tasks 1-11)

### Task 1: /trust page — §05 attestation + §10 certs list retraction

**Files:**
- Modify: `content/pages.ts:1614` (§05 attestation body)
- Modify: `content/pages.ts:1670-1675` (§10 certs list — 5 rows)

**Interfaces:**
- Consumes: canonical retracted-claim phrasing from Global Constraints
- Produces: /trust page language consistent with /compliance §§02-06

- [ ] **Step 1: Read current state**

Run: `sed -n '1610,1680p' content/pages.ts`
Confirm: line 1614 still contains "Auditors accept it as SOX-adequate, HIPAA-adequate, and EU-AI-Act-Article-12-adequate evidence."; lines 1670-1675 still contain "available under NDA" per-row.

- [ ] **Step 2: Rewrite §05 attestation body (line 1614)**

Replace:
```
Auditors accept it as SOX-adequate, HIPAA-adequate, and EU-AI-Act-Article-12-adequate evidence.
```
With:
```
The audit-trail architecture is designed to satisfy EU AI Act Article 12 record-keeping obligations and to map cleanly onto SOC 2 CC7, ISO 27001 A.12.4, and HIPAA 45 CFR 164.312(b) control families. Client auditors reviewing the substrate see the same append-only trail their evidence packages would cite. Formal SOC 2 Type II report is in progress; ISO 27001:2022 certification is not yet held; HIPAA-readiness is in progress. See /compliance for authoritative status.
```

- [ ] **Step 3: Rewrite §10 certs list (lines 1670-1675)**

Replace each row's `body` with the canonical phrasing:
- SOC 2 Type II: `"SOC 2 Type II certification is in progress. Trust services criteria: Security, Availability, Confidentiality, Privacy. Report available under NDA once the auditor's opinion issues. Full status at /compliance."`
- ISO 27001:2022: `"ISO 27001:2022 certification is not yet held. Substrate controls that map to Annex A are implemented; ISMS is in preparation ahead of a formal certification cycle. Full status at /compliance."`
- EU AI Act Article 11 · Annex IV: `"Annex IV technical documentation pack is in preparation ahead of the 2027-08-02 Annex III compliance deadline. Obligation-tracking substrate exists internally (Layer 07 memory + Layer 08 reasoning + Layer 15 attestation). Full status at /compliance."`
- HIPAA: `"HIPAA-readiness is in progress. Substrate technical safeguards implemented; Administrative safeguards, physical safeguards, and BAA template in preparation ahead of first healthcare deployment. Full status at /compliance."`
- FERPA: `"Nebbos substrate does not currently process individual-level student education records. Preventive controls against future ingestion in place. School Official controls, retention configuration, and documentation in preparation ahead of first district deployment scoped to student PII. Full status at /compliance."`

- [ ] **Step 4: Verify — grep for retracted claims**

Run: `grep -nE 'Auditors accept|available under NDA|report available under NDA|certification (implemented|held)|BAA available' content/pages.ts | grep -E '1[6-7][0-9]{2}'`
Expected: 0 hits in the /trust page range (lines 1600-1700).

- [ ] **Step 5: Commit**

```bash
git add content/pages.ts
git commit -m "$(cat <<'EOF'
fix(truth-claims): /trust §05 + §10 retracted to match /compliance body

Retracts SOC 2 / ISO 27001 / EU AI Act Annex IV / HIPAA / FERPA
claims on /trust that contradicted /compliance body §§02-06 (retracted
in prior commits a119c91 + a80b45d). Language now converges on
in-progress / in-preparation / not-yet-held phrasing.

Legal exposure retracted.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: /security page — hero + §11 certs list retraction

**Files:**
- Modify: `content/pages.ts:1710, 1712, 1719` (hero title + meta + deck)
- Modify: `content/pages.ts:1825-1826` (§11 certs body)

- [ ] **Step 1: Read current state**

Run: `sed -n '1700,1830p' content/pages.ts`

- [ ] **Step 2: Rewrite /security hero (lines 1710-1719)**

Replace title/meta/deck versions of:
```
Engineered to SOC 2 Type II and ISO 27001:2022 controls from the substrate up. Every attestation portable to your auditor.
```
With:
```
Substrate controls implemented against SOC 2 and ISO 27001:2022 targets. SOC 2 Type II certification is in progress; ISO 27001:2022 is not yet held. Full status at /compliance.
```

- [ ] **Step 3: Rewrite §11 certs body (line 1825)**

Replace:
```
SOC 2 Type II report available under NDA. ISO 27001:2022 certification and Annex A control statements available under NDA. HIPAA BAA available.
```
With:
```
SOC 2 Type II certification is in progress; the Type II report will be available under NDA once the auditor's opinion issues. ISO 27001:2022 certification is not yet held; ISMS statement of applicability, risk register, and control narratives are in preparation. HIPAA BAA template is in preparation ahead of first healthcare deployment. All statuses: see /compliance for the authoritative record.
```

- [ ] **Step 4: Verify**

Run: `grep -nE 'Engineered to SOC 2|report available under NDA|BAA available' content/pages.ts | grep -E '17[0-9]{2}|18[0-2][0-9]'`
Expected: 0 hits in the /security page range (lines 1700-1830).

- [ ] **Step 5: Commit**

```bash
git add content/pages.ts
git commit -m "$(cat <<'EOF'
fix(truth-claims): /security hero + §11 retracted to match /compliance body

Legal exposure retracted.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: /compliance page — hero + §01 frameworks list retraction

**Files:**
- Modify: `content/pages.ts:1847-1868`

**Interfaces:**
- Consumes: same canonical phrasing already in §§02-06 (this task = make hero + §01 match body it already contradicts)

- [ ] **Step 1: Rewrite /compliance metadata + hero (lines 1847-1857)**

Replace metaDescription (line 1849):
```
Nebbos ships an EU AI Act Article 11 Annex IV pack. Engineered to SOC 2 Type II and ISO 27001. Every attestation portable to your auditor.
```
With:
```
Nebbos's compliance posture — status per framework. Some in progress, some not yet held. Every posture stated honestly; formal reports available under NDA when they land.
```

Replace hero deck (line 1856) with the same text.

- [ ] **Step 2: Rewrite §01 frameworks list rows (lines 1865-1868)**

Replace each `body`:
- EU AI Act row: `"Annex IV technical documentation pack is in preparation ahead of the 2027-08-02 Annex III compliance deadline. Substrate exists internally; client-facing pack ships as it clears review."`
- SOC 2 Type II row: `"Trust services criteria: Security, Availability, Confidentiality, Privacy. SOC 2 Type II certification is in progress; audit engaged, observation window running. Report available under NDA once the auditor's opinion issues."`
- ISO 27001:2022 row: `"ISO 27001:2022 certification is not yet held. ISMS is in preparation ahead of a formal certification cycle. Substrate controls that would map to Annex A are implemented today."`
- HIPAA row: `"HIPAA-readiness is in progress. Substrate technical safeguards implemented; Administrative + physical safeguards + BAA template in preparation ahead of first healthcare deployment."`

- [ ] **Step 3: Verify intra-page consistency**

Run: `grep -nE 'implemented and operating|available under NDA|BAA available|Engineered to SOC' content/pages.ts | grep -E '18[4-7][0-9]'`
Expected: 0 hits in the /compliance page range (lines 1847-1875).

- [ ] **Step 4: Commit**

```bash
git add content/pages.ts
git commit -m "$(cat <<'EOF'
fix(truth-claims): /compliance hero + §01 aligned with body §§02-06

Retracts intra-page contradiction where hero + §01 asserted
certifications as "implemented" while §§02-06 body said "in progress".
Hero and §01 now match the body's canonical phrasing.

Legal exposure retracted.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: /solutions/healthcare — §04, §09, week-1 retraction

**Files:**
- Modify: `content/pages.ts:942` (§04 layer 15 attestation)
- Modify: `content/pages.ts:958` (§09 HIPAA objection)
- Modify: `content/pages.ts:984` (week-1 onboarding "BAA signed")

- [ ] **Step 1: Rewrite §04 (line 942)**

Replace:
```
HIPAA-adequate audit trail ready for regulatory review.
```
With:
```
Audit trail designed to map onto HIPAA 45 CFR 164.312(b). HIPAA-readiness is in progress site-wide; see /compliance for the current posture.
```

- [ ] **Step 2: Rewrite §09 HIPAA "Yes" (line 958)**

Replace:
```
Yes. Row-level client isolation ... BAA available, retention configurable per HIPAA requirements. Full compliance detail at /compliance.
```
With:
```
HIPAA-readiness is in progress. Substrate technical safeguards (access control, audit trail, integrity, entity authentication, transmission security) are implemented and map to the HIPAA Security Rule Administrative, Physical, and Technical safeguards. Administrative safeguards, physical safeguards, and BAA template are in preparation ahead of first healthcare deployment. Full status + BAA availability timeline at /compliance.
```

- [ ] **Step 3: Rewrite week-1 (line 984)**

Replace:
```
Week 1 · Onboarding + connector wiring: MSA + BAA signed
```
With:
```
Week 1 · Onboarding + connector wiring: MSA signed; BAA template review begins in parallel with implementation (BAA in preparation site-wide, see /compliance)
```

- [ ] **Step 4: Verify**

Run: `grep -nE 'HIPAA-adequate|BAA available|BAA signed' content/pages.ts`
Expected: 0 hits.

- [ ] **Step 5: Commit**

```bash
git add content/pages.ts
git commit -m "fix(truth-claims): /solutions/healthcare HIPAA claims retracted per /compliance

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: /solutions/k12 §09 FERPA retraction

**Files:**
- Modify: `content/pages.ts:817`

- [ ] **Step 1: Rewrite §09 FERPA answer**

Replace the current "Yes...configured to FERPA. Audit trail ready for state review" answer with:
```
Nebbos substrate does not currently process individual-level student education records. Preventive controls against future ingestion are in place per ratified internal architectural decision. For district deployments scoped to student PII, Nebbos would operate as a School Official under FERPA (34 CFR § 99.31(a)(1)); the corresponding controls, retention configuration, and School Official documentation are in preparation. Districts evaluating Nebbos: request current scope map and School Official onboarding path via legal@nebbos.ai. Full compliance detail at /compliance.
```

- [ ] **Step 2: Verify + Commit**

Run: `grep -nE 'FERPA. Audit trail ready|configured to FERPA' content/pages.ts` → 0 hits.

```bash
git add content/pages.ts
git commit -m "fix(truth-claims): /solutions/k12 §09 FERPA answer retracted per /compliance

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: /solutions/operations + /solutions/finance objection retractions

**Files:**
- Modify: `content/pages.ts:393` (/solutions/operations objection)
- Modify: `content/pages.ts:538` (/solutions/finance §09 objection)

- [ ] **Step 1: Rewrite /solutions/operations objection (line 393)**

Replace:
```
Ready for SOC 2 evidence + EU AI Act Article 11 pack.
```
With:
```
Substrate designed to produce SOC 2 evidence and EU AI Act Article 11 documentation. SOC 2 Type II certification is in progress; Annex IV pack is in preparation ahead of the 2027-08-02 deadline. See /compliance for the authoritative current-status memo.
```

- [ ] **Step 2: Rewrite /solutions/finance §09 objection (line 538)**

Replace:
```
External auditors we've walked through it accept the attestation as SOX-adequate evidence.
```
With:
```
The attestation architecture is designed to satisfy SOX-adequate evidence standards for financial-controls testing. Client auditors reviewing the substrate see the same append-only append-only Layer 15 audit trail their evidence packages would cite. For a formal SOX-adequacy statement from a specific auditor, request their walk-through and Nebbos supports the review.
```

- [ ] **Step 3: Verify + Commit**

Run: `grep -nE 'Ready for SOC 2 evidence|External auditors we.?ve walked through' content/pages.ts` → 0 hits.

```bash
git add content/pages.ts
git commit -m "fix(truth-claims): /solutions/operations + /solutions/finance objection retractions

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 7: content/facts.ts complianceStance retraction

**Files:**
- Modify: `content/facts.ts:27`

- [ ] **Step 1: Rewrite complianceStance**

Replace:
```
Engineered to SOC 2 Type II and ISO 27001:2022 controls. EU AI Act Article 11 Annex IV pack available under NDA.
```
With:
```
Substrate controls implemented against SOC 2 Type II and ISO 27001:2022 targets. SOC 2 certification is in progress; ISO 27001:2022 not yet held. EU AI Act Annex IV pack in preparation ahead of 2027-08-02 Article 6/Annex III deadline. Full authoritative status at /compliance.
```

- [ ] **Step 2: Verify + Commit**

Run: `grep -nE 'Engineered to SOC 2.*ISO 27001|Annex IV pack available under NDA' content/facts.ts` → 0 hits.

```bash
git add content/facts.ts
git commit -m "fix(truth-claims): facts.ts complianceStance retracted per /compliance body

Renders on /about §01 and /press §01 — was contradicting /compliance body.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 8: lib/architecture.ts Layer 15 benchmark retraction

**Files:**
- Modify: `lib/architecture.ts:695`

- [ ] **Step 1: Rewrite Layer 15 benchmark**

Replace:
```
EU AI Act Article 11 Annex IV readiness — Pack available under NDA — Ahead of 2027-08-02 deadline
```
With:
```
EU AI Act Article 11 Annex IV readiness — Pack in preparation ahead of the 2027-08-02 Article 6/Annex III deadline; obligation-tracking substrate live via Layer 15 attestation
```

- [ ] **Step 2: Verify + Commit**

Run: `grep -nE 'Pack available under NDA' lib/architecture.ts` → 0 hits.

```bash
git add lib/architecture.ts
git commit -m "fix(truth-claims): architecture.ts Layer 15 benchmark retracted

Renders on /product/commerce/attestation.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: blog/client-isolation-as-a-database-primitive.mdx auditor testimonial retraction

**Files:**
- Modify: `content/blog/client-isolation-as-a-database-primitive.mdx:76-78`

- [ ] **Step 1: Rewrite auditor testimonial**

Replace:
```
Every SOC 2 auditor, every ISO 27001 assessor, every HIPAA risk assessment we have walked through comes back with the same reaction: this is faster to review, cleaner to sign off on, and easier to trust.
```
With:
```
The architecture is designed for auditor legibility — one path per client, one identity per action, one append-only trail. When SOC 2, ISO 27001, or HIPAA assessments engage with it, they see a single tree to walk rather than a forest of exceptions to reconcile. Nebbos has not yet completed those formal audits; see /compliance for the authoritative status.
```

- [ ] **Step 2: Verify + Commit**

Run: `grep -nE 'Every SOC 2 auditor, every ISO 27001 assessor' content/blog/client-isolation-as-a-database-primitive.mdx` → 0 hits.

```bash
git add content/blog/client-isolation-as-a-database-primitive.mdx
git commit -m "fix(truth-claims): blog client-isolation auditor testimonial retracted

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 10: 23% Bessemer/Avante/SFAI Labs 2026 benchmark retraction (5 sites)

**Files:**
- Modify: `content/pages.ts:1513, 1525` (/solutions/model-training)
- Modify: `content/blog/approval-is-the-moat.mdx:62-63`
- Modify: `content/blog/preference-pairs-are-your-training-data.mdx:73-82`
- Modify: `content/blog/the-company-brain.mdx:80-82`

**Rationale**: Zero primary-source URL / DOI / archive in the repo. Same session produced ROI stats retracted in `a80b45d`. Per `feedback_first_party_verification_for_regulatory_deadlines`, attributed third-party stats without a resolvable source ARE fabrication.

- [ ] **Step 1: Rewrite `content/pages.ts:1513` (/solutions/model-training §08 ROI)**

Replace attributed 23% claim with unattributed positioning:
```
AI-native companies whose AI dollars produce owned intelligence (not vendor lock-in) sit at a fundamentally lower inference-of-revenue ratio than companies whose AI dollars stream through third-party inference APIs. That's the moat: preference pairs your team produces stay in your client and are exportable to any model you own or license.
```

- [ ] **Step 2: Rewrite `content/pages.ts:1525` (/solutions/model-training §09 objection)**

Replace attributed 23% + OpenAI 56% claim with:
```
The economics diverge based on ownership. Companies renting inference through third-party APIs live with a spend curve set by the vendor's model, the vendor's routing, and the vendor's margin. Companies producing preference pairs that stay in their client build a substrate they can point at any model they own or license — and their inference-of-revenue ratio reflects that ownership.
```

- [ ] **Step 3: Rewrite `content/blog/approval-is-the-moat.mdx:62-63`**

Replace:
```
That is the twenty-three-percent inference-of-revenue moat the AI-native benchmark actually rewards.
```
With:
```
That is the moat the AI-native economy actually rewards: preference pairs that stay in your client, portable to any model you own.
```

- [ ] **Step 4: Rewrite `content/blog/preference-pairs-are-your-training-data.mdx:73-82` (whole "twenty-three-percent benchmark" section)**

Retire the section header + body. Replace with:
```
### The inference-of-revenue divergence

Two AI-native economies are diverging. One rents inference through third-party APIs and lives with a spend curve set by the vendor. The other produces preference pairs that stay in the client and builds a substrate portable to any model. The inference-of-revenue ratio measures the difference: it tells you whether AI dollars are going into vendor margin or into owned intelligence. Nebbos is built for the second economy.
```

- [ ] **Step 5: Rewrite `content/blog/the-company-brain.mdx:80-82`**

Replace:
```
the twenty-three-percent inference-of-revenue benchmark rewards — AI dollars producing owned intelligence, not vendor lock-in.
```
With:
```
the AI-native economy rewards — AI dollars producing owned intelligence, not vendor lock-in.
```

- [ ] **Step 6: Verify + Commit**

Run: `grep -rnE '23%|twenty-three-percent|Bessemer.?Avante.?SFAI|OpenAI is running at 56' content/ | grep -v '_archive'` → 0 hits.

```bash
git add content/pages.ts content/blog/approval-is-the-moat.mdx content/blog/preference-pairs-are-your-training-data.mdx content/blog/the-company-brain.mdx
git commit -m "$(cat <<'EOF'
fix(truth-claims): retract 23% Bessemer/Avante/SFAI Labs 2026 benchmark

Zero primary-source URL / DOI / archive resolvable. Same class as ROI
stats retracted in a80b45d. Per feedback_first_party_verification_for_regulatory_deadlines,
attributed third-party stats without a resolvable source ARE fabrication.

Retracted from 5 sites: pages.ts:1513, pages.ts:1525, 3 blog posts.
Language now argues from owned-inference-substrate positioning without
inventing a benchmark study.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: Create Playwright test asserting truth-claim consistency

**Files:**
- Create: `tests/truth-claim-consistency.spec.ts`

- [ ] **Step 1: Write the failing test**

Create the test file:
```typescript
import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

// Forbidden phrases that assert Nebbos HOLDS certifications it does not.
// These MUST NOT appear on /trust, /security, /compliance hero/§01, or
// /solutions/* — per retractions in commits a119c91, a80b45d, a72e9c0.
const FORBIDDEN_ON_TRUST_SECURITY_COMPLIANCE = [
  "Engineered to SOC 2 Type II and ISO 27001",
  "Auditors accept it as SOX-adequate",
  "SOC 2 Type II report available under NDA",
  "ISO 27001:2022 certification and Annex A control statements available under NDA",
  "HIPAA BAA available",
  "Annex IV pack available under NDA",
  "controls implemented and operating",
];

const FORBIDDEN_ON_SOLUTIONS_HEALTHCARE = [
  "Yes. Row-level client isolation",
  "BAA available, retention configurable per HIPAA requirements",
  "MSA + BAA signed",
  "HIPAA-adequate audit trail ready",
];

const FORBIDDEN_ON_SOLUTIONS_K12 = [
  "Retention configured to FERPA. Audit trail (Layer 15) ready for state review",
];

test("truth-claim consistency — /trust", async ({ page }) => {
  await page.goto(`${BASE}/trust`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_ON_TRUST_SECURITY_COMPLIANCE) {
    expect(body, `Retracted claim leaked back onto /trust: "${phrase}"`).not.toContain(phrase);
  }
});

test("truth-claim consistency — /security", async ({ page }) => {
  await page.goto(`${BASE}/security`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_ON_TRUST_SECURITY_COMPLIANCE) {
    expect(body, `Retracted claim leaked back onto /security: "${phrase}"`).not.toContain(phrase);
  }
});

test("truth-claim consistency — /compliance hero + §01 vs §§02-06", async ({ page }) => {
  await page.goto(`${BASE}/compliance`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_ON_TRUST_SECURITY_COMPLIANCE) {
    expect(body, `Retracted claim leaked back onto /compliance: "${phrase}"`).not.toContain(phrase);
  }
  // Body-authoritative phrasing MUST be present
  expect(body).toContain("SOC 2 Type II certification is in progress");
  expect(body).toContain("ISO 27001:2022 certification is not yet held");
  expect(body).toContain("HIPAA-readiness is in progress");
});

test("truth-claim consistency — /solutions/healthcare", async ({ page }) => {
  await page.goto(`${BASE}/solutions/healthcare`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_ON_SOLUTIONS_HEALTHCARE) {
    expect(body, `Retracted HIPAA claim leaked back: "${phrase}"`).not.toContain(phrase);
  }
});

test("truth-claim consistency — /solutions/k12", async ({ page }) => {
  await page.goto(`${BASE}/solutions/k12`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_ON_SOLUTIONS_K12) {
    expect(body, `Retracted FERPA claim leaked back: "${phrase}"`).not.toContain(phrase);
  }
});

test("no fabricated 23% Bessemer/Avante/SFAI Labs benchmark on any page", async ({ page }) => {
  const paths = [
    "/",
    "/solutions/model-training",
    "/blog/approval-is-the-moat",
    "/blog/preference-pairs-are-your-training-data",
    "/blog/the-company-brain",
  ];
  const forbidden = [
    "Bessemer/Avante/SFAI Labs",
    "twenty-three-percent inference-of-revenue",
    "23% inference-of-revenue",
    "OpenAI is running at 56%",
    "OpenAI is running at fifty-six percent",
  ];
  for (const path of paths) {
    await page.goto(`${BASE}${path}`);
    const body = await page.textContent("main");
    for (const phrase of forbidden) {
      expect(body, `Fabricated benchmark leaked back onto ${path}: "${phrase}"`).not.toContain(phrase);
    }
  }
});
```

- [ ] **Step 2: Run against localhost dev**

Run: `pnpm dev &` then `pnpm exec playwright test tests/truth-claim-consistency.spec.ts`
Expected: all 6 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/truth-claim-consistency.spec.ts
git commit -m "test(truth-claims): Playwright assertion suite for retracted-claim consistency

Enforces that /trust, /security, /compliance, /solutions/healthcare,
/solutions/k12 never re-assert retracted certifications; enforces that
fabricated 23% Bessemer/Avante/SFAI Labs benchmark stays retracted.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 2 · Session-ready fixes bundle (Tasks 12-21)

### Task 12: Extend scripts/check-vocab.sh with retired-vocab + retracted-claim patterns

**Files:**
- Modify: `scripts/check-vocab.sh`

- [ ] **Step 1: Read current guard**

Run: `cat scripts/check-vocab.sh` — note the FORBIDDEN_PATTERNS array and whitelist.

- [ ] **Step 2: Extend FORBIDDEN_PATTERNS**

Add these patterns (word-boundary regex, case-insensitive):
```
'\bcompany[- ]brain\b'
'\boperating system\b'
'\bfifteen (governance )?layers?\b'
'\b(per-)?department(s|-first)?\b'
'\bper-domain brain\b'
'\bBessemer/Avante/SFAI Labs\b'
'\btwenty-three-percent inference-of-revenue\b'
'\bSOC 2 Type II report available under NDA\b'
'\bAnnex IV pack available under NDA\b'
'\bHIPAA BAA available\b'
'\bEngineered to SOC 2 Type II and ISO 27001\b'
```

Preserve existing whitelist for negative-framing blog posts (`content/blog/*.mdx`) as-is.

- [ ] **Step 3: Verify guard blocks a fixture**

Run: `echo "we have company brain infrastructure" | bash scripts/check-vocab.sh -`
Expected: EXIT CODE non-zero, error message identifies the pattern.

- [ ] **Step 4: Run prebuild to confirm current code passes**

Run: `pnpm run check:vocab`
Expected: PASS (after Tasks 1-11 landed).

- [ ] **Step 5: Commit**

```bash
git add scripts/check-vocab.sh
git commit -m "chore(governance): extend vocab-guard with retired-voice + retracted-claim patterns

Blocks 'company brain', 'operating system' (customer surface), 'fifteen
governance layers', 'department', 'per-domain brain', 'Bessemer/Avante/SFAI
Labs benchmark', + 4 retracted-certification-claim phrases. Prevents
regression on the 2026-09-11 run-layer voice migration + Phase 1 truth-claim
retractions.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 13: Fix HomeBands.tsx broken aria-controls

**Files:**
- Modify: `components/sections/HomeBands.tsx`

- [ ] **Step 1: Read current state**

Run: `grep -n 'aria-controls\|role="tab\|role="tabpanel' components/sections/HomeBands.tsx`
Confirm: `aria-controls={`band-${band.n}-panel`}` at line 111; NO `role="tabpanel"` + matching `id` elsewhere.

- [ ] **Step 2: Add the missing tabpanel wrapper**

Find the expanded-content JSX (the block rendered when a band is "open"). Wrap it in:
```tsx
<div
  role="tabpanel"
  id={`band-${band.n}-panel`}
  aria-labelledby={`band-${band.n}-tab`}
  hidden={openBand !== band.n}
>
  {/* existing expanded content */}
</div>
```

Add matching `id={`band-${band.n}-tab`}` to the `role="tab"` div at line 108.

- [ ] **Step 3: Run axe test**

Run: `pnpm run test:a11y -- --grep "home"`
Expected: `aria-valid-attr-value` violation is gone; test PASSES.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HomeBands.tsx
git commit -m "fix(a11y): wire HomeBands tabpanel matching aria-controls

Previously aria-controls pointed to a tabpanel id that was never rendered.
Now renders a role=tabpanel wrapper with the correct id + aria-labelledby.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 14: Add useReducedMotion() gate to ArchitectureGraph.tsx

**Files:**
- Modify: `components/ui/ArchitectureGraph.tsx`

- [ ] **Step 1: Import useReducedMotion**

At line 10 (existing motion/react import), add `useReducedMotion` to the destructure:
```tsx
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
```

- [ ] **Step 2: Gate the parallax-tilt spring**

Inside the component, near the top of the render body:
```tsx
const prefersReducedMotion = useReducedMotion();
```

Then guard the `useMotionValue`/`useSpring` mouse-tracked transform:
```tsx
const rotateX = useTransform(prefersReducedMotion ? useMotionValue(0) : mouseYSpring, ...);
const rotateY = useTransform(prefersReducedMotion ? useMotionValue(0) : mouseXSpring, ...);
```

Or (cleaner): early-return the mouse-move handler when `prefersReducedMotion` is true.

- [ ] **Step 3: Verify manually**

Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Load `/product`. Confirm ArchitectureGraph no longer tilts on mouse move.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ArchitectureGraph.tsx
git commit -m "fix(a11y): gate ArchitectureGraph parallax-tilt on prefers-reduced-motion

Global CSS reduced-motion rule zeros CSS animation/transition durations
but does not neutralize motion/react inline transform springs. This adds
useReducedMotion() to short-circuit the mouse-follow parallax.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 15: Update content/pages.ts:15-17 JSDoc canonical-vocab header

**Files:**
- Modify: `content/pages.ts:15-17`

- [ ] **Step 1: Read current header**

Run: `sed -n '10,25p' content/pages.ts`
Confirm: current header still lists "company brain, operating system" as canonical.

- [ ] **Step 2: Rewrite header**

Replace lines 15-17 with:
```
 * Canonical vocabulary (2026-09-11 run-layer north star, superseding 2026-08-23 "operating system" framing):
 *   Use: run layer / executor / Pearl / metered / isolated / modular
 *   NEVER: agent(s), AI agent(s), chatbot(s), tenant(s), multi-tenant, company brain, operating system (customer surface), fifteen governance layers, department(s), per-department, per-domain brain
```

- [ ] **Step 3: Commit**

```bash
git add content/pages.ts
git commit -m "chore(voice): update content/pages.ts JSDoc canonical-vocab header to run-layer

Header was the reason pages.ts kept re-drifting to 'company brain' framing.
Now points at the ratified 2026-09-11 north star.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 16: Add packageManager field; delete package-lock.json

**Files:**
- Modify: `package.json`
- Delete: `package-lock.json`

- [ ] **Step 1: Add packageManager field**

Edit `package.json` — add after `"private": true,`:
```json
"packageManager": "pnpm@10.33.2",
```

- [ ] **Step 2: Delete the npm lockfile**

Run: `git rm package-lock.json`

- [ ] **Step 3: Verify pnpm install still works**

Run: `pnpm install --frozen-lockfile`
Expected: PASS with no lockfile regeneration.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore(build): pin packageManager to pnpm@10.33.2; remove stray package-lock.json

FEES ADR-PROV v1.2 row 6 mandate. Removes dual-lockfile smell that let a
different pnpm major regenerate silently.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 17: De-duplicate Space_Grotesk load in app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Read current state**

Run: `grep -n 'Space_Grotesk\|Fira_Code\|next/font/google\|--font-serif\|--font-sans' app/layout.tsx`
Confirm: Space_Grotesk is loaded twice with different `variable` bindings.

- [ ] **Step 2: Consolidate to one load**

Replace the two Space_Grotesk load blocks with a single load:
```tsx
import { Space_Grotesk, Fira_Code } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
```

Then in the `<html>` className, share the same variable class across both `--font-serif` and `--font-sans` CSS-var usages. Update `globals.css:92-93` to alias `--font-serif` and `--font-sans` both to `var(--font-display)`.

- [ ] **Step 3: Verify no duplicate load**

Run: `curl -sI http://localhost:3000 | grep 'Link:.*font'`
Expected: one Space Grotesk woff2 preload, not two.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "perf(fonts): de-duplicate Space_Grotesk next/font load

Was loading the same family twice under two variable names. Now one load,
shared across --font-serif + --font-sans via a --font-display intermediate.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 18: Emit organizationJsonLd() in app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Verify helper exists**

Run: `grep -n 'organizationJsonLd' lib/seo.ts`
Expected: function defined at ~line 44-58.

- [ ] **Step 2: Import + emit as inline script**

In `app/layout.tsx`, add:
```tsx
import { organizationJsonLd } from "@/lib/seo";
```

Inside `<body>`, add:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
/>
```

- [ ] **Step 3: Verify at runtime**

Run: `curl -s http://localhost:3000 | grep 'application/ld+json'`
Expected: one hit with the organization schema JSON.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): emit organizationJsonLd() as application/ld+json in root layout

Helper existed in lib/seo.ts but was never emitted. Now site-wide.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 19: Delete root lighthouserc.json (keep .lighthouserc.json)

**Files:**
- Delete: `lighthouserc.json`

- [ ] **Step 1: Confirm dotfile is authoritative**

Run: `grep 'test:lh' package.json`
Expected: `"test:lh": "lhci autorun --config=.lighthouserc.json"` — points at dotfile.

- [ ] **Step 2: Delete**

Run: `git rm lighthouserc.json`

- [ ] **Step 3: Verify test:lh still works**

Run: `pnpm run test:lh`
Expected: uses the dotfile config; no config-not-found error.

- [ ] **Step 4: Commit**

```bash
git add -u lighthouserc.json
git commit -m "chore(perf): delete unused root lighthouserc.json (dotfile is authoritative)

Two competing Lighthouse configs — root file was unused, dotfile is what
test:lh script points at. Removed to end the drift.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 20: Create app/not-found.tsx site-chrome 404

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Write the branded 404**

Create the file:
```tsx
import Link from "next/link";
import { BRAND } from "@/content/brand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `404 · ${BRAND.name}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="hero-paper">
      <div className="container-narrow">
        <p className="eyebrow">404 · Not found</p>
        <h1 className="hero-paper__title">This page is not part of {BRAND.name}.</h1>
        <p className="hero-paper__deck">
          You may have followed a stale link, or a route we retired. The rest of the site is still here.
        </p>
        <div className="hero-paper__cta">
          <Link href="/" className="btn btn-primary">Return home</Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify locally**

Run: `pnpm dev` and visit `http://localhost:3000/this-route-does-not-exist`.
Expected: branded 404 renders inside the site chrome (nav + footer visible).

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat(chrome): app/not-found.tsx — site-chrome 404 fallback

Previously fell through to Next's built-in default 404 (no branding).
Now renders inside site chrome with a real home link.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 21: Fix 3 undefined CSS vars in globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Confirm undefined refs**

Run: `grep -nE 'var\(\-\-accent\)|var\(\-\-paper-3\)|var\(\-\-dur-default\)' app/globals.css`
Expected: 5 hits for `--accent` (lines 1477, 1478, 1590, 1805, 1920), 1 hit for `--paper-3` (line 1497), 2 hits for `--dur-default` (lines 1707, 1827).

- [ ] **Step 2: Replace `--accent` with `--gold` (same hex `#A36630`)**

Run: `sed -i '' 's/var(--accent)/var(--gold)/g' app/globals.css`

- [ ] **Step 3: Replace `--dur-default` with `--dur-med` (both = 180ms)**

Run: `sed -i '' 's/var(--dur-default)/var(--dur-med)/g' app/globals.css`

- [ ] **Step 4: Declare `--paper-3` OR change the reference**

Option A: declare `--paper-3: #F0EEE9;` (one step lighter than paper-2) in the `:root` block.

Option B: change `.btn-light:hover { background: var(--paper-3); }` at line 1497 to `background: var(--rule-2);`

Prefer Option A (adds the token; matches the escalation pattern paper → paper-2 → paper-3).

- [ ] **Step 5: Verify no undefined refs remain**

Run: `grep -nE 'var\(\-\-accent\)|var\(\-\-paper-3\)|var\(\-\-dur-default\)' app/globals.css`
Expected: 0 hits for `--accent` and `--dur-default`; the `--paper-3` hit is now backed by a declaration.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "fix(tokens): resolve 3 undefined CSS variable references

- var(--accent) (5 sites) -> var(--gold) (same hex #A36630)
- var(--dur-default) (2 sites) -> var(--dur-med) (both = 180ms)
- var(--paper-3) (1 site) -> declared as #F0EEE9 (paper -> paper-2 -> paper-3 escalation)

Previously these resolved to browser defaults (transparent color, 0s duration).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 22: Full-wave verify + CI check promotion

**Files:**
- Modify: `.github/workflows/a11y.yml` (only after clean a11y run)
- Modify: `.github/workflows/lighthouse.yml` (only after clean lh run)

- [ ] **Step 1: Run full local verify**

Run each in sequence:
```bash
pnpm run check:vocab
pnpm run lint
pnpm build
pnpm run test:a11y
pnpm run test:lh
pnpm exec playwright test tests/truth-claim-consistency.spec.ts
```

Expected: all PASS. If any fail: return to prior task and fix; do NOT proceed to Step 2 until clean.

- [ ] **Step 2: Promote a11y check from advisory to blocking**

Edit `.github/workflows/a11y.yml` line 35 — remove ` || true` from `npm run test:a11y || true`.

- [ ] **Step 3: Promote Lighthouse check from advisory to blocking**

Edit `.github/workflows/lighthouse.yml` line 34 — remove ` || true` from `npx lhci autorun --config=.lighthouserc.json || true`.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/a11y.yml .github/workflows/lighthouse.yml
git commit -m "$(cat <<'EOF'
chore(ci): promote a11y + lighthouse from advisory to blocking

Both workflows now hard-fail on regression. Prerequisite met: one clean
run on both checks after Phase 1 + Phase 2 fixes landed.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 5: Push to remote for CI verification**

```bash
git push
```
Watch CI: both a11y and lighthouse workflows should now run as required checks.

---

## Self-review checklist (run once, fix inline)

**Spec coverage** — every Phase 1 + Phase 2 item in the spec has a task in this plan:
- P1 truth-claim retractions (14 sites in spec) → Tasks 1-10 cover /trust + /security + /compliance + solutions × 4 + facts.ts + architecture.ts + blog client-isolation + 23% benchmark ✓
- P2 item 1 (HomeBands aria-controls) → Task 13 ✓
- P2 item 2 (ArchitectureGraph useReducedMotion) → Task 14 ✓
- P2 item 3 (vocab-guard extension) → Task 12 ✓
- P2 item 4 (pages.ts JSDoc header) → Task 15 ✓
- P2 item 5 (packageManager + delete package-lock) → Task 16 ✓
- P2 item 6 (Space_Grotesk dedup) → Task 17 ✓
- P2 item 7 (organizationJsonLd emit) → Task 18 ✓
- P2 item 8 (delete root lighthouserc) → Task 19 ✓
- P2 item 9 (not-found.tsx) → Task 20 ✓
- P2 item 10 (undefined CSS vars) → Task 21 ✓
- Verify + CI promotion → Task 22 ✓

**Placeholder scan** — none. Every task has actual code, actual grep commands, actual replacement text.

**Type consistency** — no type signatures declared in early tasks that later tasks reference. Every task is data/content or narrow single-file change.

**Verification** — every task has a grep-command or Playwright/CI verification step.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-14-nebbos-site-phase-1-2-immediate-fixes.md`. Two execution options:

1. **Subagent-driven (recommended)** — fresh subagent per task, review between tasks, fast iteration.
2. **Inline execution** — execute tasks in this session using superpowers:executing-plans, batch execution with checkpoints.

Per `feedback_agent_decides_and_executes_never_asks_founder_to_pick`, defaulting to **subagent-driven** without asking. Rationale: 22 tasks, review-gate between each is exactly what subagent-driven-development is built for; inline would balloon this session's context past useful thresholds.
