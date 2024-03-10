import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const loggedIn = request.cookies.has("next-auth.session-token");
  const protectedPaths = [
    "/profile",
    "/collection/create",
    "/collection/[id]",
    "/collection/[id]/edit",
    "/collection/create/item",
    // Add Uzbek paths here for better maintainability
    "/uz/profile",
    "/uz/collection/create",
    "/uz/collection/[id]",
    "/uz/collection/[id]/edit",
    "/uz/collection/create/item",
  ];

  if (protectedPaths.includes(url.pathname)) {
    if (!loggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
