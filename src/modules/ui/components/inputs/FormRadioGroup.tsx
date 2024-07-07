import { RadioGroup } from '@mui/joy'
import type { ComponentProps } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof RadioGroup>,
  'onChange' | 'onBlur'
> & {
  control: Control<T>
  name: Path<T>
}

const FormRadioGroup = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <RadioGroup
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          {...props}
        />
      )}
    />
  )
}

export default FormRadioGroup
