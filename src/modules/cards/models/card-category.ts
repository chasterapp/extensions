import type { CategoryInitialCards } from './category-initial-cards'

export type CardCategory = {
  /**
   * The type of the category.
   * This is used to identify the category in the game.
   */
  type: string

  /**
   * The name of the category.
   */
  name: string

  /**
   * The list of cards available in the category.
   */
  initialCards: CategoryInitialCards[]
}
