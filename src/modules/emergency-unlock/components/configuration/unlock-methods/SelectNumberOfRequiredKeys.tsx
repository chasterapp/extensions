import { useTranslation } from '@/app/i18n/client'
import type { EmergencyUnlockConfiguration } from '@/modules/emergency-unlock/models/emergency-unlock-configuration'
import FormInput from '@/modules/ui/components/inputs/FormInput'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfiguration>
  role: 'keyholder' | 'wearer'
}

const SelectNumberOfRequiredKeys = ({ form }: Props) => {
  const { t } = useTranslation()
  const { watch, control } = form

  if (!watch('emergencyKey.wearerCanChooseNbRequiredKeys')) return null

  return (
    <FormInput
      control={control}
      name="emergencyKey.nbRequiredKeys"
      label={t('emergency_unlock.number_of_keys_required_to_unlock')}
      type="number"
      slotProps={{ input: { min: 1 } }}
    />
  )
}

export default SelectNumberOfRequiredKeys
