"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BANDS,
  EDGES,
  LAYERS,
  NODE_POSITIONS,
  edgePath,
  type Layer,
} from "@/lib/architecture";

/**
 * ArchitectureGraph · Wave 2D · founder directive 2026-08-23:
 * "your table should look like a knowledge graph with each point being a note.
 *  we should use high level animation for this next js stuff."
 *
 * Replaces the earlier 5×3 <ArchitectureGrid> table with a proper SVG-native
 * knowledge graph — 15 layer nodes, ~35 edges (peer + cross-band-depends),
 * hover highlights the node + its connected edges + its neighbors, click pins,
 * escape unpins. Detail side-panel unchanged.
 *
 * Animation register (hand-rolled, no library — doctrine v2 clause preserved):
 *  - Entry: nodes + edges fade + scale in bottom-up on scroll-into-view, staggered
 *    per band via CSS custom property `--graph-i` (IntersectionObserver toggle).
 *  - Edge draw-in: `stroke-dasharray: 1000` + `stroke-dashoffset` transition
 *    at `--dur-slow` when parent `.is-visible`.
 *  - Hover: node fill morphs paper → orange at `--dur-fast`; connected edges
 *    lift `stroke-opacity` 0.35 → 1 and `stroke` → var(--accent-2); connected
 *    nodes stroke → var(--accent-2). Neighbors known via precomputed adjacency.
 *  - Pin: `is-pinned` class widens node stroke 1.5 → 2 and locks the highlight.
 *  - Reduced-motion: all transitions disabled; static rendering.
 *
 * Aspect-locked SVG (viewBox 0 0 800 720) — scales fluidly.
 * Mobile: SVG scales to container width; detail-panel stacks below.
 */

const VB_W = 800;
const VB_H = 720;
const NODE_R = 22;

// Precomputed adjacency: for each layer n, the set of connected layer numbers.
const ADJACENCY: Record<number, Set<number>> = (() => {
  const map: Record<number, Set<number>> = {};
  for (const layer of LAYERS) map[layer.n] = new Set<number>();
  for (const e of EDGES) {
    map[e.from].add(e.to);
    map[e.to].add(e.from);
  }
  return map;
})();

// Band color mapping — orange progression foundation → surface.
function bandColor(band: number): string {
  switch (band) {
    case 1: return "var(--ink-3)";      // Substrate — deepest, quietest
    case 2: return "var(--ink-2)";      // Boundary
    case 3: return "var(--ink)";        // Intelligence
    case 4: return "var(--gold)";       // Agent — deep gold
    case 5: return "var(--accent-2)";   // Commerce — bright orange, roof
    default: return "var(--ink)";
  }
}

