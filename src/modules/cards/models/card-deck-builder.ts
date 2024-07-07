import { CardDeck } from '@/modules/cards/models/card-deck'
import type { CardDeckParams } from '@/modules/cards/models/card-deck-params'

export class CardDeckBuilder {
  /**
   * Builds a CardDeck instance with given cards
   * @param cards Cards object
   */
  buildDeck(cards: CardDeckParams) {
    return new CardDeck(new Map(Object.entries(cards)))
  }
}
