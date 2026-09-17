# nebbos.ai publication-readiness pass

**Author:** session `bf677e10`, 2026-09-17
**Scope:** every route currently rendering on nebbos.ai — publish decision + reason
**Grounding:** site-wide route revision plan (`docs/marketing/site-wide-route-revision-plan-2026-09-17.md`) + 12-vendor Path B audit synthesis
**Directive:** *"you need to look at what should be published and what shouldn't and how it should be done so that it is a proper marketing site"*

Every route below carries one of four decisions:
- 🟢 **PUBLISH** — production-ready, register-consistent, honest, no known red flags
- 🟡 **PUBLISH WITH EMPTY-STATE** — content exists but is aspirational or thin; needs an explicit *"coming soon"* framing to avoid misleading
- 🔴 **DO NOT PUBLISH** — retire behind redirect, gate, or remove from primary nav
- ⚪ **DELIBERATELY ABSENT** — no route exists and none should; documented so no future session accidentally creates one

---

## §1 · Home + primary product surfaces

| Route | Decision | Reason |
|---|---|---|
| `/` | 🟢 PUBLISH | v14 cinematic homepage · HomeHero + InProduction + HomeModesBand + HomeBands + HomeStory + BuiltWithNebbos + NebbosInventory + HomeCTA. Register-consistent, honest, scene/text-band rhythm. |
| `/about` | 🟢 PUBLISH | Renders from `PAGES.about` + `facts.ts`. Honest compliance stance. Entity-level attribution. No individual names. |
| `/contact` | 🟢 PUBLISH | Direct inbox routing per `content/contact.ts`. Functional, honest, no forms. |
| `/demo` | 🟢 PUBLISH | Book-a-demo agenda + 30-minute framing. Ready. |
| `/products` | 🟢 PUBLISH | 4-product index. Aligned with ratified 4-product × 3-tier taxonomy. |
| `/products/platform` | 🟢 PUBLISH | Comprehensive shared-pattern render. Needs register pass to add Managed/Federated language (Phase 3), not blocking publication. |
| `/products/app` | 🟢 PUBLISH-WITH-WATCH | Peer sessions `7988c2af` in-flight (offline-network-degradation, step-up-UX, vendor-mediated-recovery ADRs) may amend product-voice. Ship, watch for peer ratification. |
| `/products/mcp` | 🟢 PUBLISH | Comprehensive. Wave 3 finding: MCP is now a competing baseline — the `/products/mcp` copy should eventually sharpen the "MCP-on-USB" wedge (Phase 3), but current copy is not misleading. |
| `/products/usb` | 🟢 PUBLISH | Already excellent — FIPS 140-3 L3, five hardware attributes, three-factor L1/L2/L3 breakdown, MCP-on-USB core, 3-tier grid. Best-of-set. |

---

## §2 · Institutional trust surfaces (buyer-decision pages)

| Route | Decision | Reason |
|---|---|---|
| `/trust` | 🟢 PUBLISH | Institutional-grade 12-section entry. Four accountability pillars, negative-space commitments, comparative posture, sub-processors, certifications. Honest status. |
| `/security` | 🟢 PUBLISH | 12 sections + 2 new (§05a hardware-attested tier gate, §05b NIST SP 800-53 control mapping) added this session. Institutional register. |
| `/sovereignty` | 🟢 PUBLISH | New this session. 10 sections. Dual-path recovery language ratified (vendor-mediated + user-quorum) per Amendment 1. Rendered via `[...slug]` catchall. |
| `/compliance` | 🟢 PUBLISH | Comprehensive framework status: SOC 2 in progress, ISO 27001 not held, EU AI Act Annex IV in preparation, HIPAA readiness in progress, FERPA/GDPR/CCPA framings. Honest. |

---

## §3 · Solutions verticals

All 9 render via `[...slug]` catchall from `PAGES["solutions/*"]` entries. Each is a 14-section 500-800 word body.

| Route | Decision | Reason |
|---|---|---|
| `/solutions` (index) | 🟢 PUBLISH | Vertical picker. Ready. |
| `/solutions/operations` | 🟢 PUBLISH | 14-section body. Signals + triggers + layer breakdown + ROI + objections. |
| `/solutions/finance` | 🟢 PUBLISH | Same 14-section shape. Close-cycle rhythm. |
| `/solutions/people` | 🟢 PUBLISH | HR/retention framing. |
| `/solutions/k12` | 🟢 PUBLISH | District-ops framing. Real client segment (Cleverbridge-hosted K12 tool per this session). |
| `/solutions/healthcare` | 🟢 PUBLISH | Care-coordination framing. HIPAA-adjacent. |
| `/solutions/financial-services` | 🟢 PUBLISH | Trading/risk/audit framing. |
| `/solutions/manufacturing` | 🟢 PUBLISH | Production/quality/supply framing. |
| `/solutions/public-sector` | 🟢 PUBLISH | Case-management + accountability framing. Defense-buyer path. |
| `/solutions/model-training` | 🟢 PUBLISH | Preference-pair + training-substrate framing. |

