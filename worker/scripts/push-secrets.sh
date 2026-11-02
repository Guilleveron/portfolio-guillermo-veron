#!/usr/bin/env bash
# Sube a Cloudflare, como secretos del Worker, todas las variables de .dev.vars.
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f .dev.vars ] || { echo "Falta .dev.vars"; exit 1; }
while IFS='=' read -r nombre valor; do
  [[ -z "$nombre" || "$nombre" == \#* ]] && continue
  printf '%s' "$valor" | npx wrangler secret put "$nombre"
done < .dev.vars
