import GameCard from '@/modules/cards/components/GameCard/GameCard'
import type { CardConfigurationInitialCard } from '@/modules/cards/models/card-configuration'
import type { CardOptions } from '@/modules/cards/models/card-options'
import NumberSelector from '@/modules/ui/components/inputs/NumberSelector'
import { Add } from '@mui/icons-material'
import { Box, Button, Stack, Typography } from '@mui/joy'

export type Props = {
  value: CardConfigurationInitialCard
  setValue: (val: CardConfigurationInitialCard) => void
  card: Pick<CardOptions, 'name' | 'type' | 'description'>
  readonly?: boolean
  isRangeSelect?: boolean
}

const CardDescription = ({
  card,
  value,
  setValue,
  readonly,
  isRangeSelect,
}: Props) => {
  const { min, max } = value
  const selected = min > 0 || max > 0

  return (
    <Stack direction="row" gap={2}>
      <GameCard card={card} style={{ height: '128px' }} />
      <Stack sx={{ flexGrow: 1 }} gap={3}>
        <Stack gap={1}>
          <Typography component="h2" level="title-md" fontWeight="bold">
            {card.name}
          </Typography>
          <div>{card.description}</div>
        </Stack>
        {!readonly && (
          <Box>
            {selected ? (
              <Stack direction="row" gap={2} sx={{ alignItems: 'center' }}>
                <Box sx={{ maxWidth: '8rem' }}>
                  <NumberSelector
                    value={min}
                    min={0}
                    onChange={(val) =>
                      setValue({
                        ...value,
                        min: val,
                        max: val > max ? val : max,
                      })
                    }
                  />
                </Box>
                {isRangeSelect && (
                  <>
                    <Box>to</Box>
                    <Box sx={{ maxWidth: '8rem' }}>
                      <NumberSelector
                        value={max}
                        onChange={(val) =>
                          setValue({
                            ...value,
                            max: val,
                            min: val < min ? val : min,
                          })
                        }
                      />
                    </Box>
                  </>
                )}
              </Stack>
            ) : (
              <Button
                size="sm"
                onClick={() => setValue({ ...value, min: 1, max: 1 })}
                startDecorator={<Add />}
              >
                Add
              </Button>
            )}
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default CardDescription
