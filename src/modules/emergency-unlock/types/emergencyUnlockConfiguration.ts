import { z } from 'zod'

export const emergencyKeyConfigurationSchema = z.object({
  allowed: z.boolean(),
  wearerCanChooseNbRequiredKeys: z.boolean(),
  nbRequiredKeys: z.number().optional(),
})

export const safewordConfigurationSchema = z.object({
  allowed: z.boolean(),
  wearerCanChooseSafeword: z.boolean(),
  safeword: z.string().optional(),
})

export const emergencyUnlockConfigurationSchema = z.object({
  emergencyKey: emergencyKeyConfigurationSchema,
  safeword: safewordConfigurationSchema,
})

export type EmergencyKeyConfiguration = z.infer<
  typeof emergencyKeyConfigurationSchema
>
export type SafewordConfiguration = z.infer<typeof safewordConfigurationSchema>
export type EmergencyUnlockConfiguration = z.infer<
  typeof emergencyUnlockConfigurationSchema
>

export type EmergencyUnlockConfigurationForm = {
  emergencyKeyAllowed: boolean
  safewordAllowed: boolean
  wearerCanChooseNbRequiredKeys: boolean
  wearerCanChooseSafeword: boolean
  nbRequiredKeys: string
  safeword: string
}
