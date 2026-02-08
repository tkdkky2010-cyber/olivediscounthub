"use client";

import { useTranslations } from 'next-intl';

interface CategoryTabsProps {
    activeCategory: string;
    onSelect: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
    const t = useTranslations('Categories');

    const CATEGORIES = [
        { id: 'all', label: t('best') },
        { id: 'new', label: t('new') },
        { id: 'skincare', label: t('skincare') },
        { id: 'mask', label: t('masks') },
        { id: 'suncare', label: t('suncare') },
        { id: 'makeup', label: t('makeup') },
    ];

    return (
        <nav className="sticky top-[57px] z-40 bg-white dark:bg-background-dark border-b border-[#f2f4f1] dark:border-white/10 w-full mb-4">
            <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                ? 'bg-primary text-white font-bold shadow-sm'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}
