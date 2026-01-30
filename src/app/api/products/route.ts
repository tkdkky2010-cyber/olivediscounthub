import { NextResponse } from 'next/server';
import { getBestProducts } from '@/lib/oliveyoung';

export async function GET() {
    try {
        const products = await getBestProducts();
        return NextResponse.json({ products });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
