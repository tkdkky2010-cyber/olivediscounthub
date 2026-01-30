import { getRequestConfig } from 'next-intl/server';
import { locales } from '../config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !locales.includes(locale as any)) {
        locale = 'en';
    }

    try {
        const messages = (await import(`../../messages/${locale}.json`)).default;
        return {
            locale,
            messages
        };
    } catch (error) {
        console.warn(`[i18n] Failed to load messages for locale "${locale}". Falling back to English.`);
        const messages = (await import(`../../messages/en.json`)).default;
        return {
            locale,
            messages
        };
    }
});
