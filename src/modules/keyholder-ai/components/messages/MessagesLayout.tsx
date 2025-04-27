'use client'

import { useSession } from '@/modules/extensions/stores/session-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack } from '@mui/joy'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useGenerateAiResponse } from '../../queries/ai-response'
import { useConversation } from '../../queries/conversation'
import { useSendMessage } from '../../queries/message'
import { ChatInput } from './input/ChatInput'
import { ChatMessage } from './list/ChatMessage'
import { MessageList } from './list/MessageList'

const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message is too long'),
})

type MessageFormData = z.infer<typeof messageSchema>

type Props = {
  conversationId: string
}

export function MessagesLayout({ conversationId }: Props) {
  const { data: conversation } = useConversation(conversationId)
  const { userId, session } = useSession()
  const [streamingMessage, setStreamingMessage] = useState('')
  const { mutate: generateAiResponse } = useGenerateAiResponse({
    conversationId: conversation.id,
    sessionId: session.sessionId,
    setStreamingMessage,
  })
  const { mutate: sendMessage, isPending: isSending } = useSendMessage({
    conversationId: conversation.id,
    userId: userId,
    onSuccess: () => {
      generateAiResponse()
    },
  })

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  })

  const onSubmit = (data: MessageFormData) => {
    sendMessage(data.message)
    form.reset()
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  const { messages } = conversation

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  return (
    <Stack sx={{ height: '100%' }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <MessageList conversation={conversation} />
        {streamingMessage && messages[messages.length - 1].userId !== 'AI' && (
          <ChatMessage
            message={streamingMessage}
            timestamp={new Date().toISOString()}
            isUser={false}
            avatarUrl={conversation.keyholder.avatarUrl}
            name={conversation.keyholder.name}
          />
        )}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput form={form} isSending={isSending} onSubmit={onSubmit} />
    </Stack>
  )
}
