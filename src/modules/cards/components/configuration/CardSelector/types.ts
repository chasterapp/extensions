import type { CardOptions } from '@/modules/cards/models/card-options'

export type Category = {
  name: string
  type: string
}

export type CardSelectorCategory = {
  category: Category
  cards: Pick<CardOptions, 'name' | 'type' | 'description'>[]
}
