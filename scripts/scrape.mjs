import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import robotsParser from 'robots-parser';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/products');
const DATA_FILE = path.join(__dirname, '../src/data/scraped_products.json');
const ROBOTS_TXT_URL = 'https://www.oliveyoung.co.kr/robots.txt';
const USER_AGENT = 'OliveRankingInfoBot/1.0 (https://olive-discount-hub.com; crawler@olive-discount-hub.com)';

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

/**
 * Check robots.txt compliance
 */
async function checkRobotsTxt(targetUrl) {
    try {
        console.log('🤖 Checking robots.txt...');
        const response = await fetch(ROBOTS_TXT_URL);
        const robotsTxt = await response.text();

        const robots = robotsParser(ROBOTS_TXT_URL, robotsTxt);
        const isAllowed = robots.isAllowed(targetUrl, USER_AGENT);

        if (!isAllowed) {
            console.error('❌ CRITICAL: Crawling disallowed by robots.txt');
            console.error('   Target URL:', targetUrl);
            return false;
        }

        console.log('✅ robots.txt check passed');
        return true;
    } catch (error) {
        console.error('⚠️ Failed to check robots.txt (ignoring):', error.message);
        return true; // Proceed with caution if check fails
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrape() {
    console.log('🚀 Starting Improved Playwright Scraper for Olive Young Best 100...');
    
    const baseUrl = 'https://www.oliveyoung.co.kr/store/main/getBestList.do';
    if (!(await checkRobotsTxt(baseUrl))) {
        process.exit(1);
    }

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: USER_AGENT,
        viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();

    const products = [];
    let rank = 1;

    try {
        // Loop through 5 pages
        for (let idx = 1; idx <= 5; idx++) {
            console.log(`\n🔗 Navigating to page ${idx}...`);
            const url = `${baseUrl}?dispCatNo=900000100100001&fltDispCatNo=&pageIdx=${idx}&rowsPerPage=20`;

            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await page.waitForSelector('.cate_prd_list li', { timeout: 15000 });

            console.log(`📊 Extracting data from page ${idx}...`);

            const items = await page.evaluate(() => {
                const list = document.querySelectorAll('.cate_prd_list li');
                return Array.from(list).map(el => {
                    let id = el.querySelector('[data-ref-goodsno]')?.getAttribute('data-ref-goodsno');

                    const linkEl = el.querySelector('a');
                    let link = linkEl ? linkEl.href : '';
                    if (!id && link) {
                        const match = link.match(/goodsNo=([A-Z0-9]+)/);
                        if (match) id = match[1];
                    }

                    const imgEl = el.querySelector('img');
                    let imgUrl = imgEl ? (imgEl.src || imgEl.dataset.original || imgEl.dataset.src) : null;
                    if (imgUrl && imgUrl.includes('onerror')) imgUrl = null;

                    const brand = el.querySelector('.tx_brand')?.innerText.trim() || '';
                    const name = el.querySelector('.tx_name')?.innerText.trim() || '';

                    let orgPrice = el.querySelector('.tx_org .tx_num')?.innerText;
                    let curPrice = el.querySelector('.tx_cur .tx_num')?.innerText;

                    if (orgPrice) orgPrice = orgPrice.replace(/,/g, '').trim();
                    if (curPrice) curPrice = curPrice.replace(/,/g, '').trim();

                    return {
                        id,
                        brand,
                        name,
                        originalPrice: orgPrice,
                        currentPrice: curPrice || '0',
                        imgUrl,
                        link
                    };
                });
            });

            console.log(`✅ Found ${items.length} items on page ${idx}.`);

            for (const item of items) {
                if (rank > 100) break;
                if (!item.id && !item.link) continue;

                let localImagePath = '/images/placeholder.png';
                if (item.imgUrl) {
                    try {
                        let imageUrl = item.imgUrl;
                        if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;

                        const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
                        const filename = `rank_${rank}_${item.id}${ext}`;
                        const filePath = path.join(OUTPUT_DIR, filename);

                        // Download using request context for better reliability
                        const response = await context.request.get(imageUrl);
                        if (response.ok()) {
                            const buffer = await response.body();
                            fs.writeFileSync(filePath, buffer);
                            localImagePath = `/products/${filename}`;
                        } else {
                            console.log(`⚠️ Failed to download image ${imageUrl}: ${response.status()}`);
                        }
                    } catch (err) {
                        console.error(`❌ Error downloading image for rank ${rank}:`, err.message);
                    }
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
                    link: item.link || `https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=${item.id}`
                });

                process.stdout.write(`\r✅ Scraped ${rank}/100`);
                rank++;
            }
            
            // Polite delay between pages
            await delay(2000);
        }

        console.log('\n💾 Saving data to JSON...');
        fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
        console.log(`🎉 Done! Saved ${products.length} products to ${DATA_FILE}`);

    } catch (e) {
        console.error('❌ Playwright Scrape failed:', e);
    } finally {
        await browser.close();
    }
}

scrape();
