import { cardDatabase } from '@/modules/cards/data/cards'
import type { CardType } from '@/modules/cards/models/card-type'
import type { CategoryInitialCards } from '@/modules/cards/models/category-initial-cards'
import type { InitialCardType } from '@/modules/cards/models/initial-card-type'

export const categoryInitialCards = cardDatabase.categories.reduce(
  (cards, category) => {
    cards.push(...category.initialCards)
    return cards
  },
  [] as CategoryInitialCards[],
)

export const cardExists = (cardType: CardType) => {
  return cardDatabase.cards.some((c) => c.type === cardType)
}

export const getCard = (cardType: CardType) => {
  const card = cardDatabase.cards.find((c) => c.type === cardType)
  if (!card) throw new Error(`Card ${cardType} not found`)

  return card
}

export const categoryInitialCardExists = (cardType: InitialCardType) => {
  return categoryInitialCards.some((c) => c.type === cardType)
}

export const getCategoryInitialCard = (cardType: InitialCardType) => {
  const card = categoryInitialCards.find((c) => c.type === cardType)
  if (!card) throw new Error(`Initial card ${cardType} not found`)

  return card
}
