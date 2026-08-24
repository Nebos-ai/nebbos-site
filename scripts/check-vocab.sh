#!/usr/bin/env bash
# check-vocab.sh — vocabulary CI guard for customer-facing content.
#
# Rule (per feedback_nebbos_do_not_use_agent_use_brain_os_architecture):
#   NEVER: agent, agents, AI agent, bot, chatbot
#   NEVER on marketing site: dollar figures for Nebbos pricing (per
#     feedback_nebbos_no_published_pricing_palantir_model)
#   OK in negative framing: assistant, copilot (as "not an assistant, not a copilot")
#
# Exits non-zero on violation. Wire into pnpm prebuild + CI so vocabulary
# discipline is enforced by code, not memory.
#
# Whitelist: essays that intentionally quote the forbidden words to explain
# why they're wrong. Extend the WHITELIST array below when adding new files
# that legitimately discuss the vocabulary rule itself.

set -euo pipefail

# Paths to lint (customer-facing content + doctrine)
TARGETS=(
  "content/pages.ts"
  "content/brand.ts"
  "content/facts.ts"
  "content/contact.ts"
  "lib/architecture.ts"
  "lib/nav.ts"
  "components/sections/"
  "components/site/"
  "app/"
)

# Files legitimately allowed to quote forbidden words (essays about vocabulary)
WHITELIST=(
  "content/blog/naming-a-pearl-for-a-department.mdx"
  "content/blog/approval-is-the-moat.mdx"
  "content/blog/the-company-brain.mdx"
)

# Blog posts under content/blog/ are always allowed to use forbidden words
# in negative framing (they're essays discussing the rule).
BLOG_DIR="content/blog"

# Forbidden vocabulary — word-boundary grep patterns
FORBIDDEN_PATTERNS=(
  '\bagent\b'
  '\bagents\b'
  '\bAI agent\b'
  '\bAI agents\b'
  '\bchatbot\b'
  '\bchatbots\b'
)

# Forbidden pricing exposure on marketing site
PRICING_PATTERNS=(
  '\$150'
  '\$150/'
  '\$150 per'
  '150 per seat'
  '150/seat'
  '/pricing"'
  'href="/pricing'
)

VIOLATIONS=0

echo "[check-vocab] scanning customer-facing content..."

for pat in "${FORBIDDEN_PATTERNS[@]}"; do
  # Grep across TARGETS, exclude BLOG_DIR (essays), exclude WHITELIST entries.
  HITS=$(grep -REn --include="*.ts" --include="*.tsx" --include="*.mdx" \
    --exclude-dir="node_modules" --exclude-dir=".next" --exclude-dir="$BLOG_DIR" \
    "$pat" "${TARGETS[@]}" 2>/dev/null || true)

  if [ -n "$HITS" ]; then
    # Filter out whitelisted paths + doctrine-documentation lines. Documentation
    # of the rule itself (JSDoc comments naming the forbidden words as forbidden)
    # is legitimate; only ACTUAL usage in customer copy fires the guard.
    FILTERED="$HITS"
    for wl in "${WHITELIST[@]}"; do
      FILTERED=$(echo "$FILTERED" | grep -v "$wl" || true)
    done
    # Skip lines that document the rule (JSDoc / block-comment context)
    FILTERED=$(echo "$FILTERED" | grep -vE ':\s*\* +(Never|NEVER|Use:|Canonical|Vocabulary rule|Rule|canonical vocabulary)|// +NEVER|nebbos-agent-gateway|nebbos-agent-|AI-agent governance' || true)

    if [ -n "$FILTERED" ]; then
      echo ""
      echo "  ✗ FORBIDDEN vocabulary: pattern '$pat' found in:"
      echo "$FILTERED" | sed 's/^/      /'
      VIOLATIONS=$((VIOLATIONS + 1))
    fi
  fi
done

for pat in "${PRICING_PATTERNS[@]}"; do
  HITS=$(grep -REn --include="*.ts" --include="*.tsx" --include="*.mdx" \
    --exclude-dir="node_modules" --exclude-dir=".next" \
    "$pat" "${TARGETS[@]}" 2>/dev/null || true)

  # Allow blended-cost industry stats ($150-300k per lost mid-senior role) —
  # those are turnover-replacement figures, not Nebbos pricing.
  FILTERED=$(echo "$HITS" | grep -v '\$150-300k\|blended fully-loaded\|per lost mid-senior' || true)

  if [ -n "$FILTERED" ]; then
    echo ""
    echo "  ✗ PRICING exposure: pattern '$pat' found in:"
    echo "$FILTERED" | sed 's/^/      /'
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

if [ "$VIOLATIONS" -eq 0 ]; then
  echo "[check-vocab] OK — no vocabulary or pricing violations."
  exit 0
else
  echo ""
  echo "[check-vocab] FAIL — $VIOLATIONS violation(s) above."
  echo "  Vocabulary rule: never use 'agent', 'AI agent', 'chatbot', 'bot' in"
  echo "    customer-facing content. Use 'Pearl', 'Nebbos [Domain]', 'company"
  echo "    brain', 'operating system', 'architecture' instead."
  echo "  Pricing rule: Nebbos does NOT publish pricing. No /pricing route,"
  echo "    no dollar figures for Nebbos pricing in customer copy. Enterprise"
  echo "    conversation only."
  exit 1
fi
