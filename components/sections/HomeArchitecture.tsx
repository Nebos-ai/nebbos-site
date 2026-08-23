import { SectionNumeral } from "@/components/ui/SectionNumeral";
import { ArchitectureGraph } from "@/components/ui/ArchitectureGraph";

/**
 * FRAME · Home / 01 · The architecture
 * PARENT · app/page.tsx (/)
 * PURPOSE · The site's signature interactive visual. Full-viewport section
 *           with the 15-layer knowledge graph as the star. Header stacked
 *           ABOVE the graph canvas (never overlapping). Graph fills the
 *           remaining viewport.
 *
 * Layout:
 *   ┌──────────────────────────────────────────┐
 *   │  [Header]                                │  ← stacked, not overlaid
 *   │  01 · The architecture                   │
 *   │  Fifteen layers. One system. Owned…      │
 *   │  Move mouse for depth. Hover any node…   │
 *   ├──────────────────────────────────────────┤
 *   │                                          │
 *   │   [ArchitectureGraph canvas]             │  ← fills flex-1
 *   │   3D perspective, mouse parallax,        │
 *   │   inline note-cards at each node         │
 *   │                                          │
 *   └──────────────────────────────────────────┘
 */
export function HomeArchitecture() {
  return (
    <section className="arch-full-page">
      <div className="arch-full-page-header">
        <SectionNumeral n="01" label="The architecture" />
        <h2 className="arch-full-page-title">
          Fifteen layers. One system. <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Owned</em> by you.
        </h2>
        <p className="arch-full-page-deck">
          Move the mouse for depth. Hover a node — the layer, what it does, and its proof-points appear inline.
        </p>
      </div>
      <div className="arch-full-page-canvas">
        <ArchitectureGraph />
      </div>
    </section>
  );
}
