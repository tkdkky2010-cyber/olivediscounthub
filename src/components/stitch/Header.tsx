"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/navigation';
import { Search, ShoppingBag, Sprout, Globe, ChevronDown } from 'lucide-react';
import { localeNames, locales, Locale } from '@/config';
import { useCart } from '@/context/CartContext';
import { useCurrencyContext } from '@/context/CurrencyContext';
import { useSearch } from '@/context/SearchContext';
import { useState, useRef, useEffect } from 'react';

const localeFlags: Record<string, string> = {
    'ko': '\u{1F1F0}\u{1F1F7}',
    'en': '\u{1F1FA}\u{1F1F8}',
    'es-ES': '\u{1F1EA}\u{1F1F8}',
    'fr-FR': '\u{1F1EB}\u{1F1F7}',
    'de-DE': '\u{1F1E9}\u{1F1EA}',
    'it-IT': '\u{1F1EE}\u{1F1F9}',
    'nl-NL': '\u{1F1F3}\u{1F1F1}',
    'pl-PL': '\u{1F1F5}\u{1F1F1}',
    'pt-PT': '\u{1F1F5}\u{1F1F9}',
    'ru-RU': '\u{1F1F7}\u{1F1FA}',
    'tr-TR': '\u{1F1F9}\u{1F1F7}',
    'es-MX': '\u{1F1F2}\u{1F1FD}',
    'pt-BR': '\u{1F1E7}\u{1F1F7}',
};

export default function Header() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { cartCount, openDrawer } = useCart();
    const { currency } = useCurrencyContext();
    const { query, setQuery } = useSearch();
    const t = useTranslations('Header');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangOpen(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        if (isLangOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isLangOpen]);

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

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t('searchPlaceholder')}
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:bg-white dark:focus:bg-black"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Currency Badge */}
                <div className="hidden md:flex items-center px-2.5 py-1 bg-gray-50 dark:bg-white/5 rounded-full text-[11px] font-bold text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/10">
                    {currency}
                </div>

                {/* Locale Switcher */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-xs font-bold text-gray-600 dark:text-gray-300"
                    >
                        <span className="text-base">{localeFlags[locale] || ''}</span>
                        <span className="hidden md:inline uppercase">{locale.split('-')[0]}</span>
                        <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isLangOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden py-2 z-50 max-h-[360px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                            {locales.map((l) => (
                                <button
                                    key={l}
                                    onClick={() => handleLocaleChange(l)}
                                    className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${
                                        locale === l
                                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="text-lg">{localeFlags[l] || ''}</span>
                                    <span className="flex-1">{localeNames[l as Locale]}</span>
                                    {locale === l && (
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart */}
                <div className="relative p-1">
                    <button
                        onClick={openDrawer}
                        className="hover:bg-gray-100 dark:hover:bg-white/10 p-1.5 rounded-full transition-colors"
                    >
                        <ShoppingBag size={22} className="text-gray-600 dark:text-gray-300" />
                    </button>
                    {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>
        </header>
    );
}
