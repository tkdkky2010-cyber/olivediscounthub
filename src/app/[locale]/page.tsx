import { getBestProducts } from '@/lib/oliveyoung';
import BottomNav from '@/components/stitch/BottomNav';
import ProductBrowser from '@/components/ProductBrowser';

export default async function HomePage() {
  const products = await getBestProducts();

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen pb-24 font-display">
      <ProductBrowser initialProducts={products} />
      <BottomNav />
    </div>
  );
}
