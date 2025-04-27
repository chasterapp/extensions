import type { ChatbotMessage } from '@/lib/prisma/client'
import type { PartnerDoActionDto } from '@chasterapp/chaster-js'

export type MessageGet = Pick<
  ChatbotMessage,
  'id' | 'content' | 'userId' | 'createdAt'
> & {
  actions?: PartnerDoActionDto[]
}
