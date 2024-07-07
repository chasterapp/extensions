import { Checkbox } from '@mui/joy'
import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof Checkbox>,
  'onChange' | 'onBlur'
> & {
  control: Control<T>
  name: Path<T>
}

const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Checkbox
          name={name}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      )}
    />
  )
}

export default FormCheckbox
