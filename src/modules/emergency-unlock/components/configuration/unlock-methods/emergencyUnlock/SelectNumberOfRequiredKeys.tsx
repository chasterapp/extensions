import { useTranslation } from '@/app/i18n/client'
import { userCanSeeNbRequiredKeysInput } from '@/modules/emergency-unlock/models/emergencyUnlockConfiguration'
import type { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import FormInput from '@/modules/ui/components/inputs/FormInput'
import type { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfigurationForm>
  role: PartnerConfigurationRoleEnum
}

const SelectNumberOfRequiredKeys = ({ form, role }: Props) => {
  const { t } = useTranslation()
  const { watch, control } = form

  const wearerCanChooseNbRequiredKeys = watch('wearerCanChooseNbRequiredKeys')

  if (!userCanSeeNbRequiredKeysInput({ wearerCanChooseNbRequiredKeys, role })) {
    return null
  }

  return (
    <FormInput
      control={control}
      name="nbRequiredKeys"
      label={t('emergency_unlock.number_of_keys_required_to_unlock')}
      type="number"
      slotProps={{ input: { min: 1 } }}
    />
  )
}

export default SelectNumberOfRequiredKeys
