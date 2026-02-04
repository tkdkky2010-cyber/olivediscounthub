
// Map of Currency Code to Exchange Rate (1 KRW = x Target)
// Mocked rates based on approx market values
const RATES: Record<string, number> = {
    'KRW': 1,
    'USD': 0.00075, // $1 ≈ 1330 KRW
    'EUR': 0.00069, // €1 ≈ 1450 KRW
    'JPY': 0.11,    // ¥100 ≈ 900 KRW -> ¥1 ≈ 9 KRW -> 1/9 ≈ 0.11
    'CNY': 0.0054,  // 1 KRW ≈ 0.0054 CNY
    'GBP': 0.00059,
    'BRL': 0.0042,  // R$1 ≈ 240 KRW -> 1/240
    'MXN': 0.015,   // Mex$1 ≈ 66 KRW -> 1/66
    'RUB': 0.068,   // ₽1 ≈ 14.7 KRW -> 1/14.7
    'TRY': 0.026,   // ₺1 ≈ 38 KRW -> 1/38
    'PLN': 0.0030,  // 1 PLN ≈ 330 KRW
};

// Symbols for display
export const CURRENCY_SYMBOLS: Record<string, string> = {
    'KRW': '₩',
    'USD': '$',
    'EUR': '€',
    'JPY': '¥',
    'CNY': '¥',
    'GBP': '£',
    'BRL': 'R$',
    'MXN': 'Mex$',
    'RUB': '₽',
    'TRY': '₺',
    'PLN': 'zł',
};

// Helper to convert price
export function convertPrice(priceInKrw: number, targetCurrency: string): string {
    if (!priceInKrw) return '0';
    const rate = RATES[targetCurrency] || RATES['USD']; // Fallback to USD
    const converted = priceInKrw * rate;

    // formatting
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: targetCurrency,
        minimumFractionDigits: targetCurrency === 'KRW' ? 0 : 2
    }).format(converted);
}

// Simulated fetch function for "Real-time" updates
// Helper to determine currency from locale
export function getTargetCurrency(locale: string): string {
    if (locale === 'ko') return 'KRW';
    if (locale === 'en') return 'USD';
    if (locale.startsWith('es')) return locale === 'es-MX' ? 'MXN' : 'EUR';
    if (locale.startsWith('pt')) return locale === 'pt-BR' ? 'BRL' : 'EUR';
    if (locale.startsWith('fr')) return 'EUR'; // France -> Euro
    if (locale.startsWith('de')) return 'EUR'; // Germany -> Euro
    if (locale.startsWith('it')) return 'EUR'; // Italy -> Euro
    if (locale.startsWith('nl')) return 'EUR'; // Netherlands -> Euro
    if (locale.startsWith('ru')) return 'RUB';
    if (locale.startsWith('tr')) return 'TRY';
    if (locale.startsWith('pl')) return 'PLN';
    if (locale === 'ja') return 'JPY';
    return 'USD'; // Default
}

// Real-time fetch from open API
export async function fetchExchangeRates(): Promise<Record<string, number>> {
    try {
        // Free, no-key API for KRW base
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/KRW', { next: { revalidate: 3600 } });

        if (!res.ok) throw new Error('Failed to fetch rates');

        const data = await res.json();
        const apiRates = data.rates;

        // Invert rates: API gives 1 KRW = x USD (e.g. 0.00075)
        // Our app expects exactly this format (1 KRW = x Target), so we can use directly.
        // We override our fallback RATES with real data.

        return {
            ...RATES, // Keep fallbacks for missing keys
            ...apiRates
        };

    } catch (error) {
        console.error('[Currency] API Failed, using fallback:', error);
        return RATES;
    }
}
