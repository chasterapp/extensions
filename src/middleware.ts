import acceptLanguage from 'accept-language'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookieName, fallbackLng, languages } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
  ],
}

export function middleware(req: NextRequest) {
  let lng
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  if (!req.nextUrl.pathname.startsWith('/_next')) {
    const response = NextResponse.next()
    if (lng) response.cookies.set(cookieName, lng)
    return response
  }

  return NextResponse.next()
}
