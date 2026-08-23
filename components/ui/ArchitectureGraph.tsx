"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  BANDS,
  EDGES,
  LAYERS,
  NODE_POSITIONS,
  edgePath,
  type Layer,
} from "@/lib/architecture";

/**
 * ArchitectureGraph · Wave 3i · founder feedback 2026-08-23:
 *   "i want it full page its still 2d this needs to fele imergive"
 *
 * Full-viewport, edge-to-edge, 3D-perspective knowledge graph. Nodes lift
 * toward the camera on hover; the whole graph does a mouse-tracked parallax
 * tilt (max ±6°); an ambient radial-gradient wash + SVG glow filter give
 * real light-through-space depth cues. Motion springs drive the camera.
 *
 * Techniques (no WebGL — just CSS 3D + motion + SVG filters):
 *  - `perspective: 1600px` on the outer wrapper; `transform-style: preserve-3d`
 *    on the SVG so nested transforms compose as real 3D
 *  - `useMotionValue` on mouse position → spring-eased rotateX/rotateY on
 *    the SVG so the parallax feels weighted, not synthetic
 *  - Active node scales AND translates toward the viewer (translateZ +20px)
 *    while non-active nodes recede (translateZ -10px + opacity dim +
 *    saturation drop)
 *  - Radial gradient background inside the canvas — light source top-right —
 *    creates atmospheric depth
 *  - SVG feGaussianBlur glow on edges when highlighted; feDropShadow on nodes
 *  - LayoutGroup + `layout` on the inline note-card so it glides between
 *    hover targets via shared-layout physics
 */

const VB_W = 1400;
const VB_H = 1000;
const NODE_R = 34;

const NOTE_W = 320;
const NOTE_H_MAX = 240;
const NOTE_GAP = 26;

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

function jitterFor(n: number): { x: number; y: number } {
  const seed = (n * 2654435761) % 2 ** 32;
  const jx = (((seed >> 8) & 0xff) / 255 - 0.5) * 32;
  const jy = (((seed >> 16) & 0xff) / 255 - 0.5) * 32;
  return { x: jx, y: jy };
}

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

function notePlacement(
  nodeX: number,
  nodeY: number,
  containerW: number,
  containerH: number,
): { left: number; top: number; anchor: "left" | "right" } {
  const wantsRight = nodeX < VB_W / 2;
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

  // Mouse-tracked parallax — mouse xy relative to canvas center → tilt.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotY = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), { stiffness: 90, damping: 20, mass: 0.5 });
  const rotX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), { stiffness: 90, damping: 20, mass: 0.5 });

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

  const onCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Normalize mouse position to [-1, 1] relative to canvas center.
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  }, [mouseX, mouseY]);

  const onCanvasMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setActive(null);
  }, [mouseX, mouseY]);

  const notePlacementCoords = useMemo(() => {
    if (!shownLayer || size.w === 0) return null;
    const pos = nodePos(shownLayer.n);
    return notePlacement(pos.x, pos.y, size.w, size.h);
  }, [shownLayer, size.w, size.h]);

  return (
    <div className="arch-graph-canvas" ref={rootRef}>
      <div
        className={`arch-graph arch-graph--immersive${visible ? " is-visible" : ""}`}
        ref={canvasRef}
        onMouseMove={onCanvasMouseMove}
        onMouseLeave={onCanvasMouseLeave}
      >
        {/* Ambient depth wash — radial gradient behind everything */}
        <div className="arch-graph-ambient" aria-hidden />
        <div className="arch-graph-vignette" aria-hidden />

        <motion.svg
          className="arch-graph-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Nebbos 15-layer architecture as a knowledge graph"
          preserveAspectRatio="xMidYMid meet"
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 1600,
            transformStyle: "preserve-3d",
          }}
        >
          <defs>
            <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="arch-depth" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#14120F" floodOpacity="0.14" />
            </filter>
            <filter id="arch-depth-lift" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#F6A03F" floodOpacity="0.35" />
            </filter>
            <radialGradient id="arch-node-sphere" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
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
                  transform={`translate(56 ${y})`}
                  style={{ ["--band-i" as string]: i }}
                >
                  <text className="band-n" x={0} y={-8}>{`0${band.n}`}</text>
                  <text className="band-name" x={0} y={16}>{band.name}</text>
                </g>
              );
            })}
          </g>

          {/* Edges — filter-glow when highlighted */}
          <g className="arch-graph-edges">
            {EDGES.map((edge, i) => {
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
                  filter={isHighlighted ? "url(#arch-glow)" : undefined}
                  style={{ ["--graph-i" as string]: i * 22 }}
                />
              );
            })}
          </g>

          {/* Nodes — 3D lift on active via translateZ */}
          <g className="arch-graph-nodes" style={{ transformStyle: "preserve-3d" }}>
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
                    transformStyle: "preserve-3d",
                  }}
                  initial={{
                    x: pos.x + jitter.x,
                    y: pos.y + jitter.y,
                    z: 0,
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={
                    visible
                      ? {
                          x: pos.x,
                          y: pos.y,
                          z: isActive ? 40 : isDimmed ? -18 : 0,
                          opacity: isDimmed ? 0.4 : 1,
                          scale: isActive ? 1.14 : 1,
                        }
                      : { x: pos.x + jitter.x, y: pos.y + jitter.y, z: 0, opacity: 0, scale: 0.7 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    mass: 0.9,
                    delay: visible ? 0.05 + i * 0.032 : 0,
                  }}
                >
                  <circle
                    className="arch-graph-node-hit"
                    r={NODE_R + 16}
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
                  <circle className="arch-graph-node-halo" r={NODE_R + 12} />
                  <circle
                    className="arch-graph-node-body"
                    r={NODE_R}
                    filter={isActive ? "url(#arch-depth-lift)" : "url(#arch-depth)"}
                  />
                  {/* Spherical highlight — gives the node a 3D orb feel */}
                  <circle
                    className="arch-graph-node-sphere"
                    r={NODE_R}
                    fill="url(#arch-node-sphere)"
                    pointerEvents="none"
                  />
                  <text className="arch-graph-node-n" x={0} y={0}>
                    {String(layer.n).padStart(2, "0")}
                  </text>
                  <text className="arch-graph-node-label" x={0} y={NODE_R + 24}>
                    {layer.name}
                  </text>
                </motion.g>
              );
            })}
          </g>
        </motion.svg>

        {/* Inline note-card overlay */}
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
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -6 }}
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

      <div className="arch-graph-hint">
        <span className="arch-graph-hint-line">
          Move the mouse for depth · hover a node · click to pin · <em style={{ fontStyle: "italic", color: "var(--gold)" }}>esc</em> to release
        </span>
      </div>
    </div>
  );
}
