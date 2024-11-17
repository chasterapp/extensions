import { useTranslation } from '@/app/i18n/client'
import { userCanSeeSafewordInput } from '@/modules/emergency-unlock/models/emergencyUnlockConfiguration'
import type { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import FormInput from '@/modules/ui/components/inputs/FormInput'
import type { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfigurationForm>
  role: PartnerConfigurationRoleEnum
}

const SafewordInput = ({ form, role }: Props) => {
  const { t } = useTranslation()
  const { watch, control } = form

  const wearerCanChooseSafeword = watch('wearerCanChooseSafeword')

  if (!userCanSeeSafewordInput({ wearerCanChooseSafeword, role })) {
    return null
  }

  return (
    <FormInput
      control={control}
      name="safeword"
      label={t('emergency_unlock.safeword')}
    />
  )
}

export default SafewordInput
