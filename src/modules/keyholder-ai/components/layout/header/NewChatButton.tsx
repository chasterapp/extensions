'use client'

import { Add } from '@mui/icons-material'
import { IconButton } from '@mui/joy'
import { useRouter } from 'next/navigation'
import { useSession } from '@/modules/extensions/stores/session-store'

export function NewChatButton() {
  const { token } = useSession()
  const router = useRouter()

  return (
    <IconButton
      variant="outlined"
      color="primary"
      onClick={() => router.push(`/sessions/${token}/keyholder-ai`)}
    >
      <Add />
    </IconButton>
  )
}
