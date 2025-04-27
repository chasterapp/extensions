'use client'

import { useKeyholders } from '../../queries/keyholder'
import { KeyholderList } from './KeyholderList'

export function KeyholderEntrypoint() {
  const { data: keyholders, isLoading } = useKeyholders()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <KeyholderList keyholders={keyholders || []} />
}
