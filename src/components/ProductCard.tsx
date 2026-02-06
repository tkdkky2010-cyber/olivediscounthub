import { Star, ShoppingBag, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
    id: string | number;
    brand: string;
    title: string;
    originalPrice: number;
    currentPrice: number;
    imageUrl: string;
    link: string;
    locale: string;
    rank?: number;
}

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductCard({ brand, title, originalPrice, currentPrice, imageUrl, link, rank, id, locale }: ProductCardProps) {
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link click if wrapped
        e.stopPropagation();

        addToCart({
            id: String(id),
            name: title,
            brand: brand,
            imageUrl: imageUrl,
            originalPrice: originalPrice,
            price: currentPrice,
            currency: 'KRW',
            quantity: 1,
            link: link
        });

        addToast("Added to Cart!", "success");
    };

    return (
        <div className="flex flex-col gap-2 group block">
            <div className="relative w-full aspect-square bg-[#f5f5f5] dark:bg-white/5 rounded-xl overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>

                {/* Ranking Badge - Large & Prominent */}
                <div className="absolute top-0 left-0 z-20">
                    <div className="bg-red-600 text-white text-lg font-extrabold px-3 py-1 rounded-br-xl shadow-lg leading-none">
                        {rank}
                    </div>
                </div>

                {/* Hot Badge (if needed below rank) */}
                <div className="absolute top-9 left-0 z-10 pl-1">
                    {discount > 0 && (
                        <div className="px-1.5 py-0.5 bg-black/50 backdrop-blur text-white text-[10px] font-bold rounded uppercase w-fit">
                            Hot
                        </div>
                    )}
                </div>


                {/* Bottom Left: Add to Cart (Desktop Hover) */}
                <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={handleAddToCart}
                        className="h-8 w-8 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors shadow-sm"
                        title="장바구니 담기 (Add to Cart)"
                    >
                        <ShoppingBag size={16} />
                    </button>
                </div>

                {/* Bottom Right: Go to Site (Desktop Hover) */}
                <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-white hover:text-primary transition-colors shadow-sm"
                        title="올리브영 페이지로 이동 (Go to Olive Young)"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>

            <div className="px-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{brand}</p>
                <h3 className="text-sm font-medium line-clamp-2 leading-tight mb-1 h-9">{title}</h3>
                <div className="flex items-center gap-1.5 mb-1">
                    {discount > 0 && <span className="text-accent-red text-sm font-bold">{discount}%</span>}
                    {/* Force KRW Display */}
                    <span className="text-base font-bold">{currentPrice.toLocaleString()}원</span>
                </div>
                {discount > 0 && <p className="text-xs text-gray-400 line-through leading-none">{originalPrice.toLocaleString()}원</p>}

                <div className="flex items-center gap-1 mt-2">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span className="text-[10px] font-bold">4.8</span>
                    <span className="text-[10px] text-gray-400">(2.4k)</span>
                </div>
            </div>
        </div >
    );
}
