"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ACTORS,
  ECO_ADJACENCY,
  ECOSYSTEMS,
  EDGES,
  PRIMITIVES,
  type EcoActor,
  type NebbosPrimitive,
} from "@/lib/ecosystems";

/**
 * EcosystemBridge · Wave 3e · founder directive 2026-08-23:
 * "show the two categories and make a map showing two ecosystems and
 *  nebbos being central living in both. we need to think of a creative
 *  way to show this on the site."
 *
 * SVG bridge visual: two flanking ecosystem clusters (governance left,
 * training right) rendered as quiet hairline outlined circles + a central
 * Nebbos spine rendered as bright orange filled circles. Curved edges
 * connect each actor to the primitive(s) they consume.
 *
 * Nebbos = the one bright thing in the middle everyone touches.
 *
 * Interactions:
 *  - Hover any node → its edges + connected nodes highlight orange;
 *    detail rail below updates.
 *  - Click to pin. Escape to unpin.
 *  - Entry: staggered fade+scale from center outward via motion springs
 *    (Wave 2E lineage). Reduced-motion respected.
 */

const VB_W = 1000;
const VB_H = 620;

// X positions of the three columns:
const X_LEFT = 210;
const X_CENTER = 500;
const X_RIGHT = 790;

// Vertical range for cluster placement (mapping y ∈ [0,1] → SVG y).
const Y_TOP = 60;
const Y_BOTTOM = 560;
const yPx = (y: number) => Y_TOP + y * (Y_BOTTOM - Y_TOP);

const ACTOR_R = 12;
const PRIM_R = 16;

function actorX(side: EcoActor["side"]): number {
  return side === "governance" ? X_LEFT : X_RIGHT;
}

function bridgePath(actor: EcoActor, prim: NebbosPrimitive): string {
  const ax = actorX(actor.side);
  const ay = yPx(actor.y);
  const bx = X_CENTER;
  const by = yPx(prim.y);
  const dir = actor.side === "governance" ? 1 : -1;
  const cx1 = ax + dir * 90;
  const cy1 = ay;
  const cx2 = bx - dir * 90;
  const cy2 = by;
  return `M ${ax} ${ay} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${bx} ${by}`;
}

