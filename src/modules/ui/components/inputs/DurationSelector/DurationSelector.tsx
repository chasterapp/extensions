import DurationSelectorItem from './DurationSelectorItem/DurationSelectorItem'
import { Box } from '@mui/joy'

type Props = {
  seconds: number
  minDuration?: number
  maxDuration?: number
  onChange: (seconds: number) => void
}

const DurationSelector = ({
  seconds,
  minDuration,
  maxDuration,
  onChange,
}: Props) => {
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  const durationChanged = (unit: 'day' | 'hour' | 'minute', amount: number) => {
    let multiplier = 0
    if (unit === 'day') multiplier = 86400
    else if (unit === 'hour') multiplier = 3600
    else if (unit === 'minute') multiplier = 60

    let newValue = seconds + amount * multiplier

    if (minDuration !== undefined && newValue < minDuration) {
      newValue = minDuration
    }
    if (maxDuration !== undefined && newValue > maxDuration) {
      newValue = maxDuration
    }

    if (newValue >= 0) {
      onChange(newValue)
    }
  }

  return (
    <Box
      display="flex"
      gap={1}
      className="DurationSelector"
      aria-label="Select a duration"
    >
      <DurationSelectorItem
        value={days}
        label={days > 1 ? 'days' : 'day'}
        onChange={(val) => durationChanged('day', val - days)}
        unit="day"
      />
      <DurationSelectorItem
        value={hours}
        label={hours > 1 ? 'hours' : 'hour'}
        onChange={(val) => durationChanged('hour', val - hours)}
        unit="hour"
      />
      <DurationSelectorItem
        value={minutes}
        label={minutes > 1 ? 'minutes' : 'minute'}
        onChange={(val) => durationChanged('minute', val - minutes)}
        unit="minute"
      />
    </Box>
  )
}

export default DurationSelector
