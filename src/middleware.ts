import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales: locales,
    // Used when no locale matches
    defaultLocale: defaultLocale,
    // Always show the locale prefix in the URL
    localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
    // First update the supabase session
    // This will handle cookie refreshing
    await updateSession(request);

    // Then proceed with intl middleware
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ko|en|es-ES|fr-FR|de-DE|it-IT|nl-NL|pl-PL|pt-PT|ru-RU|tr-TR|es-MX|pt-BR)/:path*', '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
