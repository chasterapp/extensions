import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage } from '../actions/messages/sendMessage'

type UseSendMessageProps = {
  conversationId: string
  userId: string
  onSuccess?: () => Promise<void> | void
}

export function useSendMessage({
  conversationId,
  userId,
  onSuccess,
}: UseSendMessageProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (content: string) =>
      sendMessage({ conversationId, content, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['conversations'] })
      await onSuccess?.()
    },
  })
}
