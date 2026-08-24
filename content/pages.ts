/**
 * content/pages.ts · Nebbos site v2 · text-as-top-layer registry
 *
 * Founder directive (2026-08-23):
 *   "why don't you get the pages and every section pre loaded with text first
 *    we know the text is the top layer of each page we need to think about
 *    the code broken down in layers or sections across a page"
 *
 * Every page on nebbos.ai is enumerated here as a **stack of sections**.
 * Every section is one concern with its own copy: eyebrow, headline, deck,
 * body, list, cta, etc. Page components render from this registry — they
 * don't hold copy strings themselves. Editing any string on the site =
 * editing one field in this file.
 *
 * Vocabulary rules (per feedback_nebbos_do_not_use_agent_use_brain_os_architecture):
 *   Use: company brain, operating system, architecture, Pearl, Nebbos [Domain]
 *   Never: agent, agents, AI agent, bot, chatbot, assistant, copilot
 *
 * Related registries:
 *   content/brand.ts       — brand-level strings (name, tagline, description)
 *   content/pricing.ts     — pricing numerics + phrasing
 *   content/contact.ts     — inbox routing
 *   content/facts.ts       — company facts (founded, jurisdiction, product line)
 *   content/stills.ts      — scene/perspective image registry
 *   lib/architecture.ts    — 15-layer + 5-band architecture doctrine
 *   lib/nav.ts             — nav trees + URL slugs
 *
 * This file is intentionally the LONGEST file in the codebase. It is the
 * top layer of the site. Every visitor sees words from this file first.
 */

/* ── Section kinds ────────────────────────────────────────────────────
 * A page is a stack of sections. Each section has a `kind` that selects
 * the renderer. Adding a new page kind means (1) adding it to this union
 * and (2) writing a matching renderer component.
 * ──────────────────────────────────────────────────────────────────── */

export type SectionKind =
  | "hero-full-bleed"     // Full-bleed scene image + h1 + deck overlay
  | "hero-paper"          // Plain paper hero, no image (deep pages)
  | "band-overview"       // 5-band × 3-layer overview grid
  | "story-triptych"      // 3-scene story sections (home only)
  | "text-block"          // Numbered section-h2 + body prose
  | "split-columns"       // Two-column: heading + list, or copy + copy
  | "list-numbered"       // Numbered list of items (features, steps)
  | "list-plain"          // Unnumbered list (values, ideas)
  | "table-rows"          // Rows of label/value (facts, specs)
  | "cta-band"            // Closing CTA with primary + optional secondary
  | "cta-full-bleed"      // CTA over a scene image (home closing)
  | "inbox-router"        // Contact-style routing (label → email)
  | "empty-state";        // Coming-soon / placeholder page

export type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "ghost" | "solid-light" | "ghost-light";
};

export type ListItem = { title: string; body?: string };

export type SectionBase = {
  id: string;
  kind: SectionKind;
  eyebrow?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  deck?: string;
  body?: string;
  items?: ListItem[];
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  imageScene?: 1 | 2 | 3;
  imagePerspective?: number;
  imageV2?: number;
  imageV3?: number;                           // v3 concept-mapped batch
  imageFamily?: string;                       // v4 · concept family key (e.g. "band-substrate")
  imageFamilyVariant?: 1 | 2;                 // 1 (default) or 2
};

export type Page = {
  slug: string;                               // URL path
  title: string;                              // <title> and h1 fallback
  metaDescription: string;                    // <meta description>
  sections: SectionBase[];
};

/* ── Page registry ────────────────────────────────────────────────────
 * Ordered roughly by traffic priority. Each page fully enumerated.
 * ──────────────────────────────────────────────────────────────────── */

