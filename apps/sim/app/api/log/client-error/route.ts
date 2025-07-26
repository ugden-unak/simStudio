import { type NextRequest, NextResponse } from 'next/server'
import { createLogger } from '@/lib/logs/console-logger'

export const dynamic = 'force-dynamic'

const logger = createLogger('ClientErrorLogger')

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    logger.error('Client reported signup error', data)
    return NextResponse.json({ ok: true })
  } catch (error) {
    logger.error('Failed to log client error', { error })
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
