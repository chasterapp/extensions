import type { CardAction } from '@/modules/cards/models/card-action'
import type { CardType } from '@/modules/cards/models/card-type'

export type CardOptions = {
  /**
   * The card type
   */
  type: CardType

  /**
   * The card name
   */
  name: string

  /**
   * The card description
   */
  description: string

  /**
   * The card color
   */
  color: string

  /**
   * The card category
   */
  category: string

  /**
   * Determines whether the card should be removed from the deck
   * after it is drawn.
   */
  shouldPickCard: boolean

  /**
   * If true, drawing the card counts as one action
   * and decreases the number of remaining actions by 1.
   */
  shouldCountAsAction: boolean

  /**
   * Number of keys given by picking this card
   */
  nbKeysGiven: number

  /**
   * If true, the number of chances is set to 0 when this card is played.
   */
  shouldResetActions: boolean

  /**
   * List of actions corresponding to the card
   */
  actions: CardAction[]
}
