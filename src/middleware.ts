import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Map subdomains → pathname prefixes
const subdomainMap: Record<string, string> = {
  blog: "/blog",
  student: "/student",
  teacher: "/teacher",
  clearcutoff: "/marketing",
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // Extract subdomain (local or production)
  let subdomain = host.split(".")[0];

  // Handle .local for development
  if (subdomain.endsWith("-local")) {
    subdomain = subdomain.replace("-local", "");
  }

  // Check if subdomain exists in the map
  if (subdomainMap[subdomain]) {
    url.pathname = `${subdomainMap[subdomain]}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Fall back to intl middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
