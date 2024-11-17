import type { EmergencyUnlockConfiguration } from '../types/emergencyUnlockConfiguration'

export const defaultConfiguration: EmergencyUnlockConfiguration = {
  emergencyKey: {
    allowed: true,
    wearerCanChooseNbRequiredKeys: true,
  },
  safeword: {
    allowed: true,
    wearerCanChooseSafeword: true,
  },
}
