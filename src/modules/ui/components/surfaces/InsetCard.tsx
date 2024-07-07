import { Card } from '@mui/joy'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof Card>

const InsetCard = (props: Props) => {
  return (
    <Card
      {...props}
      sx={{
        ...props.sx,
        backgroundColor: '#292735',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 10px inset',
        borderRadius: '0.625rem',
        padding: '0.625rem',
      }}
    />
  )
}

export default InsetCard
