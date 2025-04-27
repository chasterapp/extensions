'use client'

import { ConversationList } from '@/modules/keyholder-ai/components/conversations/menu/ConversationList'
import { Box, Sheet, Typography } from '@mui/joy'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { MenuToggle } from './MenuToggle'
import { NewChatButton } from './header/NewChatButton'
import { SuspenseErrorBoundary } from '@/modules/ui/components/layouts/SuspenseErrorBoundary'

type Props = {
  children: ReactNode
}

export function LayoutContent({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <Box sx={{ display: 'flex', height: '100vh' }} component="nav">
      <Sheet
        sx={{
          width: isMenuOpen ? 280 : 0,
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'width 0.2s',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
          <SuspenseErrorBoundary>
            <ConversationList />
          </SuspenseErrorBoundary>
        </Box>
      </Sheet>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Sheet
          sx={{
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <MenuToggle toggleMenu={() => setIsMenuOpen((prev) => !prev)} />
          <Typography level="h1" fontSize="lg">
            Chat
          </Typography>
          <Box sx={{ flex: 1 }} />
          <NewChatButton />
        </Sheet>
        <Box sx={{ flex: 1, overflow: 'auto' }} component="main">
          {children}
        </Box>
      </Box>
    </Box>
  )
}
