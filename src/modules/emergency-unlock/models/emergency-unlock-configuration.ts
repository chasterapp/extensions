type UnlockKeyConfiguration = {
  allowed: boolean
  wearerCanChooseNbRequiredKeys: boolean
  nbRequiredKeys: number | null
}

type SafewordConfiguration = {
  allowed: boolean
  wearerCanChooseSafeword: boolean
  safeword: string | null
}

export type EmergencyUnlockConfiguration = {
  emergencyKey: UnlockKeyConfiguration
  safeword: SafewordConfiguration
}
