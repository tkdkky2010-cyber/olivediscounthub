
import { chromium, type Browser, type Page } from 'playwright';
import fs from 'fs';
import path from 'path';

// --- Configuration & Constants ---
const DATA_DIR = path.join(process.cwd(), 'src/data');
const OUTPUT_FILE = path.join(DATA_DIR, 'scraped_products.json');

const CATEGORIES = [
    { id: 'all', name: 'Best Ranking', url: 'https://www.oliveyoung.co.kr/store/main/getBestList.do?t_page=%ED%99%88&t_click=GNB&t_gnb_type=%EB%9E%AD%ED%82%B9&t_swiping_type=N' }
];

// User-defined limits
const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 3000;
const ITEMS_PER_CATEGORY = 100;


interface Product {
    id: number;
    rank: number; // Rank within category
    category: string;
    brand: string;
    name: string;
    originalPrice: number | null;
    currentPrice: number;
    imageUrl: string;
    link: string;
    rating?: number;
    reviewCount?: number;
}

// --- Helper Functions ---

function randomDelay(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function humanDelay(page: Page) {
    const delay = randomDelay(MIN_DELAY_MS, MAX_DELAY_MS);
    // console.log(`[Human] Waiting ${delay}ms...`); // Reduce noise
    await page.waitForTimeout(delay);
}

/**
 * Scrolls until we have enough items or hit bottom
 */
async function scrollForItems(page: Page, targetCount: number) {
    console.log(`[Scroll] Aiming for ${targetCount} items...`);
    let previousHeight = 0;
    let noChangeCount = 0;

    while (true) {
        const currentCount = await page.locator('ul.cate_prd_list > li').count();
        if (currentCount >= targetCount) {
            console.log(`[Scroll] Reached ${currentCount} items.`);
            break;
        }

        const currentHeight = await page.evaluate(() => document.body.scrollHeight);
        if (currentHeight === previousHeight) {
            noChangeCount++;
            if (noChangeCount > 5) {
                console.log('[Scroll] End of list reached (no height change).');
                break;
            }
        } else {
            noChangeCount = 0;
        }
        previousHeight = currentHeight;

        // Scroll down
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500); // Wait for lazy load
    }
}

// --- Main Crawler Logic ---

async function scrapeOliveYoung() {
    console.log('[Crawler] Starting Multi-Category Crawler...');
    console.log(`[Crawler] Target: ${CATEGORIES.length} categories x ${ITEMS_PER_CATEGORY} items`);

    const browser = await chromium.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        locale: 'ko-KR',
        timezoneId: 'Asia/Seoul',
    });

    const page = await context.newPage();
    const allProducts: Product[] = [];

    try {
        for (const category of CATEGORIES) {
            console.log(`\n[Crawler] Processing Category: ${category.name} (${category.id})...`);

            try {
                await page.goto(category.url, { waitUntil: 'domcontentloaded' });
                await humanDelay(page);

                // Wait for the list to appear specifically for Ranking page structure
                // Sometimes it's inside #Container -> .best-area
                // But .cate_prd_list is the common list class.
                try {
                    await page.waitForSelector('ul.cate_prd_list > li', { timeout: 10000 });
                } catch (e) {
                    console.log('[Crawler] List selector not found immediately, scrolling might help or page structure differs.');
                }

                // Scroll to load items
                await scrollForItems(page, ITEMS_PER_CATEGORY);

                // Scrape
                const productItems = page.locator('ul.cate_prd_list > li');
                const count = await productItems.count();
                const limit = Math.min(count, ITEMS_PER_CATEGORY);

                console.log(`[Crawler] Scraping ${limit} items from ${category.name}...`);

                for (let i = 0; i < limit; i++) {
                    const item = productItems.nth(i);
                    const name = await item.locator('.tx_name').textContent().catch(() => null);
                    const currentPriceText = await item.locator('.tx_cur .num').textContent().catch(() => null);

                    if (!name || !currentPriceText) {
                        console.log(`[Crawler] Skip Item ${i}: Missing name/price.`);
                        continue;
                    }
                    console.log(`[Crawler] Item ${i}: ${name.trim().substring(0, 10)}...`); // Log every success

                    const brand = await item.locator('.tx_brand').textContent().catch(() => 'Unknown');
                    const originalPriceText = await item.locator('.tx_org .num').textContent().catch(() => null);

                    const originalPrice = originalPriceText ? parseInt(originalPriceText.replace(/,/g, '')) : null;
                    const currentPrice = parseInt(currentPriceText.replace(/,/g, ''));

                    const imageUrl = await item.locator('img').first().getAttribute('src').catch(() => '');

                    // Link handling
                    // usually href="javascript:common.link.moveGoodsDetail('A000000...')" or a direct link
                    // On mweb it might be standard link. Let's check href.
                    // If simple href, grab it. If javascript, extract ID.
                    const linkHref = await item.locator('a').first().getAttribute('href').catch(() => '');
                    let goodsNo = '';

                    if (linkHref?.includes('goodsNo=')) {
                        goodsNo = linkHref.split('goodsNo=')[1]?.split('&')[0];
                    } else if (linkHref?.includes('moveGoodsDetail')) {
                        // javascript:common.link.moveGoodsDetail('A0000...')
                        const match = linkHref.match(/'([^']+)'/);
                        if (match) goodsNo = match[1];
                    }

                    const link = goodsNo ? `https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=${goodsNo}` : '';
                    // Use goodsNo as ID logic if needed, or simple incremental uniqueness
                    // Combining category helps uniqueness if item appears in multiple
                    const id = goodsNo ? parseInt(goodsNo.replace(/\D/g, '')) : (allProducts.length + i + 1);

                    if (name && currentPrice) {
                        allProducts.push({
                            id,
                            rank: i + 1,
                            category: category.id,
                            brand: brand?.trim() || '',
                            name: name?.trim() || '',
                            originalPrice,
                            currentPrice,
                            imageUrl: imageUrl || '',
                            link
                        });
                    }
                }
                console.log(`[Crawler] Completed ${category.name}. Total So Far: ${allProducts.length}`);

            } catch (catErr) {
                console.error(`[Crawler] Error processing category ${category.name}:`, catErr);
            }
        }

        // --- Save Data ---
        if (allProducts.length > 0) {
            if (!fs.existsSync(DATA_DIR)) {
                fs.mkdirSync(DATA_DIR, { recursive: true });
            }

            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2), 'utf-8');
            console.log(`\n[Crawler] SUCCESS! Saved ${allProducts.length} items to ${OUTPUT_FILE}`);

        } else {
            console.warn('[Crawler] No products found after all categories.');
        }

    } catch (error) {
        console.error('[Crawler] Critical Error:', error);
    } finally {
        await context.close();
        await browser.close();
        console.log('[Crawler] Finished.');
    }
}

scrapeOliveYoung();
