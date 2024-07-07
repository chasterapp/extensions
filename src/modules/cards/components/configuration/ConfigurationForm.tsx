import { useSaveCapability } from '@/modules/base/hooks/useSaveCapability'
import { updateConfiguration } from '@/modules/cards/actions/updateConfiguration'
import CardCategories from '@/modules/cards/components/configuration/CardCategories'
import type { CardSelectorCategory } from '@/modules/cards/components/configuration/CardSelector/types'
import NumberOfKeysRequired from '@/modules/cards/components/configuration/NumberOfKeysRequired'
import RegularityModeSelect from '@/modules/cards/components/configuration/RegularityModeSelect'
import RegularitySelect from '@/modules/cards/components/configuration/RegularitySelect'
import {
  cardConfigurationSchema,
  type CardConfiguration,
} from '@/modules/cards/models/card-configuration'
import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'

type Props = {
  token: string
  configuration: CardConfiguration
  categories: CardSelectorCategory[]
  isRangeSelect?: boolean
  readonly?: boolean
}

const ConfigurationForm = ({
  categories,
  configuration,
  isRangeSelect,
  readonly,
  token,
}: Props) => {
  const { control, getValues } = useForm<CardConfiguration>({
    defaultValues: configuration,
    resolver: zodResolver(cardConfigurationSchema),
  })

  useSaveCapability({
    onSave: async () => {
      await updateConfiguration({ token, configuration: getValues() })
    },
  })

  return (
    <Stack gap={2}>
      <Typography level="h2" component="h1" mt={2}>
        Edit cards
      </Typography>
      <Typography level="body-md">
        Select the cards that should be available for your users.
      </Typography>
      <RegularitySelect control={control} name="regularity" />
      <RegularityModeSelect control={control} name="regularityMode" />
      <NumberOfKeysRequired control={control} name="nbKeysRequired" />
      <CardCategories
        control={control}
        name="cards"
        categories={categories}
        readonly={readonly}
        isRangeSelect={isRangeSelect}
      />
    </Stack>
  )
}

export default ConfigurationForm
