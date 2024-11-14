'use client'

import Configuration from '@/modules/emergency-unlock/components/configuration/Configuration'
import type { PartnerConfigurationForPublic } from '@chasterapp/chaster-js'

type Props = {
  configuration: PartnerConfigurationForPublic
  token: string
}

const EmergencyUnlockConfigurationView = ({ configuration, token }: Props) => {
  return <Configuration partnerConfiguration={configuration} token={token} />
}

export default EmergencyUnlockConfigurationView
