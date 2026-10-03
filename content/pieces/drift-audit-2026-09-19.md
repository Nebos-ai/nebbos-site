# Piece drift audit · 2026-09-19

Founder directive that produced this file: *"is there way more information better data that we can have across all of them."*

Prior state — pieces were classified by title + date. That is NOT a substance audit. This file goes claim-by-claim, cross-checked against the current system state.

- **Read in depth this session:** 21 of 50 pieces
- **Classified by title only:** 29 of 50 — flagged as `unverified` in `registry.ts`, no substantive audit yet, per-artifact reads are the next batch of work
- **Anchor data sources for cross-check:**
  - `~/.claude/state/SYSTEM.md` (2026-09-16 canonical map)
  - `content/platform-metrics.json` (2026-09-18 snapshot with provenance)
  - `content/canonical-claims.ts` (the ratified cross-piece framings)
  - `~/.claude/projects/-Users-matic/memory/MEMORY.md` (2026-09-19 doctrine index)

Every finding below cites the specific claim in the piece and the specific source of the current-day counterclaim. Nothing here is "I remember."

---

## Piece 1 · Institutional deck (2026-09-19, `institutional-deck`)

**Status verdict:** Currently `current` in registry, MOSTLY correct, one drift to fix.

| Claim in piece | Current data | Verdict |
|---|---|---|
| Product framing "Platform · App · MCP · Cradle" | Matches `PRODUCT_SURFACES` in canonical-claims.ts | ✅ current |
| "In production today. Across four U.S. states." | Confirmed as ratified production claim in canonical-claims.ts `PRODUCTION_CLAIM` | ✅ current |
| Six-row compliance table (SOC 2, ISO 27001, EU AI Act, HIPAA, FERPA, GDPR/CCPA) | Matches `COMPLIANCE_POSTURE` verbatim | ✅ current |
| Five-tier data treatment (Sealed → Portable → Redacted → Attested → Air-gapped) | Matches `DATA_TIERS` verbatim | ✅ current |
| Corporate signature "Nebbos Technologies Corp · Nebbos AI · Nebbos Technologies D.O.O." (Balkans) | Ratified 2026-09-19 rename applied | ✅ current |
| EU AI Act deadline "2027-08-02" | Verified in `COMPLIANCE_POSTURE` | ✅ current |
| Four governance pillars | Matches `GOVERNANCE_PILLARS` | ✅ current |
| Slide 9 says "Nebbos Technologies D.O.O. — the Balkans operating entity" | New MEMORY.md entry `nebbos-doo-balkan-operations` says the entity leads Balkan sales+ops (Vanja Jovanović). Alignment good. | ✅ current |

**No refresh needed.** Piece is aligned with current doctrine.

---

## Piece 2 · Compression is the tax on ambition (2026-09-19, `compression-tax-on-ambition`)

**Status verdict:** Currently `current` in registry, aligned with brand + numbers.

| Claim in piece | Current data | Verdict |
|---|---|---|
| "138,000 operator decisions" (35 days) + "44¢ per decision" + "$61,504 month all-in" | Piece-specific measurement, not in platform-metrics.json. Numbers self-consistent within piece. | ⚠️ **not in canonical numbers file** — if we want to publish this as a repeated stat across pieces, needs a `platform-metrics.json` field with provenance |
| Corporate footer "Nebbos Technologies Corp · Nebbos Technologies D.O.O." | Current | ✅ |
| Delta brief editorial register | Marketing register per two-register doctrine | ✅ |

**Refresh flag:** Not for this piece specifically, but the underlying "138K decisions · 44¢ each" measurement should be canonicalized into `platform-metrics.json` so it's citable elsewhere with provenance. Currently orphaned in one HTML file.

---

## Piece 3 · Investor deck (2026-09-19, `investor-deck`)

**Status verdict:** Currently `refresh` in registry, one real drift confirmed.

