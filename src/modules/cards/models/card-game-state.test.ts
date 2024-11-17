import dayjs from 'dayjs'
import { RegularityMode } from './regularity-mode'
import { CardDeckBuilder } from './card-deck-builder'
import type { CardGameStateParams } from './card-game-state'
import { CardGameState } from './card-game-state'
import { randomWeighted } from '@/modules/base/lib/random'
import { cardConfigurationFactory } from '../factories/card-configuration.factory'
import { cardGameDataFactory } from '../factories/lock-data.factory'

jest.mock('@/modules/base/lib/random')

const randomWeightedMock = randomWeighted as jest.Mock

describe('CardGameState', () => {
  const date = new Date('2021-11-01T08:00:00Z')

  let lock: CardGameState
  const cardDeckBuilder = new CardDeckBuilder()

  const buildLock = (options: CardGameStateParams) => new CardGameState(options)

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(date)
    lock = buildLock({
      params: cardConfigurationFactory.build(),
      data: cardGameDataFactory.build(),
    })
  })

  describe('simple lock', () => {
    it('creates a lock', () => {
      expect(lock.deckSize).toBe(3)
    })

    it('gets lock data', () => {
      expect(lock.data).toMatchObject({
        deck: { red: 2, green: 1 },
        freezeEndsAt: null,
        freezeStartsAt: null,
        hand: [],
        lockResetAt: null,
        lockStartedAt: date,
        lastActionCountedAt: null,
        nbActionsSinceLastReset: 0,
      })
    })

    it('clones the deck', () => {
      expect(lock.getClonedDeck()).toMatchObject(
        cardDeckBuilder.buildDeck({ red: 2, green: 1 }),
      )
    })

    it('gets a card', () => {
      expect(lock.getCard('red')).toBe(2)
      expect(lock.getCard('green')).toBe(1)
      expect(lock.getCard('green')).toBe(1)
    })

    it('sets a card', () => {
      lock.setCard('red', 5)
      expect(lock.getCard('red')).toBe(5)
      expect(lock.getCard('red')).toBe(5)
    })

    it('does not set a card to a negative value', () => {
      expect(lock.setCard('green', -5))
      expect(lock.getCard('green')).toBe(0)
    })

    it('sets the deck', () => {
      const deck = cardDeckBuilder.buildDeck({ red: 5, green: 2, freeze: 1 })
      lock.setDeck(deck)
      expect(lock.getCard('red')).toBe(5)
      expect(lock.getCard('green')).toBe(2)
      expect(lock.getCard('freeze')).toBe(1)
    })

    it('does not set a deck without a key card', () => {
      expect(() => lock.setDeck(cardDeckBuilder.buildDeck({ red: 5 }))).toThrow(
        'The deck must have at least one key card.',
      )
    })

    it('clears the hand', () => {
      lock.pickCard(date, 'green')
      lock.clearHand()
      expect(lock.data.hand.length).toBe(0)
    })

    it('clamps the number of keys required', () => {
      lock.configuration.nbKeysRequired = 5
      lock.setDeck(cardDeckBuilder.buildDeck({ red: 5, green: 1 }))
      expect(lock.configuration.nbKeysRequired).toBe(1)
    })

    it('does not clamp the number of keys required when there is enough keys', () => {
      lock.configuration.nbKeysRequired = 1
      lock.setDeck(cardDeckBuilder.buildDeck({ red: 5, green: 5 }))
      expect(lock.configuration.nbKeysRequired).toBe(1)
    })

    it('draws a card', () => {
      randomWeightedMock.mockReturnValue('red')
      const card = lock.drawCard()
      expect(card).toBe('red')
    })

    it('removes all cards from hand', () => {
      lock.pickCard(date, 'red')
      expect(lock.getCard('red')).toBe(1)
      lock.pickCard(date, 'red')
      expect(lock.getCard('red')).toBe(0)
      expect(lock.data.hand.length).toBe(2)
      expect(lock.data.hand[0].type).toBe('red')
      lock.removeCardsFromHand(['red'])
      expect(lock.getCard('red')).toBe(0)
      expect(lock.data.hand.length).toBe(0)
    })

    it('picks a card', () => {
      lock.pickCard(date, 'red')
      expect(lock.getCard('red')).toBe(1)
      expect(lock.data.hand).toEqual([{ type: 'red', playedAt: date }])
    })

    it('counts action', () => {
      lock.countAction(date)
      expect(lock.data.nbActionsSinceLastReset).toBe(1)
      expect(lock.data.lastActionCountedAt).toEqual(date)
      lock.countAction(dayjs(date).add(1, 'hour').toDate())
      expect(lock.data.nbActionsSinceLastReset).toBe(2)
      expect(lock.data.lastActionCountedAt).toEqual(
        dayjs(date).add(1, 'hour').toDate(),
      )
    })
  })

  describe('action dates for frozen locks', () => {
    it('returns the freeze end date', () => {
      const freezeEndsAt = dayjs(date).add(1, 'hour').toDate()
      lock.freeze(date, freezeEndsAt)
      expect(lock.nextActionDate(date)).toBe(freezeEndsAt)
    })
  })

  describe('action dates for non-cumulative locks', () => {
    it('returns now when there is no action', () => {
      expect(lock.nextActionDate(date)).toBe(date)
    })

    it('returns the next action date', () => {
      lock.countAction(date)
      expect(lock.nextActionDate(date)).toEqual(
        dayjs(date).add(1, 'hour').toDate(),
      )
    })

    it('returns the next action date for a future date', () => {
      const actionDate = dayjs(date).add(1, 'hour').toDate()
      lock.countAction(actionDate)
      expect(lock.nextActionDate(date)).toEqual(
        dayjs(actionDate).add(1, 'hour').toDate(),
      )
    })

    it('depends on the regularity', () => {
      lock.configuration.regularity = 7200
      lock.countAction(date)
      expect(lock.nextActionDate(date)).toEqual(
        dayjs(date).add(2, 'hour').toDate(),
      )
    })

    it('returns the current date if we have actions remaining', () => {
      const now = dayjs(date).add(3, 'hour').toDate()
      expect(lock.nextActionDate(now)).toEqual(now)
    })
  })

  describe('action dates for cumulative locks', () => {
    beforeEach(() => {
      lock = buildLock({
        params: cardConfigurationFactory.build({
          regularityMode: RegularityMode.Cumulative,
        }),
        data: cardGameDataFactory.build(),
      })
    })

    it('returns now when there is no action', () => {
      expect(lock.nextActionDate(date)).toEqual(date)
    })

    it('returns the next action date', () => {
      lock.countAction(date)
      expect(lock.nextActionDate(date)).toEqual(
        dayjs(date).add(1, 'hour').toDate(),
      )
    })

    it('returns the current date if we have actions remaining', () => {
      const now = dayjs(date).add(3, 'hour').toDate()
      lock.countAction(date)
      expect(lock.nextActionDate(now)).toEqual(
        dayjs(date).add(3, 'hour').toDate(),
      )
    })

    it('depends on the regularity', () => {
      lock.configuration.regularity = 7200
      lock.countAction(date)
      expect(lock.nextActionDate(date)).toEqual(
        dayjs(date).add(2, 'hour').toDate(),
      )
    })

    it('resets the period', () => {
      const resetAt = dayjs(date).add(2, 'hour').toDate()
      lock.resetActions(resetAt)
      expect(lock.nextActionDate(date)).toEqual(resetAt)
    })

    it('resets the period and counts an action', () => {
      const resetAt = dayjs(date).add(2, 'hour').toDate()
      lock.resetActions(resetAt)
      lock.countAction(resetAt)
      expect(lock.nextActionDate(resetAt)).toEqual(
        dayjs(resetAt).add(1, 'hour').toDate(),
      )
    })
  })

  describe('nb actions remaining for non-cumulative locks', () => {
    it('returns 1 action for a newly created lock', () => {
      expect(lock.nbActionsRemaining(date)).toBe(1)
    })

    it('returns 0 action after doing an action', () => {
      lock.countAction(date)
      expect(lock.nbActionsRemaining(date)).toBe(0)
    })

    it('returns 1 action after waiting', () => {
      lock.countAction(date)
      const now = dayjs(date).add(1, 'hour').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(1)
    })

    it('returns 1 action after waiting multiple periods', () => {
      lock.countAction(date)
      const now = dayjs(date).add(3, 'hour').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(1)
    })

    it('depends on regularity', () => {
      lock.configuration.regularity = 7200
      lock.countAction(date)
      const now = dayjs(date).add(1, 'hour').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(0)
    })

    it('returns 0 action for frozen locks', () => {
      lock = buildLock({
        params: cardConfigurationFactory.build(),
        data: cardGameDataFactory.build({ freezeStartsAt: date }),
      })
      expect(lock.nbActionsRemaining(date)).toBe(0)
    })
  })

  describe('nb actions remaining for cumulative locks', () => {
    beforeEach(() => {
      lock = buildLock({
        params: cardConfigurationFactory.build({
          regularityMode: RegularityMode.Cumulative,
        }),
        data: cardGameDataFactory.build(),
      })
    })

    it('returns 1 action for a newly created lock', () => {
      const now = dayjs(date).add(1, 'second').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(1)
    })

    it('returns 0 action after doing an action', () => {
      const now = dayjs(date).add(1, 'second').toDate()
      lock.countAction(date)
      expect(lock.nbActionsRemaining(now)).toBe(0)
    })

    it('returns 1 action after waiting', () => {
      lock.countAction(date)
      const now = dayjs(date).add(1, 'hour').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(1)
    })

    it('returns 2 actions after waiting 2 periods', () => {
      lock.countAction(date)
      const now = dayjs(date).add(2, 'hour').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(2)
    })

    it('depends on regularity', () => {
      lock.configuration.regularity = 7200
      lock.countAction(date)
      const now = dayjs(date).add(2, 'hour').toDate()
      expect(lock.nbActionsRemaining(now)).toBe(1)
    })

    it('returns 1 action after a period reset', () => {
      const resetAt = dayjs(date).add(2, 'hour').toDate()
      lock.resetActions(resetAt)
      expect(lock.nbActionsRemaining(resetAt)).toBe(1)
    })

    it('returns 0 action after a period reset and an action', () => {
      const resetAt = dayjs(date).add(2, 'hour').toDate()
      lock.resetActions(resetAt)
      lock.countAction(resetAt)
      expect(lock.nbActionsRemaining(resetAt)).toBe(0)
    })
  })

  describe('frozen locks', () => {
    it('is frozen', () => {
      lock = buildLock({
        params: cardConfigurationFactory.build(),
        data: cardGameDataFactory.build({ freezeStartsAt: date }),
      })
      expect(lock.isFrozen(date)).toBe(true)
    })

    it('is not frozen', () => {
      expect(lock.isFrozen(date)).toBe(false)
    })

    it('is not frozen when the date is over', () => {
      lock = buildLock({
        params: cardConfigurationFactory.build(),
        data: cardGameDataFactory.build({
          freezeStartsAt: date,
          freezeEndsAt: dayjs(date).add(1, 'hour').toDate(),
        }),
      })
      const now = dayjs(date).add(1, 'hour').toDate()
      expect(lock.isFrozen(now)).toBe(false)
    })
  })

  describe('freeze locks', () => {
    it('freezes the lock', () => {
      const end = dayjs(date).add(1, 'hour').toDate()
      lock.freeze(date, end)
      expect(lock.isFrozen(date)).toBe(true)
      expect(lock.isFrozen(end)).toBe(false)
    })

    describe('cumulative locks', () => {
      beforeEach(() => {
        lock = buildLock({
          params: cardConfigurationFactory.build({
            regularityMode: RegularityMode.Cumulative,
          }),
          data: cardGameDataFactory.build(),
        })
      })

      it('does not count freeze time as actions', () => {
        const end = dayjs(date).add(2, 'hour').toDate()
        lock.freeze(date, end)
        expect(lock.nbActionsRemaining(date)).toBe(0)
        expect(lock.nbActionsRemaining(end)).toBe(1)
      })

      it('resets freeze periods', () => {
        const end = dayjs(date).add(2, 'hour').toDate()
        lock.freeze(date, end)
        lock.resetActions(end)
        expect(lock.nbActionsRemaining(end)).toEqual(1)
      })
    })
  })

  describe('lock release', () => {
    beforeEach(() => {
      lock.setDeck(cardDeckBuilder.buildDeck({ red: 5, green: 2 }))
    })

    it('cannot be released', () => {
      expect(lock.canBeReleased()).toBe(false)
    })

    it('cannot be released if all keys are not found', () => {
      lock.pickCard(date, 'green')
      expect(lock.canBeReleased()).toBe(false)
    })

    it('can be released if all keys are found', () => {
      lock.pickCard(date, 'green')
      lock.pickCard(date, 'green')
      expect(lock.canBeReleased()).toBe(true)
    })

    it('can be released if one key is found', () => {
      lock.configuration.nbKeysRequired = 1
      lock.pickCard(date, 'green')
      expect(lock.canBeReleased()).toBe(true)
    })
  })
})
