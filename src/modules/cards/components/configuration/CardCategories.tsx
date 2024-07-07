import CardSelector from '@/modules/cards/components/configuration/CardSelector/CardSelector'
import type { CardSelectorCategory } from '@/modules/cards/components/configuration/CardSelector/types'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  categories: CardSelectorCategory[]
  isRangeSelect?: boolean
  readonly?: boolean
}

const CardCategories = <T extends FieldValues>({
  control,
  name,
  categories,
  isRangeSelect,
  readonly,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CardSelector
          categories={categories}
          isRangeSelect={isRangeSelect}
          onChange={field.onChange}
          readonly={readonly}
          value={field.value}
        />
      )}
    />
  )
}

export default CardCategories
