import { getConfigurationDefaultCards } from '@/modules/cards/data/configuration-default-cards'
import { categoryInitialCardExists } from '@/modules/cards/lib/card-manager'
import type { InitialCardType } from '@/modules/cards/models/initial-card-type'
import { RegularityMode } from '@/modules/cards/models/regularity-mode'
import { z } from 'zod'

export type CardConfigurationInitialCard = {
  type: InitialCardType
  min: number
  max: number
}

export type CardConfiguration = {
  /**
   * The regularity of the lock
   * - If the lock is in non-cumulative mode, this is the time
   * you have to wait after having drawn a card to draw a new one.
   * - In cumulative mode, for each period one more chance is given.
   */
  regularity: number

  /**
   * The regularity mode of the lock
   */
  regularityMode: RegularityMode

  /**
   * Determines the number of keys to be found to release the lock
   * If negative, all keys must be found
   */
  nbKeysRequired: number

  /**
   * Minimum cards to be added in the deck for each card type
   */
  cards: CardConfigurationInitialCard[]
}

export const defaultConfiguration = {
  regularity: 900,
  regularityMode: RegularityMode.NonCumulative,
  cards: getConfigurationDefaultCards(),
  nbKeysRequired: 1,
}

const cardConfigurationInitialCardSchema = z.object({
  type: z.string().refine((value) => categoryInitialCardExists(value)),
  min: z.number().nonnegative(),
  max: z.number().nonnegative(),
})

export const cardConfigurationSchema = z.object({
  regularity: z.number().nonnegative(),
  regularityMode: z.nativeEnum(RegularityMode),
  nbKeysRequired: z.number(),
  cards: z.array(cardConfigurationInitialCardSchema),
})
