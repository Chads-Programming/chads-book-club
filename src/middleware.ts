import { checkToken } from "@/api/services/me.service"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") return NextResponse.next()

  const token = request.cookies.get("token")

  if (!token) return NextResponse.redirect(new URL("/", request.url))

  const decoded = await checkToken(token.value)

  if (!decoded) {
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.delete("token")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
