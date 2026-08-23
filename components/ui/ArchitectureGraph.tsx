"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  BANDS,
  EDGES,
  LAYERS,
  NODE_POSITIONS,
  edgePath,
  type Layer,
} from "@/lib/architecture";

/**
 * ArchitectureGraph · Wave 2D + 2E + 3h (bigger, inline note-cards).
 *
 * Founder feedback 2026-08-23: the graph read tiny inside a column; the
 * detail belongs INLINE next to each node (a moncalisse-style inline card),
 * not on a side rail. Reshaped:
 *
 *  - The SVG viewBox scales up (1200×880) and the parent section is now
 *    designed to be full-bleed one-idea-per-viewport.
 *  - Nodes bumped: r=32 (was 22), labels 15-16px (was 13), tap targets big.
 *  - On HOVER (not just pin): a note-card renders inline at the node, sized
 *    to hold the full detail (name, caption, one-line description, 3 proof
 *    points). Auto-flips L/R based on node x-position so it stays inside
 *    the viewBox.
 *  - Motion `<LayoutGroup>` wraps the note-card so it slides between nodes
 *    (shared-layout transition) when you move between hover targets.
 *  - The side detail panel is REMOVED — the note-card at the node is the
 *    primary detail surface.
 *  - Motion springs everywhere, `@property`-animated halo pulses, filter
 *    drop-shadow depth cues on the active node.
 */

const VB_W = 1200;
const VB_H = 880;
const NODE_R = 32;

const NOTE_W = 300;
const NOTE_H_MAX = 210;
const NOTE_GAP = 22;

// Precomputed adjacency for O(1) hover-highlight neighborhood lookup.
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

