import type { ChatbotConversation, ChatbotKeyholder } from '@/lib/prisma/client'
import type { MessageGet } from './message-get'

export type ConversationGet = Pick<
  ChatbotConversation,
  'id' | 'sessionId' | 'createdAt' | 'updatedAt'
> & {
  keyholder: Pick<ChatbotKeyholder, 'name' | 'avatarUrl'>
  messages: MessageGet[]
}
