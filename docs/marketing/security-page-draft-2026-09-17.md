# /security — page draft

**Author:** session `bf677e10`, 2026-09-17
**Status:** DRAFT — founder edit pass before ship
**Register:** Company voice · Delta editorial · entity-level · sparse copy · one motion anchor max
**Route target:** `app/security/page.tsx` (new) + `content/pages.ts` PAGES entry `security`
**Sourced from:** `reference_usb_tier_marketing_hooks_2026_09_17.md` §§48-62 + peer ADR `2026-09-17_ADR-PROV-nebbos-per-user-usb-data-treatment-model.md` §9 + `content/facts.ts` `complianceStance`

---

## Section 1 · Hero

**Eyebrow (mono small caps):** SECURITY

**H1 (serif, 40-48 px):** *"Accountable by architecture."*

**Deck (sans, 17 px, 2 lines):** *"Every consequential action passes through biometric approval, a hardware-attested USB, and an append-only audit trail your regulator will accept. Substrate designed to institutional controls, not layered on as a compliance add-on."*

**Compliance strip (mono small caps, 12 px):**
```
FIPS 140-3 L3 (K350 module) · CC EAL5+ · CSfC 2-layer · NIST SP 800-53 · CMMC L3
MIL-STD-810G · IP68 · TAA · SOC 2 Type II (in progress) · ISO 27001:2022 (not yet held) · EU AI Act Annex IV (in preparation)
```

**Primary CTA:** *Request briefing* → `/demo`
**Secondary CTA:** *Read the substrate ADR* → link to featured ADR (per memo §12 Open 1)

---

## Section 2 · The three-factor tier gate

**H2:** *"Three tiers. Three factors. Nothing consequential without all three."*

**Body (sans, 15-17 px):**
Nebbos runs every consequential action through a tier gate that composes three independent factors, in order of ratcheting authority.

**L1 · Basic.** Biometric — Touch ID, Face ID, Windows Hello, Android BiometricPrompt. Dashboard view, personal reads, low-risk tool calls. What every operator uses to see their own work.

**L2 · Privileged.** Biometric plus a Nebbos-issued USB in the port. Tenant writes, memory registers, knowledge-graph mutations, admin operations within the tenant. Without the USB physically plugged in, elevated capabilities are not "disabled by policy" — they are cryptographically absent.

**L3 · Admin.** Biometric plus USB plus an enclave-signed approval token. Tenant create/destroy, substrate mutation, cross-tenant operations, ADR-cluster ratification. Two-person authorization is enforced in hardware: Admin K350 plus Developer K350 co-signature via WebAuthn ceremony with a 60-second time-to-live.

Every request carries the tier it ran at. Every audit record names the factors that were present. There is no configuration knob to relax a tier below its declared floor.

---

## Section 3 · The USB

**H2:** *"Your USB is the key. Not the data."*

**Body:**
The Nebbos USB is a DataLocker Sentry K350 substrate — an OLED-keypad, hardware-encrypted device that carries the Nebbos MCP binary, the tenant's key material, and the classifier policy that decides what leaves the operator's host. It is a FIPS 140-3 Level 3 validated cryptographic module. It meets IP68 ingress protection, MIL-STD-810G environmental exposure, TAA sourcing compliance.

The FIPS certificate covers the K350 module boundary. Nebbos does not claim FIPS validation for the whole product. Scope-clean claims are the register of institutional security. Every certification on this page is scoped to what it actually covers.

Unplug the USB, and elevated capabilities are not available — to the operator, to Nebbos, to any adversary who reaches the host. Physical revocation. Yank the device, the substrate is gone.

---

## Section 4 · The audit trail

**H2:** *"Append-only. Hash-chained. Non-repudiable."*

**Body:**
Every action a Nebbos operator or a Nebbos-hosted agent takes lands in an append-only audit trail — Layer 15 of the architecture. Each record binds the identity that authorized the action, the tier the request ran at, the timestamp under the tenant's clock, the tools invoked, and the state transitions produced. Records are hash-chained: any tampering rebuilds every hash downstream, and the mismatch surfaces at the next verification pass.

The audit trail is designed to satisfy the AU-2 through AU-12(1) control family under NIST SP 800-53 — eleven controls in the audit family alone. An external auditor reviewing a Nebbos deployment sees the same append-only records their evidence packages would cite. No parallel "evidence-collection" tooling is needed on top.