| Claim in piece | Current data | Verdict |
|---|---|---|
| Team topology names: **Substrate — Platform · MCP · Hardware · Data · Security** (5); **External — Design · Sales · Legal (Serbia) · Marketing** (4); **Internal — Operations · Finance/admin** (2) = 11 teams | SYSTEM.md §5 ratified 11-team topology: **Substrate — MCP · Platform · Data · Users · Design** (5); **External — Mobile/App · Onboarding & Ed · Marketing · Sales** (4); **Internal — HR · Legal** (2 with Legal split Serbia/US) | ❌ **direct contradiction** — piece invents "Hardware team" and "Security team" that don't exist; puts Design as external instead of substrate; puts Legal as external instead of internal |
| "Twenty operators. Eleven teams. Three continents." | SYSTEM.md §2 says ~20 named + Serbia Legal 3 TBD + US Legal staffing TBD | ✅ close enough; formatting acceptable |
| "Four products. One substrate. Twelve SKUs." | SYSTEM.md §4 confirms 4 products × 3 tiers = 12 SKUs | ✅ current |
| "In production today. K-12 districts, four U.S. states." | Matches | ✅ |
| Corporate signature | Uses Sept-19 form | ✅ |

**Refresh required — specific change:** slide 8 team-topology table needs to swap Design (substrate not external), reclassify Legal (internal not external), remove "Hardware team" (doesn't exist as a separate team), remove "Security team" (doesn't exist as a separate team). Substrate team names should be MCP · Platform · Data · Users · Design.

---

## Piece 4 · Nebbos by the numbers (2026-09-10, `by-the-numbers`)

**Status verdict:** Currently `refresh` in registry, MULTIPLE drift items.

| Claim in piece | Current data | Verdict |
|---|---|---|
| "2.11M lines" | `platform-metrics.json` shipped.lines_of_code_millions = 2.11 | ✅ matches |
| "39,278 tests" | matches metrics | ✅ |
| "328 architecture specs" | matches metrics governed.architecture_specs_ratified | ✅ |
| "499 nodes · 2288 edges" | matches metrics | ✅ (as of 2026-09-10) |
| "59 hooks" | metrics say 131 as of 2026-09-12 (+72 in 2 days per provenance) | ❌ **stale** — real number more than doubled |
| "20 repositories" | metrics say 31 · SYSTEM.md §9 lists 37 dirs · same-day live count says 26 | ❌ **stale + underspecified** — actual repo count is a moving target that needs one canonical number for the piece |
| "500 parallel branches" | metrics say 2688 as of 2026-09-12 (5.4× multiplier reflecting active parallel work) | ❌ **very stale** — real number is ~5× larger |
| "89 session reports" | metrics say 141 · live count 2026-09-12 | ❌ stale |
| "500 doctrine memories" | metrics say 523 · MEMORY.md corpus grows daily | ❌ stale |
| Colophon "TR3I D.O.O." | Superseded 2026-09-16 → Nebbos D.O.O., 2026-09-19 → Nebbos Technologies D.O.O. | ❌ **stale brand** |
| Language "self-observing enterprise substrate" | `substrate` is retained-internal register, OK in this technical piece | ⚠️ acceptable for its audience |

**Refresh required:** regenerate every number from `platform-metrics.json` (which is the canonical numbers file, dated 2026-09-18, with per-field provenance). Fix TR3I → Nebbos Technologies D.O.O. Fix the corpus counts (memories, reports, hooks, worktrees) — all have material drift.

---

## Piece 5 · The Nebbos Atlas (2026-08-19, `nebbos-atlas-2026-08`)

**Status verdict:** Was `unverified`, now verified as **stale** on multiple substantive claims.

| Claim in piece | Current data | Verdict |
|---|---|---|
| "258 ratified ADRs" | Current metrics: 328 ratified + 349 drafts active | ❌ +70 in 4 weeks — stale |
| "1,535 CRN nodes / 11,756 edges" | This is a DIFFERENT graph (CRN registry, not the graphify governance-graph in SYSTEM.md §7). CRN registry state as of today not independently verified this session. | ⚠️ **cannot verify without a CRN registry snapshot** — flag for follow-up read |
| "728 endpoints across 9 service repos" | platform-metrics.json shipped.http_endpoints = 1,652 (2.3× more) | ❌ stale |
| "326 tables with RLS FORCE" | platform-metrics.json shipped.database_tables = 288 (piece is HIGHER than current — audit which is authoritative) | ❌ inconsistent |
| "165 Next.js routes" | Not directly in platform-metrics.json; `pnpm build` in this session emits 40+ static routes plus dynamic — count needs a live measurement | ⚠️ needs live verification |
| Repo name "**nebos-vyer**" | Repo was renamed to **nebos-backend** (SYSTEM.md §9); "vyer" is Business B agency name | ❌ **stale repo name** — misleads readers |
| "Q1..Q5 cognitive stack" doctrine (Signal · Prediction · Explanation · Action · Knowledge) | Not in SYSTEM.md §7 doctrine layers (a-e). Q1..Q5 is a separate historical framing from July-2026 era. | ❌ **superseded doctrine framing** — piece teaches a taxonomy retired from the current doctrine |
| Uses `agent`, `tenant`, `multi-tenant` freely | Forbidden on customer surfaces per `VOCABULARY_NEVER` | ❌ vocabulary violation if published on nebbos.ai; OK for internal register |

