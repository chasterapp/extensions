import { createApiInstance } from '@/modules/network/helpers/createApiInstance'
import { PartnerExtensionsApi } from '@chasterapp/chaster-js'
import dayjs from '@/lib/dayjs'
import { durationFullRange } from '@/modules/base/lib/duration-format'
import { lockTimeLeft } from '@/modules/base/lib/lock-time-left'

export async function fetchContextForAi(sessionId: string) {
  const {
    session: { lock },
  } = await createApiInstance(PartnerExtensionsApi)
    .getExtensionSession(sessionId)
    .then(({ data }) => data)
  const { user } = lock

  const lockedFor = dayjs().diff(dayjs(lock.createdAt), 'seconds')
  const timeLeft = lockTimeLeft(lock)

  const lockContexts = [
    `- The user is locked for ${durationFullRange(lockedFor)}.`,
    `- Time left: ${timeLeft > 0 ? durationFullRange(timeLeft) : 'Ready to be unlocked by the wearer.'}`,
    `${!lock.isAllowedToViewTime ? '- The wearer is NOT ALLOWED to view the time left on the lock. Never communicate this information to the wearer.' : ''}`,
  ]

  const lockContextForAi = `
Here is the context of the current lock:
${lockContexts.filter(Boolean).join('\n')}
  `

  const userContexts = [
    `- Username: ${user.username}`,
    user.gender ? `- Gender: ${user.gender}` : '',
    user.age ? `- Age: ${user.age}` : '',
    user.sexualOrientation
      ? `- Sexual orientation: ${user.sexualOrientation}`
      : '',
    user.description ? `- Description: ${user.description}` : '',
  ]

  const userContextForAi = `
Here is some information about the user:
${userContexts.filter(Boolean).join('\n')}
  `

  return `${lockContextForAi}\n\n${userContextForAi}`
}
