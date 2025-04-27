import { Box, Chip, Typography } from '@mui/joy'
import {
  PilloryLockActionModelNameEnum,
  type PartnerDoActionDto,
} from '@chasterapp/chaster-js'
import { durationFullRange } from '../../../../base/lib/duration-format'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import GavelIcon from '@mui/icons-material/Gavel'

type Props = {
  action: PartnerDoActionDto
}

type ActionConfig = {
  icon: React.ReactNode
  label: string
  color: 'primary' | 'success' | 'warning' | 'danger' | 'neutral'
}

const actionConfigs: Record<string, ActionConfig> = {
  add_time: {
    icon: <AddIcon />,
    label: 'Added time',
    color: 'danger',
  },
  remove_time: {
    icon: <RemoveIcon />,
    label: 'Removed time',
    color: 'success',
  },
  freeze: {
    icon: <LockIcon />,
    label: 'Frozen',
    color: 'warning',
  },
  unfreeze: {
    icon: <LockOpenIcon />,
    label: 'Unfrozen',
    color: 'success',
  },
  pillory: {
    icon: <GavelIcon />,
    label: 'Pillory',
    color: 'warning',
  },
}

export function ActionCard({ action: { action } }: Props) {
  const config = actionConfigs[action.name] || {
    icon: null,
    label: action.name,
    color: 'neutral',
  }

  const getActionDetails = () => {
    if (
      action.name === PilloryLockActionModelNameEnum.Pillory &&
      'params' in action &&
      typeof action.params === 'object'
    ) {
      const duration = durationFullRange(action.params.duration)
      return (
        <>
          <Typography level="body-sm" sx={{ mt: 0.5 }}>
            Duration: {duration}
          </Typography>
          <Typography level="body-sm" sx={{ mt: 0.5 }}>
            Reason: {action.params.reason}
          </Typography>
        </>
      )
    }
    if (
      ['add_time', 'remove_time'].includes(action.name) &&
      'params' in action &&
      typeof action.params === 'number'
    ) {
      const duration = durationFullRange(action.params)
      return (
        <Typography level="body-sm" sx={{ mt: 0.5 }}>
          Duration: {duration}
        </Typography>
      )
    }
    return null
  }

  return (
    <Box
      sx={{
        mt: 1,
        p: 1.5,
        backgroundColor: 'background.level1',
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip size="sm" color={config.color} startDecorator={config.icon}>
          {config.label}
        </Chip>
      </Box>
      {getActionDetails()}
    </Box>
  )
}
