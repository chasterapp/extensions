import EmergencyKeyConfiguration from '@/modules/emergency-unlock/components/configuration/unlock-methods/emergencyUnlock/EmergencyKeyConfiguration'
import SafewordConfiguration from '@/modules/emergency-unlock/components/configuration/unlock-methods/safeword/SafewordConfiguration'
import { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfigurationForm>
  role: PartnerConfigurationRoleEnum
}

const UnlockMethodConfiguration = ({ form, role }: Props) => {
  const { watch } = form

  return (
    <>
      {watch('emergencyKeyAllowed') && (
        <EmergencyKeyConfiguration form={form} role={role} />
      )}
      {watch('safewordAllowed') && (
        <SafewordConfiguration form={form} role={role} />
      )}
    </>
  )
}

export default UnlockMethodConfiguration
