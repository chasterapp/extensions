import { CHASTER_API_URL } from '@/constants'
import type {
  PartnerConfigurationForPublic,
  PartnerGetSessionAuthRepDto,
} from '@chasterapp/chaster-js'
import { HttpResponse, http } from 'msw'
import type { PartialDeep } from 'type-fest'

export const handlers = [
  http.get<never, never, PartialDeep<PartnerGetSessionAuthRepDto>>(
    `${CHASTER_API_URL}/api/extensions/auth/sessions/valid_token_emergency_unlock`,
    () => {
      return HttpResponse.json({
        session: {
          sessionId: 'session_1',
        },
      })
    },
  ),
  http.get<never, never, PartialDeep<PartnerGetSessionAuthRepDto>>(
    `${CHASTER_API_URL}/api/extensions/auth/sessions/valid_token_keyholder_ai`,
    () => {
      return HttpResponse.json({
        session: {
          sessionId: 'session_2',
        },
      })
    },
  ),
  http.get<never, never, Partial<PartnerConfigurationForPublic>>(
    `${CHASTER_API_URL}/api/extensions/configurations/valid_token`,
    () => {
      return HttpResponse.json({
        user: '6584b990a3a6e920a0085807',
        config: {},
        sessionId: null,
        extensionSlug: 'emergency-unlock',
      })
    },
  ),
]
