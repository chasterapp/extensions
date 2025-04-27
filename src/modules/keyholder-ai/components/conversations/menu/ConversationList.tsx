'use client'

import { useSession } from '@/modules/extensions/stores/session-store'
import { useGetConversations } from '@/modules/keyholder-ai/queries/conversation'
import { Box, List, ListItem, ListItemButton, Typography } from '@mui/joy'
import { format } from 'date-fns'
import { useParams, useRouter } from 'next/navigation'

export function ConversationList() {
  const { token } = useSession()
  const { conversationId } = useParams<{ conversationId?: string }>()
  const { data: conversations } = useGetConversations()
  const router = useRouter()

  return (
    <Box>
      <Typography level="h2" fontSize="sm" sx={{ mb: 1 }}>
        Conversations
      </Typography>
      <List>
        {conversations.map((conversation) => (
          <ListItem key={conversation.id}>
            <ListItemButton
              selected={conversation.id === conversationId}
              onClick={() =>
                router.push(
                  `/sessions/${token}/keyholder-ai/chat/${conversation.id}`,
                )
              }
            >
              <Box sx={{ flex: 1 }}>
                <Typography level="title-sm">
                  {conversation.keyholderName}
                </Typography>
                <Typography
                  level="body-xs"
                  textColor="text.tertiary"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px',
                  }}
                >
                  {conversation.lastMessage}
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  {format(new Date(conversation.timestamp), 'MMM d, h:mm a')}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
