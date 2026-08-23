"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BANDS,
  EDGES,
  LAYERS,
  NODE_POSITIONS,
  edgePath,
  type Layer,
} from "@/lib/architecture";

/**
 * ArchitectureGraph · Wave 2D + 2E · founder directive 2026-08-23:
 * "your table should look like a knowledge graph with each point being a note.
 *  we should use high level animation for this next js stuff." + "i want all
 *  of them" — enabling all four Wave 2E polish moves:
 *    (1) scroll-linked band highlight via CSS animation-timeline: view()
 *    (2) node "note" mode — pinned node spawns an in-graph note card
 *    (3) force-layout jitter on load (~300ms spring settle from random offsets)
 *    (4) motion library — 3.8KB successor to framer-motion, doctrine amendment
 *
 * See `feedback_doctrine_v2_motion_library_amendment` for the library-approval
 * memory that supersedes the doctrine v2 "no motion library" clause.
 */

const VB_W = 800;
const VB_H = 720;
const NODE_R = 22;
const NOTE_W = 200;
const NOTE_H = 108;
const NOTE_GAP = 28;

// Precomputed adjacency for O(1) neighborhood lookup on hover.
const ADJACENCY: Record<number, Set<number>> = (() => {
  const map: Record<number, Set<number>> = {};
  for (const layer of LAYERS) map[layer.n] = new Set<number>();
  for (const e of EDGES) {
    map[e.from].add(e.to);
    map[e.to].add(e.from);
  }
  return map;
})();

// Deterministic seeded jitter — hash the layer.n to a small offset so
// the entry-jitter is stable across renders (no hydration mismatch).
function jitterFor(n: number): { x: number; y: number } {
  const seed = (n * 2654435761) % 2 ** 32;
  const jx = (((seed >> 8) & 0xff) / 255 - 0.5) * 32;
  const jy = (((seed >> 16) & 0xff) / 255 - 0.5) * 32;
  return { x: jx, y: jy };
}

function bandColor(band: number): string {
  switch (band) {
    case 1: return "var(--ink-3)";
    case 2: return "var(--ink-2)";
    case 3: return "var(--ink)";
    case 4: return "var(--gold)";
    case 5: return "var(--accent-2)";
    default: return "var(--ink)";
  }
}

