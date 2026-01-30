
import { NextResponse } from 'next/server';
import { getBestProducts, FALLBACK_PRODUCTS } from '@/lib/oliveyoung';

export async function GET() {
    const products = await getBestProducts();

    let status = 'UNKNOWN';
    if (products === FALLBACK_PRODUCTS) {
        status = 'FALLBACK_DATA_USED';
    } else if (products.length > 0 && products[0].name === FALLBACK_PRODUCTS[0].name) {
        status = 'FALLBACK_DATA_DETECTED_BY_NAME';
    } else {
        status = 'SCRAPED_DATA';
    }

    return NextResponse.json({
        status,
        count: products.length,
        firstProduct: products.length > 0 ? products[0] : null
    });
}
