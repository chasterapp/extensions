import { Add, Remove } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/joy'

export type Props = {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
}

const NumberSelector = ({ min, max, value, onChange }: Props) => {
  const minDisabled = min !== undefined && value <= min
  const maxDisabled = max !== undefined && value >= max

  const remove = () => {
    if (minDisabled) return
    onChange(value - 1)
  }

  const add = () => {
    if (maxDisabled) return
    onChange(value + 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <IconButton
        size="sm"
        color="primary"
        variant="solid"
        onClick={() => remove()}
        disabled={minDisabled}
      >
        <Remove />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton
        size="sm"
        color="primary"
        variant="solid"
        onClick={() => add()}
        disabled={maxDisabled}
      >
        <Add />
      </IconButton>
    </Box>
  )
}

export default NumberSelector
