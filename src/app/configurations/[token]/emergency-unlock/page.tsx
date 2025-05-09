import EmergencyUnlockConfigurationView from '@/modules/emergency-unlock/views/EmergencyUnlockConfigurationView'
import { getConfiguration } from '@/modules/extensions/actions/get-configuration'

type Props = {
  params: {
    token: string
  }
}

export default async function Page({ params: { token } }: Props) {
  const configuration = await getConfiguration(token)

  return (
    <EmergencyUnlockConfigurationView
      configuration={configuration}
      token={token}
    />
  )
}
