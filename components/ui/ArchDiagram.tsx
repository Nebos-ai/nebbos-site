import type { CSSProperties, ReactNode } from "react";

/**
 * ArchDiagram · doctrine v2 §5 Node G.
 *
 * Composable primitives for inline-SVG architecture diagrams. Uses the
 * Trust 3A stroke weight, 1px orange edges, orange-plus at anchor points.
 * Server-rendered, static-then-draw-on via `.plus-marker--animated` when
 * wrapped in ScrollReveal.
 *
 * Composition:
 *   <ArchDiagram viewBox="0 0 480 320">
 *     <Node x={40}  y={40}  label="Cradle" />
 *     <Node x={200} y={40}  label="Shell" />
 *     <Node x={360} y={40}  label="Pearl" />
 *     <Edge from={{x:120, y:56}} to={{x:200, y:56}} />
 *     <PlusAnchor x={200} y={56} />
 *   </ArchDiagram>
 *
 * Tokens consumed:
 *   var(--ink)    — text + primary stroke
 *   var(--ink-2)  — secondary label
 *   var(--accent-2) — orange edges + plus anchors
 *   var(--rule)   — hairline scaffolding
 *   var(--paper-2) — node fill
 */
type Point = { x: number; y: number };

type ArchDiagramProps = {
  children: ReactNode;
  viewBox?: string;
  className?: string;
  /** Optional title/desc for a11y. Rendered as inline <title>/<desc>. */
  title?: string;
  description?: string;
  style?: CSSProperties;
};

export function ArchDiagram({
  children,
  viewBox = "0 0 480 320",
  className,
  title,
  description,
  style,
}: ArchDiagramProps) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        color: "var(--ink)",
        fontFamily: "var(--font-mono)",
        ...style,
      }}
      role={title ? "img" : "presentation"}
      aria-labelledby={title ? "arch-title" : undefined}
      aria-describedby={description ? "arch-desc" : undefined}
    >
      {title && <title id="arch-title">{title}</title>}
      {description && <desc id="arch-desc">{description}</desc>}
      {children}
    </svg>
  );
}

/**
 * Node — a labeled rectangle in the diagram. Cut-corner top-right per the
 * signature Delta-brief device. Paper-2 fill, ink stroke, mono label.
 */
type NodeProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  sublabel?: string;
  variant?: "default" | "accent";
};

export function Node({
  x,
  y,
  width = 120,
  height = 64,
  label,
  sublabel,
  variant = "default",
}: NodeProps) {
  const strokeColor = variant === "accent" ? "var(--accent-2)" : "var(--ink-2)";
  const fill = "var(--paper-2)";
  // Cut-corner via clip-path-in-SVG: a polygon with the top-right corner beveled.
  const cutSize = 12;
  const points = [
    `${x},${y}`,
    `${x + width - cutSize},${y}`,
    `${x + width},${y + cutSize}`,
    `${x + width},${y + height}`,
    `${x},${y + height}`,
  ].join(" ");
  const labelY = sublabel ? y + height / 2 - 4 : y + height / 2 + 4;
  const sublabelY = y + height / 2 + 12;

  return (
    <g>
      <polygon
        points={points}
        fill={fill}
        stroke={strokeColor}
        strokeWidth={1}
      />
      <text
        x={x + width / 2}
        y={labelY}
        textAnchor="middle"
        fill="var(--ink)"
        fontSize={12}
        fontFamily="var(--font-mono)"
        fontWeight={500}
        letterSpacing="0.06em"
        style={{ textTransform: "uppercase" }}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + width / 2}
          y={sublabelY}
          textAnchor="middle"
          fill="var(--ink-3)"
          fontSize={10}
          fontFamily="var(--font-mono)"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

/**
 * Edge — a hairline connector between two points. Orange by default (the
 * Nebbos signature edge color). Straight line; L-shaped elbow if `elbow`
 * provided.
 */
type EdgeProps = {
  from: Point;
  to: Point;
  variant?: "accent" | "muted";
  /** Optional midpoint routing — draws an L-shape through this point. */
  elbow?: Point;
  /** Direction arrow on the destination end. */
  arrow?: boolean;
};

export function Edge({ from, to, variant = "accent", elbow, arrow = false }: EdgeProps) {
  const strokeColor = variant === "accent" ? "var(--accent-2)" : "var(--rule)";
  const d = elbow
    ? `M ${from.x} ${from.y} L ${elbow.x} ${elbow.y} L ${to.x} ${to.y}`
    : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1}
        strokeLinejoin="miter"
        strokeLinecap="butt"
        markerEnd={arrow ? "url(#nebbos-arrow)" : undefined}
      />
      {arrow && (
        <defs>
          <marker
            id="nebbos-arrow"
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={5}
            markerHeight={5}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill={strokeColor} />
          </marker>
        </defs>
      )}
    </g>
  );
}

/**
 * PlusAnchor — the signature Nebbos orange plus at a specific point.
 * 12px cross (6×1 horizontal + 1×6 vertical intersecting at (x, y)).
 * Attach at grid intersections, node origins, connection points.
 */
type PlusAnchorProps = {
  x: number;
  y: number;
  size?: number;
};

export function PlusAnchor({ x, y, size = 12 }: PlusAnchorProps) {
  const half = size / 2;
  return (
    <g fill="var(--accent-2)">
      <rect x={x - half} y={y - 0.5} width={size} height={1} />
      <rect x={x - 0.5} y={y - half} width={1} height={size} />
    </g>
  );
}
