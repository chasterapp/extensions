import { useTranslation } from '@/app/i18n/client'
import UnlockMethodChoice from '@/modules/emergency-unlock/components/configuration/UnlockMethodChoice'
import UnlockMethodConfiguration from '@/modules/emergency-unlock/components/configuration/unlock-methods/UnlockMethodConfiguration'
import type { EmergencyUnlockConfiguration } from '@/modules/emergency-unlock/models/emergency-unlock-configuration'
import type { PartnerConfigurationForPublic } from '@chasterapp/chaster-js'
import { Divider, Stack, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'

type Props = {
  partnerConfiguration: PartnerConfigurationForPublic
}

const Configuration = ({ partnerConfiguration }: Props) => {
  const { t } = useTranslation()

  const role = (
    partnerConfiguration as unknown as { role: 'wearer' | 'keyholder' }
  ).role

  const form = useForm<EmergencyUnlockConfiguration>({
    defaultValues: partnerConfiguration.config as EmergencyUnlockConfiguration,
  })

  return (
    <Stack p={2} gap={2}>
      <Typography>
        {role === 'keyholder'
          ? t('emergency_unlock.description_for_keyholder')
          : t('emergency_unlock.description_for_wearer')}
      </Typography>
      <Divider />
      <UnlockMethodChoice role={role} form={form} />
      <UnlockMethodConfiguration role={role} form={form} />
    </Stack>
  )
}

export default Configuration
