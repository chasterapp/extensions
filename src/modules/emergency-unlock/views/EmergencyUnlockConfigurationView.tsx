'use client'

import Configuration from '@/modules/emergency-unlock/components/configuration/Configuration'
import type { PartnerConfigurationForPublic } from '@chasterapp/chaster-js'

type Props = {
  configuration: PartnerConfigurationForPublic
  token: string
}

const EmergencyUnlockConfigurationView = ({ configuration }: Props) => {
  return <Configuration partnerConfiguration={configuration} />
}

export default EmergencyUnlockConfigurationView
