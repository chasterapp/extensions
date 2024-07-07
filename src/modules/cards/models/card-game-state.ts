import dayjs from 'dayjs'
import { RegularityMode } from './regularity-mode'
import { CardDeckBuilder } from '@/modules/cards/models/card-deck-builder'
import { getCard } from '@/modules/cards/lib/card-manager'
import type { CardConfiguration } from '@/modules/cards/models/card-configuration'
import type { CardDeck } from '@/modules/cards/models/card-deck'
import type { PlayedCard } from '@/modules/cards/models/played-card'
import type { CardType } from '@/modules/cards/models/card-type'

export class CardGameState {
  /**
   * The extension configuration
   */
  public readonly configuration: CardConfiguration

  /**
   * The lock card deck
   */
  private deck: CardDeck

  /**
   * Array of played cards
   */
  private hand: PlayedCard[]

  /**
   * Lock start date
   */
  public readonly lockStartedAt: Date

  /**
   * Date of last lock reset
   */
  private lockResetAt: Date | null

  /**
   * Freeze starts at
   */
  private freezeStartsAt: Date | null

  /**
   * Freeze ends at
   */
  private freezeEndsAt: Date | null

  /**
   * Freeze periods since last reset, in seconds
   */
  private freezeDurations: number[]

  /**
   * Freeze starts at
   */
  private lastActionCountedAt: Date | null

  /**
   * Number of actions since last reset
   */
  private nbActionsSinceLastReset: number

  constructor(options: LockOptions) {
    // Set params
    this.configuration = options.params
    this.hand = options.data.hand
    this.lockStartedAt = options.data.lockStartedAt
    this.lockResetAt = options.data.lockResetAt
    this.freezeStartsAt = options.data.freezeStartsAt
    this.freezeEndsAt = options.data.freezeEndsAt
    this.freezeDurations = options.data.freezeDurations || []
    this.lastActionCountedAt = options.data.lastActionCountedAt
    this.nbActionsSinceLastReset = options.data.nbActionsSinceLastReset

    // Set the deck
    this.deck = new CardDeckBuilder(this.database).build(options.data.deck)
  }

  /**
   * The deck size
   */
  get deckSize(): number {
    return this.deck.size
  }

  get data(): LockData {
    return {
      deck: this.deck.clone().raw(),
      freezeEndsAt: this.freezeEndsAt,
      freezeStartsAt: this.freezeStartsAt,
      freezeDurations: this.freezeDurations,
      hand: this.hand,
      lockResetAt: this.lockResetAt,
      lockStartedAt: this.lockStartedAt,
      lastActionCountedAt: this.lastActionCountedAt,
      nbActionsSinceLastReset: this.nbActionsSinceLastReset,
    }
  }

  private getLastResetDate() {
    return this.lockResetAt ?? this.lockStartedAt
  }

  // #region Deck

  getClonedDeck(): CardDeck {
    return this.deck.clone()
  }

  setDeck(deck: CardDeck): void {
    // Asserts the deck has at least one key card
    const nbKeysInDeck = deck.getNumberOfKeys()

    if (nbKeysInDeck <= 0) {
      throw new Error('The deck must have at least one key card.')
    }

    // Clamp the number of keys required
    if (
      this.configuration.nbKeysRequired >= 0 &&
      this.configuration.nbKeysRequired > nbKeysInDeck
    ) {
      this.configuration.nbKeysRequired = nbKeysInDeck
    }

    this.deck = deck
  }

  /**
   * Draws a card
   */
  drawCard(): CardType {
    return this.deck.draw()
  }

  /**
   * Returns the number of cards in the deck of a given type
   * @param cardType The card type to get
   */
  getCard(cardType: CardType): number {
    return this.deck.get(cardType)
  }

  /**
   * Set a number of cards
   * @param cardType The card type to change
   * @param number The new number of cards
   */
  setCard(cardType: CardType, number: number): void {
    this.deck.set(cardType, Math.max(number, 0))
  }

  /**
   * Removes a card from the deck
   * @param cardType The card type to remove
   * @param number The number of cards to remove
   */
  private removeCard(cardType: CardType, number = 1): void {
    const nbOfType = this.deck.get(cardType)

    this.deck.set(cardType, Math.max(nbOfType - number, 0))
  }

  /**
   * Clear the hand
   */
  clearHand() {
    this.hand = []
  }

  /**
   * Remove cards from the hand
   * @param cardTypes Card types to remove
   */
  removeCardsFromHand(cardTypes: CardType[]) {
    // Remove from the hand
    this.hand = this.hand.filter((card) => !cardTypes.includes(card.type))
  }

  /**
   * Picks a card from the deck and adds it into the hand
   * @param cardType The card type to remove
   * @param number The number of cards to remove
   */
  pickCard(currentDate: Date, cardType: CardType): void {
    // Remove the card from the deck
    this.removeCard(cardType)

    // Add into the hand
    this.hand.push({
      type: cardType,
      playedAt: new Date(currentDate.valueOf()),
    })
  }

