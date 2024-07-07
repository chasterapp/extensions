import { Box } from '@mui/joy'
import type { SxProps } from '@mui/system'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  sx?: SxProps
}>

const MainLayout = ({ children, sx }: Props) => {
  return (
    <Box sx={{ minHeight: 'var(--app-height)', width: '100%', ...sx }}>
      {children}
    </Box>
  )
}

export default MainLayout
