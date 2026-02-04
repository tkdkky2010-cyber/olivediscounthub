"use client";

import { useEffect, useState } from "react";
import { fetchExchangeRates } from "@/lib/currency";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

// Requested specific list: USD, EUR, RUB, TRY, MXN, BRL
const TARGET_CURRENCIES = ['USD', 'EUR', 'RUB', 'TRY', 'MXN', 'BRL'];

export default function CurrencyTicker() {
    const [rates, setRates] = useState<Record<string, number>>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false); // Start hidden until loaded

    // Fetch Rates
    useEffect(() => {
        const loadRates = async () => {
            const data = await fetchExchangeRates();
            setRates(data);
            setIsVisible(true);
        };
        loadRates();
    }, []);

    // Rotation Logic (Every 3s)
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false); // Fade out
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 3) % TARGET_CURRENCIES.length);
                setIsVisible(true); // Fade in
            }, 500); // 0.5s transition
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    if (Object.keys(rates).length === 0) return null;

    // Get current 3 items
    const currentItems = [
        TARGET_CURRENCIES[currentIndex],
        TARGET_CURRENCIES[(currentIndex + 1) % TARGET_CURRENCIES.length],
        TARGET_CURRENCIES[(currentIndex + 2) % TARGET_CURRENCIES.length]
    ].filter(Boolean);

    return (
        <div className={`hidden lg:flex items-center gap-6 px-6 py-2 bg-gray-50/80 rounded-full border border-gray-100 ml-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {currentItems.map((code) => {
                const rate = rates[code] || 0;
                // rate is 1 KRW = x Target (e.g. 0.00075 USD)
                // We want 1 Target = y KRW (e.g. 1333 KRW)
                const krwValue = rate > 0 ? (1 / rate) : 0;

                // Stable pseudo-random trend
                const trend = (code.charCodeAt(0) + new Date().getDate()) % 3;

                return (
                    <div key={code} className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] font-bold text-gray-400">{code}</span>
                            <span className="text-xs font-bold text-gray-900">
                                {Math.round(krwValue).toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">KRW</span>
                            </span>
                        </div>
                        {trend === 0 && <ArrowUp size={12} className="text-[#eb4d4b]" />}
                        {trend === 1 && <ArrowDown size={12} className="text-[#6ab04c]" />}
                        {trend === 2 && <Minus size={12} className="text-gray-300" />}
                    </div>
                );
            })}
        </div>
    );
}
