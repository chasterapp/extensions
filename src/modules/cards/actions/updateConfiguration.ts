'use server'

import { extensionBySlug } from '@/modules/extensions/data/extensions'
import { createApiInstance } from '@/modules/network/helpers/createApiInstance'
import { PartnerExtensionsApi } from '@chasterapp/chaster-js'

type Params = {
  token: string
  configuration: Record<string, unknown>
}

export async function updateConfiguration({ token, configuration }: Params) {
  const { data } =
    await createApiInstance(PartnerExtensionsApi).getConfiguration(token)
  const schema = extensionBySlug(data.extensionSlug).configurationSchema
  const updatedConfiguration = schema.parse(configuration) as Record<
    string,
    unknown
  >

  await createApiInstance(PartnerExtensionsApi).updateConfiguration(token, {
    config: updatedConfiguration,
  })
}
