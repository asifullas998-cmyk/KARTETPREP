
import { NextResponse, type NextRequest } from 'next/server'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

export function middleware(req: NextRequest) {
  let lng: string | undefined | null = req.cookies.get(cookieName)?.value;
  if (!lng) {
    const acceptLanguage = req.headers.get('accept-language');
    if (acceptLanguage) {
      const languagesInHeader = acceptLanguage.split(',').map(lang => lang.split(';')[0]);
      lng = languagesInHeader.find(l => languages.includes(l)) || fallbackLng;
    } else {
      lng = fallbackLng;
    }
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!)
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
}
