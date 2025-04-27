import { CHASTER_API_CLIENT_ID } from '@/constants'
import { CURRENT_PATH_HEADER } from '@/middleware'
import { createApiInstance } from '@/modules/network/helpers/createApiInstance'
import { PartnerExtensionsApi } from '@chasterapp/chaster-js'
import { headers } from 'next/headers'

export async function getSession() {
  const path = headers().get(CURRENT_PATH_HEADER)
  if (!path) throw new Error('No path found')

  const token = path.match(/^\/sessions\/([^/]+)\/.*$/)?.[1]
  if (!token) throw new Error('No session token found')

  try {
    const { data } = await createApiInstance(
      PartnerExtensionsApi,
    ).getSessionAuth(token, CHASTER_API_CLIENT_ID)

    return data
  } catch (error) {
    throw new Error('Failed to get session')
  }
}
