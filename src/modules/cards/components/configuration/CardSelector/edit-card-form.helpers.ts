import { CardTypeInDeck, GameCreationInitialCard } from "@chaster/api-client"
import { CardsFormValue } from "./edit-card-form.model"

export const editDeckInitialForm = (
  deck: Pick<CardTypeInDeck, "type" | "count">[],
): CardsFormValue => {
  const form: CardsFormValue = {}

  deck.forEach((card) => {
    form[card.type] = {
      selected: true,
      min: card.count,
      max: card.count,
    }
  })

  return form
}

export const createDeckInitialForm = (cards: GameCreationInitialCard[]) =>
  cards.reduce((acc, val) => {
    acc[val.type] = {
      selected: true,
      min: val.min,
      max: val.max,
    }
    return acc
  }, {} as CardsFormValue)
