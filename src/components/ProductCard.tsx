"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { translateText } from '@/lib/translate';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';
import { getTargetCurrency } from '@/lib/currency';

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

    // Use centralized currency logic
    const targetCurrency = getTargetCurrency(locale);

    // Currency Hook
    const { formatPrice, getConvertedPrice, loading: ratesLoading } = useCurrency(targetCurrency);

    // Calculate converted price for Cart
    const convertedPrice = getConvertedPrice(currentPrice);

    // Translation state
    const translatedTitle = translateText(title, locale);
    const translatedBrand = translateText(brand, locale);

    // Use proxy for Olive Young images to bypass 403
    const displayImageUrl = imageUrl.startsWith('http') && imageUrl.includes('oliveyoung.co.kr')
        ? `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`
        : imageUrl;

    const handleAddToCart = () => {
        addToCart({
            id: Number(id),
            name: title, // Store raw Korean title for dynamic translation in Cart
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
                <span className="text-xs font-bold text-[#9bc32d] mb-1.5 uppercase tracking-wider">{translatedBrand}</span>
                <h3 className="mb-3 text-[17px] font-bold text-[#1a1a1a] leading-[1.4] tracking-tight group-hover:text-[#6ab04c] transition-colors" title={translatedTitle}>
                    {translatedTitle}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-50/50">
                    <div className="flex flex-col items-end mb-4">
                        {originalPrice && originalPrice > currentPrice && (
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                                    {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}%
                                </span>
                                <span className="text-sm text-gray-400 line-through decoration-gray-300">
                                    {ratesLoading ? '...' : formatPrice(originalPrice)}
                                </span>
                            </div>
                        )}
                        <span className="text-[22px] font-black text-[#111] tracking-tight leading-none bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            {ratesLoading ? 'Loading...' : formatPrice(currentPrice)}
                        </span>
                        {/* Show KRW reference purely for debugger/trust */}
                        {locale !== 'ko' && (
                            <span className="text-[10px] text-gray-300 mt-0.5 font-medium">
                                ({new Intl.NumberFormat('ko-KR').format(currentPrice)} KRW)
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <button
                            onClick={handleAddToCart}
                            className="group/btn relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#86aa25] to-[#6ab04c] py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(106,176,76,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(106,176,76,0.4)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#9bc32d]/40"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-12">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {t('addToCart')}
                            </span>
                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#9bc32d] to-[#86aa25] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></div>
                        </button>

                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex w-full items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-500 transition-all duration-300 hover:border-[#9bc32d] hover:text-[#9bc32d] hover:bg-[#9bc32d]/5"
                        >
                            {t('seeCheck')}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
