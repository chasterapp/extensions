import FormTextarea from '@/modules/ui/components/inputs/FormTextarea'
import { Box, Button } from '@mui/joy'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<{ message: string }>
  isSending: boolean
  onSubmit: (data: { message: string }) => void
}

export function ChatInput({ form, isSending, onSubmit }: Props) {
  const { handleSubmit, control } = form

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit(onSubmit)()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          gap: 2,
          display: 'flex',
        }}
      >
        <FormTextarea
          formControlProps={{
            sx: { flex: 1 },
          }}
          control={control}
          name="message"
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={4}
          sx={{ flex: 1 }}
          disabled={isSending}
        />
        <Button type="submit" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send'}
        </Button>
      </Box>
    </form>
  )
}
