'use client'

import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/joy'

type Props = {
  toggleMenu: () => void
}

export function MenuToggle({ toggleMenu }: Props) {
  return (
    <IconButton variant="outlined" color="neutral" onClick={toggleMenu}>
      <Menu />
    </IconButton>
  )
}
