'use server'

import { CHASTER_API_CLIENT_ID } from '@/constants'
import { createApiInstance } from '@/modules/network/helpers/createApiInstance'
import { PartnerExtensionsApi } from '@chasterapp/chaster-js'

export async function getSessionAuth(token: string) {
  const { data } = await createApiInstance(PartnerExtensionsApi).getSessionAuth(
    token,
    CHASTER_API_CLIENT_ID,
  )

  return data
}