---

## Section 5 · The control mapping

**H2:** *"What Nebbos maps to."*

**Body:**
The substrate implements a named list of NIST SP 800-53 controls, each traceable to the architecture layer that enforces it:

- **AC-3(2)** — Dual Authorization (the L3 two-person rule)
- **AC-5** — Separation of Duties (the tier-gate role model)
- **IA-11** — Re-authentication (session re-verify at tier boundary)
- **SC-28(1)(2)(3)** — Protection at Rest, Offline, Crypto Keys (the USB encrypted volume)
- **SC-12** — Cryptographic Key Establishment
- **SC-13** — Cryptographic Protection
- **AU-2** through **AU-12(1)** — Audit trail set (eleven controls total)

CSfC-compliant 2-layer composition: HWFDE (the K350 hardware-full-disk-encryption layer) plus SWFDE (a vendor-diverse software-full-disk-encryption inner layer). Vendor-diversity is a hard CSfC requirement; both layers cannot be the same vendor.

CMMC Level 3 mapping composes with NIST SP 800-171 controls for the defense-adjacent buyer surface.

---

## Section 6 · Where Nebbos is on certifications today

**H2:** *"Honest status."*

**Body (sourced from `content/facts.ts` `complianceStance`):**
Substrate controls are implemented against SOC 2 Type II and ISO 27001:2022 targets. SOC 2 Type II certification is in progress. ISO 27001:2022 is not yet held. The EU AI Act Annex IV documentation pack is in preparation ahead of the 2027-08-02 Article 6 and Annex III deadline.

Certification takes time. Substrate does not. Nebbos ships the substrate today. Certifications catch up in the order buyers require them.

**[FOUNDER-EDIT: name specific target dates for SOC 2 Type II attestation report if you want to commit publicly. Currently the deck says "in progress" without a date.]**

---

## Section 7 · What Nebbos does NOT claim

**H2:** *"Scope-clean by design."*

**Body:**
Every certification claim on this page is bounded. Precision is the trust move. The following claims are not made anywhere on this site or in any Nebbos response to procurement, because they are not accurate:

- **NOT** "FIPS 140-3 Level 3 for the whole product." The certificate covers the K350 module boundary only.
- **NOT** "No vendor break-glass by design." Dual-path recovery is the ratified model — a vendor-mediated path (default) plus a user-quorum path (opt-in via Shamir 3-of-5 among tenant-elected custodians). The tenant chooses which posture they operate under.
- **NOT** citations of NIST SP 800-53 control `AC-3(9)` for the two-person mechanism — the correct citation is `AC-3(2)`, per the peer ADR's enumeration.
- **NOT** SOC 2 Type II "held" or ISO 27001:2022 "certified" — status is in progress and not-yet-held, respectively.

If a procurement question needs an answer we cannot back with substrate, the answer is "we do not claim that today" — not a hand-wave.

---

## Section 8 · Closing CTA

**Register break:** deep-ink section, black paper.

**H2 (serif, 32-40 px):** *"Read the substrate."*

**Deck:** *"The full ADR describing the per-user USB data-treatment model — tier architecture, crypto envelope, attestation, control mapping — is public. Thirty minutes for a technical evaluator to reach a diligence-level read."*

**CTA:** *Read the ADR* → featured-ADR link (per memo §12 Open 1)
**Sub-CTA (ghost):** *Book a briefing* → `/demo`

---

## Editor's notes for the founder

**Length:** ~800 words body. Reads in 4-5 minutes. Sparse copy discipline held.
**Register drift risk:** Section 3 approaches marketing-adjacent voice with *"Your USB is the key. Not the data."* — this is a ratified hero-register line from the USB tier marketing hooks memory, cleared for public surface use.
**Missing:** any customer wall — no customer wall exists yet, and putting one on this page is worse than nothing. Section 8 closing carries the trust weight instead.
**Founder-edit slots:**
- [FOUNDER-EDIT] Section 6 · public SOC 2 target date
- [FOUNDER-EDIT] Section 8 · which specific ADR link URL (per memo §12 Open 1, currently defaulting to the per-user-USB ADR published on nebbos.ai)
