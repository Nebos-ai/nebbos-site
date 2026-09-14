import { test, expect } from "@playwright/test";

/**
 * tests/truth-claim-consistency.spec.ts (2026-09-14)
 *
 * Regression guard for the Phase 1 truth-claim retraction sweep across
 * /trust + /security + /compliance + /solutions/{healthcare, k12, operations,
 * finance} + facts.ts + lib/architecture.ts + 4 blog posts.
 *
 * Retractions live in commits a119c91, a80b45d, a72e9c0 (pre-2026-09-14 body-
 * side sweep) + 2026-09-14 hero/§01/solutions sweep. This test asserts that
 * previously-retracted phrasing does NOT reappear on customer surfaces AND
 * that the authoritative /compliance body phrasing IS present.
 *
 * If any assertion fires: someone re-introduced a retracted claim. Fix the
 * copy before merging.
 */

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

// Phrases that assert certifications Nebbos does NOT hold. MUST NOT appear on
// /trust, /security, /compliance hero/§01. Sourced from the audit-content-voice-
// truth-2026-09-14.md report and cross-referenced against /compliance §§02-06.
const FORBIDDEN_CERT_CLAIMS = [
  "Engineered to SOC 2 Type II and ISO 27001",
  "Auditors accept it as SOX-adequate",
  "SOC 2 Type II report available under NDA",
  "ISO 27001:2022 certification and Annex A control statements available under NDA",
  "HIPAA BAA available",
  "Annex IV pack available under NDA",
  "Controls implemented and operating",
];

const FORBIDDEN_HEALTHCARE_CLAIMS = [
  "MSA + BAA signed",
  "HIPAA-adequate audit trail ready",
];

const FORBIDDEN_K12_CLAIMS = [
  "Retention configured to FERPA. Audit trail (Layer 15) ready for state review",
  "Retention configured to FERPA. Audit trail",
];

const FORBIDDEN_23_BENCHMARK = [
  "Bessemer/Avante/SFAI Labs",
  "twenty-three-percent inference-of-revenue",
  "23% inference-of-revenue",
  "OpenAI is running at 56%",
  "OpenAI is running at fifty-six percent",
];

// Canonical /compliance body phrasing that MUST be present when the page
// discusses the framework — this is the authoritative retraction language.
const REQUIRED_ON_COMPLIANCE = [
  "SOC 2 Type II certification is in progress",
  "ISO 27001:2022 certification is not yet held",
  "HIPAA-readiness is in progress",
];

test("truth-claim consistency — /trust", async ({ page }) => {
  await page.goto(`${BASE}/trust`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_CERT_CLAIMS) {
    expect(body, `Retracted certification claim leaked back onto /trust: "${phrase}"`).not.toContain(phrase);
  }
});

test("truth-claim consistency — /security", async ({ page }) => {
  await page.goto(`${BASE}/security`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_CERT_CLAIMS) {
    expect(body, `Retracted certification claim leaked back onto /security: "${phrase}"`).not.toContain(phrase);
  }
});

test("truth-claim consistency — /compliance hero + §01 must agree with body §§02-06", async ({ page }) => {
  await page.goto(`${BASE}/compliance`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_CERT_CLAIMS) {
    expect(body, `Retracted certification claim leaked back onto /compliance: "${phrase}"`).not.toContain(phrase);
  }
  for (const phrase of REQUIRED_ON_COMPLIANCE) {
    expect(body, `Authoritative retraction phrasing missing on /compliance: "${phrase}"`).toContain(phrase);
  }
});

test("truth-claim consistency — /solutions/healthcare", async ({ page }) => {
  await page.goto(`${BASE}/solutions/healthcare`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_HEALTHCARE_CLAIMS) {
    expect(body, `Retracted HIPAA claim leaked back onto /solutions/healthcare: "${phrase}"`).not.toContain(phrase);
  }
  // Also assert the retracted-claim family is not asserted
  expect(body).not.toContain("HIPAA BAA available");
});

test("truth-claim consistency — /solutions/k12", async ({ page }) => {
  await page.goto(`${BASE}/solutions/k12`);
  const body = await page.textContent("main");
  for (const phrase of FORBIDDEN_K12_CLAIMS) {
    expect(body, `Retracted FERPA claim leaked back onto /solutions/k12: "${phrase}"`).not.toContain(phrase);
  }
});

test("no fabricated 23% Bessemer/Avante/SFAI Labs benchmark on any surface", async ({ page }) => {
  const paths = [
    "/",
    "/solutions/model-training",
    "/blog/approval-is-the-moat",
    "/blog/preference-pairs-are-your-training-data",
    "/blog/the-company-brain",
  ];
  for (const path of paths) {
    await page.goto(`${BASE}${path}`);
    const body = await page.textContent("main");
    for (const phrase of FORBIDDEN_23_BENCHMARK) {
      expect(body, `Fabricated 23% benchmark leaked back onto ${path}: "${phrase}"`).not.toContain(phrase);
    }
  }
});

test("truth-claim consistency — content/facts.ts complianceStance renders retracted phrasing on /about + /press", async ({ page }) => {
  for (const path of ["/about", "/press"]) {
    await page.goto(`${BASE}${path}`);
    const body = await page.textContent("main");
    // complianceStance renders in the facts table; must not assert held state.
    expect(body, `complianceStance still asserts 'Engineered to SOC 2 Type II' on ${path}`).not.toContain(
      "Engineered to SOC 2 Type II and ISO 27001:2022 controls. EU AI Act Article 11 Annex IV pack available under NDA",
    );
  }
});
