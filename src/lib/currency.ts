
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
export async function fetchExchangeRates(): Promise<Record<string, number>> {
    // In a real app, fetch from an API like https://api.exchangerate-api.com/v4/latest/KRW
    // Here we assume "Google Finance" behavior by returning our mock map
    // We can add a small random fluctuation to simulate "live" data
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const fluctuatedRates = { ...RATES };
    // Add +/- 1% randomization for demo effect
    Object.keys(fluctuatedRates).forEach(key => {
        if (key !== 'KRW') {
            const change = 1 + (Math.random() * 0.02 - 0.01);
            fluctuatedRates[key] *= change;
        }
    });

    return fluctuatedRates;
}
