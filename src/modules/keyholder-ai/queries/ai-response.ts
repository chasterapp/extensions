import { useMutation, useQueryClient } from '@tanstack/react-query'
import { readStreamableValue } from 'ai/rsc'
import { generateAiResponse } from '../actions/messages/generate-ai-response/generate-ai-response'

type UseGenerateAiResponseProps = {
  conversationId: string
  sessionId: string
  setStreamingMessage: (message: string) => void
}

export function useGenerateAiResponse({
  conversationId,
  sessionId,
  setStreamingMessage,
}: UseGenerateAiResponseProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { output } = await generateAiResponse({
        conversationId,
        sessionId,
      })

      let textContent = ''
      for await (const delta of readStreamableValue(output)) {
        textContent = `${textContent}${delta}`
        setStreamingMessage(textContent)
      }

      return textContent
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['conversations', conversationId],
      })
    },
  })
}
