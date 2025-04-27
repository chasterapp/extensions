import { Box, Card, Typography } from '@mui/joy'

type KeyholderCardProps = {
  name: string
  description: string
  avatarUrl: string
  kinks: string[]
  personalityTraits: string[]
  onClick?: () => void
  selected?: boolean
}

export function KeyholderCard({
  name,
  description,
  avatarUrl,
  kinks,
  personalityTraits,
  onClick,
  selected,
}: KeyholderCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        border: selected ? '2px solid' : undefined,
        borderColor: selected ? 'primary.500' : undefined,
      }}
    >
      <Box display="flex" gap={2}>
        <img
          src={avatarUrl}
          alt={name}
          style={{ width: 64, height: 64, borderRadius: '50%' }}
        />
        <Box>
          <Typography level="h4">{name}</Typography>
          <Typography level="body-sm">{description}</Typography>
        </Box>
      </Box>
      <Box mt={2}>
        <Typography level="body-xs" color="neutral">
          Kinks: {kinks.join(', ')}
        </Typography>
        <Typography level="body-xs" color="neutral">
          Personality: {personalityTraits.join(', ')}
        </Typography>
      </Box>
    </Card>
  )
}
