import EmergencyKeyItemCard from '@/modules/emergency-unlock/components/configuration/EmergencyKeyItemCard'
import SelectNumberOfRequiredKeys from '@/modules/emergency-unlock/components/configuration/unlock-methods/emergencyUnlock/SelectNumberOfRequiredKeys'
import type { EmergencyUnlockConfigurationForm } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import FormRadioGroup from '@/modules/ui/components/inputs/FormRadioGroup'
import type { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'
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

type Props = {
  form: UseFormReturn<EmergencyUnlockConfigurationForm>
  role: PartnerConfigurationRoleEnum
}

const EmergencyKeyConfiguration = ({ role, form }: Props) => {
  const { t } = useTranslation()
  const { control } = form
  const id = useId()
  const descriptionId = useId()

  return (
    <>
      <Divider />
      <Typography component="h2" level="title-lg">
        {t('emergency_unlock.emergency_keys')}
      </Typography>
      <EmergencyKeyItemCard role={role} />
      <Stack gap={0.5}>
        <Typography component="h3" level="title-md" id={id}>
          {t('emergency_unlock.emergency_key_configuration')}
        </Typography>
        <Typography id={descriptionId}>
          {t('emergency_unlock.emergency_key_configuration_description')}
        </Typography>
      </Stack>
      <FormRadioGroup
        control={control}
        name="wearerCanChooseNbRequiredKeys"
        aria-labelledby={id}
        aria-describedby={descriptionId}
      >
        <Stack gap={1}>
          <FormControl>
            <Radio
              overlay
              value={true}
              label={t('emergency_unlock.let_wearer_choose_number_of_keys')}
            />
            <FormHelperText>
              {t(
                'emergency_unlock.let_wearer_choose_number_of_keys_description',
              )}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Radio
              overlay
              value={false}
              label={t('emergency_unlock.select_number_of_keys')}
            />
            <FormHelperText>
              {t('emergency_unlock.select_number_of_keys_description')}
            </FormHelperText>
          </FormControl>
        </Stack>
      </FormRadioGroup>
      <SelectNumberOfRequiredKeys form={form} role={role} />
    </>
  )
}

export default EmergencyKeyConfiguration
