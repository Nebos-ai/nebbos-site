# nebbos.ai site-wide route revision plan

**Author:** session `bf677e10`, 2026-09-17
**Scope:** the entire nebbos.ai marketing site, not just the homepage
**Grounding:** 12-vendor Path B capability audit (`~/.claude/state/nebbos-inbox/nebbos-mcp-capability-surface-2026-09-17.md`) + `docs/marketing/homepage-first-time-visitor-strategy-2026-09-17.md` memo
**Session frame:** Founder directive 2026-09-17 (*"we are not looking at the home page only we are looking across the entire marketing nebbos.ai site"*). System map read as of 2026-09-16 13:52 UTC.
**Constraints active:** never name individuals on public marketing · never publish pricing · Nebbos IS the processor + infrastructure (Managed/Federated dual-mode)
**Status:** SEED PLAN — decisive per-route calls in a single document; each row is a candidate work-item

---

## §0 · Site-wide standards distilled from the 12-vendor audit

Every route below is judged against these standards. Any route that doesn't hold them is a revision candidate.

| Dimension | Standard (from audit) |
|---|---|
| **Register** | Quiet-elite AI-native SaaS 2026 — the Linear/Notion/Vercel/Ramp/Attio consensus. Anti-marketing, sparse copy, product-screenshots-do-the-work, no exclamations or superlatives. |
| **Copy density** | Sparse hero (2-3 sentences), moderate mid-page (2-4 sentence blocks), never wall-of-paragraphs. |
| **Motion** | Low. Hover transitions + product-screenshot fades. No full-viewport parallax, no autoplay video, no cookie-wall shouting. |
| **Palette** | Institutional Reserve (cream ground + hairline rules) for chrome. Dark register break only where a specific product proof lives (USB reveal, closing CTA). |
| **Typography** | Institutional serif for headlines (40-56 px). Precision sans for body (15-17 px). Mono for compliance strips + eyebrows (11-13 px small caps). |
| **Trust proof shape** | Compliance strip in hero on institutional pages (per Doppler pattern) + substrate-metrics grid + provenance-linked numbers. **Never** fake logos or fake case studies until real ones can be named. |
| **Positioning claim** | `BRAND.taglineShort` verbatim: *"The platform. Its tools. Its MCP. Its USB."* — do not invent replacements. |
| **Managed + Federated** | Both client shapes should appear on every product/solutions page. Managed = *"Build on Nebbos, greenfield"* · Federated = *"Unify what you already have"*. Both ship on the same MCP surface. |
| **Hardware-attested wedge** | Emphasize *where* the MCP lives (on the K350 USB) and *how* it gates (biometric + USB + enclave). MCP itself is no longer rare; the physical + attestation layer is the differentiation. |
| **FIPS 140-3 Level 3 wedge vs Auth0 FIPS 140-2** | Institutional pages (Security · Sovereignty · Compliance · Trust) should call this generational gap out for regulated buyers. |
| **Vocab guard** | Never on customer surfaces: agent · agents · AI agent · chatbot · assistant · copilot · tenant · multi-tenant. Retired: company brain · operating system (as brand framing) · fifteen governance layers · department (use domain). |
| **Never name individuals** | Entity-level attribution only. Testimonials by role, not by name, until public-marketing clearance lands. |
| **Never publish pricing** | Every SKU says *"Contact sales"* per `feedback_marketing_site_pricing_editorial_discipline` + `content/subscriptions.ts`. |
| **CTA discipline** | Two, distinct: *"Request briefing"* (procurement path) + a secondary self-serve or spec-read CTA. No *"Sign up"* / *"Get started"* — those code as SaaS-consumer. |

---

## §1 · Full route inventory (as of 2026-09-17)

### 1a · Routes on disk (25 page.tsx files)

