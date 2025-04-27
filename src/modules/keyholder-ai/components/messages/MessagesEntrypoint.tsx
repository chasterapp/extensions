import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { prefetchConversation } from '../../queries/conversation'
import { MessagesLayout } from './MessagesLayout'

type Props = {
  conversationId: string
}

export async function MessagesEntrypoint({ conversationId }: Props) {
  const queryClient = await prefetchConversation(conversationId)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MessagesLayout conversationId={conversationId} />
    </HydrationBoundary>
  )
}
