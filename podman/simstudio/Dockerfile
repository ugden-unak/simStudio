FROM oven/bun:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN bun install -g turbo
COPY package.json bun.lock ./
RUN mkdir -p apps
COPY apps/sim/package.json ./apps/sim/package.json
RUN bun install --omit dev --ignore-scripts

FROM oven/bun:alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun install --omit dev --ignore-scripts
WORKDIR /app/apps/sim
RUN bun install sharp
ENV NEXT_TELEMETRY_DISABLED=1 \
    VERCEL_TELEMETRY_DISABLED=1 \
    DOCKER_BUILD=1
WORKDIR /app
RUN bun run build

FROM oven/bun:alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/sim/public ./apps/sim/public
COPY --from=build /app/apps/sim/.next/standalone ./
COPY --from=build /app/apps/sim/.next/static ./apps/sim/.next/static
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["bun","apps/sim/server.js"]
