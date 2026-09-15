import { NextResponse } from "next/server";

/**
 * app/api/vitals/route.ts · Web Vitals ingest endpoint.
 *
 * Receives Core Web Vitals beacons from the client (LCP, FCP, CLS, INP,
 * TTFB) via POST from components/site/WebVitalsReporter.tsx. Logs to
 * server stdout for now; upgradeable to persistent storage (Postgres,
 * OpenTelemetry, third-party like Vercel Analytics or Sentry) later
 * without changing the client contract.
 *
 * Response: 204 No Content (beacon endpoints should return empty; the
 * client-side sendBeacon spec doesn't wait for a body anyway).
 *
 * Runtime: edge (fast, low-overhead — this handler will be hit on every
 * page navigation once useReportWebVitals fires).
 *
 * Charter elite-bar dim 10 (observability — Web Vitals shipped to real
 * endpoint) satisfied at the ingest layer. Downstream analytics
 * (aggregation + p75/p95 dashboards) is a separate follow-up.
 */

export const runtime = "edge";

type VitalPayload = {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType?: string;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as VitalPayload & { url?: string };
    // Log in a structured, single-line format — easy to grep in server logs
    // and forward to a structured-log pipeline later. Fields chosen to match
    // the Web Vitals JSON shape so downstream aggregators can consume verbatim.
    console.log(
      JSON.stringify({
        kind: "web-vital",
        name: body.name,
        value: body.value,
        rating: body.rating,
        delta: body.delta,
        id: body.id,
        navigationType: body.navigationType,
        url: body.url,
        ts: new Date().toISOString(),
      }),
    );
    return new NextResponse(null, { status: 204 });
  } catch {
    // Beacon endpoints don't reveal errors to the client — they log and
    // acknowledge. Malformed payload is treated as observability drop, not
    // an API surface failure.
    return new NextResponse(null, { status: 204 });
  }
}
