"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import CategoryTabs from '@/components/CategoryTabs';
import { Product } from '@/lib/oliveyoung';
import { useSearch } from '@/context/SearchContext';

interface ProductBrowserProps {
    initialProducts: Product[];
}

export default function ProductBrowser({ initialProducts }: ProductBrowserProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const { query } = useSearch();
    const t = useTranslations('Categories');

    const filteredProducts = initialProducts.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch = !query ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4 flex justify-center sticky top-[57px] z-40 bg-white dark:bg-background-dark py-2 -mx-4 px-4 border-b border-[#f2f4f1] dark:border-white/10">
                <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 pb-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={`${product.category}-${product.id}`}
                            id={product.id}
                            brand={product.brand}
                            title={product.name}
                            imageUrl={product.imageUrl}
                            originalPrice={product.originalPrice ?? product.currentPrice}
                            currentPrice={product.currentPrice}
                            link={product.link}
                            rank={product.rank}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500">{t('noProducts')}</p>
                </div>
            )}
        </div>
    );
}
