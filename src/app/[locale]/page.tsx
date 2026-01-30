import { getTranslations } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import TrustBanner from '@/components/TrustBanner';
import { getBestProducts } from '@/lib/oliveyoung';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('Index');

  // Fetch data with optimized scraper
  const products = await getBestProducts();

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="pt-16 pb-12 text-center bg-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-4xl font-bold text-green-800">{t('heroTitle')}</h1>
          <p className="text-xl text-gray-500 font-light">{t('heroSubtitle')}</p>
          <p className="mt-4 text-sm text-gray-400">
            {locale === 'ko' ? '실시간 올리브영 랭킹 (5분 갱신)' : 'Real-time Olive Young Best Sellers (Live from Korea)'}
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <TrustBanner />

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                brand={product.brand}
                title={product.name}
                imageUrl={product.imageUrl}
                originalPrice={product.originalPrice}
                currentPrice={product.currentPrice}
                link={product.link}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Failed to load Best Products. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
