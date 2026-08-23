/**
 * CountCircles · v1 · 2026-08-23
 *
 * Founder direction: "instead of numbers can we create svg of the flower
 * of life circles so if the number is 5 it's five circles."
 *
 * Renders N stroked rings in a flower-of-life-inspired hex packing (same
 * geometric DNA as the Nebbos mark, which is 19 overlapping circles in
 * flower-of-life). N=1..19 supported. Stroke color takes currentColor so
 * it inherits the parent&rsquo;s color (usually gold on light, paper on dark).
 *
 * Position table follows classic flower-of-life packing:
 *   Position 0        · center
 *   Positions 1-6     · inner hex (angles 0/60/120/180/240/300 at radius r)
 *   Positions 7-12    · outer hex (same angles at radius 2r, hex vertices)
 *   Positions 13-18   · outer hex edges (angles 30/90/... at radius √3 * r)
 */

type Props = {
  n: number;
  size?: number;        // pixel size of SVG (width + height)
  strokeWidth?: number; // ring stroke, defaults to 2
  className?: string;
};

const R = 8;             // ring radius (in SVG units)
const SPACING = R * 1.7; // center-to-center distance between adjacent rings
const OUTER_R = SPACING * Math.sqrt(3); // outer hex edge distance

// Pre-computed positions in flower-of-life packing (up to 19 rings).
// Center is (0, 0). SVG viewBox will be recentered.
const POSITIONS: Array<[number, number]> = [
  // Center
  [0, 0],
  // Inner hex (positions 1-6, angles 0, 60, 120, 180, 240, 300 at SPACING)
  [SPACING, 0],
  [SPACING * Math.cos(Math.PI / 3), SPACING * Math.sin(Math.PI / 3)],
  [SPACING * Math.cos((2 * Math.PI) / 3), SPACING * Math.sin((2 * Math.PI) / 3)],
  [-SPACING, 0],
  [SPACING * Math.cos((4 * Math.PI) / 3), SPACING * Math.sin((4 * Math.PI) / 3)],
  [SPACING * Math.cos((5 * Math.PI) / 3), SPACING * Math.sin((5 * Math.PI) / 3)],
  // Outer hex vertices (positions 7-12, angles 0, 60, ... at 2 * SPACING)
  [2 * SPACING, 0],
  [2 * SPACING * Math.cos(Math.PI / 3), 2 * SPACING * Math.sin(Math.PI / 3)],
  [2 * SPACING * Math.cos((2 * Math.PI) / 3), 2 * SPACING * Math.sin((2 * Math.PI) / 3)],
  [-2 * SPACING, 0],
  [2 * SPACING * Math.cos((4 * Math.PI) / 3), 2 * SPACING * Math.sin((4 * Math.PI) / 3)],
  [2 * SPACING * Math.cos((5 * Math.PI) / 3), 2 * SPACING * Math.sin((5 * Math.PI) / 3)],
  // Outer hex edges (positions 13-18, angles 30, 90, 150, 210, 270, 330 at OUTER_R)
  [OUTER_R * Math.cos(Math.PI / 6), OUTER_R * Math.sin(Math.PI / 6)],
  [OUTER_R * Math.cos(Math.PI / 2), OUTER_R * Math.sin(Math.PI / 2)],
  [OUTER_R * Math.cos((5 * Math.PI) / 6), OUTER_R * Math.sin((5 * Math.PI) / 6)],
  [OUTER_R * Math.cos((7 * Math.PI) / 6), OUTER_R * Math.sin((7 * Math.PI) / 6)],
  [OUTER_R * Math.cos((3 * Math.PI) / 2), OUTER_R * Math.sin((3 * Math.PI) / 2)],
  [OUTER_R * Math.cos((11 * Math.PI) / 6), OUTER_R * Math.sin((11 * Math.PI) / 6)],
];

export function CountCircles({ n, size = 64, strokeWidth = 2, className }: Props) {
  const count = Math.max(1, Math.min(19, Math.floor(n)));
  const positions = POSITIONS.slice(0, count);

  // Compute viewBox from positions + ring radius so all rings fit
  const pad = R + strokeWidth;
  const minX = Math.min(...positions.map(([x]) => x)) - pad;
  const maxX = Math.max(...positions.map(([x]) => x)) + pad;
  const minY = Math.min(...positions.map(([, y]) => y)) - pad;
  const maxY = Math.max(...positions.map(([, y]) => y)) + pad;
  const w = maxX - minX;
  const h = maxY - minY;

  return (
    <svg
      className={className}
      width={size}
      height={size * (h / w)}
      viewBox={`${minX} ${minY} ${w} ${h}`}
      role="img"
      aria-label={`${count}`}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {positions.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}
