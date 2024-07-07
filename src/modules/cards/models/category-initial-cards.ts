import type { CardType } from '@/modules/cards/models/card-type'
import type { InitialCardType } from '@/modules/cards/models/initial-card-type'

export type CategoryInitialCards = {
  /**
   * The type of the category.
   */
  type: InitialCardType

  /**
   * The name of the category.
   */
  name: string

  /**
   * The description of the category.
   */
  description?: string

  /**
   * The cards available for the category.
   * The player can select a number of cards for this category. When the game starts,
   * random cards are selected from this list.
   */
  cards: CardType[]
}
