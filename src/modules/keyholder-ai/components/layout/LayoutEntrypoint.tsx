import type { ReactNode } from 'react'
import { LayoutContent } from './LayoutContent'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { prefetchConversations } from '../../queries/conversation'

type Props = {
  children: ReactNode
}

export async function LayoutEntrypoint({ children }: Props) {
  const queryClient = await prefetchConversations()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutContent>{children}</LayoutContent>
    </HydrationBoundary>
  )
}
