'use server'

import { createApiInstance } from '@/modules/network/helpers/createApiInstance'
import { PartnerExtensionsApi } from '@chasterapp/chaster-js'

export async function getConfiguration(token: string) {
  const { data } =
    await createApiInstance(PartnerExtensionsApi).getConfiguration(token)

  return data
}
