import { randomWeighted } from '@/modules/base/lib/random'
import { cardDatabase } from '@/modules/cards/data/cards'
import { getCard } from '@/modules/cards/lib/card-manager'
import type { CardDeckParams } from '@/modules/cards/models/card-deck-params'
import type { CardType } from '@/modules/cards/models/card-type'

export class CardDeck {
  /**
   * The list of cards currently in the deck
   */
  cards: Map<CardType, number>

  constructor(cards?: Map<CardType, number>) {
    this.cards = cards ?? new Map<CardType, number>()
  }

  /**
   * Clones the deck
   */
  clone(): CardDeck {
    return new CardDeck(this.cards)
  }

  /**
   * Number of cards in the deck
   */
  get size(): number {
    return [...this.cards.values()].reduce((count, val) => count + val, 0)
  }

  public raw(): CardDeckParams {
    const raw = {} as CardDeckParams

    cardDatabase.cards.forEach(({ type }) => {
      raw[type] = this.get(type)
    })

    return raw
  }

  /**
   * Returns the number of cards of a given type
   * @param cardType The card type to get
   */
  public get(cardType: CardType): number {
    return this.cards.get(cardType) ?? 0
  }

  /**
   * Adds a card type in the deck
   * @param cardType The card type to add
   * @param number Number of cards to add
   */
  public set(cardType: CardType, number: number): void {
    this.cards.set(cardType, number)
  }

  /**
   * Adds one or multiple cards to the deck
   * @param cardType The card type to add
   * @param number The number of cards to add
   */
  public add(cardType: CardType, number = 1): void {
    if (number <= 0) return
    const nbCards = this.get(cardType)
    this.set(cardType, nbCards + number)
  }

  /**
   * Draws a card
   */
  public draw(): CardType {
    if (this.size === 0) {
      throw new Error('There are no more cards.')
    }

    return randomWeighted(
      Array.from(this.cards.entries()).map(([choice, weight]) => ({
        choice,
        weight,
      })),
    )
  }

  /**
   * Removes a card type from the deck
   * @param cardType The card type to remove
   */
  public remove(cardType: CardType): void {
    const nbOfType = this.cards.get(cardType)

    if (nbOfType === undefined || nbOfType === 0) {
      throw new Error(`The card ${cardType} is not in the deck.`)
    }

    this.cards.set(cardType, nbOfType - 1)
  }

  public getNumberOfKeys(): number {
    const nbKeysAvailableInDeck = Array.from(this.cards.entries()).reduce(
      (count, [card, amount]) => count + getCard(card).nbKeysGiven * amount,
      0,
    )

    return nbKeysAvailableInDeck
  }

  public toString(): string {
    const description = Array.from(this.cards.entries())
      .map(([cardType, number]) => `• ${cardType} x${number}`)
      .join('\n')

    return `CardDeck (${this.size} cards):\n${description}`
  }
}
