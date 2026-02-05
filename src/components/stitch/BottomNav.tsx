import { Home, Grid, Search, Heart, User } from 'lucide-react';
import Link from 'next/link';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white dark:bg-background-dark border-t border-[#f2f4f1] dark:border-white/10 px-4 pb-6 pt-2 z-50 md:hidden">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex flex-col items-center gap-1 text-primary">
                    <Home size={24} strokeWidth={2.5} />
                    <span className="text-[10px] font-bold">Home</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-1 text-gray-400">
                    <Grid size={24} />
                    <span className="text-[10px] font-medium">Category</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-1 text-gray-400">
                    <Search size={24} />
                    <span className="text-[10px] font-medium">Search</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-1 text-gray-400">
                    <Heart size={24} />
                    <span className="text-[10px] font-medium">Wishlist</span>
                </Link>
                <Link href="#" className="flex flex-col items-center gap-1 text-gray-400">
                    <User size={24} />
                    <span className="text-[10px] font-medium">My Page</span>
                </Link>
            </div>
        </nav>
    );
}
