# Imagen mínima del asistente: el bundle ya viene construido (esbuild) desde la máquina local.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=8787
COPY dist/worker.mjs dist/worker.mjs
COPY node/server.mjs node/server.mjs
USER node
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1:8787/healthz >/dev/null 2>&1 || exit 1
CMD ["node", "node/server.mjs"]
