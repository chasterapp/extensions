import { Box, Stack } from '@mui/joy'
import LongPressButton from '@/modules/ui/components/inputs/LongPressButton'
import './DurationSelectorItem.css'
import { AddRounded, RemoveRounded } from '@mui/icons-material'
import RepeatableButton from '@/modules/ui/components/inputs/RepeatableButton'

type Props = {
  value: number
  label: string
  min?: number
  max?: number
  onChange: (value: number) => void
  unit: string
}

const DurationSelectorItem = ({
  label,
  value,
  onChange,
  unit,
  max,
  min,
}: Props) => {
  let strValue = value.toString()
  if (value < 10) {
    strValue = `0${strValue}`
  }

  const digits = strValue.split('')

  const add = () => {
    if (max !== undefined && max >= value) {
      return
    }
    onChange(value + 1)
  }

  const remove = () => {
    if (min !== undefined && min <= value) {
      return
    }
    onChange(value - 1)
  }

  return (
    <Stack
      sx={{
        display: 'flex',
        minWidth: '50px',
        alignItems: 'center',
      }}
      className="DurationSelectorItem duration-item"
    >
      <RepeatableButton onClick={add} aria-label={`Add ${unit}`}>
        <AddRounded />
      </RepeatableButton>
      <Box className="duration-digits" aria-hidden>
        {digits.map((digit, i) => (
          <div key={i} className="duration-digit">
            {digit}
          </div>
        ))}
      </Box>
      <div className="duration-label" aria-hidden>
        {label}
      </div>
      <RepeatableButton onClick={remove} aria-label={`Remove ${unit}`}>
        <RemoveRounded />
      </RepeatableButton>
    </Stack>
  )
}

export default DurationSelectorItem
