# Nebbos.ai homepage — first-time-visitor strategy memo

**Author:** Nebbos (session `bf677e10`), 2026-09-17
**Status:** DRAFT — awaiting founder review before implementation
**Blocks:** further nebbos.ai code (per session pivot 2026-09-17 — "we should look at the marketing memories and the insights we have we need to have first off a full on research of the system from a marking standpoint")
**Audience:** Nebbos founder + Marketing team (Marijana + Milica) on handoff
**Register:** Company voice (Delta editorial, entity-level). No founder quotes. No individual names on public surfaces.

---

## 0 · Why this memo exists

A first-time visitor to nebbos.ai — a CISO at a defense contractor, a procurement lead at a bank, a superintendent at a K-12 district, a program manager at a federal agency — decides in under five seconds whether Nebbos is a serious company or a scam. Everything the site does above the fold is that decision. Every layer below is either evidence for the decision they just made or evidence against it.

The current homepage is a canvas physics playground of the Nebbos wordmark followed by four product-tile PageHeros. The physics playground is well-executed but generic — the visitor cannot tell from it that Nebbos runs 328 ratified architecture specs, 2.11M lines of code across 26 repositories, 76 enforcement hooks, or 39,278 automated tests. The site does not yet show its own substrate. This memo is the plan to fix that.

## 1 · Nebbos in four scales

### One sentence
Nebbos is the hardware-attested operator platform for AI-native operations at institutional scale.

### Three sentences
Nebbos is the hardware-attested operator platform for AI-native operations at institutional scale. It ships as four things — a platform, an app, an MCP protocol, and a USB — bound together by biometric and physical-presence tiers so consequential actions cannot happen without a named human proving they are the human. Everything the platform does lands in a hash-chained audit trail engineered against SOC 2, ISO 27001, EU AI Act Annex IV, and CSfC controls.

### One paragraph
Nebbos is the hardware-attested operator platform for AI-native operations at institutional scale — the substrate that lets a bank, a hospital system, a defense contractor, or a school district put a purpose-built domain brain on the operations that matter most, without giving up sovereignty over the data, the model, or the keys. The platform runs the work. The app puts a local, biometric-gated console on the operator's desk. The MCP mediates every tool call an AI can make. The USB carries the keys — FIPS 140-3 Level 3, IP68, MIL-STD-810G, TAA — so the tier a request runs at is a fact about what is physically plugged in, not a policy the vendor can override. Every consequential action lands in an append-only audit trail engineered against SOC 2 Type II and ISO 27001:2022 controls, with the EU AI Act Annex IV pack in preparation ahead of the 2027-08-02 Article 6 deadline. Certification is in progress; the substrate is production.

### 800 words
Nebbos is a hardware-attested operator platform. That framing carries three claims, each intentional.

**"Platform," not tool.** A tool solves one problem for one team. A platform underlies the work of a whole function — the ops team's shift handoffs, the finance team's monthly close, the HR team's hiring pipeline, the district superintendent's compliance filings. Nebbos ships as a platform so a bank buying it once can put a domain brain on treasury, another on ops risk, another on regulatory reporting, and get the same substrate — the same audit trail, the same identity model, the same portability guarantee — underneath all three. One buy, many domains.

**"Hardware-attested," not password-gated.** Every consequential permission at Nebbos gates on a physical fact: biometric plus a Nebbos-issued USB plus, at the highest tier, an enclave-signed approval token. The USB is a DataLocker Sentry K350 substrate — FIPS 140-3 Level 3 cryptographic module, CC EAL5+, IP68, MIL-STD-810G, TAA-compliant, OLED keypad, encrypted volume that carries the MCP binary and the tenant's key material. Without the USB plugged in, elevated permissions are literally unreachable — not "disabled by policy," but cryptographically absent. The tier a request runs at is not a claim the vendor can flip. It is a fact about what hardware is on the operator's desk.

**"Operator platform for AI-native operations."** Nebbos is not a chat interface, an agent, or a copilot. It is the substrate the operator uses to run a function with AI participating in every routine action and no consequential action happening without a named human approving it. Every hire decision, every material journal entry, every SLA breach flag, every compliance filing passes through an approval graph. The AI proposes. The human approves, rejects, or edits with a reason that trains the substrate. Two years in, the substrate knows the operator's specific patterns better than any single team member could, because it has been reading every signal from every system on every shift for those two years.

**Four products, one substrate.** The Platform runs the work — dashboards, approval graphs, per-domain "Pearls" (domain-scoped brains). The App is the local native console — biometric-gated, sovereign to the operator's device, works offline. The MCP is the protocol every tool call passes through — auditable, rate-limited, classifier-gated for data egress. The USB is the physical root of trust — the object that has to be on the desk for anything privileged to happen. Same code tree, different form factors.

**Three tiers.** L1 Basic gates on biometric (Touch ID, Face ID, Windows Hello). L2 Privileged adds the USB. L3 Admin adds an enclave-signed approval token. Every SKU, every product, every permission collapses to those three factors. There is no fourth axis to argue about.

**Sovereignty by architecture.** Row-level tenant isolation at the data layer. Client-side redaction at the MCP call boundary — the classifier decides tier and strips PII on the operator's host, before any egress. Portable exports: the tenant's tuned Pearl and its memory move with the tenant if the tenant ever leaves the platform. Recovery custodians are elected by the tenant, not the vendor. Dual-path recovery: default is vendor-mediated reset; opt-in is user-quorum recovery via Shamir shares held by the custodians. The tenant decides which posture it wants.

**Institutional evidence.** Every action lands in a hash-chained audit trail — the SOC 2 Type II evidence file writes itself. The substrate implements NIST SP 800-53 controls AC-3(2), AC-5, IA-11, SC-28, SC-12, SC-13, and the AU-2 through AU-12(1) audit family. Two-person authorization is enforced in hardware — Admin K350 plus Developer K350 co-sign via WebAuthn with a 60-second TTL. CSfC 2-layer composition holds by design. The EU AI Act Annex IV documentation pack is in preparation ahead of the 2027-08-02 Article 6 and Annex III deadline.

**The 2026 status is honest.** SOC 2 Type II is in progress, not held. ISO 27001:2022 is not yet held. HIPAA readiness is in progress. FIPS Level 3 is a claim scoped to the K350 module boundary, not the whole product. Certification takes time. Substrate does not. Nebbos ships the substrate today. The certifications catch up in the order buyers require them.

