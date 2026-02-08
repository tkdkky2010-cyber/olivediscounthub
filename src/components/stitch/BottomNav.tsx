"use client";

import { Home, Grid, Search, Heart, User } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function BottomNav() {
    const t = useTranslations('BottomNav');

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-[#f2f4f1] dark:border-white/10 px-4 pb-6 pt-2 z-50 md:hidden">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex flex-col items-center gap-1 text-primary">
                    <Home size={24} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold">{t('home')}</span>
                </Link>
                <Link href="/" className="flex flex-col items-center gap-1 text-gray-400">
                    <Grid size={24} />
                    <span className="text-[10px] font-medium">{t('category')}</span>
                </Link>
                <Link href="/" className="flex flex-col items-center gap-1 text-gray-400">
                    <Search size={24} />
                    <span className="text-[10px] font-medium">{t('search')}</span>
                </Link>
                <Link href="/" className="flex flex-col items-center gap-1 text-gray-400">
                    <Heart size={24} />
                    <span className="text-[10px] font-medium">{t('wishlist')}</span>
                </Link>
                <Link href="/" className="flex flex-col items-center gap-1 text-gray-400">
                    <User size={24} />
                    <span className="text-[10px] font-medium">{t('mypage')}</span>
                </Link>
            </div>
        </nav>
    );
}
