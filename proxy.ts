import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set("x-site-locale", path === "/es" || path.startsWith("/es/") ? "es" : path === "/en" || path.startsWith("/en/") ? "en" : "fr");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|images|videos|favicon.ico|robots.txt|sitemap.xml|icon.svg).*)"],
};