| # | Route | Renders from | State per audit |
|---|---|---|---|
| 1 | `/` | `app/page.tsx` bespoke (v12: wordmark + Managed/Federated + InProduction + product-tiles + BuiltWithNebbos + NebbosInventory) | ✅ audit-shaped (this session) |
| 2 | `/about` | `app/about/page.tsx` bespoke (renders from `PAGES.about` + `content/facts.ts`) | ⚠ needs register pass; compliance stance already grounded via `facts.ts` |
| 3 | `/blog` | `app/blog/page.tsx` | ⚠ empty state — audit-neutral until content exists |
| 4 | `/blog/[slug]` | dynamic | ⚠ per-post register needed when posts exist |
| 5 | `/careers/[slug]` | dynamic; `PAGES.careers` at top-level absent | ⚠ /careers index page missing; only /careers/[slug] dynamic path exists |
| 6 | `/contact` | `app/contact/page.tsx` (`PAGES.contact`) | ✅ already inbox-router; audit-neutral |
| 7 | `/customers` | `app/customers/page.tsx` — no `PAGES.customers` entry | ⚠ empty state; DO NOT populate with fake customers |
| 8 | `/demo` | `app/demo/page.tsx` (`PAGES.demo`) | ⚠ agenda-list needs register pass |
| 9 | `/design` | `app/design/page.tsx` — live style guide | ✅ Persona-E surface, add `/design/charter` per memo §12 |
| 10 | `/how` | `app/how/page.tsx` | ⚠ needs review — likely stale content |
| 11 | `/platform` | `app/platform/page.tsx` bespoke | ⚠ retire OR reframe — memo pushes /platform to be a product page under `/products/platform` |
| 12-17 | `/platform/architecture`, `.../dashboard`, `.../how-it-works`, `.../integrations`, `.../presentation`, `.../standout`, `.../trends` | 7 subroutes | ⚠ retire OR consolidate — this is the retired 15-layer architecture treatise per memo §12 (route already retired via `next.config.ts` per prior session; verify) |
| 18 | `/presentation` | `app/presentation/page.tsx` | ⚠ needs review — investor / internal? |
| 19 | `/products` | `app/products/page.tsx` — index | ✅ audit-shaped, 4-product grid |
| 20-23 | `/products/{platform,app,mcp,usb}` | 4 product pages | ⚠ each needs register pass + Managed/Federated language + compliance strip on `/products/usb` |
| 24 | `/[...slug]` | catchall — renders from `PAGES` registry | ⚠ every slug NOT covered by a bespoke page.tsx renders through here |
| 25 | (root layout) | `app/layout.tsx` | ⚠ nav + footer register pass |

### 1b · Routes in `PAGES` registry but NOT on disk (need `[...slug]` catchall OR new bespoke)

From `content/pages.ts` grep (44 slug entries):

| Slug | Currently rendered? | Priority |
|---|---|---|
| `/solutions` | ⚠ NOT rendered (no route, only PAGES entry) | HIGH — vertical entry point |
| `/solutions/operations` | ⚠ NOT rendered | HIGH — best-fleshed content in PAGES |
| `/solutions/finance` | ⚠ NOT rendered | HIGH |
| `/solutions/people` | ⚠ NOT rendered | HIGH |
| `/solutions/k12` | ⚠ NOT rendered | HIGH — real client (Cleverbridge-hosted K12 tool, per this session) |
| `/solutions/healthcare` | ⚠ NOT rendered | MEDIUM |
| `/solutions/financial-services` | ⚠ NOT rendered | MEDIUM |
| `/solutions/manufacturing` | ⚠ NOT rendered | LOW |
| `/solutions/public-sector` | ⚠ NOT rendered | MEDIUM — defense buyer path |
| `/solutions/model-training` | ⚠ NOT rendered | MEDIUM |
| `/trust` | ⚠ NOT rendered | HIGH — memo §4 nav item |
| `/security` | ⚠ NOT rendered — DRAFT ready at `docs/marketing/security-page-draft-2026-09-17.md` | HIGH |
| `/compliance` | ⚠ NOT rendered | HIGH — authoritative status page for /security to link |
| `/careers` | ⚠ index NOT rendered (only /careers/[slug]) | MEDIUM |
| `/docs` | ⚠ NOT rendered — Nebbos doesn't have public docs yet | LOW — hold until docs exist |
| `/changelog` | ⚠ NOT rendered | LOW |
| `/status` | ⚠ NOT rendered — no uptime dashboard exists | LOW — DO NOT publish before real numbers |
| `/press` | ⚠ NOT rendered | LOW |
| `/legal/law-enforcement`, `/legal/privacy`, `/legal/terms`, `/legal/dpa`, `/legal/subprocessors`, `/legal/cookies`, `/legal/acceptable-use`, `/legal/responsible-disclosure` | ⚠ 8 legal pages NOT rendered | HIGH-legal · LOW-marketing — needed for procurement legal review |

