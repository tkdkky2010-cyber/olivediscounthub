import * as cheerio from 'cheerio';

export interface Product {
    id: string; // Changed to string to support 'A000...' format
    rank: number;
    category: string;
    brand: string;
    name: string;
    originalPrice: number | null;
    currentPrice: number;
    imageUrl: string;
    link: string;
}

// Fallback data
export const FALLBACK_PRODUCTS: Product[] = [
    {
        id: '1',
        rank: 1,
        category: 'all',
        brand: 'Torriden',
        name: '[2025 Awards Winner] Torriden Dive-In Low Molecule Hyaluronic Acid Mask 10 Sheets',
        originalPrice: 30000,
        currentPrice: 13950,
        imageUrl: '/images/mask.png',
        link: 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000158752'
    },
    {
        id: '2',
        rank: 2,
        category: 'mask',
        brand: 'Mediheal',
        name: '[Jan Pick] Mediheal Essential Mask 10+1 Special Set',
        originalPrice: 20000,
        currentPrice: 10000,
        imageUrl: '/images/mask.png',
        link: 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000223414'
    },
    {
        id: '3',
        rank: 3,
        category: 'food',
        brand: 'Crunky',
        name: '[Jan Pick] Crunky Crunch Ball Protein Shake',
        originalPrice: null,
        currentPrice: 5900,
        imageUrl: '/images/toner.png', // Placeholder
        link: 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000227418'
    },
    {
        id: '4',
        rank: 4,
        category: 'skincare',
        brand: 'Menokin',
        name: '[Jan Pick] Menokin 30s Quick Bubble Mask',
        originalPrice: 28500,
        currentPrice: 23700,
        imageUrl: '/images/cream.png', // Placeholder
        link: 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000234422'
    },
    {
        id: '5',
        rank: 5,
        category: 'skincare',
        brand: 'Torriden',
        name: '[#1 Serum] Torriden Dive-In Serum Refill Set',
        originalPrice: 36000,
        currentPrice: 24500,
        imageUrl: '/images/serum.png',
        link: 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000189261'
    }
];

import scrapedData from '@/data/scraped_products.json';

export async function getBestProducts(): Promise<Product[]> {
    try {
        console.log('[Scraper] Using cached/scraped data for REAL images...');
        // Cast imported JSON to Product[]
        const validProducts = (scrapedData as any[]).map(item => ({
            id: String(item.id),
            rank: Number(item.rank),
            category: String(item.category || 'all'),
            brand: String(item.brand),
            name: String(item.name),
            originalPrice: item.originalPrice ? Number(item.originalPrice) : null,
            currentPrice: Number(item.currentPrice),
            imageUrl: String(item.imageUrl),
            link: String(item.link)
        })).sort((a, b) => a.rank - b.rank);

        return validProducts as Product[];

    } catch (e) {
        console.error('[Scraper] Error loading local data:', e);
        return FALLBACK_PRODUCTS;
    }
}
