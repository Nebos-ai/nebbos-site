/**
 * content/stills.ts · Wave 4a · canonical registry for the 12 vision-board stills.
 *
 * The 3 scenes × 4 variants tell the site's story across pages. Every page that
 * needs a scene anchor imports from here — never hard-code a filename. When a
 * variant is re-generated (see scripts/generate-vision-board-stills.py) the
 * filename stays stable and every consuming page picks it up on rebuild.
 *
 * Governed by:
 *   ~/.claude/skills/nebbos-design-charter/ · reference_nebbos_visual_bar_hand_of_god
 *   scripts/vision-board-prompts.json (source of the images)
 *
 * The story arc (three-scene film treatment, condensed):
 *   Scene 1 · coffee shop · Where it starts
 *   Scene 2 · NYC executive · Where it grows
 *   Scene 3 · Amalfi elder · Where it endures
 *
 * Each scene carries a band of the 15-layer architecture (see lib/architecture.ts).
 * Together, the 3 scenes cover all 5 bands = all 15 layers.
 */

export type SceneId = 1 | 2 | 3;
export type VariantId = 1 | 2 | 3 | 4;

export type Scene = {
  id: SceneId;
  slug: string;
  chapter: string;
  strap: string;
  narrative: string;
  techNarrative: string;
  bands: number[];
  variants: VariantId[];
};

export const SCENES: Record<SceneId, Scene> = {
  1: {
    id: 1,
    slug: "coffee-shop",
    chapter: "Where it starts",
    strap: "A quiet morning. The substrate begins.",
    narrative:
      "A young woman takes her coffee by the window. Outside, city workers place a sapling into the sidewalk. It's early. The tree will grow. The company she works for is being built the same way — decision by decision, quietly compounding underneath.",
    techNarrative:
      "While she looks out, Nebbos is holding the substrate her operation runs on — the typed rows of every fact her company knows, the identity of every human and agent that will act on those facts, the shape of every department that will need coverage. The signal begins entering: messaging, calendar, source-control, HR, CRM. Every raw event is landing in an append-only log before anything else touches it. This is the foundation. This is where it starts.",
    bands: [1, 2],
    variants: [1, 2, 3, 4],
  },
  2: {
    id: 2,
    slug: "nyc-executive",
    chapter: "Where it grows",
    strap: "Mid-morning. The intelligence compounds.",
    narrative:
      "An executive stands at her corner-office window on Central Park South. October canopy below. A mature London Plane rising through the frame. She's taking a moment. The systems that hold her enterprise run without needing her attention. That moment is the point.",
    techNarrative:
      "While she takes her mid-morning, Nebbos is reasoning across her portfolio. The time-aware knowledge graph is answering from memory first, calling a model only when memory can't. A resilient router is selecting across frontier providers per query class, tracking budget in real time, falling back cleanly when one degrades. Same team, month 24 versus month 1: roughly one-tenth the overage. This is where the intelligence compounds.",
    bands: [3],
    variants: [1, 2, 3, 4],
  },
  3: {
    id: 3,
    slug: "amalfi-elder",
    chapter: "Where it endures",
    strap: "Golden hour. The ownership compounds.",
    narrative:
      "An older man stands beside his weathered Porsche on the Amalfi coast. An ancient olive rises from the dry-stone wall. He glances at his phone. The only visible technology in the frame. Everything else is life. Everything else is his because a substrate is holding the moat while he's here.",
    techNarrative:
      "While he takes his coast, Nebbos is running the agents that act on his behalf, gating every consequential action through his approval graph, attesting every decision to an audit trail, learning his preferences as a portable dataset he owns. His tokens are stable currency, decoupled from provider price swings. When he leaves this platform someday, he takes the memory, the agents, the moat with him. This is where the ownership compounds.",
    bands: [4, 5],
    variants: [1, 2, 3, 4],
  },
} as const;

/**
 * Build a still path relative to /public.
 * Every image lives at public/vision-board/scene-{sceneId}-v{variant}.png.
 */
export function stillPath(sceneId: SceneId, variant: VariantId = 1): string {
  return `/vision-board/scene-${sceneId}-v${variant}.png`;
}

/**
 * The scenes as an ordered array — for iteration across a page.
 */
export const SCENES_IN_ORDER: Scene[] = [SCENES[1], SCENES[2], SCENES[3]];
