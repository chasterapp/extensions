import { randomWeighted } from '@/modules/base/lib/random'
import type { CardDeck } from './card-deck'
import { CardDeckBuilder } from './card-deck-builder'

jest.mock('@/modules/base/lib/random')

const randomWeightedMock = randomWeighted as jest.Mock

describe('CardDeck', () => {
  const builder = new CardDeckBuilder()

  describe('build deck', () => {
    it('can build a deck', () => {
      const deck = builder.buildDeck({ red: 2, green: 1 })
      expect(deck.size).toBe(3)
      expect(deck.get('red')).toBe(2)
      expect(deck.get('green')).toBe(1)
    })
  })

  describe('empty deck', () => {
    const deck = builder.buildDeck({})

    it('is empty', () => {
      expect(deck.size).toBe(0)
    })

    it('cannot draw cards', () => {
      expect(() => deck.draw()).toThrow('There are no more cards.')
    })
  })

  describe('deck with one type of cards', () => {
    let deck: CardDeck

    beforeEach(() => {
      deck = builder.buildDeck({ red: 2 })
    })

    it('has one card', () => {
      expect(deck.size).toBe(2)
    })

    it('can draw a card', () => {
      randomWeightedMock.mockReturnValueOnce('red')
      const card = deck.draw()
      expect(card).toBe('red')
      expect(deck.size).toBe(2)
    })

    it('can remove a card', () => {
      deck.remove('red')
      expect(deck.size).toBe(1)
    })
  })

  describe('deck with multiple type of cards', () => {
    let deck: CardDeck

    beforeEach(() => {
      deck = builder.buildDeck({ red: 2, green: 1 })
    })

    it('has three cards', () => {
      expect(deck.size).toBe(3)
    })

    it('can get a card', () => {
      expect(deck.get('red')).toBe(2)
      expect(deck.get('green')).toBe(1)
    })

    it('can set a card', () => {
      deck.set('red', 3)
      expect(deck.get('red')).toBe(3)
      expect(deck.size).toBe(4)
    })

    it('can add one card', () => {
      deck.add('red')
      expect(deck.get('red')).toBe(3)
      expect(deck.size).toBe(4)
    })

    it('can add two cards', () => {
      deck.add('red', 2)
      expect(deck.get('red')).toBe(4)
      expect(deck.size).toBe(5)
    })

    it('can remove a card', () => {
      deck.remove('red')
      expect(deck.get('red')).toBe(1)
      expect(deck.size).toBe(2)
    })

    it('can remove a card to zero', () => {
      deck.remove('green')
      expect(deck.get('green')).toBe(0)
      expect(deck.size).toBe(2)
    })

    it('can clone a deck', () => {
      const cloned = deck.clone()
      expect(cloned.size).toBe(deck.size)
      expect(cloned.get('red')).toBe(2)
      expect(cloned.get('green')).toBe(1)
    })

    it('can get raw cards', () => {
      const raw = deck.raw()
      expect(raw.green).toBe(1)
      expect(raw.red).toBe(2)
      expect(raw.freeze).toBe(0)
    })
  })
})
