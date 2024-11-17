import { useTranslation } from '@/app/i18n/client'
import UnlockMethodChoice from '@/modules/emergency-unlock/components/configuration/UnlockMethodChoice'
import UnlockMethodConfiguration from '@/modules/emergency-unlock/components/configuration/unlock-methods/UnlockMethodConfiguration'
import {
  configurationToForm,
  formToConfiguration,
  parseConfiguration,
} from '@/modules/emergency-unlock/models/emergencyUnlockConfiguration'
import type { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import {
  PartnerConfigurationRoleEnum,
  type PartnerConfigurationForPublic,
} from '@chasterapp/chaster-js'
import { Divider, Stack, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'
import DisclaimerAlert from './DisclaimerAlert'
import { useSaveCapability } from '@/modules/base/hooks/useSaveCapability'
import { updateConfiguration } from '@/modules/cards/actions/updateConfiguration'

type Props = {
  partnerConfiguration: PartnerConfigurationForPublic
  token: string
}

const Configuration = ({ partnerConfiguration, token }: Props) => {
  const { t } = useTranslation()
  const role = partnerConfiguration.role
  const form = useForm<EmergencyUnlockConfigurationForm>({
    defaultValues: configurationToForm(
      parseConfiguration(partnerConfiguration.config),
    ),
  })

  useSaveCapability({
    onSave: async () => {
      const configuration = formToConfiguration({
        form: form.getValues(),
        role,
      })
      console.log(JSON.stringify(configuration))

      await updateConfiguration({ token, configuration })
    },
  })

  return (
    <Stack p={2} gap={2}>
      <Typography>
        {role === PartnerConfigurationRoleEnum.Keyholder
          ? t('emergency_unlock.description_for_keyholder')
          : t('emergency_unlock.description_for_wearer')}
      </Typography>
      <Divider />
      <UnlockMethodChoice role={role} form={form} />
      <UnlockMethodConfiguration role={role} form={form} />
      <Divider />
      <DisclaimerAlert role={role} />
    </Stack>
  )
}

export default Configuration