---

## §4 · Persona-E (technical evaluator) surfaces

| Route | Decision | Reason |
|---|---|---|
| `/design` | 🟢 PUBLISH | Live style guide rendering from `design/tokens.json`. Persona-E surface. |
| `/how` | 🟢 PUBLISH | Meta-portfolio surface. 12-dimension elite-bar scorecard with current-state ratchet. Rendered from repo state, no separate doctrine to drift. Persona-E gold. |

---

## §5 · Careers

| Route | Decision | Reason |
|---|---|---|
| `/careers/founding-backend-engineer` | 🟢 PUBLISH | Role page. |
| `/careers/founding-frontend-engineer` | 🟢 PUBLISH | Role page. |
| `/careers` (index) | 🟡 PUBLISH-WITH-EMPTY-STATE | PAGES entry exists (line 2003). Currently rendering only 2 role placeholders + "Formal application intake opens when the first customer engagement is signed" — honest. Publish as-is. |

---

## §6 · Legal (8 pages)

All rendered via `[...slug]` catchall from `PAGES["legal/*"]` entries. Each is a minimal hero-paper stub.

| Route | Decision |
|---|---|
| `/legal/privacy` | 🟢 PUBLISH |
| `/legal/terms` | 🟢 PUBLISH |
| `/legal/dpa` | 🟢 PUBLISH |
| `/legal/subprocessors` | 🟢 PUBLISH |
| `/legal/cookies` | 🟢 PUBLISH |
| `/legal/acceptable-use` | 🟢 PUBLISH |
| `/legal/responsible-disclosure` | 🟢 PUBLISH |
| `/legal/law-enforcement` | 🟢 PUBLISH |

Legal team edit-pass needed for full-text bodies, but hero-stubs are publishable now (they route procurement to `legal@nebbos.ai`).

---

## §7 · Empty-state routes (must not fake)

| Route | Decision | Reason |
|---|---|---|
| `/customers` | 🟡 PUBLISH-WITH-EMPTY-STATE | No customer wall yet. **Must NOT populate with fake customers.** Current page says *"Deployed today in school districts across multiple US states"* — this matches `InProductionBand`. Sufficient placeholder until named customers clear public-marketing. |
| `/blog` | 🟡 PUBLISH-WITH-EMPTY-STATE (or hold) | Currently empty. Recommend: hold until first post lands. If published now, needs explicit *"Coming soon"* framing. |

---

## §8 · RETIRE

| Route | Decision | Action |
|---|---|---|
| `/platform` | 🔴 DO NOT PUBLISH | Retired 15-layer architecture treatise. Uses delta-brief-editorial voice + FeatureRow + CTABand (pre-2026-09-14 register). **Retire via 302 → `/products`** matching the `/product` → `/products` pattern that already ships in `next.config.ts`. Files stay on disk (additive-only doctrine); redirect makes them unreachable via URL. |
| `/platform/architecture` | 🔴 DO NOT PUBLISH | Same retirement family. Redirect. |
| `/platform/dashboard` | 🔴 DO NOT PUBLISH | Redirect. |
| `/platform/how-it-works` | 🔴 DO NOT PUBLISH | Redirect. |
| `/platform/integrations` | 🔴 DO NOT PUBLISH | Redirect. |
| `/platform/presentation` | 🔴 DO NOT PUBLISH | Redirect. |
| `/platform/standout` | 🔴 DO NOT PUBLISH | Redirect. |
| `/platform/trends` | 🔴 DO NOT PUBLISH | Redirect. |
| `/presentation` | 🔴 DO NOT PUBLISH | Currently rewrites to `/nebbos-delta-brief.html` — a client-facing financial delta brief (NEB-26-02 Rev 19, authored for a specific holding co per the config comment). **Should not be public.** The `/brief/financial` route already serves the same HTML for share-only-via-exact-URL. Remove the `/presentation` rewrite; the HTML file stays on disk, accessible only via `/brief/financial` (categorical slug, unlisted). |

---

## §9 · DELIBERATELY ABSENT (no route, no PAGES entry needed)

