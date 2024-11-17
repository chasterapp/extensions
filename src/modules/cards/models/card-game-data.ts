import type { CardDeckParams } from './card-deck-params'
import type { PlayedCard } from './played-card'

/**
 * The lock data, modified during the session
 */
export interface CardGameData {
  /**
   * The card deck
   */
  deck: CardDeckParams

  /**
   * Array of played cards
   */
  hand: PlayedCard[]

  /**
   * Lock start date
   */
  lockStartedAt: Date

  /**
   * Date of last lock reset
   */
  lockResetAt: Date | null

  /**
   * Freeze starts at
   */
  freezeStartsAt: Date | null

  /**
   * Freeze ends at
   */
  freezeEndsAt: Date | null

  /**
   * Freeze durations since last reset
   */
  freezeDurations: number[]

  /**
   * last action counted at
   */
  lastActionCountedAt: Date | null

  /**
   * Number of actions since last reset
   */
  nbActionsSinceLastReset: number
}
