/**
 * app/loading.tsx · Wave 3a · route-level loading skeleton.
 *
 * Shown by Next.js while a segment is streaming. Since every page is
 * `force-static` today this rarely fires, but it's the correct default:
 * a paper-white panel with a subtle hairline shimmer that echoes the
 * delta-brief editorial voice — never a spinner.
 */
import { PlusMark } from "@/components/ui/PlusMark";

export default function RouteLoading() {
  return (
    <section style={{ padding: "96px 0", borderTop: "1px solid var(--rule)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <PlusMark size="sm" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            Loading
          </span>
        </div>
        <div className="skeleton skeleton--title" aria-hidden />
        <div className="skeleton skeleton--deck" aria-hidden />
        <div className="skeleton skeleton--para" aria-hidden />
        <div className="skeleton skeleton--para" aria-hidden style={{ width: "82%" }} />
        <div className="skeleton skeleton--para" aria-hidden style={{ width: "68%" }} />
        <span className="sr-only">Loading content</span>
      </div>
    </section>
  );
}
