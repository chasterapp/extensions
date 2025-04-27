import FormTextarea from '@/modules/ui/components/inputs/FormTextarea'
import { Button, Stack } from '@mui/joy'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const conversationFormSchema = z.object({
  keyholderId: z.string().min(1, 'Please select a keyholder'),
  message: z.string().min(1, 'Please enter a message'),
})

type ConversationFormData = z.infer<typeof conversationFormSchema>

type Props = {
  onSubmit: (data: ConversationFormData) => void
  form: UseFormReturn<ConversationFormData>
}

export function FirstMessageForm({ onSubmit, form }: Props) {
  const { handleSubmit, watch, control } = form

  const currentKeyholderId = watch('keyholderId')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormTextarea
          control={control}
          name="message"
          label="Start a conversation"
          placeholder="Type your message here..."
        />

        <Button type="submit" disabled={!currentKeyholderId}>
          Start Conversation
        </Button>
      </Stack>
    </form>
  )
}
