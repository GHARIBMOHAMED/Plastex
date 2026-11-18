import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", request.nextUrl.pathname.startsWith("/en/") || request.nextUrl.pathname === "/en" ? "en" : "fr");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|images|videos|favicon.ico|robots.txt|sitemap.xml|icon.svg).*)"],
};
