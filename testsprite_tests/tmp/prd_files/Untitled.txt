# TestSprite Debugging Task: Olive Discount Hub [Phase 1]

## Project Context
**Olive Discount Hub** is an e-commerce platform targeting Europe and South America, built with:
- **Framework:** Next.js 15 (App Router)
- **UI:** Tailwind CSS, React 19
- **i18n:** `next-intl`
- **Goal:** Sell Olive Young products with a premium, responsive UI and real-time currency conversion.

## Objective
Debug and verify the core features: **Real-time Currency Updates**, **i18n/Currency Switching**, and **Responsive Card UI**.

## Scope & Instructions

### 1. Real-time Currency Logic (Priority: High)
**Files to Check:** `src/lib/currency.ts`, `src/components/ProductCard.tsx` (or where price is displayed).

**Tasks:**
- **Verify Logic:** Check if `src/lib/currency.ts` implements a function to fetch exchange rates (simulating `GOOGLEFINANCE` with a base of KRW).
- **Polling Mechanism:** Ensure the application updates exchange rates automatically every **5 minutes (300,000ms)**.
    - Look for `setInterval`, `useSWR`, or `useEffect` hooks implementing this.
    - Verify that no duplicate intervals are created (memory leak check).
- **Fallback UI:**
    - Verify that a loading state or fallback value is shown if the currency data is fetching or fails.
    - Simulate an API error and check if the UI crashes or degrades gracefully.

### 2. i18n & Language/Currency Switching
**Files to Check:** `src/components/Header.tsx` (Language Switcher), `src/components/ProductCard.tsx`, `messages/*.json`.

**Tasks:**
- **Language Switching:**
    - Verify that clicking a flag (or language option) in `Header.tsx` updates the locale (e.g., URL changes from `/en` to `/es`).
    - Ensure text content updates immediately using keys from `messages/*.json`.
- **Currency Symbols:**
    - Verify that switching language *also* switches the currency symbol and converts the price.
    - **Test Cases:**
        - **English (US/Global):** Symbol `$`, Price in USD.
        - **Spanish (Spain/Mexico):** Symbol `€` or `Mex$`, Price converted.
        - **Brazilian Portuguese:** Symbol `R$`, Price converted.
        - **Turkish:** Symbol `₺`, Price converted.
        - **Russian:** Symbol `₽`, Price converted.
        - *Check 10 supported languages in total.*
- **Missing Translations:** Check if any keys are missing in `messages/*.json` for the supported languages.

### 3. Responsive Card Layout
**Files to Check:** `src/components/ProductCard.tsx`, `src/app/[locale]/page.tsx`.

**Tasks:**
- **Grid Layout:**
    - Verify `grid-cols-1` for Mobile (< 640px).
    - Verify `grid-cols-2` for Tablet (640px - 1024px).
    - Verify `grid-cols-3` or `grid-cols-4` for Desktop (> 1024px).
- **Content Overflow:**
    - **Long Prices:** Test with extensive currency formats (e.g., "IDR 1,234,567"). Ensure the price text does not break the card layout or overlap other elements.
    - **Long Titles:** Ensure product titles truncation works (e.g., `truncate` or line-clamp).

## Deliverables
1.  **Bug Report:** A list of issues found during verification.
2.  **Fixes:** Apply code fixes for any identified bugs (e.g., missing polling, broken layout, incorrect symbols).
3.  **Final Code:** Ensure the component code is clean and adheres to the "Olive Young" aesthetic (Green/White, clean lines).