### 1c · Routes in memo §4 IA but NOT anywhere yet

| Slug | Source | Priority |
|---|---|---|
| `/sovereignty` | Memo §11 · draft at `docs/marketing/sovereignty-page-draft-2026-09-17.md` | HIGH |
| `/design/charter` | Memo §12 Open 3 | MEDIUM |

---

## §2 · Per-route revision plan (audit-derived deltas)

Grouped by priority. Each row = one concrete work-item.

### 2a · HIGH PRIORITY (institutional trust surfaces — where the buying decision happens)

| # | Route | Delta from audit | Deliverable ready? |
|---|---|---|---|
| 1 | `/` (home) | Managed+Federated + NebbosInventoryBand landed this session. Next: consider swapping wordmark spray hero for Institutional Reserve register per memo §3 (still cream ground, compliance strip anchor, no full-bleed physics). | Partial — wordmark still lives |
| 2 | `/security` | Route missing. Copy draft ready at `docs/marketing/security-page-draft-2026-09-17.md`. Wire `app/security/page.tsx` + `PAGES.security` entry. Emphasize **FIPS 140-3 Level 3 vs Auth0's FIPS 140-2** — generational wedge. | ✅ draft ready · needs route wire + founder-edit-pass |
| 3 | `/sovereignty` | Route missing. Copy draft ready at `docs/marketing/sovereignty-page-draft-2026-09-17.md`. Add: **Nebbos IS the processor + infrastructure** framing per audit §"Nebbos-adjacency" for Stripe + AWS. | ✅ draft ready · needs route wire + founder-edit-pass |
| 4 | `/trust` | Route missing. PAGES entry exists at `pages.ts:1582`. Wire via `[...slug]` OR bespoke. Body needs: (a) architecture-as-trust framing, (b) link to /security + /sovereignty + /compliance, (c) `NebbosInventoryBand` reused or a version of it. | ⚠ PAGES entry exists · needs router wire + copy pass |
| 5 | `/compliance` | Route missing. PAGES entry exists at `pages.ts:1865`. Wire. Body: authoritative per-framework current status (SOC 2 in progress / ISO 27001 not held / EU AI Act Annex IV in prep / HIPAA readiness / FERPA / GDPR / FIPS 140-3 L3 module-scoped). This is the page every other page's compliance strip points at. | ⚠ PAGES entry exists · needs router wire + copy pass |
| 6 | `/products/usb` | Add hardware-attested wedge on the page hero. Explicit **FIPS 140-3 L3** call-out. Peer coordination: `13833210`'s per-user-USB ADR + `7988c2af`'s USB-provisioning-audit-record-schema ADR are the substrate. | ⚠ needs copy pass + peer-ADR-alignment |
| 7 | `/products/platform` | Add Managed+Federated framing. Sync with `content/subscriptions.ts` for tier language. | ⚠ needs copy pass |
| 8 | `/products/mcp` | Sharpen the wedge: **MCP is now a competing baseline**; what's rare is *MCP on your USB, gated by biometric + enclave*. Do not lead with "we have MCP" — every peer has MCP. | ⚠ needs copy pass — critical positioning shift |
| 9 | `/products/app` | Peer coordination: `7988c2af`'s Nebbos-app step-up-UX + product-voice + offline-network-degradation ADRs are in-flight. Copy pass depends on their ratification. | ⚠ blocked on peer ADR ratification |
| 10 | `/solutions/operations` | 14-section body already written in `PAGES["solutions/operations"]` (lines 302-454 of pages.ts). Wire the route. | ✅ copy exists · needs route wire |
| 11 | `/solutions/finance` | 14-section body already written (lines 458-595). Wire the route. | ✅ copy exists · needs route wire |
| 12 | `/solutions/people` | 14-section body already written (lines 599-736). Wire the route. | ✅ copy exists · needs route wire |
| 13 | `/solutions/k12` | 14-section body already written (lines 740-820+). Wire the route. Relevant to Cleverbridge-hosted K12 tool per this session's context. | ✅ copy exists · needs route wire |
| 14 | `/solutions` (index) | PAGES entry at pages.ts:282. Wire as vertical picker. | ⚠ copy exists · needs router wire + design |
| 15 | Legal pages (8) | HIGH for procurement legal review. PAGES entries exist. Wire via `[...slug]`. | ⚠ 8 legal pages need wiring + legal-team edit-pass |

