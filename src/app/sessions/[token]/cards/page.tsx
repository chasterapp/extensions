import { getSessionAuth } from '@/modules/init/actions/getSessionAuth'

type Props = {
  params: {
    token: string
  }
}

export default async function Page({ params: { token } }: Props) {
  const data = await getSessionAuth(token)

  return <div>{JSON.stringify(data)}</div>
}
