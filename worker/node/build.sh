#!/usr/bin/env bash
# Empaqueta src/index.ts (+ knowledge.*.md como texto) en dist/worker.mjs para el adaptador Node.
set -euo pipefail
cd "$(dirname "$0")/.."
ESBUILD=../node_modules/.bin/esbuild
[ -x "$ESBUILD" ] || ESBUILD=node_modules/.bin/esbuild
"$ESBUILD" src/index.ts --bundle --format=esm --platform=node --target=node22 --loader:.md=text --outfile=dist/worker.mjs --log-level=warning
echo "✓ dist/worker.mjs ($(du -h dist/worker.mjs | cut -f1))"
