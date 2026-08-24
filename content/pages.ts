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

  /* ═══════════════ SOLUTIONS · FINANCE ═════════════════════════════ */
  "solutions/finance": {
    slug: "/solutions/finance",
    title: "Nebbos Finance · The Pearl for close, forecast, variance",
    metaDescription:
      "Nebbos Finance runs your monthly close, catches variance early, and keeps every reconciliation attested in an audit trail your CFO trusts.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Finance",
        h1: "The Pearl for close, forecast, variance.",
        deck: "Nebbos Finance reads your ledger, your ERP, your bank feeds, and shows your CFO where variance will show up next quarter — before it does.",
        imageFamily: "solution-finance",
      },
      {
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every finance function emits a signal. Nebbos Finance reads it.",
        items: [
          { title: "Monthly close — ledger, AP, AR, payroll" },
          { title: "Variance — actuals vs forecast, quarter-over-quarter" },
          { title: "Reconciliations across systems (ERP + bank + expense)" },
          { title: "Audit trail attesting every human decision" },
        ],
      },
      {
        id: "value",
        kind: "text-block",
        eyebrow: "02 · The compounding value",
        h2: "Every close teaches your Pearl your team&rsquo;s specific rhythm.",
        body: "Month one, Nebbos General Finance handles the mechanical close. Month twenty-four, your Pearl knows which vendors always invoice late, which accruals are always over-stated, which reconciliations always break at quarter-end. Tuned to your team.",
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Finance on your close.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · PEOPLE ═════════════════════════════ */
  "solutions/people": {
    slug: "/solutions/people",
    title: "Nebbos People · The Pearl for hiring, onboarding, retention",
    metaDescription:
      "Nebbos People runs the hiring pipeline, onboards new hires end-to-end, and flags retention risks before they become resignations.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "People",
        h1: "The Pearl for hiring, onboarding, retention.",
        deck: "Nebbos People reads every signal a growing team emits — hiring pipeline, onboarding sequences, retention risk — and hands your HR team back their time.",
        imageFamily: "solution-people-hr",
      },
      {
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every people function emits a signal.",
        items: [
          { title: "Hiring pipeline — sourcing, interviews, offers" },
          { title: "Onboarding sequences per role, per department" },
          { title: "Retention risk — engagement, tenure patterns, exit signals" },
          { title: "Manager coverage and 1:1 cadence" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos People on your growing team.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · K-12 ═════════════════════════════════ */
  "solutions/k12": {
    slug: "/solutions/k12",
    title: "Nebbos Education · The Pearl for district operations",
    metaDescription:
      "Nebbos Education runs the district's coverage, scheduling, and compliance — quietly enough that principals get to think about kids.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "K-12 Education",
        h1: "The Pearl for district operations.",
        deck: "Nebbos Education runs the schedule, the coverage, the compliance filings, the hiring pipeline — so principals and superintendents get to think about kids.",
        imageFamily: "solution-people-hr",
      },
      {
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every district emits an operational signal.",
        items: [
          { title: "Substitute-teacher coverage across schools" },
          { title: "Compliance filings — state, federal, IEP" },
          { title: "Enrollment shifts and their downstream effects" },
          { title: "Teacher hiring pipeline and retention" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Education on your district ops.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · HEALTHCARE ══════════════════════════ */
  "solutions/healthcare": {
    slug: "/solutions/healthcare",
    title: "Nebbos Care · The Pearl for care coordination, compliance",
    metaDescription:
      "Nebbos Care runs the care coordination between clinicians, the compliance filings, and the operational handoffs — so care teams focus on care.",
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
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every care organization emits a signal.",
        items: [
          { title: "Care team coverage across shifts and specialties" },
          { title: "Referrals + care-coordination handoffs" },
          { title: "Compliance filings (HIPAA, state reports, insurance)" },
          { title: "Patient-flow bottlenecks before they become backlogs" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Care on your care operation.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · FINANCIAL SERVICES ══════════════════ */
  "solutions/financial-services": {
    slug: "/solutions/financial-services",
    title: "Nebbos FS · The Pearl for trading ops, risk, audit",
    metaDescription:
      "Nebbos Financial Services runs the trading-ops layer — reconciliations, risk gates, audit attestation — so traders and risk teams work at their desk, not their backlog.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Financial services",
        h1: "The Pearl for trading ops, risk, audit.",
        deck: "Nebbos Financial Services runs the operational + governance layer of a modern trading floor — reconciliations, risk gates, audit attestation — and keeps every action attested.",
        imageFamily: "solution-finance",
      },
      {
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every trading operation emits a signal.",
        items: [
          { title: "Overnight P&L reconciliation across venues" },
          { title: "Pre-market checks + risk gate approvals" },
          { title: "Regulatory attestations attached to each decision" },
          { title: "Post-trade audit trail portable to the auditor" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos FS on your trading operation.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · MANUFACTURING ══════════════════════ */
  "solutions/manufacturing": {
    slug: "/solutions/manufacturing",
    title: "Nebbos Manufacturing · The Pearl for production, quality, supply",
    metaDescription:
      "Nebbos Manufacturing runs the production schedule, quality gate, and supply reconciliation — so operations leadership works on the plant, not in it.",
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
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every production operation emits a signal.",
        items: [
          { title: "Production schedule vs order backlog" },
          { title: "Quality gates and their trend line by shift" },
          { title: "Supply reconciliation across vendors" },
          { title: "Preventive maintenance before it becomes downtime" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Manufacturing on your line.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ SOLUTIONS · PUBLIC SECTOR ══════════════════════ */
  "solutions/public-sector": {
    slug: "/solutions/public-sector",
    title: "Nebbos Civic · The Pearl for case management, accountability",
    metaDescription:
      "Nebbos Civic runs the operational layer of a modern public-sector agency — case management, accountability, citizen response — with an audit trail your inspector-general trusts.",
    sections: [
      {
        id: "hero",
        kind: "hero-full-bleed",
        eyebrow: "Public sector",
        h1: "The Pearl for case management, accountability.",
        deck: "Nebbos Civic runs the operational layer of a modern civic agency — case processing, citizen response, accountability filings — with an audit trail your inspector-general trusts.",
        imageFamily: "concept-audit-attestation",
      },
      {
        id: "what-it-does",
        kind: "list-numbered",
        eyebrow: "01 · What it watches",
        h2: "Every public-sector operation emits a signal.",
        items: [
          { title: "Case queue by department, by caseworker" },
          { title: "Citizen response times and their patterns" },
          { title: "Accountability filings on schedule" },
          { title: "Cross-agency handoffs and their outcomes" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Put Nebbos Civic on your agency operation.",
        ctaPrimary: { label: "Book a demo", href: "/demo", variant: "primary" },
      },
    ],
  },

  /* ═══════════════ TRUST / SECURITY / COMPLIANCE ═════════════════ */
  trust: {
    slug: "/trust",
    title: "Trust · Accountable by architecture",
    metaDescription:
      "Every action a Pearl takes is attested in an audit trail your CISO, your general counsel, and your regulator can read.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Trust",
        h1: "Accountable by architecture.",
        deck: "Every action a Pearl takes is attested in an audit trail your CISO, your general counsel, and your regulator can read. The governance is the product, not a feature.",
      },
      {
        id: "pillars",
        kind: "list-numbered",
        eyebrow: "01 · How we&rsquo;re accountable",
        h2: "Four pillars of trust.",
        items: [
          { title: "Every human approval attested and time-stamped" },
          { title: "Every Pearl action logged to an append-only audit trail" },
          { title: "Every request carries an identity through row-level tenant isolation" },
          { title: "Every audit trail is portable to you if you leave" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Read the deeper trust story.",
        ctaPrimary: { label: "See security", href: "/security", variant: "primary" },
        ctaSecondary: { label: "See compliance", href: "/compliance", variant: "ghost" },
      },
    ],
  },

  security: {
    slug: "/security",
    title: "Security · Engineered to SOC 2 and ISO 27001 controls",
    metaDescription:
      "Nebbos is engineered to SOC 2 and ISO 27001 controls. Certificates in progress. Every attestation available under NDA.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Security",
        h1: "Engineered to institutional controls.",
        deck: "Nebbos is engineered to SOC 2 and ISO 27001 controls from the substrate up. Certificates in progress; every attestation available under NDA.",
      },
      {
        id: "practices",
        kind: "list-numbered",
        eyebrow: "01 · Practices",
        h2: "Baseline security posture.",
        items: [
          { title: "Row-level tenant isolation enforced at the substrate" },
          { title: "Enterprise SSO with SCIM provisioning" },
          { title: "Service, workload, and device credentials with break-glass audit" },
          { title: "Vulnerability triage via security@nebbos.ai (see /legal/responsible-disclosure)" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Reach the security team.",
        ctaPrimary: { label: "security@nebbos.ai", href: "mailto:security@nebbos.ai", variant: "primary" },
      },
    ],
  },

  compliance: {
    slug: "/compliance",
    title: "Compliance · EU AI Act Article 11 · SOC 2 · ISO 27001",
    metaDescription:
      "Nebbos ships an EU AI Act Article 11 Annex IV pack under NDA. Engineered to SOC 2 Type II and ISO 27001. Every attestation portable to your auditor.",
    sections: [
      {
        id: "hero",
        kind: "hero-paper",
        eyebrow: "00 · Compliance",
        h1: "Compliance is the substrate, not a feature.",
        deck: "Nebbos ships an EU AI Act Article 11 Annex IV pack under NDA. Engineered to SOC 2 Type II and ISO 27001. Every attestation portable to your auditor.",
      },
      {
        id: "frameworks",
        kind: "list-numbered",
        eyebrow: "01 · Frameworks",
        h2: "Where we sit today.",
        items: [
          { title: "EU AI Act Article 11 Annex IV — pack available under NDA" },
          { title: "SOC 2 Type II — controls implemented; audit in progress" },
          { title: "ISO 27001 — controls implemented; certification in progress" },
          { title: "GDPR + CCPA — DPA at /legal/dpa" },
        ],
      },
      {
        id: "cta",
        kind: "cta-band",
        h2: "Request an attestation.",
        ctaPrimary: { label: "compliance@nebbos.ai", href: "mailto:enterprise@nebbos.ai", variant: "primary" },
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
