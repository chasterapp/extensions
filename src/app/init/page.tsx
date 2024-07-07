'use client'

import { extensionBySlug } from '@/modules/extensions/data/extensions'
import LoaderLayout from '@/modules/ui/components/layouts/LoaderLayout'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type HashParams = {
  mainToken?: string
  partnerConfigurationToken?: string
  extensionSlug?: string
}

const getHashParams = () => {
  const hash = window.location.hash.substring(1)
  try {
    const params: HashParams = JSON.parse(
      decodeURIComponent(hash),
    ) as HashParams

    return params
  } catch (e) {
    return null
  }
}

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const hashParams = getHashParams()
    if (!hashParams) return

    if (hashParams.mainToken && hashParams.extensionSlug) {
      router.replace(
        `/sessions/${hashParams.mainToken}/${extensionBySlug(hashParams.extensionSlug).internalId}`,
      )
    } else if (
      hashParams.partnerConfigurationToken &&
      hashParams.extensionSlug
    ) {
      router.replace(
        `/configurations/${hashParams.partnerConfigurationToken}/${extensionBySlug(hashParams.extensionSlug).internalId}`,
      )
    }
  }, [router])

  return <LoaderLayout />
}
