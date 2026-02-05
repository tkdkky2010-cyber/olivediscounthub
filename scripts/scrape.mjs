import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/products');
const DATA_FILE = path.join(__dirname, '../src/data/scraped_products.json');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

async function scrape() {
    console.log('Starting Playwright Scraper for Olive Young Best 100...');
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    const products = [];
    let rank = 1;

    try {
        // Loop through 5 pages
        for (let idx = 1; idx <= 5; idx++) {
            console.log(`Navigating to page ${idx}...`);
            // fltDispCatNo= is empty for All categories
            const url = `https://www.oliveyoung.co.kr/store/main/getBestList.do?dispCatNo=900000100100001&fltDispCatNo=&pageIdx=${idx}&rowsPerPage=20`;

            await page.goto(url, { waitUntil: 'domcontentloaded' });
            // Wait for list to appear
            await page.waitForSelector('.cate_prd_list li', { timeout: 10000 });

            console.log(`Extracting data from page ${idx}...`);

            // Extract basic info in browser context
            const items = await page.evaluate(() => {
                const list = document.querySelectorAll('.cate_prd_list li');
                return Array.from(list).map(el => {
                    // ID extraction
                    // The attribute is on the <a> tag or <button> inside <li>
                    let id = el.querySelector('[data-ref-goodsno]')?.getAttribute('data-ref-goodsno');

                    const linkEl = el.querySelector('a');
                    let link = linkEl ? linkEl.href : '';
                    if (!id && link) {
                        const match = link.match(/goodsNo=([A-Z0-9]+)/);
                        if (match) id = match[1];
                    }

                    // Image
                    const imgEl = el.querySelector('img');
                    let imgUrl = imgEl ? (imgEl.src || imgEl.dataset.original) : null;
                    if (imgUrl && imgUrl.includes('onerror')) imgUrl = null;

                    // Brand & Name
                    const brand = el.querySelector('.tx_brand')?.innerText.trim() || '';
                    const name = el.querySelector('.tx_name')?.innerText.trim() || '';

                    // Price - Selector was .tx_num inside .tx_org/.tx_cur
                    let orgPrice = el.querySelector('.tx_org .tx_num')?.innerText;
                    if (!orgPrice) orgPrice = el.querySelector('.price-1 strike')?.innerText;

                    let curPrice = el.querySelector('.tx_cur .tx_num')?.innerText;
                    if (!curPrice) curPrice = el.querySelector('.price-2 strong')?.innerText;

                    // Cleanup prices
                    if (orgPrice) orgPrice = orgPrice.replace(/,/g, '').trim();
                    if (curPrice) curPrice = curPrice.replace(/,/g, '').trim();

                    return {
                        id, // Return as string
                        brand,
                        name,
                        originalPrice: orgPrice,
                        currentPrice: curPrice || '0',
                        imgUrl,
                        link
                    };
                });
            });

            console.log(`Found ${items.length} items on page ${idx}.`);

            for (const item of items) {
                if (rank > 100) break;
                if (!item.id && !item.link) continue;

                // Download Image using Playwright request context (shares cookies/headers)
                let localImagePath = '/images/placeholder.png';
                if (item.imgUrl) {
                    try {
                        let imageUrl = item.imgUrl;
                        if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;

                        const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
                        const filename = `rank_${rank}_${item.id}${ext}`;
                        const filePath = path.join(OUTPUT_DIR, filename);

                        const response = await context.request.get(imageUrl);
                        if (response.ok()) {
                            const buffer = await response.body();
                            fs.writeFileSync(filePath, buffer);
                            localImagePath = `/products/${filename}`;
                        } else {
                            console.log(`Failed to download image ${imageUrl}: ${response.status()}`);
                        }
                    } catch (err) {
                        console.error(`Error downloading image for rank ${rank}:`, err);
                    }
                }

                // Construct full link if needed (rare with playwright as href is usually absolute)
                // But just in case
                let finalLink = item.link;
                if (finalLink && !finalLink.startsWith('http')) {
                    finalLink = `https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=${item.id}`;
                }

                products.push({
                    id: item.id || `fallback_${Date.now()}_${rank}`,
                    rank: rank,
                    category: 'all',
                    brand: item.brand,
                    name: item.name,
                    originalPrice: item.originalPrice ? Number(item.originalPrice) : Number(item.currentPrice),
                    currentPrice: Number(item.currentPrice),
                    imageUrl: localImagePath,
                    link: finalLink
                });

                process.stdout.write(`\rScraped ${rank}/100`);
                rank++;
            }
            // Be polite
            await page.waitForTimeout(1000);
        }

        console.log('\nSaving data...');
        fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
        console.log(`Done! Saved ${products.length} products.`);

    } catch (e) {
        console.error('Playwright Scrape failed:', e);
    } finally {
        await browser.close();
    }
}

scrape();
