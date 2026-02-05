import Link from 'next/link';

const CATEGORIES = [
    { name: 'Best', href: '#', active: true },
    { name: 'New', href: '#', active: false },
    { name: 'Skincare', href: '#', active: false },
    { name: 'Masks', href: '#', active: false },
    { name: 'Sun Care', href: '#', active: false },
    { name: 'Makeup', href: '#', active: false },
];

export default function CategoryTabs() {
    return (
        <nav className="sticky top-[57px] z-40 bg-white dark:bg-background-dark border-b border-[#f2f4f1] dark:border-white/10">
            <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-2">
                {CATEGORIES.map((cat) => (
                    <Link
                        key={cat.name}
                        href={cat.href}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${cat.active
                                ? 'bg-primary text-white font-bold'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
