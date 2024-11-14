import FormCheckbox from '@/modules/ui/components/inputs/FormCheckbox'
import {
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/joy'
import { t } from 'i18next'
import { useId } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { EmergencyUnlockConfigurationForm } from '../../types/emergencyUnlockConfiguration'
import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'

type Props = {
  form: UseFormReturn<EmergencyUnlockConfigurationForm>
  role: PartnerConfigurationRoleEnum
}

const ForKeyholder = ({ form: { control } }: Pick<Props, 'form'>) => {
  const id = useId()
  const descriptionId = useId()

  return (
    <>
      <Stack gap={0.5}>
        <Typography component="h2" level="title-lg" id={id}>
          {t('emergency_unlock.emergency_unlock_method')}
        </Typography>
        <Typography id={descriptionId}>
          {t('emergency_unlock.choose_method_description_for_keyholder')}
        </Typography>
      </Stack>
      <Stack
        role="group"
        aria-labelledby={id}
        aria-describedby={descriptionId}
        gap={1}
      >
        <FormControl>
          <FormCheckbox
            overlay
            control={control}
            name="emergencyKeyAllowed"
            label={t('emergency_unlock.emergency_keys')}
          />
          <FormHelperText>
            {t('emergency_unlock.emergency_keys_description_for_keyholder')}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormCheckbox
            overlay
            control={control}
            name="safewordAllowed"
            label={t('emergency_unlock.safeword')}
          />
          <FormHelperText>
            {t('emergency_unlock.safeword_description_for_keyholder')}
          </FormHelperText>
        </FormControl>
      </Stack>
    </>
  )
}

const ForWearer = ({ form: { setValue, watch } }: Pick<Props, 'form'>) => {
  const id = useId()
  const descriptionId = useId()

  return (
    <>
      <Stack gap={0.5}>
        <Typography component="h2" level="title-lg" id={id}>
          {t('emergency_unlock.emergency_unlock_method')}
        </Typography>
        <Typography id={descriptionId}>
          {t('emergency_unlock.choose_method_description_for_wearer')}
        </Typography>
      </Stack>
      <RadioGroup
        onChange={(event) => {
          setValue(
            'emergencyKeyAllowed',
            event.currentTarget.value === 'emergency_key',
          )
          setValue('safewordAllowed', event.currentTarget.value === 'safeword')
        }}
        value={watch('emergencyKeyAllowed') ? 'emergency_key' : 'safeword'}
        aria-labelledby={id}
        aria-describedby={descriptionId}
      >
        <Stack gap={1}>
          <FormControl>
            <Radio
              overlay
              value="emergency_key"
              label={t('emergency_unlock.emergency_keys')}
            />
            <FormHelperText>
              {t('emergency_unlock.emergency_keys_description_for_wearer')}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Radio
              overlay
              value="safeword"
              label={t('emergency_unlock.safeword')}
            />
            <FormHelperText>
              {t('emergency_unlock.safeword_description_for_wearer')}
            </FormHelperText>
          </FormControl>
        </Stack>
      </RadioGroup>
    </>
  )
}

const UnlockMethodChoice = ({ role, form }: Props) =>
  role === 'keyholder' ? (
    <ForKeyholder form={form} />
  ) : (
    <ForWearer form={form} />
  )

export default UnlockMethodChoice
