import CardsConfigurationView from '@/modules/cards/views/CardsConfigurationView'
import { getConfiguration } from '@/modules/init/actions/getConfiguration'

type Props = {
  params: {
    token: string
  }
}

export default async function Page({ params: { token } }: Props) {
  const configuration = await getConfiguration(token)

  return <CardsConfigurationView configuration={configuration} token={token} />
}
