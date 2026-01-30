import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config';

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,
    // Used when no locale matches
    defaultLocale: defaultLocale,
    // Always show the locale prefix in the URL
    localePrefix: 'always'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(en|es-ES|fr-FR|de-DE|it-IT|nl-NL|pl-PL|pt-PT|ru-RU|tr-TR|es-MX|pt-BR)/:path*']
};
