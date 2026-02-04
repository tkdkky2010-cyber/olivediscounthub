"use client";

import { useTranslations } from 'next-intl';

interface CategoryTabsProps {
    activeCategory: string;
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    { id: 'all', label: 'Best Ranking (Top 100)' },
];

export default function CategoryTabs({ activeCategory, onSelect }: CategoryTabsProps) {
    // const t = useTranslations('Categories'); // Future: Add localized labels

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-2 px-4 min-w-max">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`
                            px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                            ${activeCategory === cat.id
                                ? 'bg-[#9bc32d] text-white shadow-md scale-105'
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
