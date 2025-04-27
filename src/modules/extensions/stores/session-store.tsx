'use client'

import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { getSessionAuth } from '../actions/get-session-auth'

export type Session = Awaited<ReturnType<typeof getSessionAuth>> & {
  token: string
}

interface SessionContextType {
  session: Session | null
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

interface SessionProviderProps {
  children: ReactNode
  session: Session | null
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }

  if (!context.session) {
    throw new Error('Session not found')
  }

  return context.session
}
