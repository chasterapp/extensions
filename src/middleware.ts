import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { languageMiddleware } from './modules/server/middlewares/language'

export const CURRENT_PATH_HEADER = 'x-current-path'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  languageMiddleware(req, res)

  res.headers.set(CURRENT_PATH_HEADER, req.nextUrl.pathname)

  return res
}
