import type { PartnerDoActionDto } from '@chasterapp/chaster-js'
import { Stack } from '@mui/joy'
import { ActionCard } from './ActionCard'

type Props = {
  actions: PartnerDoActionDto[]
}

export function ActionList({ actions }: Props) {
  if (!actions.length) return null

  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      {actions.map((action, index) => (
        <ActionCard key={index} action={action} />
      ))}
    </Stack>
  )
}
