FROM oven/bun:alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json bun.lock turbo.json ./
RUN mkdir -p apps/sim
COPY apps/sim/package.json ./apps/sim/package.json
COPY apps/sim/drizzle.config.ts ./apps/sim/drizzle.config.ts
COPY apps/sim/db ./apps/sim/db
COPY apps/sim/lib/env.ts ./apps/sim/lib/env.ts
RUN bun install --omit dev --ignore-scripts && \
    bun install --omit dev --ignore-scripts drizzle-kit drizzle-orm postgres next-runtime-env zod @t3-oss/env-nextjs
COPY podman/migrations/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh
WORKDIR /app
ENTRYPOINT ["/app/entrypoint.sh"]
