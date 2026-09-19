#!/usr/bin/env bash
# check-pieces.sh — content-consistency guard for pieces in public/pieces/.
#
# Enforces the canonical-claims doctrine (content/canonical-claims.ts):
# every piece must NOT resurrect a superseded frame, must NOT use the
# forbidden vocabulary, must NOT still carry the old corporate brand.
#
# Wire into pnpm prebuild alongside check-vocab.sh once the corpus is
# clean enough to enforce.
#
# Exits non-zero on any violation. Every hit is a defect.

set -euo pipefail

TARGETS="public/pieces"

if [ ! -d "$TARGETS" ]; then
  echo "[check-pieces] no public/pieces/ directory — skipping."
  exit 0
fi

# Superseded frames — never on a piece surface.
# Keep this list in lockstep with SUPERSEDED_FRAMES in content/canonical-claims.ts.
SUPERSEDED=(
  "Cradle · Shell · Pearl"
  "Cradle-Shell-Pearl"
  "company brain"
  "fifteen governance layers"
  "The company that never forgets"
  "TR3I D.O.O"
  "TR3I&nbsp;D.O.O"
)

# Stale entity name — "Nebbos D.O.O." without "Technologies" prefix.
# Special case because the correct new name "Nebbos Technologies D.O.O."
# contains the old name as a substring; a plain grep would false-positive.
# Serbian operating entity was renamed 2026-09-19 per founder directive.

# Forbidden vocabulary — vendor framing + architecture-internal terms.
# Mirrors scripts/check-vocab.sh but applied to piece HTML.
FORBIDDEN=(
  " agent "
  " agents "
  " AI agent"
  "chatbot"
  "multi-tenant"
)

echo "[check-pieces] scanning $TARGETS ..."

hits=0
for pattern in "${SUPERSEDED[@]}"; do
  # -F fixed-string, -l list-file, -R recursive, -n line-number
  if matches="$(grep -RFln "$pattern" "$TARGETS" 2>/dev/null)"; then
    if [ -n "$matches" ]; then
      echo ""
      echo "[check-pieces] SUPERSEDED FRAME · '$pattern' — found in:"
      grep -RFn "$pattern" "$TARGETS" | head -10
      hits=$((hits+1))
    fi
  fi
done

for pattern in "${FORBIDDEN[@]}"; do
  if matches="$(grep -RFln "$pattern" "$TARGETS" 2>/dev/null)"; then
    if [ -n "$matches" ]; then
      echo ""
      echo "[check-pieces] FORBIDDEN VOCAB · '$pattern' — found in:"
      grep -RFn "$pattern" "$TARGETS" | head -10
      hits=$((hits+1))
    fi
  fi
done

# Stale entity name check — "Nebbos D.O.O." NOT preceded by "Technologies ".
# grep for lines containing the old form, exclude lines that contain the new form.
if stale="$(grep -RnE 'Nebbos D\.O\.O\.' "$TARGETS" 2>/dev/null | grep -vE 'Nebbos Technologies D\.O\.O\.' || true)"; then
  if [ -n "$stale" ]; then
    echo ""
    echo "[check-pieces] STALE ENTITY NAME · 'Nebbos D.O.O.' (missing 'Technologies') — found in:"
    echo "$stale" | head -10
    hits=$((hits+1))
  fi
fi

if [ "$hits" -gt 0 ]; then
  echo ""
  echo "[check-pieces] FAIL — $hits distinct pattern(s) hit."
  echo "[check-pieces] Superseded frames must not appear on a piece surface."
  echo "[check-pieces] See content/canonical-claims.ts SUPERSEDED_FRAMES for the full list."
  exit 1
fi

echo "[check-pieces] OK — no superseded frames or forbidden vocab found."
