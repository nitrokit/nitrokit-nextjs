import { test, expect } from '@playwright/test';

test('ana sayfa başlığını kontrol et', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Nitrokit Starter Template/);
});
