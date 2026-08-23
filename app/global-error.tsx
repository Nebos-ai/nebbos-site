"use client";

/**
 * app/global-error.tsx · Wave 3a · root layout error boundary.
 *
 * Rendered when `app/layout.tsx` itself throws — no fonts, no globals.css,
 * no shell. Must include its own `<html>` and `<body>`. Kept as minimal as
 * possible; the goal is a legible bailout page even when the design system
 * has failed to load.
 */
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#F4F1EA",
          color: "#14120F",
          fontFamily: "Georgia, serif",
          display: "grid",
          placeContent: "center",
          padding: 32,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#A36630",
              marginBottom: 24,
            }}
          >
            Nebbos · 500 · Root error
          </div>
          <h1 style={{ fontSize: 48, lineHeight: 1.1, margin: 0, letterSpacing: -1 }}>
            The application shell failed to load.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 20 }}>
            This is a bailout page rendered without the design system. Try again.
          </p>
          {error.digest ? (
            <p
              style={{
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 12,
                color: "#7A7365",
                letterSpacing: 1,
                marginTop: 16,
              }}
            >
              reference: {error.digest}
            </p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 32,
              padding: "12px 24px",
              background: "#14120F",
              color: "#F4F1EA",
              border: 0,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
