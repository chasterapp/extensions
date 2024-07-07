import { cardConfigurationSchema } from '@/modules/cards/models/card-configuration'
import type { Extension } from '@/modules/extensions/types/Extension'
import { z } from 'zod'

export const extensions: Extension[] = [
  {
    internalId: 'emergency-unlock',
    displayName: 'Emergency unlock',
    configurationSchema: z.any(),
  },
  {
    internalId: 'cards',
    displayName: 'Cards',
    configurationSchema: cardConfigurationSchema,
  },
]

export const extensionBySlug = (slug: string) => {
  if (slug === 'cards-1') {
    return extensions[1]
  }
  if (slug === 'emergency-unlock') {
    return extensions[0]
  }
  throw new Error(`Extension with slug ${slug} not found`)
}
