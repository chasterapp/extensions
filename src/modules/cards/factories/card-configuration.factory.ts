import { Factory } from 'fishery'
import type { CardConfiguration } from '../models/card-configuration'
import { RegularityMode } from '../models/regularity-mode'

export class CardConfigurationFactory extends Factory<CardConfiguration> {}

export const cardConfigurationFactory = CardConfigurationFactory.define(() => ({
  regularity: 3600,
  regularityMode: RegularityMode.NonCumulative,
  nbKeysRequired: -1,
  cards: [
    {
      type: 'red',
      min: 2,
      max: 2,
    },
    {
      type: 'green',
      min: 1,
      max: 1,
    },
  ],
}))
