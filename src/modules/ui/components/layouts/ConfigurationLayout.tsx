'use client'

import { WindowEventsProvider } from '@/modules/base/contexts/WindowEventsContext'
import { Box } from '@mui/joy'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import type { PropsWithChildren } from 'react'

const ConfigurationLayout = ({ children }: PropsWithChildren) => {
  return (
    <WindowEventsProvider>
      <Box sx={{ margin: 'auto', maxWidth: '42rem' }}>{children}</Box>
    </WindowEventsProvider>
  )
}

export default ConfigurationLayout