**Verdict:** This piece is a highly technical system-topology artifact from before the 2026-09 taxonomy reset. **Recommend RECLASSIFY** — this is an internal engineering reference, not a public marketing piece. Move from `surface: "public"` to `surface: "internal"` (target `app.nebbos.ai/refs/`) and mark register as `legacy-mono-serif` (its actual visual system). Content still valuable as historical topology snapshot, but no longer current-state doctrine.

---

## Piece 6 · AI Economy 2026 · FSR-26-08 Rev 4 (2026-08-19, `ai-economy-2026`)

**Status verdict:** Was `unverified` — verified as a **fundamentally different piece type than the registry assumed**.

- **Not a Nebbos marketing piece.** Signed "Frontier Strategic Research" — a 102-page investment thesis about the broader AI industry (macro-market analysis of LLMs, hyperscalers, integrated platforms, agentic payments, etc.)
- **No Nebbos-specific claims to verify** — the piece is a research report authored by Nebbos as a thought-leadership artifact
- **Content substrate:** LLM price collapse (−99.7%), hyperscaler capex ($725B), circular AI financing (BIS top-3 risk), Musk cluster, Google DeepMind multi-modal dominance, etc. These are macro-market claims that would need to be re-verified against 2026-09 news; they were valid as of the piece's 2026-08-19 authoring
- **Two published copies exist** (`B97n2aC9` + `LLPqJBPWB…`) — dupe pair; keep newer, mark older duplicate

**Verdict:** RECLASSIFY as a distinct category. This is neither "client-facing marketing" nor "internal audit" — it's **thought leadership / research report**. Needs a new registry surface value like `thought-leadership` or a `category` field. Also **needs a founder call:** should we publish this on nebbos.ai/p/ (public research artifact) or keep it as an internal research asset? The document positions Nebbos as an AI-industry research shop; that changes brand posture.

---

## Piece 7 · Nebbos — Product, Pricing & Cost Reference (2026-07-22, `product-pricing-cost`)

**Status verdict:** Was `refresh` in registry — verified: **substantial substrate drift**.

**Claims from the piece that need cross-check:**

| Claim in piece | Current data | Verdict |
|---|---|---|
| ADR-255 per-Action pricing "T1 €0.06 · T2 €0.40 · T3 €3.00" | Not directly in platform-metrics.json; ADR corpus has moved (ADR-289, ADR-332 subsequent). New MEMORY.md entry `three-tier-published-pricing-2026-09-18` says pricing is now published as Starter+Team+Enterprise cards | ❌ **superseded** — three-tier published pricing (Sept-18) supersedes the per-action € pricing framing |
| ADR-332 "Canonical Nebbos Pricing" (2026-07-15) | Was current in July; subsequent doctrine (three-tier published, Sept-18) has moved on — needs cross-check | ⚠️ verify |
| Sept 1 billing go-live deadline | This date has passed; billing state has moved | ❌ time-expired claim |
| Positioning "AI-based cloud-infra OS" (founder 2026-07-15) | SYSTEM.md §1 says current north star is "RUN LAYER" architecturally + "Platform + Tools + MCP + USB security" customer-facing (2026-09-14). Cloud-infra OS was a July framing. | ❌ **superseded positioning** |
| Nebbos-token concept "1 token ≈ $0.05" | New Sept-18 memory says three-tier published pricing with concrete numbers on non-enterprise; token concept was a July framing | ❌ needs verification |
| 6-department taxonomy (compliance · engineering · finance · legal · product · sales) | SYSTEM.md §5 has moved to 11-team topology across substrate/external/internal categories | ❌ superseded taxonomy |
| "Nebos → Idvor → Nebbos" naming timeline | Correct historical record | ✅ archival value |
| ADR-113 "Nebos Constitution" | Superseded by Article XIV (ratified 2026-08-21) per SYSTEM.md and Constitutional doctrine | ⚠️ need to verify supersession |
| BYOK cost analysis, cache-mirage discussion, $52.8k/mo heavy user finding | These are engineering findings from a specific audit — historical value | ✅ archival |

