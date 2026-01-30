
const { getBestProducts, FALLBACK_PRODUCTS } = require('../src/lib/oliveyoung');

async function debug() {
    console.log('Fetching products...');
    const products = await getBestProducts();
    if (products === FALLBACK_PRODUCTS) {
        console.log('Result: FALLBACK DATA USED');
    } else {
        console.log('Result: SCRAPED DATA');
        // Check first product image
        if (products.length > 0) {
            console.log('First Product Image:', products[0].imageUrl);
            if (products[0].imageUrl.includes('/images/')) {
                console.log('WARNING: Image URL looks like fallback/local path.');
            }
        }
    }
}

debug();
