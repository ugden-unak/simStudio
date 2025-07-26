import { toNextJsHandler } from 'better-auth/next-js'
import { cookies } from 'next/headers'
import { auth } from '@/lib/auth'
import { createLogger } from '@/lib/logs/console-logger'

export const dynamic = 'force-dynamic'

const handler = toNextJsHandler(auth.handler)

const logger = createLogger('AuthAPI')

export const GET = handler.GET

export async function POST(request: Request) {
  const url = new URL(request.url)
  if (url.pathname.endsWith('/sign-in/email')) {
    const payload = await request
      .clone()
      .json()
      .catch(() => null)
  }
  return handler.POST(request)
}