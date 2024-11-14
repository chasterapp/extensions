import { cardConfigurationSchema } from '@/modules/cards/models/card-configuration'
import { emergencyUnlockConfigurationSchema } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import type { Extension } from '@/modules/extensions/types/Extension'

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
]

export const extensionBySlug = (slug: string) => {
  if (slug === 'cards') {
    return extensions[1]
  }
  if (slug === 'emergency-unlock') {
    return extensions[0]
  }
  throw new Error(`Extension with slug ${slug} not found`)
}
