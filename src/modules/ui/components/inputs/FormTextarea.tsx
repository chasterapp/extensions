import { FormControl, FormLabel, Textarea } from '@mui/joy'
import type { ComponentProps } from 'react'
import type { Path } from 'react-hook-form'
import { Controller, type Control, type FieldValues } from 'react-hook-form'
import { FormErrorMessage } from './FormErrorMessage'

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof Textarea>,
  'value' | 'onChange' | 'onBlur'
> & {
  control: Control<T>
  name: Path<T>
  label?: React.ReactNode
  formControlProps?: ComponentProps<typeof FormControl>
}

const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  formControlProps,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormControl error={Boolean(error)} {...formControlProps}>
          {label && <FormLabel>{label}</FormLabel>}
          <Textarea
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />
          <FormErrorMessage error={error} />
        </FormControl>
      )}
    />
  )
}

export default FormTextarea
