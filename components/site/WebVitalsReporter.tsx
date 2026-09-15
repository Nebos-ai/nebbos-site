"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * components/site/WebVitalsReporter.tsx · Client-side Web Vitals beacon.
 *
 * Sends every Core Web Vital measurement (LCP, FCP, CLS, INP, TTFB) to
 * /api/vitals via navigator.sendBeacon (survives page unload, non-blocking).
 * Wired once at the root layout — one listener for the whole site.
 *
 * The `useReportWebVitals` hook is Next 15 native — no external
 * dependency. It fires per-metric during page lifecycle and passes the
 * standard Web Vitals JSON payload.
 *
 * Failure mode: if sendBeacon is unavailable or the endpoint errors, the
 * measurement is dropped silently. Web Vitals is best-effort observability;
 * it never blocks user experience.
 *
 * Charter elite-bar dim 10 (observability — Web Vitals shipped to real
 * endpoint) — client half.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
      url: typeof window !== "undefined" ? window.location.pathname : undefined,
    });

    // Prefer sendBeacon so the measurement survives page unload (LCP/CLS
    // often fire during navigation away). Fall back to fetch keepalive
    // when sendBeacon is unavailable (rare — some older browsers, strict CSP).
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/vitals", blob);
    } else if (typeof fetch !== "undefined") {
      fetch("/api/vitals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {
        // Silent failure — observability is best-effort.
      });
    }
  });

  // Reporter has no visual output; it's a side-effect-only component.
  return null;
}
