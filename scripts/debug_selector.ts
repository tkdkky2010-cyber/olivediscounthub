
import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://www.oliveyoung.co.kr/store/main/getBestList.do?t_page=%ED%99%88&t_click=GNB&t_gnb_type=%EB%9E%AD%ED%82%B9&t_swiping_type=N';

    console.log('Navigating to:', url);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait a bit
    await page.waitForTimeout(3000);

    console.log('Page Title:', await page.title());

    // Check if list exists
    const listCount = await page.locator('ul.cate_prd_list > li').count();
    console.log('ul.cate_prd_list > li count:', listCount);

    // Check alternative
    const tabs = await page.locator('div.TabsConts').count();
    console.log('div.TabsConts count:', tabs);

    // Check if there's any product list class
    const cateList = await page.locator('.cate_prd_list').count();
    console.log('.cate_prd_list count:', cateList);

    await browser.close();
})();
