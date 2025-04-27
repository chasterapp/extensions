'use client'

import { useSession } from '@/modules/extensions/stores/session-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@mui/joy'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createConversation } from '../../actions/conversation'
import type { Keyholder } from '../../domain/models/keyholder'
import { FirstMessageForm } from './FirstMessageForm'
import { KeyholderCard } from './KeyholderCard'

const conversationFormSchema = z.object({
  keyholderId: z.string().min(1, 'Please select a keyholder'),
  message: z.string().min(1, 'Please enter a message'),
})

type ConversationFormData = z.infer<typeof conversationFormSchema>

type Props = {
  keyholders: Keyholder[]
}

export function KeyholderList({ keyholders }: Props) {
  const { userId, token } = useSession()
  const router = useRouter()

  const form = useForm<ConversationFormData>({
    resolver: zodResolver(conversationFormSchema),
  })

  const handleSubmit = async (formData: ConversationFormData) => {
    try {
      const conversation = await createConversation(
        formData.keyholderId,
        userId,
        formData.message,
      )
      router.push(`/sessions/${token}/keyholder-ai/chat/${conversation.id}`)
    } catch (error) {
      console.error('Failed to create conversation:', error)
      // TODO: Add error handling UI
    }
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Grid container spacing={2}>
            {keyholders.map((keyholder) => (
              <Grid key={keyholder.id} xs={12} sm={6} md={4}>
                <KeyholderCard
                  {...keyholder}
                  selected={form.watch('keyholderId') === keyholder.id}
                  onClick={() => form.setValue('keyholderId', keyholder.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid xs={12} md={4}>
          <FirstMessageForm form={form} onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </Box>
  )
}
