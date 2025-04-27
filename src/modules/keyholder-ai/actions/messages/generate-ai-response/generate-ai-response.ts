'use server'

import { prisma } from '@/lib/prisma'
import type { InputJsonArray } from '@/lib/prisma/client/runtime/library'
import { createApiInstance } from '@/modules/network/helpers/createApiInstance'
import { PartnerExtensionsApi } from '@chasterapp/chaster-js'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { fetchContextForAi } from './fetch-lock-context-for-ai'
import { parseActions } from './parse-actions'
import { formatMessagesForAI, generateSystemPrompt } from './prompt'

type GenerateAiResponseProps = {
  conversationId: string
  sessionId: string
}

export async function generateAiResponse({
  conversationId,
  sessionId,
}: GenerateAiResponseProps) {
  const conversation = await prisma.chatbotConversation.findUnique({
    where: { id: conversationId },
    include: {
      keyholder: true,
    },
  })

  if (!conversation) {
    throw new Error('Conversation not found')
  }

  const previousMessages = await prisma.chatbotMessage.findMany({
    where: {
      conversationId,
    },
    orderBy: { createdAt: 'asc' },
  })

  const lockContextForAi = await fetchContextForAi(sessionId)

  const stream = createStreamableValue()
  const openRouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  })

  let fullResponse = ''

  ;(async () => {
    const { textStream } = streamText({
      model: openRouter('mistralai/mistral-small-3.1-24b-instruct'),
      system: generateSystemPrompt({ conversation, context: lockContextForAi }),
      messages: formatMessagesForAI(previousMessages),
    })

    for await (const text of textStream) {
      stream.update(text)
      fullResponse += text
    }

    const actions = parseActions(fullResponse)
    if (actions.length > 0) {
      for (const action of actions) {
        await createApiInstance(PartnerExtensionsApi).doAction(
          sessionId,
          action,
        )
      }
    }

    await prisma.chatbotMessage.create({
      data: {
        content: fullResponse,
        userId: 'AI',
        conversationId,
        actions:
          actions.length > 0
            ? (actions as unknown as InputJsonArray)
            : undefined,
      },
    })

    await prisma.chatbotConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    })

    stream.done()
  })().catch((error) => {
    console.error(error)
  })

  return {
    output: stream.value,
  }
}