export function ArchitectureGraph() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const shownLayer: Layer | null = useMemo(() => {
    const n = pinned ?? active ?? 1;
    return LAYERS.find((l) => l.n === n) ?? null;
  }, [active, pinned]);

  const highlightedNodes = useMemo(() => {
    const n = pinned ?? active;
    if (n == null) return new Set<number>();
    const s = new Set<number>([n]);
    for (const nb of ADJACENCY[n] ?? []) s.add(nb);
    return s;
  }, [active, pinned]);

  const highlightedEdges = useMemo(() => {
    const n = pinned ?? active;
    if (n == null) return new Set<number>();
    const idxs = new Set<number>();
    EDGES.forEach((e, i) => {
      if (e.from === n || e.to === n) idxs.add(i);
    });
    return idxs;
  }, [active, pinned]);

  // Escape unpins. Handled globally so any focus target releases the pin.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(null);
        setActive(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll-into-view: sets `.is-visible` on the SVG to trigger CSS entry animations.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onNodeEnter = useCallback((n: number) => setActive(n), []);
  const onNodeLeave = useCallback(() => setActive(null), []);
  const onNodeClick = useCallback(
    (n: number) => setPinned((cur) => (cur === n ? null : n)),
    [],
  );

  return (
    <div className="arch-graph-wrap" ref={rootRef}>
      <div className={`arch-graph${visible ? " is-visible" : ""}`}>
        <svg
          className="arch-graph-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Nebbos 15-layer architecture as a knowledge graph"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Soft glow filter for the hovered/pinned node. */}
            <filter id="arch-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Band-label strip (left column, quiet mono text) */}
          <g className="arch-graph-band-labels" aria-hidden="true">
            {BANDS.slice().reverse().map((band) => {
              const layer = LAYERS.find((l) => l.band === band.n);
              if (!layer) return null;
              const y = NODE_POSITIONS[layer.n].y;
              return (
                <g key={band.n} className="arch-graph-band-label" transform={`translate(24 ${y})`}>
                  <text className="band-n" x={0} y={-4}>{`0${band.n}`}</text>
                  <text className="band-name" x={0} y={12}>{band.name}</text>
                </g>
              );
            })}
          </g>

          {/* Edges — rendered BEHIND nodes. */}
          <g className="arch-graph-edges">
            {EDGES.map((edge, i) => {
              const isHighlighted = highlightedEdges.has(i);
              return (
                <path
                  key={`${edge.from}-${edge.to}-${edge.kind}-${i}`}
                  className={`arch-graph-edge arch-graph-edge--${edge.kind}${isHighlighted ? " is-highlighted" : ""}`}
                  d={edgePath(edge.from, edge.to, edge.kind)}
                  fill="none"
                  style={{ ["--graph-i" as string]: i * 30 }}
                />
              );
            })}
          </g>

          {/* Nodes — foreground. Each is a <g> containing circle + numeral + label. */}
          <g className="arch-graph-nodes">
            {LAYERS.map((layer, i) => {
              const pos = NODE_POSITIONS[layer.n];
              const isActive = shownLayer?.n === layer.n;
              const isHighlighted = highlightedNodes.has(layer.n);
              const isPinned = pinned === layer.n;
              const color = bandColor(layer.band);
              return (
                <g
                  key={layer.n}
                  className={`arch-graph-node${isActive ? " is-active" : ""}${isHighlighted ? " is-highlighted" : ""}${isPinned ? " is-pinned" : ""}`}
                  transform={`translate(${pos.x} ${pos.y})`}
                  style={{
                    ["--node-color" as string]: color,
                    ["--graph-i" as string]: i * 45,
                  }}
                >
                  {/* Hit target — larger invisible circle for pointer/keyboard reach. */}
                  <circle
                    className="arch-graph-node-hit"
                    r={NODE_R + 12}
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={`Layer ${layer.n}: ${layer.name}. ${layer.caption}`}
                    aria-pressed={isPinned}
                    aria-current={isActive ? "true" : undefined}
                    onMouseEnter={() => onNodeEnter(layer.n)}
                    onFocus={() => onNodeEnter(layer.n)}
                    onMouseLeave={onNodeLeave}
                    onBlur={onNodeLeave}
                    onClick={() => onNodeClick(layer.n)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onNodeClick(layer.n);
                      }
                    }}
                  />
                  {/* Halo — pulses on hover. */}
                  <circle className="arch-graph-node-halo" r={NODE_R + 6} />
                  {/* Body — the node itself. */}
                  <circle className="arch-graph-node-body" r={NODE_R} />
                  {/* Numeral inside. */}
                  <text className="arch-graph-node-n" x={0} y={0}>
                    {String(layer.n).padStart(2, "0")}
                  </text>
                  {/* Label below. */}
                  <text className="arch-graph-node-label" x={0} y={NODE_R + 18}>
                    {layer.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <aside className="arch-graph-detail" aria-live="polite">
        {shownLayer ? <GraphDetail layer={shownLayer} pinned={pinned !== null} /> : null}
      </aside>
    </div>
  );
}

function GraphDetail({ layer, pinned }: { layer: Layer; pinned: boolean }) {
  return (
    <div className="arch-graph-detail-inner" key={layer.n}>
      <div className="arch-graph-detail-header">
        <span className="arch-graph-detail-n">{String(layer.n).padStart(2, "0")}</span>
        <div>
          <div className="arch-graph-detail-name">{layer.name}</div>
          <div className="arch-graph-detail-caption">{layer.caption}</div>
        </div>
      </div>
      <p className="arch-graph-detail-body">{layer.detail}</p>
      <ul className="arch-graph-detail-proof">
        {layer.proof.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="arch-graph-detail-hint">
        {pinned ? "pinned · press esc to release" : "hover any node · click to pin"}
      </div>
    </div>
  );
}