### 2b · MEDIUM PRIORITY (product surface + supporting content)

| # | Route | Delta from audit | Deliverable ready? |
|---|---|---|---|
| 16 | `/about` | Compliance stance line comes from `facts.ts` (already grounded). Register pass: replace "operator platform for AI-native operations" with `BRAND.taglineShort` per positioning discipline. Add mention: 11-team topology, 4-product portfolio (without individual names). | ⚠ register pass |
| 17 | `/customers` | Empty state — no customer wall yet. Do NOT populate with fake. Copy this page to say *"Deployed today in school districts across multiple US states. Named case studies land when clients clear public-marketing."* (source: `InProductionBand`.) | ⚠ empty-state copy needed |
| 18 | `/how` | Review current content — likely stale. Consider deprecating in favor of the 6-node operator flowchart from memo §5.3 or rolling into `/products` deep-dive. | ⚠ review + likely retire |
| 19 | `/design/charter` | Memo §12 Open 3. Write public rewrite of the 5 doctrines from `~/.claude/skills/nebbos-design-charter/SKILL.md` + 12-dimension elite-bar scorecard. Persona-E surface. | ⚠ needs authoring |
| 20 | `/design` | Already a live style guide. Add `/design/charter` as a sibling route. | ✅ audit-neutral · additive only |
| 21 | `/demo` | Register pass on the 4-item "What we'll cover" list. Sharpen "See a Pearl on your hardest domain" — Pearl language may need reframing per audit's vocab-guard rules. | ⚠ minor register pass |
| 22 | `/solutions/{healthcare,financial-services,public-sector,model-training}` | PAGES entries exist (lines 880-1581). Wire routes. Public-Sector is defense-buyer-relevant. | ⚠ copy exists · needs route wire |
| 23 | `/careers` (index) | Add index page listing open roles. Never name individuals — role-descriptions only. | ⚠ needs authoring |

### 2c · LOW PRIORITY (retire, defer, or hold)

| # | Route | Delta from audit | Deliverable ready? |
|---|---|---|---|
| 24 | `/platform` + 7 subroutes | Retire OR consolidate. This is the retired 15-layer architecture treatise. Verify `next.config.ts` redirect. If pages still render, sunset them per additive-only discipline (banner + link to `/products`). | ⚠ retire-or-supersede — verify redirect + add banner |
| 25 | `/presentation` | Investor deck OR internal? If investor, private-link only. If public, needs full audit pass. | ⚠ founder-scope: keep public or move to gated? |
| 26 | `/blog` | Empty state. Hold until posts exist. Do not fake posts. | ⚠ hold |
| 27 | `/docs` | Nebbos has no public docs yet. Hold. Do not scaffold. | ⚠ hold |
| 28 | `/changelog` | Hold until the auto-generated changelog is wired (per `feedback_commit_messages_are_marketing_and_memory_source_2026_09_15` — commits should feed changelog). | ⚠ substrate-blocked |
| 29 | `/status` | DO NOT publish before real uptime numbers. Doppler / Sentry / Cloudflare all publish real uptime %; Nebbos should not publish 99.99% before it's measured. | ⚠ hold — no fake numbers |
| 30 | `/press` | Hold until first press interaction happens. Currently empty. | ⚠ hold |
| 31 | `/pricing` | Never render this page. Every SKU says *"Contact sales"* per `feedback_marketing_site_pricing_editorial_discipline`. If a `/pricing` route ever ships, it should be a redirect to `/demo`. | ⚠ deliberately absent |

