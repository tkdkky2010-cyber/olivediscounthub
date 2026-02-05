"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/navigation';
import { Search, ShoppingBag, Sprout, Globe } from 'lucide-react';
import { localeNames, locales } from '@/config';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { cartCount } = useCart();

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between border-b border-[#f2f4f1] dark:border-white/10 w-full max-w-7xl mx-auto">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-br from-gray-900 to-green-400 p-2 rounded-xl text-white shadow-md transition-transform group-hover:scale-105">
                        <Sprout size={22} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white uppercase">Olive Young</span>
                        <span className="text-base font-extrabold tracking-tighter bg-gradient-to-r from-gray-800 to-green-400 bg-clip-text text-transparent dark:from-white dark:to-green-300">
                            Discount Store
                        </span>
                    </div>
                </Link>
            </div>

            {/* Search Tab Next to Cart */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search for K-Beauty..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:bg-white dark:focus:bg-black"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Locale Switcher (Desktop) */}
                <div className="relative hidden md:block">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-1 p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-xs font-bold text-gray-600 dark:text-gray-300"
                    >
                        <Globe size={18} />
                        <span className="uppercase">{locale}</span>
                    </button>

                    {isLangOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden py-1 z-50 max-h-[300px] overflow-y-auto">
                            {locales.map((l) => (
                                <button
                                    key={l}
                                    onClick={() => handleLocaleChange(l)}
                                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${locale === l ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-300'}`}
                                >
                                    {localeNames[l]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative p-1">
                    <Link href="/cart">
                        <button className="hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                            <ShoppingBag size={24} className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </Link>
                    {cartCount > 0 && (
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white">{cartCount}</span>
                    )}
                </div>
            </div>
        </header>
    );
}
