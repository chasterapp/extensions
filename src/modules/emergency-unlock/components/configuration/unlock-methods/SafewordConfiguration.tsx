import type { EmergencyUnlockConfiguration } from '@/modules/emergency-unlock/models/emergency-unlock-configuration'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfiguration>
  role: 'keyholder' | 'wearer'
}

const SafewordConfiguration = (props: Props) => {
  return <div></div>
}

export default SafewordConfiguration
