export const locales = [
    'ko', // Default/Native
    'en',
    'es-ES',
    'fr-FR',
    'de-DE',
    'it-IT',
    'nl-NL',
    'pl-PL',
    'pt-PT',
    'ru-RU',
    'tr-TR',
    'es-MX',
    'pt-BR'
] as const;

export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
    'ko': '한국어',
    'en': 'English (Global)',
    'es-ES': 'Español (España)',
    'fr-FR': 'Français',
    'de-DE': 'Deutsch',
    'it-IT': 'Italiano',
    'nl-NL': 'Nederlands',
    'pl-PL': 'Polski',
    'pt-PT': 'Português (Portugal)',
    'ru-RU': 'Русский',
    'tr-TR': 'Türkçe',
    'es-MX': 'Español (México)',
    'pt-BR': 'Português (Brasil)'
};
