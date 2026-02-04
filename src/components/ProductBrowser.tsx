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
            <div className="mb-8 flex justify-center">
                <CategoryTabs activeCategory={activeCategory} onSelect={setActiveCategory} />
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={`${product.category}-${product.id}`} // Ensure unique key across categories
                            id={product.id}
                            brand={product.brand}
                            title={product.name}
                            imageUrl={product.imageUrl}
                            originalPrice={product.originalPrice}
                            currentPrice={product.currentPrice}
                            link={product.link}
                            locale={locale}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No products found for this category yet.</p>
                </div>
            )}
        </div>
    );
}