// Rescale hand-authored NODE_POSITIONS (800×720) to the new VB.
const SCALE_X = VB_W / 800;
const SCALE_Y = VB_H / 720;
function nodePos(n: number): { x: number; y: number } {
  const p = NODE_POSITIONS[n];
  return { x: p.x * SCALE_X, y: p.y * SCALE_Y };
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

/** Note-card placement — flips L/R + top/bottom to stay in the viewBox. */
function notePlacement(
  nodeX: number,
  nodeY: number,
  containerW: number,
  containerH: number,
): { left: number; top: number; anchor: "left" | "right" } {
  const wantsRight = nodeX < containerW / 2;
  // Compute in viewBox coords, then scale to container.
  const scaleX = containerW / VB_W;
  const scaleY = containerH / VB_H;
  const nxPx = nodeX * scaleX;
  const nyPx = nodeY * scaleY;
  const rPx = NODE_R * Math.min(scaleX, scaleY);
  const gapPx = NOTE_GAP * scaleX;

  const left = wantsRight
    ? nxPx + rPx + gapPx
    : nxPx - rPx - gapPx - NOTE_W;
  const top = Math.min(
    Math.max(nyPx - NOTE_H_MAX / 2, 12),
    containerH - NOTE_H_MAX - 12,
  );
  const anchor = wantsRight ? "left" : "right";
  return { left, top, anchor };
}

export function ArchitectureGraph() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const shownN = pinned ?? active;
  const shownLayer: Layer | null = useMemo(() => {
    if (shownN == null) return null;
    return LAYERS.find((l) => l.n === shownN) ?? null;
  }, [shownN]);

  const highlightedNodes = useMemo(() => {
    if (shownN == null) return new Set<number>();
    const s = new Set<number>([shownN]);
    for (const nb of ADJACENCY[shownN] ?? []) s.add(nb);
    return s;
  }, [shownN]);

  const highlightedEdges = useMemo(() => {
    if (shownN == null) return new Set<number>();
    const idxs = new Set<number>();
    EDGES.forEach((e, i) => {
      if (e.from === shownN || e.to === shownN) idxs.add(i);
    });
    return idxs;
  }, [shownN]);

  // Track canvas pixel size so we can position the HTML note-card overlay
  // in the same coordinate space as the SVG.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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

  const notePlacementCoords = useMemo(() => {
    if (!shownLayer || size.w === 0) return null;
    const pos = nodePos(shownLayer.n);
    return notePlacement(pos.x, pos.y, size.w, size.h);
  }, [shownLayer, size.w, size.h]);

  return (
    <div className="arch-graph-canvas" ref={rootRef}>
      <div
        className={`arch-graph${visible ? " is-visible" : ""}`}
        ref={canvasRef}
        onMouseLeave={onNodeLeave}
      >
        <svg
          className="arch-graph-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Nebbos 15-layer architecture as a knowledge graph"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="arch-depth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#14120F" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Band labels down the left column */}
          <g className="arch-graph-band-labels" aria-hidden="true">
            {BANDS.slice().reverse().map((band, i) => {
              const layer = LAYERS.find((l) => l.band === band.n);
              if (!layer) return null;
              const y = nodePos(layer.n).y;
              return (
                <g
                  key={band.n}
                  className="arch-graph-band-label"
                  transform={`translate(36 ${y})`}
                  style={{ ["--band-i" as string]: i }}
                >
                  <text className="band-n" x={0} y={-6}>{`0${band.n}`}</text>
                  <text className="band-name" x={0} y={14}>{band.name}</text>
                </g>
              );
            })}
          </g>

          {/* Edges — drawn behind nodes. */}
          <g className="arch-graph-edges">
            {EDGES.map((edge, i) => {
              const a = NODE_POSITIONS[edge.from];
              const b = NODE_POSITIONS[edge.to];
              if (!a || !b) return null;
              // edgePath was authored against the old 800×720 viewBox.
              // Rescale by injecting the scale factors after construction.
              const raw = edgePath(edge.from, edge.to, edge.kind);
              const scaled = raw.replace(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/g, (_m, x, y) => {
                return `${(parseFloat(x) * SCALE_X).toFixed(1)} ${(parseFloat(y) * SCALE_Y).toFixed(1)}`;
              });
              const isHighlighted = highlightedEdges.has(i);
              return (
                <path
                  key={`${edge.from}-${edge.to}-${edge.kind}-${i}`}
                  className={`arch-graph-edge arch-graph-edge--${edge.kind}${isHighlighted ? " is-highlighted" : ""}`}
                  d={scaled}
                  fill="none"
                  style={{ ["--graph-i" as string]: i * 25 }}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className="arch-graph-nodes">
            {LAYERS.map((layer, i) => {
              const pos = nodePos(layer.n);
              const jitter = jitterFor(layer.n);
              const isActive = shownN === layer.n;
              const isHighlighted = highlightedNodes.has(layer.n);
              const isPinned = pinned === layer.n;
              const isDimmed = shownN != null && !isHighlighted;
              const color = bandColor(layer.band);
              return (
                <motion.g
                  key={layer.n}
                  className={`arch-graph-node${isActive ? " is-active" : ""}${isHighlighted ? " is-highlighted" : ""}${isPinned ? " is-pinned" : ""}${isDimmed ? " is-dimmed" : ""}`}
                  style={{
                    ["--node-color" as string]: color,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                  initial={{
                    x: pos.x + jitter.x,
                    y: pos.y + jitter.y,
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={
                    visible
                      ? { x: pos.x, y: pos.y, opacity: isDimmed ? 0.35 : 1, scale: 1 }
                      : { x: pos.x + jitter.x, y: pos.y + jitter.y, opacity: 0, scale: 0.7 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 22,
                    mass: 0.9,
                    delay: visible ? 0.05 + i * 0.032 : 0,
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  <circle
                    className="arch-graph-node-hit"
                    r={NODE_R + 14}
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={`Layer ${layer.n}: ${layer.name}. ${layer.caption}`}
                    aria-pressed={isPinned}
                    aria-current={isActive ? "true" : undefined}
                    onMouseEnter={() => onNodeEnter(layer.n)}
                    onFocus={() => onNodeEnter(layer.n)}
                    onClick={() => onNodeClick(layer.n)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onNodeClick(layer.n);
                      }
                    }}
                  />
                  <circle className="arch-graph-node-halo" r={NODE_R + 10} />
                  <circle
                    className="arch-graph-node-body"
                    r={NODE_R}
                    filter="url(#arch-depth)"
                  />
                  <text className="arch-graph-node-n" x={0} y={0}>
                    {String(layer.n).padStart(2, "0")}
                  </text>
                  <text className="arch-graph-node-label" x={0} y={NODE_R + 22}>
                    {layer.name}
                  </text>
                </motion.g>
              );
            })}
          </g>
        </svg>

        {/* Inline note-card overlay — HTML in an absolute-positioned layer
            so it can carry rich typography. Motion LayoutGroup gives us a
            shared-layout transition as the card glides between nodes. */}
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {shownLayer && notePlacementCoords ? (
              <motion.div
                key={shownLayer.n}
                layout
                className={`arch-graph-note-inline arch-graph-note-inline--${notePlacementCoords.anchor}`}
                style={{
                  left: notePlacementCoords.left,
                  top: notePlacementCoords.top,
                  width: NOTE_W,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <div className="arch-graph-note-head">
                  <span className="arch-graph-note-n">
                    +{" "}{String(shownLayer.n).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="arch-graph-note-name">{shownLayer.name}</div>
                    <div className="arch-graph-note-caption">{shownLayer.caption}</div>
                  </div>
                </div>
                <p className="arch-graph-note-body">{shownLayer.detail}</p>
                <ul className="arch-graph-note-proof">
                  {shownLayer.proof.slice(0, 3).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {pinned === shownLayer.n ? (
                  <div className="arch-graph-note-pinbar">pinned · press esc to release</div>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {/* Ambient hint bar below the canvas */}
      <div className="arch-graph-hint">
        <span className="arch-graph-hint-line">
          Hover any node · click to pin · <em style={{ fontStyle: "italic", color: "var(--gold)" }}>esc</em> to release
        </span>
      </div>
    </div>
  );
}
