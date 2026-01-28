import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr"];
const DEFAULT_LOCALE = "en";
// 5 years
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5;

export function proxy(request: NextRequest) {
  // 1. Check if the cookie already exists
  const existingCookie = request.cookies.get("locale");
  const existingLocale = existingCookie?.value;

  // 2. If the cookie exists and is valid, do nothing and continue
  if (existingLocale && SUPPORTED_LOCALES.includes(existingLocale)) {
    return NextResponse.next();
  }

  // 3. If no cookie (or invalid value), detect from browser headers
  const acceptLanguage = request.headers.get("accept-language");
  // Example: "fr-FR,fr;q=0.9,en;q=0.8"
  const rawLocale = acceptLanguage?.split(",")[0];
  const shortLocale = rawLocale?.slice(0, 2);
  
  const locale =
    shortLocale && SUPPORTED_LOCALES.includes(shortLocale)
      ? shortLocale
      : DEFAULT_LOCALE;

  const response = NextResponse.next();

  // 4. Set the cookie
  response.cookies.set("locale", locale, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: true, // HTTPS only (recommended)
    httpOnly: false, // allow client read if needed
  });

  return response;
}