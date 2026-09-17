# /sovereignty — page draft

**Author:** session `bf677e10`, 2026-09-17
**Status:** DRAFT — founder edit pass before ship
**Register:** Company voice · Delta editorial · entity-level · sparse copy · one motion anchor max
**Route target:** `app/sovereignty/page.tsx` (new) + `content/pages.ts` PAGES entry `sovereignty`
**Sourced from:** `reference_nebbos_technologies_three_pillar_positioning_2026_09_14.md` (Pillar 3 · Sovereignty) + `reference_usb_tier_marketing_hooks_2026_09_17.md` §§20-52 + peer ADR `2026-09-17_ADR-PROV-nebbos-per-user-usb-data-treatment-model.md` §3 tier model

---

## Section 1 · Hero

**Eyebrow (mono small caps):** SOVEREIGNTY

**H1 (serif, 40-48 px):** *"Your data. Your model. Your keys."*

**Deck (sans, 17 px, 2 lines):** *"Nebbos is designed so no vendor — not even Nebbos — sits between operator intent and enterprise state. When you leave, everything moves with you."*

**Primary CTA:** *Request briefing* → `/demo`
**Secondary CTA:** *See the tier model* → link to `/security#tiers`

---

## Section 2 · Three axes of sovereignty

**H2:** *"Three commitments, one architecture."*

**Body:**
Sovereignty on Nebbos is not a policy statement. It is a set of substrate guarantees, each enforced by the layer that ships it:

**Data sovereignty.** Row-level tenant isolation at Layer 01 · Data. No application-layer bug can leak your data to another tenant — the isolation is enforced at the substrate, not by the application code that sits on top of it. Every request carries an identity checked before the query runs.

**Model sovereignty.** Every human decision your team makes trains YOUR Pearl — not Nebbos's next base model. The tuned Pearl and its memory are your property, exportable in full when you offboard. Portability is a contractual guarantee, not a marketing line.

**Operational sovereignty.** No vendor sits between operator intent and enterprise state. The classifier that decides which tier a request runs at executes on YOUR host, before egress. The MCP binary that mediates every tool call lives on YOUR USB. The audit trail is written to storage YOUR keys unlock.

---

## Section 3 · Five treatment tiers for your data

**H2:** *"You decide how much your model gets to see."*

**Body:**
Nebbos runs every workload against one of five data-treatment tiers. The tier is decided by the classifier at the MCP call boundary — on your host, client-side, before any data crosses the wire.

**Sealed.** Journal-grade artifacts stay on your USB. Decryptable only by you, only when you are physically present with the device. Nebbos never sees ciphertext or plaintext.

**Portable.** Cross-device personal state — same operator, multiple laptops. Server-stored, but wrapped with a key only your USB carries. Our operators see ciphertext only.

**Redacted-to-cloud.** Full-fidelity model performance without leaking PII. Personal identifiers are stripped on your host before egress; the response is re-materialized locally when it comes back.

**Attested-cloud.** Full-fidelity model running inside a hardware-attested enclave. Every response comes with a cryptographic receipt binding the output to the enclave that produced it.

**Air-gapped.** Local open-weights inference. Zero egress. For classified-sensitivity work where even attested-cloud is too much.

