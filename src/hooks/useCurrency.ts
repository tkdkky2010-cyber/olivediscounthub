
import { useState, useEffect } from 'react';
import { fetchExchangeRates, convertPrice } from '@/lib/currency';

// Default rates to prevent initial NaN
const DEFAULT_RATES = { KRW: 1, USD: 0.00075 };

export function useCurrency(targetCurrency: string = 'KRW') {
    const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        let isMounted = true;

        // Fetch immediately
        const loadRates = async () => {
            try {
                setLoading(true);
                const newRates = await fetchExchangeRates();
                if (isMounted) {
                    setRates(newRates);
                    setLastUpdated(new Date());
                    console.log('[useCurrency] Rates updated:', newRates);
                }
            } catch (error) {
                console.error('[useCurrency] Failed to fetch rates:', error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadRates();

        // Poll every 5 minutes (300,000ms)
        // 5 minutes = 300,000 ms
        const intervalId = setInterval(loadRates, 300000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []); // Run once on mount (singleton-like behavior per component, but can be improved with context)

    const formatPrice = (priceInKrw: number | null | undefined) => {
        if (priceInKrw === null || priceInKrw === undefined) return '0';
        // Calculate conversion
        const rate = rates[targetCurrency] || rates['USD'] || 0.00075;
        const converted = priceInKrw * rate;

        // Format
        try {
            return new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: targetCurrency,
                minimumFractionDigits: targetCurrency === 'KRW' ? 0 : 2
            }).format(converted);
        } catch (e) {
            // Fallback for invalid currency code
            return `${targetCurrency} ${converted.toFixed(2)}`;
        }
    };

    const getConvertedPrice = (priceInKrw: number) => {
        const rate = rates[targetCurrency] || 0.00075;
        return priceInKrw * rate;
    };

    return {
        loading,
        lastUpdated,
        formatPrice,
        getConvertedPrice
    };
}
