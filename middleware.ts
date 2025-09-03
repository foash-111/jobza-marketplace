import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rewrite legacy family routes to employer equivalents
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/family/")) {
    const target = pathname.replace(/^\/family\//, "/employer/")
    const url = request.nextUrl.clone()
    url.pathname = target
    // Use a redirect so the address bar updates to /employer/*
    return NextResponse.redirect(url, { status: 307 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/family/:path*"],
}