**[FOUNDER-EDIT: this page uses the ratified buyer-language names (Sealed / Portable / Redacted-to-cloud / Attested-cloud / Air-gapped) per the USB tier marketing hooks memory. Internal codes A/B/C/D2/E are deliberately absent. D1 plaintext-under-ZDR is deliberately absent per the peer ADR's marketing-exclusion clause.]**

---

## Section 4 · The classifier

**H2:** *"The tier decision runs on your host. Not on our servers."*

**Body:**
Before any query leaves your operator's laptop, the classifier reads the query text, the tenant policy, and the operator's current authority level. It decides which of the five tiers this specific request runs at, redacts any PII that would otherwise egress, and hands the tier decision to the MCP binary that services the call.

The classifier is a binary carried on your USB. Its policy is YAML — you set the defaults, your tenant admin overrides, your operator can force-downgrade a request to a stricter tier, your regulator can inspect the policy under NDA.

The classifier does not run on Nebbos-hosted infrastructure. It cannot be swapped by a Nebbos-side deploy. Its behavior on any request is a fact about what your USB carries — not a policy Nebbos administers.

---

## Section 5 · Recovery custodians

**H2:** *"You elect who has break-glass keys."*

**Body:**
Vendor break-glass exists. The tenant chooses whether to use it.

**Path A — vendor-mediated recovery (default).** If a user loses their USB and needs a fresh device, a Nebbos-side recovery flow re-issues one, with an audit event that lands in the tenant's own audit trail. Fast, standard, works for most enterprises.

**Path B — user-quorum recovery (opt-in).** The tenant elects three-to-five recovery custodians from within its own organization. USB reissue requires a Shamir 3-of-5 quorum of the custodian USBs. Nebbos-side cannot unlock a lost device. The tenant carries the operational cost; the tenant carries the sovereignty guarantee.

Every enterprise decides which posture it operates under. The two paths are not a technical accident — they are a designed choice about who holds the last mile of trust.

**[FOUNDER-EDIT: Amendment 1 to the security posture memory retracted "no vendor break-glass by design" as a public claim (peer session 7988c2af, 2026-09-17). Dual-path recovery is the ratified truth. If any external doc, deck, or contract still asserts "no vendor break-glass by design", flag it for revision.]**

---

## Section 6 · Portability

**H2:** *"When you leave, everything moves with you."*

**Body:**
Portability on Nebbos is contractual, not marketing. On offboarding:

- Your tuned Pearl model — the weights, the preference pairs, the routing policy — exports as a portable format compatible with any inference substrate that speaks the same model spec.
- Your memory — the accumulated context that made the Pearl valuable — exports as a structured, importable graph. Query-compatible with the underlying substrate.
- Your audit trail — every action, every approval, every decision — exports as an append-only hash-chained record, verifiable on any auditor's tooling.
- Your MCP capability policy — the YAML that decided which tier which request ran at — exports as a versioned file.
- Your CRM data, your task history, your document graph, your identity roster — all export in the shape you can re-import into any successor substrate.

Portability tests run continuously against the substrate; the export path is exercised as part of the pipeline, not as an offboarding-day surprise.

---

## Section 7 · One physical USB per user

**H2:** *"Sovereignty enforced by the object on your desk."*

**Body:**
Every operator authorized above L1 carries one Nebbos-issued USB, tied to their identity, sealed at manufacture. When they are at their desk, the USB is in the port. When they leave, the USB comes with them. Elevated capability follows the physical device, not the network location.

This is what makes model, data, and operational sovereignty mechanically enforceable. The tier a request runs at is not a claim we make about our own trustworthiness. It is a fact about what hardware is on your operator's desk.

---

## Section 8 · Closing CTA

**Register break:** deep-ink section, black paper.

**H2 (serif, 32-40 px):** *"Sovereignty is a substrate, not a policy."*

**Deck:** *"Every enterprise says its data is its own. Nebbos ships the architecture that makes it so."*

**CTA:** *Request briefing* → `/demo`
**Sub-CTA (ghost):** *Read the substrate* → link to featured ADR

---

## Editor's notes for the founder

**Length:** ~900 words body. Sparse copy discipline held.
**Register drift:** Section 5 openly names "vendor break-glass exists" — this is the ratified correction to the retracted "no vendor break-glass by design" claim (Amendment 1, peer session 7988c2af, 2026-09-17). Honesty is the register.
**Cross-reference:** Section 3 five-tier list uses buyer-language names (Sealed / Portable / Redacted-to-cloud / Attested-cloud / Air-gapped). Internal codes A/B/C/D2/E are deliberately absent from public surface, per USB tier marketing hooks memory §"tier framing for the buyer" — buyer-language IS the marketing surface. D1 plaintext-under-ZDR is deliberately absent because peer ADR names it as legacy-only, not marketed.
**Founder-edit slots:**
- [FOUNDER-EDIT] Section 3 · confirm five buyer-language names are the ones to ship publicly
- [FOUNDER-EDIT] Section 5 · confirm dual-path recovery language + audit any legacy docs asserting "no vendor break-glass"

**Composition with claim 4:** the four positioning claims from `reference_nebbos_technologies_three_pillar_positioning_2026_09_14` — pillar 3 (sovereignty) is this page's whole story; pillar 4 (build your own platform · cleanest code standards · law requirements) is the natural follow-up on `/design/charter`.