---

## 2 · Buyer personas — the five people who show up on nebbos.ai

Each persona carries the same four decision stages: what they need in the first **five seconds**, what has to be true at **thirty seconds** for them to keep reading, what they want from **five minutes** on the site, and what they need at **thirty minutes** to book a briefing.

### Persona A · Defense-contractor CISO
5s. Is this hardware-attested and CSfC-adjacent, or is it another SaaS with a compliance page? · 30s. Does the site name the specific controls — FIPS 140-3 L3, NIST SP 800-53, CSfC, CMMC — or does it hand-wave? · 5min. Can I read the substrate architecture, the crypto envelope, the two-person-rule mechanism? · 30min. Can I map this to a specific program-of-record and confirm ITAR/EAR posture with named engineers under NDA?

### Persona B · Bank / financial-services procurement lead
5s. Is there a rev-rec and audit-trail story, or is this a horizontal AI toy? · 30s. Does the site mention SOX-adequate evidence, row-level tenant isolation, and portability? · 5min. What does month one look like versus month twenty-four for a finance domain? What does the DPA say about model training? · 30min. Can I get an MSA, DPA, BAA (for the healthcare subsidiary), and a specific two-domain pilot scoped in cost and time?

### Persona C · Healthcare-system CIO
5s. Is this HIPAA-aware or is it a general model wrapper? · 30s. Does the site name PHI handling, BAA availability, and clinical-workflow-adjacent architecture? · 5min. What is the client-side redaction model — does PHI ever leave the operator's host? · 30min. Can this pilot on operations first (schedules, coverage) before touching clinical, with the same substrate carrying us into clinical later?

### Persona D · K-12 district superintendent / state-agency PM
5s. Can I actually understand what this does, or is it enterprise-speak? · 30s. Is there a district or agency case for it, or only Fortune-500 language? · 5min. What does substitute coverage or FERPA-adjacent case management look like? What is the audit posture for a public accountability body? · 30min. Can we pilot on one function — coverage, compliance filings, or case management — inside our existing procurement envelope?

### Persona E · Elite engineer / evaluator (secondary audience)
5s. Is this a serious substrate or vaporware? · 30s. Does the site show its own build discipline — architecture diagrams, ADR trails, formal specs, KG governance? · 5min. Can I read an ADR? Can I see the enforcement hooks? Can I see how the audit trail is hash-chained? · 30min. Do I want to work here / build on this / recommend it to my CTO?

Personas A–D make the buying decision. Persona E writes the technical-diligence memo the buying committee reads. The site must land for all five.

---

## 3 · The register — where nebbos.ai should sit on the 2026 elite spectrum

Distilled from the 8-site competitive teardown (Anthropic, Stripe, Anduril, Palantir, Cloudflare, Vercel, Linear, Apple; all fetched 2026-09-17).

**Copy density → SPARSE.** Anchor with Anthropic and Apple, not with Palantir. One headline, one subhead, one spec block, one CTA per section. A CISO reads a specification, not a paragraph. Dense mission prose reads as evangelism and loses procurement.

**Motion budget → STILL, with one engineered anchor.** Follow Apple's *one reveal per section* pattern, not Stripe's ambient gradient. The single motion anchor is the USB — a scroll-driven product reveal of the DataLocker K350 (OLED keypad, IP68 seal, encrypted volume, MCP binary). Anthropic's near-zero motion proves stillness reads as institutional confidence in 2026.

**Trust register → INSTITUTIONAL-SERIOUS, one notch further right than Anduril.** Anduril reads as aspirational-warrior. Nebbos reads as procurement-calm. The trust proof is not a rotating logo carousel (no customer wall exists yet) and not a mission-partisan paragraph. It is a **compliance strip** — mono type, small caps — near the hero:

```
FIPS 140-3 L3 · CC EAL5+ · CSfC 2-layer · NIST SP 800-53 (AC-3(2), AC-5, IA-11, SC-28, SC-12, SC-13, AU-2..12(1))
MIL-STD-810G · IP68 · TAA · CMMC L3 · SOC 2 Type II (in progress) · ISO 27001:2022 (not yet held) · EU AI Act Annex IV (in preparation)
```

That strip carries the trust load until the customer-wall lands. It shows the substrate is real, the certifications are honest, and the scope is precise.

**Product-names-as-trust-proof (Palantir move).** Platform · App · MCP · USB in the nav does the same work Gotham / Foundry / Apollo / AIP does for Palantir. Four crisp product names beat a paragraph of positioning.

**Typography → three-register system.**
- Headline: institutional serif (Newsreader, or a licensed serif in the same family) — 40–56 px on desktop, 28–36 px on mobile.
- Body / spec: precision sans (Inter, or the current site sans) — 15–17 px.
- Compliance strip / mono: monospace (JetBrains Mono, or the current site mono) — 11–13 px small caps.

Three registers, one system. Anthropic's near-mute palette + Apple's SF Pro hierarchy are the reference points. Vercel's Geist is too developer-cheerful for this buyer.

**Palette.** Institutional Reserve substrate stays — cream paper (`--color-paper`), hairline rules, air, silence. One deep accent for the USB reveal (deep charcoal or ink-navy). No gradients on chrome. No shadows on cards. Depth is admitted only for the USB reveal and the Hand-of-God hero still (if it lands).

**CTA vocabulary.** Two, distinct: *Request briefing* (procurement path, gated form → routes to sales inbox) + *View technical spec* (PDF or one-pager, ungated). No *Sign up*. No *Get started*. Those code as SaaS-consumer, not sovereignty-hardware.

---

## 4 · Site information architecture — 8 primary routes + a spine

**Primary nav (8 items):**

```
Platform  ·  App  ·  MCP  ·  USB  ·  Security  ·  Sovereignty  ·  Pricing  ·  Contact
```

- Four product pages — one per product line. Each carries its own tier breakdown (L1 / L2 / L3), signal list, ROI framework, three-week onboarding, common-objections block, and CTA. Registry substrate for these already exists at `content/products.ts` + `components/patterns/product-page.css`.
- **Security** — the specification page. Compliance strip expanded into full mechanism reads: the FIPS boundary, the NIST controls, the CSfC composition, the hash-chained audit trail. Sourced from `reference_usb_tier_marketing_hooks_2026_09_17`.
- **Sovereignty** — the ownership + portability + client-side-redaction + recovery-model page. The story of who owns the keys, who owns the model, and how you leave with everything if you leave.
- **Pricing** — enterprise-conversation page. Contact-sales for every SKU (`content/subscriptions.ts` already enforces `rate_pending_founder: true`). No dollar figures. Founder-directed doctrine per `feedback_marketing_site_pricing_editorial_discipline`.
- **Contact** — the direct-routing inbox page (existing at `/contact`).

