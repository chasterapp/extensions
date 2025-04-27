import { cookieName, fallbackLng, languages } from '@/app/i18n/settings'
import type { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'

acceptLanguage.languages(languages)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
  ],
}

export function languageMiddleware(req: NextRequest, res: NextResponse) {
  let lng
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  if (lng) res.cookies.set(cookieName, lng)
}
