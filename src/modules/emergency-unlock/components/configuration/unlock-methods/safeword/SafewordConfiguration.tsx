import { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import FormRadioGroup from '@/modules/ui/components/inputs/FormRadioGroup'
import {
  Divider,
  FormControl,
  FormHelperText,
  Radio,
  Stack,
  Typography,
} from '@mui/joy'
import { useId } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import SafewordInput from './SafewordInput'
import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
import { userCanSeeSafewordInput } from '@/modules/emergency-unlock/models/emergencyUnlockConfiguration'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfigurationForm>
  role: PartnerConfigurationRoleEnum
}

const SafewordConfiguration = ({ role, form }: Props) => {
  const { t } = useTranslation()
  const { control } = form
  const id = useId()
  const descriptionId = useId()

  return (
    <>
      <Divider />
      <Typography component="h2" level="title-lg">
        {t('emergency_unlock.safeword')}
      </Typography>
      <Stack gap={0.5}>
        <Typography component="h3" level="title-md" id={id}>
          {t('emergency_unlock.safeword_configuration')}
        </Typography>
        <Typography id={descriptionId}>
          {t('emergency_unlock.safeword_configuration_description')}
        </Typography>
      </Stack>
      <FormRadioGroup
        control={control}
        name="wearerCanChooseSafeword"
        aria-labelledby={id}
        aria-describedby={descriptionId}
      >
        <Stack gap={1}>
          <FormControl>
            <Radio
              overlay
              value={true}
              label={t('emergency_unlock.let_wearer_choose_safeword')}
            />
            <FormHelperText>
              {t('emergency_unlock.let_wearer_choose_safeword_description')}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Radio
              overlay
              value={false}
              label={t('emergency_unlock.enter_the_safeword')}
            />
            <FormHelperText>
              {t('emergency_unlock.enter_the_safeword_description')}
            </FormHelperText>
          </FormControl>
        </Stack>
      </FormRadioGroup>
      <SafewordInput form={form} role={role} />
    </>
  )
}

export default SafewordConfiguration
