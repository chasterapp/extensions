import FormSelect from '@/modules/ui/components/inputs/FormSelect'
import { Option } from '@mui/joy'
import type { Path } from 'react-hook-form'
import { type Control, type FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
}

const NumberOfKeysRequired = <T extends FieldValues>({
  control,
  name,
}: Props<T>) => {
  return (
    <FormSelect control={control} name={name} label="Number of keys required">
      <Option value={1}>One key</Option>
      <Option value={-1}>All keys</Option>
    </FormSelect>
  )
}

export default NumberOfKeysRequired
