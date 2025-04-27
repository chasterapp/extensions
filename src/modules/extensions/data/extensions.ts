import { cardConfigurationSchema } from '@/modules/cards/models/card-configuration'
import { emergencyUnlockConfigurationSchema } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import type { Extension } from '@/modules/extensions/types/Extension'
import { keyholderAiConfigurationSchema } from '@/modules/keyholder-ai/domain/models/keyholder-ai-configuration'

export const extensions: Extension[] = [
  {
    internalId: 'emergency-unlock',
    displayName: 'Emergency unlock',
    configurationSchema: emergencyUnlockConfigurationSchema,
  },
  {
    internalId: 'cards',
    displayName: 'Cards',
    configurationSchema: cardConfigurationSchema,
  },
  {
    internalId: 'keyholder-ai',
    displayName: 'Keyholder AI',
    configurationSchema: keyholderAiConfigurationSchema,
  },
]

export const extensionBySlug = (slug: string) => {
  if (slug === 'cards') {
    return extensions[1]
  }
  if (slug === 'emergency-unlock') {
    return extensions[0]
  }
  if (slug === 'keyholder-ai') {
    return extensions[2]
  }
  throw new Error(`Extension with slug ${slug} not found`)
}
