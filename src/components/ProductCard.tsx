"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { translateText } from '@/lib/translate';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
    id: string | number;
    brand: string;
    title: string; // Korean title
    imageUrl: string;
    originalPrice: number | null; // KRW
    currentPrice: number; // KRW
    link: string;
    locale: string;
}

export default function ProductCard({
    id,
    brand,
    title,
    imageUrl,
    originalPrice,
    currentPrice,
    link,
    locale
}: ProductCardProps) {
    const t = useTranslations('ProductCard');
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const getTargetCurrency = (loc: string) => {
        if (loc === 'ko') return 'KRW';
        if (loc === 'en') return 'USD'; // Default global
        if (loc.startsWith('es')) return 'EUR'; // Default Spanish to EUR if not MX
        if (loc.startsWith('pt')) return 'EUR'; // Default Portuguese to EUR (Portugal) if not BR
        if (loc === 'es-MX') return 'MXN';
        if (loc === 'pt-BR') return 'BRL';
        if (loc === 'ru') return 'RUB';
        return 'USD';
    };

    const targetCurrency = getTargetCurrency(locale);

    // Currency Hook
    const { formatPrice, getConvertedPrice, loading: ratesLoading } = useCurrency(targetCurrency);

    // Calculate converted price for Cart
    const convertedPrice = getConvertedPrice(currentPrice);

    // Translation state - now handled by next-intl or mock
    const translatedTitle = t('title', { title }); // Mock translation or pass through

    // Use proxy for Olive Young images to bypass 403
    const displayImageUrl = imageUrl.startsWith('http') && imageUrl.includes('oliveyoung.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`
        : imageUrl;

    const handleAddToCart = () => {
        addToCart({
            id: Number(id),
            name: translatedTitle,
            brand,
            imageUrl: displayImageUrl,
            originalPrice: Math.round(currentPrice), // Store current KRW price as base
            price: convertedPrice,
            currency: targetCurrency,
            quantity: 1,
            link
        });
        addToast(`${translatedTitle} added to cart!`, 'success');
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md border border-gray-100 h-full">
            <div className="aspect-square relative overflow-hidden bg-gray-50">
                <Image
                    src={displayImageUrl}
                    alt={translatedTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    // Add unoptimized for external URLs if domain not configured, or configure next.config.ts
                    unoptimized
                />
                {/* Sale Badge */}
                {originalPrice && originalPrice > currentPrice && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-sm tracking-wide">
                            SALE
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">{brand}</span>
                <h3 className="mb-4 text-base font-medium text-gray-900 line-clamp-2 min-h-[48px]" title={translatedTitle}>
                    {translatedTitle}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col items-end mb-4">
                        {originalPrice && originalPrice > currentPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {ratesLoading ? '...' : formatPrice(originalPrice)}
                            </span>
                        )}
                        <span className="text-xl font-bold text-gray-900">
                            {ratesLoading ? 'Loading...' : formatPrice(currentPrice)}
                        </span>
                        {/* Show KRW reference purely for debugger/trust */}
                        {locale !== 'ko' && (
                            <span className="text-[10px] text-gray-300 mt-1">
                                ({new Intl.NumberFormat('ko-KR').format(currentPrice)} KRW)
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full rounded-full bg-green-700 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            {t('addToCart')}
                        </button>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center text-xs text-gray-400 hover:text-green-700 hover:underline transition-colors cart-link"
                        >
                            {t('seeCheck')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
