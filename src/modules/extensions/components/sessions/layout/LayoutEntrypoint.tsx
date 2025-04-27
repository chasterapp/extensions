import { getSessionAuth } from '@/modules/extensions/actions/get-session-auth'
import { SessionProvider } from '@/modules/extensions/stores/session-store'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  token: string
}

export async function LayoutEntrypoint({ children, token }: Props) {
  const data = await getSessionAuth(token)

  return (
    <SessionProvider session={{ ...data, token }}>{children}</SessionProvider>
  )
}
