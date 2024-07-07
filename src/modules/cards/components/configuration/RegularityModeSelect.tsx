import { RegularityMode } from '@/modules/cards/models/regularity-mode'
import FormSelect from '@/modules/ui/components/inputs/FormSelect'
import { Option } from '@mui/joy'
import type { Path } from 'react-hook-form'
import { type Control, type FieldValues } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
}

const RegularityModeSelect = <T extends FieldValues>({
  control,
  name,
}: Props<T>) => {
  return (
    <FormSelect control={control} name={name} label="Regularity mode">
      <Option value={RegularityMode.NonCumulative}>Non cumulative</Option>
      <Option value={RegularityMode.Cumulative}>Cumulative</Option>
    </FormSelect>
  )
}

export default RegularityModeSelect
