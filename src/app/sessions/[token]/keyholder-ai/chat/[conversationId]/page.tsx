import { MessagesEntrypoint } from '@/modules/keyholder-ai/components/messages/MessagesEntrypoint'

type Props = {
  params: Promise<{
    conversationId: string
  }>
}

export default async function Page({ params }: Props) {
  const { conversationId } = await params

  return <MessagesEntrypoint conversationId={conversationId} />
}
