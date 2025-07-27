import type { Socket } from 'socket.io'
import { createLogger } from '@/lib/logs/console-logger'

const logger = createLogger('SocketAuth')

// Extend Socket interface to include user data
export interface AuthenticatedSocket extends Socket {
  userId?: string
  userName?: string
  userEmail?: string
  activeOrganizationId?: string
}

// Enhanced authentication middleware
export async function authenticateSocket(socket: AuthenticatedSocket, next: any) {
  try {
    logger.info(`Socket ${socket.id} connected without auth`)
    socket.userId = 'local-user'
    socket.userName = 'Local User'
    socket.userEmail = 'local@example.com'
    socket.activeOrganizationId = 'default-org'
    next()
  } catch (error) {
    logger.error(`Socket auth error for ${socket.id}:`, error)
    next()
  }
}
