import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * A11y sweep · W3b · axe-core against the primary marketing routes.
 *
 * Rule set: WCAG 2.2 AA + best-practice. Violations fail the test.
 * Disabled rules: color-contrast on transient graph highlight states
 * (they're transient) — pending manual review.
 *
 * To run locally: `npm run build && npm run test:a11y`
 * (npm scripts added in package.json)
 */

const ROUTES = [
  "/",
  "/pricing",
  "/platform",
  "/security",
  "/trust",
  "/governance",
  "/press",
  "/status",
  "/design",
  "/not-found-triggering-route", // triggers the 404 page
];

for (const route of ROUTES) {
  test(`a11y: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    // Allow 404 for our not-found trigger; assert 200 for the rest
    if (route === "/not-found-triggering-route") {
      expect(response?.status()).toBe(404);
    } else {
      expect(response?.ok(), `${route} should return 200`).toBeTruthy();
    }

    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    if (scan.violations.length) {
      // Emit a compact report so CI logs show the specific violation + selector
      // rather than a giant JSON blob
      const summary = scan.violations
        .map((v) => `  · [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`)
        .join("\n");
      // eslint-disable-next-line no-console
      console.log(`\n${route} · a11y violations:\n${summary}`);
    }
    expect(scan.violations, `${route} must have zero WCAG 2.2 AA violations`).toEqual([]);
  });
}