export function EcosystemBridge() {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const shownId = pinned ?? active;

  const shownDetail = useMemo(() => {
    if (!shownId) return null;
    const actor = ACTORS.find((a) => a.id === shownId);
    if (actor) {
      const connected = Array.from(ECO_ADJACENCY[actor.id] ?? []).map(
        (id) => PRIMITIVES.find((p) => p.id === id)?.name,
      ).filter(Boolean) as string[];
      return { kind: "actor" as const, actor, connected };
    }
    const prim = PRIMITIVES.find((p) => p.id === shownId);
    if (prim) {
      const connected = Array.from(ECO_ADJACENCY[prim.id] ?? []).map(
        (id) => ACTORS.find((a) => a.id === id),
      ).filter(Boolean) as EcoActor[];
      return { kind: "primitive" as const, prim, connected };
    }
    return null;
  }, [shownId]);

  const highlightedNodes = useMemo(() => {
    if (!shownId) return new Set<string>();
    const s = new Set<string>([shownId]);
    for (const nb of ECO_ADJACENCY[shownId] ?? []) s.add(nb);
    return s;
  }, [shownId]);

  const highlightedEdges = useMemo(() => {
    if (!shownId) return new Set<number>();
    const idxs = new Set<number>();
    EDGES.forEach((e, i) => {
      if (e.from === shownId || e.to === shownId) idxs.add(i);
    });
    return idxs;
  }, [shownId]);

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

  const onEnter = useCallback((id: string) => setActive(id), []);
  const onLeave = useCallback(() => setActive(null), []);
  const onClick = useCallback(
    (id: string) => setPinned((cur) => (cur === id ? null : id)),
    [],
  );

  return (
    <div className="eco-bridge-wrap" ref={rootRef}>
      {/* Mobile fallback — below 900px the SVG collapses to a clean HTML list.
          Same data, adapted to a phone-friendly layout. */}
      <div className="eco-bridge-mobile" aria-label="Nebbos ecosystem map (mobile view)">
        <div className="eco-bridge-mobile-prims">
          <div className="eco-bridge-mobile-heading">
            <span className="section-numeral"><span className="n">·</span>Nebbos</span>
          </div>
          <ul>
            {PRIMITIVES.map((p) => (
              <li key={p.id}>
                <span className="eco-prim-chip">{p.name}</span>
                <span className="eco-prim-chip-caption">{p.caption}</span>
              </li>
            ))}
          </ul>
        </div>
        {(["governance", "training"] as const).map((side) => (
          <div key={side} className={`eco-bridge-mobile-side eco-bridge-mobile-side--${side}`}>
            <div className="eco-bridge-mobile-heading">
              <span className="section-numeral">
                <span className="n">{side === "governance" ? "01" : "02"}</span>
                <span aria-hidden>·</span>
                {ECOSYSTEMS[side].title}
              </span>
            </div>
            <p className="eco-bridge-mobile-strap">{ECOSYSTEMS[side].strap}</p>
            <ul>
              {ACTORS.filter((a) => a.side === side).map((a) => {
                const connected = Array.from(ECO_ADJACENCY[a.id] ?? [])
                  .map((id) => PRIMITIVES.find((p) => p.id === id)?.name)
                  .filter(Boolean) as string[];
                return (
                  <li key={a.id}>
                    <div className="eco-actor-row">
                      <span className="eco-actor-row-name">{a.name}</span>
                      <span className="eco-actor-row-role">{a.role}</span>
                    </div>
                    <div className="eco-actor-row-consumes">
                      → <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{connected.join(" · ")}</em>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className={`eco-bridge${visible ? " is-visible" : ""}`}>
        <svg
          className="eco-bridge-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Nebbos at the intersection of AI governance and model training ecosystems"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Ecosystem column headers (quiet mono) */}
          <g className="eco-headers" aria-hidden="true">
            <text className="eco-header eco-header--gov"      x={X_LEFT}    y={30}>{ECOSYSTEMS.governance.title}</text>
            <text className="eco-header eco-header--nebbos"   x={X_CENTER}  y={30}>NEBBOS</text>
            <text className="eco-header eco-header--training" x={X_RIGHT}   y={30}>{ECOSYSTEMS.training.title}</text>
          </g>

          {/* Edges — drawn behind nodes */}
          <g className="eco-bridge-edges">
            {EDGES.map((edge, i) => {
              const actor = ACTORS.find((a) => a.id === edge.from);
              const prim = PRIMITIVES.find((p) => p.id === edge.to);
              if (!actor || !prim) return null;
              const isHi = highlightedEdges.has(i);
              return (
                <path
                  key={`${edge.from}-${edge.to}-${i}`}
                  className={`eco-bridge-edge${isHi ? " is-highlighted" : ""}`}
                  d={bridgePath(actor, prim)}
                  fill="none"
                  style={{ ["--eco-i" as string]: i * 30 }}
                />
              );
            })}
          </g>

          {/* Central Nebbos spine — bright orange filled circles */}
          <g className="eco-bridge-prims">
            {PRIMITIVES.map((prim, i) => {
              const isActive = shownId === prim.id;
              const isHi = highlightedNodes.has(prim.id);
              return (
                <motion.g
                  key={prim.id}
                  className={`eco-node eco-node--prim${isActive ? " is-active" : ""}${isHi ? " is-highlighted" : ""}`}
                  initial={{ opacity: 0, scale: 0.7, x: X_CENTER, y: yPx(prim.y) }}
                  animate={
                    visible
                      ? { opacity: 1, scale: 1, x: X_CENTER, y: yPx(prim.y) }
                      : { opacity: 0, scale: 0.7, x: X_CENTER, y: yPx(prim.y) }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                    delay: visible ? 0.05 + i * 0.06 : 0,
                  }}
                  whileHover={{ scale: 1.08 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  <circle
                    className="eco-hit"
                    r={PRIM_R + 12}
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={`Nebbos primitive: ${prim.name}. ${prim.caption}`}
                    aria-pressed={pinned === prim.id}
                    onMouseEnter={() => onEnter(prim.id)}
                    onFocus={() => onEnter(prim.id)}
                    onMouseLeave={onLeave}
                    onBlur={onLeave}
                    onClick={() => onClick(prim.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClick(prim.id);
                      }
                    }}
                  />
                  <circle className="eco-prim-body" r={PRIM_R} />
                  <text className="eco-prim-label" x={0} y={PRIM_R + 18}>{prim.name}</text>
                </motion.g>
              );
            })}
          </g>

          {/* Flanking ecosystem actors — hairline outlined circles */}
          <g className="eco-bridge-actors">
            {ACTORS.map((actor, i) => {
              const isActive = shownId === actor.id;
              const isHi = highlightedNodes.has(actor.id);
              const x = actorX(actor.side);
              const y = yPx(actor.y);
              const labelAnchor = actor.side === "governance" ? "end" : "start";
              const labelDx = actor.side === "governance" ? -(ACTOR_R + 10) : ACTOR_R + 10;
              return (
                <motion.g
                  key={actor.id}
                  className={`eco-node eco-node--actor eco-node--${actor.side}${isActive ? " is-active" : ""}${isHi ? " is-highlighted" : ""}`}
                  initial={{ opacity: 0, scale: 0.7, x, y }}
                  animate={visible ? { opacity: 1, scale: 1, x, y } : { opacity: 0, scale: 0.7, x, y }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: visible ? 0.15 + i * 0.045 : 0,
                  }}
                  whileHover={{ scale: 1.1 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  <circle
                    className="eco-hit"
                    r={ACTOR_R + 12}
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={`${ECOSYSTEMS[actor.side].title} actor: ${actor.name}. ${actor.role}`}
                    aria-pressed={pinned === actor.id}
                    onMouseEnter={() => onEnter(actor.id)}
                    onFocus={() => onEnter(actor.id)}
                    onMouseLeave={onLeave}
                    onBlur={onLeave}
                    onClick={() => onClick(actor.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onClick(actor.id);
                      }
                    }}
                  />
                  <circle className="eco-actor-body" r={ACTOR_R} />
                  <text className="eco-actor-label" x={labelDx} y={4} textAnchor={labelAnchor}>
                    {actor.name}
                  </text>
                </motion.g>
              );
            })}
          </g>

          {/* Ecosystem straps at the bottom */}
          <g className="eco-straps" aria-hidden="true">
            <text className="eco-strap" x={X_LEFT}  y={VB_H - 12} textAnchor="middle">{ECOSYSTEMS.governance.strap}</text>
            <text className="eco-strap" x={X_RIGHT} y={VB_H - 12} textAnchor="middle">{ECOSYSTEMS.training.strap}</text>
          </g>
        </svg>
      </div>

      {/* Detail rail — updates as you hover/pin */}
      <AnimatePresence mode="wait">
        {shownDetail ? (
          <motion.div
            className="eco-bridge-detail"
            key={shownId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            {shownDetail.kind === "actor" ? (
              <>
                <span className="eco-bridge-detail-eyebrow">
                  {ECOSYSTEMS[shownDetail.actor.side].title} · {shownDetail.actor.role}
                </span>
                <span className="eco-bridge-detail-name">{shownDetail.actor.name}</span>
                <span className="eco-bridge-detail-body">
                  Consumes Nebbos:{" "}
                  <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                    {shownDetail.connected.join(" · ")}
                  </em>
                </span>
              </>
            ) : (
              <>
                <span className="eco-bridge-detail-eyebrow">Nebbos primitive</span>
                <span className="eco-bridge-detail-name">{shownDetail.prim.name}</span>
                <span className="eco-bridge-detail-body">
                  {shownDetail.prim.caption} · consumed by{" "}
                  <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                    {shownDetail.connected.map((a) => a.name).join(" · ")}
                  </em>
                </span>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="eco-bridge-detail eco-bridge-detail--hint"
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="eco-bridge-detail-eyebrow">Two ecosystems · one substrate</span>
            <span className="eco-bridge-detail-body">
              Hover any node. Governance actors on the left. Training-data actors
              on the right. Every one of them terminates at a{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Nebbos primitive</em> in the middle.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
