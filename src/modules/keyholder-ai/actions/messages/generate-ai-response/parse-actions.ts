import type { PartnerDoActionDto } from '@chasterapp/chaster-js'
import dayjs from '@/lib/dayjs'
import { z } from 'zod'

function durationToSeconds(durationStr: string): number {
  const duration = dayjs.duration(durationStr)
  if (duration.asSeconds() === 0 || Number.isNaN(duration.asSeconds())) {
    throw new Error('Invalid duration')
  }
  return duration.asSeconds()
}

const addTimeActionSchema = z.object({
  name: z.literal('add_time'),
  params: z.string().transform(durationToSeconds),
})

const removeTimeActionSchema = z.object({
  name: z.literal('remove_time'),
  params: z.string().transform(durationToSeconds),
})

const freezeActionSchema = z.object({
  name: z.literal('freeze'),
})

const unfreezeActionSchema = z.object({
  name: z.literal('unfreeze'),
})

const pilloryActionSchema = z.object({
  name: z.literal('pillory'),
  params: z.object({
    duration: z.string().transform(durationToSeconds),
    reason: z.string().optional(),
  }),
})

// Union of all possible actions
const actionSchema = z.discriminatedUnion('name', [
  addTimeActionSchema,
  removeTimeActionSchema,
  freezeActionSchema,
  unfreezeActionSchema,
  pilloryActionSchema,
])

export function parseActions(aiResponse: string): PartnerDoActionDto[] {
  // Find all action markers in the response
  const actionMatches = aiResponse.match(/\[ACTION(.*?)\]/g)
  if (!actionMatches) return []

  return actionMatches
    .map((match) => {
      try {
        const jsonContent = match.slice(7, -1) // Remove [ACTION and ]
        const validatedAction = actionSchema.parse(JSON.parse(jsonContent))

        return { action: validatedAction } as PartnerDoActionDto
      } catch (error) {
        console.error('Failed to parse action:', error)
        return null
      }
    })
    .filter((action): action is PartnerDoActionDto => action !== null)
}