---

## §3 · Nav + footer revisions (from memo §4 IA)

**Primary nav (currently in `lib/nav.ts`):**
- Current: Products · Solutions · Customers · Trust · Docs
- Proposed per memo §4: Platform · App · MCP · USB · Security · Sovereignty · Pricing · Contact
- **Reconciliation:** the current mega-menu-based Products nav (per `nav.ts:megaProducts`) is Product-forward + tier-drill-down + strap-line. Memo §4 wants 8 primary items. Realistic split: keep the mega-menu Products, add Security + Sovereignty + Trust as new siblings, retire Docs (defer to footer until docs exist), retire Customers from primary (defer to footer until customer wall exists).

**Proposed primary nav:** Products (mega) · Solutions (mega, once verticals ship) · Security · Sovereignty · Trust · Contact.

**Footer:** current `footerNav` in `lib/nav.ts` already covers Products / Solutions / Company / Resources / Trust / Legal — well-structured. Delta: some links resolve to routes that don't exist yet (e.g. `/careers` index, `/legal/*` pages). Wire the routes per §2 above.

---

## §4 · Cross-cutting revisions (apply to every route)

Every route needs these regardless of its specific content:

1. **Header:** compliance strip mono-small-caps line under the identity mark. Content: `FIPS 140-3 L3 · CC EAL5+ · CSfC 2-layer · NIST SP 800-53 · SOC 2 Type II (in progress) · ISO 27001:2022 (not yet held)`. Sourced from `reference_usb_tier_marketing_hooks_2026_09_17`.
2. **Vocab-guard sweep:** run `scripts/check-vocab.sh` (per `content/pages.ts` header comment) — enforce the banned-term list. Any hit is a defect.
3. **Never-name-individuals sweep:** grep every route body for individual names. `59c8c71c`'s in-flight `feedback_founder_never_referenced_on_shared_surfaces_2026_09_17` and their `intake-founder-name-reference-sweep-shared-surfaces` intake produce the discipline layer for this. Coordinate.
4. **Compliance-status-line:** every route mentioning certifications MUST link to `/compliance` (once that route lands) for authoritative status.
5. **CTA discipline:** every page has ≤ 2 CTAs. Primary = *"Request briefing"* → `/demo`. Secondary = context-appropriate (*"Read the substrate"* → featured ADR · *"See the products"* → `/products` · etc.).
6. **Register on layouts:** header + footer chrome per Institutional Reserve doctrine — flat cream, hairline rules, no shadows.

---

## §5 · Priority-ordered execution plan (post founder-signoff)

Sequenced by business impact + dependency:

**Phase 1 · Institutional trust surfaces (5 routes, ~10 sessions of work):**
1. `/security` — wire route + `PAGES.security` + `app/security/page.tsx` from draft
2. `/sovereignty` — wire route + `PAGES.sovereignty` + `app/sovereignty/page.tsx` from draft
3. `/trust` — wire route via `[...slug]` from existing PAGES entry
4. `/compliance` — wire route via `[...slug]` from existing PAGES entry
5. Header compliance strip on layout — universal

**Phase 2 · Solutions verticals (9 routes, ~5 sessions of work):**
6-9. `/solutions/{operations,finance,people,k12}` — wire routes from existing PAGES entries (copy already exists at 500-800 words per vertical)
10-13. `/solutions/{healthcare,financial-services,public-sector,model-training}` — same shape
14. `/solutions` index — vertical picker

