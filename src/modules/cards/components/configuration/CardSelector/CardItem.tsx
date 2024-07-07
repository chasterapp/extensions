import { useState } from 'react'

import GameCard from '@/modules/cards/components/GameCard/GameCard'
import type { CardConfigurationInitialCard } from '@/modules/cards/models/card-configuration'
import type { CardOptions } from '@/modules/cards/models/card-options'
import { Add, Edit, InfoOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy'
import CardModal from './CardModal'
import NumberSelector from '@/modules/ui/components/inputs/NumberSelector'

export type Props = {
  card: Pick<CardOptions, 'name' | 'type' | 'description'>
  value: CardConfigurationInitialCard
  setValue: (val: CardConfigurationInitialCard) => void
  readonly: boolean
  isRangeSelect?: boolean
}

const CardItem = ({
  card,
  value,
  setValue,
  readonly,
  isRangeSelect,
}: Props) => {
  const { min, max } = value
  const selected = min > 0 || max > 0
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Stack gap={2}>
      <CardModal
        card={card}
        value={value}
        setValue={setValue}
        readonly={readonly}
        isRangeSelect={isRangeSelect}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Box sx={{ maxWidth: '100px', marginX: 'auto' }}>
        <GameCard card={card} style={{ width: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '-16px',
              right: '-16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              size="sm"
              variant="solid"
              onClick={() => setModalOpen(true)}
            >
              <InfoOutlined />
            </IconButton>
          </Box>
        </GameCard>
        <Box mt={1}>
          <Typography level="title-sm" fontWeight="bold" textAlign="center">
            {card.name}
          </Typography>
        </Box>
      </Box>
      <div>
        {selected ? (
          <>
            {isRangeSelect ? (
              <Stack direction="row" alignItems="center">
                <Box flex={1}>
                  <Typography textAlign="center" fontWeight="bold">
                    {min} - {max}
                  </Typography>
                </Box>
                {!readonly && (
                  <Box>
                    <IconButton
                      size="sm"
                      variant="solid"
                      color="primary"
                      onClick={() => setModalOpen(true)}
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                )}
              </Stack>
            ) : readonly ? (
              <Box flex={1}>{min}</Box>
            ) : (
              <NumberSelector
                value={min}
                min={0}
                onChange={(val) => setValue({ ...value, min: val, max: val })}
              />
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            {readonly ? (
              <div className="font-bold">0</div>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  setValue({ ...value, min: 1, max: 1 })
                  setModalOpen(true)
                }}
                startDecorator={<Add />}
              >
                Add
              </Button>
            )}
          </Box>
        )}
      </div>
    </Stack>
  )
}

export default CardItem
