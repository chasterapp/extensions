import DurationSelector from '@/modules/ui/components/inputs/DurationSelector/DurationSelector'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
}

const RegularitySelect = <T extends FieldValues>({
  control,
  name,
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <DurationSelector onChange={onChange} seconds={value} />
      )}
    />
  )
}

export default RegularitySelect