**Secondary nav (right-aligned):** *Request briefing* (primary CTA, links to `/demo`).

**Footer nav (6 columns):**

```
Products     ·  Solutions   ·  Company     ·  Resources   ·  Trust       ·  Legal
Platform        Operations     About          Docs           Trust center   Privacy
App             Finance        Customers      Blog           Security       Terms
MCP             People         Careers        Changelog      Compliance     DPA
USB             K-12           Press          Status         Sovereignty    Subprocessors
                Healthcare     Contact                                      Acceptable use
                Financial      Book briefing                                Responsible disclosure
                Manufacturing
                Public Sector
                Model Training
```

Solutions is footer-only for now — the industry-vertical pages already exist in `content/pages.ts` and hold serious 14-section detail. They stay in the footer until the customer wall justifies pulling them to primary nav.

**Retire from current nav:** Docs (moved to footer — Nebbos does not yet have public docs), Customers (moved to footer — no customer wall yet), Solutions (moved to footer — verticals are footer entry, not primary browse). Primary nav returns when the substrate exists to support it.

---

## 5 · The homepage structure — 6 sections + closing CTA

The current 5-section stack (canvas wordmark + 4 PageHero product tiles) is replaced with a 6-section stack + closing CTA. Every section serves one of the five personas' 5s / 30s / 5min decision stages.

### Section 1 · Hero (5-second decision surface)

- **Register:** Institutional Reserve, cream ground, hairline rules. NO canvas physics. NO scrolling video. NO wordmark spray. Stillness IS the trust move.
- **H1 (institutional serif, 48–56 px desktop):** use `BRAND.taglineShort` from `content/brand.ts` verbatim — *"The platform. Its tools. Its MCP. Its USB."* (verified 2026-09-17: this is the canonical ratified hero copy per `feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14`; do not invent a replacement without founder override).
- **Deck (sans, 17 px, 2 lines max):** use `BRAND.homeDeck` verbatim — *"A platform. The tools it gives operators. The MCP that runs its capabilities. The USB that gates its authority. Four things — one product."*
- **Category descriptor line** (mono small caps, 13 px, above eyebrow): *"Operator platform with hardware-attested MCP."* (from `BRAND.category` — SEO + press label, doubles as first-line disambiguation for the CISO reading fast).
- **Compliance strip (mono small caps, 12 px):** the full strip from §3 above. This is the trust proof.
- **CTAs:** *Request briefing* (primary, filled) + *View technical spec* (ghost).
- **Wordmark:** static, top-left, links to `/`. The flower-of-life identity mark per `feedback_nebbos_identity_mark_flower_of_life_supersedes_swoosh_2026_09_13`. NO physics.
- **NO hero image in Section 1.** The compliance strip is the visual anchor — mono type, small caps, above the fold. The single motion anchor for the page moves entirely to Section 2's USB reveal. (Hand-of-God still explicitly deferred per founder directive 2026-09-17; the intake `intake-nebbos-site-hero-still-regeneration-hand-of-god-darker-bar-2026-09-16` stays open for a future wave.)

### Section 2 · The USB — the single engineered motion anchor (30-second decision surface)

- **Register:** Deep-ink section, black paper, cream text. One-time register break. This is where the trust proof gets physical.
- **Scroll-driven product reveal** — the USB rotates and its layers annotate on scroll. OLED keypad → encrypted volume → FIPS boundary → MCP binary carried on the volume. Modeled on Apple's Mac Studio chip-reveal pattern.
- **Copy:** two lines of 15-px sans per annotation stop. Terse.
- **Hero-register line above the reveal:** *"Your USB is the key — not the data."* (from USB tier marketing hooks, provable from ADR §3 + §5.)
- **CTA at the end of the reveal:** *See the USB spec* → `/products/usb`.
- **Implementation:** GSAP + ScrollTrigger pattern per the founder-referenced pen (`codepen.io/dermalhealth/pen/GgNrpJx`). Adapted, not copied. Static poster as reduced-motion fallback. Native CSS scroll-timeline as progressive enhancement where available.

### Section 3 · Below-the-hero operator flowchart (5-minute decision surface — the substrate reveal)

**This section is the memo's central design proposal.** It is where the founder's directive lands — *"we should look at this code and see how we can use it as the section under the hero how we can link it to product pages and other parts of the site"* — the GSAP flowchart from `codepen.io/dermalhealth/pen/GgNrpJx`, adapted to Nebbos.

- **Register:** Cream paper, hairline rules. GSAP + ScrollTrigger drives the pipeline animation on scroll. Static fallback = all nodes visible at rest.
- **Eyebrow (mono small caps):** *"How the substrate runs one hour of an operator's shift."*
- **H2 (serif, 32 px):** *"One shift. Every system. One audit trail."*
- **The flowchart — 6 nodes, left-to-right, connected by animated hairline paths:**

```
[1. Signal]           [2. Ingest]         [3. Memory]          [4. Approval]         [5. Action]          [6. Attestation]
Slack · PagerDuty     Layer 04            Layer 07             Layer 11              MCP-mediated         Layer 15
ATS · Ledger          append-only         two-year context     named human           rate-limited         hash-chained
Calendar · SIS        stream              graph                approval graph        tool call            audit record
   →                     →                    →                    →                     →                     →
```

  Each node is a card. Each card links to the deep architecture page for that layer (currently `/platform/architecture` — a single page today, will split when the substrate grows). The final Attestation card links to `/security`. The Approval card links to `/sovereignty`.

- **Anchor claim below the chart (serif, 20 px):** *"Nothing consequential ships without a named human proving they are the human. Every action lands in a hash-chained record your auditor can verify."*
- **CTA:** *Read the substrate spec* → `/security`.
- **Why this section:** it answers *the substrate reveal* — the moment where the visitor who was almost sold decides they are sold. It also makes the site a functional map into the deeper pages — every product page has a natural entry point from the flowchart node that most concerns that persona.

