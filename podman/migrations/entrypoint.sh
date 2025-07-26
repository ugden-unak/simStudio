#!/bin/sh
set -e
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set" >&2
  exit 1
fi
cd /app/apps/sim
if ! bun run db:migrate; then
  echo "ERROR: Migration failed. Check migrations and environment variables." >&2
  exit 1
fi
