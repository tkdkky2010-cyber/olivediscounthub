"use client";

import { Heart } from 'lucide-react';
import { useCurrencyContext } from '@/context/CurrencyContext';

interface ProductCardProps {
    id: string | number;
    brand: string;
    name: string;
    originalPrice: number;
    currentPrice: number;
    imageUrl: string;
    rank?: number;
}

export default function ProductCard({ brand, name, originalPrice, currentPrice, imageUrl, rank }: ProductCardProps) {
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    const { formatPrice } = useCurrencyContext();

    return (
        <div className="flex flex-col gap-2 group cursor-pointer">
            <div className="relative w-full aspect-square bg-[#f5f5f5] dark:bg-white/5 rounded-xl overflow-hidden">
                {/* Image */}
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                    {/* Using next/image requires domain config. Using standard img for now to avoid config errors with generic URLs or fallback to simple div if background-image preferred. Stitch used bg-image. I'll use img for accessibility. */}
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </div>

                <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-accent-red transition-colors z-10">
                    <Heart size={18} />
                </button>

                {rank && rank <= 3 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded uppercase z-10">{rank}</div>
                )}

                {discount > 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-accent-red text-white text-[10px] font-bold rounded uppercase z-10">
                        Hot
                    </div>
                )}
            </div>

            <div className="px-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{brand}</p>
                <h3 className="text-sm font-medium line-clamp-2 leading-tight mb-1 h-9">{name}</h3>
                <div className="flex items-center gap-1.5 mb-1">
                    {discount > 0 && <span className="text-accent-red text-sm font-bold">{discount}%</span>}
                    <span className="text-base font-bold">{formatPrice(currentPrice)}</span>
                </div>
                {discount > 0 && <p className="text-xs text-gray-400 line-through leading-none">{formatPrice(originalPrice)}</p>}
            </div>
        </div>
    );
}
