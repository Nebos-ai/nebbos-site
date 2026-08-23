"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { LAYERS, layersByBandTopDown, type Layer } from "@/lib/architecture";
import { PlusMark } from "@/components/ui/PlusMark";

/**
 * ArchitectureGrid · doctrine v2 Shape 3 · the signature Nebbos hero visual.
 *
 * A 5-band × 3-layer interactive grid rendering the whole system in one glance.
 * Hover any cell to see what that layer does + capability proof-points in the
 * side panel. Click to pin. Escape to unpin. Arrow keys navigate. Tab-order
 * matches visual order.
 *
 * All content is illustrative — no internal identifiers, no real credentials.
 *
 * Layout:
 *   ┌────────────────────────────┬─────────────────────┐
 *   │   5 × 3 GRID  (Band 5 top) │   DETAIL PANEL      │
 *   │                            │                     │
 *   └────────────────────────────┴─────────────────────┘
 *   Mobile: grid stacks full-width, detail expands inline below hovered cell.
 */

export function ArchitectureGrid() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const bands = useMemo(() => layersByBandTopDown(), []);
  const shownLayer: Layer | null = useMemo(() => {
    const n = pinned ?? active ?? 1; // default: Band 1 layer 1 (Data) — foundation
    return LAYERS.find((l) => l.n === n) ?? null;
  }, [active, pinned]);

  // Escape unpins. Arrow keys navigate when a cell is focused.
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

  const onCellFocus = useCallback((n: number) => {
    setActive(n);
  }, []);
  const onCellBlur = useCallback(() => {
    setActive(null);
  }, []);
  const onCellClick = useCallback((n: number) => {
    setPinned((cur) => (cur === n ? null : n));
  }, []);

  return (
    <div className="arch-grid-wrap">
      <div
        ref={gridRef}
        className="arch-grid"
        aria-label="Nebbos 15-layer architecture"
      >
        {bands.map(({ band, layers }) => (
          <div key={band.n} className="arch-band">
            <div className="arch-band-label" aria-hidden="true">
              <span className="arch-band-n">{band.n}</span>
              <span className="arch-band-name">{band.name}</span>
            </div>
            {layers.map((layer) => {
              const isActive = shownLayer?.n === layer.n;
              const isPinned = pinned === layer.n;
              return (
                <button
                  key={layer.n}
                  type="button"
                  aria-label={`Layer ${layer.n}: ${layer.name}. ${layer.caption}`}
                  aria-pressed={isPinned}
                  aria-current={isActive ? "true" : undefined}
                  className={`arch-cell${isActive ? " is-active" : ""}${isPinned ? " is-pinned" : ""}`}
                  onMouseEnter={() => onCellFocus(layer.n)}
                  onFocus={() => onCellFocus(layer.n)}
                  onMouseLeave={onCellBlur}
                  onBlur={onCellBlur}
                  onClick={() => onCellClick(layer.n)}
                >
                  <span className="arch-cell-n">
                    <PlusMark size="xs" color="currentColor" />
                    {String(layer.n).padStart(2, "0")}
                  </span>
                  <span className="arch-cell-name">{layer.name}</span>
                  <span className="arch-cell-caption">{layer.caption}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <aside className="arch-detail" aria-live="polite">
        {shownLayer ? <ArchDetail layer={shownLayer} pinned={pinned !== null} /> : null}
      </aside>
    </div>
  );
}

function ArchDetail({ layer, pinned }: { layer: Layer; pinned: boolean }) {
  return (
    <div className="arch-detail-inner" key={layer.n}>
      <div className="arch-detail-header">
        <span className="arch-detail-n">
          <PlusMark size="sm" color="currentColor" />
          {String(layer.n).padStart(2, "0")}
        </span>
        <div>
          <div className="arch-detail-name">{layer.name}</div>
          <div className="arch-detail-caption">{layer.caption}</div>
        </div>
      </div>
      <p className="arch-detail-body">{layer.detail}</p>
      <ul className="arch-detail-proof">
        {layer.proof.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      {pinned ? (
        <div className="arch-detail-pinned">pinned · press esc to release</div>
      ) : (
        <div className="arch-detail-hint">click to pin · hover any cell</div>
      )}
    </div>
  );
}
