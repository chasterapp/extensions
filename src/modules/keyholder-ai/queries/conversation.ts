import { getQueryClient } from '@/lib/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getConversation, getConversations } from '../actions/conversation'

export async function prefetchConversations(
  queryClient: QueryClient = getQueryClient(),
) {
  await queryClient.prefetchQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  })
  return queryClient
}

export function useGetConversations() {
  return useSuspenseQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  })
}

export async function prefetchConversation(
  conversationId: string,
  queryClient: QueryClient = getQueryClient(),
) {
  await queryClient.prefetchQuery({
    queryKey: ['conversations', conversationId],
    queryFn: () => getConversation(conversationId),
  })
  return queryClient
}
export function useConversation(conversationId: string) {
  return useSuspenseQuery({
    queryKey: ['conversations', conversationId],
    queryFn: () => {
      return getConversation(conversationId)
    },
  })
}
