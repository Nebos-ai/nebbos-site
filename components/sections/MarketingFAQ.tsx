/**
 * MarketingFAQ · sections/MarketingFAQ.tsx · v1 · 2026-09-18
 *
 * Runlayer-style FAQ block. Answers the top questions a CISO or
 * procurement lead brings on a first-visit. Same voice as the rest of
 * the marketing register: short imperative or declarative answers,
 * named artifacts, honest scope caveats.
 *
 * Ordering follows the buyer's own reading order: what is it, what
 * about my data, what about my auditor, what about lock-in, what
 * about certifications, what about the AI stack it runs on.
 */

const QA = [
  {
    q: "What is the Nebbos Cradle?",
    a: "A FIPS 140-3 Level 3 encrypted USB device with an on-device keypad, tamper-evident and epoxy-sealed, IP68 and MIL-STD-810G, TAA-compliant. It carries the Nebbos MCP and your Pearl memory. Elevated actions block when it is not in the port.",
  },
  {
    q: "What happens to my data if we leave Nebbos?",
    a: "You export it. Memory rows, Pearl definitions, and the attestation chain leave with you on the Cradle. No cloud fork required. Every departure is a clean handoff with the chain intact.",
  },
  {
    q: "How does my auditor verify what shipped?",
    a: "Every action lands one link in a hash-chained record — the tool call, the memory row it read, the human who approved it, the timestamp. Your auditor recomputes the chain against the Cradle and either matches or does not. There is no third path.",
  },
  {
    q: "Which certifications do you hold today?",
    a: "The Cradle hardware holds FIPS 140-3 Level 3, CC EAL5+, CSfC 2-layer, MIL-STD-810G, IP68, TAA. Framework side: NIST SP 800-53 mapped; CMMC L3 in preparation; SOC 2 Type II in progress; ISO 27001:2022 not yet held; EU AI Act Annex IV in preparation. We do not claim what we have not shipped.",
  },
  {
    q: "Is Nebbos isolated between customers?",
    a: "Yes, by default, with a five-tier isolation model. Each customer runs in an isolated Shell; tools, memory, and attestations do not cross the Shell boundary. Air-gapped and federated deployments are available for higher tiers.",
  },
  {
    q: "How does this differ from a SaaS run-layer platform?",
    a: "The credentials live on a device you hold, not in the vendor's cloud. Elevated tool calls block on physical presence. The memory substrate is portable. If the vendor is unavailable, your team still runs local through the Nebbos App.",
  },
  {
    q: "What runs the models?",
    a: "You choose. The platform is model-neutral: bring your own OpenAI, Anthropic, or self-hosted keys through the MCP. Nebbos never keys your models on your behalf. The Cradle can also hold model keys tier-gated behind biometric.",
  },
];

export function MarketingFAQ() {
  return (
    <section className="mkt mkt-section" aria-labelledby="mkt-faq-h">
      <div className="mkt-section__inner">
        <header className="mkt-faq__head">
          <p className="mkt-eyebrow">Questions</p>
          <h2 id="mkt-faq-h" className="mkt-h2">
            The questions a CISO asks first.
          </h2>
          <p className="mkt-deck">
            Direct answers. No hedging. If the answer is &ldquo;not
            yet,&rdquo; we say when.
          </p>
        </header>

        <dl className="mkt-faq__list">
          {QA.map((item) => (
            <div key={item.q} className="mkt-faq__item">
              <dt className="mkt-faq__q">{item.q}</dt>
              <dd className="mkt-faq__a">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
