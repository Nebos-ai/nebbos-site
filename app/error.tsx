"use client";

/**
 * app/error.tsx · Wave 3a · route-level error boundary.
 *
 * Rendered when any page below `app/` throws during render. Client component
 * required by Next.js App Router error boundary contract. Delta-brief voice:
 * paper background, orange plus, direct language. No stack traces or internal
 * detail exposed — those go to the log.
 */
import { useEffect } from "react";
import { PlusMark } from "@/components/ui/PlusMark";
import { ButtonLink } from "@/components/ui/Button";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Route errors are surfaced by Next.js — in production this is where an
    // Observability hook would ship a report. Kept as a console.error for now
    // so it lands in the browser console + Railway logs alike.
    // eslint-disable-next-line no-console
    console.error("[route error]", error);
  }, [error]);

  return (
    <section className="section-mono" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <PlusMark size="md" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            500 · Something broke
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: "var(--ink)",
            margin: 0,
            maxWidth: "22ch",
          }}
        >
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>This</em> shouldn&rsquo;t have happened.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--ink-2)",
            maxWidth: "52ch",
            margin: 0,
          }}
        >
          A route threw an error rendering this page. It has been logged.
          Try again — if it keeps happening, tell us and we&rsquo;ll unstick it.
        </p>
        {error.digest ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.08em",
              margin: 0,
            }}
          >
            reference: <span style={{ color: "var(--gold)" }}>{error.digest}</span>
          </p>
        ) : null}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "12px 22px",
              background: "var(--ink)",
              color: "var(--paper)",
              border: 0,
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            Try again
          </button>
          <ButtonLink href="/" variant="ghost">Back home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
