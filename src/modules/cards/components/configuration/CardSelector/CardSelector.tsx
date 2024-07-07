import CardItem from '@/modules/cards/components/configuration/CardSelector/CardItem'
import type { CardSelectorCategory } from '@/modules/cards/components/configuration/CardSelector/types'
import type { CardConfigurationInitialCard } from '@/modules/cards/models/card-configuration'
import { Box, Typography } from '@mui/joy'

export type Props = {
  /**
   * The value of the form
   */
  value: CardConfigurationInitialCard[]

  /**
   * Callback when the value changes
   */
  onChange: (val: CardConfigurationInitialCard[]) => void

  /**
   * If true, the user can only view the number of cards
   */
  readonly?: boolean

  /**
   * If true, the user can select a minimum and maximum number of cards
   */
  isRangeSelect?: boolean

  categories: CardSelectorCategory[]
}

const CardSelector = ({
  value,
  onChange,
  readonly = false,
  isRangeSelect,
  categories,
}: Props) => (
  <>
    {categories.map((category) => (
      <Box key={category.category.type} gap={3}>
        <Typography component="h3" level="h3" mb={3}>
          {category.category.name}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
          rowGap={4}
          columnGap={1}
        >
          {category.cards.map((card) => (
            <CardItem
              key={card.type}
              card={card}
              value={
                value.find((val) => val.type === card.type) || {
                  type: card.type,
                  min: 0,
                  max: 0,
                }
              }
              setValue={(val) => {
                const index = value.findIndex((v) => v.type === card.type)
                const newValue = [...value]

                if (index === -1) {
                  newValue.push(val)
                } else {
                  newValue[index] = val
                }

                onChange(newValue)
              }}
              readonly={readonly}
              isRangeSelect={isRangeSelect}
            />
          ))}
        </Box>
      </Box>
    ))}
  </>
)

export default CardSelector
