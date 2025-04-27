'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import type { ConversationGet } from '../domain/models/conversation-get'
import type { PartnerDoActionDto } from '@chasterapp/chaster-js'
import { getSession } from '@/modules/sessions/actions/get-session'

export async function createConversation(
  keyholderId: string,
  userId: string,
  initialMessage: string,
) {
  const {
    session: { sessionId },
  } = await getSession()

  try {
    const conversation = await prisma.chatbotConversation.create({
      data: {
        keyholderId,
        sessionId,
        messages: { create: { content: initialMessage, userId } },
      },
    })

    // Revalidate both the main layout and the chat route
    revalidatePath(`/sessions/${sessionId}/keyholder-ai`, 'layout')
    revalidatePath(
      `/sessions/${sessionId}/keyholder-ai/chat/${conversation.id}`,
      'page',
    )
    return conversation
  } catch (error) {
    console.error('Error creating conversation:', error)
    throw new Error('Failed to create conversation')
  }
}

export async function getConversation(conversationId: string) {
  const {
    session: { sessionId },
  } = await getSession()

  try {
    const conversation = await prisma.chatbotConversation.findUnique({
      where: { id: conversationId, sessionId },
      include: {
        keyholder: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      throw new Error('Conversation not found')
    }

    return {
      ...conversation,
      messages: conversation.messages.map((message) => ({
        ...message,
        content: message.content.replace(/\[ACTION\{.*?\}\]/g, '').trim(),
        actions: (message.actions ?? []) as unknown as PartnerDoActionDto[],
      })),
    } as ConversationGet
  } catch (error) {
    console.error('Error fetching conversation:', error)
    throw new Error('Failed to fetch conversation')
  }
}

export async function getConversations() {
  const {
    session: { sessionId },
  } = await getSession()

  try {
    const conversations = await prisma.chatbotConversation.findMany({
      where: { sessionId },
      include: {
        keyholder: {
          select: {
            name: true,
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return conversations.map((conversation) => ({
      id: conversation.id,
      keyholderName: conversation.keyholder.name,
      lastMessage: conversation.messages[0]?.content || 'No messages yet',
      timestamp: conversation.messages[0]?.createdAt || conversation.createdAt,
    }))
  } catch (error) {
    console.error('Error fetching conversations:', error)
    throw new Error('Failed to fetch conversations')
  }
}