/** Choose which side of the node to place the note card so it stays in the viewBox. */
function notePlacement(nodeX: number, nodeY: number): { x: number; y: number; anchorX: number } {
  const wantsRight = nodeX < VB_W / 2;
  const x = wantsRight ? nodeX + NODE_R + NOTE_GAP : nodeX - NODE_R - NOTE_GAP - NOTE_W;
  const y = Math.min(Math.max(nodeY - NOTE_H / 2, 12), VB_H - NOTE_H - 12);
  const anchorX = wantsRight ? x : x + NOTE_W;
  return { x, y, anchorX };
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

  const pinnedLayer: Layer | null = useMemo(() => {
    if (pinned == null) return null;
    return LAYERS.find((l) => l.n === pinned) ?? null;
  }, [pinned]);

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
            <filter id="arch-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Band labels — Wave 2E: reveal with CSS animation-timeline: view()
              on modern browsers (Chrome 115+ / Safari 26+) for scroll-linked
              entry; degrades to the JS `.is-visible` fallback everywhere else. */}
          <g className="arch-graph-band-labels" aria-hidden="true">
            {BANDS.slice().reverse().map((band, i) => {
              const layer = LAYERS.find((l) => l.band === band.n);
              if (!layer) return null;
              const y = NODE_POSITIONS[layer.n].y;
              return (
                <g
                  key={band.n}
                  className="arch-graph-band-label"
                  transform={`translate(24 ${y})`}
                  style={{ ["--band-i" as string]: i }}
                >
                  <text className="band-n" x={0} y={-4}>{`0${band.n}`}</text>
                  <text className="band-name" x={0} y={12}>{band.name}</text>
                </g>
              );
            })}
          </g>

          {/* Edges — drawn behind nodes. */}
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

          {/* Nodes — Wave 2E: force-layout jitter on entry via motion spring. */}
          <g className="arch-graph-nodes">
            {LAYERS.map((layer, i) => {
              const pos = NODE_POSITIONS[layer.n];
              const jitter = jitterFor(layer.n);
              const isActive = shownLayer?.n === layer.n;
              const isHighlighted = highlightedNodes.has(layer.n);
              const isPinned = pinned === layer.n;
              const color = bandColor(layer.band);
              return (
                <motion.g
                  key={layer.n}
                  className={`arch-graph-node${isActive ? " is-active" : ""}${isHighlighted ? " is-highlighted" : ""}${isPinned ? " is-pinned" : ""}`}
                  style={{
                    ["--node-color" as string]: color,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                  initial={{
                    x: pos.x + jitter.x,
                    y: pos.y + jitter.y,
                    opacity: 0,
                    scale: 0.72,
                  }}
                  animate={
                    visible
                      ? { x: pos.x, y: pos.y, opacity: 1, scale: 1 }
                      : { x: pos.x + jitter.x, y: pos.y + jitter.y, opacity: 0, scale: 0.72 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                    mass: 0.9,
                    delay: visible ? 0.05 + i * 0.035 : 0,
                  }}
                  whileHover={{ scale: 1.06 }}
                >
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
                  <circle className="arch-graph-node-halo" r={NODE_R + 6} />
                  <circle className="arch-graph-node-body" r={NODE_R} />
                  <text className="arch-graph-node-n" x={0} y={0}>
                    {String(layer.n).padStart(2, "0")}
                  </text>
                  <text className="arch-graph-node-label" x={0} y={NODE_R + 18}>
                    {layer.name}
                  </text>
                </motion.g>
              );
            })}
          </g>

          {/* Wave 2E: note-card overlay for the pinned node. In-graph micro-panel
              positioned to whichever side keeps it inside the viewBox. Uses
              AnimatePresence for enter/exit; connecting line from card to node. */}
          <AnimatePresence>
            {pinnedLayer ? (() => {
              const pos = NODE_POSITIONS[pinnedLayer.n];
              const placement = notePlacement(pos.x, pos.y);
              const proofLine = pinnedLayer.proof[0] ?? "";
              return (
                <motion.g
                  key={pinnedLayer.n}
                  className="arch-graph-note"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px`, transformBox: "fill-box" }}
                >
                  {/* Connecting line from node edge to card edge — hairline orange. */}
                  <line
                    className="arch-graph-note-connector"
                    x1={pos.x}
                    y1={pos.y}
                    x2={placement.anchorX}
                    y2={placement.y + NOTE_H / 2}
                  />
                  {/* Card body — cut-corner rect echoing the site's signature shape. */}
                  <rect
                    className="arch-graph-note-body"
                    x={placement.x}
                    y={placement.y}
                    width={NOTE_W}
                    height={NOTE_H}
                    rx={0}
                    ry={0}
                  />
                  <text
                    className="arch-graph-note-n"
                    x={placement.x + 14}
                    y={placement.y + 22}
                  >
                    +{" "}{String(pinnedLayer.n).padStart(2, "0")}
                  </text>
                  <text
                    className="arch-graph-note-name"
                    x={placement.x + 14}
                    y={placement.y + 46}
                  >
                    {pinnedLayer.name}
                  </text>
                  <text
                    className="arch-graph-note-caption"
                    x={placement.x + 14}
                    y={placement.y + 66}
                  >
                    {pinnedLayer.caption}
                  </text>
                  <text
                    className="arch-graph-note-proof"
                    x={placement.x + 14}
                    y={placement.y + 92}
                  >
                    {proofLine.length > 32 ? proofLine.slice(0, 30) + "…" : proofLine}
                  </text>
                </motion.g>
              );
            })() : null}
          </AnimatePresence>
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
    <motion.div
      className="arch-graph-detail-inner"
      key={layer.n}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
    >
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
    </motion.div>
  );
}
