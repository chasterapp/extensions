'use server'

import { prisma } from '@/lib/prisma'

type SendMessageProps = {
  conversationId: string
  content: string
  userId: string
}

export async function sendMessage({
  conversationId,
  content,
  userId,
}: SendMessageProps) {
  await prisma.chatbotMessage.create({
    data: {
      content,
      userId,
      conversationId,
    },
  })

  await prisma.chatbotConversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  })
}