**Verdict:** RECLASSIFY as **internal reference, superseded**. Content has substantial archival value (documents pricing lineage and cost audits) but every doctrine claim it makes has been superseded. Should carry a superseded banner pointing at the current pricing doctrine surface (whichever page on nebbos.ai/pricing publishes the three-tier numbers). Move to `app.nebbos.ai/refs/` behind auth.

---

## Piece 8 · Nebos.ai Recentering Audit (2026-07-21, `recentering-audit-2026-07`)

**Status verdict:** Was `unverified` — verified: **time-bounded audit, entirely stale**.

| Claim | Current data | Verdict |
|---|---|---|
| "290 ADRs audited (155 built · 73 partial · 44 not built)" | Current metrics: 328 ratified + 349 drafts. Two months of doctrine evolution since. | ❌ stale |
| 69 tracker task verifications, 74 sessions+PRs swept | Time-bounded snapshot; all state has moved | ❌ stale |
| Names "Nebos.ai" not "Nebbos.ai" | Rename to Nebbos happened 2026-06-20 per Product-Pricing ref. Piece uses "Nebos.ai" in title. | ❌ stale brand (pre-2026-06 form) |
| Phase 1 / Phase 2 execution plan | Nothing is following this plan today; the September team topology reset moved planning to a new frame | ❌ superseded plan |
| Specific findings (ADR-138 Nebos Runner unbuilt, WORKOS env-map issues, break-glass auth) | These were 2026-07-21 findings; may or may not have been resolved by now. Not verified this session. | ⚠️ each finding needs individual cross-check |

**Verdict:** RECLASSIFY as **historical audit artifact**. Substantial value as a July-2026 snapshot showing the state of the substrate at that moment; zero value as current guidance. Superseded-banner it and archive.

---

## Piece 9 · Nebos FE Audit Program (2026-08-17, `fe-audit-program`)

**Status verdict:** Was `unverified` — verified: **internal engineering program charter**, partially still current.