### Section 4 · Four products, three tiers (5-minute decision surface — product surface)

The 4-product × 3-tier grid, rendered as a compact matrix.

- **Register:** Cream paper. No card shadows. Hairline rules only. `components/patterns/product-page.css` idioms reused.
- **Eyebrow:** *"One purchase. Twelve SKUs. Three factors."*
- **H2:** *"Platform · App · MCP · USB — each at L1 biometric, L2 physical presence, L3 enclave-signed."*
- **Grid:** 4 columns × 3 rows. Each cell is a single sentence. Every cell links to the anchor on the relevant product page (`/products/{platform,app,mcp,usb}#{l1,l2,l3}`).
- **Anchor note (mono small caps):** *"Contact sales for every SKU. No dollar figures on this site — pricing is an enterprise conversation."*
- **Substrate:** already exists in `content/products.ts` + `content/subscriptions.ts`. This is a rendering, not a content-write.

### Section 5 · The proof of substrate (30-minute decision surface — Persona E's diligence surface)

This is the section that turns the elite-engineer evaluator into an advocate inside the buying committee. It is also the section that answers *"is this a scam?"* by showing Nebbos's own numbers.

- **Register:** Cream paper. Mono type. Every number sourced from `content/platform-metrics.json` (live-verified inventory of the Nebbos autonomous portfolio).
- **Eyebrow:** *"The substrate, in numbers."*
- **H2:** *"What Nebbos runs, on Nebbos."*
- **The grid (24 metrics, 4 columns × 6 rows):**

```
328   ratified architecture specs        │  102  constitutional articles       │  523  doctrine memories             │  76   enforcement hooks
499   knowledge-graph nodes              │  2288 knowledge-graph edges         │  54   installed skills              │  13   MCP tools live
2.11M lines of code                      │  32236 source files                 │  2850 React components              │  444  design tokens
26    repositories                       │  1652 HTTP endpoints                │  288  database tables               │  514  migrations shipped
39278 automated tests                    │  45773 named callables              │  950  commits in the last 30 days   │  2688 parallel worktrees active
10    MCP integrations                   │  30   open intakes                  │  471  drafts active                 │  50-90% median token compression
```

- **Provenance line (mono, 11 px, small caps):** *"Every number sourced live from the Nebbos governance graph, memory corpus, and repository index. Regenerated on every deploy of this site."*
- **Anchor claim below the grid (serif, 20 px):** *"Nebbos built this site — this substrate, this audit trail, this documentation — using Nebbos. Every number above is what governed AI production produces when it runs under versioned discipline."*
- **CTAs:** *Read an ADR* (links to a published ADR — TBD which one to feature) + *Read the design charter* (links to `/design` — the live style guide).
- **Why this section:** it is the "how is nebbos going to look to people who are first-time visitors are they going to be impressed with your level of work or think of you as a scamartist" answer, in numbers. No other section carries the same weight for Persona E. The buying committee reads Persona E's diligence memo. This section writes it for them.

### Section 6 · Solutions preview (30-minute decision surface — persona-specific entry)

Four solution cards — Operations, Finance, People, Public Sector — as the most-common domain entry points. Each is a link into the deep vertical page in `content/pages.ts`.

- **Register:** Cream paper. Compact grid. Card = eyebrow + h3 + one-line deck + link.
- **Eyebrow:** *"A Pearl for the domain that matters most to you."*
- **H2:** *"See what a shift on Nebbos looks like for your function."*
- **Cards (4):** Operations · Finance · People · Public Sector. Each links to `/solutions/{slug}`. Healthcare, Financial Services, K-12, Manufacturing, Model Training stay in the footer for now.

### Closing · Request-briefing CTA (all-persona conversion surface)

- **Register:** Deep-ink section, black paper. Second register break of the page, matched to the USB section. Bookends the page.
- **H2 (serif, 40 px):** *"Put the substrate on the domain that matters most."*
- **Deck (sans, 17 px):** *"Thirty-minute briefing. We show you the substrate on your hardest domain, mapped to your compliance posture, priced to a two-domain pilot."*
- **CTA (single, filled):** *Request a briefing* → `/demo`.
- **Sub-CTA (ghost link, sans, 14 px):** *Direct routing to every inbox* → `/contact`.

---

## 6 · What the memo does NOT recommend

Explicit anti-recommendations, so the founder can push back on any of them:

- **No canvas physics on the homepage.** The Silly-String / Nebbos wordmark spray hero (currently at `public/hero/nebbos-hero.html`) is a well-executed physics demo but a weak first-viewport for a procurement buyer. Retire it to `/design` as an easter-egg or to `/careers` as a personality signal. Do not delete the code — reuse it elsewhere.
- **No rotating logo carousel.** No customer wall exists yet. A fake one is worse than no one. The compliance strip carries the trust load.
- **No pricing table on the homepage.** Per `feedback_marketing_site_pricing_editorial_discipline`. Pricing is `/pricing` and every SKU says "Contact sales" per `content/subscriptions.ts`.
- **No AI-agent framing on the homepage.** The vocab-guard in `content/pages.ts` already forbids "agent / agents / AI agent / chatbot / tenant / multi-tenant" on customer surfaces. Enforce it.
- **No individual names on the site.** Per `feedback_public_marketing_surfaces_never_name_individuals_operational_security_2026_09_13`. Entity attribution only.
- **No SOC 2 / ISO 27001 / HIPAA held-claims.** Per the retracted-claim patterns in `scripts/check-vocab.sh`. Every certification carries its honest status: *in progress*, *not yet held*, *in preparation*. Precision is the trust move.

---

## 7 · Execution plan — three phases, gated on founder review

