'use server'

import { prisma } from '@/lib/prisma'
import type { Keyholder } from '../domain/models/keyholder'

export async function getKeyholders(): Promise<Keyholder[]> {
  const keyholders = await prisma.chatbotKeyholder.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      avatarUrl: true,
      kinks: true,
      personalityTraits: true,
    },
  })

  return keyholders
}
