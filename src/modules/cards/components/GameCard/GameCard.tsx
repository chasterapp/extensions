import type { CardOptions } from '@/modules/cards/models/card-options'
import { Box } from '@mui/joy'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{
  card: Pick<CardOptions, 'type' | 'name'>
  badge?: React.ReactNode
  style?: React.CSSProperties
}>

const GameCard = ({ card: { type, name }, badge, children, style }: Props) => {
  const imageUrl = `/static/assets/images/cards/${type}.png`

  return (
    <Box sx={{ position: 'relative', lineHeight: 0 }}>
      <img src={imageUrl} alt={name} style={style} />
      {badge && (
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'full',
            transform: 'translate(50%, 50%)',
          }}
        >
          {badge}
        </Box>
      )}
      {children}
    </Box>
  )
}

export default GameCard
