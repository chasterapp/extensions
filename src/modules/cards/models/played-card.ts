import type { CardType } from '@/modules/cards/models/card-type'

export type PlayedCardProperties = {
  /**
   * The date when the card was drawn
   */
  playedAt: Date
}

export type NormalPlayedCard = {
  /**
   * The card type
   */
  type: CardType
} & PlayedCardProperties

/**
 * Represents a card that has already been drawn and removed from the deck.
 */
export type PlayedCard = NormalPlayedCard
