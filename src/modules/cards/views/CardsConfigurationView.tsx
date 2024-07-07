'use client'

import ConfigurationForm from '@/modules/cards/components/configuration/ConfigurationForm'
import { cardDatabase } from '@/modules/cards/data/cards'
import type { CardConfiguration } from '@/modules/cards/models/card-configuration'
import type { CardOptions } from '@/modules/cards/models/card-options'
import type { PartnerConfigurationForPublic } from '@chasterapp/chaster-js'

type Props = {
  configuration: PartnerConfigurationForPublic
  token: string
}

export type MapCardsByType = Record<string, CardOptions>

const cardsByType = cardDatabase.cards.reduce((acc, val) => {
  acc[val.type] = val
  return acc
}, {} as MapCardsByType)

const categories = cardDatabase.categories.map((category) => {
  return {
    category: {
      type: category.type,
      name: category.name,
    },
    cards: category.initialCards.map((initialCard) => {
      const cardsInInitialCard = initialCard.cards.map(
        (card) => cardsByType[card],
      )

      return {
        type: initialCard.type,
        name: initialCard.name,
        description:
          initialCard.description || cardsInInitialCard[0].description,
      }
    }),
  }
})

const CardsConfigurationView = ({ configuration, token }: Props) => {
  const cardConfiguration = configuration.config as CardConfiguration

  return (
    <ConfigurationForm
      configuration={cardConfiguration}
      token={token}
      categories={categories}
      isRangeSelect
    />
  )
}

export default CardsConfigurationView
