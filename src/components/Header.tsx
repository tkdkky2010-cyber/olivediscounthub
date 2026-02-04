"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useState, useTransition, useRef, useEffect } from "react";
import { localeNames, locales } from "@/config";
import { ShoppingBag, ChevronDown, Check, Globe } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { useCart } from "@/context/CartContext";
import { Link } from "@/navigation";
import CurrencyTicker from "./CurrencyTicker";

const localeFlags: Record<string, string> = {
    'ko': '🇰🇷',
    'en': '🇺🇸',
    'es-ES': '🇪🇸',
    'fr-FR': '🇫🇷',
    'de-DE': '🇩🇪',
    'it-IT': '🇮🇹',
    'nl-NL': '🇳🇱',
    'pl-PL': '🇵🇱',
    'pt-PT': '🇵🇹',
    'ru-RU': '🇷🇺',
    'tr-TR': '🇹🇷',
    'es-MX': '🇲🇽',
    'pt-BR': '🇧🇷'
};

export default function Header() {
    const t = useTranslations("Index");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const { cartCount } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleScroll() {
            setIsScrolled(window.scrollY > 10);
        }

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLocaleSelect = (nextLocale: string) => {
        setIsOpen(false);
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/50"
                : "bg-white/60 backdrop-blur-md border-b border-transparent"
                }`}
        >
            <div className="container mx-auto flex h-[72px] items-center justify-between px-4 sm:px-8">
                {/* Modern Logo */}
                <Link href="/" className="flex items-center gap-3.5 group relative">
                    <div className="relative flex h-10 w-10 items-center justify-center">
                        <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-[#badc58] to-[#6ab04c] shadow-[0_4px_16px_rgba(106,176,76,0.4)] transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(106,176,76,0.6)]"></div>
                        <div className="absolute inset-[3px] rounded-[11px] bg-white transform transition-transform duration-500 group-hover:rotate-[-180deg]"></div>
                        <span className="relative z-10 text-[18px] font-black tracking-tighter text-[#6ab04c] transition-all duration-300 group-hover:scale-110">
                            O
                        </span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1">
                            <span className="text-[20px] font-black text-gray-900 tracking-tight leading-none">
                                Olive
                            </span>
                            <span className="text-[20px] font-black text-[#6ab04c] tracking-tight leading-none">
                                Young
                            </span>
                        </div>
                        <div className="h-[3px] w-0 bg-[#6ab04c] rounded-full transition-all duration-500 group-hover:w-full opacity-60"></div>
                        <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase leading-none mt-1 group-hover:text-[#6ab04c] transition-colors">
                            Discount Shop
                        </span>
                    </div>
                </Link>

                {/* Currency Ticker */}
                <CurrencyTicker />

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Premium Language Switcher */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            disabled={isPending}
                            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${isOpen
                                ? "border-[#6ab04c] bg-[#6ab04c]/10 text-[#6ab04c] ring-2 ring-[#6ab04c]/20"
                                : "border-gray-200 bg-white/80 hover:bg-white hover:border-[#6ab04c]/50 hover:shadow-md text-gray-700"
                                }`}
                        >
                            <span className="text-xl drop-shadow-sm">{localeFlags[locale]}</span>
                            <span className="hidden sm:inline-block">{localeNames[locale].split('(')[0].trim()}</span>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#6ab04c]' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100/50 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5">
                                <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Select Region
                                    </div>
                                    {locales.map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => handleLocaleSelect(l)}
                                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 group ${locale === l
                                                ? "bg-[#6ab04c]/10 text-[#6ab04c]"
                                                : "text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{localeFlags[l] || <Globe size={18} />}</span>
                                                <span className={`font-medium ${locale === l ? 'font-bold' : ''}`}>
                                                    {localeNames[l]}
                                                </span>
                                            </div>
                                            {locale === l && (
                                                <div className="h-1.5 w-1.5 rounded-full bg-[#6ab04c] shadow-[0_0_8px_#6ab04c]"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        href="/cart"
                        className="relative flex items-center justify-center h-11 w-11 rounded-full bg-white border border-gray-100 text-gray-700 transition-all duration-300 hover:bg-[#6ab04c] hover:border-[#6ab04c] hover:text-white hover:shadow-[0_4px_12px_rgba(106,176,76,0.3)] hover:scale-105 active:scale-95 group"
                    >
                        <ShoppingBag size={20} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5" />
                        {cartCount > 0 && (
                            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#eb4d4b] text-[10px] font-black text-white shadow-sm ring-2 ring-white scale-100 transition-transform group-hover:scale-110">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
