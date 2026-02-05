import { chromium } from 'playwright';

async function debug() {
    console.log('Debugging Olive Young Scraper Selectors...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.oliveyoung.co.kr/store/main/getBestList.do?dispCatNo=900000100100001&fltDispCatNo=&pageIdx=1&rowsPerPage=20');
    await page.waitForSelector('.cate_prd_list li');

    const html = await page.evaluate(() => {
        const item = document.querySelector('.cate_prd_list li');
        return item ? item.outerHTML : 'No item found';
    });

    console.log('First Item HTML:');
    console.log(html);

    await browser.close();
}

debug();
