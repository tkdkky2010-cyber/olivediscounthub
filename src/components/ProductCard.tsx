import { ShoppingBag, ExternalLink } from 'lucide-react';

interface ProductCardProps {
    id: string | number;
    brand: string;
    title: string;
    originalPrice: number;
    currentPrice: number;
    imageUrl: string;
    link: string;
    rank?: number;
}

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useCurrencyContext } from '@/context/CurrencyContext';
import { useLocale, useTranslations } from 'next-intl';
import { translateText } from '@/lib/translate';

export default function ProductCard({ brand, title, originalPrice, currentPrice, imageUrl, link, rank, id }: ProductCardProps) {
    const discount = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const { formatPrice } = useCurrencyContext();
    const locale = useLocale();
    const t = useTranslations('Header');

    // Translate brand and title for display
    const translatedBrand = translateText(brand, locale);
    const translatedTitle = translateText(title, locale);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            id: String(id),
            name: title,        // Store original Korean name; translate at display time
            brand: brand,       // Store original Korean brand; translate at display time
            imageUrl: imageUrl,
            originalPrice: originalPrice,
            price: currentPrice,
            currency: 'KRW',
            quantity: 1,
            link: link
        });

        addToast(t('addedToCart'), "success");
    };

    return (
        <div className="flex flex-col gap-2 group block">
            <div className="relative w-full aspect-square bg-[#f5f5f5] dark:bg-white/5 rounded-xl overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                    <img src={imageUrl} alt={translatedTitle} className="w-full h-full object-cover" />
                </div>

                {/* Ranking Badge */}
                {rank && (
                    <div className="absolute top-0 left-0 z-20">
                        <div className="bg-red-600 text-white text-lg font-extrabold px-3 py-1 rounded-br-xl shadow-lg leading-none">
                            {rank}
                        </div>
                    </div>
                )}

                {/* Hot Badge */}
                {discount > 0 && (
                    <div className="absolute top-9 left-0 z-10 pl-1">
                        <div className="px-1.5 py-0.5 bg-black/50 backdrop-blur text-white text-[10px] font-bold rounded uppercase w-fit">
                            Hot
                        </div>
                    </div>
                )}

                {/* Add to Cart */}
                <div className="absolute bottom-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={handleAddToCart}
                        className="h-9 w-9 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-all shadow-md hover:scale-110"
                        title="Add to Cart"
                    >
                        <ShoppingBag size={16} />
                    </button>
                </div>

                {/* External Link */}
                <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 w-9 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center text-gray-700 dark:text-white hover:text-primary transition-all shadow-md hover:scale-110"
                        title="View on Olive Young"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>

            <div className="px-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{translatedBrand}</p>
                <h3 className="text-sm font-medium line-clamp-2 leading-tight mb-1 h-9">{translatedTitle}</h3>
                <div className="flex items-center gap-1.5 mb-1">
                    {discount > 0 && <span className="text-accent-red text-sm font-bold">{discount}%</span>}
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                        {formatPrice(currentPrice)}
                    </span>
                </div>
                {discount > 0 && (
                    <p className="text-xs text-gray-400 line-through leading-none">
                        {formatPrice(originalPrice)}
                    </p>
                )}
            </div>
        </div>
    );
}