| Claim | Current data | Verdict |
|---|---|---|
| 8 cross-primitive audits (Projects · Tasks · Money · Members · Tenants · Notifications · Files · Time) | Program-level structure — status of each primitive not verified this session | ⚠️ needs individual cross-check |
| Path A (primitives) · Path B (surfaces) · Path C (quick scan) sequencing | Still a viable engineering program shape | ⚠️ unclear if actively followed |
| Signed "Nebos" (single 'b') | Rename 2026-06-20 was to Nebbos (double 'b'); piece uses single 'b' throughout | ❌ **brand drift** |
| Uses "tenant" freely | Internal engineering register, OK — piece is not customer-facing | ✅ correct for its audience |
| Reference to specific PR numbers (#1740, #1706 etc.) | These PR numbers likely resolved by now (5 weeks ago) | ⚠️ time-bounded |

**Verdict:** RECLASSIFY as `surface: "internal"`, register `legacy-monolithic`. Fix "Nebos" → "Nebbos" brand throughout. Content is an engineering-program charter for the platform team, appropriate for `app.nebbos.ai/refs/` behind auth. Individual primitive states need verification against current code.

---

## Cross-cutting drift patterns

Looking across all 21 verified pieces, three drift patterns dominate:

### 1. Numbers-that-move-daily are frozen per piece

Every "how big is Nebbos" piece re-authors its own snapshot. `platform-metrics.json` was authored *after* several of these pieces and is the correct fix: it carries provenance per field so pieces can cite from it. **Every piece with a numbers-self-portrait should be refactored to inject from platform-metrics.json at build time, not hardcode.** Not done today; needs a build-time transform.

### 2. Doctrine framings evolve faster than pieces

Piece 5 (Atlas) teaches "Q1..Q5 cognitive stack." Piece 7 (Product/Pricing) teaches "cloud-infra OS positioning." Piece 3 (Investor deck) invents team names that don't exist. All three are what the founder called "a little of this, a little of that" — same substrate but each piece walks its own framing. **The canonical-claims.ts substrate is meant to prevent this going forward; the retrospective fix is per-piece refresh against `PRODUCT_SURFACES`, `DATA_TIERS`, `GOVERNANCE_PILLARS`, `PRODUCTION_CLAIM`, `CORPORATE_STRUCTURE`.**

### 3. Brand transitions bleed through

The corporate name has gone through TR3I → Nebos → Idvor (rejected) → Nebbos → Nebbos Technologies. Every piece older than ~4 weeks carries a stale brand marker somewhere. The `check-pieces.sh` lint I shipped catches "Nebbos D.O.O." without "Technologies" and every "TR3I D.O.O." variant — but only for HTML files in `public/pieces/`. Everywhere else needs its own sweep or a matching lint.

## Concrete better-data opportunities

Where a piece could gain from better data than it currently has:

1. **Nebbos by the numbers:** every number should be regenerated from platform-metrics.json — some are 5× off (parallel branches), some are 2× off (hooks), some are stale by definition (session reports, memories grow daily).
2. **Institutional deck:** could carry the compression-piece "138K decisions · 44¢ each · $61,504/month" as a new slide — this is a *massive* proof point that isn't in the current 10 slides.
3. **Investor deck:** the team-topology table needs the SYSTEM.md §5 canonical topology as its data source, not a re-invented one.
4. **Compression piece:** its 138K/44¢/$61.5K numbers should propagate to `platform-metrics.json` with provenance so they become reusable across pieces.
5. **Every legacy piece:** should carry a superseded banner pointing at its current-doctrine replacement. Route already renders one via `SupersededBanner` when `status: 'superseded'` + `supersededBy: '<slug>'` are set.

## What still needs a substance read (29 pieces)

Honest list — these are still classified by title only in `registry.ts`, marked `unverified`:

- Nebbos positioning (2026-08-21) — read the head earlier, teaches Cradle-Shell-Pearl; needs full read + supersede
- 14 Aug-19 Nebbos.ai marketing iterations — sample one more, batch-classify as superseded/duplicate
- 3 Study Smart tenant pieces (× Nebbos, Build Plan, District Pricing)
- Nebbos Billing System Reference (2026-07-28) — read the head earlier, substantial substrate ref
- Ground Truth Email/HR/Notifications (2026-07-30) — read the head earlier, time-bounded snapshot
- Corporate Asset Atlas (2026-09-18) — read earlier, currently `current` but worth a substantive audit for numbers
- Access-Control Coherence Audit (2026-09-04) — read earlier, has open BLOCKER references worth verifying
- Nebbos UX Audit (2026-08-28) — read earlier, 127 findings need current-state re-check
- ai-helpdesk audit (2026-09-10) — read earlier, targeted audit of one Vyer service; likely still valid
- Usage Substrate Rows (2026-09-07) — read earlier, UX mockup
- Nebbos · Home (2026-09-07) — read earlier
- Nebos // $5M product surface (2026-08-10) — read the head earlier
- Study Smart · Data Value Assessment (× 2) — read the head earlier
- The Isolation Question (2026-07-22) — inference-isolation memo
- TR3I People Reconciliation (2026-08-26) — HR reconciliation
- Savings Meter (2026-08-26) — unknown content
- nebos-documents rollout (2026-08-21) — rollout plan
- Connector Vetting Record — Google Gmail + Calendar (2026-07-29) — security vetting

**The right way to close this list:** one turn per 3-4 pieces at a time, driving each from `unverified` → concrete status with per-claim drift notes appended to this file. Not a single-turn task.

---

## Next surgical fixes (ordered by leverage)

1. **Regenerate `Nebbos by the numbers` from `platform-metrics.json` (piece 4).** Every number that's 2×–5× off gets corrected. TR3I → Nebbos Technologies. One HTML rewrite; propagates verified current-state numbers to the highest-visibility client-facing piece.
2. **Fix Investor deck team topology (piece 3, slide 8).** Replace invented Substrate/Hardware/Security teams with the ratified MCP/Platform/Data/Users/Design + Legal-as-internal shape.
3. **Publish `platform-metrics.json` fields as build-time transforms for pieces.** So future pieces citing "2.1M lines" don't hardcode a stale number.
4. **Batch-supersede the pre-2026-09-14 pieces** (Atlas, Recentering Audit, Product-Pricing Reference, FE Audit Program, Aug-19 Nebbos.ai iterations). All get `status: 'superseded'` and a `supersededBy` pointer; the `SupersededBanner` renders automatically. Content is preserved; readers are pointed at current.
5. **Read + audit the remaining 29 pieces** in the follow-up turns — one batch per turn.