  // #endregion

  nbKeysFound() {
    return this.hand.reduce(
      (found, c) => found + getCard(c.type).nbKeysGiven,
      0,
    )
  }

  private timeElapsedSinceLastReset(currentDate: Date) {
    const lastReset = this.getLastResetDate()

    const timeElapsed = dayjs(currentDate).diff(dayjs(lastReset))
    const timeElapsedWithoutFreezeDurations =
      timeElapsed -
      this.freezeDurations.map((s) => s * 1000).reduce((a, b) => a + b, 0)

    return timeElapsedWithoutFreezeDurations
  }

  /**
   * Returns the date of the next action
   * @param currentDate The current date
   */
  nextActionDate(currentDate: Date): Date | null {
    if (this.nbActionsRemaining(currentDate) > 0) {
      return currentDate
    }

    if (this.isFrozen(currentDate)) {
      return this.freezeEndsAt
    }

    if (
      this.configuration.regularityMode === RegularityMode.NonCumulative &&
      this.lastActionCountedAt
    ) {
      return new Date(
        this.lastActionCountedAt.valueOf() +
          this.configuration.regularity * 1000,
      )
    }
    if (this.configuration.regularityMode === RegularityMode.Cumulative) {
      const lastReset = this.getLastResetDate()
      const timeElapsed = this.timeElapsedSinceLastReset(currentDate)

      const nbActions = timeElapsed / (this.configuration.regularity * 1000)
      const nbAllowedActions = Math.max(
        Math.ceil(nbActions % 1 === 0 ? nbActions + 1 : nbActions),
        0,
      )

      return new Date(
        lastReset.valueOf() +
          nbAllowedActions * this.configuration.regularity * 1000,
      )
    }

    return currentDate
  }

  /**
   * Returns the number of actions remaining
   */
  nbActionsRemaining(currentDate: Date): number {
    if (this.isFrozen(currentDate)) {
      return 0
    }

    if (this.configuration.regularityMode === RegularityMode.NonCumulative) {
      if (!this.lastActionCountedAt) {
        // No card played yet
        return 1
      }

      const timeSinceLastAction =
        currentDate.valueOf() - this.lastActionCountedAt.valueOf()

      return timeSinceLastAction >= this.configuration.regularity * 1000 ? 1 : 0
    }
    if (this.configuration.regularityMode === RegularityMode.Cumulative) {
      const timeElapsed = this.timeElapsedSinceLastReset(currentDate)

      const nbActions = timeElapsed / (this.configuration.regularity * 1000)
      const nbAllowedActionsSinceLastReset = Math.ceil(
        nbActions % 1 === 0 ? nbActions + 1 : nbActions,
      )

      return Math.max(
        nbAllowedActionsSinceLastReset - this.nbActionsSinceLastReset,
        0,
      )
    }
    return 0
  }

  isFrozen(currentDate: Date): boolean {
    if (!this.freezeStartsAt) return false // No freeze
    if (!this.freezeEndsAt) return true // Unknown end date

    return currentDate < this.freezeEndsAt
  }

  /**
   * Freezes the lock until a given date
   * @param currentDate The current date
   * @param freezeEndsAt Freeze end date
   */
  freeze(currentDate: Date, freezeEndsAt: Date): void {
    if (freezeEndsAt === null) throw new Error('freezeEndsAt must be defined')
    this.freezeStartsAt = new Date(currentDate.valueOf())
    this.freezeEndsAt = freezeEndsAt
    const freezeDuration = dayjs(freezeEndsAt).diff(
      dayjs(currentDate),
      'seconds',
    )
    this.freezeDurations.push(freezeDuration)
  }

  /**
   * Counts an action
   * @param currentDate
   */
  countAction(currentDate: Date) {
    this.nbActionsSinceLastReset += 1
    this.lastActionCountedAt = currentDate
  }

  /**
   * Resets actions
   */
  resetActions(currentDate: Date) {
    this.lockResetAt = currentDate
    this.lastActionCountedAt = null
    this.nbActionsSinceLastReset = 0
    this.freezeDurations = []
  }

  /**
   * Returns true if the lock can be released
   */
  canBeReleased(): boolean {
    if (this.deck.getNumberOfKeys() === 0) return true

    // Check the number of keys found
    return (
      this.configuration.nbKeysRequired >= 0 &&
      this.nbKeysFound() >= this.configuration.nbKeysRequired
    )
  }

  /**
   * Returns the total number of keys in the game (deck and hand)
   */
  nbTotalKeysInGame() {
    return this.nbKeysFound() + this.deck.getNumberOfKeys()
  }

  /**
   * Return the total number of keys required to be released
   */
  nbTotalKeysRequired() {
    const keysInGame = this.nbTotalKeysInGame()

    if (this.configuration.nbKeysRequired < 0) return keysInGame
    return Math.min(this.configuration.nbKeysRequired, keysInGame)
  }
}
