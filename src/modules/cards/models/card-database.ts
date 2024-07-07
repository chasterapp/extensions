import type { CardCategory } from '@/modules/cards/models/card-category'
import type { CardOptions } from '@/modules/cards/models/card-options'

export type CardDatabase = {
  /**
   * List of cards available for the game.
   */
  cards: CardOptions[]

  /**
   * Categories of cards
   * Cards are displayed into categories when starting a game.
   * Each category has a name and a list of cards, the player can select a number of cards from each category.
   * When the game starts, random cards are selected from each category based on the selected number of cards.
   */
  categories: CardCategory[]
}