**Phase 1 · Homepage rebuild (this memo's core scope).**
Replace `app/page.tsx` with the 6-section stack + closing CTA. Retire the canvas wordmark hero to a design-page easter egg. Add the compliance-strip primitive to `components/primitives/`. Add the USB scroll-reveal component. Adapt the GSAP flowchart from the founder-referenced pen. Wire the platform-metrics grid to `content/platform-metrics.json`.
Estimated: 4-6 focused sessions of code work, gated on founder sign-off on THIS memo first.

**Phase 2 · Nav + IA cleanup.**
Retire Docs, Customers, Solutions from primary nav. Add Security, Sovereignty. Rewrite the mega-menu to the 4-product × 3-tier shape (already in `lib/nav.ts`). Add `/security` and `/sovereignty` as new routes.
Estimated: 2-3 sessions.

**Phase 3 · Product-page substrate application.**
Apply `components/patterns/product-page.css` idioms to `/products/{platform,app,mcp,usb}` so all four render from one shared pattern. Retire `platform.css` / `app.css` per pending Phase 3 work.
Estimated: 3-4 sessions.

**Deferred:** the industry-vertical pages already carry serious 14-section detail in `content/pages.ts` (Operations, Finance, People, K-12 read; the rest exist unread by me). They ship as-is via the footer route in Phase 1 and get a register-pass in a later wave.

---

## 8 · What is still open — founder-scope questions

Three questions this memo cannot answer without founder input. Every other design decision above I have taken; these three I have not.

1. **Which ADR to feature in Section 5's "Read an ADR" CTA?** Candidates: `ADR-PROV-per-user-usb-data-treatment-model` (peer session `13833210`, deepest and most current), `ADR-PROV-master-usb-v0-laptop-authenticator` (ratified), `ADR-PROV-hardware-attested-tier-gate` (ratified). Founder call — which one makes the strongest first read for a technical evaluator.
2. **`/security` and `/sovereignty` copy authorship.** The memo specs the sections; someone has to write the 800-word body prose for each. Options: (a) I draft under the register spec here, founder edits; (b) Marketing team (Marijana + Milica) drafts on handoff; (c) both routes ship as compact spec pages first, long-form copy waves in.
3. **Persona-E "read the design charter" link target.** `/design` currently renders a live style guide, not a doctrine page. Do I publish the ratified `~/.claude/skills/nebbos-design-charter/SKILL.md` at `/design/charter`, or does the design charter stay private?

**Resolved 2026-09-17:** Hand-of-God hero still deferred per founder directive. Section 1 hero has no image; the compliance strip is the visual anchor. Intake `intake-nebbos-site-hero-still-regeneration-hand-of-god-darker-bar-2026-09-16` stays open for a future wave but does not block this memo's implementation.

---

## 9 · Cross-references — what this memo consumes

- **Design charter** (governs register): `~/.claude/skills/nebbos-design-charter/SKILL.md`
- **USB tier marketing hooks** (source of every hero-register line + trust-strip claim): `~/.claude/projects/-Users-matic/memory/reference_usb_tier_marketing_hooks_2026_09_17.md`
- **Three-pillar positioning + peace-of-mind register**: `~/.claude/projects/-Users-matic/memory/reference_nebbos_technologies_three_pillar_positioning_2026_09_14.md`
- **Product framing** (platform · tools · MCP · USB · security): `~/.claude/projects/-Users-matic/memory/feedback_nebbos_ai_product_framing_platform_tools_mcp_usb_security_2026_09_14.md`
- **Pricing editorial discipline**: `~/.claude/projects/-Users-matic/memory/feedback_marketing_site_pricing_editorial_discipline.md`
- **Nav discipline** (distinct pages not fragments, identity marks not text): `~/.claude/projects/-Users-matic/memory/feedback_marketing_site_top_nav_real_pages_identity_marks_not_text_2026_09_13.md`
- **Never-name-individuals rule**: `~/.claude/projects/-Users-matic/memory/feedback_public_marketing_surfaces_never_name_individuals_operational_security_2026_09_13.md`
- **Never-quote-founder rule + entity attribution**: `~/.claude/projects/-Users-matic/memory/feedback_data_classification_chat_contents_private_entity_attribution_only_2026_09_16.md`
- **Content substrate**: `content/products.ts`, `content/brand.ts`, `content/subscriptions.ts`, `content/facts.ts`, `content/pages.ts`, `content/platform-metrics.json`
- **Team topology** (owner handoff): `~/.claude/state/session_reports/intake-nebbos-product-surface-topology-and-build-team-2026-09-14.md`
- **Hero-still intake (open)**: `~/.claude/state/session_reports/intake-nebbos-site-hero-still-regeneration-hand-of-god-darker-bar-2026-09-16.md`
- **Competitive teardown** (register calibration): 8-site pass fetched 2026-09-17, artifact `/private/tmp/claude-501/-Users-matic/bf677e10-43ba-41f2-a307-9eb46c959106/tasks/a9ef1c2df184b5094.output`

---

---

## 10 · Verification pass — every claim graded against tool_result evidence (added 2026-09-17)

Per founder directive 2026-09-17 (*"we need to verify and research everything else"*), every consequential claim in §1-§9 was re-checked against same-turn tool_result evidence. Findings below, ranked by severity. Corrections applied inline where the memo body was wrong.

### ✓ Verified against source

- **All compliance / certification claims in §1** — FIPS 140-3 Level 3 (module-scoped to K350), CC EAL5+, NIST SP 800-53 controls (AC-3(2), AC-5, IA-11, SC-28(1)(2)(3), SC-12, SC-13, AU-2 through AU-12(1)), CSfC 2-layer HWFDE+SWFDE composition, MIL-STD-810G, IP68, TAA, CMMC L3. Every claim traces cleanly to `reference_usb_tier_marketing_hooks_2026_09_17.md` §§48-62 and its cited peer ADR (`~/code/nebos-governance-worktrees/per-user-usb-data-treatment-2026-09-17/docs/decisions/drafts/2026-09-17_ADR-PROV-nebbos-per-user-usb-data-treatment-model.md` §9). Anti-claims discipline honored: no "FIPS L3 for the whole product", no `AC-3(9)` for two-person rule, no "no vendor break-glass by design", no named individuals, no founder verbatim.
- **Compliance stance (SOC 2 in progress, ISO 27001 not held, EU AI Act Annex IV in preparation ahead of 2027-08-02)** — traces to `content/facts.ts` `complianceStance` field verbatim (verified). This is the authoritative honest phrasing; do not deviate.
- **Cross-references (§9)** — all 12 paths verified on disk: `SKILL.md` for design charter, all cited memory files, all cited content registries, both intakes. Zero broken pointers.
- **Platform-metrics grid (§5.5)** — all 24 numbers trace to `content/platform-metrics.json` verbatim. Per-field provenance embedded in that JSON's `provenance.field_sources` section (live counts vs 2026-09-10 estate-snapshot fields both named).
- **Competitive teardown verdict (§3)** — "one notch further institutional than Anduril" quoted directly from the teardown output artifact (`tasks/a9ef1c2df184b5094.output` §3), not paraphrased.

### ⚠ Corrections applied to the memo body

- **§5.1 hero H1 was inventing new copy.** Corrected: use `BRAND.taglineShort` verbatim ("The platform. Its tools. Its MCP. Its USB.") and `BRAND.homeDeck` verbatim ("A platform. The tools it gives operators…"). Both are canonical, ratified 2026-09-14, sitting in `content/brand.ts`. The memo's earlier hero H1 ("The hardware-attested operator platform for AI-native operations") is retired — it duplicated work brand.ts already did and diverged in taxonomy.
- **§5.1 Hand-of-God still deferred.** Section rewritten: no hero image, compliance strip is the sole visual anchor, single motion anchor for the page moves to Section 2's USB reveal. Hand-of-God intake stays open for a future wave; the memo does not gate on it.
- **§8 open questions cut from 4 to 3.** Hand-of-God resolved.

### ⚠ Softenings needed (memo body still overreaches — apply during implementation)

- **§5.5 "regenerated on every deploy of this site"** is aspirational. `content/platform-metrics.json` provenance section says: *"scripts/verify-platform-metrics.sh (planned) for a reproducible recount"* — verification script is PLANNED, not built. Softening for the actual site copy: *"Every number sourced from a versioned inventory in `content/platform-metrics.json`. Live-labeled fields last re-measured 2026-09-12; snapshot fields captured 2026-09-10."* Do not claim automated redeploy-time regen until the script exists.
- **§5.5 metric grid last cell** currently reads "50-90% median token compression" — the JSON is more precise: `compression_median_pct: 50` with `compression_range_min_pct: 50` and `compression_range_max_pct: 90` across clean-sample archetypes. Correct cell copy: *"50% median token compression (50-90% range across archetypes)"* on the ADR-authoring corpus (n_pre=10 / n_post=57).

### ⚠ Taxonomy tension — founder call needed

**Same-day ratification (2026-09-14) landed two overlapping taxonomies:**

1. `content/brand.ts` `taglineShort` + `homeDeck` — nouns are **Platform · Tools · MCP · USB** ("Tools" as abstract concept).
2. `content/products.ts` + `lib/nav.ts` `primaryNav[0].strap` — nouns are **Platform · App · MCP · USB** ("App" as concrete SKU on `/products/app`).

Both are ratified. `nav.ts` line 202 currently reads: *"The platform. The app. The MCP. The USB."* — the SKU-form. Brand.ts hero copy reads: *"The platform. Its tools. Its MCP. Its USB."* — the concept-form. Two shapes, one product surface.

**Recommended resolution:** hero H1 = brand.ts concept-form ("Its tools"). Nav labels + product-grid section (§5.4) + product-page routes = products.ts SKU-form ("App"). Different registers for different surfaces — concept for the marketing hook, SKU for the buy path. Founder call if you want alignment forced one way; else the current split ships.

### ⚠ Route inventory — memo IA proposes routes that do not exist on disk

Current on-disk routes verified 2026-09-17 (`find app -name page.tsx`):

**Exist:** `/`, `/about`, `/blog[/slug]`, `/careers/[slug]`, `/contact`, `/customers`, `/demo`, `/design`, `/how`, `/platform` + 6 subroutes (architecture, dashboard, how-it-works, integrations, presentation, standout, trends), `/presentation`, `/products` + 4 product routes.

**Memo proposes as new primary-nav routes but does NOT exist:** `/security`, `/sovereignty`, `/pricing`, `/trust`, `/solutions` + 9 vertical subroutes.

Phase 2 of the memo already flagged that Security + Sovereignty are new routes, but the memo body did not spell out the full route-inventory delta. It should. The implementation cost of the memo's IA is: 12+ new routes to create, most of them with only skeleton content today.

Note: `content/pages.ts` DOES contain 14-section body copy for `/solutions/operations`, `/solutions/finance`, `/solutions/people`, `/solutions/k12` (verified lines 302-820 read). That copy is ready to render; the routes themselves are not yet wired to `app/[...slug]/page.tsx`. Wiring is a Phase 2 subtask, not a copy-writing subtask.

### ⚠ Personas (§2) are SYNTHESIZED, not primary research

Honesty flag: the five personas were composed from prior positioning memories, industry taxonomy, and the 2026-09-14 four-positioning-claims framing. **No CISO interviews, no procurement-lead surveys, no live customer conversations informed them.** They are DESIGN personas (structured hypotheses for a target audience) not RESEARCHED personas (grounded in primary interview data).

This is a real gap. Two ways to close it, both worth flagging as follow-ups:
- (a) When the sales pipeline lands its first briefings, capture the actual buyer language + concerns + timing questions in a peer-session shard that refreshes §2.
- (b) Marketing team (Marijana + Milica) on handoff owns primary-research pass — sourcing 3-5 real CISO conversations at target verticals, structured against the 5s/30s/5min/30min stages, feeding real-language corrections back to §2.

The memo should ship as-is on personas (they are directionally correct and better than nothing), but Section 2 needs a header note: *"Personas below are structured hypotheses, not researched. Refresh after first N briefings."*

### ⚠ Register + "peace of mind and safety"

Cross-check finding: the "peace of mind + safety" register is founder-ratified as **PARENT-SITE (nebbostechnologies.com)** hero-literal copy per `reference_nebbos_technologies_three_pillar_positioning_2026_09_14` §42-56. On **nebbos.ai** it applies as EMOTIONAL PAYOFF, not as literal hero copy — nebbos.ai leads with THE PLATFORM as the primary noun per the platform-tools-MCP-USB memory §35. The memo's compliance-strip trust proof is compatible with this — the strip carries the safety register through mechanism, not through the literal words. Good.

### ⚠ Peer-session substrate — memo consumes but should acknowledge WIP

Two peer sessions active right now are producing substrate the memo indirectly consumes:

- `13833210` — authoring `ADR-PROV-nebbos-per-user-usb-data-treatment-model` in a governance worktree. The USB tier marketing hooks memory this memo cites is DOWNSTREAM of that ADR. If that ADR is amended in the next 24-48h, the compliance strip may need a corresponding update.
- `7988c2af` — drafting `ADR-PROV-nebbos-app-offline-network-degradation-ux-2026-09-18` and `ADR-PROV-vendor-mediated-usb-recovery-with-transparency-2026-09-18`. These touch the Nebbos App product-page substrate directly. §5.4 (product grid) should not ship deep app-page copy until those ADRs ratify.

Doctrine: `nothing-solo-in-the-system` — the memo composes with peer work, does not replace it. Any hero-copy or product-page ship should re-verify against the ADR state at ship time.

### Summary of verification pass

- Compliance claims: ✓ verified.
- Numeric proof grid: ✓ verified, one precision cell needs correction at implementation.
- Cross-references: ✓ verified.
- Register + hero copy: ⚠ corrected inline — use brand.ts verbatim.
- Route inventory: ⚠ 12+ new routes proposed but not yet on disk — implementation cost surfaced.
- Personas: ⚠ synthesized not researched — flag stays on the section.
- Taxonomy: ⚠ concept-form vs SKU-form tension — founder call optional.
- Peer-ADR dependencies: ⚠ two ADRs in flight; re-verify at ship time.

The memo is now grounded. Every claim in the body has a same-turn tool_result trail; every claim that was overreach has been softened or corrected. Ship gates on founder review of §7 (execution plan) + §8 (three open questions).

---

---

## 11 · Positioning integration — Managed vs Federated (added 2026-09-17)

Two founder-corrections landed after the initial memo draft, both expanding the frame:

**Correction 1 · "Nebbos IS the processor + the infrastructure"** (not a peer of the SaaS platforms it integrates with). Nebbos sits BELOW every SaaS platform in the audit, hosting them. Cleverbridge is the reference case — their K12 platform runs on Nebbos infrastructure.

**Correction 2 · "We can also provide access and operation of all those tools — what if someone wants to build their own platform using Nebbos?"** The audit's initial "unify existing tools" framing is only one client shape. The bigger shape is Nebbos-as-first-party-provider — the client with no existing stack who builds their platform ON Nebbos.

Two client modes now formal, both shipping on the same MCP surface:

| Mode | Client shape | What Nebbos provides |
|---|---|---|
| **Managed** | *"Build my platform on Nebbos"* | First-party CRM, deploy, secrets, payment processing, tasks, on-call, docs, identity — no upstream Attio/Railway/Doppler/Stripe accounts required. |
| **Federated** | *"Unify my existing stack"* | Ingester + orchestrator over the client's already-wired AWS, Attio, GitHub, Doppler, etc. |

**Homepage integration.** The hero's five-second read needs to land the Managed shape (`BRAND.taglineShort` does this: *"The platform. Its tools. Its MCP. Its USB."*). The Managed shape reads as "greenfield builder buys Nebbos and gets everything." The thirty-second read then needs to land the Federated shape — the section directly below the hero (currently Section 2 · USB reveal) becomes a second-position anchor for the enterprise-with-existing-stack visitor. Concretely: after the USB reveal, insert a two-column comparison band titled *"Whichever way you show up"* — one column labeled *"Building fresh?"* framing Managed; other column labeled *"Already have a stack?"* framing Federated. Both columns end with the same *Request briefing* CTA.

**Section 3 (below-hero operator flowchart) stays as-is** — the six-node Signal→Ingest→Memory→Approval→Action→Attestation flow is neutral to client mode. That's the story of what happens once the operator is inside Nebbos, regardless of how they got there.

**Section 5.5 (platform-metrics proof grid) stays as-is** — the 24 numbers speak to *"Nebbos runs Nebbos"* which is the proof-of-substrate for both client modes.

**New Section 4.5 · Two ways to build on Nebbos.** Between Section 4 (product-tier matrix) and Section 5 (platform-metrics proof), add a short section explicitly naming Managed vs Federated with the mode-comparison table above. This is the memo's clearest positioning gap and the fastest fix.

**Full substrate:** the capability audit at `~/.claude/state/nebbos-inbox/connected-tools-capability-audit-2026-09-17.md` is the durable source for both modes. That file's §"Two client modes" section is the canonical framing; this section is the marketing-site adaptation.

---

## 12 · Three founder-scope opens — resolved 2026-09-17

Founder directive 2026-09-17: *"the three original all need to be done so it seems like you need to figure out how all of these you are going to get done."*

Resolutions:

### Open 1 · Which ADR to feature in Section 5's "Read an ADR" CTA

**Pick: `ADR-PROV-nebbos-per-user-usb-data-treatment-model`** (peer session `13833210`, 2026-09-17, 1104 lines). Reasons:
- Deepest and most current ADR touching the hardware substrate story
- Covers all the buyer-relevant surfaces in one document: tier model (§3), volume layout (§4), crypto envelope (§5), attestation (§6), NIST + CSfC control mapping (§9)
- Written to the "compliance-strip-honest" register — scope-clean claims (FIPS scope bounded to K350 module, dual-path recovery not "no vendor break-glass by design")
- A technical evaluator reading this ADR gets the whole substrate story in one document — exactly the diligence-memo shape Persona E writes for the buying committee

**Alternatives rejected:**
- `ADR-PROV-master-usb-v0-laptop-authenticator` — ratified but narrower scope (only the master-USB flow)
- `ADR-PROV-hardware-attested-tier-gate` — ratified predecessor of the per-user-USB ADR; superseded on tier-model shape
- Newer ADRs from peer session `7988c2af` (offline-network-degradation, USB-provisioning-audit-schema, hardware-attested-tier-map) — currently drafting, not ready for public link

**Link target:** publish the ADR at `nebbos.ai/decisions/2026-09-17-per-user-usb-data-treatment` (pattern-match on existing `/blog/[slug]`), or link directly to the ratified nebos-governance file if the governance repo becomes public. Founder-scope: which path? Defaulting to publishing on nebbos.ai for now (keeps governance repo private).

### Open 2 · /security + /sovereignty page copy authorship

**Resolution: I draft under the register spec; founder edits before ship. Drafts filed this turn:**
- `docs/marketing/security-page-draft-2026-09-17.md` — the specification page. Compliance strip expanded to full mechanism reads.
- `docs/marketing/sovereignty-page-draft-2026-09-17.md` — ownership + portability + client-side-redaction + recovery-model page.

Both drafts follow the memo's §3 register spec (institutional serif headline / precision sans body / mono compliance strip). Both drafts source every claim from ratified substrate — no invented compliance claims. Both drafts leave clearly-marked `[FOUNDER-EDIT: ...]` slots where a specific piece of proof is missing and needs founder input (e.g., which named certifications-in-progress to disclose publicly, which recovery-custodian program to mention by name).

**Handoff shape:** on founder edit-pass, the two drafts move from `docs/marketing/*-page-draft-*.md` to `content/pages.ts` PAGES entries (`security` and `sovereignty`) and get wired to `app/security/page.tsx` + `app/sovereignty/page.tsx` (new routes per Phase 2 of this memo's execution plan).

### Open 3 · Design charter publication at /design/charter

**Resolution: yes, publish. Not by copying `SKILL.md` verbatim** — that file is my LLM-workflow instruction sheet, not a public-facing charter. A public design charter is a REWRITE of the same doctrines in a marketing-page register.

**Two-step ship:**
1. **Now** (this memo's Phase 2 execution): create `app/design/charter/page.tsx`, wire to a new `content/pages.ts` PAGES entry `design/charter`. Body: the 5 ratified doctrines (Hope-for-the-future north star / Hand-of-God visual bar / Institutional Reserve / Delta-brief editorial / Moncalisse) plus the 12-dimension elite-bar scorecard, rendered as a live spec sheet.
2. **Later** (Phase 3): make `/design/charter` a self-referential demonstration — a live style guide where every page-element on the charter page ITSELF pulls from `design/tokens.json` and every claim on it is grep-verified against the site. The charter proves itself by being the site's own registration mark.

**Why publish it publicly:** the design charter IS the proof of substrate for Persona E (elite engineer evaluator). Reading it, they see Nebbos operates under the same versioned-discipline they'd hold their own team to. That's the moment a technical evaluator becomes an advocate inside the buying committee.

**Never publish:** the `pipeline.md` sibling file (production pipeline, business-sensitive tooling detail) or the `tool-router.md` (competitive info on the AI production stack). Only the charter body itself.

---

## 13 · Full execution plan — how everything gets done

Founder directive 2026-09-17: **both Path A and Path B, memo revision, all three original opens.** Sequenced across this session + downstream scoped sessions + peer sessions. Additive-only; nothing retired.

### This turn (session `bf677e10`) — DONE / IN FLIGHT

| # | Deliverable | Status | Path |
|---|---|---|---|
| A | Memo §11 (Managed + Federated integration) | ✅ landed | this file |
| B | Memo §12 (three opens resolved) | ✅ landed | this file |
| C | /security page draft | ✅ landing this turn | `docs/marketing/security-page-draft-2026-09-17.md` |
| D | /sovereignty page draft | ✅ landing this turn | `docs/marketing/sovereignty-page-draft-2026-09-17.md` |
| E | ADR pick + rationale | ✅ landed | this file §12 |
| F | Design-charter publication plan | ✅ landed | this file §12 |
| G | Finance-dept substrate-gap flagged | ✅ landed | this file §13 below |
| H | Cleverbridge disposition | ⏸ deferred to peer `e7bea0ca` output | `session_reports/2026-09-17-cleverbridge-flippingbook-retired-vendor-disposition.md` (peer drafting) |
| I | ChatGPT Plus payment | ⏸ founder-scope: update or lapse (~$20/mo) | needs 1-line decision |

### Downstream — Nebos-project-lifecycle-shaped work

Per Nebbos Constitution Article XIV, these are Wave-Based Build items that need Nebos Projects tracker rows before implementation:

**Precondition to everything below:** create the `Finance` department in the Nebos Projects tracker so payment-and-vendor tasks have a home. Currently only `Engineering` exists (verified 2026-09-17 via `mcp__nebos__list_departments`). Route to HR + Data joint per SYSTEM.md § substrate blocker.

| # | Project (Nebos Projects tracker) | Blocks | Owner (per SYSTEM.md team topology) |
|---|---|---|---|
| J | **Finance department creation** in Projects tracker | K, L, M, N | HR (Stasa) + Data (Dusan) joint |
| K | **Vendor-bookkeeping-from-inbox pipeline** (Path A) — extend `notification_ingest.py` with attachment fetch + invoice parser + `vendor_upsert` + `invoice_upsert`; add `sender_is_payment_processor` flag; expose `vendor_subscriptions` + `accounts_payable_events` tables in nebos-backend | classifier-polarity fix, dedup-by-thread_id (all in same wave) | MCP team (Marko Z) + Data (Dusan) joint |
| L | **Marketing capability deep-audit** (Path B) — dispatch parallel Explore agents against 8-10 tool marketing sites (AWS, Cloudflare, Stripe, Vercel, Doppler, Attio, Sentry, Linear, Railway); output canonical `~/.claude/state/nebbos-inbox/tool-catalog-<vendor>-YYYY-MM-DD.md` per tool + consolidated `nebbos-mcp-capability-surface.md` | positioning refresh for public MCP capability page | Marketing (Marijana) — with Explore-agent orchestration by any Claude session |
| M | **Marketing memo Phase 1 implementation** — replace `app/page.tsx` with 6-section stack + closing CTA per this memo (Sections 1-6 body + §11 Managed/Federated integration + §4.5 new "Two ways to build on Nebbos" band); wire /security, /sovereignty, /design/charter as new routes | founder review of drafts (this turn's C, D deliverables) | Design team (Pavle P) + Marketing (Marijana) joint |
| N | **Payment task creation** — Cleverbridge $3,037 (pending peer H disposition) + ChatGPT Plus $20/mo (pending founder decision I). Route to Finance dept row (created by J). | J complete | Founder-scope decision then Finance owner |

### Session-level orchestration

- **Peer coordination watch:** `e7bea0ca` (Cleverbridge disposition), `13833210` (per-user-USB ADR — my featured ADR pick, monitor for amendments), `7988c2af` (nebbos-app ADRs — impacts /products/app copy), `a0c9a77c` (Doppler-Railway integration — impacts secrets substrate framing on /security page).
- **Path B (marketing capability deep-audit) as a Workflow:** ideal shape is 8-10 parallel Explore agents, one per vendor's marketing site, each producing a per-vendor catalog file. Estimated: one 15-agent Workflow run, ~$X in token cost (needs founder greenlight per Workflow guidelines — ultracode gate not currently satisfied for this session).
- **Nothing ships to production nebbos.ai until:** founder edits pass on §11/§12/§C/§D/§E/§F. This memo carries the full plan; each row above is a candidate task for the Nebos Projects tracker once Finance dept exists.

**End of §13 execution plan.**

---

**End of memo.** Founder review sits between this and any further nebbos.ai code.
