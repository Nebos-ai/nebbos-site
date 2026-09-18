/**
 * MarketingSubstrate · sections/MarketingSubstrate.tsx · v1 · 2026-09-18
 *
 * The 6-stage operator substrate on the dark marketing register.
 * Replaces OperatorFlowchart (GSAP horizontal-pin, cream paper) for the
 * home page — this register is static and Linear-tier clean, no scroll
 * animation. GSAP flowchart stays in the codebase for other surfaces
 * that want it.
 *
 * Six stages match the ratified operator loop:
 *   Signal → Ingest → Memory → Approval → Action → Attestation
 *
 * Grounded in `feedback_operator_and_pearl_shape_doctrine_8` and the six-
 * stage substrate registered across the Nebbos platform. Each stage
 * shows an accent bar in Nebbos orange to signal the throughline.
 */

const STAGES = [
  {
    n: "01",
    name: "Signal",
    caption: "A departmental event fires — a cadence, a deadline, a threshold, an inbound.",
  },
  {
    n: "02",
    name: "Ingest",
    caption: "Files, calls, mail, tasks and tickets normalize into memory rows.",
  },
  {
    n: "03",
    name: "Memory",
    caption: "Every fact stored with its source cite. No row without provenance.",
  },
  {
    n: "04",
    name: "Approval",
    caption: "Consequential actions block on a human. Biometric, Cradle, or enclave — the tier fits the risk.",
  },
  {
    n: "05",
    name: "Action",
    caption: "The tool call runs. The mail sends. The task lands. Reversible where the system can guarantee it.",
  },
  {
    n: "06",
    name: "Attestation",
    caption: "A hash-chained record links the action to the human who approved it and the memory it read.",
  },
];

export function MarketingSubstrate() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-flow-h">
      <div className="mkt-section__inner">
        <header className="mkt-flow__head">
          <p className="mkt-eyebrow">The substrate</p>
          <h2 id="mkt-flow-h" className="mkt-h2">
            Six stages. One hash-chained trail.
          </h2>
          <p className="mkt-deck">
            Signal, ingest, memory, approval, action, attestation. Every
            operator action flows the same six stages. Each stage links to
            the next in a record your auditor can verify end to end.
          </p>
        </header>

        <ol className="mkt-flow__stages">
          {STAGES.map((stage) => (
            <li key={stage.n} className="mkt-stage">
              <span className="mkt-stage__accent" aria-hidden />
              <span className="mkt-stage__num">{stage.n}</span>
              <h3 className="mkt-stage__name">{stage.name}</h3>
              <p className="mkt-stage__caption">{stage.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
