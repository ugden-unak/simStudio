FROM oven/bun:alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json bun.lock ./
RUN mkdir -p apps
COPY apps/sim/package.json ./apps/sim/package.json
RUN bun install --omit dev --ignore-scripts
COPY apps/sim ./apps/sim
ENV NODE_ENV=production PORT=3002 SOCKET_PORT=3002 HOSTNAME=0.0.0.0
EXPOSE 3002
CMD ["bun","apps/sim/socket-server/index.ts"]