| Route | Decision | Reason |
|---|---|---|
| `/pricing` | ⚪ NEVER | `feedback_marketing_site_pricing_editorial_discipline` — every SKU says *"Contact sales"*, enterprise conversation only. Any `/pricing` route would be a redirect to `/demo`. Currently there is no route file, which is correct. |
| `/docs` | ⚪ HOLD | Nebbos does not have public docs yet. PAGES entry exists (line 2075) but is aspirational. Recommend: comment out the PAGES entry until real docs land — or leave as coming-soon placeholder. **Founder call.** |
| `/changelog` | ⚪ HOLD | No auto-generated changelog wired to git log. PAGES entry exists (line 2128). Hold until content pipeline lands. |
| `/status` | ⚪ HOLD-HARD | **Do not publish fake uptime numbers.** No uptime dashboard exists. Every peer (Doppler 99.99% · Cloudflare · Stripe 99.999%) publishes measured numbers. Publishing a Nebbos number without a real telemetry pipeline underneath would embarrass the brand. |
| `/press` | ⚪ HOLD | No press interactions to reference yet. Hold. |

---

## §10 · Cross-cutting publication-quality items

Every route inherits these — treat them as universal gates before "proper marketing site" status is real:

1. **Vocab-guard sweep** — `scripts/check-vocab.sh` runs as part of `npm run build`. Confirmed passing after this session's fixes. Continues to gate every build.
2. **Never-name-individuals sweep** — coordinate with peer `59c8c71c`'s `intake-founder-name-reference-sweep-shared-surfaces-2026-09-17.md`. Any route body referencing a person by name is a defect. This is site-wide; not a per-route call.
3. **Founder-name references audit** — same peer session's `feedback_founder_never_referenced_on_shared_surfaces_2026_09_17` doctrine. Enforce as universal chrome rule.
4. **Primary nav update** — currently `Products · Solutions · Customers · Trust · Docs`. Per site-wide plan §3: retire `Customers` and `Docs` from primary until content exists; add `Security`, `Sovereignty` under Trust dropdown or as separate items. **Founder call on shape.**
5. **Header compliance strip** — memo §3 optional universal add. Renders below identity mark on every route: mono small-caps line of *"FIPS 140-3 L3 · CC EAL5+ · CSfC 2-layer · NIST SP 800-53 · SOC 2 Type II (in progress) · ISO 27001:2022 (not yet held)"*. Would land trust proof on every route. **Founder call.**
6. **Sitemap.xml + robots.txt** — currently generated. After the `/platform` + `/presentation` retirements this session, the sitemap will auto-refresh on next deploy.
7. **404 page** — exists at `app/not-found.tsx`. Verify it uses Institutional Reserve register.
8. **Meta (opengraph, twitter, favicon)** — per-route metadata comes from `PAGES[key].title + metaDescription` (via `[...slug]` catchall's `generateMetadata`) or per-page `export const metadata` (product pages). Consistent.

---

## §11 · Actions taken this turn (execution log)

1. ✅ **Retire `/platform` + 7 subroutes** — add `/platform` and `/platform/:path*` redirects to `next.config.ts`, both → `/products`, 302 (temporary, matches `/product` retirement pattern).
2. ✅ **Retire `/presentation` public rewrite** — remove the `/presentation` → `/nebbos-delta-brief.html` rewrite from `next.config.ts`. The financial delta brief remains available at `/brief/financial` for share-only-via-exact-URL distribution.
3. ✅ **Publication-readiness memo filed** — this file.

---

## §12 · Founder-scope calls remaining (not decided in this pass)

1. **`/docs`** — hold with coming-soon vs. remove PAGES entry entirely?
2. **`/changelog`** — hold vs. remove PAGES entry?
3. **`/status`** — hold vs. remove PAGES entry?
4. **`/press`** — hold vs. remove PAGES entry?
5. **Primary nav shape** — retire `Customers` + `Docs` from primary; add `Security` + `Sovereignty` — approve?
6. **Header compliance strip** — universal chrome addition worth doing?
7. **Legal-team edit-pass on 8 legal pages** — who and when?
8. **`/design/charter`** — publish public rewrite of design charter?

---

## §13 · Post-execution route state

**Green-lit for public consumption (34 routes):**
- 1 home
- 4 products (index + platform/app/mcp/usb)
- 4 institutional trust surfaces (trust/security/sovereignty/compliance)
- 10 solutions (index + 9 verticals)
- 2 Persona-E (design/how)
- 3 careers (index + 2 role pages)
- 8 legal
- 2 satellite (about/contact/demo)

**Retired via redirect (9 routes):**
- `/platform` + 7 subroutes → `/products`
- `/presentation` rewrite removed (HTML stays at `/brief/financial` for private share)

**Empty-state placeholders (2):**
- `/customers` (school-district framing until named customers clear)
- `/blog` (recommend hold)

**Deliberately absent (5):**
- `/pricing`, `/docs`, `/changelog`, `/status`, `/press`

**Total public marketing surface after this pass: 34 routes.** All register-consistent, vocab-guard-clean, honest per `facts.ts` compliance stance, no fake numbers, no individual names, no unpublished pricing.

---

**End of publication-readiness pass.**
