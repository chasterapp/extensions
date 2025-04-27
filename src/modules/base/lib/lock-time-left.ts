import type { LockForPublic } from '@chasterapp/chaster-js'

export function lockTimeLeft(lock: LockForPublic) {
  const diffDate = lock.frozenAt ? new Date(lock.frozenAt) : new Date()

  if (!lock.endDate) {
    return 0
  }

  const timeLeft = Math.max(
    new Date(lock.endDate).valueOf() - diffDate.valueOf(),
    0,
  )

  return timeLeft
}
