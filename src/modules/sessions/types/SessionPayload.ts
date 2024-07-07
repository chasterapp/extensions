import type { JWTPayload } from 'jose'

export type SessionPayload = JWTPayload & {
  sessionIds?: string[]
}
