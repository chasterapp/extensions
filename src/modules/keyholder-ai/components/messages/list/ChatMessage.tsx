import { Avatar, Box, Stack, Typography } from '@mui/joy'
import { format } from 'date-fns'
import { ActionList } from '../actions/ActionList'
import type { PartnerDoActionDto } from '@chasterapp/chaster-js'

type Props = {
  message: string
  timestamp: string
  isUser: boolean
  avatarUrl?: string
  name: string
  actions?: PartnerDoActionDto[]
}

export function ChatMessage({
  message,
  timestamp,
  isUser,
  avatarUrl,
  name,
  actions = [],
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: 2,
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      <Avatar src={avatarUrl} alt={name} />
      <Box
        sx={{
          maxWidth: '70%',
          backgroundColor: isUser ? 'primary.softBg' : 'neutral.softBg',
          p: 2,
          borderRadius: 'sm',
        }}
      >
        <Typography level="body-sm" sx={{ mb: 0.5 }}>
          {name}
        </Typography>
        <Typography level="body-md">{message}</Typography>
        <Typography level="body-xs" textColor="text.tertiary" sx={{ mt: 0.5 }}>
          {format(new Date(timestamp), 'HH:mm')}
        </Typography>
        <ActionList actions={actions} />
      </Box>
    </Stack>
  )
}
