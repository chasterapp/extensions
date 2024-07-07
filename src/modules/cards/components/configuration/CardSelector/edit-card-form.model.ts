export interface CardsFormItemData {
  selected: boolean
  min: number
  max: number
}

export type CardsFormValue = Record<string, CardsFormItemData>
