# content/ · Nebbos site copy registry

Wave 3f · founder directive 2026-08-23:
> "we also have to look at all the text across the site and make sure that
> we have it in categories so when we add things we know exactly where we
> need to make changes and update"

Every high-frequency site copy string lives here as a typed constant.
Pages import from these files instead of hard-coding — so a change to
"pricing minimum" (or the price itself, or the tagline, or the contact
email) is ONE file edit that propagates everywhere it's used.

## Categories

| file | owns | example strings |
|---|---|---|
| `brand.ts` | tagline · category · one-liners · voice guardrails | "The company brain your team never had time to build", "Company-brain infrastructure for enterprise" |
| `pricing.ts` | price · minimum · discount · overage currency | "$150", 20-user min, "15% annual prepay", "Nebbos tokens" |
| `contact.ts` | emails · form endpoints · social handles | `hello@nebbos.ai`, `press@nebbos.ai`, `security@nebbos.ai` |
| `facts.ts` | company facts · founding · category · positioning | 2026 founding year, solo-founder-led, EU AI Act positioning |
| `proof-points.ts` | reusable capability statements | "one Pearl per department", "every decision sourced" |

## When you add a new page

Prefer importing from `content/` for anything that MIGHT appear in more
than one place. Rule of thumb:

- **Facts you'd correct across the whole site** → content file
- **Copy unique to this page's narrative arc** → inline in the page

## When you change a fact

Grep `content/` for it first. Change the source; every consumer updates on
the next deploy. No hand-editing individual pages.

## Related memories

- `feedback_marketing_site_pricing_editorial_discipline` — what pricing
  copy belongs on marketing surfaces at all (scoping rule)
- `reference_nebbos_pricing_ratified_2026_08_22` — canonical pricing source
  (numbers in `pricing.ts` must trace back to this)
- `moncalisse-doctrine-v2c-amendment` — signature-mark + italic-accent
  patterns that reference brand-level tokens (not content — those live in
  `design/tokens.json`)
