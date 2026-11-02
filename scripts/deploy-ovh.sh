#!/usr/bin/env bash
# Genera el sitio para guilleveron.com y lo publica en el servidor OVH (nginx + Traefik de Coolify).
#
# Uso:  scripts/deploy-ovh.sh            (lee .env.deploy si existe)
# Vars: NUXT_PUBLIC_ASSISTANT_URL  URL del Worker del asistente (opcional; sin ella queda el modo básico)
#       DEPLOY_HOST                alias SSH (por defecto ServidorGuilleOVH)
#       DEPLOY_DIR                 carpeta remota (por defecto /home/ubuntu/portfolio-guillermo-veron)
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env.deploy ] && set -a && . ./.env.deploy && set +a
DEPLOY_HOST="${DEPLOY_HOST:-ServidorGuilleOVH}"
DEPLOY_DIR="${DEPLOY_DIR:-/home/ubuntu/portfolio-guillermo-veron}"

ASSISTANT_URL="${NUXT_PUBLIC_ASSISTANT_URL:-https://api.guilleveron.com}"

echo "→ Generando sitio estático para https://guilleveron.com (asistente: $ASSISTANT_URL)"
NUXT_APP_BASE_URL=/ NUXT_PUBLIC_SITE_URL=https://guilleveron.com \
NUXT_PUBLIC_ASSISTANT_URL="$ASSISTANT_URL" \
  node node_modules/.bin/nuxi generate

echo "→ Empaquetando el asistente (base de conocimiento + bundle Node)"
npm run --silent knowledge
worker/node/build.sh

# Variables del asistente: los [vars] de wrangler.toml + los secretos de worker/.dev.vars.
ASSISTANT_ENV="$(mktemp)"
trap 'rm -f "$ASSISTANT_ENV"' EXIT
sed -n '/^\[vars\]/,/^\[/p' worker/wrangler.toml | grep -E '^[A-Z_]+ *= *"' | sed -E 's/^([A-Z_]+) *= *"(.*)"$/\1=\2/' > "$ASSISTANT_ENV"
[ -f worker/.dev.vars ] && grep -E '^[A-Z_]+=' worker/.dev.vars >> "$ASSISTANT_ENV"

echo "→ Subiendo a $DEPLOY_HOST:$DEPLOY_DIR"
ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_DIR/public' '$DEPLOY_DIR/assistant/dist' '$DEPLOY_DIR/assistant/node'"
rsync -az --delete .output/public/ "$DEPLOY_HOST:$DEPLOY_DIR/public/"
rsync -az deploy/docker-compose.yaml deploy/nginx.conf "$DEPLOY_HOST:$DEPLOY_DIR/"
rsync -az worker/dist/worker.mjs "$DEPLOY_HOST:$DEPLOY_DIR/assistant/dist/"
rsync -az worker/node/server.mjs worker/node/Dockerfile "$DEPLOY_HOST:$DEPLOY_DIR/assistant/node/"
rsync -az "$ASSISTANT_ENV" "$DEPLOY_HOST:$DEPLOY_DIR/assistant.env"
ssh "$DEPLOY_HOST" "chmod 600 '$DEPLOY_DIR/assistant.env'"

echo "→ Levantando contenedores"
ssh "$DEPLOY_HOST" "cd '$DEPLOY_DIR' && docker compose up -d --build && docker compose ps"
echo "✓ Listo: https://guilleveron.com  ·  asistente en $ASSISTANT_URL"
