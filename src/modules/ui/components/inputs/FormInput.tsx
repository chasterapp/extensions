import { FormControl, FormLabel, Input } from '@mui/joy'
import type { ComponentProps } from 'react'
import type { Path } from 'react-hook-form'
import { Controller, type Control, type FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof Input>,
  'value' | 'onChange' | 'onBlur'
> & {
  control: Control<T>
  name: Path<T>
  label: React.ReactNode
}

const FormInput = <T extends FieldValues>({
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
        render={({ field: { value, onChange, onBlur } }) => (
          <Input value={value} onChange={onChange} onBlur={onBlur} {...rest} />
        )}
      />
    </FormControl>
  )
}

export default FormInput