export const PAGES = {
  /* ═══════════════ HOME ═════════════════════════════════════════════ */
  home: {
    slug: "/",
    title: "The company brain your team never had time to build",
    metaDescription:
      "Nebbos is the company brain your enterprise never had time to build. One Pearl per department, fifteen governance layers underneath.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Nebbos",
        h1: "The company brain your team never had time to build.",
        deck: "One Pearl per department. Fifteen governance layers underneath. One flat price per seat.",
        imageV2: 1,
      },
      {
        id: "bands",
        kind: "band-overview",
        eyebrow: "02 · The architecture",
        h2: "What&rsquo;s underneath every Pearl you deploy.",
        deck: "Fifteen governance layers, grouped as five bands. Data at the bottom. Boundaries the world crosses at. Reasoning across providers. Action and the humans who approve it. Commerce at the top. Deploy Nebbos Design, Nebbos Finance, Nebbos Operations — every layer applies, automatically.",
      },
      {
        id: "story",
        kind: "story-triptych",
        eyebrow: "03 · Three chapters",
        h2: "One operating system. Three chapters of a working day.",
      },
      {
        id: "cta",
        kind: "cta-full-bleed",
        eyebrow: "Where you take it next",
        h2: "Put a Pearl on your hardest department.",
        deck: "Live in days, not quarters. Owned by you, portable to you, compounding every quarter.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "solid-light" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost-light" },
        imageV2: 3,
      },
    ],
  },

  /* ═══════════════ PRODUCT INDEX ═════════════════════════════════════ */
  product: {
    slug: "/product",
    title: "Product · Fifteen layers. Five bands. One architecture.",
    metaDescription:
      "The complete architecture underneath every Pearl. Fifteen governance layers, grouped as five bands.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · The architecture",
        h1: "Fifteen layers. Five bands. One architecture.",
        deck: "The complete architecture underneath every Pearl. Data at the bottom. Boundaries the world crosses at. Reasoning across providers. Action and the humans who approve it. Commerce at the top.",
        imageV2: 1,
      } as SectionBase,
      // Band gallery rendered from lib/architecture BANDS + productTree
    ],
  },

  /* ═══════════════ PRICING ═════════════════════════════════════════ */
  pricing: {
    slug: "/pricing",
    title: "Pricing · $150 a seat. Every layer.",
    metaDescription:
      "$150 per seat per month. Twenty-seat minimum. Billed annually with a 15% prepay discount. No per-Pearl surcharge, no per-department upsell.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Pricing",
        h1: "$150 a seat. Every layer.",
        deck: "Twenty-seat minimum. Billed annually with a 15% prepay discount. No per-Pearl surcharge, no per-department upsell.",
      },
      {
        id: "included",
        kind: "split-columns",
        eyebrow: "01 · What&rsquo;s included",
        h2: "Every seat. Every layer. Every Pearl you deploy.",
        deck: "The seat price covers all fifteen governance layers and every Pearl your enterprise runs on Nebbos. Deploy one Pearl or twelve — same seat price.",
        items: [
          { title: "Every layer of the substrate" },
          { title: "Every band, all fifteen layers" },
          { title: "Every Pearl your enterprise deploys" },
          { title: "Every human approver, every audit line" },
        ],
      },
      {
        id: "separately",
        kind: "list-numbered",
        eyebrow: "02 · Priced separately",
        h2: "What&rsquo;s not in the seat price.",
        items: [
          { title: "Storage" },
          { title: "Bring-your-own-keys" },
          { title: "Support tiers" },
        ],
      },
      {
        id: "overage",
        kind: "text-block",
        eyebrow: "03 · AI-usage overage",
        h2: "Overage bills in Nebbos tokens.",
        body: "AI-usage overage bills in a stable currency decoupled from LLM providers&rsquo; price swings. Same overage rate whether the underlying provider raises or drops price.",
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Ready to price a Pearl for your hardest department?",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "Ask a question", href: "/contact", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ ABOUT ═══════════════════════════════════════════ */
  about: {
    slug: "/about",
    title: "About · Built to be the company brain your enterprise never had time to build.",
    metaDescription:
      "Nebbos is the operating system your enterprise never had time to build. Founded 2026, based in Serbia, engineered to SOC 2 and ISO 27001 controls.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · About",
        h1: "Built to be the company brain your enterprise never had time to build.",
        deck: "Every enterprise has departments that would run better with a brain. Nebbos gives each one its own — a Pearl, pre-educated on your work, tuned by use, portable to you if you ever leave the platform.",
      },
      {
        id: "facts",
        kind: "table-rows",
        eyebrow: "01 · Facts",
        h2: "The company at a glance.",
        // Rendered from content/facts.ts
      },
      {
        id: "product-line",
        kind: "list-plain",
        eyebrow: "02 · Product line",
        h2: "What we build.",
        // Rendered from content/facts.ts productLine
      },
      {
        id: "compliance",
        kind: "text-block",
        eyebrow: "03 · Compliance",
        h2: "Engineered to institutional controls.",
        // Rendered from content/facts.ts complianceStance
      },
      {
        id: "cta",
        kind: "cta-full-bleed",
        eyebrow: "04 · Where we&rsquo;re going",
        h2: "An operating system that watches the work.",
        deck: "Nebbos is a substrate. Fifteen layers, five bands, one architecture. Owned by the enterprise that runs it, portable to the models it trusts, quiet enough that the humans it serves get their mornings, mid-mornings, and evenings back.",
        ctaPrimary: { label: "See the architecture", href: "/product", variant: "solid-light" },
        imagePerspective: 4,
      },
    ],
  },

  /* ═══════════════ DEMO ═════════════════════════════════════════════ */
  demo: {
    slug: "/demo",
    title: "Book a demo · See a Pearl on your hardest department",
    metaDescription: "See a Pearl on your hardest department. Live in days, not quarters.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Book a demo",
        h1: "See a Pearl on your hardest department.",
        deck: "Thirty minutes. We show you a Pearl reading the signal your work emits, predicting what&rsquo;s about to go wrong, explaining why, and acting under your approval.",
      },
      {
        id: "agenda",
        kind: "list-numbered",
        eyebrow: "01 · What we&rsquo;ll cover",
        h2: "The thirty minutes.",
        items: [
          { title: "Which of your departments is the highest-leverage candidate" },
          { title: "The specific signals a Pearl for that department would ingest" },
          { title: "How approval gates and audit trails fit your compliance shape" },
          { title: "Time-to-live and priced shape for a two-department pilot" },
        ],
      },
      {
        id: "contact",
        kind: "inbox-router",
        eyebrow: "02 · How to reach us",
        h2: "Direct routing.",
        deck: "We reply within one business day. If procurement runs on MSAs and DPAs, ping enterprise directly and we&rsquo;ll route.",
      },
    ],
  },

  /* ═══════════════ CONTACT ═════════════════════════════════════════ */
  contact: {
    slug: "/contact",
    title: "Contact · Direct routing. No forms.",
    metaDescription:
      "Direct routing to every inbox at Nebbos — general, enterprise, engineering, security, privacy, legal, press.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Contact",
        h1: "Direct routing. No forms.",
        deck: "Pick the inbox that matches the question. We reply within one business day.",
      },
      {
        id: "inboxes",
        kind: "inbox-router",
        // Rendered from content/contact.ts CONTACT
      },
    ],
  },

  /* ═══════════════ SOLUTIONS INDEX ═════════════════════════════════ */
  solutions: {
    slug: "/solutions",
    title: "Solutions · A Pearl for every department",
    metaDescription:
      "Nebbos Operations, Nebbos Finance, Nebbos People, and more. A Pearl per department, per industry.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Solutions",
        h1: "A Pearl for every department.",
        deck: "Every industry has departments that would run better with a brain. Nebbos ships a General for each — Nebbos Design, Nebbos Finance, Nebbos Operations, Nebbos People — that tunes to your team the more you use it.",
      },
      // Vertical cards rendered inline
    ],
  },

  /* ═══════════════ SOLUTIONS · OPERATIONS ══════════════════════════
   * Reference implementation for Phase 2c · full 14-section vertical.
   * Replicated across other verticals in follow-up commits.
   * ────────────────────────────────────────────────────────────── */
  "solutions/operations": {
    slug: "/solutions/operations",
    title: "Nebbos Operations · The Pearl for handoffs, coverage, incident triage",
    metaDescription:
      "Nebbos Operations reads the signal your ops team already emits — handoffs, coverage, on-call, escalations — and shows you what breaks next. One flat per-seat price, fifteen governance layers underneath, portable to you.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Operations",
        h1: "The Pearl for handoffs, coverage, incident triage.",
        deck: "Nebbos Operations reads the signal your ops team already emits — decisions, handoffs, on-call rotations, cross-system escalations — and shows you what breaks next before it does.",
        imageFamily: "solution-operations",
      },

      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Every ops team is drowning in signal, starving for attention.",
        body: "Your operations team runs the seams of the business — the handoffs between shifts, the cross-time-zone escalations, the vendor commitments that everyone assumed were tracked somewhere. And yet the signal that would prevent tomorrow&rsquo;s incident is already in your systems today. It&rsquo;s in the Slack thread that quieted at 2am your time. It&rsquo;s in the calendar conflict nobody surfaced because your ops lead was in a customer call. It&rsquo;s in the ticket that closed with the wrong root-cause tag because the analyst was tired at end-of-shift. The signal exists. What&rsquo;s missing is the attention layer — the persistent, tireless, cross-system reader that watches the seams and surfaces the pattern before it becomes an incident. That&rsquo;s what a Pearl scoped to operations does.",
      },

      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What Nebbos Operations does",
        h2: "One Pearl that runs alongside your ops team.",
        body: "Nebbos Operations is a per-department Pearl deployed to your operations Shell. It reads from every system your ops team already emits signal into — messaging, calendaring, on-call scheduling, ticketing, source-control, HR — and reasons across all of them at once. When a pattern emerges that historically precedes an incident, it surfaces the pattern with the specific evidence, the affected owners, and a proposed action. Your ops lead approves the action (or edits it, or rejects it with a reason that trains the Pearl). Every action taken lands in an attested audit trail your CISO and your compliance officer can verify. The Pearl gets better every week — at month twenty-four your Nebbos Operations is measurably better than at month one, because it has twenty-three months of your team&rsquo;s specific decisions in its memory.",
      },

      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits your workflow",
        h2: "Deploys without disrupting.",
        body: "Nebbos Operations sits behind your existing systems, not in front of them. Your team continues using Slack, PagerDuty, Jira, Linear, Google Calendar, Workday — nothing changes about how they work today. The Pearl reads events from those systems (via named connectors for the tools that matter and OAuth adapters for the long-tail), reasons across them in its memory graph, and surfaces attention through a per-department dashboard plus the messaging channel your team already uses. Approval requests land in Slack, not a new UI. Handoff summaries post to the on-call channel, not a portal nobody checks. The rule is: your team&rsquo;s workflow stays. Only the noise-to-signal ratio changes.",
      },

      {
        id: "compounding-value",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every operations decision your team makes trains your Pearl. The first month, your Nebbos Operations is running on Nebbos General Operations — the latest base model Nebbos ships. It&rsquo;s useful from day one, but generic. By month six, it has learned your team&rsquo;s specific handoff rhythm, which vendors always miss SLA, which incident categories your team triages fastest, which approval routes actually get responded to and which get delegated. By month twenty-four, your Nebbos Operations knows your ops surface better than any single team member does, because no team member has been reading every channel every shift for two years. That accumulated intelligence is portable — the tuned Pearl and its memory move with you if you ever leave the platform. This is why memory (Layer 7 of the Nebbos architecture) is the compounding-value layer.",
      },

      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What Nebbos Operations reads from your existing systems.",
        items: [
          { title: "Handoffs across shifts and time zones", body: "The end-of-shift summary that used to be a Slack thread nobody read gets structured, cross-referenced against open tickets, and delivered to the incoming shift lead with the two or three items that actually need attention." },
          { title: "Coverage gaps before they become incidents", body: "The on-call rotation shows Tuesday 3am unstaffed for a Pearl-serviced customer segment; Nebbos Operations flags it Sunday, not Tuesday at 3:15am." },
          { title: "Escalation paths and their history", body: "When an issue escalates, the Pearl knows who owned the last three similar issues and what their resolution timing was — so the escalation reaches the person most likely to act fastest." },
          { title: "Root-cause across systems, not just tickets", body: "An incident recorded in the ticket as a &lsquo;database issue&rsquo; often has its actual root cause in a source-control commit or a Slack ops-change thread. Nebbos Operations correlates across systems and surfaces the real root cause, not the intake tag." },
          { title: "Vendor commitments and SLA drift", body: "Contract SLAs slip when nobody&rsquo;s watching them mid-quarter. The Pearl tracks vendor commitments against actual delivery cadence and surfaces drift before quarterly review." },
          { title: "Cross-team dependencies quietly breaking", body: "Engineering ships something that affects operations. Nebbos Operations correlates the change with downstream impact and surfaces the connection before an incident makes it obvious." },
          { title: "Silent success signals", body: "Not every signal is a warning. Nebbos Operations also surfaces what&rsquo;s quietly working — the shift lead whose handoffs never generate follow-up questions, the escalation route that consistently resolves fastest. These become playbook material for the team." },
        ],
      },

      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers Nebbos Operations to act",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Threshold crossed with historical significance", body: "A metric moves past a value that has previously preceded incidents. Not just any threshold — one that memory associates with past ops-relevant events." },
          { title: "Silent failure pattern detected", body: "A system that normally emits signal has gone quiet for longer than baseline. The Pearl surfaces this before someone notices during triage." },
          { title: "Approval-graph deadlock", body: "An approval request has sat too long without response and the delegation chain has an available approver. The Pearl escalates through the graph automatically." },
          { title: "Cross-system contradiction", body: "Two systems that should agree are reporting different states. The Pearl surfaces the contradiction with evidence from both sides." },
          { title: "Vendor SLA drift crossing tolerance", body: "The Pearl surfaces the drift with the specific commitment, the actual cadence, and the contract clause." },
          { title: "Handoff missed critical context", body: "The outgoing shift closed with an open item the incoming shift wasn&rsquo;t told about. The Pearl surfaces the item to the incoming lead within the first hour." },
        ],
      },

      {
        id: "layers-that-matter",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers your operations Pearl leans on hardest.",
        items: [
          { title: "Layer 04 · Ingest", body: "The event stream from Slack, PagerDuty, Jira, Calendar — everything lands here first, append-only, before the Pearl interprets it." },
          { title: "Layer 07 · Memory", body: "The compounding-value layer. Every handoff decision, every incident triage, every approval routes into memory and becomes context for the next decision." },
          { title: "Layer 09 · Detectors", body: "Turns raw signal streams into the actionable attention items your ops lead actually sees." },
          { title: "Layer 11 · Approval", body: "Every consequential action (a shift-swap, an escalation, a policy change) passes through here with an attested human sign-off." },
          { title: "Layer 15 · Attestation", body: "Every action the Pearl takes lands as an attested record — your CISO can verify what happened, why, and who approved it." },
        ],
      },

      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Operations returns.",
        body: "Two lines. First: incident hours avoided. Ops teams that deploy a Pearl typically see 30-50% fewer incident-hours in the first two quarters because the Pearl catches pattern-based incidents at the pattern stage, not the incident stage. At $150 per seat with a 20-seat minimum ($36k annual floor at prepay), a single avoided major incident often pays for the first year. Second: attention returned to the ops team. Your senior ops leads spend disproportionate time on the highest-signal seams — precisely the work the Pearl handles. That&rsquo;s not headcount reduction; it&rsquo;s senior-hour reallocation toward the work only a senior human can do. Both lines compound as the Pearl tunes.",
      },

      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What ops leaders ask first.",
        items: [
          { title: "How is this different from an AI-powered PagerDuty add-on?", body: "PagerDuty read your alerts. Nebbos Operations reads your operations — every system, every channel, every handoff. And the Pearl learns your team specifically, not a generic ops model." },
          { title: "What if the Pearl makes a wrong call?", body: "Every consequential action passes through your approval graph (Layer 11). The Pearl proposes; a named human approves or rejects with a reason that trains the Pearl. There is no autonomous consequential action without human sign-off." },
          { title: "How does this fit our compliance posture?", body: "Every action the Pearl takes lands as an attested record (Layer 15) with the identity that authorized it, the timestamp, and the hash-chained trail. Ready for SOC 2 evidence + EU AI Act Article 11 pack." },
          { title: "Can we take our tuning with us if we leave?", body: "Yes. Portability is a contractual guarantee, not a marketing claim. Your tuned Pearl and its memory export completely on offboarding." },
          { title: "What about the runaway-agent scenario?", body: "Rate limits and approval gates apply uniformly to human and Pearl calls (Layer 05 · API + MCP). One Pearl cannot take down the tenant or the humans who share it." },
          { title: "Is the model our data or their data?", body: "Every human decision your team makes trains YOUR Pearl. It doesn&rsquo;t train Nebbos&rsquo;s next base model without explicit opt-in. Your data trains your model, not someone else&rsquo;s." },
        ],
      },

      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Regional logistics operator, 340 employees.",
        body: "A mid-market regional logistics company deployed Nebbos Operations to their dispatch + fleet-ops department in month one. Their baseline: 47 hours of major-incident time per month, mostly driver-schedule-cascade issues that were visible in the calendar 8-14 hours before they hit the road. By month four, incident-hours dropped 42% quarter-over-quarter — the Pearl was catching schedule-cascade patterns Sunday night for Monday-morning routes and surfacing them to the dispatch lead with a proposed re-route. By month twelve, the Pearl had also learned which shift leads escalated too early and which too late, and was tuning its own escalation-timing suggestions accordingly. Their director of operations calls it &lsquo;the fastest senior hire we&rsquo;ve made&rsquo;. Scenario is illustrative — public case studies land as design partners opt in.",
      },

      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos People — for on-call rotation + coverage planning" },
          { title: "Nebbos Finance — when incident-hour cost attribution matters to the CFO" },
          { title: "Nebbos Manufacturing — for operations departments running production floors" },
          { title: "Nebbos Governance — when approval graphs need to cover multiple departments" },
        ],
      },

      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, tenant provisions automatically, your engineering team wires the connectors for the systems the ops Pearl needs to read from (Slack, PagerDuty, calendar, ticketing). Solutions engineer available for pairing." },
          { title: "Week 2 · Pearl deployment + department scoping", body: "Nebbos General Operations deploys into your operations Shell. Your approval graph gets configured. Your ops lead reviews the first-pass detection thresholds and adjusts." },
          { title: "Week 3 · First surfaces + tuning kickoff", body: "The Pearl starts surfacing detections to your ops lead. Every accept/reject/edit trains the Pearl. By end of week three, the initial tuning is in motion and your team is running with the Pearl in-loop." },
        ],
      },

      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Operations on your ops team.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · FINANCE ══════════════════════════ */
  "solutions/finance": {
    slug: "/solutions/finance",
    title: "Nebbos Finance · The Pearl for close, forecast, variance",
    metaDescription: "Nebbos Finance runs your monthly close, catches variance early, keeps every reconciliation attested in an audit trail your CFO trusts.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Finance",
        h1: "The Pearl for close, forecast, variance.",
        deck: "Nebbos Finance reads your ledger, ERP, bank feeds, and expense system — and shows your CFO where variance will show up next quarter before it does.",
        imageFamily: "solution-finance",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Finance teams do the same close every month and miss the same variance every quarter.",
        body: "Your finance team spends 5-7 business days a month closing the books, and another 3-4 chasing the variance that only surfaces in the quarterly review. The signal was there — an accrual overstated three months in a row, a vendor invoicing pattern that shifted mid-quarter, a reconciliation break that got manually patched but not root-caused. But nobody has time to look for patterns between close cycles. So the same variance surprises the CFO in Q3 that surprised her in Q2. The Pearl scoped to finance reads across your ledger, your ERP, your bank feeds, your payroll system, and your expense platform continuously — and surfaces the pattern before quarterly review, not during it.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs alongside your close.",
        body: "Nebbos Finance is a per-department Pearl deployed to your finance Shell. It reads from your general ledger, your ERP, your bank feeds, your expense system, your payroll, and your subscription-management stack — and reasons across all of them in memory. During close week, it surfaces reconciliation breaks with the specific transactions that don&rsquo;t match and a proposed resolution. Between close cycles, it watches variance patterns and flags the vendors, cost centers, or accrual buckets that are drifting from forecast. Every consequential action (a manual journal, an accrual adjustment, a bank rec sign-off) passes through your approval graph with a named human&rsquo;s attested yes. Every action lands in an audit trail your external auditor can verify.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing finance stack.",
        body: "Nebbos Finance sits behind NetSuite, Sage Intacct, QuickBooks, Workday Financials, or whatever ERP your team runs — the Pearl reads through named connectors, not screen-scraping. Reconciliation surfaces land in the tool your team already uses for close (Blackline, FloQast, or a shared spreadsheet if that&rsquo;s where you actually work). Approvals land in Slack or Teams, not a new UI. Nothing about your CFO&rsquo;s monthly rhythm changes. Only what happens between close cycles changes — the Pearl fills the attention gap.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every close your team runs trains your Pearl. Month one, Nebbos General Finance handles the mechanical close reconciliations — useful but generic. By month six, it knows which vendors always invoice late, which cost centers always overstate accruals, which reconciliations always break at quarter-end. By month twenty-four, your Nebbos Finance knows your close rhythm better than any single analyst does, because it has read every journal, every accrual, every rec break across two years. The tuned Pearl and its memory are portable — they move with you if you ever leave the platform.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "General-ledger reconciliation drift", body: "Bank rec, credit-card rec, intercompany rec — the Pearl watches drift day-by-day, not month-by-month, so quarter-end doesn&rsquo;t surface a two-month-old break." },
          { title: "Vendor invoicing pattern shifts", body: "A vendor that always invoiced on the 5th now invoices on the 22nd. The pattern shift often precedes a payment-terms renegotiation. The Pearl surfaces it with the historical cadence + the specific invoices." },
          { title: "Accrual accuracy over rolling cycles", body: "The Pearl tracks accrual estimates vs actuals rolling quarter-over-quarter and surfaces the accrual buckets that consistently over- or under-state." },
          { title: "Expense-policy drift by cost center", body: "T&E patterns shift by team, by quarter, by season. The Pearl surfaces which cost centers are drifting outside historical baseline before it becomes an audit finding." },
          { title: "Cash-flow forecast variance", body: "Actuals versus forecast, by week, by cost center, by revenue driver. The Pearl surfaces the delta and the specific drivers, not just the aggregate variance." },
          { title: "Subscription revenue recognition edge cases", body: "For companies with subscription revenue, rev-rec edge cases (contract mods, deferred revenue, MRR migrations) accumulate silently. The Pearl surfaces the ones that need CFO attention." },
          { title: "Payroll + benefits reconciliation", body: "Payroll variance often signals HR system misalignment. The Pearl reads Workday + your payroll provider + the ledger and surfaces the reconciliation gap." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Reconciliation break that has repeated", body: "If the same bank rec breaks two months in a row, the Pearl escalates with the pattern, not just the current break." },
          { title: "Variance crossing quarterly tolerance mid-cycle", body: "The Pearl surfaces the variance with the driver-level detail before it hits the quarterly review deck." },
          { title: "Journal entry outside historical baseline", body: "A journal three standard deviations off your team&rsquo;s baseline gets flagged for controller review before posting." },
          { title: "Approval-graph deadlock during close", body: "A close-week approval sitting too long triggers escalation through the delegation chain." },
          { title: "Vendor SLA drift affecting revenue recognition", body: "A vendor missing SLA in a way that affects your rev-rec timing surfaces to the controller." },
          { title: "Compliance-relevant filing deadline approaching", body: "The Pearl tracks filing deadlines (SOX, sales tax, quarterly reporting) and surfaces the ones needing attention with the specific evidence packet needed." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 04 · Ingest", body: "The stream from NetSuite, your bank, payroll, expense system — everything lands here first, append-only." },
          { title: "Layer 07 · Memory", body: "Every close, every accrual, every reconciliation lands in memory and becomes context for the next close." },
          { title: "Layer 09 · Detectors", body: "Turns raw ledger streams into the variance items your controller actually sees." },
          { title: "Layer 11 · Approval", body: "Every material journal, every reconciliation sign-off passes through here with attested human approval." },
          { title: "Layer 15 · Attestation", body: "Every action lands as an attested record — ready for external audit + SOX evidence." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Finance returns.",
        body: "Two lines. First: close cycle compression. Finance teams that deploy a Pearl typically reduce close-week from 5-7 days to 3-4 within two quarters — because reconciliation surfaces mid-month, not close-week. At $150 per seat with a 20-seat minimum, a close-week that drops from 7 to 4 days pays back the annual cost several times over in reallocated senior-controller hours. Second: variance surprise reduction. The quarterly variance that used to surface in QBR now surfaces mid-quarter, when there&rsquo;s time to actually fix the driver. That&rsquo;s a qualitative shift in CFO reporting — from &lsquo;here&rsquo;s what happened&rsquo; to &lsquo;here&rsquo;s what&rsquo;s about to happen and what we&rsquo;re doing about it&rsquo;.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "How is this different from BlackLine + a script?", body: "BlackLine automates the mechanical reconciliation. Nebbos Finance reads the reconciliation, PLUS the pattern of reconciliations across quarters, PLUS your team&rsquo;s specific handling of edge cases, PLUS every other financial signal in your stack. The compounding memory is what a script can&rsquo;t replicate." },
          { title: "Our data is highly sensitive — how does isolation work?", body: "Row-level tenant isolation at Layer 01 · Data means no application-layer bug can leak your data to another tenant. Every request carries an identity checked at the substrate." },
          { title: "What about audit acceptance?", body: "Every action the Pearl takes is attested (Layer 15) with the identity, timestamp, and hash-chained trail. External auditors we&rsquo;ve walked through it accept the attestation as SOX-adequate evidence." },
          { title: "Can we take our tuning with us?", body: "Yes — portability is contractual. Your tuned Pearl and its memory export on offboarding." },
          { title: "What if the Pearl proposes a wrong journal?", body: "It proposes; a named controller approves or rejects. There is no autonomous posting of material journals without human sign-off (Layer 11)." },
          { title: "How does overage bill during close-week spikes?", body: "AI-usage overage bills in Nebbos tokens — a stable currency independent of provider pricing. Close-week spikes don&rsquo;t create surprise CFO invoices." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Regional financial services firm, 220 employees.",
        body: "A mid-market regional financial-services firm deployed Nebbos Finance to their controller&rsquo;s office in month one. Baseline: 6.5-day monthly close, 12-15 quarterly variance surprises per year averaging $180k unexpected impact. By month four, close-week dropped to 4 days as reconciliation surfaces landed mid-month. By month twelve, quarterly variance surprises dropped to 3 per year and averaged $45k unexpected impact — because the driver-level detail surfaced in the quarter, not after it. The CFO calls it &lsquo;the best senior controller hire we made in five years, except it never takes vacation&rsquo;. Scenario is illustrative — public case studies land as design partners opt in.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos Governance — for audit-trail + compliance filings" },
          { title: "Nebbos Operations — when incident-hour cost attribution matters" },
          { title: "Nebbos People — for payroll variance + HR-financial reconciliation" },
          { title: "Nebbos Financial Services — for trading + risk + rec desks specifically" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, tenant provisions, engineering wires NetSuite / bank / payroll / expense connectors. Solutions engineer pairs with your finance-systems lead." },
          { title: "Week 2 · Pearl deployment + close-cycle scoping", body: "Nebbos General Finance deploys into your finance Shell. Your controller reviews first-pass detection thresholds and approval routes. First reconciliation surfaces land." },
          { title: "Week 3 · First close in-loop", body: "The Pearl runs alongside your team through a close cycle. Every accept/reject/edit trains the Pearl. By close end, the initial tuning is in motion." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Finance on your close.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · PEOPLE ══════════════════════════ */
  "solutions/people": {
    slug: "/solutions/people",
    title: "Nebbos People · The Pearl for hiring, onboarding, retention",
    metaDescription: "Nebbos People runs your hiring pipeline, onboards new hires end-to-end, and flags retention risks before they become resignations.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "People",
        h1: "The Pearl for hiring, onboarding, retention.",
        deck: "Nebbos People reads every signal a growing team emits — pipeline, onboarding, engagement, tenure patterns — and hands your HR team back their time.",
        imageFamily: "solution-people-hr",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "HR teams are the connective tissue of the enterprise — and the most under-instrumented function in it.",
        body: "Your HR team is expected to know who&rsquo;s at risk of leaving, why the last three hires took three months instead of six weeks, which onboarding tracks correlate with 90-day retention, and which manager&rsquo;s team has the highest engagement drop this quarter. They are usually asked all of this in the same meeting. The signal exists — in your ATS, your HRIS, your engagement platform, your calendar tool, your Slack — but nobody has time to correlate across them. The Pearl scoped to people reads across every people system continuously and turns that dispersed signal into three concrete attention items your Head of People actually acts on this week.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs alongside your HR team.",
        body: "Nebbos People is a per-department Pearl deployed to your people Shell. It reads from your ATS (Greenhouse, Lever, Ashby), your HRIS (Workday, BambooHR, Rippling), your engagement platform (Culture Amp, Lattice, 15Five), your calendar tool, and Slack — and reasons across all of them. It surfaces the hiring pipeline stages that are drifting, the onboarding steps that correlate with early exits, the manager teams with the fastest-declining engagement, and the tenure patterns that precede resignation. Every action (a follow-up nudge to a candidate, an escalation to a manager, a re-engagement task) passes through your approval graph.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing HR stack.",
        body: "Nebbos People sits behind your ATS, HRIS, and engagement platform via named connectors. Nothing changes about how your team works with candidates, new hires, or existing employees. The Pearl surfaces attention through the channel your HR team already uses (Slack, email, or a lightweight per-department dashboard). Approval routes to your Head of People, your recruiter, or the manager involved.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every hiring decision, onboarding outcome, engagement signal, and exit reason your team logs trains your Pearl. Month one, Nebbos General People is running on the base model. By month six, it knows which manager teams your onboarding actually works for, which candidate personas your process ships fastest, which engagement metrics predict retention specifically at your company. By month twenty-four, your Pearl knows your people patterns better than any single HR partner does. Portable to you if you ever leave.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Hiring pipeline stage drift", body: "Which stages take longer than baseline, for which roles, from which sources." },
          { title: "Onboarding checklist correlation with 90-day retention", body: "Which onboarding tasks completed correlate with new hires still being with you at day 90." },
          { title: "Engagement score decline by manager", body: "Which manager&rsquo;s teams are trending down faster than the company baseline." },
          { title: "Tenure patterns preceding resignation", body: "The Pearl watches historical exits and surfaces employees currently matching those patterns." },
          { title: "Calendar patterns for burnout risk", body: "Excessive meeting density, no-focus-time weeks, off-hours coordination — patterns that historically precede engagement drops." },
          { title: "Comp-review timing vs cohort norms", body: "Employees who are due for a comp review but haven&rsquo;t had one, indexed against tenure cohort." },
          { title: "Manager 1:1 cadence drift", body: "Which managers have skipped 1:1s with which reports and for how many cycles." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Candidate stalled at same stage as prior lost candidates", body: "The Pearl surfaces the candidate + the pattern + a proposed unblock." },
          { title: "Onboarding milestone missed with prior-cohort risk correlation", body: "The Pearl surfaces the missed milestone to the hiring manager with the retention risk data." },
          { title: "Engagement decline crossing manager-team threshold", body: "The Pearl surfaces to Head of People + the manager, with the timing context." },
          { title: "Resignation-pattern match on a current employee", body: "The Pearl surfaces the employee to their manager + Head of People with the specific signals matched." },
          { title: "Approval-graph deadlock on offer or comp change", body: "Escalation through delegation chain." },
          { title: "Employment-law-relevant deadline approaching", body: "The Pearl surfaces filings, benefits enrollment windows, or performance-cycle deadlines." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 03 · Departments", body: "The department + manager hierarchy the Pearl reads employees against." },
          { title: "Layer 04 · Ingest", body: "The stream from ATS, HRIS, engagement platform, calendar, Slack." },
          { title: "Layer 07 · Memory", body: "Every hire, exit, comp-review, engagement signal lands here and becomes pattern context." },
          { title: "Layer 09 · Detectors", body: "Turns raw signal into the specific attention items HR partners see." },
          { title: "Layer 11 · Approval", body: "Every consequential action (offer, comp change, PIP) passes through here." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos People returns.",
        body: "Two lines. First: retention improvement. HR teams that deploy a Pearl typically catch 40-60% of the &lsquo;preventable exits&rsquo; that used to surface as surprise resignations. At blended fully-loaded cost of $150-300k per lost mid-senior role, catching even one retention risk per quarter more than pays for the Pearl. Second: HR-partner hour reclamation. Your senior HR partners spend disproportionate time on the highest-signal manager teams and the highest-risk employees, not on universal-check-in busywork. That&rsquo;s a shift from spreading attention thinly to focusing it where it matters.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "Is this a surveillance tool?", body: "No. Nebbos People reads the systems your HR team already reads — ATS, HRIS, engagement platform. It surfaces patterns to HR, not to managers on their direct reports. The audit trail (Layer 15) is a compliance feature, not a monitoring one." },
          { title: "What about employment-law compliance?", body: "The Pearl operates through your existing HR processes. Nothing bypasses your comp committee, your PIP process, or your termination-review protocols. Approval graph (Layer 11) enforces this." },
          { title: "How does data privacy work?", body: "Row-level tenant isolation (Layer 01) means employee data never leaves your tenant. Retention policies are configurable per your employment-law jurisdiction." },
          { title: "Does this replace our HR team?", body: "No. It removes the correlation-across-systems work that no HR partner has time for. Your HR partners still make every consequential decision." },
          { title: "Can we take our tuning with us?", body: "Yes — portability is contractual." },
          { title: "What if the Pearl misidentifies someone as retention risk?", body: "It surfaces to HR, not to the manager. HR reviews the pattern, decides whether to engage. False positives don&rsquo;t become adverse actions." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Fast-growing SaaS company, 460 employees.",
        body: "A fast-growing mid-market SaaS company deployed Nebbos People to their HR team in month one. Baseline: 22% annual regretted attrition, ~$4.1M annual replacement cost. By month nine, the Pearl was surfacing 3-4 retention-risk employees per week to HR partners, of whom roughly 60% engaged and stayed. Regretted attrition dropped to 14% by year-end — approximately $1.5M in avoided replacement cost. Head of People calls the Pearl &lsquo;the second HRBP we couldn&rsquo;t hire fast enough&rsquo;. Illustrative scenario.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos Operations — for on-call rotation coverage tied to headcount" },
          { title: "Nebbos Finance — for payroll variance + headcount forecast reconciliation" },
          { title: "Nebbos K-12 Education — for district HR + substitute coverage" },
          { title: "Nebbos Governance — for HR audit + compliance filings" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, engineering wires ATS + HRIS + engagement connectors." },
          { title: "Week 2 · Pearl deployment + org scoping", body: "Nebbos General People deploys. Head of People reviews first-pass detection thresholds. First surfaces begin." },
          { title: "Week 3 · First actions in-loop", body: "The Pearl runs alongside your team for a week. Every accept/reject/edit trains the Pearl." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos People on your growing team.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · K12 ══════════════════════════ */
  "solutions/k12": {
    slug: "/solutions/k12",
    title: "Nebbos Education · The Pearl for district operations",
    metaDescription: "Nebbos Education runs the district's coverage, scheduling, and compliance — quietly enough that principals get to think about kids.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "K12",
        h1: "The Pearl for district operations.",
        deck: "Nebbos Education runs the schedule, the coverage, the compliance filings, the hiring pipeline — so principals and superintendents get to think about kids.",
        imageFamily: "solution-people-hr",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "K-12 districts run on overworked administrators and outdated systems.",
        body: "Your superintendent&rsquo;s office runs substitute coverage across 20-40 schools, tracks 30+ state and federal compliance filings, manages a teacher-hiring pipeline against a chronic national shortage, and answers to a school board every month. There is no full-time analyst to correlate across the SIS, the HR system, the substitute-teacher platform, the state reporting portal, and the parent-communication tool. So the substitute gap at Elementary #7 becomes a coverage crisis Wednesday morning that a district admin catches in the parent-complaint email Thursday. Nebbos Education is the persistent attention layer district operations has always needed and never had budget for.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs district operations.",
        body: "Nebbos Education is a per-department Pearl deployed to your district-operations Shell. It reads from your SIS (PowerSchool, Infinite Campus), your HR system, your substitute-management platform (Frontline, Aesop), your state compliance portal, and your parent-communication tool — and reasons across all of them. It surfaces the coverage gaps, the compliance filings due, the enrollment shifts that will hit next year&rsquo;s budget, the teacher-pipeline stages that are stalling. Every action goes through your superintendent&rsquo;s approval graph with an attested trail — because K-12 accountability is public accountability.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing district stack.",
        body: "Nebbos Education sits behind PowerSchool, Frontline, Workday, your state reporting portal — via named connectors. Nothing changes about how your teachers, principals, or district staff work. Surfaces land in the channels your admin team already uses. Approval routes to your superintendent, HR director, or business manager as configured.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every substitute coverage decision, every compliance filing, every enrollment forecast trains your Pearl. Month one, useful but generic. Month twenty-four, your Nebbos Education knows YOUR district — which schools consistently under-cover, which sub-teachers get repeat requests, which compliance filings historically get filed late, which enrollment patterns precede budget renegotiation. Portable to you.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Substitute coverage gaps across schools", body: "By day, by school, by grade band, by subject — the Pearl surfaces gaps as soon as sub availability shifts, not the morning of the coverage failure." },
          { title: "Compliance filing calendar drift", body: "The 30+ state and federal filings tracked continuously against their deadlines, with evidence-packet readiness surfaced." },
          { title: "Enrollment shifts affecting next-year budget", body: "Kindergarten registration patterns, mid-year transfers, ELL enrollment shifts — signal for budget conversations 6-9 months out." },
          { title: "Teacher-pipeline stalling stages", body: "Which candidate stages take longer than baseline, for which subjects, from which recruitment sources." },
          { title: "Parent-communication response cadence", body: "Which schools respond to parent inquiries within your district&rsquo;s SLA and which don&rsquo;t — before it becomes a school-board conversation." },
          { title: "IEP + 504 meeting cadence", body: "Which required special-education meetings are approaching deadline and status of parent notification." },
          { title: "Substitute-teacher quality signal", body: "Which sub-teachers get repeat requests, which get avoided — pattern data that helps the district sub-coordinator." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Coverage gap crossing threshold for tomorrow", body: "The Pearl surfaces to the district sub-coordinator + affected principal with proposed sub-list." },
          { title: "Compliance filing deadline with incomplete evidence", body: "The Pearl surfaces with the specific gap + who owns closing it." },
          { title: "Enrollment pattern crossing budget-relevant threshold", body: "The Pearl surfaces to the business manager with the projection + driver detail." },
          { title: "Teacher candidate stalled at prior lost-candidate stage", body: "The Pearl surfaces with the pattern + a proposed unblock." },
          { title: "Parent complaint pattern at a specific school", body: "The Pearl surfaces to superintendent + principal with the pattern." },
          { title: "IEP deadline approaching with incomplete parent notification", body: "The Pearl surfaces to sped director + case manager." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 03 · Departments", body: "Schools + programs + grade bands modeled first-class." },
          { title: "Layer 04 · Ingest", body: "SIS, HR, substitute platform, state portal, parent comms." },
          { title: "Layer 07 · Memory", body: "Every coverage decision, every filing, every enrollment shift becomes context." },
          { title: "Layer 11 · Approval", body: "Every consequential district action passes through superintendent&rsquo;s approval graph." },
          { title: "Layer 15 · Attestation", body: "Public-accountability audit trail ready for school-board + state review." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Education returns.",
        body: "Two lines. First: coverage-crisis avoidance. Districts that deploy a Pearl typically eliminate 50-70% of same-day sub coverage scrambles by surfacing gaps 24-72 hours out. That&rsquo;s not just admin time saved — it&rsquo;s classroom continuity for students. Second: compliance filing on-time rate. Districts running Nebbos Education typically improve on-time state + federal filing rate from ~85% to ~99%, avoiding the state investigations and consent-decree risks that arise from missed filings. At district scale, both matter more than they cost.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "Is this FERPA-compliant?", body: "Row-level tenant isolation at Layer 01 means student data never leaves your district tenant. Retention configured to FERPA. Audit trail (Layer 15) ready for state review." },
          { title: "What about data ownership?", body: "Your district owns its data. Portability is contractual — everything exports on offboarding." },
          { title: "How does this fit with our state SIS?", body: "Named connectors for the major SIS platforms (PowerSchool, Infinite Campus, Skyward). OAuth adapters for state-specific systems." },
          { title: "What if the Pearl proposes a coverage decision that violates union rules?", body: "It proposes; a named district admin approves. Union rules are context the Pearl learns from your team&rsquo;s past decisions." },
          { title: "How does pricing work for districts?", body: "Same $150/seat model. Seats scale with district admin + principal seat count, not with student enrollment." },
          { title: "Can we opt out of specific data sources?", body: "Yes. Connectors are per-source and configurable." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Mid-sized suburban district, 18 schools, 12,000 students.",
        body: "A mid-sized suburban school district deployed Nebbos Education to their central-office operations team in month one. Baseline: 12-15 same-day substitute coverage scrambles per week, 4-6 late state filings per year averaging $50k in remediation costs. By month six, same-day scrambles dropped to 3-4 per week as the Pearl surfaced coverage gaps 48-72 hours out. By year-end, late state filings dropped to 1. The superintendent calls it &lsquo;the operations chief of staff we could never afford to hire&rsquo;. Illustrative scenario.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos People — for teacher hiring pipeline + retention" },
          { title: "Nebbos Operations — for cross-school incident coordination" },
          { title: "Nebbos Governance — for state + federal compliance filings" },
          { title: "Nebbos Public Sector — for districts operating as public agencies" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, engineering wires SIS + HR + sub-platform + state portal connectors." },
          { title: "Week 2 · Pearl deployment + district scoping", body: "Nebbos General Education deploys into your operations Shell. First surfaces begin." },
          { title: "Week 3 · First district-week in-loop", body: "The Pearl runs alongside your central office for a week. Every accept/reject trains it." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Education on your district operations.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · HEALTHCARE ══════════════════════════ */
  "solutions/healthcare": {
    slug: "/solutions/healthcare",
    title: "Nebbos Care · The Pearl for care coordination, compliance",
    metaDescription: "Nebbos Care runs the care coordination between clinicians, the compliance filings, and the operational handoffs — so care teams focus on care.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Healthcare",
        h1: "The Pearl for care coordination.",
        deck: "Nebbos Care runs the operational layer of a well-designed healthcare organization — schedules, coverage, referrals, compliance — so care teams focus on care.",
        imageFamily: "solution-people-hr",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Healthcare operations run on clinical staff spending 30-40% of their time on coordination, not care.",
        body: "Your clinical operations team is the connective tissue between physicians, nurses, care coordinators, referring practices, insurance, and compliance. When something falls through the seams — a referral that stalled, a follow-up appointment that got missed, a HIPAA-relevant workflow that wasn&rsquo;t documented — the cost lands on a patient. And your senior care coordinators spend a disproportionate share of their week on coordination-across-systems work that AI is genuinely well-suited to. Nebbos Care is the operational Pearl that reads across your EMR, your scheduling platform, your referral system, and your compliance tooling — and hands your clinical team back the hours.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs your care coordination.",
        body: "Nebbos Care is a per-department Pearl deployed to your clinical-operations Shell. It reads from your EMR (Epic, Cerner, Athenahealth), your scheduling platform, your referral-management system, your patient-portal messaging, and your compliance tooling — and reasons across all of them. It surfaces stalled referrals, patients due for follow-up, coverage gaps in the on-call rotation, compliance filings approaching deadline, and care-coordination handoffs that are missing context. Every action passes through your clinical-operations director&rsquo;s approval graph with a HIPAA-adequate audit trail.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing clinical stack.",
        body: "Nebbos Care sits behind your EMR, scheduling, referral, and compliance systems via named connectors. Nothing changes about how clinicians, care coordinators, or admin staff work. Surfaces land in the tools your team already uses. Approval routes to your clinical-operations director or the care coordinator responsible.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every referral outcome, every follow-up completion, every care handoff trains your Pearl. Month twenty-four, your Nebbos Care knows YOUR practice — which specialists actually respond to referrals within your SLA, which patient populations have the highest follow-up completion, which care-team handoffs consistently drop context. Portable to you.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Care-team coverage across shifts and specialties", body: "By day, by department, by specialty — surfaces gaps before they hit a patient." },
          { title: "Referrals + care-coordination handoffs", body: "Which referrals have stalled, at which specialist office, for how long." },
          { title: "Compliance filings on schedule", body: "HIPAA, state health department reports, insurance credentialing renewals." },
          { title: "Patient-flow bottlenecks before they become backlogs", body: "Wait-time patterns by clinic, by day, by provider." },
          { title: "Follow-up appointment adherence patterns", body: "Which patient cohorts miss follow-up at higher-than-baseline rates." },
          { title: "Insurance-authorization drift", body: "Which prior-authorization requests are stalling and where." },
          { title: "Clinician-burnout risk signals", body: "Chart-completion patterns, message-response volume, off-hours workload." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Referral stalled past baseline at same specialist as prior lost referrals", body: "Pearl surfaces to care coordinator with pattern + proposed action." },
          { title: "Follow-up missed with clinical-risk correlation", body: "Pearl surfaces to care team + primary clinician." },
          { title: "Compliance filing approaching deadline with incomplete evidence", body: "Pearl surfaces to compliance officer." },
          { title: "Coverage gap for tomorrow&rsquo;s shift", body: "Pearl surfaces to clinical-operations director with proposed coverage." },
          { title: "Insurance authorization approaching expiration mid-treatment", body: "Pearl surfaces to care coordinator." },
          { title: "Clinician burnout signals crossing threshold", body: "Pearl surfaces to clinical director for private conversation." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 03 · Departments", body: "Clinical departments + care teams first-class." },
          { title: "Layer 04 · Ingest", body: "EMR, scheduling, referrals, patient-portal, compliance systems." },
          { title: "Layer 07 · Memory", body: "Every care decision, every referral, every follow-up becomes context." },
          { title: "Layer 11 · Approval", body: "Every consequential action passes through the clinical-operations approval graph." },
          { title: "Layer 15 · Attestation", body: "HIPAA-adequate audit trail ready for regulatory review." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Care returns.",
        body: "Two lines. First: clinician hours reclaimed. Care organizations that deploy a Pearl typically reclaim 15-25% of care-coordinator time from cross-system coordination work back to direct patient interaction. Second: care-quality metric improvement. Follow-up adherence, referral completion, and compliance filing rates all typically improve 20-40% within the first two quarters. Both are quality metrics AND cost metrics — improved follow-up prevents readmissions, completed referrals prevent care fragmentation, on-time filings prevent penalty exposure.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "Is this HIPAA-compliant?", body: "Yes. Row-level tenant isolation (Layer 01), attested audit trail (Layer 15), BAA available, retention configurable per HIPAA requirements. Full compliance detail at /compliance." },
          { title: "How does this fit with our EMR&rsquo;s AI features?", body: "Nebbos Care reads FROM your EMR + every other system — it doesn&rsquo;t replace EMR-native functionality, it adds a cross-system coordination layer above." },
          { title: "What about clinical decision-making?", body: "Nebbos Care is a coordination Pearl, not a clinical-decision one. Every clinical decision remains with the clinician. Care-coordination + operational decisions pass through your approval graph." },
          { title: "Data residency requirements?", body: "Configurable per tenant." },
          { title: "How does this handle emergency workflows?", body: "Emergency workflows bypass routine approval routes via configurable break-glass paths — with heavier audit signature." },
          { title: "Can we take our tuning with us?", body: "Yes — portability is contractual." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Multi-specialty ambulatory practice, 340 clinicians.",
        body: "A mid-sized multi-specialty ambulatory practice deployed Nebbos Care to their clinical-operations team in month one. Baseline: 34% referral completion rate at 30 days, 68% follow-up adherence, 4-6 compliance filings late per year. By month twelve, referral completion improved to 61%, follow-up adherence to 84%, and no compliance filings were late. The chief medical officer notes: &lsquo;we didn&rsquo;t change our clinicians&rsquo; workflow — we changed what happened between our clinicians&rsquo; workflows&rsquo;. Illustrative scenario.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos People — for clinician hiring + retention" },
          { title: "Nebbos Operations — for cross-facility incident coordination" },
          { title: "Nebbos Governance — for HIPAA + state compliance" },
          { title: "Nebbos Finance — for revenue cycle + insurance reconciliation" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA + BAA signed, engineering wires EMR + scheduling + referral + compliance connectors." },
          { title: "Week 2 · Pearl deployment + clinical scoping", body: "Nebbos General Care deploys into your clinical-operations Shell." },
          { title: "Week 3 · First care-week in-loop", body: "The Pearl runs alongside your team. Every accept/reject trains it." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Care on your clinical operations.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · FINANCIAL-SERVICES ══════════════════════════ */
  "solutions/financial-services": {
    slug: "/solutions/financial-services",
    title: "Nebbos FS · The Pearl for trading ops, risk, audit",
    metaDescription: "Nebbos Financial Services runs trading-ops — reconciliations, risk gates, audit attestation — so traders and risk teams work at their desk, not their backlog.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Financial Services",
        h1: "The Pearl for trading ops, risk, audit.",
        deck: "Nebbos Financial Services runs the operational + governance layer of a modern trading floor — reconciliations, risk gates, audit attestation — and keeps every action attested.",
        imageFamily: "solution-finance",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Trading floors are drowning in operational cycles that regulators demand and traders resent.",
        body: "Your trading floor runs on pre-market checks, overnight P&L reconciliation, post-trade compliance attestation, and regulatory filings — every day. Your risk desk spends more time on operational reconciliation than on risk analysis. Your compliance team runs the same daily checklist against evolving regulation. All of this is high-volume, high-precision, low-judgment work that AI is genuinely well-suited to — but the audit trail has to be bulletproof, because regulators are actual regulators. Nebbos Financial Services is the operational Pearl designed for exactly this — precision + speed + a hash-chained trail your inspector-general can verify.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs your trading operations.",
        body: "Nebbos Financial Services is a per-department Pearl deployed to your trading-operations Shell. It reads from your OMS/EMS, your risk-management system, your reconciliation platform, your regulatory-reporting stack — and reasons across all of them. It runs overnight P&L reconciliation, pre-market checks, post-trade attestation, and regulatory-filing preparation. Every consequential action passes through your compliance officer&rsquo;s approval graph with a cryptographically-verifiable audit trail (Layer 15).",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing trading stack.",
        body: "Nebbos FS sits behind your OMS, EMS, risk system, and reconciliation platform via named connectors. Nothing changes about how traders execute or how risk analysts model. Surfaces land in the tools your team already uses. Approval routes to your compliance officer, chief risk officer, or trading desk head as configured.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every reconciliation, every risk gate, every regulatory filing trains your Pearl. Month twenty-four, your Nebbos FS knows YOUR firm — which venues consistently miss T+1 reconciliation, which risk metrics matter for your book, which regulatory filings your inspector-general cares about most. Portable.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Overnight P&L reconciliation across venues", body: "Cross-venue reconciliation with drift detection." },
          { title: "Pre-market checks + risk gate approvals", body: "Pre-market status dashboard with the specific checks that need attention." },
          { title: "Regulatory attestations attached to each decision", body: "SEC, FINRA, MiFID II, EMIR filings tracked continuously." },
          { title: "Post-trade audit trail portable to the auditor", body: "Every trade + its attestations available in a regulator-format export." },
          { title: "Position-limit drift by book, by trader, by instrument", body: "The Pearl watches limits vs actuals and surfaces drift before it becomes a violation." },
          { title: "Counterparty-risk-metric shifts", body: "Which counterparties&rsquo; credit metrics are shifting and what that implies for your exposure." },
          { title: "Best-execution analytics", body: "Execution quality by venue, by algo, by time-of-day — for reg BE compliance + trader coaching." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Reconciliation break past T+1 tolerance", body: "Pearl surfaces to ops with the specific transactions + proposed resolution." },
          { title: "Position-limit approaching threshold", body: "Pearl surfaces to trader + risk with the projected trajectory." },
          { title: "Regulatory filing approaching deadline with incomplete evidence", body: "Pearl surfaces to compliance." },
          { title: "Best-execution outlier detected", body: "Pearl surfaces to trader + compliance." },
          { title: "Counterparty credit-metric shift crossing threshold", body: "Pearl surfaces to risk + trading desk." },
          { title: "Approval-graph deadlock during market hours", body: "Escalation through delegation chain immediately." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 04 · Ingest", body: "OMS, EMS, risk system, reconciliation platform." },
          { title: "Layer 07 · Memory", body: "Every trade, every reconciliation, every filing becomes context." },
          { title: "Layer 09 · Detectors", body: "Turns raw trade streams into the specific compliance + risk attention items." },
          { title: "Layer 11 · Approval", body: "Every consequential action passes through compliance&rsquo;s approval graph." },
          { title: "Layer 15 · Attestation", body: "Hash-chained trail regulator can verify — SEC, FINRA, MiFID II, EMIR ready." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos FS returns.",
        body: "Two lines. First: operational-error reduction. Trading operations that deploy a Pearl typically reduce settlement-failure rate 40-60% and audit-remediation costs 30-50% within two quarters. In FS, both dollar amounts are large. Second: regulator readiness. What used to be a quarterly compliance-scramble is now a continuous state — the audit trail is complete every day, not assembled quarterly. Regulator inspection times measured in days, not weeks.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "How is this different from a rec platform + a risk system?", body: "Rec + risk platforms each solve one operational layer. Nebbos FS reasons across ALL of them PLUS your OMS, EMS, and regulatory tooling — and the compounding memory is what generic platforms can&rsquo;t match." },
          { title: "What about regulator acceptance of AI-driven attestation?", body: "The Pearl proposes; a named human approves. Attestation records the human sign-off, not the AI recommendation. Standard human-in-the-loop compliance." },
          { title: "Data residency + segregation?", body: "Row-level tenant isolation (Layer 01). Configurable data residency (US / EU / APAC)." },
          { title: "What if the Pearl surfaces a false-positive during market hours?", body: "It surfaces; a human decides. False positives don&rsquo;t become automatic trading actions." },
          { title: "Can we tune the risk thresholds?", body: "Yes. Every detection threshold is configurable per book, per desk, per instrument class." },
          { title: "Portability of tuning if we switch platforms?", body: "Yes — contractual." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Regional broker-dealer, 180 traders + ops staff.",
        body: "A mid-market regional broker-dealer deployed Nebbos FS to their operations desk in month one. Baseline: 2.3% settlement failure rate, 6-week annual audit-remediation cycle, ~$800k in operational-error costs. By month nine, settlement-failure rate dropped to 0.9%, audit-remediation compressed to 8 days, operational-error costs dropped ~55%. Their chief compliance officer notes: &lsquo;we&rsquo;re not less scrutinized — we&rsquo;re more prepared&rsquo;. Illustrative.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos Finance — for the corporate-finance side of an FS firm" },
          { title: "Nebbos Governance — for regulatory attestation + compliance" },
          { title: "Nebbos Operations — for cross-desk incident coordination" },
          { title: "Nebbos Security — for trading-floor cybersecurity operations" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, engineering wires OMS + EMS + risk + reconciliation connectors." },
          { title: "Week 2 · Pearl deployment + desk scoping", body: "Nebbos General FS deploys. Compliance reviews first-pass rules." },
          { title: "Week 3 · First trading-week in-loop", body: "The Pearl runs alongside your desk. Every approval trains it." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos FS on your trading operations.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · MANUFACTURING ══════════════════════════ */
  "solutions/manufacturing": {
    slug: "/solutions/manufacturing",
    title: "Nebbos Manufacturing · The Pearl for production, quality, supply",
    metaDescription: "Nebbos Manufacturing runs the production schedule, quality gate, and supply reconciliation — so operations leadership works on the plant, not in it.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Manufacturing",
        h1: "The Pearl for production, quality, supply.",
        deck: "Nebbos Manufacturing reads every signal a production line emits — orders, quality gates, supply, maintenance — and hands operations leadership back their hours.",
        imageFamily: "solution-manufacturing",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Manufacturing operations run on plant managers spending their day firefighting instead of improving.",
        body: "Your plant manager runs a production schedule against a demand signal that shifts weekly, a supply chain that shifts monthly, a quality gate that&rsquo;s only as good as the last inspection, and a preventive-maintenance schedule that&rsquo;s always behind. When one of those variables shifts, the plant manager reacts — which means the improvement work (yield, throughput, waste) never gets the deep attention it deserves. The signal that would enable proactive planning exists in the MES, the ERP, the quality system, the CMMS, and the supplier portal — but the plant manager can&rsquo;t read all of them continuously. Nebbos Manufacturing is that reading layer.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs alongside your plant operations.",
        body: "Nebbos Manufacturing is a per-department Pearl deployed to your production-operations Shell. It reads from your MES, your ERP, your quality-management system, your CMMS (maintenance), and your supplier portal — and reasons across all of them. It surfaces production-schedule risks (before they hit the line), quality-gate trend shifts (before they hit the customer), supply reconciliation gaps (before they hit inventory), and maintenance-window slippage (before it hits uptime). Every consequential action passes through the plant manager&rsquo;s approval graph with an attested trail.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing manufacturing stack.",
        body: "Nebbos Manufacturing sits behind your MES + ERP + QMS + CMMS + supplier systems via named connectors. Nothing changes about how operators, quality inspectors, or maintenance techs work. Surfaces land in the tool your plant leadership already uses.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every production decision, every quality event, every supply reconciliation trains your Pearl. Month twenty-four, your Nebbos Manufacturing knows YOUR plant — which suppliers consistently ship late, which quality gates catch which defect classes, which maintenance windows historically slip. Portable.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Production schedule vs order backlog", body: "Continuous match between production plan and current + projected demand." },
          { title: "Quality gates and their trend line by shift", body: "First-pass yield, defect rate by product, by shift, by operator." },
          { title: "Supply reconciliation across vendors", body: "PO vs delivery vs receiving vs invoice — cross-system rec continuously." },
          { title: "Preventive maintenance before it becomes downtime", body: "PM cadence adherence + equipment condition monitoring." },
          { title: "Cycle-time drift by product family", body: "Which products are running slower than baseline and where in the process." },
          { title: "Warranty-claim pattern signals", body: "Which product cohorts are generating higher warranty claims and correlation with production factors." },
          { title: "Supplier scorecard drift", body: "Quality, on-time, cost — continuously scored, not annually reviewed." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Order at risk of missing commit date", body: "Pearl surfaces to production scheduler with the specific driver + proposed remediation." },
          { title: "Quality gate crossing SPC control limit", body: "Pearl surfaces to quality director with the trend + proposed inspection expansion." },
          { title: "Supplier delivery drift crossing tolerance", body: "Pearl surfaces to procurement + production with the projection." },
          { title: "PM window slipping crossing risk threshold", body: "Pearl surfaces to maintenance manager." },
          { title: "Warranty-claim pattern emerging", body: "Pearl surfaces to quality + engineering with production correlation." },
          { title: "Approval-graph deadlock on rush order or supplier substitution", body: "Escalation through delegation chain." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 04 · Ingest", body: "MES, ERP, QMS, CMMS, supplier portal — everything lands here first." },
          { title: "Layer 07 · Memory", body: "Every production decision, every quality event, every reconciliation becomes context." },
          { title: "Layer 09 · Detectors", body: "Turns raw production streams into specific attention items." },
          { title: "Layer 11 · Approval", body: "Every consequential action passes through the plant approval graph." },
          { title: "Layer 15 · Attestation", body: "Audit trail ready for ISO 9001, IATF, FDA, or sector-specific inspection." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Manufacturing returns.",
        body: "Two lines. First: unplanned-downtime reduction. Plants that deploy a Pearl typically reduce unplanned downtime 20-35% within two quarters — because maintenance windows get surfaced before they slip. Second: first-pass-yield improvement. Quality-gate trend detection catches drift before it becomes scrap, typically improving first-pass yield 3-8 percentage points in the first year. In manufacturing, both drop directly to margin.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "How does this fit with our existing MES?", body: "Nebbos Manufacturing reads FROM your MES + every other system. It doesn&rsquo;t replace MES functionality, it adds cross-system reasoning above." },
          { title: "What about ISO 9001 / IATF audit acceptance?", body: "Every action attested. Audit trail ready for ISO 9001, IATF 16949, and sector-specific quality-system inspections." },
          { title: "Data residency for cross-border manufacturing?", body: "Configurable per tenant." },
          { title: "What about OT/IT separation?", body: "The Pearl reads from your MES + ERP layer, not from control-system PLCs directly. Standard OT/IT boundary respected." },
          { title: "Can we tune per-plant?", body: "Yes. Every threshold is per-plant, per-line, per-product family." },
          { title: "Portability of tuning?", body: "Yes — contractual." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Precision-parts manufacturer, 2 plants, 620 employees.",
        body: "A mid-market precision-parts manufacturer deployed Nebbos Manufacturing to both plants in month one. Baseline: 8.4% unplanned downtime, 91.2% first-pass yield, ~$2.1M annual scrap cost. By month twelve, unplanned downtime dropped to 5.6%, first-pass yield rose to 94.8%, scrap cost dropped ~$700k. Plant director calls it &lsquo;the continuous-improvement engineer we don&rsquo;t have budget for&rsquo;. Illustrative.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos Operations — for cross-plant incident coordination" },
          { title: "Nebbos Finance — for cost accounting + variance" },
          { title: "Nebbos People — for plant workforce + retention" },
          { title: "Nebbos Governance — for ISO / IATF / FDA compliance" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, engineering wires MES + ERP + QMS + CMMS connectors." },
          { title: "Week 2 · Pearl deployment + plant scoping", body: "Nebbos General Manufacturing deploys." },
          { title: "Week 3 · First production-week in-loop", body: "The Pearl runs alongside plant leadership." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Manufacturing on your line.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · PUBLIC-SECTOR ══════════════════════════ */
  "solutions/public-sector": {
    slug: "/solutions/public-sector",
    title: "Nebbos Civic · The Pearl for case management, accountability",
    metaDescription: "Nebbos Civic runs the operational layer of a modern public-sector agency — case management, accountability, citizen response — with an audit trail your inspector-general trusts.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Public Sector",
        h1: "The Pearl for case management, accountability.",
        deck: "Nebbos Civic runs the operational layer of a modern civic agency — case processing, citizen response, accountability filings — with an audit trail your inspector-general trusts.",
        imageFamily: "concept-audit-attestation",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Public-sector agencies serve the public through 1990s systems and 2020s expectations.",
        body: "Your civic agency is expected to respond to citizens with the responsiveness of consumer tech, prove accountability to inspectors-general with the rigor of a bank audit, and do all of it on a budget that hasn&rsquo;t kept pace with the demand. Your caseworkers spend 40-50% of their time on cross-system coordination and status reporting — not on the case itself. Your accountability filings are assembled quarterly from scattered evidence. Nebbos Civic is the operational Pearl designed for exactly this — modern responsiveness on top of your existing systems, with a public-accountability audit trail built in from Layer 15 up.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "One Pearl that runs your civic operations.",
        body: "Nebbos Civic is a per-department Pearl deployed to your agency-operations Shell. It reads from your case-management system, your document management, your citizen-portal messaging, your inter-agency systems, and your compliance-reporting tools — and reasons across all of them. It surfaces case-queue drift, citizen-response patterns, accountability-filing status, and cross-agency handoff quality. Every action passes through your agency-director&rsquo;s approval graph with a public-accountability audit trail.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Deploys behind your existing civic stack.",
        body: "Nebbos Civic sits behind your case management, document management, citizen portal, and inter-agency systems via named connectors. OAuth adapters for state-specific systems. Nothing changes about how caseworkers, supervisors, or citizens interact with your agency. Surfaces land in the tools your team already uses.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "Month 24 vs month 1.",
        body: "Every case decision, every citizen response, every accountability filing trains your Pearl. Month twenty-four, your Nebbos Civic knows YOUR agency — which case types your caseworkers handle fastest, which citizen inquiries generate the most follow-ups, which filings your inspector-general scrutinizes most. Portable.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Case queue by department, by caseworker", body: "Backlog dynamics + throughput per case type." },
          { title: "Citizen response times and their patterns", body: "By channel, by case type, by department." },
          { title: "Accountability filings on schedule", body: "State + federal + local filings tracked continuously." },
          { title: "Cross-agency handoffs and their outcomes", body: "Which handoffs succeed, which stall, which drop context." },
          { title: "Case-outcome quality patterns", body: "Which case types have the highest reversal rates + why." },
          { title: "FOIA / public-records-request response cadence", body: "Compliance with statutory response windows." },
          { title: "Budget-line utilization + cost-per-case trends", body: "Real-time visibility your finance director can use." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Case past statutory response window", body: "Pearl surfaces to caseworker + supervisor with proposed action." },
          { title: "Cross-agency handoff stalled", body: "Pearl surfaces to both agencies + escalates through delegation." },
          { title: "Accountability filing deadline with incomplete evidence", body: "Pearl surfaces to compliance." },
          { title: "FOIA / public-records deadline approaching", body: "Pearl surfaces to records officer." },
          { title: "Cost-per-case trending outside baseline", body: "Pearl surfaces to finance director + agency head." },
          { title: "Approval-graph deadlock on urgent case", body: "Escalation through delegation chain." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 03 · Departments", body: "Agency divisions + case-types first-class." },
          { title: "Layer 04 · Ingest", body: "Case management, document management, citizen portal, inter-agency." },
          { title: "Layer 07 · Memory", body: "Every case decision, every citizen response, every filing becomes context." },
          { title: "Layer 11 · Approval", body: "Every consequential action passes through agency&rsquo;s approval graph." },
          { title: "Layer 15 · Attestation", body: "Public-accountability audit trail ready for inspector-general review." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Civic returns.",
        body: "Two lines. First: citizen-response-time improvement. Agencies that deploy a Pearl typically improve statutory-response compliance from 80% range to 95%+ within two quarters. Second: caseworker capacity. 30-40% of caseworker time reclaimed from cross-system coordination back to direct case work. In public sector, both are outcomes citizens actually experience.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "Is this FedRAMP / StateRAMP compatible?", body: "Row-level tenant isolation + configurable data residency. FedRAMP roadmap: contact enterprise." },
          { title: "How does this handle FOIA / open-records?", body: "Every action is attested. FOIA requests can query the audit trail directly." },
          { title: "What about union / civil-service work rules?", body: "Approval graph + delegation chains respect union work-rule scope." },
          { title: "Data ownership on offboarding?", body: "Full portability — your agency owns its data. Contractual." },
          { title: "What about accessibility + language requirements?", body: "Section 508 / WCAG 2.1 AA compliance. Language support extensible per state." },
          { title: "Can we deploy per-department, not agency-wide?", body: "Yes. Per-department Pearl is the standard deployment shape." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "State human-services agency, 12 departments, 3,400 caseworkers.",
        body: "A mid-sized state human-services agency deployed Nebbos Civic to their case-processing division in month one. Baseline: 78% statutory-response compliance, average 42 days case-processing time, 6-week annual accountability-filing cycle. By month twelve, statutory-response compliance reached 96%, case-processing time dropped to 28 days, accountability-filing cycle compressed to 12 days. The agency inspector-general notes: &lsquo;the audit trail is the most legible I&rsquo;ve seen in twenty years of this work&rsquo;. Illustrative.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos K-12 Education — for education agencies specifically" },
          { title: "Nebbos Governance — for cross-agency accountability filings" },
          { title: "Nebbos People — for civil-service HR + workforce" },
          { title: "Nebbos Operations — for cross-departmental coordination" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Onboarding + connector wiring", body: "MSA signed, engineering wires case management + document management + citizen portal connectors." },
          { title: "Week 2 · Pearl deployment + agency scoping", body: "Nebbos General Civic deploys." },
          { title: "Week 3 · First case-week in-loop", body: "The Pearl runs alongside your team." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Civic on your agency operations.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · MODEL-TRAINING ══════════════════════════ */
  "solutions/model-training": {
    slug: "/solutions/model-training",
    title: "Nebbos Training Substrate · Your operation is the training data",
    metaDescription: "Your enterprise&rsquo;s operational decisions are the highest-value training data on earth. Nebbos captures every human decision as a preference pair — portable to any model you own.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Model Training",
        h1: "Your operation is the training data.",
        deck: "Every human decision your team makes is a preference pair. Nebbos captures every one and hands you a portable dataset — trainable on any model you own or license.",
        imageFamily: "band-intelligence",
      },
      {
        id: "problem",
        kind: "text-block",
        eyebrow: "01 · The problem",
        h2: "Enterprises are producing the most valuable training data on earth and giving it away for free.",
        body: "Every time your team accepts a Pearl-proposed action, edits it, or rejects it with a reason, that&rsquo;s a preference pair — the most valuable training signal for enterprise AI. Most vendors capture this signal and use it to train THEIR next model, which becomes THEIR competitive advantage, which they sell back to you. That&rsquo;s the standard model. Nebbos inverts it. Every preference pair your team generates stays in YOUR tenant, becomes YOUR training corpus, and moves with you if you leave the platform. Your data trains your model, not someone else&rsquo;s.",
      },
      {
        id: "what-it-does",
        kind: "text-block",
        eyebrow: "02 · What it does",
        h2: "The substrate that turns your operation into training data.",
        body: "Nebbos captures every human decision your team makes as a structured preference pair — the proposed action, the human decision (accept / edit / reject), the reason, the context, the outcome. Those pairs accumulate in your tenant&rsquo;s memory (Layer 07). At any time you can export them as a training dataset in your choice of format — for fine-tuning any base model you own or license, whether that&rsquo;s an open-weight model, a frontier model you license, or a custom model you train from scratch. This is the training-substrate side of Nebbos — the counterpart to the governance-substrate side.",
      },
      {
        id: "how-it-fits",
        kind: "text-block",
        eyebrow: "03 · How it fits",
        h2: "Runs alongside every Pearl you deploy.",
        body: "The training substrate is not a separate product — it&rsquo;s a property of every Pearl you run. Nebbos Design, Nebbos Finance, Nebbos Operations — every one of them produces preference pairs that flow into your training corpus. Your ML platform team gets a growing dataset without changing anything about how your operational teams work.",
      },
      {
        id: "compounding",
        kind: "text-block",
        eyebrow: "04 · The compounding value",
        h2: "The moat that grows with use.",
        body: "Every day your Pearls run, your training corpus grows — with the specific decisions your team makes about your specific work. At month one you have a modest dataset. At month twenty-four you have hundreds of thousands of preference pairs about your enterprise&rsquo;s specific operational judgment. That&rsquo;s a moat competitors can&rsquo;t buy — because it&rsquo;s YOUR team&rsquo;s decisions on YOUR work. And if you ever leave Nebbos, the dataset comes with you.",
      },
      {
        id: "signals",
        kind: "list-numbered",
        eyebrow: "05 · Signals it watches",
        h2: "What the Pearl reads from your existing systems.",
        items: [
          { title: "Preference pairs per Pearl per day", body: "The rate at which your team is contributing training signal." },
          { title: "Preference-pair quality metrics", body: "Which decisions have the highest inter-annotator agreement, which have the most rejection-with-reason detail." },
          { title: "Corpus coverage across your operational surface", body: "Which domains have deep coverage, which are thin." },
          { title: "Model-eval performance on your held-out set", body: "How your tuned Pearls perform against your own eval criteria." },
          { title: "Rate of drift between your Pearl and base Nebbos General", body: "How much your team-tuned model has diverged from the shipped base." },
          { title: "Cost-per-decision for fine-tuning vs prompting", body: "Real-time economics of tuning vs continuing to use base models." },
          { title: "Bring-your-own-model integration status", body: "Which of your own models are wired in vs which are still proposed." },
        ],
      },
      {
        id: "triggers",
        kind: "list-numbered",
        eyebrow: "06 · What triggers a Pearl action",
        h2: "The pattern that becomes an action.",
        items: [
          { title: "Enough preference pairs accumulated for a fine-tune", body: "Pearl surfaces to your ML platform team with the dataset ready." },
          { title: "Model drift detected between tuned Pearl and base", body: "Pearl surfaces the divergence + magnitude." },
          { title: "Corpus coverage thin in a specific domain", body: "Pearl surfaces to that department&rsquo;s Pearl owner." },
          { title: "Preference-pair quality dropping in a specific domain", body: "Pearl surfaces to the team with inter-annotator disagreement detail." },
          { title: "Bring-your-own-model performance regression", body: "Pearl surfaces to your ML platform team." },
          { title: "Portability export requested (offboarding or model migration)", body: "Pearl assembles the full corpus + metadata." },
        ],
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "07 · Which architecture layers matter most",
        h2: "The Nebbos layers this Pearl leans on hardest.",
        items: [
          { title: "Layer 07 · Memory", body: "The compounding-value layer — where preference pairs live." },
          { title: "Layer 08 · Reasoning", body: "The multi-provider router that lets you use any model + your tuned versions of them." },
          { title: "Layer 10 · Pearl · Shell", body: "Every Pearl produces preference pairs as a byproduct of doing its work." },
          { title: "Layer 13 · Onboarding", body: "The portability guarantee — your training corpus exports on offboarding." },
          { title: "Layer 15 · Attestation", body: "Every preference pair is attested with the human who produced it, the timestamp, the context." },
        ],
      },
      {
        id: "roi",
        kind: "text-block",
        eyebrow: "08 · The ROI framework",
        h2: "What Nebbos Training Substrate returns.",
        body: "One line, and it&rsquo;s big. Your enterprise&rsquo;s operational judgment — the accumulated decisions of your best people about your specific work — becomes a portable training corpus that only your organization has. Competitors can buy the same base models. They can&rsquo;t buy your team&rsquo;s twenty-four months of decisions on your operation. That&rsquo;s the moat the 23% inference-of-revenue benchmark (Bessemer/Avante/SFAI Labs 2026) rewards — companies whose AI dollars produce owned intelligence, not vendor lock-in.",
      },
      {
        id: "objections",
        kind: "list-numbered",
        eyebrow: "09 · Common objections",
        h2: "What leaders ask first.",
        items: [
          { title: "What if we want to use OpenAI&rsquo;s / Anthropic&rsquo;s / Google&rsquo;s models directly?", body: "You still can — Nebbos&rsquo;s Reasoning layer routes across all major providers. The training substrate captures preference pairs regardless of which provider served the base call." },
          { title: "Can we bring our own fine-tuned model?", body: "Yes. Layer 08 supports bring-your-own-model — your custom-trained model routes alongside provider models." },
          { title: "What about IP ownership on the trained model?", body: "You own it. Contractual. Your preference pairs + your fine-tune weights + your derived models belong to you." },
          { title: "How does this compare to OpenAI Enterprise custom fine-tuning?", body: "OpenAI Enterprise trains YOUR model on YOUR data on OpenAI&rsquo;s infrastructure — which locks you to OpenAI. Nebbos trains YOUR model on YOUR data + gives you the weights + gives you provider choice." },
          { title: "What about the 23% inference-of-revenue KPI?", body: "That&rsquo;s the Bessemer/Avante/SFAI Labs 2026 benchmark — AI-native companies whose AI dollars produce owned intelligence run at ~23% inference-of-revenue. OpenAI is running at 56%. The training substrate is what closes that gap." },
          { title: "Can we take our corpus with us?", body: "Yes — portability is contractual and non-negotiable." },
        ],
      },
      {
        id: "case-study",
        kind: "text-block",
        eyebrow: "10 · Case study — illustrative design-partner scenario",
        h2: "Mid-market fintech, 340 employees, 3 departments live on Nebbos.",
        body: "A mid-market fintech deployed 3 Pearls (Finance, Operations, Governance) in month one. Their ML platform team wasn&rsquo;t consulted — the training corpus accumulated as a byproduct of ops teams using their Pearls. By month twelve, they had 340,000+ preference pairs across finance-operations and compliance-workflow domains. Their VP of Data called it &lsquo;the training corpus we would have paid $2M to build from scratch, that we got by using the operational software our teams needed anyway&rsquo;. They&rsquo;ve since fine-tuned two custom models on this corpus. Illustrative.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "11 · Related solutions",
        h2: "Deploys alongside.",
        items: [
          { title: "Nebbos Finance / Operations / People — every Pearl produces preference pairs" },
          { title: "Nebbos Governance — for training-data provenance + attestation" },
        ],
      },
      {
        id: "getting-started",
        kind: "list-numbered",
        eyebrow: "12 · Getting started",
        h2: "Three weeks from signature to live.",
        items: [
          { title: "Week 1 · Deploy first Pearl", body: "Standard Pearl deployment. Preference-pair capture starts automatically." },
          { title: "Week 4 · Review first corpus snapshot", body: "Your ML platform team reviews the corpus + quality metrics." },
          { title: "Week 12 · First tune", body: "Your first fine-tune run on the accumulated corpus. Bring-your-own-model integration begins." },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put your operation into your own training corpus.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "See the architecture", href: "/product", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ TRUST / SECURITY / COMPLIANCE ═════════════════ */
  trust: {
    slug: "/trust",
    title: "Trust · Accountable by architecture",
    metaDescription:
      "Every action a Pearl takes is attested in an audit trail your CISO, your general counsel, and your regulator can read. The governance is the substrate, not a feature.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "00 · Trust",
        h1: "Accountable by architecture.",
        deck: "Every action a Pearl takes is attested in an audit trail your CISO, your general counsel, and your regulator can read. The governance is the substrate, not a feature.",
        imageFamily: "concept-audit-attestation",
      },
      {
        id: "commit",
        kind: "text-block",
        eyebrow: "01 · What Nebbos commits to",
        h2: "Four commitments Nebbos makes to every tenant.",
        body: "First — your data belongs to you, in every form it takes inside the platform. Second — every consequential action a Pearl takes carries the identity of a named human who approved it. Third — every action lands in an audit trail that is append-only, hash-chained, and portable to you. Fourth — if you ever leave, your data, your tuned Pearls, and your audit trail export in a machine-readable format on a timeline you control. These are not features. They are load-bearing properties of the substrate. Removing any one of them would require a substrate rebuild.",
      },
      {
        id: "why-architectural",
        kind: "text-block",
        eyebrow: "02 · Why architectural, not contractual",
        h2: "Why trust is architectural, not contractual.",
        body: "Every enterprise SaaS contract contains language about data ownership, audit trails, and portability. In most cases, that language is written in a way that would be difficult to enforce if the vendor took a shortcut. Nebbos is architected so that shortcuts are structurally impossible, not contractually forbidden. Row-level tenant isolation at the substrate means an application-layer bug cannot leak your data to another tenant — the isolation is a database primitive, not a policy. Append-only attestation means an operator cannot rewrite history — the storage layer refuses updates. Portability is not a promise for offboarding day — the export routine runs on every deploy, so we know it works before you need it. Every trust claim becomes a property the code cannot violate, and the contract describes what the code already enforces.",
      },
      {
        id: "pillars",
        kind: "list-numbered",
        eyebrow: "03 · The four accountability pillars",
        h2: "The four accountability pillars.",
        items: [
          { title: "Every human approval attested and time-stamped", body: "Every consequential action flows through Layer 11 · Approval. Every approval carries the identity of the named human who made it (Layer 02 · Identity), the timestamp, the context they saw, and the specific action they authorized. Attestation is cryptographic — the record is signed and cannot be altered without breaking a hash chain your auditor verifies independently." },
          { title: "Every Pearl action logged to an append-only audit trail", body: "Every action a Pearl performs — every read, every proposal, every write — lands in Layer 15 · Attestation. Append-only means the storage engine refuses in-place updates. Hash-chained means each record cryptographically depends on the previous. Your inspector-general walks the chain end-to-end and verifies no record was inserted, altered, or removed after the fact." },
          { title: "Every request carries identity through row-level tenant isolation", body: "The substrate enforces tenant isolation at Layer 01 · Data, not at the application layer. Row-level security policies attached to every table check the request&rsquo;s identity claim against the row&rsquo;s tenant ownership. An application-layer bug that forgets to include a tenant filter cannot leak data — the database refuses the read. This is a structural property, not a code convention." },
          { title: "Every audit trail is portable to you if you leave", body: "The audit-trail export is a first-class capability, not a departure-day scramble. Any tenant requests a full audit-trail export at any time, in a machine-readable format (JSONL + independent verifier), that your inspector-general runs against the hash chain independently of Nebbos infrastructure. Because the export routine runs on every deploy, we know it works when you need it, not only after you have asked." },
        ],
      },
      {
        id: "ownership",
        kind: "text-block",
        eyebrow: "04 · Data ownership + portability",
        h2: "Data ownership and portability, in detail.",
        body: "You own every byte of data your tenant produces or ingests. This includes raw inputs (documents, events, transactions), Pearl-generated artifacts (proposals, drafts, plans), memory (accumulated context, preference pairs, tuning), audit records, and any derived intelligence. Nebbos&rsquo;s license to your data is scoped strictly to operating the platform on your behalf — we do not train shared models on your data, we do not aggregate your data with other tenants, we do not sell insights derived from your data to any third party. On offboarding, you receive a complete export: raw data + memory + tuned Pearl weights + audit trail + verifier tooling. The export runs on a timeline you control. After confirmed receipt, we execute a documented data-destruction routine and provide the certificate of destruction your legal team needs for retention records.",
      },
      {
        id: "attestation",
        kind: "text-block",
        eyebrow: "05 · Attestation as product",
        h2: "Attestation — the audit trail as a first-class product.",
        body: "Layer 15 · Attestation is not a logging feature — it is a load-bearing product surface. Every read against your data by any Pearl carries an attestation record identifying which Pearl, which action, which human authorization, and which context. The chain is hash-linked at the storage layer so tampering is detectable end-to-end. Attestation is queryable by your team through the same interface your Pearls use — your inspector-general has direct access to the raw audit surface, not a filtered dashboard. The record format is documented and stable. Auditors accept it as SOX-adequate, HIPAA-adequate, and EU-AI-Act-Article-12-adequate evidence.",
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "06 · Which architecture layers make trust real",
        h2: "Which architecture layers make trust real.",
        items: [
          { title: "Layer 01 · Data", body: "Row-level tenant isolation enforced at the database, not the application. Structural, not policy." },
          { title: "Layer 02 · Identity", body: "Every request carries an identity. Service accounts, humans, and workloads each have distinct identity classes with distinct authorization scopes." },
          { title: "Layer 11 · Approval", body: "Every consequential action flows through here. Approval routes are configurable per department, per action class, per risk tier." },
          { title: "Layer 13 · Onboarding", body: "The portability guarantee lives here. Offboarding is a first-class flow, not an exception path." },
          { title: "Layer 15 · Attestation", body: "Append-only, hash-chained audit trail. The record your regulator reads." },
        ],
      },
      {
        id: "negative-space",
        kind: "list-numbered",
        eyebrow: "07 · What Nebbos does NOT do",
        h2: "What Nebbos does not do — the negative-space commitments.",
        items: [
          { title: "No shared-model training on your data", body: "Your preference pairs stay in your tenant. Your data does not train a model available to any other tenant." },
          { title: "No cross-tenant aggregation for our own benchmarks", body: "We do not compute aggregate metrics across tenants for our own marketing or benchmarking." },
          { title: "No sub-processor added without notice", body: "Every sub-processor is disclosed on the security page. New sub-processors require 30-day advance notice per DPA." },
          { title: "No autonomous consequential actions", body: "Every consequential action requires named human approval. There is no configuration option that removes this — it is architectural." },
          { title: "No dark patterns in offboarding", body: "Offboarding is a documented flow with defined timelines. There is no retention-friction pattern designed to delay departure." },
          { title: "No opaque model chain-of-thought hiding", body: "Every Pearl action carries the reasoning trace that produced it, available to the human who approves and to the audit trail." },
        ],
      },
      {
        id: "comparison",
        kind: "text-block",
        eyebrow: "08 · Comparative posture",
        h2: "Comparative posture.",
        body: "The typical enterprise AI-vendor stack ships governance as a compliance-team deliverable — security whitepapers, a SOC 2 report, a data-processing addendum, an EU-AI-Act annex. All of that exists at Nebbos too. But at most vendors, those documents describe what the vendor promises not to do. Nebbos&rsquo;s posture is different: governance is a set of properties the substrate enforces, and the documents describe what the substrate already prevents. Row-level isolation is enforced by the database. Human-in-the-loop is enforced by the approval graph. Attestation is enforced by the append-only storage engine. Portability is exercised on every deploy. The document layer is thin because the substrate is thick — the auditor&rsquo;s job is to verify the code, not to trust the promise.",
      },
      {
        id: "questions",
        kind: "list-numbered",
        eyebrow: "09 · Common questions",
        h2: "Common questions from buyer, legal, and CISO.",
        items: [
          { title: "How does row-level isolation actually work?", body: "Postgres row-level security policies attached to every table. Every request carries a tenant identity in a request-scoped context variable. RLS policies compare that identity against the row&rsquo;s tenant column. An application-layer bug that forgets the filter fails closed — the database refuses the read." },
          { title: "Can we run our own tenant on our own infrastructure?", body: "Yes — single-tenant deployment is available on the enterprise tier. Contact enterprise@nebbos.ai." },
          { title: "What happens to our data if Nebbos is acquired?", body: "The MSA carries an acquisition-continuity clause. Any acquirer inherits the data-ownership and portability commitments. If terms change, you trigger the accelerated-offboarding path with no exit fee." },
          { title: "Can we get a copy of the audit-trail verifier tool?", body: "Yes. It ships with the offboarding export and is available under NDA before then. Written in Rust; verifies hash-chain integrity independently of Nebbos infrastructure." },
          { title: "What about model-provider data-retention?", body: "Model-provider settings are configurable per tenant. Anthropic, OpenAI, Google, and self-hosted-model configurations each have distinct retention profiles. Default: zero-retention where the provider supports it." },
          { title: "How do you handle a subpoena or law-enforcement request?", body: "We route through counsel and notify the tenant unless legally prohibited. Detailed procedure at /legal/law-enforcement." },
        ],
      },
      {
        id: "certs",
        kind: "list-numbered",
        eyebrow: "10 · Attestations + certifications",
        h2: "Attestations and certifications.",
        items: [
          { title: "SOC 2 Type II", body: "Controls implemented and operating across security, availability, confidentiality, and privacy trust services criteria. Report available under NDA." },
          { title: "ISO 27001:2022", body: "Information security management system built to ISO 27001:2022. Statement of applicability, risk register, and control narratives available under NDA." },
          { title: "EU AI Act Article 11 · Annex IV", body: "Technical documentation pack for high-risk AI systems available under NDA. Compiled per Article 11 requirements. Compliance deadline for Annex III scope: 2027-08-02." },
          { title: "HIPAA — healthcare readiness", body: "BAA available. Substrate controls map to HIPAA Security Rule administrative, physical, and technical safeguards." },
          { title: "FERPA — K-12 and higher-ed readiness", body: "Substrate controls map to FERPA educational-records handling. Documented onboarding path for districts and higher-ed." },
          { title: "GDPR + CCPA + state-privacy regimes", body: "DPA at /legal/dpa. Data-subject rights (access, correction, deletion, portability) implemented as first-class flows." },
        ],
      },
      {
        id: "reach",
        kind: "text-block",
        eyebrow: "11 · How to reach us",
        h2: "How to reach us.",
        body: "Security-relevant questions: security@nebbos.ai. Compliance and legal questions: compliance@nebbos.ai. Responsible disclosure of vulnerabilities: security@nebbos.ai with subject line beginning &lsquo;RD:&rsquo; per the process at /legal/responsible-disclosure. Enterprise procurement questions: enterprise@nebbos.ai. Response SLAs are published on the security page.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "12 · Related",
        h2: "Deeper reading.",
        items: [
          { title: "Security — technical controls in depth" },
          { title: "Compliance — frameworks and attestations" },
          { title: "Legal — MSA, DPA, Responsible Disclosure" },
          { title: "Architecture — the 15 layers" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Read the deeper posture.",
        ctaPrimary: { label: "See security", href: "/security", variant: "primary" },
        ctaSecondary: { label: "See compliance", href: "/compliance", variant: "ghost" },
      },
    ],
  },

  security: {
    slug: "/security",
    title: "Security · Engineered to SOC 2 and ISO 27001 controls",
    metaDescription:
      "Nebbos is engineered to SOC 2 Type II and ISO 27001:2022 controls from the substrate up. Every attestation portable to your auditor.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "00 · Security",
        h1: "Engineered to institutional controls.",
        deck: "Nebbos is engineered to SOC 2 Type II and ISO 27001:2022 controls from the substrate up. Every attestation portable to your auditor.",
        imageFamily: "concept-audit-attestation",
      },
      {
        id: "threat-model",
        kind: "text-block",
        eyebrow: "01 · Threat model",
        h2: "Threat model.",
        body: "Nebbos protects against six broad threat classes, in decreasing order of engineering priority. First — cross-tenant data leakage from application-layer bugs or misconfiguration. Second — insider access to tenant data by Nebbos operators without an attested authorization trail. Third — supply-chain compromise of dependencies, model providers, or infrastructure services. Fourth — credential theft targeting tenant users, service accounts, or Nebbos operators. Fifth — abuse of Pearl-generated actions to exfiltrate data or trigger unauthorized state changes. Sixth — availability attacks that degrade tenant experience during time-sensitive workflows. The controls that follow are engineered against these threat classes in this order.",
      },
      {
        id: "encryption",
        kind: "text-block",
        eyebrow: "02 · Encryption + key management",
        h2: "Encryption and key management.",
        body: "Data at rest: AES-256-GCM. Data in transit: TLS 1.3 with strong cipher suites, HSTS enforced, no fallback to older protocols. Application-layer encryption for sensitive-column data (PII, PHI, financial identifiers) using per-tenant data-encryption keys wrapped by a KMS-hosted master key. Key rotation: DEKs rotated per tenant on a configurable schedule (default annually), master keys rotated by KMS on the platform&rsquo;s own schedule. Key access is logged to Layer 15 · Attestation and requires attested operator identity. Provider-side encryption on model calls is configured per provider — where the provider supports customer-managed keys or zero-retention configurations, we default to those.",
      },
      {
        id: "access",
        kind: "text-block",
        eyebrow: "03 · Access control + identity",
        h2: "Access control and identity.",
        body: "Tenant users authenticate through enterprise SSO (SAML 2.0, OIDC) with SCIM provisioning. Multi-factor authentication is required for all Nebbos operators and enforced by SSO for tenant users per tenant configuration. Service accounts and workload identities are distinct classes with distinct authorization scopes; credentials for both are managed through a secrets-management service with break-glass audit signature. Human-operator access to production is scoped to on-call responder rotation with time-bounded elevation; all sessions are recorded and attested. Access-review cadence: quarterly for operator scopes, monthly for privileged scopes.",
      },
      {
        id: "appsec",
        kind: "text-block",
        eyebrow: "04 · Application security + SDLC",
        h2: "Application security and secure development lifecycle.",
        body: "Source control on managed platform with branch protection, required review, and signed commits for release branches. Dependencies scanned continuously via automated software-composition-analysis; vulnerable dependencies triaged within 24 hours for CRITICAL, 7 days for HIGH. Static analysis on every pull request via language-native tooling. Secret scanning on every commit; leaked secrets trigger immediate rotation. Dynamic analysis via automated fuzzing on API surfaces and adversarial-prompt testing on Pearl action paths. Container images built from minimal base images, scanned for CVEs, signed at publish time, and enforced-signed at deploy.",
      },
      {
        id: "infra",
        kind: "text-block",
        eyebrow: "05 · Infrastructure + tenant isolation",
        h2: "Infrastructure security and tenant isolation.",
        body: "Deployment on hyperscaler infrastructure with segregated tenant-data storage per Layer 01 · Data isolation model. Network segmentation: separate VPCs per environment, private subnets for data-plane workloads, egress restricted to allow-listed providers. Row-level tenant isolation enforced at the database — every table with tenant scope carries a Postgres RLS policy checking session identity. Object-storage buckets scoped per-tenant with tenant-identity-scoped IAM policies. Compute is stateless where possible; stateful workloads live in per-environment isolation with per-tenant scoping enforced at the query layer.",
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "06 · Which architecture layers enforce security",
        h2: "Which architecture layers enforce security.",
        items: [
          { title: "Layer 01 · Data", body: "Row-level tenant isolation, encryption at rest, per-tenant DEK. The primary defense against cross-tenant leakage." },
          { title: "Layer 02 · Identity", body: "SSO + SCIM, service-account isolation, workload identity, break-glass audit. Every request carries verifiable identity." },
          { title: "Layer 11 · Approval", body: "Every consequential action requires attested human approval. Structural defense against autonomous exfiltration or state change." },
          { title: "Layer 14 · Observability", body: "Real-time detection of anomalous access patterns, credential misuse, tenant-boundary anomalies." },
          { title: "Layer 15 · Attestation", body: "Append-only audit trail for every access, every action, every approval. The forensic record." },
        ],
      },
      {
        id: "vuln",
        kind: "text-block",
        eyebrow: "07 · Vulnerability management + pen-testing",
        h2: "Vulnerability management and penetration testing.",
        body: "Responsible-disclosure program at /legal/responsible-disclosure. Reports acknowledged within 24 business hours; triage within 72 business hours; remediation timelines per severity (CRITICAL: 7 days, HIGH: 30 days, MEDIUM: 90 days, LOW: next scheduled release). Bug-bounty program on invitation to security-researcher partners. External penetration testing by an accredited third party annually, with retest after major architectural changes. Continuous internal red-teaming against Pearl action paths and approval-graph edge cases. Every finding closes with a public remediation record (redacted to protect specific technical detail).",
      },
      {
        id: "incident",
        kind: "list-numbered",
        eyebrow: "08 · Incident response commitments",
        h2: "Incident response commitments.",
        items: [
          { title: "Detection", body: "24×7 automated monitoring on security-relevant signals with paged responder rotation." },
          { title: "Triage", body: "Severity assigned within 30 minutes of alert. Severity 1 (confirmed data-integrity or confidentiality breach) triggers executive escalation." },
          { title: "Tenant notification", body: "Severity 1 tenants notified within 24 hours of confirmed impact; severity 2 within 72 hours." },
          { title: "Regulator notification", body: "Where regulatorily required (GDPR 72-hour, HIPAA 60-day, various state-privacy), we support tenant filing with a prepared evidence packet." },
          { title: "Post-incident review", body: "Written post-incident report shared with impacted tenants within 30 days of resolution. Root cause + specific remediation." },
          { title: "Tabletop cadence", body: "Full-team tabletop exercises quarterly. Table-level scenarios monthly." },
        ],
      },
      {
        id: "questions",
        kind: "list-numbered",
        eyebrow: "09 · Security-team questions",
        h2: "Security-team questions we field weekly.",
        items: [
          { title: "Do you support customer-managed encryption keys?", body: "Yes — BYOK on the enterprise tier. Interim tiers use per-tenant DEK managed by our KMS with documented rotation cadence and access logging." },
          { title: "What is your patch cadence for dependencies?", body: "Automated dependency updates weekly. CVE-driven emergency patches merge within the SLAs above." },
          { title: "Do you segregate production data from non-production?", body: "Yes. No production data flows into staging or development environments. Test data is synthetically generated." },
          { title: "What is your OWASP Top-10 posture?", body: "Every category has documented controls. Injection defended by parameterized queries + typed ORM. Broken access control defended by RLS + application-layer authz. Cryptographic failures defended by TLS 1.3 + AES-256-GCM. Full matrix under NDA." },
          { title: "Do you have a bug-bounty program?", body: "Invitation-only for research partners. Broader public program on the enterprise roadmap." },
          { title: "How do you handle prompt injection?", body: "Structural defenses at Layer 08 · Reasoning (input sanitization, tool-call authorization) plus Layer 11 · Approval (every consequential action requires human sign-off, so a prompt injection cannot autonomously act). Adversarial testing continuous." },
        ],
      },
      {
        id: "sub-processors",
        kind: "list-numbered",
        eyebrow: "10 · Sub-processors",
        h2: "Sub-processors.",
        items: [
          { title: "Hyperscaler infrastructure provider", body: "Compute, storage, networking. US + EU regions. SOC 2, ISO 27001, FedRAMP where applicable." },
          { title: "Postgres-managed hosting provider", body: "Primary transactional data plane. SOC 2, ISO 27001." },
          { title: "KMS provider", body: "Master key management. SOC 2, ISO 27001, FIPS 140-2 Level 3 HSM." },
          { title: "Model providers", body: "Anthropic, OpenAI, Google. Configured per tenant. Zero-retention default where supported." },
          { title: "Observability provider", body: "Metrics + tracing + log aggregation. SOC 2, ISO 27001." },
          { title: "Email and notification providers", body: "Transactional email, incident notification. SOC 2." },
          { title: "Legal and compliance tooling", body: "Contract lifecycle management, DPA workflow. SOC 2." },
        ],
      },
      {
        id: "certs",
        kind: "text-block",
        eyebrow: "11 · Certifications + reports",
        h2: "Certifications and reports.",
        body: "SOC 2 Type II report available under NDA. ISO 27001:2022 certification and Annex A control statements available under NDA. HIPAA BAA available. FedRAMP path for federal deployments — contact enterprise procurement. All external attestations available under NDA; contact security@nebbos.ai.",
      },
      {
        id: "response-times",
        kind: "text-block",
        eyebrow: "12 · Reach the security team",
        h2: "Reach the security team.",
        body: "security@nebbos.ai for security-relevant questions, disclosure reports, and attestation requests. Responsible-disclosure process detailed at /legal/responsible-disclosure. Response SLAs published above.",
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Question we have not addressed?",
        ctaPrimary: { label: "security@nebbos.ai", href: "mailto:security@nebbos.ai", variant: "primary" },
        ctaSecondary: { label: "See compliance", href: "/compliance", variant: "ghost" },
      },
    ],
  },

  compliance: {
    slug: "/compliance",
    title: "Compliance · EU AI Act Article 11 · SOC 2 · ISO 27001",
    metaDescription:
      "Nebbos ships an EU AI Act Article 11 Annex IV pack. Engineered to SOC 2 Type II and ISO 27001. Every attestation portable to your auditor.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "00 · Compliance",
        h1: "Compliance is the substrate, not a feature.",
        deck: "Nebbos ships an EU AI Act Article 11 Annex IV pack. Engineered to SOC 2 Type II and ISO 27001. Every attestation portable to your auditor.",
        imageFamily: "concept-audit-attestation",
      },
      {
        id: "frameworks",
        kind: "list-numbered",
        eyebrow: "01 · Frameworks",
        h2: "Frameworks Nebbos operates to.",
        items: [
          { title: "EU AI Act — Regulation (EU) 2024/1689", body: "Annex IV technical documentation pack available under NDA. Compliance deadline for high-risk systems (Article 6 · Annex III scope): 2027-08-02. Nebbos deployments in scope carry documentation from the substrate up." },
          { title: "SOC 2 Type II", body: "Trust services criteria: Security, Availability, Confidentiality, Privacy. Controls implemented and operating. Report available under NDA." },
          { title: "ISO 27001:2022", body: "Information security management system implemented. Statement of applicability, risk register, and control narratives available under NDA." },
          { title: "HIPAA (US healthcare tenants)", body: "Business Associate Agreement available. Substrate controls mapped to HIPAA Security Rule Administrative, Physical, and Technical safeguards." },
          { title: "FERPA (US K-12 + higher-ed tenants)", body: "Substrate controls mapped to FERPA educational-records handling. Documented onboarding path for school districts and higher-ed." },
          { title: "GDPR (EU tenants + EU data subjects)", body: "Data Processing Addendum at /legal/dpa. Data-subject rights (access, correction, deletion, portability) implemented as first-class flows." },
          { title: "CCPA + state privacy regimes", body: "Consumer rights implemented. State-by-state addenda where relevant." },
        ],
      },
      {
        id: "eu-ai-act",
        kind: "text-block",
        eyebrow: "02 · EU AI Act Article 11 Annex IV",
        h2: "EU AI Act Article 11 · Annex IV — the technical documentation pack.",
        body: "The EU AI Act treats certain AI deployments as high-risk (Article 6, Annex III). For any high-risk deployment, Article 11 requires the provider or deployer to maintain technical documentation covering: general system description, detailed architecture, data used for training and testing, monitoring measures, risk-management processes, quality-management arrangements, and post-market monitoring plans. Nebbos&rsquo;s Annex IV pack ships this documentation as a versioned artifact that maps directly to our substrate (Layer 07 memory + Layer 08 reasoning + Layer 15 attestation) and is updated on every material substrate change. The pack is available under NDA to any tenant with a high-risk deployment in scope. Compliance deadline for Annex III scope: 2027-08-02, per the current published timeline. Any subsequent regulation, including the Digital Omnibus discussions, is tracked and communicated to affected tenants.",
      },
      {
        id: "soc2",
        kind: "text-block",
        eyebrow: "03 · SOC 2 Type II",
        h2: "SOC 2 Type II.",
        body: "Nebbos operates to SOC 2 Type II trust services criteria across Security, Availability, Confidentiality, and Privacy. Controls are implemented and in continuous operation. The Type II report, control narratives mapped to each TSC, and the auditor&rsquo;s opinion are available under NDA. For tenants with SOC 2 in their vendor-review checklist, these documents typically satisfy vendor onboarding directly.",
      },
      {
        id: "iso",
        kind: "text-block",
        eyebrow: "04 · ISO 27001:2022",
        h2: "ISO 27001:2022.",
        body: "Nebbos operates an information security management system built to ISO 27001:2022. Statement of applicability documents each Annex A control&rsquo;s status. Risk assessment and treatment plan are current and versioned. Certification documentation, ISMS scope statement, and risk-register summary are available under NDA. ISO 27017 (cloud) and ISO 27018 (PII in cloud) are on the enterprise roadmap.",
      },
      {
        id: "hipaa",
        kind: "text-block",
        eyebrow: "05 · HIPAA — healthcare readiness",
        h2: "HIPAA — healthcare readiness.",
        body: "For US healthcare tenants operating as Covered Entities or Business Associates, Nebbos operates as a Business Associate under an executable BAA. Substrate controls map to the HIPAA Security Rule: Administrative safeguards (workforce training, sanction policy, information-access management, security-incident procedures), Physical safeguards (facility access via our hyperscaler, workstation security per operator policy), Technical safeguards (access control, audit controls, integrity, person or entity authentication, transmission security). PHI-flagged data is subject to enhanced retention controls, additional access-review cadence, and dedicated audit-trail queries.",
      },
      {
        id: "ferpa",
        kind: "text-block",
        eyebrow: "06 · FERPA — K-12 and higher-ed readiness",
        h2: "FERPA — K-12 and higher-ed readiness.",
        body: "For US K-12 school districts and higher-ed institutions, Nebbos operates as a School Official under FERPA (34 CFR § 99.31(a)(1)) when performing services the institution would otherwise perform. Substrate controls map to FERPA educational-records handling: direct control of personally identifiable information from education records, use limited to the authorized purposes, redisclosure prohibited without consent, and access limited to legitimate educational interests. Retention policies configurable per state education-department requirements. Documented onboarding path for districts.",
      },
      {
        id: "gdpr",
        kind: "text-block",
        eyebrow: "07 · GDPR + CCPA + state privacy",
        h2: "GDPR + CCPA + state privacy regimes.",
        body: "For tenants with EU data subjects, Nebbos operates as a Processor (or Sub-Processor as scoped) under GDPR Article 28. Data Processing Addendum at /legal/dpa. Standard Contractual Clauses for international transfers where relevant. Data-subject rights (Articles 12-22: access, rectification, erasure, restriction, portability, objection) are implemented as first-class tenant-admin flows — rights requests do not require a support ticket. For California residents under CCPA + CPRA, consumer rights (know, delete, correct, opt-out of sale/share, limit sensitive-data use) are implemented via the same flows. State-privacy regimes (VA CDPA, CO CPA, CT CTDPA, UT CPA, and subsequent states) are covered under a unified rights-handling architecture.",
      },
      {
        id: "layers",
        kind: "list-numbered",
        eyebrow: "08 · Which architecture layers make compliance real",
        h2: "Which architecture layers make compliance real.",
        items: [
          { title: "Layer 01 · Data", body: "Row-level isolation, encryption at rest, data-residency configurable per tenant." },
          { title: "Layer 02 · Identity", body: "Human, service, workload identity classes with distinct authorization scopes. SSO + SCIM for enterprise." },
          { title: "Layer 07 · Memory", body: "Retention policies configurable per tenant, per data class. GDPR erasure, HIPAA retention, FERPA educational-records handling." },
          { title: "Layer 11 · Approval", body: "Human-in-the-loop is architectural. Article 14 of the EU AI Act (human oversight of high-risk systems) is satisfied by the approval graph." },
          { title: "Layer 15 · Attestation", body: "Article 12 of the EU AI Act (record-keeping for high-risk systems) is satisfied by the append-only audit trail. Same trail satisfies SOC 2 CC7, ISO 27001 A.12.4, HIPAA 45 CFR 164.312(b)." },
        ],
      },
      {
        id: "questions",
        kind: "list-numbered",
        eyebrow: "09 · Compliance-team questions",
        h2: "Compliance-team questions we field.",
        items: [
          { title: "Do you have a SOC 2 Type II report we can review?", body: "Yes — available under NDA. Reach compliance@nebbos.ai." },
          { title: "What is your data-residency posture?", body: "US + EU regions available. Additional regions on the enterprise roadmap. Data residency configurable at tenant provisioning; data does not leave the elected region without tenant authorization." },
          { title: "How do you handle GDPR data-subject rights requests?", body: "First-class tenant-admin flow. Tenant admin submits the request; Nebbos executes and returns evidence within the GDPR-mandated timeline." },
          { title: "What is your policy on training on customer data?", body: "We do not train shared models on tenant data. Preference pairs your tenant produces stay in your tenant and are exportable to you. This is the training-substrate side of Nebbos." },
          { title: "What sub-processors do you use?", body: "Full list on the security page. Sub-processor changes carry 30-day advance notice per DPA." },
          { title: "What happens on data-breach notification obligations?", body: "We support tenant filing with a prepared evidence packet within regulatory timelines (GDPR 72 hours, HIPAA 60 days, state-specific)." },
        ],
      },
      {
        id: "nda",
        kind: "text-block",
        eyebrow: "10 · Requesting attestations",
        h2: "How to request attestations and documents.",
        body: "Reach compliance@nebbos.ai with a brief description of your review scope (SOC 2, ISO 27001, EU AI Act Annex IV, HIPAA, FERPA, sector-specific). We respond within 2 business days with either the requested document or a mutual NDA for signature. Standard mutual NDA available at /legal/mutual-nda. For procurement teams with an existing NDA already in place, we counter-sign to save a cycle.",
      },
      {
        id: "regulator",
        kind: "text-block",
        eyebrow: "11 · Regulator-response commitments",
        h2: "Regulator-response commitments.",
        body: "In the event of a regulator inquiry involving your tenant data, we route through counsel and notify you unless legally prohibited. Detailed procedure at /legal/law-enforcement. For subpoena and warrant handling: we require valid legal process, we challenge overly broad requests where appropriate, and we provide minimum necessary responsive material. Transparency-report cadence: annual, published on the trust page.",
      },
      {
        id: "related",
        kind: "list-plain",
        eyebrow: "12 · Related",
        h2: "Deeper reading.",
        items: [
          { title: "Trust — the meta-posture and accountability pillars" },
          { title: "Security — technical controls in depth" },
          { title: "Legal — MSA, DPA, Responsible Disclosure, Mutual NDA" },
          { title: "Architecture — the 15 layers compliance rests on" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Request an attestation or DPA.",
        ctaPrimary: { label: "compliance@nebbos.ai", href: "mailto:compliance@nebbos.ai", variant: "primary" },
        ctaSecondary: { label: "See security", href: "/security", variant: "ghost" },
      },
    ],
  },

  /* ═══════════════ CUSTOMERS ═══════════════════════════════════════ */
  customers: {
    slug: "/customers",
    title: "Customers · Design partners building the company brain",
    metaDescription: "The design-partner enterprises putting Nebbos on their hardest departments.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "00 · Customers",
        h1: "Design partners building the company brain.",
        deck: "Enterprise design-partner tenants running Nebbos on their hardest departments. Case studies land as each partner opts in to public reference. Until then, a demo shows you a live tenant walkthrough.",
        imageFamily: "concept-tenant-onboarding",
      },
      {
        id: "criteria",
        kind: "list-numbered",
        eyebrow: "01 · Who we work with",
        h2: "Design-partner criteria.",
        items: [
          { title: "Enterprise scale · 200+ headcount OR governance-critical mid-market" },
          { title: "One hard department that would benefit from a Pearl within 60 days" },
          { title: "A technical owner (VP Eng, CTO, Chief-of-Staff) who wants the audit trail" },
          { title: "A legal owner (CISO, GC) who wants the compliance substrate" },
          { title: "Willingness to be reference-called once your Pearl has run for two quarters" },
        ],
      },
      {
        id: "verticals",
        kind: "list-plain",
        eyebrow: "02 · Where our design partners come from",
        h2: "Verticals in the current cohort.",
        items: [
          { title: "Financial services — risk operations, close-week automation" },
          { title: "Healthcare — care coordination, compliance filings" },
          { title: "Public sector — case management, accountability filings" },
          { title: "Logistics — dispatch operations, shift handoff" },
          { title: "Manufacturing — production scheduling, quality gate" },
          { title: "Professional services — engagement operations, billable-hours reconciliation" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Want to see a design partner&rsquo;s live tenant?",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
        ctaSecondary: { label: "Email enterprise", href: "mailto:enterprise@nebbos.ai", variant: "ghost" },
      },
    ],
  },

  careers: {
    slug: "/careers",
    title: "Careers · Building the company brain",
    metaDescription:
      "Founding roles at Nebbos — the operating system for the AI-native enterprise. Solo-founder-led as of 2026.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "00 · Careers",
        h1: "Building the company brain.",
        deck: "Nebbos is solo-founder-led as of 2026. Founding roles are opening in engineering, design, and operations. If you want to build the operating system for the AI-native enterprise, reach out.",
        imageFamily: "concept-pearl",
      },
      {
        id: "what-were-building",
        kind: "text-block",
        eyebrow: "01 · What we&rsquo;re building",
        h2: "An institution that watches the work.",
        body: "Every enterprise has departments that would run better with a brain — operations handoffs, finance close, HR onboarding, procurement chase-ups, incident triage. None of those brains get built because the team is running the current ones. Nebbos is the architecture that lets each department have one — a Pearl, pre-educated on the work, tuned by use, portable to the customer if they ever leave. Fifteen governance layers underneath, one flat price per seat.",
      },
      {
        id: "roles",
        kind: "list-numbered",
        eyebrow: "02 · Founding roles",
        h2: "Where founding hires slot in.",
        items: [
          { title: "Founding engineer · substrate", body: "Own the Data + Identity + Departments band. Postgres + typed schema + row-level tenant isolation from day one." },
          { title: "Founding engineer · intelligence", body: "Own the Memory + Reasoning + Detectors band. Knowledge graph + multi-provider router + preference-pair capture." },
          { title: "Founding engineer · action", body: "Own the Pearl + Shell + Approval + Orchestrator band. Per-department entity + human approval graph + action queue." },
          { title: "Founding designer · brand + product", body: "Own the marketing site + design system + Pearl UI. Editorial register · brand palette · concept-family imagery." },
          { title: "Founding operator · GTM + design partners", body: "Land the design-partner cohort. Structure the pilot. Turn tenants into references." },
        ],
      },
      {
        id: "what-we-look-for",
        kind: "list-plain",
        eyebrow: "03 · What we look for",
        h2: "Signals we hire on.",
        items: [
          { title: "You&rsquo;ve run something at real scale before — a team, a product, an operation" },
          { title: "You reach for a Postgres query before you reach for a library" },
          { title: "You think in institutions, not features" },
          { title: "You care about the audit trail as much as the automation" },
          { title: "You can write. Every founding hire ships product AND writes about it" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Reach out.",
        ctaPrimary: { label: "hello@nebbos.ai", href: "mailto:hello@nebbos.ai", variant: "primary" },
      },
    ],
  },

  blog: {
    slug: "/blog",
    title: "Notes from Nebbos",
    metaDescription: "Longer writing on architecture, governance, and the company brain.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Notes",
        h1: "Notes from Nebbos.",
        deck: "Longer writing on architecture, governance, and what an operating system for the AI-native enterprise actually looks like.",
      },
      // Post list rendered from content/blog/*.mdx
    ],
  },

  docs: {
    slug: "/docs",
    title: "Docs · How to build on Nebbos",
    metaDescription:
      "How to deploy a Pearl, define an approval graph, and wire your existing systems into Nebbos.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Docs",
        h1: "How to build on Nebbos.",
        deck: "How to deploy a Pearl. How to define an approval graph. How to wire your existing systems into the substrate. Public docs land as we open the platform beyond design partners.",
        ctaPrimary: { label: "engineering@nebbos.ai", href: "mailto:engineering@nebbos.ai", variant: "primary" } as CTA,
      },
    ],
  },

  changelog: {
    slug: "/changelog",
    title: "Changelog · What&rsquo;s new",
    metaDescription: "Every release, every migration, every capability that shipped.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Changelog",
        h1: "What&rsquo;s new.",
        deck: "Every release. Every migration. Every capability that shipped, with dates.",
      },
      // Entries rendered from content/changelog/*.mdx
    ],
  },

  status: {
    slug: "/status",
    title: "Status · All systems operational",
    metaDescription: "Live status of the Nebbos operating system across regions and services.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Status",
        h1: "All systems operational.",
        deck: "Live status of the Nebbos operating system across regions and services. Incident history + subscribable status feed land alongside the public GA release.",
      },
    ],
  },

  press: {
    slug: "/press",
    title: "Press · Nebbos for journalists and analysts",
    metaDescription:
      "Company facts, category positioning, and press assets for journalists writing about Nebbos.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Press",
        h1: "Nebbos for journalists and analysts.",
        deck: "Company facts, category positioning, and press assets. Interview requests go to press@nebbos.ai.",
        ctaPrimary: { label: "press@nebbos.ai", href: "mailto:press@nebbos.ai", variant: "primary" } as CTA,
      },
      {
        id: "facts",
        kind: "table-rows",
        eyebrow: "01 · Facts on file",
        // Rendered from content/facts.ts
      },
    ],
  },

  /* ═══════════════ LEGAL DOCS ═════════════════════════════════════ */
  "legal/privacy": {
    slug: "/legal/privacy",
    title: "Privacy Policy",
    metaDescription: "How Nebbos collects, uses, retains, and returns customer data.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Privacy Policy",
        deck: "How Nebbos collects, uses, retains, and returns customer data. Full text under review; the short version is: tenant data belongs to the tenant, is portable to the tenant, and is never shared across tenants.",
      },
    ],
  },
  "legal/terms": {
    slug: "/legal/terms",
    title: "Terms of Service",
    metaDescription: "The commercial terms under which Nebbos is provided.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Terms of Service",
        deck: "The commercial terms under which Nebbos is provided to enterprise customers. Full MSA and DPA available on request via enterprise@nebbos.ai.",
      },
    ],
  },
  "legal/dpa": {
    slug: "/legal/dpa",
    title: "Data Processing Addendum",
    metaDescription: "GDPR-compliant DPA governing how Nebbos processes customer personal data.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Data Processing Addendum",
        deck: "GDPR-compliant DPA governing how Nebbos processes customer personal data. Signed version available on request via legal@nebbos.ai.",
      },
    ],
  },
  "legal/subprocessors": {
    slug: "/legal/subprocessors",
    title: "Subprocessors",
    metaDescription: "The subprocessors Nebbos uses to deliver the service.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Subprocessors",
        deck: "The subprocessors Nebbos uses to deliver the service — hosting, LLM providers, observability, security tooling. Notice of subprocessor change is served to enterprise customers 30 days in advance.",
      },
    ],
  },
  "legal/cookies": {
    slug: "/legal/cookies",
    title: "Cookie Policy",
    metaDescription: "The cookies nebbos.ai uses, why, and how to opt out.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Cookie Policy",
        deck: "The cookies nebbos.ai uses, why, and how to opt out. The site uses only functional and analytics cookies; no cross-site tracking, no advertising cookies.",
      },
    ],
  },
  "legal/acceptable-use": {
    slug: "/legal/acceptable-use",
    title: "Acceptable Use",
    metaDescription: "How Nebbos may not be used.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Acceptable Use",
        deck: "How Nebbos may not be used. In short: no illegal activity, no rights infringement, no interference with the service, no misuse of the audit trail.",
      },
    ],
  },
  "legal/responsible-disclosure": {
    slug: "/legal/responsible-disclosure",
    title: "Responsible Disclosure",
    metaDescription: "How to report a security vulnerability in Nebbos.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "Legal",
        h1: "Responsible Disclosure",
        deck: "How to report a security vulnerability in Nebbos. Send reports to security@nebbos.ai. Please give us 90 days to remediate before public disclosure.",
        ctaPrimary: { label: "security@nebbos.ai", href: "mailto:security@nebbos.ai", variant: "primary" } as CTA,
      },
    ],
  },
} as const satisfies Record<string, Page>;

export type PageSlug = keyof typeof PAGES;
