import { FormControl, FormLabel, Select } from '@mui/joy'
import type { ComponentProps } from 'react'
import type { Path } from 'react-hook-form'
import { Controller, type Control, type FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof Select>,
  'value' | 'onChange'
> & {
  control: Control<T>
  name: Path<T>
  label: React.ReactNode
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: Props<T>) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={(_, newValue) => {
              if (!newValue) return
              onChange(newValue)
            }}
            {...rest}
          />
        )}
      />
    </FormControl>
  )
}

export default FormSelect
