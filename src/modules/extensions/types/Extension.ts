import type { ExtensionForPublic } from '@chasterapp/chaster-js'
import type { ZodTypeAny } from 'zod'

export type Extension = Pick<ExtensionForPublic, 'displayName'> & {
  internalId: string
  configurationSchema: ZodTypeAny
}
