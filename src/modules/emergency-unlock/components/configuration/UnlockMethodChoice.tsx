import type { EmergencyUnlockConfiguration } from '@/modules/emergency-unlock/models/emergency-unlock-configuration'
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

type Props = {
  form: UseFormReturn<EmergencyUnlockConfiguration>
  role: 'keyholder' | 'wearer'
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
          {t('emergency_unlock.choose_method_description_for_wearer')}
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
            control={control}
            name="emergencyKey.allowed"
            label={t('emergency_unlock.emergency_keys')}
          />
          <FormHelperText>
            {t('emergency_unlock.emergency_keys_description_for_keyholder')}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormCheckbox
            control={control}
            name="safeword.allowed"
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
            'emergencyKey.allowed',
            event.currentTarget.value === 'emergency_key',
          )
          setValue('safeword.allowed', event.currentTarget.value === 'safeword')
        }}
        value={watch('emergencyKey.allowed') ? 'emergency_key' : 'safeword'}
        aria-labelledby={id}
        aria-describedby={descriptionId}
      >
        <Stack gap={1}>
          <FormControl>
            <Radio
              value="emergency_key"
              label={t('emergency_unlock.emergency_keys')}
            />
            <FormHelperText>
              {t('emergency_unlock.emergency_keys_description_for_wearer')}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <Radio value="safeword" label={t('emergency_unlock.safeword')} />
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
