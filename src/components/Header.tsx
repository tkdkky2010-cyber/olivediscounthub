"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { ChangeEvent, useTransition } from "react";
import { localeNames, locales } from "@/config";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "@/navigation";

export default function Header() {
    const t = useTranslations("Index");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const { cartCount } = useCart();

    const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                        ODH
                    </div>
                    <span className="text-xl font-bold text-green-700 hidden sm:block">
                        {t("title")}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select
                            value={locale}
                            onChange={handleLocaleChange}
                            disabled={isPending}
                            className="appearance-none rounded-full border border-gray-200 bg-white py-1 pl-3 pr-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        >
                            {locales.map((l) => (
                                <option key={l} value={l}>
                                    {localeNames[l]}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            {/* Arrow Icon */}
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>

                    <Link href="/cart" className="relative rounded-full p-2 hover:bg-gray-100 text-gray-600 transition-colors">
                        <ShoppingBag size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-scale-in">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
