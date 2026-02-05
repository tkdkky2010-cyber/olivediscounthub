import { getBestProducts } from '@/lib/oliveyoung';
// Header moved to layout
import BottomNav from '@/components/stitch/BottomNav';
import ProductBrowser from '@/components/ProductBrowser';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Fetch data with optimized scraper
  const products = await getBestProducts();

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen pb-24 font-display">
      {/* Header is now in layout.tsx */}

      {/* Hero Banner Removed as per user request */}
      {/* <HeroCarousel /> */}

      {/* Product Browser (Tabs + Grid) */}
      {/* We pass locale so links can be localized if needed, though mostly external links for now */}
      <ProductBrowser initialProducts={products} locale={locale} />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
