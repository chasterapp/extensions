import EmergencyKeyConfiguration from '@/modules/emergency-unlock/components/configuration/unlock-methods/EmergencyKeyConfiguration'
import SafewordConfiguration from '@/modules/emergency-unlock/components/configuration/unlock-methods/SafewordConfiguration'
import type { EmergencyUnlockConfiguration } from '@/modules/emergency-unlock/models/emergency-unlock-configuration'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfiguration>
  role: 'keyholder' | 'wearer'
}

const UnlockMethodConfiguration = ({ form, role }: Props) => {
  const { watch } = form

  return (
    <>
      {watch('emergencyKey.allowed') && (
        <EmergencyKeyConfiguration form={form} role={role} />
      )}
      {watch('safeword.allowed') && (
        <SafewordConfiguration form={form} role={role} />
      )}
    </>
  )
}

export default UnlockMethodConfiguration
