import type {
  EmergencyUnlockConfiguration,
  EmergencyUnlockConfigurationForm,
} from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import { emergencyUnlockConfigurationSchema } from '@/modules/emergency-unlock/types/emergencyUnlockConfiguration'
import { defaultConfiguration } from '@/modules/emergency-unlock/data/defaultConfiguration'
import { PartnerConfigurationRoleEnum } from '@chasterapp/chaster-js'

export const parseConfiguration = (config: unknown) => {
  try {
    return emergencyUnlockConfigurationSchema.parse(config)
  } catch (error) {
    console.error(error)
    return defaultConfiguration
  }
}

export const configurationToForm = (
  config: EmergencyUnlockConfiguration,
): EmergencyUnlockConfigurationForm => {
  return {
    emergencyKeyAllowed: config.emergencyKey.allowed,
    safewordAllowed: config.safeword.allowed,
    wearerCanChooseNbRequiredKeys:
      config.emergencyKey.wearerCanChooseNbRequiredKeys,
    wearerCanChooseSafeword: config.safeword.wearerCanChooseSafeword,
    nbRequiredKeys: config.emergencyKey.nbRequiredKeys?.toString() || '1',
    safeword: config.safeword.safeword || '',
  }
}

type FormAndRole = {
  form: EmergencyUnlockConfigurationForm
  role: PartnerConfigurationRoleEnum
}

export const userCanSeeNbRequiredKeysInput = ({
  wearerCanChooseNbRequiredKeys,
  role,
}: {
  wearerCanChooseNbRequiredKeys: boolean
  role: PartnerConfigurationRoleEnum
}) =>
  (role === PartnerConfigurationRoleEnum.Wearer &&
    wearerCanChooseNbRequiredKeys) ||
  (role === PartnerConfigurationRoleEnum.Keyholder &&
    !wearerCanChooseNbRequiredKeys)

export const userCanSeeSafewordInput = ({
  wearerCanChooseSafeword,
  role,
}: {
  wearerCanChooseSafeword: boolean
  role: PartnerConfigurationRoleEnum
}) =>
  (role === PartnerConfigurationRoleEnum.Wearer && wearerCanChooseSafeword) ||
  (role === PartnerConfigurationRoleEnum.Keyholder && !wearerCanChooseSafeword)

export const formToConfiguration = ({
  form,
  role,
}: FormAndRole): EmergencyUnlockConfiguration => {
  const nbRequiredKeys = +form.nbRequiredKeys
  const shouldSetNbRequiredKeys =
    userCanSeeNbRequiredKeysInput({
      wearerCanChooseNbRequiredKeys: form.wearerCanChooseNbRequiredKeys,
      role,
    }) && nbRequiredKeys >= 1
  const shouldSetSafeword =
    userCanSeeSafewordInput({
      wearerCanChooseSafeword: form.wearerCanChooseSafeword,
      role,
    }) && form.safeword !== ''

  return {
    emergencyKey: {
      allowed: form.emergencyKeyAllowed,
      wearerCanChooseNbRequiredKeys: form.wearerCanChooseNbRequiredKeys,
      nbRequiredKeys: shouldSetNbRequiredKeys ? nbRequiredKeys : undefined,
    },
    safeword: {
      allowed: form.safewordAllowed,
      wearerCanChooseSafeword: form.wearerCanChooseSafeword,
      safeword: shouldSetSafeword ? form.safeword : undefined,
    },
  }
}
