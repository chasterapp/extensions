import type { CardConfigurationInitialCard } from '@/modules/cards/models/card-configuration'

export const getConfigurationDefaultCards =
  (): CardConfigurationInitialCard[] => [
    {
      type: 'green',
      min: 1,
      max: 1,
    },
    {
      type: 'red',
      min: 5,
      max: 5,
    },
  ]
