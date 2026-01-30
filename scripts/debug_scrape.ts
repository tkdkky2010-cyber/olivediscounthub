
import { getBestProducts, FALLBACK_PRODUCTS } from '../src/lib/oliveyoung';

async function debug() {
    console.log('Fetching products...');
    const products = await getBestProducts();

    // Check if products array is identical to FALLBACK_PRODUCTS (reference check might fail if new array created, but check content)
    // Actually FALLBACK_PRODUCTS is exported const.
    // Let's check the first item's name.

    if (products.length > 0) {
        const first = products[0];
        console.log('First Product:', first.name);
        console.log('Image URL:', first.imageUrl);

        const fallbackFirst = FALLBACK_PRODUCTS[0];
        if (first.name === fallbackFirst.name) {
            console.log('Result: LIKELY FALLBACK DATA (Name matches fallback)');
        } else {
            console.log('Result: SCRAPED DATA (Name differs from fallback)');
        }
    } else {
        console.log('Result: NO PRODUCTS FOUND');
    }
}

debug();
