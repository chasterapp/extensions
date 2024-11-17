import { Radio, RadioGroup } from '@mui/joy'
import type { ComponentProps, ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

type Props<T extends FieldValues> = Omit<
  ComponentProps<typeof RadioGroup>,
  'onChange' | 'onBlur'
> & {
  control: Control<T>
  name: Path<T>
}

type Children = {
  type: unknown
  props: {
    children: ReactNode
    value?: string
  }
}

const findRadioValues = (children?: ReactNode) => {
  const radioValues: string[] = []
  for (const child of [children as Children].flat(Infinity)) {
    if (child?.type === Radio && child?.props?.value !== undefined) {
      radioValues.push(child.props.value)
    } else if (child?.props?.children) {
      radioValues.push(...findRadioValues(child?.props?.children))
    }
  }
  return radioValues
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
      render={({ field: { onChange, onBlur, value }, fieldState: {} }) => (
        <RadioGroup
          name={name}
          onChange={(event) => {
            const radioValues = findRadioValues(props.children)
            const associatedField =
              radioValues.find(
                (radioValue) => radioValue.toString() === event.target.value,
              ) ?? event.target.value
            onChange(associatedField)
          }}
          onBlur={onBlur}
          value={value}
          {...props}
        />
      )}
    />
  )
}

export default FormRadioGroup
