"use client";

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryTabs from '@/components/CategoryTabs';
import { Product } from '@/lib/oliveyoung';

interface ProductBrowserProps {
    initialProducts: Product[];
    locale: string;
}

export default function ProductBrowser({ initialProducts, locale }: ProductBrowserProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = activeCategory === 'all'
        ? initialProducts
        : initialProducts.filter(p => p.category === activeCategory);

    return (
        <div className="container mx-auto px-4">
            <div className="mb-4 flex justify-center sticky top-[57px] z-40 bg-white dark:bg-background-dark py-2 -mx-4 px-4 border-b border-[#f2f4f1] dark:border-white/10">
                {/* Reuse the CategoryTabs but maybe remove sticky from it if we wrap it here? 
                    Actually, CategoryTabs component ALREADY has sticky styles in it. 
                    I should remove the wrapper sticky styles here to avoid double sticky or conflict.
                    The CategoryTabs component has `sticky top-[57px]`.
                 */}
                <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
            </div>

            {/* The wrapper div above with sticky might duplicate the nav sticky. 
                My CategoryTabs implementation in Step 1646 has <nav className="sticky...">.
                So filtering controls are sticky.
            */}

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 pb-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={`${product.category}-${product.id}`} // Ensure unique key across categories
                            id={product.id}
                            brand={product.brand}
                            title={product.name}
                            imageUrl={product.imageUrl}
                            originalPrice={product.originalPrice ?? product.currentPrice} // Handle null originalPrice
                            currentPrice={product.currentPrice}
                            link={product.link}
                            locale={locale}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500">No products found for this category yet.</p>
                </div>
            )}
        </div>
    );
}