**Phase 3 · Product surface polish (4 routes, ~4 sessions):**
15-18. `/products/{platform,app,mcp,usb}` — register + Managed/Federated + hardware-attested wedge (usb) + peer-ADR-align (app)

**Phase 4 · Retired + emptied routes (10 routes, ~2 sessions):**
19. `/platform` + 7 subroutes — verify retire redirects, add supersession banner
20. `/customers` — empty-state copy
21. `/how` — sunset or reframe

**Phase 5 · Legal + supporting (10 routes, ~3 sessions):**
22-29. `/legal/*` (8 pages) — wire routes + legal-team edit-pass
30. `/careers` index
31. `/design/charter` — public rewrite of design charter

**Phase 6 · Hold routes (~0 sessions until content substrate exists):**
- `/blog`, `/docs`, `/changelog`, `/status`, `/press`, `/pricing` — all deliberately empty or absent until real content justifies rendering

**Total estimated:** 25-30 focused sessions of implementation work post-founder-signoff on this plan. Copy exists for most solutions verticals + /security + /sovereignty + /trust + /compliance — bulk of the work is route wiring + register passes, not writing new copy.

---

## §6 · Peer coordination watch (in-flight ADRs that touch this scope)

- `13833210` — `ADR-PROV-nebbos-per-user-usb-data-treatment-model` — impacts `/products/usb` + `/security` (featured ADR pick)
- `7988c2af` — `ADR-PROV-nebbos-app-step-up-ux-and-product-voice-substrate` + `ADR-PROV-usb-provisioning-audit-record-schema` — impacts `/products/app` + `/products/usb`
- `59c8c71c` — `feedback_founder_never_referenced_on_shared_surfaces_2026_09_17` + `intake-founder-name-reference-sweep-shared-surfaces` — cross-cutting: every route needs a name-reference sweep
- `a0c9a77c` — `ADR-PROV-doppler-railway-native-integration` supersession — impacts `/security` secrets-substrate framing
- `9c8ac808` — decisions-registry ADR-290 Amd 1 + project-row-level ACL substrate — governance-side, doesn't directly touch marketing
- `3eb5dc53` — managed-agents ADR + HR record intake — internal-facing, doesn't touch marketing
- `e7bea0ca` — MCP-doppler-wrappers phase 1 — deep substrate, doesn't touch marketing

**Do not ship** `/security` or `/products/usb` copy until `13833210` + `7988c2af` USB ADRs ratify — the substrate claims those pages make depend on the ADR shape.

---

## §7 · Founder-scope decisions in this plan

1. **`/platform` + 7 subroutes** — retire cleanly (delete files after redirect verified) OR keep with supersession banner? Additive-only doctrine says: keep with banner.
2. **`/presentation`** — public or gated?
3. **`/pricing`** — confirmed deliberately absent per doctrine. Anywhere the pricing table would go, the *"Contact sales"* line appears instead. Confirm this is still the stance.
4. **Wave 5 of Path B (candidates: Grafana, Datadog, HubSpot, Salesforce)** — greenlight or hold at 12 vendors?
5. **`/design/charter`** — publish public rewrite of the design charter? (Memo §12 Open 3.)

---

## §8 · Files this plan cites

- Audit synthesis: `~/.claude/state/nebbos-inbox/nebbos-mcp-capability-surface-2026-09-17.md` (12 vendor catalogs)
- Homepage strategy memo: `docs/marketing/homepage-first-time-visitor-strategy-2026-09-17.md`
- /security draft: `docs/marketing/security-page-draft-2026-09-17.md`
- /sovereignty draft: `docs/marketing/sovereignty-page-draft-2026-09-17.md`
- Page registry: `content/pages.ts` (44 slug entries · 2390 lines)
- Nav: `lib/nav.ts`
- Facts: `content/facts.ts` · Brand: `content/brand.ts` · Metrics: `content/platform-metrics.json`
- Design charter: `~/.claude/skills/nebbos-design-charter/SKILL.md`

---

**End of plan.** Founder review before Phase 1 kicks off.
