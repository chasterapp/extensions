import { useSession } from '@/modules/extensions/stores/session-store'
import type { ConversationGet } from '@/modules/keyholder-ai/domain/models/conversation-get'
import { ChatMessage } from './ChatMessage'

type Props = {
  conversation: ConversationGet
}

export function MessageList({ conversation }: Props) {
  const { userId } = useSession()

  return (
    <>
      {conversation.messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.content}
          timestamp={message.createdAt.toISOString()}
          isUser={message.userId === userId}
          avatarUrl={
            message.userId === userId
              ? undefined
              : conversation.keyholder.avatarUrl
          }
          name={message.userId === userId ? 'You' : conversation.keyholder.name}
          actions={message.actions}
        />
      ))}
    </>
  )
}
