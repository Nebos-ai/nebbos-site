import { ArchDiagram, Node, Edge, PlusAnchor } from "./ArchDiagram";

/**
 * HeroDiagram · doctrine v2 §5 Node G. THE signature Nebbos visual.
 *
 * Governance-substrate topology as inline SVG. Renders on the home hero
 * (Anthropic §11 vacated the "diagram-first" axis — this is how we occupy it).
 *
 * Composition:
 *   ┌─ Account ─┐
 *   │           │──── your ─── Cradle ─── memory
 *   └───────────┘         └── Shell ─── department
 *                                └── Pearl ─── agent
 *                                     └── Tideline ─── audit
 *
 * Trust 3A stroke. Orange edges. Orange-plus at every junction.
 * Static by default. When wrapped in ScrollReveal, orange-plus glyphs
 * draw on scroll-in (Wave 2A also ships the .plus-marker--animated CSS).
 *
 * No motion library. No canvas. No JS runtime cost. Ships in the RSC.
 */
export function HeroDiagram({ className }: { className?: string }) {
  return (
    <ArchDiagram
      viewBox="0 0 480 320"
      className={className}
      title="Nebbos governance substrate"
      description="Account tenant connects to Cradle (memory), Shell (department container), Pearl (agent), and Tideline (audit) — a compounding architecture owned by the customer."
    >
      {/* --- Node column: Account (root) --- */}
      <Node x={16} y={132} width={104} height={56} label="Account" sublabel="tenant" />
      <PlusAnchor x={120} y={160} />

      {/* --- Edge: Account → Cradle --- */}
      <Edge from={{ x: 120, y: 160 }} to={{ x: 200, y: 56 }} variant="accent" />

      {/* --- Node: Cradle (memory) --- */}
      <Node x={200} y={28} width={120} height={56} label="Cradle" sublabel="memory" variant="accent" />
      <PlusAnchor x={200} y={56} />
      <PlusAnchor x={320} y={56} />

      {/* --- Edge: Cradle → outcome --- */}
      <Edge from={{ x: 320, y: 56 }} to={{ x: 420, y: 56 }} variant="muted" />
      <text
        x={340}
        y={44}
        fill="var(--ink-3)"
        fontSize={10}
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
        style={{ textTransform: "uppercase" }}
      >
        compounding
      </text>

      {/* --- Edge: Account → Shell --- */}
      <Edge from={{ x: 120, y: 160 }} to={{ x: 200, y: 160 }} variant="accent" />

      {/* --- Node: Shell (department) --- */}
      <Node x={200} y={132} width={120} height={56} label="Shell" sublabel="department" />
      <PlusAnchor x={200} y={160} />
      <PlusAnchor x={320} y={160} />

      {/* --- Edge: Shell → Pearl --- */}
      <Edge from={{ x: 320, y: 160 }} to={{ x: 380, y: 160 }} variant="accent" />

      {/* --- Node: Pearl (agent) --- */}
      <Node x={380} y={132} width={84} height={56} label="Pearl" sublabel="agent" />
      <PlusAnchor x={380} y={160} />

      {/* --- Edge: Account → Tideline --- */}
      <Edge from={{ x: 120, y: 160 }} to={{ x: 200, y: 264 }} variant="accent" />

      {/* --- Node: Tideline (audit) --- */}
      <Node x={200} y={236} width={120} height={56} label="Tideline" sublabel="audit" variant="accent" />
      <PlusAnchor x={200} y={264} />
      <PlusAnchor x={320} y={264} />

      {/* --- Edge: Tideline → tamper-evident --- */}
      <Edge from={{ x: 320, y: 264 }} to={{ x: 420, y: 264 }} variant="muted" />
      <text
        x={340}
        y={252}
        fill="var(--ink-3)"
        fontSize={10}
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
        style={{ textTransform: "uppercase" }}
      >
        tamper-evident
      </text>

      {/* --- Bottom rule + caption --- */}
      <line x1={16} y1={310} x2={464} y2={310} stroke="var(--rule)" strokeWidth={1} />
      <text
        x={16}
        y={306}
        fill="var(--ink-3)"
        fontSize={9}
        fontFamily="var(--font-mono)"
        letterSpacing="0.14em"
        style={{ textTransform: "uppercase" }}
      >
        Owned by you · portable at any time · compounding every quarter
      </text>
    </ArchDiagram>
  );
}
