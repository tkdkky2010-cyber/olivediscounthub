"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchExchangeRates, getTargetCurrency } from '@/lib/currency';
import { useLocale } from 'next-intl';

interface CurrencyContextType {
    currency: string;
    rates: Record<string, number>;
    loading: boolean;
    formatPrice: (priceInKrw: number | null | undefined) => string;
    convertPrice: (priceInKrw: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const DEFAULT_RATES = { KRW: 1, USD: 0.00075 };

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const locale = useLocale();
    const [currency, setCurrency] = useState('USD');
    const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
    const [loading, setLoading] = useState(true);

    // Sync currency with locale
    useEffect(() => {
        setCurrency(getTargetCurrency(locale));
    }, [locale]);

    // Fetch rates
    useEffect(() => {
        let isMounted = true;

        const loadRates = async () => {
            try {
                const newRates = await fetchExchangeRates();
                if (isMounted) {
                    setRates(newRates);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to load rates', error);
                if (isMounted) setLoading(false);
            }
        };

        loadRates();

        // Poll every hour
        const interval = setInterval(loadRates, 3600000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    const convertPrice = (priceInKrw: number) => {
        const rate = rates[currency] || rates['USD'] || 0.00075;
        return priceInKrw * rate;
    };

    const formatPrice = (priceInKrw: number | null | undefined) => {
        if (priceInKrw === null || priceInKrw === undefined) return '0';

        const converted = convertPrice(priceInKrw);

        try {
            return new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : (locale === 'en' ? 'en-US' : locale), {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: currency === 'KRW' ? 0 : 2,
                maximumFractionDigits: currency === 'KRW' ? 0 : 2
            }).format(converted);
        } catch (e) {
            return `${currency} ${converted.toFixed(2)}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, rates, loading, formatPrice, convertPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrencyContext() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrencyContext must be used within a CurrencyProvider');
    }
    return context;
}
